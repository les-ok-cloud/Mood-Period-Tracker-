
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MoodTracker } from './components/MoodTracker';
import { CycleTracker } from './components/CycleTracker';
import { Calendar } from './components/Calendar';
import { MoodSummary } from './components/MoodSummary';
import { Settings } from './components/Settings';
import { SettingsIcon, CalendarDaysIcon, SignOutIcon } from './components/Icons';
import { DailyAffirmation } from './components/DailyAffirmation';
import { Mood, CycleFlow, DailyEntry } from './types';
import { getFormattedDate, isSameDay, isFutureDate } from './utils/dateUtils';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { predictFutureCycles, type CyclePredictions } from './utils/predictions';
import { YearView } from './components/YearView';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { db } from './lib/firebase';

declare const firebase: any;
const GUEST_DATA_KEY = 'moodTrackerGuestData';

const UserAvatar: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({ user }) => {
    if (user.photoURL) {
        return <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full shadow-md" />;
    }

    const initials = user.isAnonymous || !user.email
        ? 'GU'
        : user.email.substring(0, 2).toUpperCase();
    
    return (
        <div 
            className="w-10 h-10 rounded-full shadow-md bg-purple-500 flex items-center justify-center text-white font-bold text-sm"
            title={user.isAnonymous ? 'Guest' : user.email ?? ''}
            aria-label={`User: ${user.isAnonymous ? 'Guest' : user.email}`}
        >
            {initials}
        </div>
    );
};


