
import React, { useRef } from 'react';
import { CloseIcon, DownloadIcon, UploadIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import type { DailyEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

interface SettingsProps {
  showCycleTracker: boolean;
  onToggleCycleTracker: (value: boolean) => void;
  onClose: () => void;
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

export const Settings: React.FC<SettingsProps> = ({ showCycleTracker, onToggleCycleTracker, onClose, remindersEnabled, onToggleReminders, notificationPermission, dailyData, onImportData }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md m-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold text-slate-800">{t.settingsTitle}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-full hover:bg-slate-100"
            aria-label={t.closeSettings}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
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
        </div>

        {/* Data Management Section */}
        <div className="border-t border-slate-200 pt-4 mt-6">
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

      </div>
    </div>
  );
};

// Add a simple fade-in animation for the modal
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
  }
`;
document.head.append(style);