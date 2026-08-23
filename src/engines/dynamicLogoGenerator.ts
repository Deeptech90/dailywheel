/* ============================================================
   Dynamic Logo Generator — Real-Time Canvas / SVG Engine
   Synthesizes live SVG vector logos for search result cards
   ============================================================ */

import { SVG_ICONS } from './svgIcons';

const CURATED_PALETTES = [
  { primary: '#6366F1', secondary: '#EC4899', bg: '#0F172A', gradient: 'linear-gradient(135deg, #6366F1, #EC4899)' },
  { primary: '#8B5CF6', secondary: '#3B82F6', bg: '#090D16', gradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' },
  { primary: '#06B6D4', secondary: '#10B981', bg: '#041F1E', gradient: 'linear-gradient(135deg, #06B6D4, #10B981)' },
  { primary: '#F59E0B', secondary: '#EF4444', bg: '#1C1308', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  { primary: '#10B981', secondary: '#6366F1', bg: '#0B1916', gradient: 'linear-gradient(135deg, #10B981, #6366F1)' },
  { primary: '#EC4899', secondary: '#F43F5E', bg: '#180B12', gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)' },
  { primary: '#38BDF8', secondary: '#818CF8', bg: '#0B1528', gradient: 'linear-gradient(135deg, #38BDF8, #818CF8)' },
  { primary: '#A855F7', secondary: '#06B6D4', bg: '#140A22', gradient: 'linear-gradient(135deg, #A855F7, #06B6D4)' },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface DynamicLogoPreview {
  svgString: string;
  primaryColor: string;
  secondaryColor: string;
  iconName: string;
}

export function generateDynamicLogoPreview(businessName: string, categoryHint: string = ''): DynamicLogoPreview {
  const hash = hashString(businessName + categoryHint);
  const palette = CURATED_PALETTES[hash % CURATED_PALETTES.length];
  
  // Pick an icon deterministically
  const icon = SVG_ICONS[hash % SVG_ICONS.length];
  const iconPath = icon.path || (icon.paths ? icon.paths.join(' ') : 'M12 2L2 22h20L12 2z');
  const viewBox = icon.viewBox || '0 0 24 24';

  const cleanName = businessName.trim();
  const initials = cleanName
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const layoutVariant = hash % 3; // 0: Horizontal Icon+Text, 1: Modern Geo Badge, 2: Monogram Tile

  let innerSvg = '';
  const W = 320;
  const H = 100;

  if (layoutVariant === 0) {
    // Horizontal Modern: Icon Box on Left + Bold Name on Right
    innerSvg = `
      <rect width="100%" height="100%" fill="transparent"/>
      <g transform="translate(20, 22)">
        <rect width="56" height="56" rx="14" fill="${palette.primary}" fill-opacity="0.15" stroke="${palette.primary}" stroke-width="1.5"/>
        <g transform="translate(13, 13) scale(1.25)" fill="${palette.primary}">
          <path d="${iconPath}"/>
        </g>
      </g>
      <text x="92" y="52" font-family="'Outfit', 'Inter', sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="-0.02em">
        ${escapeXml(cleanName)}
      </text>
      <text x="92" y="70" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="${palette.secondary}" letter-spacing="0.12em">
        BRAND IDENTITY &bull; AI VERIFIED
      </text>
    `;
  } else if (layoutVariant === 1) {
    // Modern Geo Emblem Badge
    innerSvg = `
      <rect width="100%" height="100%" fill="transparent"/>
      <g transform="translate(24, 25)">
        <circle cx="25" cy="25" r="24" fill="url(#grad-${hash})" opacity="0.2"/>
        <circle cx="25" cy="25" r="24" fill="none" stroke="${palette.secondary}" stroke-width="1.5" stroke-dasharray="3 3"/>
        <g transform="translate(13, 13) scale(1)" fill="${palette.primary}">
          <path d="${iconPath}"/>
        </g>
      </g>
      <text x="92" y="48" font-family="'Outfit', 'Inter', sans-serif" font-size="21" font-weight="800" fill="#FFFFFF">
        ${escapeXml(cleanName)}
      </text>
      <text x="92" y="68" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="rgba(255,255,255,0.6)" letter-spacing="0.05em">
        OFFICIAL VECTOR LOGO
      </text>
    `;
  } else {
    // High-Tech Monogram Minimal
    innerSvg = `
      <rect width="100%" height="100%" fill="transparent"/>
      <g transform="translate(20, 20)">
        <rect width="60" height="60" rx="16" fill="url(#grad-${hash})"/>
        <text x="30" y="39" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="24" font-weight="900" fill="#FFFFFF">
          ${initials}
        </text>
      </g>
      <text x="96" y="51" font-family="'Outfit', 'Inter', sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="-0.01em">
        ${escapeXml(cleanName)}
      </text>
      <text x="96" y="69" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="${palette.primary}" letter-spacing="0.1em">
        PREMIUM STARTUP SUITE
      </text>
    `;
  }

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%">
      <defs>
        <linearGradient id="grad-${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.primary}"/>
          <stop offset="100%" stop-color="${palette.secondary}"/>
        </linearGradient>
      </defs>
      ${innerSvg}
    </svg>
  `.trim();

  return {
    svgString,
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    iconName: icon.name
  };
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
