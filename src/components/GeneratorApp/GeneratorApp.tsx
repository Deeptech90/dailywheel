'use client';

import { useReducer, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Static components
import { WheelCanvas } from '../WheelCanvas/WheelCanvas';
import { AntiGravityField } from '../AntiGravityField/AntiGravityField';
import { FloatingElements } from '../FloatingElements/FloatingElements';
import { QuestionPrompt } from '../QuestionPrompt/QuestionPrompt';
import { NavigationDrawer } from '../NavigationDrawer/NavigationDrawer';
import { Icon } from '../Icon/Icon';
import { WheelModeSelector } from '../WheelModeSelector/WheelModeSelector';
import { DailyChoicesInput } from '../DailyChoicesInput/DailyChoicesInput';

// Dynamic modules
const ResultModal = dynamic(() => import('../ResultModal/ResultModal').then(m => m.ResultModal), { ssr: false });
const EditPanel = dynamic(() => import('../EditPanel/EditPanel').then(m => m.EditPanel), { ssr: false });
const HistoryFeed = dynamic(() => import('../HistoryFeed/HistoryFeed').then(m => m.HistoryFeed), { ssr: false });
const InfoPanel = dynamic(() => import('../InfoPanel/InfoPanel').then(m => m.InfoPanel), { ssr: false });

// Hooks & utils
import { usePhysics } from '../../hooks/usePhysics';
import { useSound } from '../../hooks/useSound';
import { AppState, AppAction, Segment, WheelMode } from '../../types';
import {
  saveSegments,
  saveHistory,
  saveSoundEnabled,
  loadSegments,
  loadHistory,
  loadSoundEnabled
} from '../../utils/storage';
import { recolorSegments, DEFAULT_SEGMENTS } from '../../utils/colors';
import { logEvent } from '../../utils/analytics';

// Data
import { BUSINESS_CATEGORIES, BusinessCategory, getRandomSubset } from '../../data/businessNames';
import { ANIMALS } from '../../data/animalData';

import styles from './GeneratorApp.module.css';

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
      return {
        ...state,
        segments: action.segments,
        history: action.history,
        soundEnabled: action.soundEnabled,
      };
    case 'SPIN_START':
      return { ...state, isSpinning: true, showResult: false, showEdit: false, showHistory: false };
    case 'SPIN_END':
      return {
        ...state,
        isSpinning: false,
        showResult: true,
        currentResult: action.result,
        history: [
          ...state.history,
          { id: String(Date.now()), segment: action.result, timestamp: Date.now() },
        ],
      };
    case 'CLOSE_RESULT':
      return { ...state, showResult: false };
    case 'SET_SEGMENTS':
      return { ...state, segments: action.segments };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'TOGGLE_DIRECTION':
      return { ...state, spinDirection: state.spinDirection === 1 ? -1 : 1 };
    case 'TOGGLE_EDIT':
      return { ...state, showEdit: !state.showEdit, showHistory: false };
    case 'TOGGLE_HISTORY':
      return { ...state, showHistory: !state.showHistory, showEdit: false };
    case 'SET_MODE':
      return { ...state, wheelMode: action.mode, showResult: false, showEdit: false };
    default:
      return state;
  }
}

