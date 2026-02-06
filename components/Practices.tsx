import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { usePracticeSync } from '../hooks/usePracticeSync';
import { ReflectionEntry, PracticeType } from '../types';
import { getFormattedDate } from '../utils/dateUtils';
import { BookIcon, HeartIcon, SparklesIcon, ClockIcon, NewspaperIcon, WifiIcon, WifiOffIcon } from './Icons';
import { TextareaWithLimit } from './TextareaWithLimit';
import { InputWithLimit } from './InputWithLimit';
import { PDFExportModal } from './PDFExportModal';
import { reflectionPDFExporter, PDFExportFilters, isMobileDevice, isWebView, supportsFileSharing, supportsClipboard } from '../utils/pdfExport';
import { SimpleHeader } from './SimpleHeader';

interface Practice {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const Practices: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { syncStatus } = usePracticeSync(user?.uid || '');
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  const practices: Practice[] = [
    {
      id: 'reflection',
      name: t.dailyReflection,
      description: t.dailyReflectionDesc,
      time: t.dailyReflectionTime,
      icon: BookIcon,
      color: 'text-purple-600'
    },
    {
      id: 'gratitude',
      name: t.gratitudePractice,
      description: t.gratitudePracticeDesc,
      time: t.gratitudePracticeTime,
      icon: HeartIcon,
      color: 'text-pink-600'
    },
    {
      id: 'influencers',
      name: t.moodInfluencers,
      description: t.moodInfluencersDesc,
      time: t.moodInfluencersTime,
      icon: SparklesIcon,
      color: 'text-blue-600'
    },
    {
      id: 'reset',
      name: t.oneMinuteReset,
      description: t.oneMinuteResetDesc,
      time: t.oneMinuteResetTime,
      icon: ClockIcon,
      color: 'text-green-600'
    },
    {
      id: 'reading',
      name: t.helpfulReading,
      description: t.helpfulReadingDesc,
      time: t.helpfulReadingTime,
      icon: NewspaperIcon,
      color: 'text-orange-600'
    }
  ];

