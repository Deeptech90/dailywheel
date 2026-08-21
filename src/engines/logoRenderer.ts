/* ============================================================
   Logo Renderer — Client-Side SVG Vector Engine
   Generates structured SVG strings for 6+ template styles
   Supports typography metrics, icon scaling, and layout balance
   ============================================================ */

import { LogoInputs, DesignPrefs, GeneratedLogo, TemplateStyle, LayoutChoice, FontStyle } from '../types/logoMaker';
import { findIconByKeyword, getIconById, SvgIcon } from './svgIcons';

/* ── Font stack mapping ──────────────────────────────────────── */
const FONT_MAP: Record<FontStyle, string> = {
  sans:      "'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif:     "'Georgia', 'Times New Roman', Times, serif",
  script:    "'Dancing Script', 'Brush Script MT', cursive",
  geometric: "'Outfit', 'Futura', 'Century Gothic', sans-serif",
  display:   "'Outfit', 'Inter', -apple-system, sans-serif",
  mono:      "'SF Mono', 'Courier New', Courier, monospace",
};

/* ── Helper: sanitize text for SVG ──────────────────────────── */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Helper: SVG metadata block ─────────────────────────────── */
function buildMetadata(inputs: LogoInputs, prefs: DesignPrefs): string {
  const now = new Date().toISOString();
  return `
  <metadata>
    <dc:title>${esc(inputs.businessName)} Brand Logo</dc:title>
    <dc:creator>UniqueBusinessName.com Brand Suite</dc:creator>
    <dc:date>${now}</dc:date>
    <dc:subject>${esc(inputs.businessName)}, logo, ${inputs.industry}</dc:subject>
    <dc:description>Generated high-resolution brand identity for ${esc(inputs.businessName)}</dc:description>
  </metadata>`;
}

/* ── SVG wrapper ─────────────────────────────────────────────── */
function wrap(
  inner: string,
  w: number,
  h: number,
  inputs: LogoInputs,
  prefs: DesignPrefs,
  bg?: string,
): string {
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}" rx="12"/>` : '';
  const fontFam = FONT_MAP[prefs.fontStyle] || FONT_MAP.sans;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:dc="http://purl.org/dc/elements/1.1/" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <style>
      .logo-name { font-family: ${fontFam}; letter-spacing: ${prefs.letterSpacing ?? 0}px; }
      .logo-tag  { font-family: ${fontFam}; letter-spacing: ${(prefs.letterSpacing ?? 0) + 1.5}px; }
    </style>
  </defs>
  ${buildMetadata(inputs, prefs)}
  ${bgRect}
  ${inner}
</svg>`;
}

function resolveIcon(prefs: DesignPrefs): SvgIcon {
  if (prefs.symbolId) {
    return getIconById(prefs.symbolId);
  }
  return findIconByKeyword(prefs.iconKeyword);
}

/* ════════════════════════════════════════════════════════════════
   TEMPLATE RENDERERS
   ════════════════════════════════════════════════════════════════ */

/* ── 1. MINIMAL ──────────────────────────────────────────────── */
function renderMinimal(inputs: LogoInputs, prefs: DesignPrefs, layout: LayoutChoice): string {
  const W = 480, H = 160;
  const icon = resolveIcon(prefs);
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const scale = prefs.iconScale ?? 1;
  const fontSize = prefs.fontSize || Math.max(28, Math.min(48, Math.floor(280 / (name.length || 1))));
  const tagSize = Math.max(12, Math.round(fontSize * 0.35));

  if (layout === 'text-only' || layout === 'wordmark' as LayoutChoice) {
    const inner = `
    <text x="240" y="${tagline ? 78 : 92}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="240" y="${78 + fontSize * 0.75 + 10}" class="logo-tag"
      text-anchor="middle" font-size="${tagSize}" font-weight="500" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
  }

  if (layout === 'icon-only') {
    const iconStr = icon.filled
      ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
      : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
    const iconSize = Math.round(80 * scale);
    const cx = W / 2 - iconSize / 2;
    const cy = H / 2 - iconSize / 2;
    const inner = `<g transform="translate(${cx}, ${cy}) scale(${iconSize / 24})">${iconStr}</g>`;
    return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
  }

  if (layout === 'stacked') {
    const iconSize = Math.round(52 * scale);
    const totalH = iconSize + 8 + fontSize + (tagline ? tagSize + 4 : 0);
    const startY = (H - totalH) / 2;
    const iconCX = W / 2 - iconSize / 2;
    const iconStr = icon.filled
      ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
      : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
    const inner = `
    <g transform="translate(${iconCX}, ${startY}) scale(${iconSize / 24})">${iconStr}</g>
    <text x="240" y="${startY + iconSize + 8 + fontSize * 0.8}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="240" y="${startY + iconSize + 8 + fontSize + tagSize + 4}" class="logo-tag"
      text-anchor="middle" font-size="${tagSize}" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
  }

  // Horizontal (default)
  const iconSize = Math.round(48 * scale);
  const iconX = 40;
  const iconY = (H - iconSize) / 2;
  const textX = iconX + iconSize + 20;
  const iconStr = icon.filled
    ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
    : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
  const inner = `
    <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 24})">${iconStr}</g>
    <text x="${textX}" y="${tagline ? H / 2 - 4 : H / 2 + fontSize * 0.35}" class="logo-name"
      font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="${textX}" y="${H / 2 + 18}" class="logo-tag"
      font-size="${tagSize}" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ── 2. EMBLEM ───────────────────────────────────────────────── */
