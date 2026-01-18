export enum Mood {
  Amazing = 'Amazing',
  Good = 'Good',
  Okay = 'Okay',
  Bad = 'Bad',
  Terrible = 'Terrible',
}

export enum CycleFlow {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
}

export interface DailyEntry {
  mood: Mood;
  cycle: CycleFlow | null;
  note?: string;
}

export interface ReflectionEntry {
  date: string;
  goodFeeling?: string;
  drainedEnergy?: string;
}