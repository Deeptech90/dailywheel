import { Segment, SpinResult } from '../types';
import { DEFAULT_SEGMENTS } from './colors';

const SEGMENTS_KEY = 'dw_segments';
const HISTORY_KEY = 'dw_history';
const SOUND_KEY = 'dw_sound';

export function loadSegments(): Segment[] {
  try {
    const raw = localStorage.getItem(SEGMENTS_KEY);
    if (raw) return JSON.parse(raw) as Segment[];
  } catch { /* ignore */ }
  return DEFAULT_SEGMENTS;
}

export function saveSegments(segments: Segment[]): void {
  localStorage.setItem(SEGMENTS_KEY, JSON.stringify(segments));
}

export function loadHistory(): SpinResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw) as SpinResult[];
  } catch { /* ignore */ }
  return [];
}

export function saveHistory(history: SpinResult[]): void {
  // Keep only the last 50 results
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
