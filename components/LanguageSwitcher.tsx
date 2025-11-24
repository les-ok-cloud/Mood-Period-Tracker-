import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { USFlagIcon, RussianFlagIcon } from './Icons';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'ru') => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  return (
    <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full shadow-lg p-1 space-x-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`flex flex-col items-center justify-center gap-1 w-10 h-10 text-xs font-bold rounded-full transition-colors duration-200 ${
          language === 'en' ? 'bg-purple-500 text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
        aria-pressed={language === 'en'}
      >
        <span>EN</span>
        <USFlagIcon className="w-4 h-auto rounded-sm" />
      </button>
      <button
        onClick={() => switchLanguage('ru')}
        className={`flex flex-col items-center justify-center gap-1 w-10 h-10 text-xs font-bold rounded-full transition-colors duration-200 ${
          language === 'ru' ? 'bg-purple-500 text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
        aria-pressed={language === 'ru'}
      >
        <span>RU</span>
        <RussianFlagIcon className="w-4 h-auto rounded-sm" />
      </button>
    </div>
  );
};
