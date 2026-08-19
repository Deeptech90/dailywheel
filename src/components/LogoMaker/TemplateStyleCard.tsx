/* ============================================================
   Template Style Card — visual selector for logo style templates
   ============================================================ */
import { TemplateStyle } from '../../types/logoMaker';
import styles from './LogoMaker.module.css';

interface TemplateStyleCardProps {
  id: TemplateStyle;
  label: string;
  description: string;
  icon: string;
  bestFor: string;
  isActive: boolean;
  onSelect: (id: TemplateStyle) => void;
}

export function TemplateStyleCard({
  id, label, description, icon, bestFor, isActive, onSelect,
}: TemplateStyleCardProps) {
  return (
    <button
      type="button"
      className={`${styles.templateCard} ${isActive ? styles.templateCardActive : ''}`}
      onClick={() => onSelect(id)}
      aria-pressed={isActive}
      aria-label={`${label} template: ${description}`}
    >
      <div className={styles.templateCardIcon}>{icon}</div>
      <div className={styles.templateCardBody}>
        <div className={styles.templateCardName}>{label}</div>
        <div className={styles.templateCardDesc}>{description}</div>
        <div className={styles.templateCardBest}>Best for: {bestFor}</div>
      </div>
      {isActive && (
        <div className={styles.templateCardCheck} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  );
}
