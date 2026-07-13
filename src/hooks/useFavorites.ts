import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ubn_favorites';

export interface FavoriteEntry {
  name: string;
  category: string;
  savedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const save = useCallback((updated: FavoriteEntry[]) => {
    setFavorites(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  }, []);

  const addFavorite = useCallback((name: string, category = 'general') => {
    setFavorites(prev => {
      if (prev.some(f => f.name === name)) return prev;
      const updated = [{ name, category, savedAt: Date.now() }, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((name: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.name !== name);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const isFavorite = useCallback((name: string) => {
    return favorites.some(f => f.name === name);
  }, [favorites]);

  const clearAll = useCallback(() => save([]), [save]);

  return { favorites, addFavorite, removeFavorite, isFavorite, clearAll };
}
