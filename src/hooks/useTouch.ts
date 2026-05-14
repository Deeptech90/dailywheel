import { useRef, useCallback } from 'react';
import { clamp } from '../utils/easing';

interface UseTouchOptions {
  onSpin: (velocity: number) => void;
  onPinchScale?: (scale: number) => void;
  disabled?: boolean;
  /** Ref to the wheel canvas — used to detect center-hub clicks */
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

/**
 * Handles touch + mouse gestures for the spinning wheel:
 *  - Tap / swipe  → spin with velocity proportional to swipe speed
 *  - Pinch in/out → scale the wheel (onPinchScale callback)
 *
 * Uses debounce on spin trigger to prevent duplicate fires from rapid taps.
 */
export function useTouch({ onSpin, onPinchScale, disabled, canvasRef }: UseTouchOptions) {
  const startRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastSpinRef = useRef<number>(0);           // For debounce
  const pinchStartDistRef = useRef<number | null>(null); // For pinch tracking
  const activeTouchesRef = useRef<React.Touch[]>([]);

  // ── Debounced spin trigger ───────────────────────────────────────────────
  const triggerSpin = useCallback((velocity: number) => {
    const now = Date.now();
    if (now - lastSpinRef.current < 300) return; // 300ms debounce
    lastSpinRef.current = now;
    onSpin(velocity);
  }, [onSpin]);

  // ── Pinch distance helper ────────────────────────────────────────────────
  const getPinchDistance = (touches: React.TouchList | TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // ── Touch handlers ───────────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;

    // Track all active touches for pinch
    activeTouchesRef.current = Array.from(e.touches) as unknown as React.Touch[];

    if (e.touches.length === 2) {
      // Pinch gesture start
      pinchStartDistRef.current = getPinchDistance(e.touches);
      startRef.current = null; // Cancel any swipe in progress
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      startRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    }
  }, [disabled]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    e.preventDefault(); // Prevent scroll during wheel interaction

    if (e.touches.length === 2 && pinchStartDistRef.current !== null && onPinchScale) {
      const currentDist = getPinchDistance(e.touches);
      if (currentDist !== null) {
        const scale = clamp(currentDist / pinchStartDistRef.current, 0.5, 2.0);
        onPinchScale(scale);
      }
    }
  }, [disabled, onPinchScale]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (disabled) return;

    // Pinch ended — reset pinch tracker, do not spin
    if (pinchStartDistRef.current !== null && e.touches.length < 2) {
      pinchStartDistRef.current = null;
      startRef.current = null;
      return;
    }

    startRef.current = null; // Reset without spinning
  }, [disabled]);

  // ── Mouse handlers (desktop — only center hub click matters) ─────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  }, [disabled]);

  // ── Center-hub click handler ─────────────────────────────────────────────
  /** Spins the wheel when the user clicks/taps within 40px of the canvas center */
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled || !canvasRef?.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Hub radius is 34px in the engine — allow a 40px hit area
    if (dist <= 40) {
      triggerSpin(15 + Math.random() * 10);
    }
  }, [disabled, canvasRef, triggerSpin]);

  /** Touch tap on center hub (single-finger tap with minimal movement) */
  const handleCenterTap = useCallback((e: React.TouchEvent) => {
    if (disabled || !canvasRef?.current || !startRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startRef.current.x;
    const dy = t.clientY - startRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 20) return; // Not a tap — it's a swipe

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tdx = startRef.current.x - cx;
    const tdy = startRef.current.y - cy;
    if (Math.sqrt(tdx * tdx + tdy * tdy) <= 40) {
      triggerSpin(15 + Math.random() * 10);
    }
  }, [disabled, canvasRef, triggerSpin]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleCanvasClick,
    handleCenterTap,
  };
}
