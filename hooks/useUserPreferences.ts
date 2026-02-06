import { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';
import { UserPreferences, PinnedPractice } from '../types';

export interface UseUserPreferencesReturn {
  preferences: UserPreferences | null;
  isLoading: boolean;
  updatePinnedPractices: (pinnedPractices: PinnedPractice[]) => Promise<void>;
  syncNow: () => Promise<void>;
}

export const useUserPreferences = (userId: string): UseUserPreferencesReturn => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage initially
  useEffect(() => {
    const loadLocalPreferences = () => {
      const localPrefs = localStorage.getItem('userPreferences');
      if (localPrefs) {
        try {
          const parsed = JSON.parse(localPrefs);
          setPreferences(parsed);
        } catch (error) {
          console.error('Error parsing local preferences:', error);
        }
      }
    };

    loadLocalPreferences();
    setIsLoading(false);
  }, []);

  // Sync with Firestore when user is logged in
  useEffect(() => {
    if (!userId) return;

    const syncPreferences = async () => {
      try {
        const docRef = db.collection('userPreferences').doc(userId);
        const doc = await docRef.get();

        if (doc.exists) {
          const remotePrefs = doc.data() as UserPreferences;
          setPreferences(remotePrefs);
          // Save to localStorage as well
          localStorage.setItem('userPreferences', JSON.stringify(remotePrefs));
        } else {
          // If no remote preferences, save local preferences to remote
          const localPrefs = localStorage.getItem('userPreferences');
          if (localPrefs) {
            const parsed = JSON.parse(localPrefs);
            await docRef.set({
              ...parsed,
              synced: true
            });
          }
        }
      } catch (error) {
        console.error('Error syncing user preferences:', error);
      }
    };

    syncPreferences();
  }, [userId]);

  const saveToLocalStorage = useCallback((prefs: UserPreferences) => {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
  }, []);

  const updatePinnedPractices = useCallback(async (pinnedPractices: PinnedPractice[]) => {
    const updatedPrefs: UserPreferences = {
      pinnedPractices,
      updatedAt: new Date().toISOString(),
      synced: !!userId
    };

    setPreferences(updatedPrefs);
    saveToLocalStorage(updatedPrefs);

    // Sync to Firestore if user is logged in
    if (userId) {
      try {
        await db.collection('userPreferences').doc(userId).set(updatedPrefs);
      } catch (error) {
        console.error('Error saving preferences to Firestore:', error);
        // Mark as not synced
        const unsyncedPrefs = { ...updatedPrefs, synced: false };
        setPreferences(unsyncedPrefs);
        saveToLocalStorage(unsyncedPrefs);
      }
    }
  }, [userId, saveToLocalStorage]);

  const syncNow = useCallback(async () => {
    if (!userId || !preferences) return;

    try {
      setIsLoading(true);
      await db.collection('userPreferences').doc(userId).set({
        ...preferences,
        synced: true
      });

      const syncedPrefs = { ...preferences, synced: true };
      setPreferences(syncedPrefs);
      saveToLocalStorage(syncedPrefs);
    } catch (error) {
      console.error('Error syncing preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, preferences, saveToLocalStorage]);

  return {
    preferences,
    isLoading,
    updatePinnedPractices,
    syncNow
  };
};