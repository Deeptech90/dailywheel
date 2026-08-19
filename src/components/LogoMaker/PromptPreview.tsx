/* ============================================================
   Prompt Preview — collapsible panel showing AI prompt strings
   ============================================================ */
import { useState } from 'react';
import { PromptSet, PromptVariant } from '../../types/logoMaker';
import styles from './LogoMaker.module.css';

interface PromptPreviewProps {
  prompts: PromptSet;
  onVariantChange: (v: PromptVariant) => void;
  onCustomPromptChange: (p: string) => void;
}

const VARIANTS: { id: PromptVariant; label: string }[] = [
  { id: 'detailed',   label: 'Detailed' },
  { id: 'concise',    label: 'Concise' },
  { id: 'creative',   label: 'Creative' },
  { id: 'minimalist', label: 'Minimalist' },
];

export function PromptPreview({ prompts, onVariantChange, onCustomPromptChange }: PromptPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activePrompt = prompts.customPrompt || prompts[prompts.activeVariant];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className={styles.promptPreview}>
      <button
        type="button"
        className={styles.promptToggle}
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
      >
        <span className={styles.promptToggleIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
        Advanced: View &amp; Edit Prompt
        <span className={`${styles.promptChevron} ${isOpen ? styles.promptChevronOpen : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={styles.promptPanel}>
          {/* Variant selector */}
          <div className={styles.promptVariants}>
            {VARIANTS.map(v => (
              <button
                key={v.id}
                type="button"
                className={`${styles.variantBtn} ${prompts.activeVariant === v.id ? styles.variantBtnActive : ''}`}
                onClick={() => onVariantChange(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Prompt textarea */}
          <div className={styles.promptTextareaWrap}>
            <textarea
              className={styles.promptTextarea}
              value={activePrompt}
              onChange={(e) => onCustomPromptChange(e.target.value)}
              rows={5}
              aria-label="AI prompt text"
            />
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Copy prompt to clipboard"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Negative prompt */}
          <div className={styles.negativePrompt}>
            <span className={styles.negativeLabel}>Negative:</span>
            <span className={styles.negativeText}>{prompts.negative}</span>
          </div>
        </div>
      )}
    </div>
  );
}
