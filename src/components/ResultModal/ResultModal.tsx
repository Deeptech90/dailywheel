import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Segment } from '../../types';
import { adjustColorOpacity, getContrastTextColor } from '../../utils/colors';
import styles from './ResultModal.module.css';

interface ResultModalProps {
  segment: Segment | null;
  onClose: () => void;
}

function fireConfetti(color: string) {
  // Burst from left
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.65 },
    colors: [color, '#a855f7', '#f59e0b', '#ffffff'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
    shapes: ['square', 'circle'],
  });
  // Burst from right
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.65 },
    colors: [color, '#7c3aed', '#fbbf24', '#ffffff'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
    shapes: ['square', 'circle'],
  });
  // Final center shower
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: [color, '#a855f7', '#f59e0b'],
      ticks: 150,
      gravity: 1.2,
    });
  }, 300);
}

export function ResultModal({ segment, onClose }: ResultModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fire confetti whenever a result appears
  useEffect(() => {
    if (segment) {
      document.body.style.overflow = 'hidden';
      fireConfetti(segment.color);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [segment]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && segment) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [segment, onClose]);

  if (!segment) return null;

  return (
    <div
      ref={overlayRef}
      id="result-modal-overlay"
      className={styles.overlay}
      onClick={e => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-title"
    >
      <div className={styles.card}>
        {/* Animated emoji orbit ring */}
        <div className={styles.ring}>
          {['🎉', '✨', '🌟', '🎊', '💫', '⭐', '🎯', '🏆'].map((emoji, i) => (
            <span
              key={i}
              className={styles.ringEmoji}
              style={{ '--i': i, '--total': 8 } as React.CSSProperties}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className={styles.badge} style={{ backgroundColor: segment.color }}>
          🎯
        </div>

        <h2 id="result-title" className={styles.title}>Today's Suggestion</h2>

        <div className={styles.resultBox} style={{ borderColor: segment.color }}>
          <p className={styles.resultText}>{segment.label}</p>
        </div>

        <p className={styles.subtitle}>The wheel has spoken! 🌀</p>

        <div className={styles.actions}>
          <button
            id="result-close-btn"
            className={styles.closeBtn}
            onClick={onClose}
            style={{
              background: `linear-gradient(135deg, ${segment.color || '#a855f7'}, ${adjustColorOpacity(segment.color || '#a855f7', 0.75)})`,
              color: getContrastTextColor(segment.color || '#a855f7')
            }}
          >
            Awesome, let's go! 🚀
          </button>
          <button
            id="result-respin-btn"
            className={styles.respinBtn}
            onClick={onClose}
          >
            🔄 Spin again
          </button>
        </div>

        {/* Shimmer overlay */}
        <div className={styles.shimmer} aria-hidden />
      </div>
    </div>
  );
}
