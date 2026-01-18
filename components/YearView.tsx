
import React, { useState } from 'react';
import { DailyEntry } from '../types';
import { MOOD_DATA } from '../constants';
import { getFormattedDate } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface YearViewProps {
  dailyData: Record<string, DailyEntry>;
  onBack: () => void;
}

const MonthGrid: React.FC<{ year: number; month: number; dailyData: Record<string, DailyEntry>; locale: string; weekDays: string[], t: any }> = ({ year, month, dailyData, locale, weekDays, t }) => {
  const monthName = new Date(year, month).toLocaleString(locale, { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday is 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const placeholders = Array.from({ length: firstDayOfMonth });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white/50 p-4 rounded-xl shadow-sm">
      <h3 className="font-bold text-center text-purple-700 mb-3">{monthName}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {weekDays.map((day, index) => <div key={`${day}-${index}`} className="font-semibold text-slate-500">{day}</div>)}
        {placeholders.map((_, i) => <div key={`ph-${i}`}></div>)}
        {days.map(day => {
          const date = new Date(year, month, day);
          const dateKey = getFormattedDate(date);
          const entry = dailyData[dateKey];
          const moodInfo = entry ? MOOD_DATA[entry.mood] : null;
          
          return (
            <div key={day} className="w-6 h-6 flex items-center justify-center rounded-full group relative">
              {moodInfo ? (
                <>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${moodInfo.barColor}`}>
                     <span className="text-white text-xs font-bold">{day}</span>
                  </div>
                  <div role="tooltip" className="absolute bottom-full mb-2 w-max p-2 text-sm text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    {moodInfo.emoji} {t[entry.mood]}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800" />
                  </div>
                </>
              ) : (
                <span className="text-slate-400 text-xs">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const YearView: React.FC<YearViewProps> = ({ dailyData, onBack }) => {
  const { t, locale } = useLanguage();
  const [year, setYear] = useState(new Date().getFullYear());

  const handlePrevYear = () => setYear(y => y - 1);
  const handleNextYear = () => setYear(y => y + 1);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl">
        <main className="space-y-6 animate-fade-in-up pb-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 flex justify-between items-center">
            <button onClick={onBack} className="text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors">
              &larr; {t.backToDashboard}
            </button>
            <div className="flex items-center gap-4">
              <button onClick={handlePrevYear} className="p-2 rounded-full hover:bg-slate-200 transition-colors" aria-label="Previous year">
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <h2 className="text-2xl font-bold text-slate-700 w-24 text-center">{year}</h2>
              <button onClick={handleNextYear} className="p-2 rounded-full hover:bg-slate-200 transition-colors" aria-label="Next year">
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            <div style={{ width: '184px' }}></div> {/* Spacer to balance the header */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <MonthGrid key={i} year={year} month={i} dailyData={dailyData} locale={locale} weekDays={t.weekDays} t={t} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
