/* ============================================================
   Step 2: Design Preferences
   ============================================================ */
import {
  DesignPrefs, FontStyle, LayoutChoice, TemplateStyle, AspectRatio,
  TEMPLATE_STYLES,
} from '../../../types/logoMaker';
import { ColorPalettePicker } from '../ColorPalettePicker';
import { TemplateStyleCard } from '../TemplateStyleCard';
import styles from '../LogoMaker.module.css';

interface DesignPrefsStepProps {
  prefs: DesignPrefs;
  onChange: (prefs: DesignPrefs) => void;
  onBack: () => void;
  onNext: () => void;
}

const FONT_OPTIONS: { id: FontStyle; label: string; sample: string }[] = [
  { id: 'geometric', label: 'Geometric', sample: 'Aa' },
  { id: 'sans',      label: 'Sans-Serif', sample: 'Aa' },
  { id: 'serif',     label: 'Serif', sample: 'Aa' },
  { id: 'display',   label: 'Display', sample: 'Aa' },
  { id: 'script',    label: 'Script', sample: 'Aa' },
  { id: 'mono',      label: 'Monospace', sample: 'Aa' },
];

const FONT_PREVIEWS: Record<FontStyle, React.CSSProperties> = {
  geometric: { fontFamily: "'Outfit', sans-serif", fontWeight: 700, letterSpacing: '0.05em' },
  sans:      { fontFamily: "'Inter', sans-serif" },
  serif:     { fontFamily: "'Georgia', serif" },
  display:   { fontFamily: "'Outfit', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' },
  script:    { fontFamily: 'cursive' },
  mono:      { fontFamily: "ui-monospace, 'Courier New', monospace" },
};

const LAYOUT_OPTIONS: { id: LayoutChoice; label: string; icon: string }[] = [
  { id: 'horizontal', label: 'Horizontal', icon: '▬' },
  { id: 'stacked',    label: 'Stacked',    icon: '▪\n▪' },
  { id: 'icon-only',  label: 'Icon Only',  icon: '◉' },
  { id: 'text-only',  label: 'Text Only',  icon: 'T' },
];

const ASPECT_OPTIONS: { id: AspectRatio; label: string }[] = [
  { id: '1:1',  label: 'Square (1:1)' },
  { id: '16:9', label: 'Wide (16:9)' },
  { id: '4:3',  label: 'Standard (4:3)' },
];

export function DesignPrefsStep({ prefs, onChange, onBack, onNext }: DesignPrefsStepProps) {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}>🎨</div>
        <h2 className={styles.stepTitle}>Design Your Logo</h2>
        <p className={styles.stepSubtitle}>
          Choose your visual identity — colors, icons, fonts, and layout.
        </p>
      </div>

      <div className={styles.formGrid}>

        {/* Template Style */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label className={styles.fieldLabel}>Logo Style Template</label>
          <p className={styles.fieldHint}>Choose the structural style that fits your brand.</p>
          <div className={styles.templateGrid}>
            {TEMPLATE_STYLES.map(t => (
              <TemplateStyleCard
                key={t.id}
                {...t}
                isActive={prefs.templateStyle === t.id}
                onSelect={(id: TemplateStyle) => onChange({ ...prefs, templateStyle: id })}
              />
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <ColorPalettePicker
            primaryColor={prefs.primaryColor}
            secondaryColor={prefs.secondaryColor}
            onChange={(p, s) => onChange({ ...prefs, primaryColor: p, secondaryColor: s })}
          />
        </div>

        {/* Icon Preference */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label htmlFor="icon-keyword" className={styles.fieldLabel}>
            Icon Preference
            <span className={styles.optional}> (keyword)</span>
          </label>
          <p className={styles.fieldHint}>Search for icons: leaf, star, rocket, coffee, heart…</p>
          <input
            id="icon-keyword"
            type="text"
            className={styles.fieldInput}
            value={prefs.iconKeyword}
            onChange={(e) => onChange({ ...prefs, iconKeyword: e.target.value })}
            placeholder='e.g. "leaf", "bolt", "coffee"'
            maxLength={40}
          />
        </div>

        {/* Font Style */}
        <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
          <label className={styles.fieldLabel}>Font Style</label>
          <div className={styles.fontGrid}>
            {FONT_OPTIONS.map(f => (
              <button
                key={f.id}
                type="button"
                className={`${styles.fontCard} ${prefs.fontStyle === f.id ? styles.fontCardActive : ''}`}
                onClick={() => onChange({ ...prefs, fontStyle: f.id })}
                aria-pressed={prefs.fontStyle === f.id}
                aria-label={`${f.label} font`}
              >
                <span className={styles.fontSample} style={FONT_PREVIEWS[f.id]}>
                  {f.sample}
                </span>
                <span className={styles.fontLabel}>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Layout</label>
          <div className={styles.layoutGrid}>
            {LAYOUT_OPTIONS.map(l => (
              <button
                key={l.id}
                type="button"
                className={`${styles.layoutBtn} ${prefs.layout === l.id ? styles.layoutBtnActive : ''}`}
                onClick={() => onChange({ ...prefs, layout: l.id })}
                aria-pressed={prefs.layout === l.id}
              >
                <span className={styles.layoutIcon}>{l.icon}</span>
                <span className={styles.layoutLabel}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className={styles.fieldGroup}>
          <label htmlFor="aspect-ratio" className={styles.fieldLabel}>Aspect Ratio</label>
          <div className={styles.selectWrapper}>
            <select
              id="aspect-ratio"
              className={styles.selectField}
              value={prefs.aspectRatio}
              onChange={(e) => onChange({ ...prefs, aspectRatio: e.target.value as AspectRatio })}
            >
              {ASPECT_OPTIONS.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
            <div className={styles.selectChevron} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className={styles.stepFooter}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          id="step2-back-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          className={styles.nextBtn}
          onClick={onNext}
          id="step2-next-btn"
        >
          Generate Logo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
