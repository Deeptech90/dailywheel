import { useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export function useCloudSync() {
  const { user, isGuest } = useAuth();

  const syncToCloud = useCallback(async (collection: 'favorites' | 'history' | 'settings', data: any) => {
    if (!db || !user || isGuest) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { [collection]: data }, { merge: true });
    } catch (e) {
      console.error(`Failed to sync ${collection} to cloud`, e);
    }
  }, [user, isGuest]);

  const fetchFromCloud = useCallback(async (collection: 'favorites' | 'history' | 'settings') => {
    if (!db || !user || isGuest) return null;
    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data()[collection];
      }
    } catch (e) {
      console.error(`Failed to fetch ${collection} from cloud`, e);
    }
    return null;
  }, [user, isGuest]);

  return { syncToCloud, fetchFromCloud };
}
