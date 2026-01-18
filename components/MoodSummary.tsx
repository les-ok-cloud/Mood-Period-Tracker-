import React, { useMemo, useState, useCallback, useEffect } from 'react';
import type { DailyEntry, Mood } from '../types';
import { MOOD_DATA } from '../constants';
import { Mood as MoodEnum } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface MoodSummaryProps {
  dailyData: Record<string, DailyEntry>;
}

const MIN_ENTRIES_FOR_TIPS = 5;

export const MoodSummary: React.FC<MoodSummaryProps> = ({ dailyData }) => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<number>(30);

  const filteredEntries = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - timeRange);

    return Object.entries(dailyData).filter(([date]) => {
      const entryDate = new Date(date + "T00:00:00");
      return entryDate >= startDate && entryDate <= endDate;
    });
  }, [dailyData, timeRange]);
  
  const summary = useMemo(() => {
    const entries = filteredEntries.map(([, entry]) => entry);
    const totalEntries = entries.length;

    const moodCounts: Record<Mood, number> = {
      [MoodEnum.Amazing]: 0,
      [MoodEnum.Good]: 0,
      [MoodEnum.Okay]: 0,
      [MoodEnum.Bad]: 0,
      [MoodEnum.Terrible]: 0,
    };

    let mostCommonMood: Mood | null = null;
    let maxCount = 0;

    for (const entry of entries) {
      moodCounts[entry.mood]++;
      if (moodCounts[entry.mood] > maxCount) {
        maxCount = moodCounts[entry.mood];
        mostCommonMood = entry.mood;
      }
    }

    return { totalEntries, moodCounts, mostCommonMood };
  }, [filteredEntries]);

  const { totalEntries, moodCounts, mostCommonMood } = summary;
  const mostCommonMoodData = mostCommonMood ? MOOD_DATA[mostCommonMood] : null;

  // Tips Logic
  const [tips, setTips] = useState<string>('');
  const entryCount = totalEntries;

  const generateTips = useCallback(() => {
    if (entryCount < MIN_ENTRIES_FOR_TIPS) {
      setTips('');
      return;
    }
    
    // Group moods for tip generation
    const positiveCount = (moodCounts[MoodEnum.Amazing] || 0) + (moodCounts[MoodEnum.Good] || 0);
    const neutralCount = (moodCounts[MoodEnum.Okay] || 0);
    const negativeCount = (moodCounts[MoodEnum.Bad] || 0) + (moodCounts[MoodEnum.Terrible] || 0);

    let availableTips: string[] = [];

    // Determine which group is most common and aggregate tips
    if (positiveCount >= neutralCount && positiveCount >= negativeCount) {
        // Positive moods win
        if (t.wellnessTips) {
            availableTips = [
                ...(t.wellnessTips[MoodEnum.Amazing] || []),
                ...(t.wellnessTips[MoodEnum.Good] || [])
            ];
        }
    } else if (neutralCount >= positiveCount && neutralCount >= negativeCount) {
        // Neutral mood wins
        if (t.wellnessTips) {
            availableTips = t.wellnessTips[MoodEnum.Okay] || [];
        }
    } else {
        // Negative moods win
        if (t.wellnessTips) {
            availableTips = [
                ...(t.wellnessTips[MoodEnum.Bad] || []),
                ...(t.wellnessTips[MoodEnum.Terrible] || [])
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
  }, [entryCount, moodCounts, t]);
  
  useEffect(() => {
    generateTips();
  }, [generateTips]);


  const renderTipsContent = () => {
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

  const summaryCategories = [
    {
      label: t.positiveMood,
      moods: [MoodEnum.Amazing, MoodEnum.Good],
      barColor: MOOD_DATA[MoodEnum.Amazing].barColor,
    },
    {
      label: t.neutralMood,
      moods: [MoodEnum.Okay],
      barColor: MOOD_DATA[MoodEnum.Okay].barColor,
    },
    {
      label: t.negativeMood,
      moods: [MoodEnum.Bad, MoodEnum.Terrible],
      barColor: MOOD_DATA[MoodEnum.Bad].barColor,
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 h-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-700 break-words leading-tight min-w-0 flex-shrink">
          {t.moodSummary}
        </h2>
        <div className="flex items-center bg-slate-100 rounded-full p-1 self-start sm:self-auto">
          {[30, 60, 90].map(days => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 ${
                timeRange === days
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl text-center">
          <div className="text-3xl font-bold">{totalEntries}</div>
          <div className="text-sm">{t.totalEntries}</div>
        </div>
        <div className={`p-3 sm:p-4 rounded-2xl text-center transition-colors duration-300 ${mostCommonMoodData ? `${mostCommonMoodData.bgColor} ${mostCommonMoodData.textColor}` : 'bg-slate-100 text-slate-800'}`}>
          <div className="text-lg sm:text-xl font-bold break-words leading-tight">{mostCommonMood ? t[mostCommonMood] : t.noMood}</div>
          <div className="text-xs sm:text-sm mt-1">{t.mostCommon}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        {summaryCategories.map(category => {
          const count = category.moods.reduce((sum, mood) => sum + (moodCounts[mood] || 0), 0);
          const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0;

          return (
            <div key={category.label}>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium text-slate-600">{category.label}</span>
                <span className="font-semibold text-slate-500">{count}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className={`${category.barColor} h-2.5 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-6 border-t border-slate-200"></div>

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
        {renderTipsContent()}
      </div>
    </div>
  );
};