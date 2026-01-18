
import React from 'react';
import { Mood } from '../types';
import { MOOD_DATA, MOOD_ORDER } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface MoodTrackerProps {
  selectedMood?: Mood | null;
  onSelect: (mood: Mood) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ selectedMood, onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-around items-start pt-4 pb-0">
      {MOOD_ORDER.map((mood) => {
        const data = MOOD_DATA[mood];
        const isSelected = selectedMood === mood;
        return (
          <div
            key={mood}
            onClick={() => onSelect(mood)}
            className="flex flex-col items-center gap-3 cursor-pointer group min-w-[4rem] max-w-[7rem] sm:max-w-[8rem] flex-1 text-center px-2"
            aria-label={t.selectMood.replace('{mood}', t[mood])}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(mood)}
          >
            <div
              className={`
                text-4xl sm:text-5xl transition-transform duration-200 transform group-hover:scale-110
                ${isSelected ? 'scale-110' : ''}
              `}
            >
              {data.emoji}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium transition-colors leading-tight break-words ${isSelected ? `${data.textColor} font-bold` : 'text-slate-600'}`}
            >
              {t[mood]}
            </span>
          </div>
        );
      })}
    </div>
  );
};
