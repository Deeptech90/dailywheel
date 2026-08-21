/* ============================================================
   LogoMakerApp — Visual Brand Suite
   Multi-step wizard + generative composition + interactive canvas
   Integrated with BrandStateContext for 1-click state transfer
   ============================================================ */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Sparkles, Layers, ShieldCheck, Download, Palette, Wand2, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  LogoMakerState,
  LogoInputs,
  DesignPrefs,
  GeneratedLogo,
  PromptVariant,
  PRESET_PALETTES,
  Industry
} from '../../types/logoMaker';
import { buildPromptSet } from '../../engines/logoPromptBuilder';
import { generateLogos, checkRateLimit, recordGeneration } from '../../lib/logoApi';
import { useBrandState } from '../../context/BrandStateContext';
import { BrandInputStep } from './steps/BrandInputStep';
import { DesignPrefsStep } from './steps/DesignPrefsStep';
import { GenerateStep } from './steps/GenerateStep';
import { LogoEditor } from './LogoEditor';
import styles from './LogoMaker.module.css';

const DEFAULT_INPUTS: LogoInputs = {
  businessName: '',
  tagline: '',
  industry: 'technology',
  styleKeywords: ['modern', 'professional'],
  targetAudience: '',
  usageContexts: ['web'],
  selectedPalettes: ['corporate-blue'],
  selectedSymbols: ['lightning'],
};

const DEFAULT_PREFS: DesignPrefs = {
  primaryColor:   PRESET_PALETTES[0].primary,
  secondaryColor: PRESET_PALETTES[0].secondary,
  iconKeyword:    '',
  fontStyle:      'geometric',
  layout:         'horizontal',
  templateStyle:  'minimal',
  aspectRatio:    '1:1',
  letterSpacing:  0,
  iconScale:      1,
};

export const LogoMakerApp: React.FC = () => {
  const {
    activeBrandName,
    setActiveBrandName,
    activeTagline,
    setActiveTagline,
    activeIndustry,
    setActiveIndustry,
    saveLogo
  } = useBrandState();

  const [state, setState] = useState<LogoMakerState>({
    step: 1,
    inputs: {
      ...DEFAULT_INPUTS,
      businessName: activeBrandName || '',
      tagline: activeTagline || '',
      industry: activeIndustry || 'technology',
    },
    prefs: DEFAULT_PREFS,
    prompts: null,
    logos: [],
    selectedLogoId: null,
    isGenerating: false,
    generationError: null,
    showEditor: false,
    showPromptPreview: false,
    activeMockup: 'business-card',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LogoInputs, string>>>({});
  const [progressMsg, setProgressMsg] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  // Sync state if active brand changes from Name Generator bridge
  useEffect(() => {
    if (activeBrandName && activeBrandName !== state.inputs.businessName) {
      setState(s => ({
        ...s,
        inputs: {
          ...s.inputs,
          businessName: activeBrandName,
          tagline: activeTagline || s.inputs.tagline,
          industry: activeIndustry || s.inputs.industry,
        }
      }));
    }
  }, [activeBrandName, activeTagline, activeIndustry, state.inputs.businessName]);

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
    setState(s => ({ ...s, step: step as any }));
    scrollTop();
  };

  const handleStep1Next = () => {
    if (!validateStep1()) return;
    setActiveBrandName(state.inputs.businessName);
    setActiveTagline(state.inputs.tagline);
    setActiveIndustry(state.inputs.industry);
    goToStep(2);
  };

  const handleStep2Next = () => {
    goToStep(3);
    handleGenerate();
  };

  /* ── Generate ────────────────────────────────────────────────── */
  const handleGenerate = useCallback(async () => {
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

      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.75 },
          colors: [state.prefs.primaryColor, state.prefs.secondaryColor, '#10B981']
        });
      } catch {}
    } catch (err) {
      setState(s => ({
        ...s,
        isGenerating:   false,
        generationError: 'Logo generation failed. Please try again or adjust your design preferences.',
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
    saveLogo(updated);
    setState(s => ({
      ...s,
      logos: s.logos.map(l => l.id === updated.id ? updated : l),
      showEditor: false,
    }));
  };

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

  return (
    <div className={styles.logoMakerRoot} ref={topRef} id="logo-creator-suite">
      {/* Hero Header */}
      <div className={styles.heroSection}>
        <div className={styles.heroBadge}>
          <Sparkles size={14} /> AI Brand Identity Engine
        </div>
        <h1 className={styles.heroTitle}>
          Business Logo Creator Suite
        </h1>
        <p className={styles.heroSubtitle}>
          Transform your business name into complete vector brand packages, product mockups, and print-ready assets in seconds.
        </p>

        <div className={styles.heroFeatures}>
          <span className={styles.heroFeature}>
            <Layers size={14} /> 6+ Composition Archetypes
          </span>
          <span className={styles.heroFeature}>
            <Download size={14} /> Vector SVG &amp; Transparent PNG
          </span>
          <span className={styles.heroFeature}>
            <ShieldCheck size={14} /> 100% Commercial Ownership
          </span>
          <span className={styles.heroFeature}>
            <Palette size={14} /> Mockup Studio Previews
          </span>
        </div>
      </div>

      {/* Wizard Progress Indicator */}
      <div className={styles.wizardContainer}>
        <div className={styles.stepIndicator} aria-label="Wizard steps">
          {[
            { num: 1, label: 'Brand Info' },
            { num: 2, label: 'Design System' },
            { num: 3, label: 'Generate & Preview' },
          ].map((s, i) => (
            <div key={s.num} className={styles.stepIndicatorItem}>
              <div
                className={`${styles.stepDot} ${state.step === s.num ? styles.stepDotActive : ''} ${state.step > s.num ? styles.stepDotDone : ''}`}
                onClick={() => state.step > s.num && goToStep(s.num as any)}
                style={{ cursor: state.step > s.num ? 'pointer' : 'default' }}
              >
                {state.step > s.num ? '✓' : s.num}
              </div>
              <span className={`${styles.stepDotLabel} ${state.step === s.num ? styles.stepDotLabelActive : ''}`}>
                {s.label}
              </span>
              {i < 2 && (
                <div className={`${styles.stepConnector} ${state.step > s.num ? styles.stepConnectorDone : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Wizard Step Content */}
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

      {/* Interactive Logo Editor Overlay */}
      {state.showEditor && selectedLogo && (
        <LogoEditor
          logo={selectedLogo}
          inputs={state.inputs}
          onClose={() => setState(s => ({ ...s, showEditor: false }))}
          onSave={handleEditorSave}
        />
      )}
    </div>
  );
};

export default LogoMakerApp;
