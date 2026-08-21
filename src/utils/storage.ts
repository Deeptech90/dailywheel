/* ============================================================
   Storage Utilities — LocalStorage persistence for user preferences,
   brand history, and saved items
   ============================================================ */

export interface GenerationHistoryItem {
  id: string;
  name: string;
  category?: string;
  timestamp: number;
}

const HISTORY_KEY = 'ubn_generation_history';
const SOUND_KEY = 'ubn_sound_enabled';

export function loadHistory(): GenerationHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw) as GenerationHistoryItem[];
  } catch { /* ignore */ }
  return [];
}

export function saveHistory(history: GenerationHistoryItem[]): void {
  const trimmed = history.slice(-50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function loadSoundEnabled(): boolean {
  const val = localStorage.getItem(SOUND_KEY);
  return val === null ? true : val === 'true';
}

export function saveSoundEnabled(enabled: boolean): void {
  localStorage.setItem(SOUND_KEY, String(enabled));
}
