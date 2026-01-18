import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { USFlagIcon, RussianFlagIcon, SpanishFlagIcon, PortugueseFlagIcon, FrenchFlagIcon, GermanFlagIcon, HindiFlagIcon, IndonesianFlagIcon, TurkishFlagIcon, ArabicFlagIcon } from './Icons';

const languages = [
  { code: 'en', label: 'EN', flag: USFlagIcon, englishName: 'English', nativeName: 'English' },
  { code: 'ar', label: 'AR', flag: ArabicFlagIcon, englishName: 'Arabic', nativeName: 'العربية' },
  { code: 'de', label: 'DE', flag: GermanFlagIcon, englishName: 'German', nativeName: 'Deutsch' },
  { code: 'es', label: 'ES', flag: SpanishFlagIcon, englishName: 'Spanish', nativeName: 'Español' },
  { code: 'fr', label: 'FR', flag: FrenchFlagIcon, englishName: 'French', nativeName: 'Français' },
  { code: 'hi', label: 'HI', flag: HindiFlagIcon, englishName: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'id', label: 'ID', flag: IndonesianFlagIcon, englishName: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'pt-BR', label: 'PT', flag: PortugueseFlagIcon, englishName: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
  { code: 'ru', label: 'RU', flag: RussianFlagIcon, englishName: 'Russian', nativeName: 'Русский' },
  { code: 'tr', label: 'TR', flag: TurkishFlagIcon, englishName: 'Turkish', nativeName: 'Türkçe' },
].sort((a, b) => a.englishName.localeCompare(b.englishName));

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: typeof languages[number]['code']) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (!currentLanguage) return null;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-lg px-2.5 py-1.5 hover:bg-white/80 hover:border-slate-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400/30 transition-all duration-200 text-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <currentLanguage.flag className="w-4 h-3 rounded-sm flex-shrink-0 opacity-80" />
        <span className="font-medium text-slate-600">{currentLanguage.label}</span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg shadow-md z-50 min-w-[220px] sm:min-w-[240px] max-w-[280px] max-h-60 overflow-y-auto ${isRTL ? 'right-0' : 'left-0'}`}
          role="listbox"
          aria-label="Language options"
        >
          {languages.map(({ code, label, flag: FlagIcon, englishName, nativeName }) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors duration-150 ${
                language === code ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
              } ${language === code ? 'font-medium' : ''}`}
              role="option"
              aria-selected={language === code}
            >
              <FlagIcon className="w-4 h-3 rounded-sm flex-shrink-0 opacity-80" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium truncate">{englishName}</span>
                <span className="text-xs text-slate-500 break-words leading-tight">({nativeName})</span>
              </div>
              {language === code && (
                <svg className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
