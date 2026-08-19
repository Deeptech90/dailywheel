/* ============================================================
   SVG Icons Library — keyword-tagged icon paths
   ~40 icons across: tech, nature, food, finance, health,
   abstract, education, legal, travel, sports, creative
   ============================================================ */

export interface SvgIcon {
  id: string;
  tags: string[];
  viewBox: string;
  path: string;          // single <path d="..."/> value
  paths?: string[];      // multi-path icons
  strokeWidth?: number;  // defaults to 0 (filled); set for outline icons
  filled?: boolean;
}

export const SVG_ICONS: SvgIcon[] = [
  // ── Abstract / Generic ──────────────────────────────────────
  {
    id: 'star',
    tags: ['star', 'award', 'premium', 'top', 'abstract', 'general'],
    viewBox: '0 0 24 24',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    filled: true,
  },
  {
    id: 'diamond',
    tags: ['diamond', 'gem', 'luxury', 'premium', 'jewelry', 'fashion', 'abstract'],
    viewBox: '0 0 24 24',
    path: 'M12 1L2 8l10 15 10-15L12 1zm0 3.2L19.5 9 12 20.5 4.5 9 12 4.2z',
    filled: true,
  },
  {
    id: 'hexagon',
    tags: ['hexagon', 'abstract', 'tech', 'geometric', 'modern'],
    viewBox: '0 0 24 24',
    path: 'M21 16.5l-9 5.2-9-5.2V7.5L12 2.3l9 5.2v9z',
    filled: true,
  },
  {
    id: 'triangle',
    tags: ['triangle', 'abstract', 'arrow', 'growth', 'peak', 'mountain', 'geometric'],
    viewBox: '0 0 24 24',
    path: 'M12 2L2 22h20L12 2z',
    filled: true,
  },
  {
    id: 'infinity',
    tags: ['infinity', 'loop', 'infinite', 'endless', 'abstract', 'tech'],
    viewBox: '0 0 24 24',
    path: 'M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z',
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'circle-dot',
    tags: ['dot', 'circle', 'minimal', 'abstract', 'simple', 'round'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z',
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    ],
    filled: true,
  },

  // ── Technology ──────────────────────────────────────────────
  {
    id: 'lightning',
    tags: ['bolt', 'lightning', 'electric', 'fast', 'tech', 'energy', 'power'],
    viewBox: '0 0 24 24',
    path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    filled: true,
  },
  {
    id: 'chip',
    tags: ['chip', 'circuit', 'tech', 'technology', 'software', 'cpu', 'ai'],
    viewBox: '0 0 24 24',
    path: 'M9 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M9 3v2h6V3M9 3h6M9 9h6M9 13h6M9 17h4',
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'rocket',
    tags: ['rocket', 'launch', 'startup', 'tech', 'space', 'speed', 'innovation'],
    viewBox: '0 0 24 24',
    path: 'M12 2C6 2 4 9 4 9s-2 1-2 3 2 3 2 3l1 2 3-2c1 1 2 3 4 3s3-2 4-3l3 2 1-2s2-1 2-3-2-3-2-3S18 2 12 2zm0 2c5 0 6 6 6 6H6s1-6 6-6zM9 17l-2 3 1 1 4-1 4 1 1-1-2-3',
    filled: true,
  },
  {
    id: 'code',
    tags: ['code', 'developer', 'software', 'tech', 'programming', 'engineering'],
    viewBox: '0 0 24 24',
    paths: [
      'M16 18l6-6-6-6',
      'M8 6l-6 6 6 6',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'globe',
    tags: ['globe', 'world', 'internet', 'web', 'global', 'travel', 'international'],
    viewBox: '0 0 24 24',
    path: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c1.5 0 3 3 3.5 7h-7C9 7 10.5 4 12 4zm-8 8h3c0 1.5.2 3 .5 4H5a8 8 0 0 1-1-4zm1 6h2.5c.5 1.5 1.3 2.8 2.3 3.7A8 8 0 0 1 5 18zm7 4c-1.5 0-3-3-3.5-7h7C15 19 13.5 22 12 22zm3.5-9H8.5C9 9 10.5 6 12 6s3 3 3.5 7zm.5 9a8 8 0 0 1-2.3-3.7H21a8 8 0 0 1-4.7 3.7zm3.2-5.7H16.5c.3-1 .5-2.5.5-4h3a8 8 0 0 1-1 4z',
    filled: true,
  },

  // ── Nature / Eco ────────────────────────────────────────────
  {
    id: 'leaf',
    tags: ['leaf', 'green', 'eco', 'nature', 'organic', 'plant', 'sustainable', 'environment'],
    viewBox: '0 0 24 24',
    path: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8',
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'tree',
    tags: ['tree', 'nature', 'eco', 'forest', 'growth', 'organic', 'green', 'environment'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2L5 12h4l-3 6h6v4h2v-4h6l-3-6h4L12 2z',
    ],
    filled: true,
  },
  {
    id: 'sun',
    tags: ['sun', 'solar', 'bright', 'energy', 'morning', 'bakery', 'warmth', 'yellow'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z',
      'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'wave',
    tags: ['wave', 'ocean', 'water', 'sea', 'beach', 'surfing', 'travel', 'marine'],
    viewBox: '0 0 24 24',
    path: 'M2 12c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0',
    strokeWidth: 2.5,
    filled: false,
  },
  {
    id: 'mountain',
    tags: ['mountain', 'peak', 'outdoor', 'adventure', 'hiking', 'travel', 'nature'],
    viewBox: '0 0 24 24',
    path: 'M8 20L1 7l7-3 4 5 4-5 7 3-7 13H8z',
    filled: true,
  },
  {
    id: 'flower',
    tags: ['flower', 'floral', 'beauty', 'spa', 'wellness', 'nature', 'bloom'],
    viewBox: '0 0 24 24',
    path: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 3c0 2.5-2 3-2 5s2 2.5 2 5 2-2.5 2-5-2-2.5-2-5zM3 12c2.5 0 3 2 5 2s2.5-2 5-2-2.5-2-5-2-2.5 2-5 2z',
    filled: true,
  },

  // ── Food & Beverage ─────────────────────────────────────────
  {
    id: 'coffee',
    tags: ['coffee', 'cafe', 'drink', 'morning', 'cup', 'beverage', 'bakery'],
    viewBox: '0 0 24 24',
    paths: [
      'M17 8h1a4 4 0 0 1 0 8h-1',
      'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z',
      'M6 2v2M10 2v2M14 2v2',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'fork-knife',
    tags: ['fork', 'knife', 'food', 'restaurant', 'dining', 'eat', 'meal', 'cuisine'],
    viewBox: '0 0 24 24',
    paths: [
      'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2',
      'M7 2v20',
      'M21 15V2s-5 3-5 7v2h5v4a2 2 0 0 0 4 0V9h-4',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'wheat',
    tags: ['wheat', 'grain', 'bread', 'bakery', 'harvest', 'organic', 'farm'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2v20',
      'M12 8c0-3 3-5 3-5s0 5-3 5z',
      'M12 8c0-3-3-5-3-5s0 5 3 5z',
      'M12 13c0-3 3-5 3-5s0 5-3 5z',
      'M12 13c0-3-3-5-3-5s0 5 3 5z',
      'M12 18c0-3 3-5 3-5s0 5-3 5z',
      'M12 18c0-3-3-5-3-5s0 5 3 5z',
    ],
    strokeWidth: 1.5,
    filled: false,
  },

  // ── Finance ─────────────────────────────────────────────────
  {
    id: 'shield',
    tags: ['shield', 'security', 'protect', 'insurance', 'finance', 'trust', 'safe'],
    viewBox: '0 0 24 24',
    path: 'M12 3l8 4v5c0 4.5-3.4 8.7-8 10C7.4 20.7 4 16.5 4 12V7l8-4z',
    filled: true,
  },
  {
    id: 'chart',
    tags: ['chart', 'graph', 'growth', 'analytics', 'finance', 'data', 'trend', 'increase'],
    viewBox: '0 0 24 24',
    paths: [
      'M22 20H2',
      'M5 20V12l5-5 4 4 8-8',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'coin',
    tags: ['coin', 'money', 'finance', 'currency', 'wealth', 'gold'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z',
      'M12 6v12M8.5 9c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3-1.6 2-3.5 2-3.5.9-3.5 3 1.6 3 3.5 3 3.5-1.3 3.5-3',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Health & Wellness ────────────────────────────────────────
  {
    id: 'heart',
    tags: ['heart', 'love', 'health', 'care', 'wellness', 'medical', 'charity'],
    viewBox: '0 0 24 24',
    path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    filled: true,
  },
  {
    id: 'dumbbell',
    tags: ['dumbbell', 'fitness', 'gym', 'sports', 'strength', 'workout', 'training'],
    viewBox: '0 0 24 24',
    paths: [
      'M6.5 6.5h1v11h-1zM16.5 6.5h1v11h-1z',
      'M2 9h4.5v6H2zM17.5 9H22v6h-4.5z',
      'M7.5 12h9',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'plus-circle',
    tags: ['plus', 'medical', 'health', 'hospital', 'clinic', 'care', 'pharmacy'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z',
      'M12 8v8M8 12h8',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Education ───────────────────────────────────────────────
  {
    id: 'book',
    tags: ['book', 'education', 'learning', 'school', 'knowledge', 'read', 'library'],
    viewBox: '0 0 24 24',
    path: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'graduation',
    tags: ['graduation', 'education', 'university', 'school', 'diploma', 'degree'],
    viewBox: '0 0 24 24',
    paths: [
      'M22 10v6M2 10l10-5 10 5-10 5-10-5z',
      'M6 12v5c3 3 9 3 12 0v-5',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'bulb',
    tags: ['bulb', 'idea', 'innovation', 'creative', 'inspiration', 'bright', 'tech'],
    viewBox: '0 0 24 24',
    paths: [
      'M9 21h6M12 3a6 6 0 0 0-3 11.2V17h6v-2.8A6 6 0 0 0 12 3z',
      'M9.5 17v3.5M14.5 17v3.5',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Legal & Professional ─────────────────────────────────────
  {
    id: 'scale',
    tags: ['scale', 'balance', 'justice', 'law', 'legal', 'fair', 'consulting'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 3v18M3 6h18M5 6l3 9a3 3 0 0 0 6 0l3-9M7 6a5 5 0 0 0 10 0',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'briefcase',
    tags: ['briefcase', 'business', 'work', 'corporate', 'professional', 'office', 'consulting'],
    viewBox: '0 0 24 24',
    paths: [
      'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z',
      'M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
      'M12 12v.01',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Creative ─────────────────────────────────────────────────
  {
    id: 'brush',
    tags: ['brush', 'paint', 'creative', 'art', 'design', 'artist', 'studio'],
    viewBox: '0 0 24 24',
    paths: [
      'M9.06 11.9l8.07-8.06a2.85 2.85 0 0 1 4.03 4.03l-8.06 8.08',
      'M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.18.8 3.01.8a3.02 3.02 0 0 0 0-6.06l.01.02z',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'sparkle',
    tags: ['sparkle', 'magic', 'star', 'shine', 'glitter', 'creative', 'luxury', 'beauty'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z',
    ],
    filled: true,
  },
  {
    id: 'camera',
    tags: ['camera', 'photo', 'photography', 'media', 'studio', 'creative', 'film'],
    viewBox: '0 0 24 24',
    paths: [
      'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z',
      'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Travel ───────────────────────────────────────────────────
  {
    id: 'plane',
    tags: ['plane', 'travel', 'flight', 'aviation', 'air', 'airport', 'trip'],
    viewBox: '0 0 24 24',
    path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
    filled: true,
  },
  {
    id: 'compass',
    tags: ['compass', 'navigate', 'direction', 'travel', 'explore', 'adventure'],
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z',
      'M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
    ],
    strokeWidth: 2,
    filled: false,
  },

  // ── Home / Real Estate ───────────────────────────────────────
  {
    id: 'house',
    tags: ['house', 'home', 'real estate', 'property', 'building', 'residential'],
    viewBox: '0 0 24 24',
    paths: [
      'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      'M9 22V12h6v10',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'key',
    tags: ['key', 'real estate', 'access', 'security', 'property', 'unlock'],
    viewBox: '0 0 24 24',
    path: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
    strokeWidth: 2,
    filled: false,
  },

  // ── Sports ───────────────────────────────────────────────────
  {
    id: 'trophy',
    tags: ['trophy', 'award', 'winner', 'champion', 'sports', 'prize', 'success'],
    viewBox: '0 0 24 24',
    paths: [
      'M6 9H4.5a2.5 2.5 0 0 1 0-5H6',
      'M18 9h1.5a2.5 2.5 0 0 0 0-5H18',
      'M4 22h16M9 22v-4M15 22v-4M12 17c-3.87 0-7-3.13-7-7V4h14v6c0 3.87-3.13 7-7 7z',
    ],
    strokeWidth: 2,
    filled: false,
  },
  {
    id: 'lightning-bolt',
    tags: ['lightning', 'bolt', 'energy', 'fast', 'power', 'electric', 'sports', 'dynamic'],
    viewBox: '0 0 24 24',
    path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    filled: true,
  },
];

/* ── Icon search ─────────────────────────────────────────────── */
export function findIconByKeyword(keyword: string): SvgIcon {
  if (!keyword?.trim()) return SVG_ICONS[0];
  const kw = keyword.toLowerCase().trim();
  // Exact or partial tag match
  const scored = SVG_ICONS.map(icon => {
    const exactMatch = icon.tags.includes(kw) ? 3 : 0;
    const partialMatch = icon.tags.some(t => t.includes(kw) || kw.includes(t)) ? 1 : 0;
    return { icon, score: exactMatch + partialMatch };
  }).sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].icon : SVG_ICONS[0];
}

/* ── SVG path renderer ───────────────────────────────────────── */
export function renderIconSvg(
  icon: SvgIcon,
  color: string,
  size: number,
): string {
  const stroke = icon.filled ? 'none' : color;
  const fill = icon.filled ? color : 'none';
  const sw = icon.strokeWidth ?? 0;

  const pathDefs = icon.paths
    ? icon.paths.map(p => `<path d="${p}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`).join('\n    ')
    : `<path d="${icon.path}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="${size}" height="${size}">
  ${pathDefs}
</svg>`;
}