  if (selectedPractice) {
    return <PracticeDetail practiceId={selectedPractice} onBack={() => setSelectedPractice(null)} />;
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <SimpleHeader
        title={t.practicesTitle || 'Practices'}
        subtitle={t.practicesSubtitle || 'Gentle tools for mood awareness and well-being'}
      />
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl safe-bottom">
        {/* Sync Status Indicator */}
        <div className="mb-4 flex justify-center">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            syncStatus.isOnline
              ? syncStatus.isSyncing
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {syncStatus.isOnline ? (
              syncStatus.isSyncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <WifiIcon className="w-4 h-4" />
                  <span>Online</span>
                </>
              )
            ) : (
              <>
                <WifiOffIcon className="w-4 h-4" />
                <span>Offline</span>
                {syncStatus.pendingCount > 0 && (
                  <span className="ml-1">({syncStatus.pendingCount} pending)</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {practices.map((practice) => (
            <PracticeCard
              key={practice.id}
              practice={practice}
              onClick={() => setSelectedPractice(practice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PracticeCardProps {
  practice: Practice;
  onClick: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ practice, onClick }) => {
  const Icon = practice.icon;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100/80 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] text-left"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-slate-50 ${practice.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">{practice.name}</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">{practice.description}</p>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">{practice.time}</span>
          </div>
        </div>
        <div className="text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

interface PracticeDetailProps {
  practiceId: string;
  onBack: () => void;
}

const PracticeDetail: React.FC<PracticeDetailProps> = ({ practiceId, onBack }) => {
  const { t } = useLanguage();

  // For now, we'll redirect to the appropriate existing screens
  React.useEffect(() => {
    if (practiceId === 'reflection') {
      // This would navigate to the diary tab, but for now we'll show a placeholder
      // In a real implementation, you'd use navigation logic
    }
  }, [practiceId]);

  const renderPracticeContent = () => {
    switch (practiceId) {
      case 'reflection':
        return <MicroDiaryContent onBack={onBack} />;

      case 'gratitude':
        return <GratitudePractice onBack={onBack} />;

      case 'influencers':
        return <MoodInfluencersPractice onBack={onBack} />;

      case 'reset':
        return <OneMinuteResetPractice onBack={onBack} />;

      case 'reading':
        return <HelpfulReadingPractice onBack={onBack} />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl safe-bottom">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.backToPractices}
        </button>

        {renderPracticeContent()}
      </div>
    </div>
  );
};

// Individual practice components
const GratitudePractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const { getEntriesByType, createEntry, updateEntry, deleteEntry, isLoading } = usePracticeSync(user?.uid || '');
  const [gratitude, setGratitude] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [gratitudeDate, setGratitudeDate] = useState<'today' | 'yesterday'>('today');
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(null);
  const [editingDate, setEditingDate] = useState<string | null>(null); // Track if editing a specific date from history
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null); // Track which entry is being edited
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null); // Track entry being deleted

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const selectedDate = gratitudeDate === 'today' ? today : yesterday;
  const selectedDateKey = getFormattedDate(selectedDate);

  // Load existing gratitude entry for selected date
  useEffect(() => {
    if (!user?.uid || isLoading) return;

    const gratitudeEntries = getEntriesByType(PracticeType.Gratitude);
    const dateEntry = gratitudeEntries.find(entry =>
      entry.content.date === selectedDateKey
    );

    if (dateEntry && dateEntry.content.items) {
      const items = dateEntry.content.items;
      // Combine all items into one text (for backward compatibility with old entries)
      setGratitude(items.join('\n\n') || '');
    } else {
      // Clear field if no entry exists for selected date
      setGratitude('');
    }
  }, [user?.uid, isLoading, getEntriesByType, selectedDateKey]);

  // Load entry when selecting from history
  useEffect(() => {
    if (!user?.uid || !selectedHistoryDate || isLoading) return;

    const gratitudeEntries = getEntriesByType(PracticeType.Gratitude);
    const dateEntry = gratitudeEntries.find(entry =>
      entry.content.date === selectedHistoryDate
    );

    if (dateEntry && dateEntry.content.items) {
      const items = dateEntry.content.items;
      // Combine all items into one text (for backward compatibility with old entries)
      setGratitude(items.join('\n\n') || '');
      // Set the date toggle to match the selected history date
      const todayKey = getFormattedDate(new Date());
      const yesterdayKey = getFormattedDate(yesterday);
      if (selectedHistoryDate === todayKey) {
        setGratitudeDate('today');
        setEditingDate(null); // Clear editing date for today
      } else if (selectedHistoryDate === yesterdayKey) {
        setGratitudeDate('yesterday');
        setEditingDate(null); // Clear editing date for yesterday
      } else {
        // For older dates, set editing date so we save to the original date
        setEditingDate(selectedHistoryDate);
      }
      setSelectedHistoryDate(null); // Reset after loading
    }
  }, [selectedHistoryDate, user?.uid, isLoading, getEntriesByType, yesterday]);

  const saveGratitude = async () => {
    if (!user?.uid) return;

    const gratitudeText = gratitude.trim();
    if (!gratitudeText) return;

    setIsSaving(true);

    try {
      // Use editingDate if set (for older entries from history), otherwise use selectedDateKey
      const saveDateKey = editingDate || selectedDateKey;
      const gratitudeEntries = getEntriesByType(PracticeType.Gratitude);
      const existingEntry = gratitudeEntries.find(entry =>
        entry.content.date === saveDateKey
      );

      // Store as array with single item for backward compatibility
      const content = {
        date: saveDateKey,
        items: [gratitudeText]
      };

      if (existingEntry) {
        await updateEntry(existingEntry.entryId, { content });
      } else {
        await createEntry(PracticeType.Gratitude, content);
      }

      setSavedMessage(t.gratitudeSaved || 'Gratitude saved!');
      setTimeout(() => setSavedMessage(''), 3000);
      setEditingDate(null); // Clear editing date after save
    } catch (error) {
      console.error('Error saving gratitude:', error);
      setSavedMessage('Failed to save. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const getSortedGratitudeEntries = () => {
    if (!user?.uid) return [];

    const gratitudeEntries = getEntriesByType(PracticeType.Gratitude);
    return gratitudeEntries
      .map(entry => ({
        entryId: entry.entryId,
        date: entry.content.date,
        items: entry.content.items || []
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale || 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      await deleteEntry(entryId);
      setShowDeleteConfirm(null);
      setSavedMessage('Entry deleted successfully');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting entry:', error);
      setSavedMessage('Failed to delete entry. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleEditEntry = (entryId: string, date: string) => {
    setEditingEntryId(entryId);
    setEditingDate(date);
    setSelectedHistoryDate(date);
  };

  const cancelEdit = () => {
    setEditingEntryId(null);
    setEditingDate(null);
    setSelectedHistoryDate(null);
    // Reset to current date view
    setGratitudeDate('today');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Gratitude Entry Form */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <div className="text-center mb-6">
            <HeartIcon className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.gratitudePractice}</h2>
            <p className="text-slate-600">Take a moment to notice what you're grateful for.</p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-700">
                {editingDate && editingDate !== selectedDateKey 
                  ? `Editing: ${new Date(editingDate).toLocaleDateString(locale || 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : gratitudeDate === 'today' 
                    ? 'Today\'s Gratitude' 
                    : `Gratitude for ${selectedDate.toLocaleDateString(locale || 'en-US', { month: 'long', day: 'numeric' })}`}
              </h3>
              {editingDate && editingDate !== selectedDateKey && (
                <p className="text-sm text-slate-500 mt-1">This entry will be saved to the original date</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setGratitudeDate('today');
                  setEditingDate(null); // Clear editing date when switching to today
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  gratitudeDate === 'today'
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {t.today || 'Today'}
              </button>
              <button
                onClick={() => {
                  setGratitudeDate('yesterday');
                  setEditingDate(null); // Clear editing date when switching to yesterday
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  gratitudeDate === 'yesterday'
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {t.yesterday || 'Yesterday'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <TextareaWithLimit
              value={gratitude}
              onChange={setGratitude}
              placeholder="Write what you're grateful for..."
              className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200 text-slate-700"
              rows={6}
              unlimited={true}
            />
          </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={saveGratitude}
                  disabled={isSaving || !gratitude.trim()}
                  className="bg-pink-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-pink-700 disabled:bg-pink-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Gratitude'}
                </button>
                {editingEntryId && (
                  <button
                    onClick={cancelEdit}
                    className="bg-slate-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {savedMessage && (
                <span className="text-sm text-green-600 font-medium">{savedMessage}</span>
              )}
            </div>
        </div>
      </div>

      {/* Gratitude History */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-700 mb-6">{t.gratitudeHistory || 'Gratitude History'}</h2>

          {getSortedGratitudeEntries().length === 0 ? (
            <p className="text-slate-500 text-center py-8">{t.noGratitudeEntries || 'No gratitude entries yet. Start by adding today\'s gratitude above.'}</p>
          ) : (
            <div className="space-y-4">
              {getSortedGratitudeEntries().map((entry) => (
                <div
                  key={entry.entryId}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-700">{formatDate(entry.date)}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEntry(entry.entryId, entry.date)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(entry.entryId)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHistoryDate(entry.date)}
                    className="w-full text-left"
                  >
                    {entry.items.length > 0 && (
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {entry.items.join('\n\n')}
                      </p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Delete Entry</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this gratitude entry? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEntry(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="bg-slate-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

const MoodInfluencersPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const { getEntriesByType, createEntry, updateEntry, deleteEntry, isLoading } = usePracticeSync(user?.uid || '');
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [influencerDate, setInfluencerDate] = useState<'today' | 'yesterday'>('today');
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(null);
  const [editingDate, setEditingDate] = useState<string | null>(null); // Track if editing a specific date from history
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null); // Track which entry is being edited
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null); // Track entry being deleted

  const influencers = [
    '😴 Sleep quality',
    '😰 Stress levels',
    '🍎 Food intake',
    '🏃‍♀️ Exercise',
    '🔄 Hormones',
    '👥 People around me',
    '🌤️ Weather',
    '💼 Work/school',
    '✨ Other'
  ];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const selectedDate = influencerDate === 'today' ? today : yesterday;
  const selectedDateKey = getFormattedDate(selectedDate);

  // Load existing mood influencers for selected date
  useEffect(() => {
    if (!user?.uid || isLoading) return;

    const influencerEntries = getEntriesByType(PracticeType.MoodInfluencers);
    const dateEntry = influencerEntries.find(entry =>
      entry.content.date === selectedDateKey
    );

    if (dateEntry && dateEntry.content.selectedInfluencers) {
      setSelectedInfluencers(dateEntry.content.selectedInfluencers);
    } else {
      // Clear selection if no entry exists for selected date
      setSelectedInfluencers([]);
    }
  }, [user?.uid, isLoading, getEntriesByType, selectedDateKey]);

  // Load entry when selecting from history
  useEffect(() => {
    if (!user?.uid || !selectedHistoryDate || isLoading) return;

    const influencerEntries = getEntriesByType(PracticeType.MoodInfluencers);
    const dateEntry = influencerEntries.find(entry =>
      entry.content.date === selectedHistoryDate
    );

    if (dateEntry && dateEntry.content.selectedInfluencers) {
      setSelectedInfluencers(dateEntry.content.selectedInfluencers);
      // Set the date toggle to match the selected history date
      const todayKey = getFormattedDate(new Date());
      const yesterdayKey = getFormattedDate(yesterday);
      if (selectedHistoryDate === todayKey) {
        setInfluencerDate('today');
        setEditingDate(null); // Clear editing date for today
      } else if (selectedHistoryDate === yesterdayKey) {
        setInfluencerDate('yesterday');
        setEditingDate(null); // Clear editing date for yesterday
      } else {
        // For older dates, set editing date so we save to the original date
        setEditingDate(selectedHistoryDate);
      }
      setSelectedHistoryDate(null); // Reset after loading
    }
  }, [selectedHistoryDate, user?.uid, isLoading, getEntriesByType, yesterday]);

  const toggleInfluencer = (influencer: string) => {
    setSelectedInfluencers(prev =>
      prev.includes(influencer)
        ? prev.filter(i => i !== influencer)
        : [...prev, influencer]
    );
  };

  const saveMoodInfluencers = async () => {
    if (!user?.uid || selectedInfluencers.length === 0) return;

    setIsSaving(true);

    try {
      // Use editingDate if set (for older entries from history), otherwise use selectedDateKey
      const saveDateKey = editingDate || selectedDateKey;
      const influencerEntries = getEntriesByType(PracticeType.MoodInfluencers);
      const existingEntry = influencerEntries.find(entry =>
        entry.content.date === saveDateKey
      );

      const content = {
        date: saveDateKey,
        selectedInfluencers
      };

      if (existingEntry) {
        await updateEntry(existingEntry.entryId, { content });
      } else {
        await createEntry(PracticeType.MoodInfluencers, content);
      }

      setSavedMessage(t.moodInfluencersSaved || 'Mood influencers saved!');
      setTimeout(() => setSavedMessage(''), 3000);
      setEditingDate(null); // Clear editing date after save
    } catch (error) {
      console.error('Error saving mood influencers:', error);
      setSavedMessage('Failed to save. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const getSortedInfluencerEntries = () => {
    if (!user?.uid) return [];

    const influencerEntries = getEntriesByType(PracticeType.MoodInfluencers);
    return influencerEntries
      .map(entry => ({
        entryId: entry.entryId,
        date: entry.content.date,
        selectedInfluencers: entry.content.selectedInfluencers || []
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale || 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      await deleteEntry(entryId);
      setShowDeleteConfirm(null);
      setSavedMessage('Entry deleted successfully');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting entry:', error);
      setSavedMessage('Failed to delete entry. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleEditEntry = (entryId: string, date: string) => {
    setEditingEntryId(entryId);
    setEditingDate(date);
    setSelectedHistoryDate(date);
  };

  const cancelEdit = () => {
    setEditingEntryId(null);
    setEditingDate(null);
    setSelectedHistoryDate(null);
    // Reset to current date view
    setInfluencerDate('today');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mood Influencers Entry Form */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <div className="text-center mb-6">
            <SparklesIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.moodInfluencers}</h2>
            <p className="text-slate-600">Check what might have influenced your mood.</p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-700">
                {editingDate && editingDate !== selectedDateKey
                  ? `Editing: ${new Date(editingDate).toLocaleDateString(locale || 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : influencerDate === 'today'
                    ? 'Today\'s Mood Influencers'
                    : `Mood Influencers for ${selectedDate.toLocaleDateString(locale || 'en-US', { month: 'long', day: 'numeric' })}`}
              </h3>
              {editingDate && editingDate !== selectedDateKey && (
                <p className="text-sm text-slate-500 mt-1">This entry will be saved to the original date</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setInfluencerDate('today');
                  setEditingDate(null); // Clear editing date when switching to today
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  influencerDate === 'today'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {t.today || 'Today'}
              </button>
              <button
                onClick={() => {
                  setInfluencerDate('yesterday');
                  setEditingDate(null); // Clear editing date when switching to yesterday
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  influencerDate === 'yesterday'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {t.yesterday || 'Yesterday'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {influencers.map((influencer) => (
              <button
                key={influencer}
                onClick={() => toggleInfluencer(influencer)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedInfluencers.includes(influencer)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {influencer}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={saveMoodInfluencers}
                disabled={isSaving || selectedInfluencers.length === 0}
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Mood Influencers'}
              </button>
              {editingEntryId && (
                <button
                  onClick={cancelEdit}
                  className="bg-slate-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {savedMessage && (
              <span className="text-sm text-green-600 font-medium">{savedMessage}</span>
            )}
          </div>
        </div>
      </div>

      {/* Mood Influencers History */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-700 mb-6">{t.moodInfluencersHistory || 'Mood Influencers History'}</h2>

          {getSortedInfluencerEntries().length === 0 ? (
            <p className="text-slate-500 text-center py-8">{t.noMoodInfluencersEntries || 'No mood influencer entries yet. Start by adding today\'s mood influencers above.'}</p>
          ) : (
            <div className="space-y-4">
              {getSortedInfluencerEntries().map((entry) => (
                <div
                  key={entry.entryId}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-700">{formatDate(entry.date)}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEntry(entry.entryId, entry.date)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(entry.entryId)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHistoryDate(entry.date)}
                    className="w-full text-left"
                  >
                    {entry.selectedInfluencers.length > 0 && (
                      <p className="text-slate-600 text-sm">
                        {entry.selectedInfluencers.join(', ')}
                      </p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Delete Entry</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this mood influencers entry? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEntry(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="bg-slate-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

const OneMinuteResetPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { createEntry } = usePracticeSync(user?.uid || '');

  // Main states
  const [currentPhase, setCurrentPhase] = useState<'selection' | 'breathing' | 'grounding' | 'completed'>('selection');
  const [resetType, setResetType] = useState<'breathing' | 'body' | 'thought'>('breathing');

  // Breathing states
  const [breathingStep, setBreathingStep] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4);
  const [circleScale, setCircleScale] = useState(1);

  // Grounding states
  const [groundingStep, setGroundingStep] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groundingPrompts = [
    t.resetGroundingSee || "Name 1 thing you can see",
    t.resetGroundingHear || "Notice 1 sound you can hear",
    t.resetGroundingFeel || "Feel 1 physical sensation in your body"
  ];

  // Breathing animation effect
  React.useEffect(() => {
    if (currentPhase !== 'breathing') return;

    const updateBreathing = () => {
      if (timeLeft > 0) {
        setTimeLeft(prev => prev - 1);

        // Update circle scale based on breathing phase
        if (breathingStep === 'inhale') {
          setCircleScale(1 + (4 - timeLeft) * 0.3); // Scale up during inhale
        } else if (breathingStep === 'hold') {
          setCircleScale(1.2); // Stay large during hold
        } else if (breathingStep === 'exhale') {
          setCircleScale(1.2 - (1 - timeLeft) * 0.2); // Scale down during exhale
        }
      } else {
        // Move to next breathing step
        if (breathingStep === 'inhale') {
          setBreathingStep('hold');
          setTimeLeft(1); // Hold for 1 second
        } else if (breathingStep === 'hold') {
          setBreathingStep('exhale');
          setTimeLeft(4); // Exhale for 4 seconds
        } else if (breathingStep === 'exhale') {
          // Complete one breathing cycle
          if (cycleCount < 4) {
            setBreathingStep('inhale');
            setTimeLeft(4);
            setCycleCount(prev => prev + 1);
          } else {
            // Breathing complete, move to grounding
            setCurrentPhase('grounding');
            setGroundingStep(0);
            setShowPrompt(true);
          }
        }
      }
    };

    const interval = setInterval(updateBreathing, 1000);
    return () => clearInterval(interval);
  }, [currentPhase, breathingStep, timeLeft, cycleCount]);

  // Grounding auto-advance effect
  React.useEffect(() => {
    if (currentPhase !== 'grounding' || !showPrompt) return;

    const timer = setTimeout(() => {
      setShowPrompt(false);
      if (groundingStep < groundingPrompts.length - 1) {
        setTimeout(() => {
          setGroundingStep(prev => prev + 1);
          setShowPrompt(true);
        }, 1000); // 1 second pause between prompts
      } else {
        // Grounding complete
        setTimeout(() => {
          setCurrentPhase('completed');
          // Save completion
          if (user?.uid) {
            createEntry(PracticeType.OneMinuteReset, {
              type: resetType,
              completed: true,
              completedAt: new Date().toISOString()
            }).catch(error => console.error('Error saving reset completion:', error));
          }
        }, 2000); // Show completion for 2 seconds
      }
    }, 4000); // Show each prompt for 4 seconds

    return () => clearTimeout(timer);
  }, [currentPhase, groundingStep, showPrompt, groundingPrompts.length, resetType, user?.uid, createEntry]);

  const startReset = (type: 'breathing' | 'body' | 'thought') => {
    setResetType(type);
    setCurrentPhase(type === 'breathing' ? 'breathing' : 'completed');

    if (type === 'breathing') {
      setBreathingStep('inhale');
      setCycleCount(1);
      setTimeLeft(4);
      setCircleScale(1);
    } else if (type === 'body') {
      // Body reset - just mark as completed immediately
      setTimeout(() => {
        setCurrentPhase('completed');
        if (user?.uid) {
          createEntry(PracticeType.OneMinuteReset, {
            type: 'body',
            completed: true,
            completedAt: new Date().toISOString()
          }).catch(error => console.error('Error saving reset completion:', error));
        }
      }, 2000);
    } else if (type === 'thought') {
      // Thought reset - just mark as completed immediately
      setTimeout(() => {
        setCurrentPhase('completed');
        if (user?.uid) {
          createEntry(PracticeType.OneMinuteReset, {
            type: 'thought',
            completed: true,
            completedAt: new Date().toISOString()
          }).catch(error => console.error('Error saving reset completion:', error));
        }
      }, 2000);
    }
  };

  const resetToSelection = () => {
    setCurrentPhase('selection');
    setBreathingStep('inhale');
    setCycleCount(1);
    setTimeLeft(4);
    setCircleScale(1);
    setGroundingStep(0);
    setShowPrompt(true);
  };

  const getBreathingInstruction = () => {
    switch (breathingStep) {
      case 'inhale':
        return t.resetBreatheIn || 'Breathe in';
      case 'hold':
        return t.resetHold || 'Hold';
      case 'exhale':
        return t.resetBreatheOut || 'Breathe out';
      default:
        return '';
    }
  };

  const BreathingAnimation = () => (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-48 h-48 rounded-full border-4 border-green-200 flex items-center justify-center">
          {/* Breathing circle */}
          <div
            className={`w-24 h-24 rounded-full bg-green-100 border-4 border-green-400 transition-all duration-1000 ease-out ${
              prefersReducedMotion ? '' : ''
            }`}
            style={{
              transform: `scale(${circleScale})`,
              transition: prefersReducedMotion ? 'none' : 'transform 1s ease-out'
            }}
          />
        </div>

        {/* Countdown number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-green-700">{timeLeft}</span>
        </div>
      </div>

      {/* Instruction text */}
      <div className="text-center">
        <p className="text-2xl font-medium text-slate-700 mb-2">{getBreathingInstruction()}</p>
        <p className="text-slate-500">Cycle {cycleCount} of 4</p>
      </div>
    </div>
  );

  const GroundingExercise = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">
          {t.resetGroundingTitle || 'Ground Yourself'}
        </h3>
      </div>

      {showPrompt && (
        <div className="mb-8">
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            {groundingPrompts[groundingStep]}
          </p>
          <button
            onClick={() => setShowPrompt(false)}
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.next || 'Next'}
          </button>
        </div>
      )}

      {!showPrompt && groundingStep < groundingPrompts.length - 1 && (
        <div className="flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            {groundingPrompts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= groundingStep ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ResetSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          {t.resetChooseType || 'Choose Your Reset'}
        </h3>
        <p className="text-slate-600">
          {t.resetDescription || 'Take a moment to find your calm'}
        </p>
      </div>

      {/* Breathing Reset */}
      <button
        onClick={() => startReset('breathing')}
        className="w-full bg-white border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 transition-colors text-left"
      >
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            <h4 className="font-semibold text-slate-800">
              {t.resetBreathingTitle || 'Breathing Reset'}
            </h4>
            <p className="text-sm text-slate-600">
              {t.resetBreathingDesc || 'Guided breathing with grounding'}
            </p>
          </div>
          <svg className={`w-5 h-5 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Body Reset */}
      <button
        onClick={() => startReset('body')}
        className="w-full bg-white border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-colors text-left"
      >
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            <h4 className="font-semibold text-slate-800">
              {t.resetBodyTitle || 'Body Reset'}
            </h4>
            <p className="text-sm text-slate-600">
              {t.resetBodyDesc || 'Relax your shoulders, jaw, and breath'}
            </p>
          </div>
          <svg className={`w-5 h-5 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Thought Reset */}
      <button
        onClick={() => startReset('thought')}
        className="w-full bg-white border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-colors text-left"
      >
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            <h4 className="font-semibold text-slate-800">
              {t.resetThoughtTitle || 'Thought Reset'}
            </h4>
            <p className="text-sm text-slate-600">
              {t.resetThoughtDesc || 'Gentle reflective prompts'}
            </p>
          </div>
          <svg className={`w-5 h-5 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );

  const CompletedScreen = () => (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">
        {t.resetCompleted || 'Reset Complete'}
      </h3>
      <p className="text-slate-600 mb-8">
        {t.resetCompletedDesc || 'Take a moment to notice how you feel'}
      </p>
      <div className="space-y-3">
        <button
          onClick={resetToSelection}
          className="block w-full bg-slate-200 text-slate-800 font-medium py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors"
        >
          {t.resetAgain || 'Do Another Reset'}
        </button>
        <button
          onClick={onBack}
          className="block w-full bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <ClockIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.oneMinuteReset}</h2>
        <p className="text-slate-600">
          {t.resetSubtitle || 'A gentle reset to find your calm'}
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8">
        {currentPhase === 'selection' && <ResetSelection />}
        {currentPhase === 'breathing' && <BreathingAnimation />}
        {currentPhase === 'grounding' && <GroundingExercise />}
        {currentPhase === 'completed' && <CompletedScreen />}
      </div>
    </div>
  );
};

const HelpfulReadingPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { createEntry } = usePracticeSync(user?.uid || '');

  const articles = [
    {
      title: '5 Benefits of Journaling for Mental Health',
      url: 'https://positivepsychology.com/benefits-of-journaling/',
      description: 'Discover how journaling enhances mental clarity, reduces anxiety, manages stress, and supports emotional processing through research-backed benefits.'
    },
    {
      title: 'Understanding Your Emotions',
      url: 'https://www.psychologytoday.com/us/basics/emotions',
      description: 'Learn about different emotions and how to work with them.'
    }
  ];

  const handleReadArticle = async (article: typeof articles[0]) => {
    if (!user?.uid) {
      // Just open the article for guest users
      window.open(article.url, '_blank');
      return;
    }

    try {
      await createEntry(PracticeType.HelpfulReading, {
        articleTitle: article.title,
        articleUrl: article.url,
        readAt: new Date().toISOString()
      });
      // Open article after saving
      window.open(article.url, '_blank');
    } catch (error) {
      console.error('Error saving reading activity:', error);
      // Still open the article even if saving fails
      window.open(article.url, '_blank');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <NewspaperIcon className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.helpfulReading}</h2>
        <p className="text-slate-600">Curated articles to support your mood and self-care journey.</p>
      </div>

      <div className="space-y-4 mb-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-2">{article.title}</h3>
            <p className="text-slate-600 text-sm mb-3">{article.description}</p>
            <button
              onClick={() => handleReadArticle(article)}
              className="text-orange-600 hover:text-orange-700 underline text-sm font-medium"
            >
              Read Article →
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-orange-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

// MicroDiary Content Component - adapted for Practices context
const MicroDiaryContent: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const { getEntriesByType, createEntry, updateEntry, deleteEntry, isLoading } = usePracticeSync(user?.uid || '');
  const [goodFeeling, setGoodFeeling] = useState('');
  const [drainedEnergy, setDrainedEnergy] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedPDF, setExportedPDF] = useState<{ url: string; filename: string } | null>(null);
  const [reflectionDate, setReflectionDate] = useState<'today' | 'yesterday'>('today');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null); // Track which entry is being edited
  const [editingDateKey, setEditingDateKey] = useState<string | null>(null); // Track the original date key when editing historical entries
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null); // Track entry being deleted

  // Ref for the editing form area
  const editingFormRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Use editing date key if we're editing a historical entry, otherwise use the selected date
  const selectedDateKey = editingDateKey || getFormattedDate(reflectionDate === 'today' ? today : yesterday);
  const selectedDate = editingDateKey ? new Date(editingDateKey) : (reflectionDate === 'today' ? today : yesterday);

  // Load reflection for selected date from synced data
  useEffect(() => {
    if (!user?.uid || isLoading) return;

    const reflectionEntries = getEntriesByType(PracticeType.Reflection);
    const dateEntry = reflectionEntries.find(entry =>
      entry.content.date === selectedDateKey
    );

    if (dateEntry) {
      setGoodFeeling(dateEntry.content.goodFeeling || '');
      setDrainedEnergy(dateEntry.content.drainedEnergy || '');
    } else {
      // Clear fields if no entry exists for selected date
      setGoodFeeling('');
      setDrainedEnergy('');
    }
  }, [user?.uid, isLoading, getEntriesByType, selectedDateKey]);

  // Helper function to ensure proper prefixing
  const ensurePrefix = (text: string, prefix: string) => {
    const trimmed = text.trim();
    if (trimmed.startsWith(prefix)) {
      return trimmed;
    }
    return `${prefix} ${trimmed}`;
  };

  const saveReflection = async () => {
    if (!user?.uid || (!goodFeeling.trim() && !drainedEnergy.trim())) return;

    setIsSaving(true);

    try {
      const reflectionEntries = getEntriesByType(PracticeType.Reflection);

      // When editing, preserve the original entry's date. When creating new, use selected date.
      const targetDateKey = editingEntryId ?
        // Find the original entry's date when editing
        reflectionEntries.find(e => e.entryId === editingEntryId)?.content.date || selectedDateKey
        : selectedDateKey;

      const content = {
        date: targetDateKey,
        goodFeeling: goodFeeling.trim() ? ensurePrefix(goodFeeling, '+') : undefined,
        drainedEnergy: drainedEnergy.trim() ? ensurePrefix(drainedEnergy, '-') : undefined,
      };

      if (editingEntryId) {
        // Update the specific entry being edited - preserve original date
        await updateEntry(editingEntryId, { content });
        setEditingEntryId(null); // Clear editing state after save
        setEditingDateKey(null); // Clear editing date key
      } else {
        // Check for existing entry on the selected date
        const existingEntry = reflectionEntries.find(entry =>
          entry.content.date === selectedDateKey
        );

        if (existingEntry) {
          // Update existing entry
          await updateEntry(existingEntry.entryId, { content });
        } else {
          // Create new entry
          await createEntry(PracticeType.Reflection, content);
        }
      }

      setSavedMessage(t.reflectionSaved);

      // Clear saved message after 3 seconds
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error saving reflection:', error);
      setSavedMessage('Failed to save. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async (filters: PDFExportFilters) => {
    setIsExporting(true);
    try {
      const filename = `reflection-history-${new Date().toISOString().split('T')[0]}.pdf`;
      const reflectionData = getSortedReflections();
      const result = await reflectionPDFExporter.exportPDF(reflectionData, filters, filename, 'Mood Period Tracker');

      setIsExportModalOpen(false);

      if (result.isMobile) {
        // On mobile/WebView: Show PDF with manual open/share options
        // Mobile browsers often block automatic downloads, so we provide a better UX
        setExportedPDF({ url: result.url, filename: result.filename });
      } else {
        // On desktop: Trigger download automatically (traditional behavior)
        const link = document.createElement('a');
        link.href = result.url;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message for desktop users
        alert('PDF exported successfully! Check your downloads folder.');
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getSortedReflections = () => {
    if (!user?.uid) return [];

    const reflectionEntries = getEntriesByType(PracticeType.Reflection);
    return reflectionEntries
      .map(entry => ({
        entryId: entry.entryId,
        ...entry.content
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      await deleteEntry(entryId);
      setShowDeleteConfirm(null);
      setSavedMessage('Entry deleted successfully');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting entry:', error);
      setSavedMessage('Failed to delete entry. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleEditEntry = (entryId: string, date: string) => {
    setEditingEntryId(entryId);
    setEditingDateKey(date); // Preserve the original entry date
    // Load the entry data for editing
    const reflectionEntries = getEntriesByType(PracticeType.Reflection);
    const entry = reflectionEntries.find(e => e.entryId === entryId);
    if (entry) {
      setGoodFeeling(entry.content.goodFeeling || '');
      setDrainedEnergy(entry.content.drainedEnergy || '');
    }
  };

  // Auto-scroll to editing form when entering edit mode
  useEffect(() => {
    if (editingEntryId && editingFormRef.current) {
      // Small delay to ensure the form is rendered before scrolling
      setTimeout(() => {
        editingFormRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [editingEntryId]);

  const cancelEdit = () => {
    setEditingEntryId(null);
    setEditingDateKey(null); // Clear editing date key
    // Reset to current date view and clear fields
    setReflectionDate('today');
    const today = new Date();
    const todayKey = getFormattedDate(today);
    const reflectionEntries = getEntriesByType(PracticeType.Reflection);
    const dateEntry = reflectionEntries.find(entry =>
      entry.content.date === todayKey
    );
    if (dateEntry) {
      setGoodFeeling(dateEntry.content.goodFeeling || '');
      setDrainedEnergy(dateEntry.content.drainedEnergy || '');
    } else {
      setGoodFeeling('');
      setDrainedEnergy('');
    }
  };

  // Helper function to format reflection answers for display
  const formatReflectionAnswer = (answer: string, isGoodFeeling: boolean) => {
    // If answer already has prefix (new format), return as-is
    if (answer.startsWith('+ ') || answer.startsWith('- ')) {
      return answer;
    }
    // If answer doesn't have prefix (old format), add appropriate prefix
    return isGoodFeeling ? `+ ${answer}` : `- ${answer}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Today's Reflection */}
      <div ref={editingFormRef} className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <p className="text-slate-700 leading-relaxed mb-6">
            <span className="font-bold text-purple-600 text-base">{t.reflectionExplanationTitle}</span>
            <span className="text-slate-600 text-sm">{t.reflectionExplanationText}</span>
          </p>
          <button
            onClick={() => window.open('https://share.google/HtUk1pvQIj9LKkR0G', '_blank')}
            className="text-purple-600 hover:text-purple-700 underline text-sm font-medium mb-6 block"
          >
            {t.reflectionLearnMore}
          </button>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-700">
              {editingEntryId
                ? `${t.editing || 'Editing'}: ${selectedDate.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
                : reflectionDate === 'today'
                  ? t.todaysReflection
                  : t.reflectionForDate?.replace('{date}', selectedDate.toLocaleDateString(locale, { month: 'long', day: 'numeric' })) || `${selectedDate.toLocaleDateString(locale, { month: 'long', day: 'numeric' })} Reflection`
              }
            </h2>
            {!editingEntryId && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setReflectionDate('today');
                    setEditingDateKey(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    reflectionDate === 'today' && !editingDateKey
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {t.today || 'Today'}
                </button>
                <button
                  onClick={() => {
                    setReflectionDate('yesterday');
                    setEditingDateKey(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    reflectionDate === 'yesterday' && !editingDateKey
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {t.yesterday || 'Yesterday'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                {reflectionDate === 'today' ? t.reflectionPrompt1 : (t.reflectionPrompt1Yesterday || t.reflectionPrompt1.replace('today', 'yesterday'))}
              </label>
              <TextareaWithLimit
                value={goodFeeling}
                onChange={setGoodFeeling}
                placeholder={reflectionDate === 'today' ? "Optional - share what brought you joy today..." : "Optional - share what brought you joy yesterday..."}
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 text-slate-700"
                rows={2}
                unlimited={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                {reflectionDate === 'today' ? t.reflectionPrompt2 : (t.reflectionPrompt2Yesterday || t.reflectionPrompt2.replace('today', 'yesterday'))}
              </label>
              <TextareaWithLimit
                value={drainedEnergy}
                onChange={setDrainedEnergy}
                placeholder={reflectionDate === 'today' ? "Optional - share what challenged you today..." : "Optional - share what challenged you yesterday..."}
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 resize-none text-slate-700"
                rows={2}
                unlimited={true}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={saveReflection}
                  disabled={isSaving || (!goodFeeling.trim() && !drainedEnergy.trim())}
                  className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Reflection'}
                </button>
                {editingEntryId && (
                  <button
                    onClick={cancelEdit}
                    className="bg-slate-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {savedMessage && (
                <span className="text-sm text-green-600 font-medium">{savedMessage}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reflection History */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-700">{t.reflectionHistory}</h2>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              {t.exportHistoryAsPDF}
            </button>
          </div>

          {getSortedReflections().length === 0 ? (
            <p className="text-slate-500 text-center py-8">{t.noReflections}</p>
          ) : (
            <div className="space-y-4">
              {getSortedReflections().map((reflection) => (
                <div key={reflection.entryId} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-slate-700">{formatDate(reflection.date)}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEntry(reflection.entryId, reflection.date)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(reflection.entryId)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {reflection.goodFeeling && (
                    <div className="mb-2 flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg leading-none mt-0.5">+</span>
                      <p className="text-slate-700 leading-relaxed flex-1 overflow-wrap-anywhere"
                         style={{
                           wordWrap: 'break-word',
                           overflowWrap: 'break-word',
                           wordBreak: 'break-word',
                           hyphens: 'auto'
                         }}>
                        {reflection.goodFeeling.startsWith('+ ') ? reflection.goodFeeling.substring(2) : reflection.goodFeeling}
                      </p>
                    </div>
                  )}

                  {reflection.drainedEnergy && (
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold text-lg leading-none mt-0.5">-</span>
                      <p className="text-slate-700 leading-relaxed flex-1 overflow-wrap-anywhere"
                         style={{
                           wordWrap: 'break-word',
                           overflowWrap: 'break-word',
                           wordBreak: 'break-word',
                           hyphens: 'auto'
                         }}>
                        {reflection.drainedEnergy.startsWith('- ') ? reflection.drainedEnergy.substring(2) : reflection.drainedEnergy}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Delete Entry</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this reflection entry? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEntry(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="bg-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>

      {/* Mobile PDF Export Result */}
      {exportedPDF && (
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-6">
            <div className="text-center">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">PDF Generated Successfully!</h3>
              <p className="text-green-700 mb-4">
                Your reflection history PDF is ready. Use the buttons below to open or save/share your PDF.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={exportedPDF.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open PDF
                </a>
                <button
                  onClick={async () => {
                    try {
                      if (supportsFileSharing() && exportedPDF) {
                        const response = await fetch(exportedPDF.url);
                        const blob = await response.blob();
                        const file = new File([blob], exportedPDF.filename, { type: 'application/pdf' });

                        const canShare = navigator.canShare({ files: [file] });
                        if (canShare) {
                          await navigator.share({
                            title: 'Mood Period Tracker - Reflection History',
                            text: 'My reflection history from Mood Period Tracker',
                            files: [file]
                          });
                          return;
                        }
                      }

                      // Fallback: try clipboard
                      if (supportsClipboard()) {
                        await navigator.clipboard.writeText(exportedPDF.url);
                        alert('PDF link copied to clipboard! You can paste it in your browser to download, or share it with others.');
                      } else {
                        alert('Copy this link to share or download your PDF:\n\n' + exportedPDF.url);
                      }
                    } catch (error) {
                      console.error('Share failed:', error);

                      // Final fallback
                      if (supportsClipboard()) {
                        try {
                          await navigator.clipboard.writeText(exportedPDF.url);
                          alert('PDF link copied to clipboard. You can paste it in your browser to download.');
                        } catch (clipboardError) {
                          alert('Unable to share PDF automatically. Please try opening the PDF first, then use your browser\'s share/save options.');
                        }
                      } else {
                        alert('Unable to share PDF. Please try opening the PDF first, then use your browser\'s share/save options.');
                      }
                    }
                  }}
                  className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  {supportsFileSharing() ? 'Share/Save PDF' : 'Copy PDF Link'}
                </button>
              </div>
              <button
                onClick={() => {
                  setExportedPDF(null);
                  // Clean up the blob URL
                  URL.revokeObjectURL(exportedPDF.url);
                }}
                className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <PDFExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportPDF}
        isExporting={isExporting}
      />
    </div>
  );
};