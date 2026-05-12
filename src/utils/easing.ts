/** Cubic ease-out: fast start, slow end */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Cubic ease-in-out */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Overshoot spring: bounces past target before settling */
export function springEaseOut(t: number, overshoot = 1.5): number {
  return 1 + overshoot * Math.pow(2, -10 * t) * Math.sin((t - overshoot / 4) * (2 * Math.PI) / overshoot);
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
