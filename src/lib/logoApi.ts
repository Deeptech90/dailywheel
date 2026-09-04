/* ============================================================
   Logo API — generation endpoint with client-side fallback
   ============================================================ */

import { LogoInputs, DesignPrefs, GeneratedLogo } from '../types/logoMaker';
import { generateLogoVariants } from '../engines/logoRenderer';

const LOGO_API_URL = import.meta.env.VITE_LOGO_API_URL as string | undefined;

export interface GenerationResult {
  logos: GeneratedLogo[];
  source: 'api' | 'client';
  error?: string;
}

/* ── Simulate AI latency (client-side mode) ──────────────────── */
function delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

/* ── API call (when backend is configured) ───────────────────── */
async function callLogoAPI(
  prompt: string,
  inputs: LogoInputs,
  prefs: DesignPrefs,
): Promise<GeneratedLogo[]> {
  const response = await fetch(LOGO_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, inputs, prefs }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json() as { logos: GeneratedLogo[] };
  return data.logos;
}

/* ── Main generation function ────────────────────────────────── */
export async function generateLogos(
  prompt: string,
  inputs: LogoInputs,
  prefs: DesignPrefs,
  onProgress?: (msg: string) => void,
): Promise<GenerationResult> {
  // If API URL is configured, attempt real generation first
  if (LOGO_API_URL) {
    onProgress?.('Sending to AI model…');
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const logos = await callLogoAPI(prompt, inputs, prefs);
        return { logos, source: 'api' };
      } catch (err) {
        if (attempt < 3) {
          onProgress?.(`Retrying (${attempt}/3)…`);
          await delay(1500 * attempt);
        } else {
          // Fall through to client-side fallback
          console.warn('Logo API failed after 3 attempts, using client-side renderer:', err);
        }
      }
    }
  }

  // Client-side SVG renderer fallback
  onProgress?.('Composing design elements…');
  await delay(400);
  onProgress?.('Applying color palette…');
  await delay(400);
  onProgress?.('Rendering typography…');
  await delay(500);
  onProgress?.('Generating variants…');
  await delay(300);

  const logos = generateLogoVariants(inputs, prefs, prompt);
  return { logos, source: 'client' };
}

/* ── Rate limit tracking (per-minute throttle, unlimited total generations) ── */
const RATE_LIMIT_KEY = 'ubn_logo_gen_timestamps';
const MAX_GENS_PER_MINUTE = 10; // Per-minute throttle to prevent accidental spam; total generations are unlimited

export function checkRateLimit(): { allowed: boolean; remaining: number; resetIn: number } {
  const raw = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  const minuteAgo = now - 60_000;

  let timestamps: number[] = [];
  try {
    timestamps = raw ? JSON.parse(raw) : [];
  } catch {
    timestamps = [];
  }
  timestamps = timestamps.filter(t => t > minuteAgo);

  const remaining = Math.max(0, MAX_GENS_PER_MINUTE - timestamps.length);
  const oldest = timestamps[0] ?? now;
  const resetIn = Math.max(0, Math.ceil((oldest + 60_000 - now) / 1000));

  return { allowed: remaining > 0, remaining, resetIn };
}

export function recordGeneration(): void {
  const raw = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  const minuteAgo = now - 60_000;
  let timestamps: number[] = [];
  try {
    timestamps = raw ? JSON.parse(raw) : [];
  } catch {
    timestamps = [];
  }
  timestamps = timestamps.filter(t => t > minuteAgo);
  timestamps.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
}
