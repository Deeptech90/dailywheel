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

/**
 * Adjusts the opacity of HSL, RGB, or Hex colors.
 */
export function adjustColorOpacity(color: string, opacity: number): string {
  if (!color) return `rgba(0,0,0,${opacity})`;
  
  if (color.startsWith('hsl')) {
    if (color.startsWith('hsla')) {
      return color.replace(/,([^,]+)\)$/, `, ${opacity})`);
    }
    return color.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
  }
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else if (hex.length >= 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
  if (color.startsWith('rgb')) {
    if (color.startsWith('rgba')) {
      return color.replace(/,([^,]+)\)$/, `, ${opacity})`);
    }
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  }
  return color;
}

/**
 * Parses an HSL, RGB, or Hex color string into [R, G, B] values.
 */
function parseToRgb(color: string): [number, number, number] {
  if (!color) return [0, 0, 0];
  
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return [r, g, b];
    } else if (hex.length >= 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    }
  }
  
  if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/i);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
  }
  
  if (color.startsWith('hsl')) {
    const match = color.match(/hsla?\(?\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*/i);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
      return [
        Math.round(f(0) * 255),
        Math.round(f(8) * 255),
        Math.round(f(4) * 255)
      ];
    }
  }
  
  return [0, 0, 0];
}

/**
 * Calculates the relative luminance of a color and returns dark text (#12122a) 
 * for light backgrounds, and light text (#ffffff) for dark backgrounds.
 */
export function getContrastTextColor(backgroundColor: string): string {
  const [r, g, b] = parseToRgb(backgroundColor);
  const L = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  return L > 0.6 ? '#12122a' : '#ffffff';
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
