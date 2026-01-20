import React from 'react';
import { db } from './firebase';
import { PracticeEntry, PracticeType, GratitudeContent, MoodInfluencersContent, ReflectionContent, OneMinuteResetContent, HelpfulReadingContent } from '../types';

const PRACTICES_STORAGE_KEY = 'moodTrackerPractices';
const SYNC_QUEUE_KEY = 'moodTrackerPracticeSyncQueue';

// Sync status tracking
export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime?: string;
  pendingCount: number;
}

// Local storage helpers
export const getStoredPractices = (): Record<string, PracticeEntry> => {
  try {
    const stored = localStorage.getItem(PRACTICES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading practices from localStorage:', error);
    return {};
  }
};

export const savePracticesToStorage = (practices: Record<string, PracticeEntry>): void => {
  try {
    localStorage.setItem(PRACTICES_STORAGE_KEY, JSON.stringify(practices));
  } catch (error) {
    console.error('Error saving practices to localStorage:', error);
  }
};

export const getSyncQueue = (): string[] => {
  try {
    const stored = localStorage.getItem(SYNC_QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading sync queue:', error);
    return [];
  }
};

export const addToSyncQueue = (entryId: string): void => {
  const queue = getSyncQueue();
  if (!queue.includes(entryId)) {
    queue.push(entryId);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  }
};

export const removeFromSyncQueue = (entryId: string): void => {
  const queue = getSyncQueue();
  const filtered = queue.filter(id => id !== entryId);
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(filtered));
};

// Network status detection
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Sync service class
export class PracticeSyncService {
  private userId: string;
  private syncStatus: SyncStatus;
  private listeners: Set<(status: SyncStatus) => void> = new Set();

  constructor(userId: string) {
    this.userId = userId;
    this.syncStatus = {
      isOnline: isOnline(),
      isSyncing: false,
      pendingCount: 0
    };

    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  // Status management
  private updateStatus(updates: Partial<SyncStatus>): void {
    this.syncStatus = { ...this.syncStatus, ...updates };
    this.listeners.forEach(listener => listener(this.syncStatus));
  }

  public subscribe(listener: (status: SyncStatus) => void): () => void {
    this.listeners.add(listener);
    listener(this.syncStatus); // Send current status immediately
    return () => this.listeners.delete(listener);
  }

  private handleOnline(): void {
    this.updateStatus({ isOnline: true });
    this.syncPendingEntries();
  }

  private handleOffline(): void {
    this.updateStatus({ isOnline: false });
  }

  // Entry management
  public async createEntry(
    practiceType: PracticeType,
    content: any,
    entryId?: string
  ): Promise<PracticeEntry> {
    const now = new Date().toISOString();
    const id = entryId || `${practiceType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const entry: PracticeEntry = {
      entryId: id,
      userId: this.userId,
      practiceType,
      content,
      createdAt: now,
      updatedAt: now,
      synced: false
    };

    // Save locally first
    const practices = getStoredPractices();
    practices[id] = entry;
    savePracticesToStorage(practices);

    // Add to sync queue
    addToSyncQueue(id);

    // Try to sync immediately if online
    if (this.syncStatus.isOnline) {
      this.syncEntry(entry).catch(error => {
        console.warn('Failed to sync entry immediately:', error);
      });
    }

    return entry;
  }

  public async updateEntry(entryId: string, updates: Partial<PracticeEntry>): Promise<void> {
    const practices = getStoredPractices();
    const existingEntry = practices[entryId];

    if (!existingEntry) {
      throw new Error(`Entry ${entryId} not found`);
    }

    const updatedEntry: PracticeEntry = {
      ...existingEntry,
      ...updates,
      updatedAt: new Date().toISOString(),
      synced: false
    };

    practices[entryId] = updatedEntry;
    savePracticesToStorage(practices);

    // Add to sync queue if not already there
    addToSyncQueue(entryId);

    // Try to sync immediately if online
    if (this.syncStatus.isOnline) {
      this.syncEntry(updatedEntry).catch(error => {
        console.warn('Failed to sync updated entry immediately:', error);
      });
    }
  }

  public getEntries(practiceType?: PracticeType): PracticeEntry[] {
    const practices = getStoredPractices();
    const entries = Object.values(practices);

    return practiceType
      ? entries.filter(entry => entry.practiceType === practiceType)
      : entries;
  }

  public getEntry(entryId: string): PracticeEntry | null {
    const practices = getStoredPractices();
    return practices[entryId] || null;
  }

  // Sync operations
  private async syncEntry(entry: PracticeEntry): Promise<void> {
    try {
      const docRef = db.collection('users').doc(this.userId)
        .collection('practices').doc(entry.entryId);

      await docRef.set({
        ...entry,
        synced: true
      }, { merge: true });

      // Update local entry as synced
      const practices = getStoredPractices();
      if (practices[entry.entryId]) {
        practices[entry.entryId].synced = true;
        savePracticesToStorage(practices);
      }

      // Remove from sync queue
      removeFromSyncQueue(entry.entryId);

      this.updateStatus({
        lastSyncTime: new Date().toISOString(),
        pendingCount: getSyncQueue().length
      });

    } catch (error) {
      console.error('Error syncing entry:', error);
      throw error;
    }
  }

  public async syncPendingEntries(): Promise<void> {
    if (!this.syncStatus.isOnline || this.syncStatus.isSyncing) {
      return;
    }

    const queue = getSyncQueue();
    if (queue.length === 0) {
      return;
    }

    this.updateStatus({ isSyncing: true, pendingCount: queue.length });

    try {
      const practices = getStoredPractices();
      const syncPromises = queue
        .map(entryId => practices[entryId])
        .filter(entry => entry) // Filter out null entries
        .map(entry => this.syncEntry(entry));

      await Promise.allSettled(syncPromises);

      this.updateStatus({
        isSyncing: false,
        lastSyncTime: new Date().toISOString(),
        pendingCount: getSyncQueue().length
      });

    } catch (error) {
      console.error('Error syncing pending entries:', error);
      this.updateStatus({ isSyncing: false });
    }
  }

  public async fetchFromBackend(): Promise<void> {
    if (!this.syncStatus.isOnline) {
      return;
    }

    try {
      this.updateStatus({ isSyncing: true });

      const snapshot = await db.collection('users').doc(this.userId)
        .collection('practices').get();

      const backendEntries: Record<string, PracticeEntry> = {};
      snapshot.forEach(doc => {
        const entry = doc.data() as PracticeEntry;
        backendEntries[entry.entryId] = entry;
      });

      // Merge with local entries (backend takes precedence for conflicts)
      const localEntries = getStoredPractices();
      const mergedEntries = { ...localEntries, ...backendEntries };

      // Update synced status for backend entries
      Object.values(mergedEntries).forEach(entry => {
        if (backendEntries[entry.entryId]) {
          entry.synced = true;
        }
      });

      savePracticesToStorage(mergedEntries);

      this.updateStatus({
        isSyncing: false,
        lastSyncTime: new Date().toISOString(),
        pendingCount: getSyncQueue().length
      });

    } catch (error) {
      console.error('Error fetching from backend:', error);
      this.updateStatus({ isSyncing: false });
    }
  }

  public async initialSync(): Promise<void> {
    await this.fetchFromBackend();
    await this.syncPendingEntries();
  }

  // Cleanup
  public destroy(): void {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.listeners.clear();
  }
}

// Singleton instance management
const syncServices = new Map<string, PracticeSyncService>();

export const getPracticeSyncService = (userId: string): PracticeSyncService => {
  if (!syncServices.has(userId)) {
    syncServices.set(userId, new PracticeSyncService(userId));
  }
  return syncServices.get(userId)!;
};

export const destroyPracticeSyncService = (userId: string): void => {
  const service = syncServices.get(userId);
  if (service) {
    service.destroy();
    syncServices.delete(userId);
  }
};

// React hook for using practice sync
export const usePracticeSync = (userId: string) => {
  const service = getPracticeSyncService(userId);

  React.useEffect(() => {
    return () => {
      // Don't destroy on unmount, let it persist for the session
    };
  }, [userId]);

  return service;
};