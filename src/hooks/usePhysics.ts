import { useRef, useEffect, useCallback } from 'react';
import { PhysicsEngine, FloatingElement, PhysicsConfig } from '../engines/PhysicsEngine';

export function usePhysics(config?: Partial<PhysicsConfig>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PhysicsEngine>(new PhysicsEngine(config));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    engineRef.current.init(canvas);

    const handleResize = () => {
      engineRef.current.resize(window.innerWidth, window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engineRef.current.stop();
    };
  }, []);

  /** Trigger particle burst at canvas coordinates (cx, cy) */
  const burst = useCallback((cx: number, cy: number, count?: number) => {
    engineRef.current.burst(cx, cy, count);
  }, []);

  /**
   * Register a DOM element for physics simulation.
   * Returns a FloatingElement handle for direct control.
   */
  const registerElement = useCallback(
    (el: HTMLElement, opts?: Partial<PhysicsConfig>): FloatingElement => {
      return engineRef.current.registerElement(el, opts);
    },
    [],
  );

  /** Invert gravity — launches all registered elements upward */
  const activateAntiGravity = useCallback(() => {
    engineRef.current.activateAntiGravity();
  }, []);

  /** Restore gravity — springs all elements back to origin */
  const deactivateAntiGravity = useCallback(() => {
    engineRef.current.deactivateAntiGravity();
  }, []);

  /** Update engine parameters at runtime */
  const setConfig = useCallback((patch: Partial<PhysicsConfig>) => {
    if (patch.gravity !== undefined) engineRef.current.setGravity(patch.gravity);
    if (patch.damping !== undefined) engineRef.current.setDamping(patch.damping);
    if (patch.airResistance !== undefined) engineRef.current.setAirResistance(patch.airResistance);
  }, []);

  return {
    physicsCanvasRef: canvasRef,
    burst,
    registerElement,
    activateAntiGravity,
    deactivateAntiGravity,
    setConfig,
  };
}
