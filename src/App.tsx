import { useReducer, useCallback, useEffect, useRef, useState } from 'react';
import { WheelCanvas } from './components/WheelCanvas/WheelCanvas';
import { ResultModal } from './components/ResultModal/ResultModal';
import { EditPanel } from './components/EditPanel/EditPanel';
import { HistoryFeed } from './components/HistoryFeed/HistoryFeed';
import { AntiGravityField } from './components/AntiGravityField/AntiGravityField';
import { FloatingElements } from './components/FloatingElements/FloatingElements';
import { QuestionPrompt } from './components/QuestionPrompt/QuestionPrompt';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { usePhysics } from './hooks/usePhysics';
import { useSound } from './hooks/useSound';
import { AppState, AppAction, Segment } from './types';
import {
  loadSegments, saveSegments,
  loadHistory, saveHistory,
  loadSoundEnabled, saveSoundEnabled,
} from './utils/storage';
import { recolorSegments } from './utils/colors';
import { capitalizeLabel, validateLabel } from './utils/labels';
import styles from './App.module.css';

const initialState: AppState = {
  segments: loadSegments(),
  history: loadHistory(),
  isSpinning: false,
  soundEnabled: loadSoundEnabled(),
  spinDirection: 1,
  showResult: false,
  currentResult: null,
  showEdit: false,
  showHistory: false,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { physicsCanvasRef, burst, activateAntiGravity, deactivateAntiGravity } = usePhysics({
    gravity: 0.3,
    damping: 0.75,
    airResistance: 0.98,
  });
  const { playTick, playWin } = useSound(state.soundEnabled);

  // Ref to the wheel section div — used by FloatingElements for orbital positioning
  const wheelSectionRef = useRef<HTMLDivElement>(null);

  // Info panel (Section 7 — comparative analysis + how-to)
  const [showInfo, setShowInfo] = useState(false);

  // Quick-add input on the main screen
  const [quickAdd, setQuickAdd] = useState('');

  // Persist whenever segments or history changes
  useEffect(() => { saveSegments(state.segments); }, [state.segments]);
  useEffect(() => { saveHistory(state.history); }, [state.history]);
  useEffect(() => { saveSoundEnabled(state.soundEnabled); }, [state.soundEnabled]);

  const handleSpinStart = useCallback(() => {
    dispatch({ type: 'SPIN_START' });
    activateAntiGravity();
  }, [activateAntiGravity]);


  const handleSpinEnd = useCallback((winner: Segment) => {
    // Trigger particle burst at wheel center
    const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
    }
    playWin();
    deactivateAntiGravity();
    // Small delay so particles are visible before modal appears
    setTimeout(() => dispatch({ type: 'SPIN_END', result: winner }), 600);
  }, [burst, playWin, deactivateAntiGravity]);

  const handleTick = useCallback(() => {
    playTick();
  }, [playTick]);

  const handleSaveSegments = useCallback((segments: Segment[]) => {
    dispatch({ type: 'SET_SEGMENTS', segments });
  }, []);

  const handleQuickAdd = () => {
    const error = validateLabel(quickAdd, state.segments.map(s => s.label));
    if (error || state.segments.length >= 20) return;
    const capitalized = capitalizeLabel(quickAdd);
    const updated = recolorSegments([
      ...state.segments,
      { id: String(Date.now()), label: capitalized, color: '' },
    ]);
    dispatch({ type: 'SET_SEGMENTS', segments: updated });
    setQuickAdd('');
  };

  return (
    <div className={styles.app}>
      {/* Background anti-gravity orbs */}
      <AntiGravityField isSpinning={state.isSpinning} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌀</span>
          <span className={styles.logoText}>DailySpin</span>
        </div>
        <div className={styles.headerActions}>
          {/* Direction toggle */}
          <button
            id="direction-toggle"
            className={`${styles.iconBtn} ${state.spinDirection === -1 ? styles.active : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_DIRECTION' })}
            aria-label={state.spinDirection === 1 ? 'Switch to counterclockwise' : 'Switch to clockwise'}
            title={state.spinDirection === 1 ? '↻ Clockwise' : '↺ Counter-CW'}
            disabled={state.isSpinning}
          >
            {state.spinDirection === 1 ? '↻' : '↺'}
          </button>
          {/* Info button */}
          <button
            id="info-btn"
            className={styles.iconBtn}
            onClick={() => setShowInfo(true)}
            aria-label="About DailySpin"
            title="About & How it works"
          >
            ℹ
          </button>
          {/* Sound toggle */}
          <button
            id="sound-toggle"
            className={styles.iconBtn}
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            aria-label={state.soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={state.soundEnabled ? 'Sound on' : 'Sound off'}
          >
            {state.soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* Top ad zone */}
      <div id="ad-top" className={styles.adZone} aria-label="Advertisement">
        <span className={styles.adLabel}>Advertisement</span>
      </div>

      {/* Main content */}
      <main className={styles.main}>
        {/* Hero text */}
        <div className={`${styles.heroText} ${state.isSpinning ? styles.heroFloating : ''}`}>
          <h1 className={styles.headline}>
            What will you do <span className={styles.highlight}>today?</span>
          </h1>
          <p className={styles.subheadline}>
            Spin the wheel · Let the universe decide ✨
          </p>
        </div>

        {/* Daily question/prompt context panel (Section 6.1) */}
        <QuestionPrompt isSpinning={state.isSpinning} />

        {/* Quick-add input panel */}
        <div className={`${styles.quickAdd} ${state.isSpinning ? styles.quickAddHidden : ''}`}>
          <input
            id="quick-add-input"
            type="text"
            placeholder="Quick-add an option…"
            value={quickAdd}
            onChange={e => setQuickAdd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            maxLength={40}
            className={styles.quickAddInput}
            disabled={state.isSpinning}
          />
          <button
            id="quick-add-btn"
            className={styles.quickAddBtn}
            onClick={handleQuickAdd}
            disabled={!quickAdd.trim() || state.segments.length >= 20 || state.isSpinning}
          >
            + Add
          </button>
        </div>

        {/* Spinning Wheel */}
        <div className={styles.wheelSection} ref={wheelSectionRef}>
          <WheelCanvas
            segments={state.segments}
            isSpinning={state.isSpinning}
            direction={state.spinDirection}
            onSpinStart={handleSpinStart}
            onSpinEnd={handleSpinEnd}
            onTick={handleTick}
            physicsCanvasRef={physicsCanvasRef}
          />
          {/* Orbital decorative icons with anti-gravity physics */}
          <FloatingElements
            isSpinning={state.isSpinning}
            centerRef={wheelSectionRef}
          />
        </div>

        {/* Controls */}
        <div className={`${styles.controls} ${state.isSpinning ? styles.controlsFloating : ''}`}>
          <div className={styles.secondaryBtns}>
            <button
              id="edit-btn"
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
              disabled={state.isSpinning}
              aria-label="Edit wheel options"
            >
              ✏️ Edit
            </button>
            <button
              id="history-btn"
              className={styles.secondaryBtn}
              onClick={() => dispatch({ type: 'TOGGLE_HISTORY' })}
              aria-label="View spin history"
            >
              🕐 History
              {state.history.length > 0 && (
                <span className={styles.badge}>{Math.min(state.history.length, 99)}</span>
              )}
            </button>
          </div>
        </div>

        {/* Context hint */}
        <p className={styles.hint} aria-live="polite">
          {state.isSpinning
            ? '🌀 The universe is deciding…'
            : '👆 Click the center hub or swipe to spin'}
        </p>

        {/* Direction indicator */}
        {!state.isSpinning && (
          <p className={styles.directionBadge}>
            {state.spinDirection === 1 ? '↻ Clockwise' : '↺ Counter-clockwise'}
          </p>
        )}
      </main>

      {/* Bottom ad zone */}
      <div id="ad-bottom" className={styles.adZone} aria-label="Advertisement">
        <span className={styles.adLabel}>Advertisement</span>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Made with ✨ anti-gravity physics ·{' '}
          <a href="#" className={styles.footerLink}>Privacy</a>
        </p>
      </footer>

      {/* Modals / Panels */}
      <ResultModal
        segment={state.showResult ? state.currentResult : null}
        onClose={() => dispatch({ type: 'CLOSE_RESULT' })}
      />

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

      {/* Info panel — Section 7 comparative analysis & flow diagram */}
      {showInfo && (
        <InfoPanel onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
}
