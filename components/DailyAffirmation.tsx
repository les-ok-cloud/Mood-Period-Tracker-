
import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

export const DailyAffirmation: React.FC = () => {
  const { t } = useLanguage();
  const [affirmation, setAffirmation] = useState<string>('');

  useEffect(() => {
    // Deterministic selection based on date to ensure it stays the same for the day
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use the affirmations array from translations
    if (t.affirmations && t.affirmations.length > 0) {
        const index = dayOfYear % t.affirmations.length;
        setAffirmation(t.affirmations[index]);
    } else {
        setAffirmation(t.affirmationFallback);
    }
  }, [t]);

  return (
    <div className="bg-gradient-to-r from-purple-200 via-pink-100 to-rose-200 text-center p-3 text-purple-800 font-medium shadow-sm w-full">
      <div className="flex items-center justify-center gap-2 animate-fade-in">
        <SparkleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
        <p className="text-sm sm:text-base">
            <>
              <span className="font-semibold mr-2 text-purple-700/90">{t.affirmationLabel}</span>
              <span className="text-purple-900">{affirmation}</span>
            </>
        </p>
      </div>
    </div>
  );
};

// Add a simple fade-in animation for the component
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
`;
document.head.append(style);
