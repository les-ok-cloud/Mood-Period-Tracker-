import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SignOutIcon, UserIcon, DownloadIcon, UploadIcon, ShareIcon, StarIcon, ChevronRight } from './Icons';
import type { DailyEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

interface ProfileProps {
  showCycleTracker: boolean;
  onToggleCycleTracker: (value: boolean) => void;
  remindersEnabled: boolean;
  onToggleReminders: (value: boolean) => void;
  notificationPermission: NotificationPermission;
  dailyData: Record<string, DailyEntry>;
  onImportData: (data: { settings: { showCycleTracker: boolean; remindersEnabled: boolean; }; dailyData: Record<string, DailyEntry>; }) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean; }> = ({ checked, onChange, label, disabled = false }) => (
  <label className={`flex items-center justify-between p-2 rounded-lg ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-slate-50'}`}>
    <span className="text-slate-700 font-medium">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} />
      <div className={`block w-14 h-8 rounded-full ${checked && !disabled ? 'bg-purple-600' : 'bg-slate-300'} transition-colors`}></div>
      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:transform peer-checked:translate-x-6"></div>
    </div>
  </label>
);

// Language setting component
type Language = 'en' | 'ru' | 'es' | 'pt-BR' | 'fr' | 'de' | 'hi' | 'id' | 'tr' | 'ar';

