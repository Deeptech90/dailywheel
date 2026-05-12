import { useRef, useCallback } from 'react';
import { clamp } from '../utils/easing';

interface UseTouchOptions {
  onSpin: (velocity: number) => void;
  onPinchScale?: (scale: number) => void;
  disabled?: boolean;
}

/**
 * Handles touch + mouse gestures for the spinning wheel:
 *  - Tap / swipe  → spin with velocity proportional to swipe speed
 *  - Pinch in/out → scale the wheel (onPinchScale callback)
 *
 * Uses debounce on spin trigger to prevent duplicate fires from rapid taps.
 */
export function useTouch({ onSpin, onPinchScale, disabled }: UseTouchOptions) {
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

    // Pinch ended
    if (pinchStartDistRef.current !== null && e.touches.length < 2) {
      pinchStartDistRef.current = null;
      return;
    }

    if (!startRef.current) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startRef.current.x;
    const dy = t.clientY - startRef.current.y;
    const dt = Math.max((Date.now() - startRef.current.t) / 1000, 0.05);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const rawVelocity = distance / dt;

    // Map pixel velocity to angular velocity
    const angularVelocity = clamp(rawVelocity * 0.05, 6, 28);
    startRef.current = null;

    if (distance > 20) {
      triggerSpin(angularVelocity);
    }
  }, [disabled, triggerSpin]);

  // ── Mouse handlers (desktop fallback) ───────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  }, [disabled]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (disabled || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    const dt = Math.max((Date.now() - startRef.current.t) / 1000, 0.05);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const rawVelocity = distance / dt;
    const angularVelocity = clamp(rawVelocity * 0.05, 6, 28);
    startRef.current = null;
    if (distance > 10) triggerSpin(angularVelocity);
  }, [disabled, triggerSpin]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
}
