import { SpinResult } from '../../types';
import styles from './HistoryFeed.module.css';

interface HistoryFeedProps {
  history: SpinResult[];
  onClose: () => void;
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function HistoryFeed({ history, onClose }: HistoryFeedProps) {
  const recent = [...history].reverse().slice(0, 10);

  return (
    <div
      id="history-panel-overlay"
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Spin history"
    >
      <div className={styles.panel}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>🕐 History</h2>
          <button
            id="history-panel-close"
            className={styles.closeX}
            onClick={onClose}
            aria-label="Close history"
          >
            ✕
          </button>
        </div>

        {recent.length === 0 ? (
          <div className={styles.empty}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>
              ✨
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>
              Let's create your first business name
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Your generated names will appear here.
            </p>
            <button 
              className="btn-glow" 
              onClick={onClose} 
              style={{ padding: '0 2rem', borderRadius: 'var(--radius-md)' }}
            >
              Start Generating
            </button>
          </div>
        ) : (
          <div className={styles.list}>
            {recent.map((result, i) => (
              <div
                key={result.id}
                className={styles.item}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span
                  className={styles.dot}
                  style={{ background: result.segment.color }}
                />
                <div className={styles.content}>
                  <p className={styles.label}>{result.segment.label}</p>
                  <p className={styles.time}>{timeAgo(result.timestamp)}</p>
                </div>
                <span className={styles.rank}>#{i + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
