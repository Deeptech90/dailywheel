import { useReducer, useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from '../Link/Link';

// Components
import { WheelCanvas } from '../WheelCanvas/WheelCanvas';
import { AntiGravityField } from '../AntiGravityField/AntiGravityField';
import { FloatingElements } from '../FloatingElements/FloatingElements';
import { Icon } from '../Icon/Icon';
import { WheelModeSelector } from '../WheelModeSelector/WheelModeSelector';
import { DailyChoicesInput } from '../DailyChoicesInput/DailyChoicesInput';
import { LandingHero } from '../LandingHero/LandingHero';

// Lazy-loaded Components
const ResultModal = lazy(() => import('../ResultModal/ResultModal').then(module => ({ default: module.ResultModal })));
const EditPanel = lazy(() => import('../EditPanel/EditPanel').then(module => ({ default: module.EditPanel })));
const HistoryFeed = lazy(() => import('../HistoryFeed/HistoryFeed').then(module => ({ default: module.HistoryFeed })));
const InfoPanel = lazy(() => import('../InfoPanel/InfoPanel').then(module => ({ default: module.InfoPanel })));

// Hooks & utils
import { usePhysics } from '../../hooks/usePhysics';
import { useSound } from '../../hooks/useSound';
import { useCloudSync } from '../../hooks/useCloudSync';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { useFavorites } from '../../hooks/useFavorites';
import { AppState, AppAction, Segment, WheelMode } from '../../types';
import {
  saveSegments, saveHistory, saveSoundEnabled,
  loadSegments, loadHistory, loadSoundEnabled,
} from '../../utils/storage';
import { recolorSegments, DEFAULT_SEGMENTS } from '../../utils/colors';
import { logEvent } from '../../utils/analytics';
import { useSubscription } from '../../hooks/useSubscription';

// Data
import { BUSINESS_CATEGORIES, BusinessCategory, getRandomSubset } from '../../data/businessNames';
import { ANIMALS } from '../../data/animalData';

import styles from './GeneratorApp.module.css';

/* ── Loading messages ────────────────────────────────────── */
const LOADING_MSGS = [
  'Finding Creative Ideas…',
  'Checking Availability…',
  'Generating Brand Identity…',
  'Consulting AI…',
  'Almost Ready…',
];

function useLoadingMessage(isSpinning: boolean) {
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    if (!isSpinning) { setMsgIdx(0); return; }
    const id = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 800);
    return () => clearInterval(id);
  }, [isSpinning]);
  return LOADING_MSGS[msgIdx];
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
    case 'HYDRATE':
      return { ...state, ...action.payload };
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
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
  const { hasReachedGenerationLimit, showAds } = useSubscription();
  const [isHydrated, setIsHydrated] = useState(false);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory>('restaurant');
  const [showInfo, setShowInfo] = useState(false);
  const [namesLoaded, setNamesLoaded] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const loadingMsg = useLoadingMessage(state.isSpinning);

  const { physicsCanvasRef, burst, activateAntiGravity, deactivateAntiGravity } = usePhysics({
    gravity: 0.3, damping: 0.75, airResistance: 0.98,
  });
  const { playTick, playWin } = useSound(state.soundEnabled);

  const wheelSectionRef = useRef<HTMLDivElement>(null);
  const generatorRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const wheelSpinTriggerRef = useRef<(() => void) | null>(null);

  // Hydrate from localStorage
  const { syncToCloud, fetchFromCloud } = useCloudSync();
  const { user, isGuest, loading: authLoading } = useAuth();

  useEffect(() => {
    // 1. Initial local load
    const loadedSegments = loadSegments();
    const loadedHistory = loadHistory();
    const loadedSound = loadSoundEnabled();
    const modeStr = localStorage.getItem('ubn_wheel_mode') as 'business' | 'daily' | 'animal' | null;
    
    dispatch({ type: 'HYDRATE', payload: {
      segments: loadedSegments,
      history: loadedHistory,
      soundEnabled: loadedSound,
      wheelMode: modeStr || 'business'
    }});
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // 2. Cloud merge for history
    if (!authLoading && user && !isGuest) {
      fetchFromCloud('history').then(cloudHistory => {
        if (cloudHistory && Array.isArray(cloudHistory)) {
          dispatch({ type: 'SET_HISTORY', payload: cloudHistory });
        }
      });
    }
  }, [user, isGuest, authLoading, fetchFromCloud]);

  // Sync to local and cloud on changes
  useEffect(() => { if (isHydrated) saveSegments(state.segments); }, [state.segments, isHydrated]);
  useEffect(() => { 
    if (isHydrated) {
      saveHistory(state.history); 
      syncToCloud('history', state.history);
    }
  }, [state.history, isHydrated, syncToCloud]);
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

  /* ── Navigation helpers ─────────────────────────────────── */
  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Mode / spin handlers ───────────────────────────────── */
  const handleModeChange = useCallback((mode: WheelMode) => {
    logEvent('mode_changed', { mode });
    dispatch({ type: 'SET_MODE', mode });
    setNamesLoaded(false);
    if (mode === 'animal') {
      const animalSegments: Segment[] = ANIMALS.map((a, idx) => ({
        id: `anim-${idx}`, label: a.name, color: a.color, icon: a.icon, trait: a.trait,
      }));
      dispatch({ type: 'SET_SEGMENTS', segments: animalSegments });
      setNamesLoaded(true);
    }
  }, []);

  const handleSpinStart = useCallback(() => {
    if (state.wheelMode === 'business' && hasReachedGenerationLimit()) {
      window.location.href = '/pricing';
      return;
    }
    logEvent('spin_started', { mode: state.wheelMode });
    dispatch({ type: 'SPIN_START' });
    activateAntiGravity();
  }, [activateAntiGravity, state.wheelMode, hasReachedGenerationLimit]);

  const handleSpinEnd = useCallback((winner: Segment) => {
    logEvent('spin_completed', { mode: state.wheelMode, winnerLabel: winner.label });
    const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
    }
    playWin();
    deactivateAntiGravity();
    // Haptic feedback
    if ('vibrate' in navigator) navigator.vibrate([40, 30, 80]);
    setTimeout(() => dispatch({ type: 'SPIN_END', result: winner }), 600);
  }, [burst, playWin, deactivateAntiGravity, state.wheelMode]);

  const handleTick = useCallback(() => { playTick(); }, [playTick]);

  const handleSaveSegments = useCallback((segments: Segment[]) => {
    dispatch({ type: 'SET_SEGMENTS', segments });
  }, []);

  const handleCategorySelect = (cat: BusinessCategory) => {
    setBusinessCategory(cat);
    setNamesLoaded(false);
  };

  const handleLoadBusinessNames = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (state.isSpinning) return;
    logEvent('category_selected', { category: businessCategory });
    const catData = BUSINESS_CATEGORIES.find(c => c.id === businessCategory);
    if (!catData) return;
    const subset = getRandomSubset(catData.names, 10);
    const newSegments: Segment[] = subset.map((name, idx) => ({
      id: `bus-${Date.now()}-${idx}`, label: name, color: '',
    }));
    dispatch({ type: 'SET_SEGMENTS', segments: recolorSegments(newSegments) });
    setNamesLoaded(true);
    // Auto-scroll to wheel on mobile
    setTimeout(() => wheelSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  };

  const handleLoadDailyChoices = useCallback((entries: string[]) => {
    if (state.isSpinning || entries.length < 2) return;
    const newSegments: Segment[] = entries.map((entry, idx) => ({
      id: `daily-${Date.now()}-${idx}`, label: entry, color: '',
    }));
    dispatch({ type: 'SET_SEGMENTS', segments: recolorSegments(newSegments) });
    setNamesLoaded(true);
  }, [state.isSpinning]);

  const handleSpinAgain = useCallback(() => {
    dispatch({ type: 'CLOSE_RESULT' });
    setTimeout(() => wheelSpinTriggerRef.current?.(), 300);
  }, []);

  const selectedCategoryLabel = BUSINESS_CATEGORIES.find(c => c.id === businessCategory)?.label ?? businessCategory;

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className={styles.app}>
      <AntiGravityField isSpinning={state.isSpinning} />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIconWrap} role="img" aria-label="Logo">🌀</div>
          <span className={styles.logoText}>
            UniqueBusinessName<span className={styles.logoDot}>.</span>com
          </span>
        </Link>

        <div className={styles.headerActions}>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="/"        className={styles.desktopNavLink}>Generator</Link>
            <Link href="/about"   className={styles.desktopNavLink}>About</Link>
            <Link href="/contact" className={styles.desktopNavLink}>Contact</Link>
          </nav>

          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
          </button>

            <button
              className={`${styles.iconBtn} ${!state.soundEnabled ? styles.iconBtnActive : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
              aria-label={state.soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              <Icon name={state.soundEnabled ? 'volume-on' : 'volume-off'} size={20} />
            </button>
          </div>
        </header>

      <section className={styles.heroSection} aria-label="Introduction">
        <LandingHero />
      </section>

      {/* ── Generator Section ────────────────────────────── */}
      <main className={styles.main} ref={generatorRef} id="generator">

        {/* Mode Selector */}
        <section className={styles.modeSelectorWrap} aria-label="Choose mode">
          <WheelModeSelector
            activeMode={state.wheelMode}
            onModeChange={handleModeChange}
            disabled={state.isSpinning}
          />
        </section>

        {/* Category Dropdown (business mode only) */}
        {state.wheelMode === 'business' && (
          <section className={styles.generatorSectionCategory} ref={categoriesRef} aria-label="Business categories">
            <label htmlFor="category-select" className={styles.formTitle}>Select Category</label>
            <div className={styles.selectWrapper}>
              <select
                id="category-select"
                className={styles.selectField}
                value={businessCategory}
                onChange={(e) => {
                  handleCategorySelect(e.target.value as BusinessCategory);
                  setNamesLoaded(false);
                }}
                disabled={state.isSpinning}
              >
                {BUSINESS_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <Icon name="chevron-down" size={16} />
              </div>
            </div>
            
            {!namesLoaded && (
              <button
                className={styles.secondaryBtn}
                style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
                onClick={handleLoadBusinessNames}
                disabled={state.isSpinning}
              >
                Load {selectedCategoryLabel} Names
              </button>
            )}
          </section>
        )}

        {/* Daily Choices */}
        {state.wheelMode === 'daily' && (
          <section className={styles.generatorSection} aria-label="Daily choices input">
            <h2 className={styles.formTitle}>Daily Choices</h2>
            <p className={styles.formSubtitle}>Enter your options — let the wheel decide for you.</p>
            <DailyChoicesInput onLoadWheel={handleLoadDailyChoices} disabled={state.isSpinning} />
          </section>
        )}

        {/* Animal Mode */}
        {state.wheelMode === 'animal' && (
          <section className={styles.generatorSection} aria-label="Spirit animal">
            <h2 className={styles.formTitle}>🐾 Spirit Animal Wheel</h2>
            <p className={styles.formSubtitle}>Discover which animal represents your personality today!</p>
          </section>
        )}

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
          <FloatingElements isSpinning={state.isSpinning} centerRef={wheelSectionRef} />
        </div>

        {/* Massive Spin Button */}
        <button
          className={styles.spinBtn}
          onClick={() => {
            if (!namesLoaded && state.wheelMode === 'business') {
              handleLoadBusinessNames();
            } else {
              wheelSpinTriggerRef.current?.();
            }
          }}
          disabled={state.isSpinning || (state.wheelMode === 'daily' && !namesLoaded)}
          id="main-spin-btn"
        >
          {state.isSpinning ? (
            <><span className={styles.spinnerIcon}>🌀</span> Spinning...</>
          ) : (
            'SPIN THE WHEEL'
          )}
        </button>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.secondaryBtns}>
            {state.wheelMode !== 'animal' && (
              <button
                className={styles.secondaryBtn}
                onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
                disabled={state.isSpinning}
                aria-label="Edit wheel segments"
                id="edit-segments-btn"
              >
                <Icon name="edit" size={15} /> Edit
              </button>
            )}
            <button
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_DIRECTION' })}
              disabled={state.isSpinning}
              aria-label="Toggle spin direction"
            >
              <Icon name="direction" size={15} />
              {state.spinDirection === 1 ? '↻ CW' : '↺ CCW'}
            </button>
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

      {/* ── Overlays ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        {state.showResult && (
          <ResultModal
            segment={state.currentResult}
            mode={state.wheelMode}
            category={state.wheelMode === 'business' ? selectedCategoryLabel : undefined}
            onClose={() => dispatch({ type: 'CLOSE_RESULT' })}
            onSpinAgain={handleSpinAgain}
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
      </Suspense>
    </div>
  );
}

export default GeneratorApp;
