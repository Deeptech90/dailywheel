'use client';

import styles from './WheelModeSelector.module.css';

export type WheelMode = 'business' | 'daily' | 'animal';

interface WheelModeSelectorProps {
  activeMode: WheelMode;
  onModeChange: (mode: WheelMode) => void;
  disabled?: boolean;
}

const MODES: { mode: WheelMode; icon: string; title: string; desc: string }[] = [
  {
    mode: 'business',
    icon: '🏢',
    title: 'Business Name',
    desc: 'Pick a category & spin for brandable names',
  },
  {
    mode: 'daily',
    icon: '📋',
    title: 'Daily Choices',
    desc: 'Enter your options & let the wheel decide',
  },
  {
    mode: 'animal',
    icon: '🐾',
    title: 'Spirit Animal',
    desc: 'Discover which animal represents you',
  },
];

export function WheelModeSelector({
  activeMode,
  onModeChange,
  disabled = false,
}: WheelModeSelectorProps) {
  return (
    <div className={styles.container} role="radiogroup" aria-label="Wheel mode">
      {MODES.map(({ mode, icon, title, desc }) => {
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-disabled={disabled}
            className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
            onClick={() => !disabled && onModeChange(mode)}
          >
            <span className={styles.cardIcon} aria-hidden="true">
              {icon}
            </span>
            <div>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardDesc}>{desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