const App: React.FC = () => {
  const { user, loading: authLoading, signOutUser } = useAuth();
  const { t, locale } = useLanguage();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState<Record<string, DailyEntry>>({});
  
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'year'>('main');
  const [showCycleTracker, setShowCycleTracker] = useState<boolean>(true);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState('Notification' in window ? Notification.permission : 'denied');

  // Fetch data from Firestore or localStorage when user changes
  useEffect(() => {
    if (!user) {
      setDailyData({});
      setShowCycleTracker(true);
      setRemindersEnabled(false);
      setIsDataLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        if (user.isAnonymous) {
            // GUEST MODE: Load from localStorage
            const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
            if (guestDataRaw) {
              const guestData = JSON.parse(guestDataRaw);
              setShowCycleTracker(guestData.settings?.showCycleTracker ?? true);
              setRemindersEnabled(guestData.settings?.remindersEnabled ?? false);
              setDailyData(guestData.dailyData || {});
            } else {
              // Default state for new guest user
              setShowCycleTracker(true);
              setRemindersEnabled(false);
              setDailyData({});
            }
        } else {
            // AUTHENTICATED USER: Load from Firestore
            const settingsDoc = await db.collection('users').doc(user.uid).collection('settings').doc('main').get();
            if (settingsDoc.exists) {
              const settings = settingsDoc.data();
              setShowCycleTracker(settings?.showCycleTracker ?? true);
              setRemindersEnabled(settings?.remindersEnabled ?? false);
            }

            const entriesSnapshot = await db.collection('users').doc(user.uid).collection('entries').get();
            const entriesData: Record<string, DailyEntry> = {};
            entriesSnapshot.forEach((doc: any) => {
              entriesData[doc.id] = doc.data() as DailyEntry;
            });
            setDailyData(entriesData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [user]);
  
  const predictions = useMemo((): CyclePredictions => {
    if (!showCycleTracker) {
      const emptyPredictions: CyclePredictions = { period: new Set<string>(), fertile: new Set<string>(), ovulation: new Set<string>() };
      return emptyPredictions;
    }
    const predictionEndDate = new Date();
    predictionEndDate.setFullYear(predictionEndDate.getFullYear() + 1);
    return predictFutureCycles(dailyData, predictionEndDate);
  }, [dailyData, showCycleTracker]);

  const handleToggleCycleTracker = useCallback(async (enabled: boolean) => {
    setShowCycleTracker(enabled);
    if (user) {
      if (user.isAnonymous) {
        const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
        const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: {}, dailyData };
        guestData.settings.showCycleTracker = enabled;
        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
      } else {
        try {
          await db.collection('users').doc(user.uid).collection('settings').doc('main').set({ showCycleTracker: enabled }, { merge: true });
        } catch (error) {
          console.error("Error saving cycle tracker setting:", error);
        }
      }
    }
  }, [user, dailyData]);

  useEffect(() => {
    let timeoutId: number | undefined;
    const scheduleNotification = () => {
      // ... (notification logic remains the same)
    };

    if (remindersEnabled && notificationPermission === 'granted') {
      scheduleNotification();
    }
    return () => { if (timeoutId) clearTimeout(timeoutId); };
  }, [remindersEnabled, notificationPermission, t.notificationTitle, t.notificationBody]);

  const handleToggleReminders = useCallback(async (enabled: boolean) => {
    let finalEnabledState = enabled;
    if (enabled) {
      if (notificationPermission === 'granted') {
        setRemindersEnabled(true);
      } else if (notificationPermission === 'default') {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          setRemindersEnabled(true);
        } else {
          finalEnabledState = false;
        }
      } else {
        finalEnabledState = false;
      }
    } else {
      setRemindersEnabled(false);
    }
    
    if (user) {
        if (user.isAnonymous) {
            const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
            const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: {}, dailyData };
            guestData.settings.remindersEnabled = finalEnabledState;
            localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
        } else {
            try {
              await db.collection('users').doc(user.uid).collection('settings').doc('main').set({ remindersEnabled: finalEnabledState }, { merge: true });
            } catch (error) {
              console.error("Error saving reminders setting:", error);
            }
        }
    }
  }, [user, notificationPermission, dailyData]);

  const formattedSelectedDate = getFormattedDate(selectedDate);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<CycleFlow | null>(null);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const entry = dailyData[getFormattedDate(selectedDate)];
    setSelectedMood(entry?.mood || null);
    setSelectedCycle(entry?.cycle || null);
    setNote(entry?.note || '');
  }, [selectedDate, dailyData]);

  const handleSaveEntry = async () => {
    if (!user || !selectedMood) return;
    const entryData: DailyEntry = {
      mood: selectedMood,
      cycle: showCycleTracker ? selectedCycle : null,
    };
    if (note.trim()) {
      entryData.note = note.trim();
    }
    
    const updatedDailyData = { ...dailyData, [formattedSelectedDate]: { ...dailyData[formattedSelectedDate], ...entryData } };
    setDailyData(updatedDailyData);

    if (user.isAnonymous) {
        const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
        const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: { showCycleTracker, remindersEnabled }, dailyData: {} };
        guestData.dailyData = updatedDailyData;
        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
    } else {
        const docRef = db.collection('users').doc(user.uid).collection('entries').doc(formattedSelectedDate);
        try {
          await docRef.set(entryData, { merge: true });
        } catch (error) {
          console.error("Error saving entry to Firestore:", error);
          setDailyData(dailyData); // Revert on error
        }
    }
  };
  
  const handleUpdateMood = async (date: Date, mood: Mood) => {
    if (!user) return;
    const formattedDate = getFormattedDate(date);
    const updatedDailyData = {
        ...dailyData,
        [formattedDate]: {
            mood: mood,
            cycle: dailyData[formattedDate]?.cycle ?? null,
            note: dailyData[formattedDate]?.note,
        }
    };
    setDailyData(updatedDailyData);

    if (user.isAnonymous) {
        const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
        const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: { showCycleTracker, remindersEnabled }, dailyData: {} };
        guestData.dailyData = updatedDailyData;
        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
    } else {
        const docRef = db.collection('users').doc(user.uid).collection('entries').doc(formattedDate);
        try {
            await docRef.set({ mood }, { merge: true });
        } catch (error) {
            console.error("Error updating mood in Firestore:", error);
            setDailyData(dailyData); // Revert on error
        }
    }
  };

  const handleUpdateCycle = async (date: Date, cycle: CycleFlow | null) => {
    if (!user) return;
    const formattedDate = getFormattedDate(date);
    const updatedDailyData = {
        ...dailyData,
        [formattedDate]: {
            mood: dailyData[formattedDate]?.mood ?? Mood.Okay,
            cycle: cycle,
            note: dailyData[formattedDate]?.note,
        }
    };
    setDailyData(updatedDailyData);

    if (user.isAnonymous) {
        const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
        const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: { showCycleTracker, remindersEnabled }, dailyData: {} };
        guestData.dailyData = updatedDailyData;
        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
    } else {
        const docRef = db.collection('users').doc(user.uid).collection('entries').doc(formattedDate);
        try {
            await docRef.set({ cycle }, { merge: true });
        } catch (error) {
            console.error("Error updating cycle in Firestore:", error);
            setDailyData(dailyData); // Revert on error
        }
    }
  };

  const handleDeleteEntry = async () => {
    if (!user || !dailyData[formattedSelectedDate]) return;
    const updatedDailyData = { ...dailyData };
    delete updatedDailyData[formattedSelectedDate];
    setDailyData(updatedDailyData);
    
    if (user.isAnonymous) {
        const guestDataRaw = localStorage.getItem(GUEST_DATA_KEY);
        const guestData = guestDataRaw ? JSON.parse(guestDataRaw) : { settings: { showCycleTracker, remindersEnabled }, dailyData: {} };
        guestData.dailyData = updatedDailyData;
        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(guestData));
    } else {
        try {
          await db.collection('users').doc(user.uid).collection('entries').doc(formattedSelectedDate).delete();
        } catch (error) {
          console.error("Error deleting entry from Firestore:", error);
          setDailyData(dailyData); // Revert on error
        }
    }
  };
  
  const handleImportData = async (data: { settings: { showCycleTracker: boolean; remindersEnabled: boolean; }; dailyData: Record<string, DailyEntry>; }) => {
    if (!user) return;

    if (!window.confirm(t.importWarningMessage)) return;
    
    setIsDataLoading(true);
    try {
        if (user.isAnonymous) {
            localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(data));
        } else {
            const { settings, dailyData: importedData } = data;
            const batch = db.batch();

            const entriesRef = db.collection('users').doc(user.uid).collection('entries');
            const oldEntriesSnapshot = await entriesRef.get();
            oldEntriesSnapshot.forEach((doc: any) => batch.delete(doc.ref));

            Object.entries(importedData).forEach(([date, entry]) => {
                const docRef = entriesRef.doc(date);
                batch.set(docRef, entry);
            });

            const settingsRef = db.collection('users').doc(user.uid).collection('settings').doc('main');
            batch.set(settingsRef, settings, { merge: true });

            await batch.commit();
        }
        
        // Update local state for both user types
        setDailyData(data.dailyData);
        setShowCycleTracker(data.settings.showCycleTracker);
        setRemindersEnabled(data.settings.remindersEnabled);
        setShowSettings(false); // Close settings modal on success

    } catch (error) {
        console.error("Error importing data:", error);
        alert(t.importError);
    } finally {
        setIsDataLoading(false);
    }
  };

  const isToday = isSameDay(selectedDate, new Date());
  const isFuture = isFutureDate(selectedDate);
  const entryExists = !!dailyData[formattedSelectedDate];

  if (authLoading || isDataLoading) {
    return (
      <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <DailyAffirmation />
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl">
        <header className="text-center py-2 mb-2 relative">
          <h1 className="text-5xl font-bold text-purple-400">
            <span>
              {t.title_part1}
              {showCycleTracker && (
                <span className="font-handwritten text-red-500 text-5xl font-normal">
                  {' '}{t.title_part2_cycle}
                </span>
              )}
              {t.title_part3 && <span>{' '}{t.title_part3}</span>}
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            {t.subtitle}
          </p>
        </header>

        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentView(currentView === 'main' ? 'year' : 'main')}
            className="text-slate-700 bg-white/70 backdrop-blur-sm py-2 px-4 rounded-full shadow-md hover:bg-slate-200 hover:shadow-lg hover:text-slate-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 flex items-center gap-2"
            aria-label={t.yearView}
          >
            <CalendarDaysIcon className="w-5 h-5" />
            <span className="font-semibold">{t.yearView}</span>
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setShowSettings(true)}
              className="text-slate-600 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-slate-50 hover:shadow-xl hover:text-slate-800 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              aria-label={t.settings}
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
            <div className="w-px h-8 bg-slate-300 mx-1"></div>
            <div className="flex items-center gap-2">
                <UserAvatar user={user} />
                <button
                    onClick={signOutUser}
                    className="text-slate-600 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl hover:text-red-600 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    aria-label="Sign Out"
                >
                    <SignOutIcon className="w-6 h-6" />
                </button>
            </div>
          </div>
        </div>

        {showSettings && (
          <Settings
            showCycleTracker={showCycleTracker}
            onToggleCycleTracker={handleToggleCycleTracker}
            onClose={() => setShowSettings(false)}
            remindersEnabled={remindersEnabled}
            onToggleReminders={handleToggleReminders}
            notificationPermission={notificationPermission}
            dailyData={dailyData}
            onImportData={handleImportData}
          />
        )}

        {currentView === 'main' ? (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 relative">
                {user.isAnonymous && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow">
                        GUEST MODE - Data is saved on this device only
                    </div>
                )}
                <h2 className="text-xl font-bold text-slate-700 mb-2">
                  {t.howAreYouFeeling.replace('{date}', selectedDate.toLocaleDateString(locale, { month: 'long', day: 'numeric' }))}
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  {isToday
                    ? ""
                    : isFuture
                    ? t.logFutureError
                    : t.viewingPastEntry}
                </p>
                <MoodTracker selectedMood={selectedMood} onSelect={setSelectedMood} />
                
                {showCycleTracker && (
                  <>
                    <div className="my-3 border-t border-slate-200"></div>
                    <CycleTracker
                      selectedCycle={selectedCycle}
                      onSelect={setSelectedCycle}
                      dailyData={dailyData}
                      predictions={predictions}
                    />
                  </>
                )}

                <div className="mt-6">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={isFuture ? t.addNotePlaceholderFuture : t.addNotePlaceholder}
                    disabled={isFuture}
                    className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                    aria-label="Daily note"
                  />
                </div>
                
                <div className="mt-8 text-center flex justify-center items-center gap-4">
                  {selectedMood && (
                    <button
                      onClick={handleSaveEntry}
                      disabled={isFuture}
                      className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                      aria-label={entryExists ? t.updateEntryAria.replace('{date}', selectedDate.toLocaleDateString(locale)) : t.saveEntryAria.replace('{date}', selectedDate.toLocaleDateString(locale))}
                    >
                      {entryExists ? t.updateEntry : t.saveEntry}
                    </button>
                  )}
                  {entryExists && (
                    <button
                      onClick={handleDeleteEntry}
                      disabled={isFuture}
                      className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                      aria-label={t.deleteEntryAria.replace('{date}', selectedDate.toLocaleDateString(locale))}
                    >
                      {t.deleteEntry}
                    </button>
                  )}
                </div>
              </div>

              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onUpdateMood={handleUpdateMood}
                onUpdateCycle={handleUpdateCycle}
                dailyData={dailyData}
                showCycleTracker={showCycleTracker}
                predictions={predictions}
              />
            </div>

            <div className="lg:col-span-1">
              <MoodSummary dailyData={dailyData} />
            </div>
          </main>
        ) : (
          <YearView dailyData={dailyData} onBack={() => setCurrentView('main')} />
        )}
      </div>
    </div>
  );
};

export default App;
