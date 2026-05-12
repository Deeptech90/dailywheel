import { Segment } from '../types';
import { capitalizeLabel } from './labels';

/**
 * Generates a harmonious HSL color palette for N segments.
 * Uses evenly spaced hues at fixed saturation and lightness.
 */
export function generatePalette(count: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.round((i / count) * 360);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}

/** Raw default labels — auto-capitalized via capitalizeLabel */
const RAW_DEFAULTS = [
  'go for a walk',
  'read a book',
  'try a new recipe',
  'meditate',
  'call a friend',
  'watch a documentary',
  'draw something',
  'play outside',
];

export const DEFAULT_SEGMENTS: Segment[] = RAW_DEFAULTS.map((label, i) => ({
  id: String(i + 1),
  label: capitalizeLabel(label),
  color: `hsl(${Math.round((i / RAW_DEFAULTS.length) * 360)}, 70%, 55%)`,
}));

export function recolorSegments(segments: Segment[]): Segment[] {
  const palette = generatePalette(segments.length);
  return segments.map((s, i) => ({ ...s, color: palette[i] }));
}
