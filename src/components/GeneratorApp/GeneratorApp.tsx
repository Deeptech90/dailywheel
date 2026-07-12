import { useReducer, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '../Link/Link';

// Static components
import { WheelCanvas } from '../WheelCanvas/WheelCanvas';
import { AntiGravityField } from '../AntiGravityField/AntiGravityField';
import { FloatingElements } from '../FloatingElements/FloatingElements';
import { QuestionPrompt } from '../QuestionPrompt/QuestionPrompt';
import { NavigationDrawer } from '../NavigationDrawer/NavigationDrawer';
import { Icon } from '../Icon/Icon';
import { WheelModeSelector } from '../WheelModeSelector/WheelModeSelector';
import { DailyChoicesInput } from '../DailyChoicesInput/DailyChoicesInput';
import { ResultModal } from '../ResultModal/ResultModal';
import { EditPanel } from '../EditPanel/EditPanel';
import { HistoryFeed } from '../HistoryFeed/HistoryFeed';
import { InfoPanel } from '../InfoPanel/InfoPanel';

// Hooks & utils
import { usePhysics } from '../../hooks/usePhysics';
import { useSound } from '../../hooks/useSound';
import { useTheme } from '../../hooks/useTheme';
import { AppState, AppAction, Segment, WheelMode } from '../../types';
import {
  saveSegments, saveHistory, saveSoundEnabled,
  loadSegments, loadHistory, loadSoundEnabled
} from '../../utils/storage';
import { recolorSegments, DEFAULT_SEGMENTS } from '../../utils/colors';
import { logEvent } from '../../utils/analytics';

// Data
import { BUSINESS_CATEGORIES, BusinessCategory, getRandomSubset } from '../../data/businessNames';
import { ANIMALS } from '../../data/animalData';

import styles from './GeneratorApp.module.css';

/* ── Typewriter strings for the hero subtitle ─────────────── */
const TYPEWRITER_PHRASES = [
  'business names',
  'lunch options',
  'team decisions',
  'your spirit animal',
  'weekend plans',
  'startup ideas',
  'daily choices',
];

function useTypewriter(phrases: string[], speed = 80, pause = 2200) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      setText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i + 1), speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      setText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
    } else {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      timeout = setTimeout(() => setCharIdx(0), 100);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}

/* ── State ───────────────────────────────────────────────── */
const clientInitialState: AppState = {
  segments: DEFAULT_SEGMENTS,
  history: [],
  isSpinning: false,
  soundEnabled: true,
  spinDirection: 1,
  showResult: false,
  currentResult: null,
  showEdit: false,
  showHistory: false,
  wheelMode: 'business',
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'HYDRATE_STATE':
      return { ...state, segments: action.segments, history: action.history, soundEnabled: action.soundEnabled };
    case 'SPIN_START':
      return { ...state, isSpinning: true, showResult: false, showEdit: false, showHistory: false };
    case 'SPIN_END':
      return {
        ...state,
        isSpinning: false,
        showResult: true,
        currentResult: action.result,
        history: [...state.history, { id: String(Date.now()), segment: action.result, timestamp: Date.now() }],
      };
    case 'CLOSE_RESULT':  return { ...state, showResult: false };
    case 'SET_SEGMENTS':  return { ...state, segments: action.segments };
    case 'TOGGLE_SOUND':  return { ...state, soundEnabled: !state.soundEnabled };
    case 'TOGGLE_DIRECTION': return { ...state, spinDirection: state.spinDirection === 1 ? -1 : 1 };
    case 'TOGGLE_EDIT':   return { ...state, showEdit: !state.showEdit, showHistory: false };
    case 'TOGGLE_HISTORY':return { ...state, showHistory: !state.showHistory, showEdit: false };
    case 'SET_MODE':      return { ...state, wheelMode: action.mode, showResult: false, showEdit: false };
    default:              return state;
  }
}

