/* ============================================================
   Step 3: Generate & Preview
   ============================================================ */
import { GeneratedLogo, LogoInputs, DesignPrefs, PromptSet, PromptVariant } from '../../../types/logoMaker';
import { LogoPreviewCard } from '../LogoPreviewCard';
import { PromptPreview } from '../PromptPreview';
import styles from '../LogoMaker.module.css';

interface GenerateStepProps {
  inputs: LogoInputs;
  prefs: DesignPrefs;
  prompts: PromptSet | null;
  logos: GeneratedLogo[];
  isGenerating: boolean;
  generationError: string | null;
  progressMsg: string;
  selectedLogoId: string | null;
  onGenerate: () => void;
  onSelectLogo: (id: string) => void;
  onEditLogo: (id: string) => void;
  onBack: () => void;
  onPromptVariantChange: (v: PromptVariant) => void;
  onCustomPromptChange: (p: string) => void;
}

const LOADING_STEPS = [
  'Composing design elements…',
  'Applying color palette…',
  'Rendering typography…',
  'Generating variants…',
  'Almost ready…',
];

export function GenerateStep({
  inputs, prefs, prompts, logos, isGenerating, generationError, progressMsg,
  selectedLogoId, onGenerate, onSelectLogo, onEditLogo, onBack,
  onPromptVariantChange, onCustomPromptChange,
}: GenerateStepProps) {
  const hasLogos = logos.length > 0;

  return (
    <div className={styles.stepContainer}>
      {!hasLogos && !isGenerating && (
        <div className={styles.stepHeader}>
          <div className={styles.stepIcon}>✨</div>
          <h2 className={styles.stepTitle}>Ready to Generate</h2>
          <p className={styles.stepSubtitle}>
            We'll create 4 unique logo variants for <strong>{inputs.businessName}</strong> using your design preferences.
          </p>
        </div>
      )}

      {hasLogos && !isGenerating && (
        <div className={styles.stepHeader}>
          <h2 className={styles.stepTitle}>Your Logo Designs</h2>
          <p className={styles.stepSubtitle}>
            Select a variant to edit and download, or regenerate for new ideas.
          </p>
        </div>
      )}

      {/* ── Summary card ─────────────────────────────────────── */}
      {!hasLogos && !isGenerating && (
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Brand</span>
            <span className={styles.summaryVal}>{inputs.businessName}</span>
          </div>
          {inputs.tagline && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryKey}>Tagline</span>
              <span className={styles.summaryVal}>"{inputs.tagline}"</span>
            </div>
          )}
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Style</span>
            <span className={styles.summaryVal}>{prefs.templateStyle} · {prefs.layout}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Colors</span>
            <span className={styles.summaryVal}>
              <span className={styles.summaryColorDot} style={{ background: prefs.primaryColor }} />
              <span className={styles.summaryColorDot} style={{ background: prefs.secondaryColor }} />
              {prefs.primaryColor} / {prefs.secondaryColor}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Font</span>
            <span className={styles.summaryVal}>{prefs.fontStyle}</span>
          </div>
          {prefs.iconKeyword && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryKey}>Icon</span>
              <span className={styles.summaryVal}>{prefs.iconKeyword}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Prompt Preview (Advanced) ──────────────────────────── */}
      {prompts && !isGenerating && (
        <PromptPreview
          prompts={prompts}
          onVariantChange={onPromptVariantChange}
          onCustomPromptChange={onCustomPromptChange}
        />
      )}

      {/* ── Error ──────────────────────────────────────────────── */}
      {generationError && (
        <div className={styles.errorBanner} role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {generationError}
        </div>
      )}

      {/* ── Loading State ──────────────────────────────────────── */}
      {isGenerating && (
        <div className={styles.loadingState}>
          <div className={styles.loadingOrb} aria-hidden="true" />
          <div className={styles.loadingMsg}>{progressMsg}</div>
          <div className={styles.loadingSteps}>
            {LOADING_STEPS.map((step, i) => (
              <div
                key={step}
                className={`${styles.loadingStep} ${progressMsg === step ? styles.loadingStepActive : ''}`}
              >
                <span className={styles.loadingStepDot} />
                {step}
              </div>
            ))}
          </div>
          {/* Skeleton cards */}
          <div className={styles.previewGrid}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={styles.skeletonCard} aria-hidden="true">
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonLabel} />
                <div className={styles.skeletonActions} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Logo Grid ──────────────────────────────────────────── */}
      {hasLogos && !isGenerating && (
        <div className={styles.previewGrid}>
          {logos.map(logo => (
            <LogoPreviewCard
              key={logo.id}
              logo={logo}
              businessName={inputs.businessName}
              isSelected={selectedLogoId === logo.id}
              onSelect={onSelectLogo}
              onEdit={onEditLogo}
            />
          ))}
        </div>
      )}

      {/* ── Actions ────────────────────────────────────────────── */}
      <div className={styles.stepFooter}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          disabled={isGenerating}
          id="step3-back-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          type="button"
          className={`${styles.generateBtn} ${isGenerating ? styles.generateBtnLoading : ''}`}
          onClick={onGenerate}
          disabled={isGenerating}
          id="generate-logo-btn"
          aria-label="Generate Logo"
        >
          {isGenerating ? (
            <>
              <span className={styles.btnSpinner} aria-hidden="true" />
              Generating…
            </>
          ) : hasLogos ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
              </svg>
              Regenerate
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Generate Logo
            </>
          )}
        </button>
      </div>

      {/* ── Ownership note ─────────────────────────────────────── */}
      {hasLogos && (
        <p className={styles.ownershipNote}>
          🔒 You own this logo — including rights to reprint, merchandise, and sell it. No attribution required.
        </p>
      )}
    </div>
  );
}