function renderEmblem(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 280, H = 280;
  const cx = W / 2, cy = H / 2;
  const r = 120;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const icon = resolveIcon(prefs);
  const iconSize = Math.round(46 * (prefs.iconScale ?? 1));
  const iconStr = icon.filled
    ? `<g fill="${secondary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
    : `<g fill="none" stroke="${secondary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
  const fontSize = Math.max(14, Math.min(22, Math.floor(200 / (name.length || 1))));

  const inner = `
    <!-- Outer ring -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${primary}" stroke="${secondary}" stroke-width="3.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 10}" fill="none" stroke="${secondary}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <!-- Icon -->
    <g transform="translate(${cx - iconSize / 2}, ${cy - iconSize / 2 - 18}) scale(${iconSize / 24})">${iconStr}</g>
    <!-- Name -->
    <text x="${cx}" y="${cy + iconSize / 2 + 2}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="900" fill="${secondary}" letter-spacing="1.5">${name.toUpperCase()}</text>
    ${tagline ? `<text x="${cx}" y="${cy + iconSize / 2 + 20}" class="logo-tag"
      text-anchor="middle" font-size="10" fill="${secondary}" letter-spacing="2.5" opacity="0.9">${tagline.toUpperCase()}</text>` : ''}
    <!-- Decorative divider -->
    <line x1="${cx - 42}" y1="${cy + iconSize / 2 + (tagline ? 28 : 12)}" x2="${cx - 8}" y2="${cy + iconSize / 2 + (tagline ? 28 : 12)}" stroke="${secondary}" stroke-width="1.5" opacity="0.7"/>
    <line x1="${cx + 8}" y1="${cy + iconSize / 2 + (tagline ? 28 : 12)}" x2="${cx + 42}" y2="${cy + iconSize / 2 + (tagline ? 28 : 12)}" stroke="${secondary}" stroke-width="1.5" opacity="0.7"/>`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ── 3. WORDMARK ─────────────────────────────────────────────── */
function renderWordmark(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 520, H = 150;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const firstLetter = name.charAt(0);
  const rest = name.slice(1);
  const fontSize = prefs.fontSize || Math.max(36, Math.min(68, Math.floor(460 / (name.length || 1))));
  const textY = tagline ? H / 2 + fontSize * 0.35 - 8 : H / 2 + fontSize * 0.35;

  const inner = `
    <!-- Accent underline bar -->
    <rect x="36" y="${textY + 10}" width="${Math.min(fontSize * 0.8, 70)}" height="5" fill="${secondary}" rx="2.5"/>
    <!-- First letter accent -->
    <text x="36" y="${textY}" class="logo-name"
      font-size="${fontSize}" font-weight="900" fill="${secondary}">${firstLetter}</text>
    <!-- Rest of name -->
    <text x="${36 + fontSize * 0.65}" y="${textY}" class="logo-name"
      font-size="${fontSize}" font-weight="900" fill="${primary}">${rest}</text>
    ${tagline ? `<text x="36" y="${textY + fontSize * 0.25 + 18}" class="logo-tag"
      font-size="13" fill="${secondary}" letter-spacing="3" opacity="0.95">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ── 4. LETTERMARK ───────────────────────────────────────────── */
function renderLettermark(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 240, H = 240;
  const cx = W / 2, cy = H / 2;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = inputs.businessName.replace(/[^a-zA-Z]/g, '');
  const initials = (inputs.businessName.match(/\b\w/g) ?? [name.charAt(0)])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const fontSize = initials.length === 1 ? 104 : 68;

  const inner = `
    <!-- Background tile -->
    <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="${primary}" rx="24"/>
    <!-- Corner accent dots -->
    <circle cx="48" cy="48" r="4" fill="${secondary}" opacity="0.9"/>
    <circle cx="${W - 48}" cy="${H - 48}" r="4" fill="${secondary}" opacity="0.9"/>
    <!-- Initials -->
    <text x="${cx}" y="${cy + fontSize * 0.36}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="900" fill="#ffffff">${initials}</text>
    <!-- Full brand name bottom -->
    <text x="${cx}" y="${H - 34}" class="logo-tag"
      text-anchor="middle" font-size="10" fill="#ffffff" opacity="0.8" letter-spacing="2">${esc(inputs.businessName.toUpperCase())}</text>`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ── 5. ABSTRACT & MODERN GEO ────────────────────────────────── */
function renderAbstract(inputs: LogoInputs, prefs: DesignPrefs, layout: LayoutChoice): string {
  const W = 480, H = 160;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const fontSize = prefs.fontSize || Math.max(26, Math.min(46, Math.floor(270 / (name.length || 1))));

  if (layout === 'stacked') {
    const inner = `
      <g transform="translate(${W / 2 - 40}, 12)">
        <circle cx="22" cy="26" r="22" fill="${primary}" opacity="0.95"/>
        <circle cx="44" cy="18" r="16" fill="${secondary}" opacity="0.85"/>
        <rect x="28" y="24" width="30" height="30" rx="7" fill="${primary}" opacity="0.55"/>
      </g>
      <text x="${W / 2}" y="106" class="logo-name"
        text-anchor="middle" font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
      ${tagline ? `<text x="${W / 2}" y="130" class="logo-tag"
        text-anchor="middle" font-size="12" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
  }

  // Horizontal layout
  const inner = `
    <g transform="translate(32, ${H / 2 - 36})">
      <circle cx="20" cy="20" r="20" fill="${primary}" opacity="0.95"/>
      <circle cx="38" cy="12" r="14" fill="${secondary}" opacity="0.85"/>
      <rect x="26" y="18" width="26" height="26" rx="6" fill="${primary}" opacity="0.5"/>
    </g>
    <line x1="104" y1="${H / 2 - 24}" x2="104" y2="${H / 2 + 24}" stroke="${primary}" stroke-width="2" opacity="0.25"/>
    <text x="122" y="${tagline ? H / 2 - 4 : H / 2 + fontSize * 0.35}" class="logo-name"
      font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="122" y="${H / 2 + 18}" class="logo-tag"
      font-size="13" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ── 6. MASCOT ───────────────────────────────────────────────── */
function renderMascot(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 360, H = 300;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const cx = W / 2;

  const inner = `
    <!-- Mascot body -->
    <circle cx="${cx}" cy="120" r="75" fill="${primary}"/>
    <!-- Eyes -->
    <circle cx="${cx - 20}" cy="108" r="13" fill="white"/>
    <circle cx="${cx + 20}" cy="108" r="13" fill="white"/>
    <circle cx="${cx - 18}" cy="110" r="6.5" fill="${secondary}"/>
    <circle cx="${cx + 22}" cy="110" r="6.5" fill="${secondary}"/>
    <circle cx="${cx - 15}" cy="107" r="2.5" fill="white"/>
    <circle cx="${cx + 25}" cy="107" r="2.5" fill="white"/>
    <!-- Smile -->
    <path d="M${cx - 20} 136 Q${cx} 158 ${cx + 20} 136" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <!-- Cheeks -->
    <circle cx="${cx - 36}" cy="138" r="11" fill="${secondary}" opacity="0.6"/>
    <circle cx="${cx + 36}" cy="138" r="11" fill="${secondary}" opacity="0.6"/>
    <!-- Ears -->
    <circle cx="${cx - 70}" cy="100" r="17" fill="${primary}"/>
    <circle cx="${cx + 70}" cy="100" r="17" fill="${primary}"/>
    <circle cx="${cx - 70}" cy="100" r="9" fill="${secondary}" opacity="0.7"/>
    <circle cx="${cx + 70}" cy="100" r="9" fill="${secondary}" opacity="0.7"/>
    <!-- Name -->
    <text x="${cx}" y="235" class="logo-name"
      text-anchor="middle" font-size="28" font-weight="900" fill="${primary}">${name}</text>
    ${tagline ? `<text x="${cx}" y="260" class="logo-tag"
      text-anchor="middle" font-size="12" fill="${secondary}">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs, prefs.bgFill);
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT: generateLogoVariants
   ════════════════════════════════════════════════════════════════ */

interface LogoVariantConfig {
  templateStyle: TemplateStyle;
  layout: LayoutChoice;
  fontStyle: FontStyle;
  swapColors?: boolean;
  label: string;
}

export function generateLogoVariants(
  inputs: LogoInputs,
  prefs: DesignPrefs,
  promptString: string = ''
): GeneratedLogo[] {
  const configs: LogoVariantConfig[] = [
    { templateStyle: 'minimal', layout: 'horizontal', fontStyle: 'geometric', label: 'Modern Minimal Horizontal' },
    { templateStyle: 'minimal', layout: 'stacked', fontStyle: 'sans', label: 'Balanced Icon Stack' },
    { templateStyle: 'wordmark', layout: 'horizontal', fontStyle: 'display', label: 'Bold Typographic Wordmark' },
    { templateStyle: 'emblem', layout: 'stacked', fontStyle: 'serif', label: 'Classic Heritage Crest' },
    { templateStyle: 'lettermark', layout: 'stacked', fontStyle: 'geometric', label: 'Monogram Brand Tile' },
    { templateStyle: 'abstract', layout: 'horizontal', fontStyle: 'sans', label: 'Modern Geometric Duo' },
  ];

  return configs.map((cfg, idx) => {
    const variantPrefs: DesignPrefs = {
      ...prefs,
      templateStyle: cfg.templateStyle,
      layout: cfg.layout,
      fontStyle: cfg.fontStyle,
      primaryColor: cfg.swapColors ? prefs.secondaryColor : prefs.primaryColor,
      secondaryColor: cfg.swapColors ? prefs.primaryColor : prefs.secondaryColor,
    };

    let svgString = '';
    switch (cfg.templateStyle) {
      case 'minimal':    svgString = renderMinimal(inputs, variantPrefs, cfg.layout); break;
      case 'emblem':     svgString = renderEmblem(inputs, variantPrefs); break;
      case 'wordmark':   svgString = renderWordmark(inputs, variantPrefs); break;
      case 'lettermark': svgString = renderLettermark(inputs, variantPrefs); break;
      case 'mascot':     svgString = renderMascot(inputs, variantPrefs); break;
      case 'abstract':   svgString = renderAbstract(inputs, variantPrefs, cfg.layout); break;
      default:           svgString = renderMinimal(inputs, variantPrefs, cfg.layout);
    }

    return {
      id: `logo-${Date.now()}-${idx}`,
      svgString,
      templateStyle: cfg.templateStyle,
      layout: cfg.layout,
      primaryColor: variantPrefs.primaryColor,
      secondaryColor: variantPrefs.secondaryColor,
      fontStyle: cfg.fontStyle,
      prompt: promptString,
      label: cfg.label,
      score: 90 + (idx % 8),
    };
  });
}

export function regenerateSingleLogo(
  inputs: LogoInputs,
  prefs: DesignPrefs,
  existingLogo: GeneratedLogo
): GeneratedLogo {
  let svgString = '';
  switch (prefs.templateStyle) {
    case 'minimal':    svgString = renderMinimal(inputs, prefs, prefs.layout); break;
    case 'emblem':     svgString = renderEmblem(inputs, prefs); break;
    case 'wordmark':   svgString = renderWordmark(inputs, prefs); break;
    case 'lettermark': svgString = renderLettermark(inputs, prefs); break;
    case 'mascot':     svgString = renderMascot(inputs, prefs); break;
    case 'abstract':   svgString = renderAbstract(inputs, prefs, prefs.layout); break;
    default:           svgString = renderMinimal(inputs, prefs, prefs.layout);
  }

  return {
    ...existingLogo,
    svgString,
    primaryColor: prefs.primaryColor,
    secondaryColor: prefs.secondaryColor,
    templateStyle: prefs.templateStyle,
    layout: prefs.layout,
    fontStyle: prefs.fontStyle,
  };
}
