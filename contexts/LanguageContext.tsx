
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { translations } from '../lib/translations';

export type Language = 'en' | 'ru' | 'es' | 'pt-BR' | 'fr' | 'de' | 'hi' | 'id' | 'tr' | 'ar';
type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  locale: 'en-US' | 'ru-RU' | 'es-ES' | 'pt-BR' | 'fr-FR' | 'de-DE' | 'hi-IN' | 'id-ID' | 'tr-TR' | 'ar-SA';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('language') as Language;
      return savedLang && ['en', 'ru', 'es', 'pt-BR', 'fr', 'de', 'hi', 'id', 'tr', 'ar'].includes(savedLang) ? savedLang : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error writing language to localStorage', error);
    }
  }, [language]);

  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language] || translations.en, // Fallback to English if translation is missing
    locale: {
      'en': 'en-US',
      'ru': 'ru-RU',
      'es': 'es-ES',
      'pt-BR': 'pt-BR',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'hi': 'hi-IN',
      'id': 'id-ID',
      'tr': 'tr-TR',
      'ar': 'ar-SA'
    }[language] || 'en-US',
    isRTL: language === 'ar'
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
