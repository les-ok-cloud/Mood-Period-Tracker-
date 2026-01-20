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

export enum PracticeType {
  Reflection = 'reflection',
  Gratitude = 'gratitude',
  MoodInfluencers = 'moodInfluencers',
  OneMinuteReset = 'oneMinuteReset',
  HelpfulReading = 'helpfulReading'
}

export interface PracticeEntry {
  entryId: string;
  userId: string;
  practiceType: PracticeType;
  content: any; // Flexible content structure per practice type
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  synced: boolean; // Whether this entry has been synced to backend
}

export interface GratitudeContent {
  date: string; // Date key in YYYY-MM-DD format
  items: string[]; // Array of 3 gratitude items
}

export interface MoodInfluencersContent {
  date: string; // Date key in YYYY-MM-DD format
  selectedInfluencers: string[]; // Array of selected mood influencers
}

export interface ReflectionContent {
  date: string; // Date key in YYYY-MM-DD format
  goodFeeling?: string;
  drainedEnergy?: string;
}

export interface OneMinuteResetContent {
  completed: boolean; // Whether the exercise was completed
  completedAt?: string; // When it was completed
}

export interface HelpfulReadingContent {
  articleTitle: string;
  articleUrl: string;
  readAt: string; // When the article was read
}