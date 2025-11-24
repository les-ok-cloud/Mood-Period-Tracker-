
import React, { useState, useEffect } from 'react';
import type { DailyEntry, Mood, CycleFlow } from '../types';
import { getFormattedDate, isSameDay, isFutureDate } from '../utils/dateUtils';
import { MOOD_DATA, CYCLE_DATA } from '../constants';
import { WaterDrop, ChevronLeft, ChevronRight, ExclamationTriangleIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { CyclePredictions } from '../utils/predictions';
import { MoodPopover } from './MoodPopover';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onUpdateMood: (date: Date, mood: Mood) => void;
  onUpdateCycle: (date: Date, cycle: CycleFlow | null) => void;
  dailyData: Record<string, DailyEntry>;
  showCycleTracker: boolean;
  predictions: CyclePredictions;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, onUpdateMood, onUpdateCycle, dailyData, showCycleTracker, predictions }) => {
  const { t, locale } = useLanguage();
  const [displayDate, setDisplayDate] = useState(new Date());
  const [numberOfMonths, setNumberOfMonths] = useState<1 | 2>(2);
  const [popover, setPopover] = useState<{ date: Date; target: HTMLDivElement } | null>(null);

  const handlePrevMonth = () => {
    setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Close popover if selected date changes from outside the calendar
  useEffect(() => {
    if (popover && !isSameDay(popover.date, selectedDate)) {
      setPopover(null);
    }
  }, [selectedDate, popover]);


  const firstMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);

  // Data for the first month
  const year1 = firstMonth.getFullYear();
  const month1 = firstMonth.getMonth();
  const firstDayOfMonth1 = new Date(year1, month1, 1).getDay();
  const daysInMonth1 = new Date(year1, month1 + 1, 0).getDate();
  const days1 = Array.from({ length: daysInMonth1 }, (_, i) => new Date(year1, month1, i + 1));
  
  // Data for the second month (if view is set to 2 months)
  let days2: Date[] = [];
  let secondMonth: Date | null = null;
  if (numberOfMonths === 2) {
      secondMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
      const year2 = secondMonth.getFullYear();
      const month2 = secondMonth.getMonth();
      const daysInMonth2 = new Date(year2, month2 + 1, 0).getDate();
      days2 = Array.from({ length: daysInMonth2 }, (_, i) => new Date(year2, month2, i + 1));
  }
  
  const allDays = [...days1, ...days2];
  const placeholders = Array.from({ length: firstDayOfMonth1 });

  const monthName1 = firstMonth.toLocaleString(locale, { month: 'long' });
  let monthDisplay;
  if (numberOfMonths === 2 && secondMonth) {
    const year2 = secondMonth.getFullYear();
    const monthName2 = secondMonth.toLocaleString(locale, { month: 'long' });
    if (year1 === year2) {
      monthDisplay = `${monthName1} & ${monthName2} ${year1}`;
    } else {
      monthDisplay = `${monthName1} ${year1} & ${monthName2} ${year2}`;
    }
  } else {
    monthDisplay = firstMonth.toLocaleString(locale, { month: 'long', year: 'numeric' });
  }

  const handleDayClick = (event: React.MouseEvent<HTMLDivElement>, day: Date) => {
    if (isFutureDate(day)) return;
    onDateSelect(day);
    setPopover({ date: day, target: event.currentTarget });
  };

  const dayCellRenderer = (day: Date) => {
    const dayKey = getFormattedDate(day);
    const entry = dailyData[dayKey];
    const isSelected = isSameDay(day, selectedDate);
    const isToday = isSameDay(day, new Date());
    const isFuture = isFutureDate(day);
    
    const hasLoggedData = !!entry;
    const isPeriodPredicted = showCycleTracker && predictions.period.has(dayKey) && !entry?.cycle;
    const isFertilePredicted = showCycleTracker && predictions.fertile.has(dayKey) && !entry?.cycle;
    const isOvulationPredicted = showCycleTracker && predictions.ovulation.has(dayKey) && !entry?.cycle;
    
    const moodInfo = entry ? MOOD_DATA[entry.mood] : null;
    const cycleInfo = entry?.cycle ? CYCLE_DATA[entry.cycle] : null;
    const hasNote = !!entry?.note;

    return (
      <div 
        key={day.toString()}
        onClick={(e) => handleDayClick(e, day)}
        className={`relative group flex justify-center items-center h-20 ${!isFuture ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      >
        {hasLoggedData && moodInfo ? (
          <div
            className={`
              w-16 h-16 relative rounded-full flex justify-center items-center
              ${moodInfo.bgColor}
              ${isSelected ? 'ring-2 ring-purple-400' : ''}
              ${isToday ? 'border-2 border-sky-400' : ''}
            `}
          >
            <span className="absolute top-2 left-2 text-xs font-bold text-slate-700 opacity-70">
              {day.getDate()}
            </span>
            <span className="text-3xl">
              {moodInfo.emoji}
            </span>
          </div>
        ) : (
          <div
            className={`
              w-16 h-16 relative flex justify-center items-center rounded-full transition-colors duration-200
              ${isSelected && !isFuture ? 'ring-2 ring-purple-400' : ''}
              ${
                isFuture
                  ? 'bg-slate-50'
                  : isSelected
                  ? 'bg-purple-200'
                  : isToday
                  ? 'bg-sky-200'
                  : 'bg-slate-100 hover:bg-slate-200'
              }
              ${
                isToday
                  ? 'border-2 border-sky-400'
                  : !isFuture
                  ? 'border border-dashed border-slate-300'
                  : 'border border-dashed border-slate-200'
              }
            `}
          >
            <span className={`font-bold ${day.getDate() === 1 ? 'text-purple-600' : ''} ${isFuture ? 'text-slate-400' : 'text-slate-700'}`}>{day.getDate()}</span>
             {day.getDate() === 1 && <span className="absolute -top-4 text-xs font-bold text-purple-500 capitalize">{day.toLocaleString(locale, { month: 'short' })}</span>}
          </div>
        )}
         {hasNote && (
           <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-slate-600/70 rounded-full" />
         )}
         {hasNote && (
          <div role="tooltip" className="absolute bottom-full mb-2 w-max max-w-[200px] p-2 text-sm text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-left break-words">
            {entry.note}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800" />
          </div>
        )}
         {showCycleTracker && cycleInfo && (
          <div className="absolute bottom-1 text-sky-500 flex justify-center w-full">
            {Array.from({length: cycleInfo.drops}).map((_, i) => <WaterDrop key={i} className="w-3.5 h-3.5"/>)}
          </div>
        )}
         {showCycleTracker && !cycleInfo && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center w-full gap-1">
              {isPeriodPredicted && (
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" aria-label="Predicted period day" title="Predicted Period"></div>
              )}
              {isFertilePredicted && !isPeriodPredicted && (
                <div 
                  className={`w-1.5 h-1.5 rounded-full ${isOvulationPredicted ? 'bg-purple-500' : 'border border-purple-400'}`}
                  aria-label={isOvulationPredicted ? "Predicted ovulation day" : "Predicted fertile day"}
                  title={isOvulationPredicted ? "Predicted Ovulation" : "Predicted Fertile"}
                ></div>
              )}
            </div>
         )}
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5">
      {popover && (() => {
        const dayKey = getFormattedDate(popover.date);
        const entry = dailyData[dayKey];
        return (
            <MoodPopover
                targetElement={popover.target}
                onSelectMood={(mood) => {
                    onUpdateMood(popover.date, mood);
                    setPopover(null);
                }}
                onClose={() => setPopover(null)}
                showCycleTracker={showCycleTracker}
                onSelectCycle={(cycle) => {
                    onUpdateCycle(popover.date, cycle);
                    setPopover(null);
                }}
                currentCycle={entry?.cycle || null}
            />
        );
      })()}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-700">{monthDisplay}</h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-slate-100 rounded-full p-1">
            {[1, 2].map(num => (
              <button
                key={num}
                onClick={() => setNumberOfMonths(num as 1 | 2)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
                  numberOfMonths === num
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {num}M
              </button>
            ))}
          </div>
          <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label={t.prevMonth}>
             <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
           <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label={t.nextMonth}>
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="bg-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
          {selectedDate.toLocaleString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center">
        {t.weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="text-xs font-bold text-slate-400 p-1">{day}</div>
        ))}
        {placeholders.map((_, i) => <div key={`placeholder-${i}`}></div>)}
        {allDays.map(dayCellRenderer)}
      </div>

      {showCycleTracker && (
        <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4">
          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
            <span className="font-semibold">{t.legendTitle}</span>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-full"></div>
              <span>{t.legendPeriod}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 border border-purple-400 rounded-full"></div>
              <span>{t.legendFertile}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
              <span>{t.legendOvulation}</span>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2 text-xs text-slate-500 bg-slate-100 p-2.5 rounded-lg text-center">
            <ExclamationTriangleIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p>{t.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
