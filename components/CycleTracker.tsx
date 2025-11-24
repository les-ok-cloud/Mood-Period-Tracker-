
import React, { useMemo } from 'react';
import type { CycleFlow, DailyEntry } from '../types';
import { CYCLE_DATA, CYCLE_ORDER } from '../constants';
import { WaterDrop } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { getFormattedDate } from '../utils/dateUtils';
import { CyclePredictions } from '../utils/predictions';

interface CycleTrackerProps {
  selectedCycle?: CycleFlow | null;
  onSelect: (cycle: CycleFlow | null) => void;
  dailyData: Record<string, DailyEntry>;
  predictions: CyclePredictions;
}

const getPlural = (number: number, one: string, two: string, five: string): string => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const CycleTracker: React.FC<CycleTrackerProps> = ({ selectedCycle, onSelect, dailyData, predictions }) => {
  const { t, language } = useLanguage();

  const cycleStatus = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = getFormattedDate(today);

    if (dailyData[todayKey]?.cycle) {
      let periodDay = 1;
      const checkDate = new Date(today);
      
      while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        const checkDateKey = getFormattedDate(checkDate);
        if (dailyData[checkDateKey]?.cycle) {
          periodDay++;
        } else {
          break;
        }
      }
      return t.todayPeriodDay.replace('{day}', periodDay.toString());
    }

    const sortedPredictions = Array.from(predictions.period)
      .map(dateStr => new Date(dateStr + 'T00:00:00'))
      .filter(date => date >= today)
      .sort((a, b) => a.getTime() - b.getTime());

    if (sortedPredictions.length > 0) {
      const nextPeriodDate = sortedPredictions[0];
      const daysUntil = Math.round((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil === 0) return null;

      const pluralDays = getPlural(daysUntil, t.day_one, t.day_two, t.day_five);
      return t.periodStartsIn
        .replace('{days}', daysUntil.toString())
        .replace('{pluralDays}', pluralDays);
    }

    return null;
  }, [dailyData, predictions, t, language]);

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-2">{t.trackCycle}</h3>
      <div className="flex justify-around items-center pt-2 pb-4">
        {CYCLE_ORDER.map((flow) => {
          const data = CYCLE_DATA[flow];
          const isSelected = selectedCycle === flow;
          return (
            <button
              key={flow}
              onClick={() => onSelect(isSelected ? null : flow)}
              className={`
                flex flex-col items-center justify-center gap-2 p-3 rounded-2xl w-24 h-24
                border-2 transition-all duration-200 transform
                ${
                  isSelected
                    ? `${data.bgColor} ${data.ringColor} ring-2 scale-105 shadow-lg`
                    : 'bg-slate-50 border-transparent hover:bg-slate-100 hover:scale-105'
                }
              `}
              aria-pressed={isSelected}
              aria-label={t[flow]}
            >
              <div className="flex">
                {Array.from({ length: data.drops }).map((_, i) => (
                  <WaterDrop key={i} className="w-6 h-6" />
                ))}
              </div>
              <span className={`text-sm font-medium ${isSelected ? data.color : 'text-slate-600'}`}>
                {t[flow]}
              </span>
            </button>
          );
        })}
      </div>
      {cycleStatus && (
        <div className="text-center text-sm font-medium text-purple-700 bg-purple-100/70 p-2 rounded-lg mt-2">
          {cycleStatus}
        </div>
      )}
    </div>
  );
};
