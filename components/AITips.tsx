import React, { useState, useCallback, useEffect } from 'react';
import { Mood } from '../types';
import type { DailyEntry } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AITipsProps {
  dailyData: Record<string, DailyEntry>;
}

const MIN_ENTRIES_FOR_TIPS = 5;

export const AITips: React.FC<AITipsProps> = ({ dailyData }) => {
  const { t } = useLanguage();
  const [tips, setTips] = useState<string>('');
  const entryCount = Object.keys(dailyData).length;

  const generateTips = useCallback(() => {
    if (entryCount < MIN_ENTRIES_FOR_TIPS) {
      setTips('');
      return;
    }
    
    // Count moods
    const moodCounts: Record<string, number> = {};
    Object.values(dailyData).forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    // Group counts
    const positiveCount = (moodCounts[Mood.Amazing] || 0) + (moodCounts[Mood.Good] || 0);
    const neutralCount = (moodCounts[Mood.Okay] || 0);
    const negativeCount = (moodCounts[Mood.Bad] || 0) + (moodCounts[Mood.Terrible] || 0);

    let availableTips: string[] = [];

    // Determine dominant group
    if (positiveCount >= neutralCount && positiveCount >= negativeCount) {
        // Positive wins
        if (t.wellnessTips) {
            availableTips = [
                ...(t.wellnessTips[Mood.Amazing] || []),
                ...(t.wellnessTips[Mood.Good] || [])
            ];
        }
    } else if (neutralCount >= positiveCount && neutralCount >= negativeCount) {
        // Neutral wins
        if (t.wellnessTips) {
            availableTips = t.wellnessTips[Mood.Okay] || [];
        }
    } else {
        // Negative wins
        if (t.wellnessTips) {
             availableTips = [
                ...(t.wellnessTips[Mood.Bad] || []),
                ...(t.wellnessTips[Mood.Terrible] || [])
             ];
        }
    }

    if (availableTips.length > 0) {
        const shuffled = [...availableTips].sort(() => 0.5 - Math.random());
        const selectedTips = shuffled.slice(0, 3);
        setTips(selectedTips.map(tip => "- " + tip).join('\n'));
    } else {
        setTips("- Take a moment to breathe.\n- Drink some water.\n- Practice gratitude.");
    }
  }, [dailyData, entryCount, t]);
  
  useEffect(() => {
    generateTips();
  }, [generateTips]);


  const renderContent = () => {
    if (entryCount < MIN_ENTRIES_FOR_TIPS) {
      return (
        <div className="text-center text-slate-500">
          <p>{t.unlockTips}</p>
          <p className="font-bold mt-2">{t.entriesToGo.replace('{count}', (MIN_ENTRIES_FOR_TIPS - entryCount).toString())}</p>
        </div>
      );
    }

    if (tips) {
      return (
        <ul className="space-y-3 text-slate-700 list-inside">
          {tips.split('\n').filter(tip => tip.trim().length > 0).map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-purple-500">◆</span>
              <span>{tip.replace(/^- /, '')}</span>
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-700">{t.aiWellnessTips}</h2>
        {entryCount >= MIN_ENTRIES_FOR_TIPS && (
          <button
            onClick={generateTips}
            className="text-sm bg-purple-100 text-purple-700 font-semibold py-1 px-3 rounded-full hover:bg-purple-200 transition-colors"
            aria-label={t.getNewTips}
          >
            {t.getNewTips}
          </button>
        )}
      </div>
      <div className="min-h-[100px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};