import { useRef, useEffect, useCallback } from 'react';
import { WheelEngine } from '../engines/WheelEngine';
import { Segment } from '../types';

interface UseWheelOptions {
  segments: Segment[];
  onStop: (winner: Segment) => void;
  onTick: () => void;
  direction?: 1 | -1;
}

export function useWheel({ segments, onStop, onTick, direction = 1 }: UseWheelOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<WheelEngine | null>(null);
  const rafRef = useRef<number>(0);

  // Initialize engine
  useEffect(() => {
    engineRef.current = new WheelEngine(segments);
    engineRef.current.setCallbacks(onStop, onTick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update segments without recreating the engine
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.segments = segments;
    }
  }, [segments]);

  // Sync direction
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.direction = direction;
    }
  }, [direction]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const loop = () => {
      const engine = engineRef.current;
      if (!engine) return;
      engine.update();
      engine.draw(canvas);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spin = useCallback((velocity?: number) => {
    engineRef.current?.spin(velocity);
  }, []);

  const instantResolve = useCallback(() => {
    return engineRef.current?.instantResolve() ?? null;
  }, []);

  const isSpinning = useCallback(() => {
    return engineRef.current?.isSpinning ?? false;
  }, []);

  const setDirection = useCallback((dir: 1 | -1) => {
    if (engineRef.current) engineRef.current.direction = dir;
  }, []);

  return { canvasRef, spin, instantResolve, isSpinning, setDirection };
}
