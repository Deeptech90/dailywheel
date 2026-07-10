'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './DailyChoicesInput.module.css';

interface DailyChoicesInputProps {
  onLoadWheel: (entries: string[]) => void;
  disabled?: boolean;
}

const STORAGE_KEY = 'ubn_daily_choices';
const MAX_ENTRIES = 20;

const PRESETS: Record<string, string[]> = {
  'Workout Ideas': [
    'Go for a run',
    'Yoga session',
    'HIIT workout',
    'Swimming',
    'Cycling',
    'Jump rope',
    'Weight training',
    'Dance class',
  ],
  'Meal Choices': [
    'Pizza night',
    'Sushi',
    'Tacos',
    'Salad bowl',
    'Pasta',
    'Burger',
    'Stir fry',
    'Soup',
  ],
  'Weekend Fun': [
    'Movie marathon',
    'Hiking',
    'Board games',
    'Try a new cafe',
    'Paint or draw',
    'Visit a park',
    'Read a book',
    'Cook something new',
  ],
};

function parseEntries(raw: string): string[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, MAX_ENTRIES);
}

export function DailyChoicesInput({
  onLoadWheel,
  disabled = false,
}: DailyChoicesInputProps) {
  const [text, setText] = useState('');

  /* Restore from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const entries = useMemo(() => parseEntries(text), [text]);
  const canLoad = entries.length >= 2 && entries.length <= MAX_ENTRIES;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [],
  );

  const applyPreset = useCallback((name: string) => {
    const preset = PRESETS[name];
    if (preset) setText(preset.join('\n'));
  }, []);

  const handleLoad = useCallback(() => {
    if (!canLoad) return;
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {
      /* storage unavailable */
    }
    onLoadWheel(entries);
  }, [canLoad, text, entries, onLoadWheel]);

  return (
    <div className={styles.wrapper}>
      {/* Textarea */}
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        placeholder={
          'Type one choice per line...\n\nExamples:\nGo for a run\nRead a book\nCook something new\nCall a friend'
        }
        aria-label="Daily choices"
      />

      {/* Preset quick-fill buttons */}
      <div className={styles.presets}>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={styles.presetBtn}
            onClick={() => applyPreset(name)}
            disabled={disabled}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Chip previews */}
      {entries.length > 0 && (
        <div className={styles.chips}>
          {entries.map((entry, i) => (
            <span key={`${entry}-${i}`} className={styles.chip}>
              {entry}
            </span>
          ))}
        </div>
      )}

      {/* Entry counter */}
      <div
        className={`${styles.counter} ${entries.length > 0 && entries.length < 2 ? styles.counterWarn : ''}`}
      >
        {entries.length === 0
          ? 'Need at least 2 entries'
          : entries.length < 2
            ? 'Need at least 2 entries'
            : `${entries.length} entries ready`}
      </div>

      {/* Load Wheel button */}
      <button
        type="button"
        className={styles.loadBtn}
        disabled={!canLoad || disabled}
        onClick={handleLoad}
      >
        Load Wheel
      </button>
    </div>
  );
}
