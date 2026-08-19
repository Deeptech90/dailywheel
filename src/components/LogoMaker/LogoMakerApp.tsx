/* ============================================================
   LogoMakerApp — main orchestrator component
   3-step wizard: inputs → design → generate/preview
   ============================================================ */
import { useState, useCallback, useRef } from 'react';
import {
  LogoMakerState, LogoInputs, DesignPrefs, GeneratedLogo,
  PromptVariant, PRESET_PALETTES,
} from '../../types/logoMaker';
import { buildPromptSet } from '../../engines/logoPromptBuilder';
import { generateLogos, checkRateLimit, recordGeneration } from '../../lib/logoApi';
import { BrandInputStep } from './steps/BrandInputStep';
import { DesignPrefsStep } from './steps/DesignPrefsStep';
import { GenerateStep } from './steps/GenerateStep';
import { LogoEditor } from './LogoEditor';
import styles from './LogoMaker.module.css';

/* ── Default state ───────────────────────────────────────────── */
const DEFAULT_INPUTS: LogoInputs = {
  businessName: '',
  tagline: '',
  industry: 'technology',
  styleKeywords: ['modern', 'professional'],
  targetAudience: '',
  usageContexts: ['web'],
};

const DEFAULT_PREFS: DesignPrefs = {
  primaryColor:   PRESET_PALETTES[0].primary,
  secondaryColor: PRESET_PALETTES[0].secondary,
  iconKeyword:    '',
  fontStyle:      'sans',
  layout:         'horizontal',
  templateStyle:  'minimal',
  aspectRatio:    '1:1',
};

const INITIAL_STATE: LogoMakerState = {
  step:             1,
  inputs:           DEFAULT_INPUTS,
  prefs:            DEFAULT_PREFS,
  prompts:          null,
  logos:            [],
  selectedLogoId:   null,
  isGenerating:     false,
  generationError:  null,
  showEditor:       false,
  showPromptPreview:false,
};

