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
    particleCount: 70,
    angle: 60,
    spread: 75,
    origin: { x: 0, y: 0.65 },
    colors: [color, '#a855f7', '#f59e0b', '#ffffff', '#06b6d4'],
    ticks: 220,
    gravity: 0.75,
    scalar: 1.1,
    shapes: ['square', 'circle'],
  });
  confetti({
    particleCount: 70,
    angle: 120,
    spread: 75,
    origin: { x: 1, y: 0.65 },
    colors: [color, '#7c3aed', '#fbbf24', '#ffffff', '#67e8f9'],
    ticks: 220,
    gravity: 0.75,
    scalar: 1.1,
    shapes: ['square', 'circle'],
  });
  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 100,
      origin: { x: 0.5, y: 0.35 },
      colors: [color, '#a855f7', '#f59e0b'],
      ticks: 160,
      gravity: 1.1,
    });
  }, 350);
}

function getModeTitle(mode: WheelMode): string {
  switch (mode) {
    case 'business': return '✨ Your Business Name Is';
    case 'daily':    return "🎯 Today's Choice Is";
    case 'animal':   return '🐾 Your Spirit Animal Is';
    default:         return '🌀 The Wheel Has Spoken';
  }
}

function getModeSubtitle(mode: WheelMode): string {
  switch (mode) {
    case 'business': return 'A brandable name — ready to register!';
    case 'daily':    return 'The universe has decided. Time to act!';
    case 'animal':   return 'Your spirit animal has been revealed!';
    default:         return 'The wheel has spoken!';
  }
}

function getCloseBtnText(mode: WheelMode): string {
  switch (mode) {
    case 'business': return 'Use This Name 🚀';
    case 'daily':    return "Let's Do It! ✨";
    case 'animal':   return 'Embrace It! 🎉';
    default:         return "Awesome, Let's Go! 🚀";
  }
}

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

  const handleShare = async () => {
    if (!segment) return;
    const shareText = mode === 'business'
      ? `I just found a great business name: "${segment.label}" 🚀 Try the Anti-Gravity Wheel at uniquebusinessname.com`
      : mode === 'animal'
      ? `My spirit animal is ${segment.icon} ${segment.label}! Discover yours at uniquebusinessname.com`
      : `I spun the Anti-Gravity Wheel and got: "${segment.label}" ✨ uniquebusinessname.com`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Anti-Gravity Wheel Result', text: shareText, url: 'https://uniquebusinessname.com' });
      } else {
        // Fallback: Twitter/X share
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      // User cancelled share
    }
  };

  if (!segment) return null;

  const displayLabel = mode === 'animal' && segment.icon
    ? `${segment.icon} ${segment.label}`
    : segment.label;

  const domainUrl = `https://www.godaddy.com/domainsearch/find?checkAvail=1&tld=com&domainToCheck=${encodeURIComponent(segment.label.toLowerCase().replace(/\s+/g, ''))}`;

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
        {/* Orbiting emoji ring */}
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

        {mode === 'animal' && segment.trait && (
          <p className={styles.traitText}>{segment.trait}</p>
        )}

        <p className={styles.subtitle}>{getModeSubtitle(mode)}</p>

        <div className={styles.actions}>
          {/* Primary CTA */}
          <button
            id="result-close-btn"
            className={styles.closeBtn}
            onClick={onClose}
            style={{
              background: `linear-gradient(135deg, ${segment.color || '#a855f7'}, ${adjustColorOpacity(segment.color || '#a855f7', 0.75)})`,
              color: getContrastTextColor(segment.color || '#a855f7'),
            }}
          >
            {getCloseBtnText(mode)}
          </button>

          {/* Copy + Share row */}
          <div className={styles.secondaryRow}>
            {(mode === 'business' || mode === 'daily') && (
              <button
                id="result-copy-btn"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            )}
            <button
              id="result-share-btn"
              className={styles.shareBtn}
              onClick={handleShare}
              aria-label="Share result"
            >
              🔗 Share
            </button>
          </div>

          {/* Domain check (business mode only) */}
          {mode === 'business' && (
            <a
              id="result-domain-btn"
              className={styles.domainBtn}
              href={domainUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Check domain availability"
            >
              🌐 Check Domain Availability
            </a>
          )}

          {/* Re-spin */}
          <button
            id="result-respin-btn"
            className={styles.respinBtn}
            onClick={onClose}
          >
            🔄 Spin Again
          </button>
        </div>

        {/* Accessible live region */}
        <div className="sr-only" aria-live="assertive" role="status">
          Winner: {segment.label}
          {mode === 'animal' && segment.trait ? `. ${segment.trait}` : ''}
        </div>

        {/* Shimmer effect */}
        <div className={styles.shimmer} aria-hidden />
      </div>
    </div>
  );
}
