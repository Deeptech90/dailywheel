/// <reference types="vite/client" />

// CSS Modules — tells TypeScript that any *.module.css import
// returns a record of class name strings.
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// canvas-confetti (in case @types/canvas-confetti is missing)
declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }
  function confetti(options?: Options): Promise<null> | null;
  export default confetti;
}
