import { Mood, CycleFlow } from './types';

interface MoodInfo {
  emoji: string;
  bgColor: string;
  barColor: string;
  textColor: string;
}

export const MOOD_DATA: Record<Mood, MoodInfo> = {
  [Mood.Amazing]: { emoji: '🤩', bgColor: 'bg-green-300', barColor: 'bg-green-600', textColor: 'text-green-900' },
  [Mood.Good]: { emoji: '😊', bgColor: 'bg-lime-300', barColor: 'bg-lime-600', textColor: 'text-lime-900' },
  [Mood.Okay]: { emoji: '😐', bgColor: 'bg-yellow-300', barColor: 'bg-yellow-600', textColor: 'text-yellow-900' },
  [Mood.Bad]: { emoji: '😔', bgColor: 'bg-red-300', barColor: 'bg-red-600', textColor: 'text-red-900' },
  [Mood.Terrible]: { emoji: '😢', bgColor: 'bg-red-400', barColor: 'bg-red-700', textColor: 'text-red-900' },
};

export const MOOD_ORDER = [Mood.Amazing, Mood.Good, Mood.Okay, Mood.Bad, Mood.Terrible];

interface CycleInfo {
  drops: number;
  bgColor: string;
  ringColor: string;
  color: string;
}

export const CYCLE_ORDER = [CycleFlow.Light, CycleFlow.Medium, CycleFlow.Heavy];

export const CYCLE_DATA: Record<CycleFlow, CycleInfo> = {
  [CycleFlow.Light]: {
    drops: 1,
    bgColor: 'bg-rose-100',
    ringColor: 'ring-rose-300',
    color: 'text-rose-600',
  },
  [CycleFlow.Medium]: {
    drops: 2,
    bgColor: 'bg-rose-200',
    ringColor: 'ring-rose-400',
    color: 'text-rose-700',
  },
  [CycleFlow.Heavy]: {
    drops: 3,
    bgColor: 'bg-rose-300',
    ringColor: 'ring-rose-500',
    color: 'text-rose-800',
  },
};