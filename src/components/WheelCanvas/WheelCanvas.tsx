import { useRef, useEffect, useState, useCallback } from 'react';
import { Segment } from '../../types';
import { useWheel } from '../../hooks/useWheel';
import { useTouch } from '../../hooks/useTouch';
import { clamp } from '../../utils/easing';
import styles from './WheelCanvas.module.css';

interface WheelCanvasProps {
  segments: Segment[];
  isSpinning: boolean;
  direction: 1 | -1;
  onSpinStart: () => void;
  onSpinEnd: (winner: Segment) => void;
  onTick: () => void;
  physicsCanvasRef: React.RefObject<HTMLCanvasElement>;
}

/** Returns ideal canvas size based on viewport and orientation */
function getCanvasSize(): number {
  const isLandscape = window.innerWidth > window.innerHeight;
  if (isLandscape) {
    // In landscape, wheel shares horizontal space with controls
    return clamp(window.innerHeight * 0.75, 220, 380);
  }
  // Portrait: wheel takes most of the vertical space
  return clamp(
    Math.min(window.innerWidth - 32, window.innerHeight * 0.52),
    260,
    480,
  );
}

export function WheelCanvas({
  segments,
  isSpinning,
  direction,
  onSpinStart,
  onSpinEnd,
  onTick,
  physicsCanvasRef,
}: WheelCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Pinch-to-zoom scale (1.0 = default, 0.6–1.5 range)
  const [pinchScale, setPinchScale] = useState(1.0);
  const pinchBaseRef = useRef(1.0); // Scale at pinch start

  const handleStop = (winner: Segment) => {
    onSpinEnd(winner);
  };

  const { canvasRef, spin } = useWheel({
    segments,
    onStop: handleStop,
    onTick,
    direction,
  });

  const triggerSpin = useCallback((velocity?: number) => {
    if (isSpinning) return;
    onSpinStart();
    spin(velocity);
  }, [isSpinning, onSpinStart, spin]);

  // Pinch scale handler — computes relative to scale at pinch start
  const handlePinchScale = useCallback((rawScale: number) => {
    const newScale = clamp(pinchBaseRef.current * rawScale, 0.6, 1.5);
    setPinchScale(newScale);
  }, []);

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  } = useTouch({
    onSpin: triggerSpin,
    onPinchScale: handlePinchScale,
    disabled: isSpinning,
  });

  // Update pinch base whenever a pinch ends so next pinch starts fresh
  const handleTouchEndWrapper = useCallback((e: React.TouchEvent) => {
    handleTouchEnd(e);
    // When pinch is released, commit the current scale as the new base
    pinchBaseRef.current = pinchScale;
  }, [handleTouchEnd, pinchScale]);

  // Size canvas responsively (portrait + landscape)
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const size = getCanvasSize();
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, [canvasRef]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isSpinning ? styles.spinning : ''}`}
      style={{ transform: `scale(${pinchScale})`, transformOrigin: 'center' }}
    >
      {/* Particle overlay canvas */}
      <canvas
        ref={physicsCanvasRef}
        className={styles.particleCanvas}
        aria-hidden="true"
      />
      {/* Wheel canvas */}
      <canvas
        ref={canvasRef}
        id="wheel-canvas"
        className={styles.wheelCanvas}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEndWrapper}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        aria-label="Spinning wheel — tap, swipe, or pinch to interact"
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') ? triggerSpin() : undefined}
      />
    </div>
  );
}
