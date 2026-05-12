import { useState } from 'react';
import styles from './QuestionPrompt.module.css';

interface QuestionPromptProps {
  isSpinning: boolean;
}

const DAILY_PROMPTS = [
  'What would make today feel meaningful?',
  'What\'s one thing you\'ve been putting off?',
  'What small joy could you give yourself today?',
  'What would your best self do today?',
  'What habit do you want to build this week?',
  'What would bring you the most energy today?',
  'What\'s something you\'re grateful for right now?',
  'What would make today a win?',
];

/** Gets a deterministic daily prompt based on the calendar date */
function getDailyPrompt(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
}

export function QuestionPrompt({ isSpinning }: QuestionPromptProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const displayPrompt = customPrompt || getDailyPrompt();

  if (!isVisible) {
    return (
      <button
        id="show-prompt-btn"
        className={styles.showBtn}
        onClick={() => setIsVisible(true)}
        aria-label="Show daily prompt"
      >
        💭 Show Prompt
      </button>
    );
  }

  return (
    <div
      className={`${styles.container} ${isSpinning ? styles.floating : ''}`}
      role="note"
      aria-label="Daily prompt"
    >
      <div className={styles.header}>
        <span className={styles.label}>💭 Today's Prompt</span>
        <button
          id="hide-prompt-btn"
          className={styles.hideBtn}
          onClick={() => setIsVisible(false)}
          aria-label="Hide prompt"
        >
          ✕
        </button>
      </div>

      {isEditing ? (
        <div className={styles.editRow}>
          <input
            id="prompt-input"
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
            placeholder="Type your own question…"
            maxLength={80}
            className={styles.promptInput}
            autoFocus
          />
        </div>
      ) : (
        <p
          id="prompt-text"
          className={styles.promptText}
          onClick={() => setIsEditing(true)}
          title="Click to customise"
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsEditing(true)}
        >
          {displayPrompt}
          <span className={styles.editHint}> ✎</span>
        </p>
      )}

      {customPrompt && (
        <button
          id="reset-prompt-btn"
          className={styles.resetBtn}
          onClick={() => setCustomPrompt('')}
        >
          ↺ Reset to daily
        </button>
      )}
    </div>
  );
}