export function GeneratorApp() {
  const [state, dispatch] = useReducer(reducer, clientInitialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory>('restaurant');
  const [showInfo, setShowInfo] = useState(false);

  const { physicsCanvasRef, burst, activateAntiGravity, deactivateAntiGravity } = usePhysics({
    gravity: 0.3,
    damping: 0.75,
    airResistance: 0.98,
  });
  const { playTick, playWin } = useSound(state.soundEnabled);

  const wheelSectionRef = useRef<HTMLDivElement>(null);
  const wheelSpinTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const segments = loadSegments();
    const history = loadHistory();
    const soundEnabled = loadSoundEnabled();
    dispatch({ type: 'HYDRATE_STATE', segments, history, soundEnabled });
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) saveSegments(state.segments);
  }, [state.segments, isHydrated]);

  useEffect(() => {
    if (isHydrated) saveHistory(state.history);
  }, [state.history, isHydrated]);

  useEffect(() => {
    if (isHydrated) saveSoundEnabled(state.soundEnabled);
  }, [state.soundEnabled, isHydrated]);

  const handleModeChange = useCallback((mode: WheelMode) => {
    logEvent('mode_changed', { mode });
    dispatch({ type: 'SET_MODE', mode });

    // Auto-load animals if switching to animal mode
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

  const handleTick = useCallback(() => {
    playTick();
  }, [playTick]);

  const handleSaveSegments = useCallback((segments: Segment[]) => {
    dispatch({ type: 'SET_SEGMENTS', segments });
  }, []);

  // Mode 1: Business Names loader
  const handleLoadBusinessNames = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.isSpinning) return;

    logEvent('category_selected', { category: businessCategory });
    const catData = BUSINESS_CATEGORIES.find(c => c.id === businessCategory);
    if (!catData) return;

    // Grab 10 random names from the 20+ list
    const subset = getRandomSubset(catData.names, 10);
    const newSegments: Segment[] = subset.map((name, idx) => ({
      id: `bus-${Date.now()}-${idx}`,
      label: name,
      color: '', // Let recolorSegments assign palette colors
    }));

    const recolored = recolorSegments(newSegments);
    dispatch({ type: 'SET_SEGMENTS', segments: recolored });
  };

  // Mode 2: Daily Choices loader
  const handleLoadDailyChoices = useCallback((entries: string[]) => {
    if (state.isSpinning || entries.length < 2) return;
    const newSegments: Segment[] = entries.map((entry, idx) => ({
      id: `daily-${Date.now()}-${idx}`,
      label: entry,
      color: '',
    }));
    const recolored = recolorSegments(newSegments);
    dispatch({ type: 'SET_SEGMENTS', segments: recolored });
  }, [state.isSpinning]);

  return (
    <div className={styles.app}>
      <AntiGravityField isSpinning={state.isSpinning} />

      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon} role="img" aria-label="Logo spin">🌀</span>
          <span className={styles.logoText}>UniqueBusinessName</span>
        </Link>
        <div className={styles.headerActions}>
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
            aria-label="About anti-gravity engine"
            title="How it works"
          >
            <Icon name="info" size={20} />
          </button>
          
          <NavigationDrawer />
        </div>
      </header>

      <main className={styles.main}>
        {/* NEW: Wheel Mode Selector */}
        <section style={{ width: '100%', maxWidth: '900px', marginBottom: '1rem', zIndex: 10 }}>
          <WheelModeSelector
            activeMode={state.wheelMode}
            onModeChange={handleModeChange}
            disabled={state.isSpinning}
          />
        </section>

        {/* Dynamic Mode-Specific Input Panel */}
        <section className={styles.generatorSection}>
          
          {/* BUSINESS MODE */}
          {state.wheelMode === 'business' && (
            <div className={styles.modePanel}>
              <h1 className={styles.formTitle}>Business Name Generator</h1>
              <p className={styles.formSubtitle}>Select your industry and let the wheel decide.</p>
              <form onSubmit={handleLoadBusinessNames} className={styles.inputGroup}>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.selectField}
                    value={businessCategory}
                    onChange={e => setBusinessCategory(e.target.value as BusinessCategory)}
                    disabled={state.isSpinning}
                    aria-label="Business Category"
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
                >
                  <Icon name="spin" size={20} /> Load Names
                </button>
              </form>
            </div>
          )}

          {/* DAILY CHOICES MODE */}
          {state.wheelMode === 'daily' && (
            <div className={styles.modePanel}>
              <h1 className={styles.formTitle}>Daily Choices</h1>
              <p className={styles.formSubtitle}>Enter your options below and let the wheel choose.</p>
              <DailyChoicesInput
                onLoadWheel={handleLoadDailyChoices}
                disabled={state.isSpinning}
              />
            </div>
          )}

          {/* ANIMAL MODE */}
          {state.wheelMode === 'animal' && (
            <div className={styles.modePanel}>
              <h1 className={styles.formTitle}>Spirit Animal Wheel</h1>
              <p className={styles.formSubtitle}>Find out which animal represents your personality today!</p>
              <button
                className={styles.submitBtn}
                onClick={() => wheelSpinTriggerRef.current?.()}
                disabled={state.isSpinning}
              >
                <Icon name="spin" size={20} /> Spin Now
              </button>
            </div>
          )}

        </section>

        <QuestionPrompt isSpinning={state.isSpinning} />

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

        <div className={styles.controls}>
          <p className={styles.hint} aria-live="polite">
            {state.isSpinning
              ? '🌀 The universe is deciding…'
              : '👆 Tap the center hub or swipe the wheel to spin!'}
          </p>

          <div className={styles.secondaryBtns}>
            <button
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
              disabled={state.isSpinning || state.wheelMode === 'animal'}
              aria-label="Edit wheel options manually"
              style={{ display: state.wheelMode === 'animal' ? 'none' : 'inline-flex' }}
            >
              <Icon name="edit" size={16} /> Edit Segments
            </button>
            
            <button
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_HISTORY' })}
              aria-label="View selection history"
            >
              <Icon name="history" size={16} /> History
              {state.history.length > 0 && (
                <span className={styles.badge}>{Math.min(state.history.length, 99)}</span>
              )}
            </button>
          </div>
        </div>

      </main>

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

      {showInfo && (
        <InfoPanel onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
}

export default GeneratorApp;
