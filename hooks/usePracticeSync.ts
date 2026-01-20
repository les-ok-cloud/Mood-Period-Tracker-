import { useState, useEffect, useCallback } from 'react';
import { PracticeEntry, PracticeType } from '../types';
import { PracticeSyncService, SyncStatus, getPracticeSyncService, destroyPracticeSyncService } from '../lib/practiceSync';

export interface UsePracticeSyncReturn {
  // Data
  entries: PracticeEntry[];
  getEntriesByType: (type: PracticeType) => PracticeEntry[];
  getEntry: (entryId: string) => PracticeEntry | null;

  // Actions
  createEntry: (practiceType: PracticeType, content: any, entryId?: string) => Promise<PracticeEntry>;
  updateEntry: (entryId: string, updates: Partial<PracticeEntry>) => Promise<void>;
  deleteEntry: (entryId: string) => Promise<void>;

  // Sync status
  syncStatus: SyncStatus;
  syncNow: () => Promise<void>;

  // Loading states
  isLoading: boolean;
}

export const usePracticeSync = (userId: string): UsePracticeSyncReturn => {
  const [entries, setEntries] = useState<PracticeEntry[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    isSyncing: false,
    pendingCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<PracticeSyncService | null>(null);

  // Initialize service
  useEffect(() => {
    if (!userId) return;

    const syncService = getPracticeSyncService(userId);
    setService(syncService);

    // Subscribe to sync status changes
    const unsubscribe = syncService.subscribe(setSyncStatus);

    // Initial sync
    const initialize = async () => {
      setIsLoading(true);
      try {
        await syncService.initialSync();
        setEntries(syncService.getEntries());
      } catch (error) {
        console.error('Failed to initialize practice sync:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    return () => {
      unsubscribe();
    };
  }, [userId]);

  // Update entries when service changes
  useEffect(() => {
    if (!service) return;

    const updateEntries = () => {
      setEntries(service.getEntries());
    };

    // Initial load
    updateEntries();

    // Listen for storage changes (in case other tabs update data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'moodTrackerPractices') {
        updateEntries();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [service]);

  // Actions
  const createEntry = useCallback(async (
    practiceType: PracticeType,
    content: any,
    entryId?: string
  ): Promise<PracticeEntry> => {
    if (!service) throw new Error('Sync service not initialized');

    const entry = await service.createEntry(practiceType, content, entryId);
    setEntries(service.getEntries()); // Update local state
    return entry;
  }, [service]);

  const updateEntry = useCallback(async (
    entryId: string,
    updates: Partial<PracticeEntry>
  ): Promise<void> => {
    if (!service) throw new Error('Sync service not initialized');

    await service.updateEntry(entryId, updates);
    setEntries(service.getEntries()); // Update local state
  }, [service]);

  const deleteEntry = useCallback(async (entryId: string): Promise<void> => {
    if (!service) throw new Error('Sync service not initialized');

    await service.deleteEntry(entryId);
    setEntries(service.getEntries()); // Update local state
  }, [service]);

  const syncNow = useCallback(async (): Promise<void> => {
    if (!service) return;

    setIsLoading(true);
    try {
      await service.syncPendingEntries();
      setEntries(service.getEntries());
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  // Helper functions
  const getEntriesByType = useCallback((type: PracticeType): PracticeEntry[] => {
    return entries.filter(entry => entry.practiceType === type);
  }, [entries]);

  const getEntry = useCallback((entryId: string): PracticeEntry | null => {
    return service?.getEntry(entryId) || null;
  }, [service]);

  // Cleanup on user change
  useEffect(() => {
    return () => {
      if (service) {
        // Don't destroy the service here, let it persist for potential reuse
      }
    };
  }, [service]);

  return {
    entries,
    getEntriesByType,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    syncStatus,
    syncNow,
    isLoading
  };
};