/* ── Component ───────────────────────────────────────────── */
export function GeneratorApp() {
  const [state, dispatch] = useReducer(reducer, clientInitialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory>('restaurant');
  const [showInfo, setShowInfo] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const typewriterText = useTypewriter(TYPEWRITER_PHRASES);

  const { physicsCanvasRef, burst, activateAntiGravity, deactivateAntiGravity } = usePhysics({
    gravity: 0.3,
    damping: 0.75,
    airResistance: 0.98,
  });
  const { playTick, playWin } = useSound(state.soundEnabled);

  const wheelSectionRef = useRef<HTMLDivElement>(null);
  const wheelSpinTriggerRef = useRef<(() => void) | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const segments = loadSegments();
    const history  = loadHistory();
    const soundEnabled = loadSoundEnabled();
    dispatch({ type: 'HYDRATE_STATE', segments, history, soundEnabled });
    setIsHydrated(true);
  }, []);

  useEffect(() => { if (isHydrated) saveSegments(state.segments); }, [state.segments, isHydrated]);
  useEffect(() => { if (isHydrated) saveHistory(state.history); }, [state.history, isHydrated]);
  useEffect(() => { if (isHydrated) saveSoundEnabled(state.soundEnabled); }, [state.soundEnabled, isHydrated]);

  // Space bar shortcut to spin
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA' &&
          !state.isSpinning) {
        e.preventDefault();
        wheelSpinTriggerRef.current?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.isSpinning]);

  const handleModeChange = useCallback((mode: WheelMode) => {
    logEvent('mode_changed', { mode });
    dispatch({ type: 'SET_MODE', mode });
    if (mode === 'animal') {
      const animalSegments: Segment[] = ANIMALS.map((a, idx) => ({
        id: `anim-${idx}`,
        label: a.name,
        color: a.color,
        icon: a.icon,
        trait: a.trait,
      }));
      dispatch({ type: 'SET_SEGMENTS', segments: animalSegments });
    }
  }, []);

  const handleSpinStart = useCallback(() => {
    logEvent('spin_started', { mode: state.wheelMode });
    dispatch({ type: 'SPIN_START' });
    activateAntiGravity();
  }, [activateAntiGravity, state.wheelMode]);

  const handleSpinEnd = useCallback((winner: Segment) => {
    logEvent('spin_completed', { mode: state.wheelMode, winnerLabel: winner.label });
    const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
    }
    playWin();
    deactivateAntiGravity();
    setTimeout(() => dispatch({ type: 'SPIN_END', result: winner }), 600);
  }, [burst, playWin, deactivateAntiGravity, state.wheelMode]);

  const handleTick = useCallback(() => { playTick(); }, [playTick]);
  const handleSaveSegments = useCallback((segments: Segment[]) => {
    dispatch({ type: 'SET_SEGMENTS', segments });
  }, []);

  const handleLoadBusinessNames = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.isSpinning) return;
    logEvent('category_selected', { category: businessCategory });
    const catData = BUSINESS_CATEGORIES.find(c => c.id === businessCategory);
    if (!catData) return;
    const subset = getRandomSubset(catData.names, 10);
    const newSegments: Segment[] = subset.map((name, idx) => ({
      id: `bus-${Date.now()}-${idx}`,
      label: name,
      color: '',
    }));
    dispatch({ type: 'SET_SEGMENTS', segments: recolorSegments(newSegments) });
  };

  const handleLoadDailyChoices = useCallback((entries: string[]) => {
    if (state.isSpinning || entries.length < 2) return;
    const newSegments: Segment[] = entries.map((entry, idx) => ({
      id: `daily-${Date.now()}-${idx}`,
      label: entry,
      color: '',
    }));
    dispatch({ type: 'SET_SEGMENTS', segments: recolorSegments(newSegments) });
  }, [state.isSpinning]);

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className={styles.app}>
      <AntiGravityField isSpinning={state.isSpinning} />

      {/* ── Header ── */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIconWrap} role="img" aria-label="Anti-gravity wheel logo">🌀</div>
          <span className={styles.logoText}>
            UniqueBusinessName<span className={styles.logoDot}>.</span>com
          </span>
        </Link>

        <div className={styles.headerActions}>
          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="/"        className={styles.desktopNavLink}>Generator</Link>
            <Link href="/about"   className={styles.desktopNavLink}>About</Link>
            <Link href="/contact" className={styles.desktopNavLink}>Contact</Link>
          </nav>

          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
          </button>

          <button
            className={`${styles.iconBtn} ${!state.soundEnabled ? styles.iconBtnActive : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            aria-label={state.soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={state.soundEnabled ? 'Sound on' : 'Sound off'}
          >
            <Icon name={state.soundEnabled ? 'volume-on' : 'volume-off'} size={20} />
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => dispatch({ type: 'TOGGLE_DIRECTION' })}
            aria-label={state.spinDirection === 1 ? 'Switch to counterclockwise' : 'Switch to clockwise'}
            title={state.spinDirection === 1 ? '↻ Clockwise' : '↺ Counter-CW'}
            disabled={state.isSpinning}
          >
            <Icon name="direction" size={20} />
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => setShowInfo(true)}
            aria-label="How it works"
            title="How it works"
          >
            <Icon name="info" size={20} />
          </button>

          <NavigationDrawer />
        </div>
      </header>

      {/* ── Main ── */}
      <main className={styles.main}>

        {/* Hero */}
        <section className={styles.heroSection} aria-label="Hero">
          <h1 className={styles.heroTitle}>Spin. Decide. Done.</h1>
          <p className={styles.heroSubtitle}>
            <span className={styles.heroSubtitleStatic}>The physics-driven wheel for </span>
            <span className={styles.typewriterText}>{typewriterText}</span>
            <span className={styles.typewriterCursor} aria-hidden="true" />
          </p>
        </section>

        {/* Mode Selector */}
        <section className={styles.modeSelectorWrap}>
          <WheelModeSelector
            activeMode={state.wheelMode}
            onModeChange={handleModeChange}
            disabled={state.isSpinning}
          />
        </section>

        {/* Dynamic Mode Input Panel */}
        <section className={styles.generatorSection}>

          {/* BUSINESS MODE */}
          {state.wheelMode === 'business' && (
            <div className={styles.modePanel}>
              <h2 className={styles.formTitle}>Business Name Generator</h2>
              <p className={styles.formSubtitle}>Choose your industry — the wheel loads 10 premium brandable names.</p>
              <form onSubmit={handleLoadBusinessNames} className={styles.inputGroup}>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.selectField}
                    value={businessCategory}
                    onChange={e => setBusinessCategory(e.target.value as BusinessCategory)}
                    disabled={state.isSpinning}
                    aria-label="Business Category"
                    id="business-category-select"
                  >
                    {BUSINESS_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectIcon}>
                    <Icon name="chevron-down" size={16} />
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={state.isSpinning}
                  id="load-names-btn"
                >
                  <Icon name="spin" size={18} /> Load Names &amp; Spin
                </button>
              </form>
            </div>
          )}

          {/* DAILY CHOICES MODE */}
          {state.wheelMode === 'daily' && (
            <div className={styles.modePanel}>
              <h2 className={styles.formTitle}>Daily Choices</h2>
              <p className={styles.formSubtitle}>Enter your options — let the wheel decide for you.</p>
              <DailyChoicesInput
                onLoadWheel={handleLoadDailyChoices}
                disabled={state.isSpinning}
              />
            </div>
          )}

          {/* ANIMAL MODE */}
          {state.wheelMode === 'animal' && (
            <div className={styles.modePanel}>
              <h2 className={styles.formTitle}>Spirit Animal Wheel</h2>
              <p className={styles.formSubtitle}>Discover which animal represents your personality today!</p>
              <button
                className={styles.submitBtn}
                onClick={() => wheelSpinTriggerRef.current?.()}
                disabled={state.isSpinning}
                id="spin-animal-btn"
              >
                <Icon name="spin" size={18} /> Reveal My Spirit Animal
              </button>
            </div>
          )}
        </section>

        <QuestionPrompt isSpinning={state.isSpinning} />

        {/* Wheel */}
        <div className={styles.wheelSection} ref={wheelSectionRef}>
          <WheelCanvas
            segments={state.segments}
            isSpinning={state.isSpinning}
            direction={state.spinDirection}
            onSpinStart={handleSpinStart}
            onSpinEnd={handleSpinEnd}
            onTick={handleTick}
            physicsCanvasRef={physicsCanvasRef}
            spinRef={wheelSpinTriggerRef}
          />
          <FloatingElements
            isSpinning={state.isSpinning}
            centerRef={wheelSectionRef}
          />
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <p className={styles.hint} aria-live="polite">
            {state.isSpinning
              ? '🌀 The universe is deciding…'
              : '👆 Tap the hub, swipe the wheel, or press Space to spin!'}
          </p>

          <div className={styles.secondaryBtns}>
            {state.wheelMode !== 'animal' && (
              <button
                className={styles.secondaryBtn}
                onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
                disabled={state.isSpinning}
                aria-label="Edit wheel segments"
                id="edit-segments-btn"
              >
                <Icon name="edit" size={15} /> Edit Segments
              </button>
            )}

            <button
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_HISTORY' })}
              aria-label="View spin history"
              id="view-history-btn"
            >
              <Icon name="history" size={15} /> History
              {state.history.length > 0 && (
                <span className={styles.badge}>{Math.min(state.history.length, 99)}</span>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* ── Overlays ── */}
      {state.showResult && (
        <ResultModal
          segment={state.currentResult}
          mode={state.wheelMode}
          onClose={() => dispatch({ type: 'CLOSE_RESULT' })}
        />
      )}

      {state.showEdit && (
        <EditPanel
          segments={state.segments}
          onSave={handleSaveSegments}
          onClose={() => dispatch({ type: 'TOGGLE_EDIT' })}
        />
      )}

      {state.showHistory && (
        <HistoryFeed
          history={state.history}
          onClose={() => dispatch({ type: 'TOGGLE_HISTORY' })}
        />
      )}

      {showInfo && <InfoPanel onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default GeneratorApp;
