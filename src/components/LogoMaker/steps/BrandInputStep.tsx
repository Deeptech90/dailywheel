/* ============================================================
   Step 1: Brand Inputs
   ============================================================ */
import { LogoInputs, StyleKeyword, INDUSTRIES, STYLE_KEYWORDS, Industry } from '../../../types/logoMaker';
import styles from '../LogoMaker.module.css';

interface BrandInputStepProps {
  inputs: LogoInputs;
  onChange: (inputs: LogoInputs) => void;
  onNext: () => void;
  errors: Partial<Record<keyof LogoInputs, string>>;
}

export function BrandInputStep({ inputs, onChange, onNext, errors }: BrandInputStepProps) {
  const toggleKeyword = (kw: StyleKeyword) => {
    const already = inputs.styleKeywords.includes(kw);
    const updated = already
      ? inputs.styleKeywords.filter(k => k !== kw)
      : [...inputs.styleKeywords, kw];
    onChange({ ...inputs, styleKeywords: updated });
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}>✦</div>
        <h2 className={styles.stepTitle}>Tell us about your brand</h2>
        <p className={styles.stepSubtitle}>
          This information shapes your logo's personality and style.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Business Name */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label htmlFor="business-name" className={styles.fieldLabel}>
            Business Name <span className={styles.required} aria-label="required">*</span>
          </label>
          <input
            id="business-name"
            type="text"
            className={`${styles.fieldInput} ${errors.businessName ? styles.fieldInputError : ''}`}
            value={inputs.businessName}
            onChange={(e) => onChange({ ...inputs, businessName: e.target.value })}
            placeholder='e.g. "Sparkle Bakery"'
            maxLength={60}
            autoComplete="off"
            aria-required="true"
            aria-describedby={errors.businessName ? 'name-error' : undefined}
          />
          {errors.businessName && (
            <span id="name-error" className={styles.errorMsg} role="alert">
              {errors.businessName}
            </span>
          )}
          <span className={styles.charCount}>{inputs.businessName.length}/60</span>
        </div>

        {/* Tagline */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label htmlFor="tagline" className={styles.fieldLabel}>
            Tagline / Slogan
            <span className={styles.optional}> (optional)</span>
          </label>
          <input
            id="tagline"
            type="text"
            className={styles.fieldInput}
            value={inputs.tagline}
            onChange={(e) => onChange({ ...inputs, tagline: e.target.value })}
            placeholder='e.g. "Fresh foods delivered"'
            maxLength={80}
            autoComplete="off"
          />
          <span className={styles.charCount}>{inputs.tagline.length}/80</span>
        </div>

        {/* Industry */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label htmlFor="industry-select" className={styles.fieldLabel}>
            Industry / Sector <span className={styles.required} aria-label="required">*</span>
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="industry-select"
              className={styles.selectField}
              value={inputs.industry}
              onChange={(e) => onChange({ ...inputs, industry: e.target.value as Industry })}
              aria-required="true"
            >
              {INDUSTRIES.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {ind.icon} {ind.label}
                </option>
              ))}
            </select>
            <div className={styles.selectChevron} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Style Keywords */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label className={styles.fieldLabel}>
            Style Keywords
            <span className={styles.optional}> (pick up to 4)</span>
          </label>
          <p className={styles.fieldHint}>e.g. modern, elegant, playful</p>
          <div className={styles.chipGrid}>
            {STYLE_KEYWORDS.map(kw => {
              const active = inputs.styleKeywords.includes(kw);
              const maxReached = inputs.styleKeywords.length >= 4;
              return (
                <button
                  key={kw}
                  type="button"
                  className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                  onClick={() => toggleKeyword(kw)}
                  disabled={!active && maxReached}
                  aria-pressed={active}
                >
                  {kw.charAt(0).toUpperCase() + kw.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Audience */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label htmlFor="target-audience" className={styles.fieldLabel}>
            Target Audience
            <span className={styles.optional}> (optional)</span>
          </label>
          <input
            id="target-audience"
            type="text"
            className={styles.fieldInput}
            value={inputs.targetAudience}
            onChange={(e) => onChange({ ...inputs, targetAudience: e.target.value })}
            placeholder='e.g. "young professionals, families, health enthusiasts"'
            maxLength={100}
          />
        </div>
      </div>

      {/* CTA */}
      <div className={styles.stepFooter}>
        <button
          type="button"
          className={styles.nextBtn}
          onClick={onNext}
          id="step1-next-btn"
        >
          Next: Design Preferences
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
