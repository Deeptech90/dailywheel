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
    desc: 'Brandable names for your venture',
  },
  {
    mode: 'daily',
    icon: '📋',
    title: 'Daily Choices',
    desc: 'Spin to pick from your options',
  },
  {
    mode: 'animal',
    icon: '🐾',
    title: 'Spirit Animal',
    desc: 'Discover your inner animal',
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
            id={`mode-${mode}-btn`}
            className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
            onClick={() => !disabled && onModeChange(mode)}
          >
            <span className={styles.cardIcon} aria-hidden="true">{icon}</span>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardDesc}>{desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
