import { useEffect } from 'react';
import { Segment, WheelMode } from '../../types';
import styles from './ResultModal.module.css';

interface ResultModalProps {
  segment: Segment | null;
  mode: WheelMode;
  category?: string;
  onClose: () => void;
  onSpinAgain?: () => void;
}


export function ResultModal({ segment, mode, category = 'general', onClose, onSpinAgain }: ResultModalProps) {
  const name = segment?.label ?? '';

  useEffect(() => {
    if ('vibrate' in navigator) navigator.vibrate([30, 20, 60]);
  }, []);

  if (!segment) return null;



  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        <div className={styles.handle} aria-hidden="true" />

        <div className={styles.winnerSection}>
          <span className={styles.confettiEmoji} aria-hidden="true">🎉</span>
          <p className={styles.winnerLabel}>{mode === 'animal' ? 'Your Spirit Animal' : 'Your New Brand'}</p>
          <h2 className={styles.winnerName}>{name}</h2>
          {category !== 'general' && <span className={styles.categoryChip}>{category}</span>}
        </div>



        <div className={styles.footer}>
          <button className={styles.spinAgainBtn} onClick={onSpinAgain}>
            🎡 Generate Another
          </button>
          <button className={styles.dismissBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
