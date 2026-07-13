import { useState, useEffect, useCallback } from 'react';
import { useCloudSync } from './useCloudSync';
import { useAuth } from '../context/AuthContext';
import { BrandKit } from '../types';
import { generateBrandKit } from './useBrandEngine';

const STORAGE_KEY = 'ubn_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<BrandKit[]>([]);
  const { syncToCloud, fetchFromCloud } = useCloudSync();
  const { user, isGuest, loading } = useAuth();

  useEffect(() => {
    // 1. Load from local storage initially
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    // 2. Once logged in, attempt to fetch from cloud and merge
    if (!loading && user && !isGuest) {
      fetchFromCloud('favorites').then(cloudFavs => {
        if (cloudFavs && Array.isArray(cloudFavs)) {
          setFavorites(prev => {
            const map = new Map<string, BrandKit>();
            cloudFavs.forEach((f: any) => {
              // Backward compatibility check
              if (f.intelligence) map.set(f.name, f as BrandKit);
              else map.set(f.name, generateBrandKit(f.name, f.category || 'general'));
            });
            prev.forEach(f => map.set(f.name, f));
            const merged = Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
            
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
            return merged;
          });
        }
      });
    }
  }, [user, isGuest, loading, fetchFromCloud]);

  const save = useCallback((updated: BrandKit[]) => {
    setFavorites(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
    syncToCloud('favorites', updated);
  }, [syncToCloud]);

  const addFavorite = useCallback((name: string, category = 'general', kit?: BrandKit) => {
    setFavorites(prev => {
      if (prev.some(f => f.name === name)) return prev;
      const newKit = kit || generateBrandKit(name, category);
      const updated = [newKit, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      syncToCloud('favorites', updated);
      return updated;
    });
  }, [syncToCloud]);

  const removeFavorite = useCallback((name: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.name !== name);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      syncToCloud('favorites', updated);
      return updated;
    });
  }, [syncToCloud]);

  const isFavorite = useCallback((name: string) => {
    return favorites.some(f => f.name === name);
  }, [favorites]);

  const clearAll = useCallback(() => save([]), [save]);

  return { favorites, addFavorite, removeFavorite, isFavorite, clearAll };
}