/* ── Step progress indicator ─────────────────────────────────── */
function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: 'Brand Info' },
    { num: 2, label: 'Design' },
    { num: 3, label: 'Generate' },
  ];
  return (
    <div className={styles.stepIndicator} aria-label="Wizard steps">
      {steps.map((s, i) => (
        <div key={s.num} className={styles.stepIndicatorItem}>
          <div className={`${styles.stepDot} ${currentStep === s.num ? styles.stepDotActive : ''} ${currentStep > s.num ? styles.stepDotDone : ''}`}>
            {currentStep > s.num ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : s.num}
          </div>
          <span className={`${styles.stepDotLabel} ${currentStep === s.num ? styles.stepDotLabelActive : ''}`}>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div className={`${styles.stepConnector} ${currentStep > s.num ? styles.stepConnectorDone : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export function LogoMakerApp() {
  const [state, setState] = useState<LogoMakerState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof LogoInputs, string>>>({});
  const [progressMsg, setProgressMsg] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Validation ──────────────────────────────────────────────── */
  const validateStep1 = (): boolean => {
    const newErrors: typeof errors = {};
    const name = state.inputs.businessName.trim();
    if (!name) {
      newErrors.businessName = 'Please enter a business name to continue.';
    } else if (name.length < 2) {
      newErrors.businessName = 'Business name must be at least 2 characters.';
    } else if (name.length > 60) {
      newErrors.businessName = 'Business name must be 60 characters or fewer.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── Step navigation ─────────────────────────────────────────── */
  const goToStep = (step: 1 | 2 | 3) => {
    setState(s => ({ ...s, step }));
    scrollTop();
  };

  const handleStep1Next = () => {
    if (!validateStep1()) return;
    goToStep(2);
  };

  const handleStep2Next = () => {
    goToStep(3);
  };

  /* ── Generate ────────────────────────────────────────────────── */
  const handleGenerate = useCallback(async () => {
    // Rate limit check
    const { allowed, resetIn } = checkRateLimit();
    if (!allowed) {
      setState(s => ({
        ...s,
        generationError: `API limit reached. Please wait ${resetIn} minute${resetIn !== 1 ? 's' : ''} and try again.`,
      }));
      return;
    }

    // Build prompts
    const promptSet = buildPromptSet(state.inputs, state.prefs, 'detailed');
    const activePrompt = state.prompts?.customPrompt || promptSet.detailed;

    setState(s => ({
      ...s,
      isGenerating: true,
      generationError: null,
      prompts: promptSet,
    }));

    try {
      const result = await generateLogos(
        activePrompt,
        state.inputs,
        state.prefs,
        (msg) => setProgressMsg(msg),
      );

      recordGeneration();

      setState(s => ({
        ...s,
        logos:          result.logos,
        isGenerating:   false,
        selectedLogoId: result.logos[0]?.id ?? null,
      }));
    } catch (err) {
      setState(s => ({
        ...s,
        isGenerating:   false,
        generationError: 'Logo generation failed. Please try again or modify your inputs.',
      }));
    } finally {
      setProgressMsg('');
    }
  }, [state.inputs, state.prefs, state.prompts]);

  /* ── Logo selection / editing ────────────────────────────────── */
  const handleSelectLogo = (id: string) => {
    setState(s => ({ ...s, selectedLogoId: id }));
  };

  const handleEditLogo = (id: string) => {
    setState(s => ({ ...s, selectedLogoId: id, showEditor: true }));
  };

  const handleEditorSave = (updated: GeneratedLogo) => {
    setState(s => ({
      ...s,
      logos: s.logos.map(l => l.id === updated.id ? updated : l),
      showEditor: false,
    }));
  };

  /* ── Prompt tweaks ───────────────────────────────────────────── */
  const handlePromptVariantChange = (v: PromptVariant) => {
    setState(s => s.prompts
      ? { ...s, prompts: { ...s.prompts, activeVariant: v, customPrompt: s.prompts[v] } }
      : s
    );
  };

  const handleCustomPromptChange = (p: string) => {
    setState(s => s.prompts
      ? { ...s, prompts: { ...s.prompts, customPrompt: p } }
      : s
    );
  };

  const selectedLogo = state.logos.find(l => l.id === state.selectedLogoId) ?? null;

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <div className={styles.logoMakerRoot} ref={topRef}>
      {/* Hero Header */}
      <div className={styles.heroSection}>
        <div className={styles.heroBadge}>✦ New Feature</div>
        <h1 className={styles.heroTitle}>
          AI Logo Maker
        </h1>
        <p className={styles.heroSubtitle}>
          Create a professional logo in minutes — no design skills needed.
          Answer a few questions and our engine generates unique, print-ready designs.
        </p>
        <div className={styles.heroFeatures}>
          <span className={styles.heroFeature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            6 logo styles
          </span>
          <span className={styles.heroFeature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            SVG &amp; PNG export
          </span>
          <span className={styles.heroFeature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Full commercial rights
          </span>
          <span className={styles.heroFeature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            100% free
          </span>
        </div>
      </div>

      {/* Wizard Container */}
      <div className={styles.wizardContainer}>
        <StepIndicator currentStep={state.step} />

        <div className={styles.wizardContent}>
          {state.step === 1 && (
            <BrandInputStep
              inputs={state.inputs}
              onChange={(inputs) => setState(s => ({ ...s, inputs }))}
              onNext={handleStep1Next}
              errors={errors}
            />
          )}
          {state.step === 2 && (
            <DesignPrefsStep
              prefs={state.prefs}
              onChange={(prefs) => setState(s => ({ ...s, prefs }))}
              onBack={() => goToStep(1)}
              onNext={handleStep2Next}
            />
          )}
          {state.step === 3 && (
            <GenerateStep
              inputs={state.inputs}
              prefs={state.prefs}
              prompts={state.prompts}
              logos={state.logos}
              isGenerating={state.isGenerating}
              generationError={state.generationError}
              progressMsg={progressMsg}
              selectedLogoId={state.selectedLogoId}
              onGenerate={handleGenerate}
              onSelectLogo={handleSelectLogo}
              onEditLogo={handleEditLogo}
              onBack={() => goToStep(2)}
              onPromptVariantChange={handlePromptVariantChange}
              onCustomPromptChange={handleCustomPromptChange}
            />
          )}
        </div>
      </div>

      {/* Logo Editor overlay */}
      {state.showEditor && selectedLogo && (
        <LogoEditor
          logo={selectedLogo}
          inputs={state.inputs}
          onClose={() => setState(s => ({ ...s, showEditor: false }))}
          onSave={handleEditorSave}
        />
      )}

      {/* Bottom info strip */}
      <div className={styles.infoStrip}>
        <div className={styles.infoStripInner}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>🎨</span>
            <span>6 unique template styles</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📐</span>
            <span>SVG vector quality</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>🔒</span>
            <span>You own the logo</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>⚡</span>
            <span>Instant generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoMakerApp;
