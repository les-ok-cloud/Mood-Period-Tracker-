import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SignOutIcon, UserIcon, DownloadIcon, UploadIcon, ShareIcon, StarIcon, ChevronRight } from './Icons';
import type { DailyEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

// Share Modal Component
const ShareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  onCopyLink: () => void;
  t: any;
  isRTL: boolean;
}> = ({ isOpen, onClose, onShare, onCopyLink, t, isRTL }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">{t.shareApp}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="p-2">
          <button
            onClick={() => {
              onShare();
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 rounded-lg transition-colors ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
              <div className="font-medium text-slate-800">{t.shareViaSystem}</div>
              <div className="text-sm text-slate-500">{t.shareAppTitle}</div>
            </div>
          </button>

          <button
            onClick={() => {
              onCopyLink();
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 rounded-lg transition-colors ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
              <div className="font-medium text-slate-800">{t.copyLink}</div>
              <div className="text-sm text-slate-500">Play Store</div>
            </div>
          </button>
        </div>

        {/* Cancel */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-3 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            {t.deleteAccountCancel || 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

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

// Toast Component
const Toast: React.FC<{
  message: string;
  isVisible: boolean;
  onHide: () => void;
}> = ({ message, isVisible, onHide }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

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
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleSystemShare = async () => {
    const shareData = {
      title: t.shareAppTitle,
      text: t.shareAppMessage + t.shareAppUrl,
      url: t.shareAppUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy entire message to clipboard
        const shareText = `${shareData.text}${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        showToastMessage(t.linkCopied);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback
      try {
        const shareText = `${shareData.text}${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        showToastMessage(t.linkCopied);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        showToastMessage('Sharing not available');
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(t.shareAppUrl);
      showToastMessage(t.linkCopied);
    } catch (error) {
      console.error('Error copying link:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = t.shareAppUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToastMessage(t.linkCopied);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        showToastMessage('Copy failed');
      }
      document.body.removeChild(textArea);
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  const handleRate = () => {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.github.les_ok_cloud.Mood_Period_Tracker_&pcampaignid=web_share';
    const playStoreDeepLink = 'market://details?id=com.github.les_ok_cloud.Mood_Period_Tracker_';

    // Detect if we're on Android (mobile app or web)
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const attemptOpenUrl = (url: string, fallback?: () => void): Promise<boolean> => {
      return new Promise((resolve) => {
        const newWindow = window.open(url, '_blank');

        // For mobile browsers, window.open might not work reliably
        // We'll use a timeout to detect if the window opened successfully
        setTimeout(() => {
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Window didn't open or was blocked
            if (fallback) {
              fallback();
            }
            resolve(false);
          } else {
            resolve(true);
          }
        }, 1000);
      });
    };

    const openPlayStore = async () => {
      try {
        let success = false;

        // On Android mobile, try deep link first (opens Play Store app)
        if (isAndroid && isMobile) {
          success = await attemptOpenUrl(playStoreDeepLink, () => {
            // If deep link fails, try web URL
            return attemptOpenUrl(playStoreUrl);
          });

          if (!success) {
            // Final fallback - try web URL directly
            success = await attemptOpenUrl(playStoreUrl);
          }
        } else {
          // On iOS, desktop, or non-Android mobile - use web URL
          success = await attemptOpenUrl(playStoreUrl);
        }

        if (!success) {
          // Show error toast
          showToastMessage(t.rateAppError);
        }
        // Don't show success message - only show errors
      } catch (error) {
        console.error('Error opening Play Store:', error);
        showToastMessage(t.rateAppError);
      }
    };

    openPlayStore();
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
                  onClick={handleShareClick}
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

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleSystemShare}
        onCopyLink={handleCopyLink}
        t={t}
        isRTL={isRTL}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onHide={hideToast}
      />

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