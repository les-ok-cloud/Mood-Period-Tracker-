import type { DailyEntry } from '../types';
import { getFormattedDate } from './dateUtils';

// Constants for cycle prediction logic
const DEFAULT_CYCLE_LENGTH = 28; // days
const DEFAULT_PERIOD_DURATION = 5; // days
const OVULATION_OFFSET_FROM_NEXT_PERIOD = 14; // Ovulation is ~14 days before the next period
const FERTILE_WINDOW_DAYS_BEFORE_OVULATION = 5; // Fertile window is ovulation day + 5 days before it
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Defines the structure for cycle prediction results.
 */
export interface CyclePredictions {
  period: Set<string>;
  fertile: Set<string>;
  ovulation: Set<string>;
}

/**
 * Predicts future period dates, fertile windows, and ovulation days based on historical data.
 * @param dailyData - The record of daily entries.
 * @param predictionEndDate - The date to predict up to.
 * @returns An object containing sets of formatted date strings (YYYY-MM-DD) for each prediction type.
 */
export const predictFutureCycles = (
  dailyData: Record<string, DailyEntry>,
  predictionEndDate: Date
): CyclePredictions => {
  const predictions: CyclePredictions = {
    period: new Set(),
    fertile: new Set(),
    ovulation: new Set(),
  };

  const sortedPeriodEntries = Object.entries(dailyData)
    .filter(([, entry]) => entry.cycle)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());

  if (sortedPeriodEntries.length === 0) {
    return predictions;
  }

  // 1. Identify the start date of each distinct period.
  const cycleStarts: Date[] = [];
  let lastDate: Date | null = null;
  for (const [dateStr] of sortedPeriodEntries) {
    const currentDate = new Date(dateStr + 'T00:00:00');
    // A gap of more than one day is considered the start of a new cycle/period.
    if (!lastDate || (currentDate.getTime() - lastDate.getTime()) > ONE_DAY_MS) {
      cycleStarts.push(currentDate);
    }
    lastDate = currentDate;
  }

  // 2. Calculate average cycle length and period duration from historical data.
  let avgCycleLength = DEFAULT_CYCLE_LENGTH;
  let avgPeriodDuration = DEFAULT_PERIOD_DURATION;

  // Only calculate averages if there is at least one full cycle logged (i.e., two period starts).
  if (cycleStarts.length >= 2) {
    const cycleLengths: number[] = [];
    for (let i = 1; i < cycleStarts.length; i++) {
      const diffMs = cycleStarts[i].getTime() - cycleStarts[i - 1].getTime();
      cycleLengths.push(Math.round(diffMs / ONE_DAY_MS));
    }
    if (cycleLengths.length > 0) {
      // Clamp to a reasonable range of 21-45 days.
      avgCycleLength = Math.max(21, Math.min(45, Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)));
    }
    
    const periodDurations = cycleStarts.map(start => {
      let duration = 1;
      let currentDay = new Date(start);
      while (duration < 10) { // Safety break after 10 days
        currentDay.setDate(currentDay.getDate() + 1);
        if (dailyData[getFormattedDate(currentDay)]?.cycle) {
          duration++;
        } else {
          break;
        }
      }
      return duration;
    });
    if (periodDurations.length > 0) {
      // Clamp to a reasonable range of 2-10 days.
      avgPeriodDuration = Math.max(2, Math.min(10, Math.round(periodDurations.reduce((a, b) => a + b, 0) / periodDurations.length)));
    }
  }

  // 3. Generate predictions starting from the current cycle.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the start date of the current or most recent cycle by fast-forwarding from the last known period start.
  let cycleStartDate = new Date(cycleStarts[cycleStarts.length - 1]);
  while (new Date(cycleStartDate.getTime() + avgCycleLength * ONE_DAY_MS) < today) {
      cycleStartDate.setDate(cycleStartDate.getDate() + avgCycleLength);
  }

  // Loop through cycles from the current one until the prediction end date.
  while (cycleStartDate <= predictionEndDate) {
    const nextCycleStartDate = new Date(cycleStartDate);
    nextCycleStartDate.setDate(cycleStartDate.getDate() + avgCycleLength);

    // A) Predict period days for this cycle
    for (let i = 0; i < avgPeriodDuration; i++) {
      const periodDay = new Date(cycleStartDate);
      periodDay.setDate(cycleStartDate.getDate() + i);
      const dayKey = getFormattedDate(periodDay);
      // Predict if the day is in the future and not already logged.
      if (periodDay >= today && periodDay <= predictionEndDate && !dailyData[dayKey]?.cycle) {
        predictions.period.add(dayKey);
      }
    }

    // B) Predict ovulation and fertile window for this cycle (based on the start of the next cycle)
    const ovulationDate = new Date(nextCycleStartDate);
    ovulationDate.setDate(nextCycleStartDate.getDate() - OVULATION_OFFSET_FROM_NEXT_PERIOD);
    
    // Fertile window includes ovulation day and several days before it.
    for (let i = 0; i <= FERTILE_WINDOW_DAYS_BEFORE_OVULATION; i++) {
      const fertileDay = new Date(ovulationDate);
      fertileDay.setDate(ovulationDate.getDate() - i);
      const dayKey = getFormattedDate(fertileDay);
      if (fertileDay >= today && !dailyData[dayKey]?.cycle && !predictions.period.has(dayKey)) {
        predictions.fertile.add(dayKey);
      }
    }
    
    const ovulationDayKey = getFormattedDate(ovulationDate);
    if (ovulationDate >= today && !dailyData[ovulationDayKey]?.cycle && !predictions.period.has(ovulationDayKey)) {
      predictions.ovulation.add(ovulationDayKey);
    }

    // Move to the next cycle for the subsequent iteration.
    cycleStartDate = nextCycleStartDate;
  }

  return predictions;
};