const LanguageSetting: React.FC = () => {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN', englishName: 'English', nativeName: 'English' },
    { code: 'ar', label: 'AR', englishName: 'Arabic', nativeName: 'العربية' },
    { code: 'de', label: 'DE', englishName: 'German', nativeName: 'Deutsch' },
    { code: 'es', label: 'ES', englishName: 'Spanish', nativeName: 'Español' },
    { code: 'fr', label: 'FR', englishName: 'French', nativeName: 'Français' },
    { code: 'hi', label: 'HI', englishName: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'id', label: 'ID', englishName: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'pt-BR', label: 'PT', englishName: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
    { code: 'ru', label: 'RU', englishName: 'Russian', nativeName: 'Русский' },
    { code: 'tr', label: 'TR', englishName: 'Turkish', nativeName: 'Türkçe' },
  ].sort((a, b) => a.englishName.localeCompare(b.englishName));

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: typeof languages[number]['code']) => {
    setLanguage(langCode as Language);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest('.language-dropdown')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (!currentLanguage) return null;

  return (
    <div className="language-dropdown relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-slate-700 font-medium hover:bg-slate-200/50 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span>{t.language}</span>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-slate-500 text-sm">{currentLanguage.nativeName}</span>
          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} ${isRTL ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg shadow-md z-50 min-w-[280px] max-w-[320px] max-h-60 overflow-y-auto ${isRTL ? 'right-0' : 'left-0'}`}
          role="listbox"
          aria-label="Language options"
        >
          {languages.map(({ code, englishName, nativeName }) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className={`w-full flex flex-col px-4 py-3 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors duration-150 ${
                language === code ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
              } ${language === code ? 'font-medium' : ''} ${isRTL ? 'text-right' : ''}`}
              role="option"
              aria-selected={language === code}
            >
              <span className="text-sm font-medium truncate">{englishName}</span>
              <span className="text-xs text-slate-500 break-words leading-tight">{nativeName}</span>
              {language === code && (
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Profile: React.FC<ProfileProps> = ({
  showCycleTracker,
  onToggleCycleTracker,
  remindersEnabled,
  onToggleReminders,
  notificationPermission,
  dailyData,
  onImportData
}) => {
  const { user, signOutUser, deleteUserAccount } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Mood & Period Tracker',
      text: t.shareAppMessage,
      url: t.shareAppUrl,
    };

    try {
      if (navigator.share) {
        // Use native Web Share API
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('Link copied to clipboard! Share it with your friends.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('Link copied to clipboard! Share it with your friends.');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        alert('Sorry, sharing is not available on this device.');
      }
    }
  };

  const handleRate = () => {
    window.open(t.rateAppUrl, '_blank');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      alert(t.deleteAccountConfirm);
      return;
    }

    setIsDeleting(true);
    try {
      await deleteUserAccount();
      // Clear local data
      localStorage.clear();
      // Show success message and redirect would happen in the auth context
      alert(t.deleteAccountSuccess);
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t.deleteAccountError);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleExport = () => {
    try {
      const dataToExport = {
        settings: {
          showCycleTracker,
          remindersEnabled,
        },
        dailyData,
      };
      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const date = getFormattedDate(new Date());
      link.download = `mood-tracker-export-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data", error);
      alert("Sorry, there was an error exporting your data.");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File content is not a string");
        const parsedData = JSON.parse(text);

        // Basic validation
        if (parsedData && typeof parsedData.settings === 'object' && typeof parsedData.dailyData === 'object') {
          onImportData(parsedData);
        } else {
          throw new Error("Invalid file format");
        }
      } catch (error) {
        console.error("Failed to import data", error);
        alert(t.importError);
      }
    };
    reader.onerror = () => {
      console.error("Failed to read file", reader.error);
      alert(t.importError);
    };
    reader.readAsText(file);

    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  if (!user) return null;

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl safe-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-700 mb-2">
              {user.isAnonymous ? 'Guest User' : user.displayName || user.email || 'Profile'}
            </h1>
            {user.email && !user.isAnonymous && (
              <p className="text-slate-500">{user.email}</p>
            )}
            {user.isAnonymous && (
              <p className="text-slate-500">Data saved locally on this device</p>
            )}
          </div>

          <div className="space-y-4">
            {/* Share App Section */}
            <div className="border-t border-slate-200 pt-6">
              <div className="bg-slate-100/50 p-3 rounded-lg">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-start gap-3 text-slate-700 font-medium"
                >
                  <ShareIcon className="w-5 h-5 text-slate-500" />
                  <span>{t.shareApp}</span>
                </button>
              </div>
              <div className="bg-slate-100/50 p-3 rounded-lg mt-3">
                <button
                  onClick={handleRate}
                  className="w-full flex items-center justify-start gap-3 text-slate-700 font-medium"
                >
                  <StarIcon className="w-5 h-5 text-slate-500" />
                  <span>{t.rateUs}</span>
                </button>
                <p className="text-slate-500 text-sm leading-relaxed mt-2 px-2">
                  {t.rateUsMessage}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">{t.settingsTitle}</h2>
              <div className="space-y-3">
                <div className="bg-slate-100/50 p-3 rounded-lg">
                  <ToggleSwitch
                    label={t.enableCycleTracking}
                    checked={showCycleTracker}
                    onChange={onToggleCycleTracker}
                  />
                  <p className="text-sm text-slate-500 mt-2 px-2">
                    {t.cycleTrackingDescription}
                  </p>
                </div>
                <div className="bg-slate-100/50 p-3 rounded-lg">
                  <ToggleSwitch
                    label={t.enableReminders}
                    checked={remindersEnabled}
                    onChange={onToggleReminders}
                    disabled={notificationPermission === 'denied'}
                  />
                  <p className="text-sm text-slate-500 mt-2 px-2">
                    {notificationPermission === 'denied' ? t.remindersDeniedDescription : t.remindersDescription}
                  </p>
                </div>
                <div className="bg-slate-100/50 p-3 rounded-lg">
                  <LanguageSetting />
                </div>
              </div>
            </div>

            {/* Data Management Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.dataManagement}</h3>
              <div className="space-y-3">
                <div className="bg-slate-100/50 p-3 rounded-lg">
                  <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                    <DownloadIcon className="w-5 h-5" />
                    {t.exportData}
                  </button>
                  <p className="text-sm text-slate-500 mt-2 px-2 text-center">{t.exportDescription}</p>
                </div>
                <div className="bg-slate-100/50 p-3 rounded-lg">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                  <button onClick={handleImportClick} className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                    <UploadIcon className="w-5 h-5" />
                    {t.importData}
                  </button>
                  <p className="text-sm text-slate-500 mt-2 px-2 text-center">{t.importDescription}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <SignOutIcon className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Delete Account Section */}
            <div className="border-t border-slate-200 pt-6">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full text-red-600 font-medium py-2 px-4 rounded-lg border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                {t.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">{t.deleteAccount}</h2>
              <p className="text-red-600 font-semibold text-sm mb-4">{t.deleteAccountWarning}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{t.deleteAccountDescription}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.deleteAccountConfirm}
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={t.deleteAccountPlaceholder}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 bg-slate-200 text-slate-800 font-medium py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                disabled={isDeleting}
              >
                {t.deleteAccountCancel}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                className="flex-1 bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
              >
                {isDeleting ? 'Deleting...' : t.deleteAccountDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add styles for toggle switch
const toggleStyle = document.createElement('style');
toggleStyle.textContent = `
  .dot {
    transition: transform 0.2s ease-in-out;
  }
`;
document.head.appendChild(toggleStyle);