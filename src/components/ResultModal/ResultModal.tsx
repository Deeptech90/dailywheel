'use client';

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Segment, WheelMode } from '../../types';
import { adjustColorOpacity, getContrastTextColor } from '../../utils/colors';
import styles from './ResultModal.module.css';

interface ResultModalProps {
  segment: Segment | null;
  mode: WheelMode;
  onClose: () => void;
}

function fireConfetti(color: string) {
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

/** Mode-specific heading text */
function getModeTitle(mode: WheelMode): string {
  switch (mode) {
    case 'business': return 'Your Business Name Is';
    case 'daily':    return "Today's Choice Is";
    case 'animal':   return 'You Are The';
    default:         return "Today's Suggestion";
  }
}

/** Mode-specific subtitle */
function getModeSubtitle(mode: WheelMode): string {
  switch (mode) {
    case 'business': return '🎯 A brandable name, ready to register!';
    case 'daily':    return '✨ The wheel has spoken — go do it!';
    case 'animal':   return '🐾 Your spirit animal has been revealed!';
    default:         return 'The wheel has spoken! 🌀';
  }
}

/** Mode-specific CTA text */
function getCloseBtnText(mode: WheelMode): string {
  switch (mode) {
    case 'business': return 'Use This Name 🚀';
    case 'daily':    return "Let's do it! ✨";
    case 'animal':   return 'Awesome! 🎉';
    default:         return "Awesome, let's go! 🚀";
  }
}

/** Mode-specific badge emoji */
function getBadgeEmoji(mode: WheelMode, segment: Segment | null): string {
  if (mode === 'animal' && segment?.icon) return segment.icon;
  switch (mode) {
    case 'business': return '🏢';
    case 'daily':    return '📋';
    case 'animal':   return '🐾';
    default:         return '🎯';
  }
}

export function ResultModal({ segment, mode, onClose }: ResultModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    if (!segment) return;
    try {
      await navigator.clipboard.writeText(segment.label);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select and copy via execCommand
      const el = document.createElement('textarea');
      el.value = segment.label;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!segment) return null;

  const displayLabel = mode === 'animal' && segment.icon
    ? `${segment.icon} ${segment.label}`
    : segment.label;

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
          {getBadgeEmoji(mode, segment)}
        </div>

        <h2 id="result-title" className={styles.title}>{getModeTitle(mode)}</h2>

        <div className={styles.resultBox} style={{ borderColor: segment.color }}>
          <p className={styles.resultText}>{displayLabel}</p>
        </div>

        {/* Animal personality trait */}
        {mode === 'animal' && segment.trait && (
          <p className={styles.traitText}>{segment.trait}</p>
        )}

        <p className={styles.subtitle}>{getModeSubtitle(mode)}</p>

        <div className={styles.actions}>
          {/* Copy button for business mode */}
          {mode === 'business' && (
            <button
              id="result-copy-btn"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label={copied ? 'Name copied!' : 'Copy name to clipboard'}
            >
              {copied ? '✅ Copied!' : '📋 Copy Name'}
            </button>
          )}

          <button
            id="result-close-btn"
            className={styles.closeBtn}
            onClick={onClose}
            style={{
              background: `linear-gradient(135deg, ${segment.color || '#a855f7'}, ${adjustColorOpacity(segment.color || '#a855f7', 0.75)})`,
              color: getContrastTextColor(segment.color || '#a855f7')
            }}
          >
            {getCloseBtnText(mode)}
          </button>
          <button
            id="result-respin-btn"
            className={styles.respinBtn}
            onClick={onClose}
          >
            🔄 Spin again
          </button>
        </div>

        {/* ARIA live region for screen readers */}
        <div className="sr-only" aria-live="assertive" role="status">
          Winner: {segment.label}
          {mode === 'animal' && segment.trait ? `. ${segment.trait}` : ''}
        </div>

        {/* Shimmer overlay */}
        <div className={styles.shimmer} aria-hidden />
      </div>
    </div>
  );
}
