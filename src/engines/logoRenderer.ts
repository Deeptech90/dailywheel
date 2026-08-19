/* ============================================================
   Logo Renderer — Client-side SVG logo generation engine
   Produces high-quality structured SVG strings for 6 template styles
   ============================================================ */

import { LogoInputs, DesignPrefs, GeneratedLogo, TemplateStyle, LayoutChoice } from '../types/logoMaker';
import { findIconByKeyword, renderIconSvg } from './svgIcons';

/* ── Font stack mapping ──────────────────────────────────────── */
const FONT_MAP: Record<string, string> = {
  sans:      "'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif:     "'Georgia', 'Times New Roman', Times, serif",
  script:    "'Dancing Script', 'Brush Script MT', cursive",
  geometric: "'Outfit', 'Futura', 'Century Gothic', sans-serif",
};

/* ── Hex → RGB ───────────────────────────────────────────────── */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

/* ── Lightness helper (for text contrast) ────────────────────── */
function isLight(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return lum > 0.5;
}

function contrastText(bg: string): string {
  return isLight(bg) ? '#1a1a2e' : '#ffffff';
}

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
    <dc:title>${esc(inputs.businessName)} Logo</dc:title>
    <dc:creator>UniqueBusinessName.com Logo Maker</dc:creator>
    <dc:date>${now}</dc:date>
    <dc:subject>${esc(inputs.businessName)}, logo, ${inputs.industry}, ${inputs.styleKeywords.join(', ')}</dc:subject>
    <dc:description>Generated logo for ${esc(inputs.businessName)} — Template: ${prefs.templateStyle}, Layout: ${prefs.layout}</dc:description>
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
  const bgRect = bg ? `<rect width="${w}" height="${h}" fill="${bg}" rx="0"/>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:dc="http://purl.org/dc/elements/1.1/" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <style>
      .logo-name { font-family: ${FONT_MAP[prefs.fontStyle] ?? FONT_MAP.sans}; }
      .logo-tag  { font-family: ${FONT_MAP[prefs.fontStyle] ?? FONT_MAP.sans}; }
    </style>
  </defs>
  ${buildMetadata(inputs, prefs)}
  ${bgRect}
  ${inner}
</svg>`;
}

/* ════════════════════════════════════════════════════════════════
   TEMPLATE RENDERERS
   ════════════════════════════════════════════════════════════════ */

/* ── MINIMAL ─────────────────────────────────────────────────── */
function renderMinimal(inputs: LogoInputs, prefs: DesignPrefs, layout: LayoutChoice): string {
  const W = 480, H = 160;
  const icon = findIconByKeyword(prefs.iconKeyword);
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const fontSize = Math.max(28, Math.min(48, Math.floor(280 / (name.length || 1))));
  const tagSize = 14;

  if (layout === 'text-only' || layout === 'wordmark' as LayoutChoice) {
    const inner = `
    <text x="240" y="${tagline ? 80 : 90}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="700" fill="${primary}">${name}</text>
    ${tagline ? `<text x="240" y="${80 + fontSize + 8}" class="logo-tag"
      text-anchor="middle" font-size="${tagSize}" font-weight="400" fill="${secondary}" letter-spacing="2">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs);
  }

  if (layout === 'icon-only') {
    const iconStr = icon.filled
      ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
      : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
    const iconSize = 80;
    const cx = W / 2 - iconSize / 2;
    const cy = H / 2 - iconSize / 2;
    const inner = `<g transform="translate(${cx}, ${cy}) scale(${iconSize / 24})">${iconStr}</g>`;
    return wrap(inner, W, H, inputs, prefs);
  }

  if (layout === 'stacked') {
    const iconSize = 56;
    const totalH = iconSize + 8 + fontSize + (tagline ? tagSize + 4 : 0);
    const startY = (H - totalH) / 2;
    const iconCX = W / 2 - iconSize / 2;
    const iconStr = icon.filled
      ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
      : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
    const inner = `
    <g transform="translate(${iconCX}, ${startY}) scale(${iconSize / 24})">${iconStr}</g>
    <text x="240" y="${startY + iconSize + 8 + fontSize * 0.8}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="700" fill="${primary}">${name}</text>
    ${tagline ? `<text x="240" y="${startY + iconSize + 8 + fontSize + tagSize + 4}" class="logo-tag"
      text-anchor="middle" font-size="${tagSize}" fill="${secondary}" letter-spacing="1.5">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs);
  }

  // Horizontal (default)
  const iconSize = 52;
  const iconX = 40;
  const iconY = (H - iconSize) / 2;
  const textX = iconX + iconSize + 20;
  const iconStr = icon.filled
    ? `<g fill="${primary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
    : `<g fill="none" stroke="${primary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
  const inner = `
    <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 24})">${iconStr}</g>
    <text x="${textX}" y="${tagline ? H / 2 - 4 : H / 2 + fontSize * 0.35}" class="logo-name"
      font-size="${fontSize}" font-weight="700" fill="${primary}">${name}</text>
    ${tagline ? `<text x="${textX}" y="${H / 2 + 16}" class="logo-tag"
      font-size="${tagSize}" fill="${secondary}" letter-spacing="1.5">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ── EMBLEM ──────────────────────────────────────────────────── */
function renderEmblem(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 280, H = 280;
  const cx = W / 2, cy = H / 2;
  const r = 120;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const icon = findIconByKeyword(prefs.iconKeyword);
  const iconSize = 48;
  const iconStr = icon.filled
    ? `<g fill="${secondary}">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>'
    : `<g fill="none" stroke="${secondary}" stroke-width="${icon.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">` + (icon.paths ? icon.paths.map(p => `<path d="${p}"/>`).join('') : `<path d="${icon.path}"/>`) + '</g>';
  const fontSize = Math.max(14, Math.min(22, Math.floor(200 / (name.length || 1))));

  const inner = `
    <!-- Outer ring -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${primary}" stroke="${secondary}" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 10}" fill="none" stroke="${secondary}" stroke-width="1" stroke-dasharray="4 3"/>
    <!-- Icon -->
    <g transform="translate(${cx - iconSize / 2}, ${cy - iconSize / 2 - 18}) scale(${iconSize / 24})">${iconStr}</g>
    <!-- Name -->
    <text x="${cx}" y="${cy + iconSize / 2 - 2}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="800" fill="${secondary}" letter-spacing="1">${name.toUpperCase()}</text>
    ${tagline ? `<text x="${cx}" y="${cy + iconSize / 2 + 18}" class="logo-tag"
      text-anchor="middle" font-size="10" fill="${secondary}" letter-spacing="2" opacity="0.85">${tagline.toUpperCase()}</text>` : ''}
    <!-- Bottom divider lines -->
    <line x1="${cx - 40}" y1="${cy + iconSize / 2 + (tagline ? 26 : 8)}" x2="${cx - 8}" y2="${cy + iconSize / 2 + (tagline ? 26 : 8)}" stroke="${secondary}" stroke-width="1" opacity="0.6"/>
    <line x1="${cx + 8}" y1="${cy + iconSize / 2 + (tagline ? 26 : 8)}" x2="${cx + 40}" y2="${cy + iconSize / 2 + (tagline ? 26 : 8)}" stroke="${secondary}" stroke-width="1" opacity="0.6"/>`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ── WORDMARK ────────────────────────────────────────────────── */
function renderWordmark(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 540, H = 140;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  // Make first letter accent-colored
  const firstLetter = name.charAt(0);
  const rest = name.slice(1);
  const fontSize = Math.max(36, Math.min(72, Math.floor(480 / (name.length || 1))));
  const textY = tagline ? H / 2 + fontSize * 0.35 - 10 : H / 2 + fontSize * 0.35;

  const inner = `
    <!-- Accent underline bar -->
    <rect x="30" y="${textY + 8}" width="${Math.min(fontSize * 0.7, 60)}" height="4" fill="${secondary}" rx="2"/>
    <!-- First letter accent -->
    <text x="30" y="${textY}" class="logo-name"
      font-size="${fontSize}" font-weight="800" fill="${secondary}">${firstLetter}</text>
    <!-- Rest of name -->
    <text x="${30 + fontSize * 0.65}" y="${textY}" class="logo-name"
      font-size="${fontSize}" font-weight="800" fill="${primary}">${rest}</text>
    ${tagline ? `<text x="30" y="${textY + fontSize * 0.25 + 16}" class="logo-tag"
      font-size="13" fill="${secondary}" letter-spacing="3" opacity="0.9">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ── LETTERMARK ──────────────────────────────────────────────── */
function renderLettermark(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 220, H = 220;
  const cx = W / 2, cy = H / 2;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = inputs.businessName.replace(/[^a-zA-Z]/g, '');
  // Get initials: first letter of each word, max 3
  const initials = (inputs.businessName.match(/\b\w/g) ?? [name.charAt(0)])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const fontSize = initials.length === 1 ? 100 : 64;
  const contrastColor = contrastText(primary);

  const inner = `
    <!-- Background shape -->
    <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="${primary}" rx="20"/>
    <!-- Inner accent corner -->
    <rect x="40" y="40" width="${(W - 80) * 0.4}" height="4" fill="${secondary}" rx="2" opacity="0.8"/>
    <rect x="${W - 40 - (W - 80) * 0.4}" y="${H - 44}" width="${(W - 80) * 0.4}" height="4" fill="${secondary}" rx="2" opacity="0.8"/>
    <!-- Initials -->
    <text x="${cx}" y="${cy + fontSize * 0.38}" class="logo-name"
      text-anchor="middle" font-size="${fontSize}" font-weight="900" fill="${contrastColor}">${initials}</text>
    <!-- Tiny full name below -->
    <text x="${cx}" y="${H - 28}" class="logo-tag"
      text-anchor="middle" font-size="10" fill="${contrastColor}" opacity="0.7" letter-spacing="2">${esc(inputs.businessName.toUpperCase())}</text>`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ── MASCOT (stylized character using SVG shapes) ────────────── */
function renderMascot(inputs: LogoInputs, prefs: DesignPrefs): string {
  const W = 360, H = 320;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const cx = W / 2;

  // Stylized mascot shape: friendly circular character
  const inner = `
    <!-- Body -->
    <circle cx="${cx}" cy="130" r="80" fill="${primary}"/>
    <!-- Eyes -->
    <circle cx="${cx - 22}" cy="115" r="14" fill="white"/>
    <circle cx="${cx + 22}" cy="115" r="14" fill="white"/>
    <circle cx="${cx - 19}" cy="118" r="7" fill="${secondary}"/>
    <circle cx="${cx + 25}" cy="118" r="7" fill="${secondary}"/>
    <circle cx="${cx - 17}" cy="116" r="3" fill="#1a1a2e"/>
    <circle cx="${cx + 27}" cy="116" r="3" fill="#1a1a2e"/>
    <!-- Highlight in eyes -->
    <circle cx="${cx - 15}" cy="113" r="2" fill="white"/>
    <circle cx="${cx + 29}" cy="113" r="2" fill="white"/>
    <!-- Smile -->
    <path d="M${cx - 22} 145 Q${cx} 168 ${cx + 22} 145" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <!-- Cheeks -->
    <circle cx="${cx - 40}" cy="148" r="12" fill="${secondary}" opacity="0.5"/>
    <circle cx="${cx + 40}" cy="148" r="12" fill="${secondary}" opacity="0.5"/>
    <!-- Ears -->
    <circle cx="${cx - 77}" cy="110" r="18" fill="${primary}"/>
    <circle cx="${cx + 77}" cy="110" r="18" fill="${primary}"/>
    <circle cx="${cx - 77}" cy="110" r="10" fill="${secondary}" opacity="0.6"/>
    <circle cx="${cx + 77}" cy="110" r="10" fill="${secondary}" opacity="0.6"/>
    <!-- Name -->
    <text x="${cx}" y="250" class="logo-name"
      text-anchor="middle" font-size="28" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="${cx}" y="278" class="logo-tag"
      text-anchor="middle" font-size="12" fill="${secondary}" letter-spacing="1.5">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ── ABSTRACT ────────────────────────────────────────────────── */
function renderAbstract(inputs: LogoInputs, prefs: DesignPrefs, layout: LayoutChoice): string {
  const W = 480, H = 160;
  const primary = prefs.primaryColor;
  const secondary = prefs.secondaryColor;
  const name = esc(inputs.businessName);
  const tagline = inputs.tagline ? esc(inputs.tagline) : '';
  const fontSize = Math.max(24, Math.min(44, Math.floor(260 / (name.length || 1))));

  if (layout === 'stacked') {
    // Stacked: abstract mark above text
    const inner = `
      <!-- Abstract geometric mark -->
      <g transform="translate(${W / 2 - 40}, 10)">
        <circle cx="20" cy="28" r="22" fill="${primary}" opacity="0.9"/>
        <circle cx="42" cy="18" r="16" fill="${secondary}" opacity="0.8"/>
        <rect x="28" y="24" width="30" height="30" rx="6" fill="${primary}" opacity="0.5"/>
      </g>
      <text x="${W / 2}" y="105" class="logo-name"
        text-anchor="middle" font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
      ${tagline ? `<text x="${W / 2}" y="128" class="logo-tag"
        text-anchor="middle" font-size="13" fill="${secondary}" letter-spacing="2">${tagline.toUpperCase()}</text>` : ''}`;
    return wrap(inner, W, H, inputs, prefs);
  }

  // Horizontal
  const inner = `
    <!-- Abstract mark -->
    <g transform="translate(28, ${H / 2 - 38})">
      <circle cx="20" cy="20" r="20" fill="${primary}" opacity="0.9"/>
      <circle cx="38" cy="12" r="14" fill="${secondary}" opacity="0.8"/>
      <rect x="26" y="18" width="26" height="26" rx="5" fill="${primary}" opacity="0.45"/>
    </g>
    <!-- Divider line -->
    <line x1="100" y1="${H / 2 - 24}" x2="100" y2="${H / 2 + 24}" stroke="${primary}" stroke-width="2" opacity="0.3"/>
    <text x="118" y="${tagline ? H / 2 - 2 : H / 2 + fontSize * 0.38}" class="logo-name"
      font-size="${fontSize}" font-weight="800" fill="${primary}">${name}</text>
    ${tagline ? `<text x="118" y="${H / 2 + 18}" class="logo-tag"
      font-size="13" fill="${secondary}" letter-spacing="2">${tagline.toUpperCase()}</text>` : ''}`;
  return wrap(inner, W, H, inputs, prefs);
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT: generateLogoVariants
   Generates 4–6 logo variants across template/layout combinations
   ════════════════════════════════════════════════════════════════ */

interface LogoVariantConfig {
  templateStyle: TemplateStyle;
  layout: LayoutChoice;
  swapColors?: boolean;
  label: string;
}

function getVariantConfigs(prefs: DesignPrefs): LogoVariantConfig[] {
  const style = prefs.templateStyle;

  const configMap: Record<TemplateStyle, LogoVariantConfig[]> = {
    minimal: [
      { templateStyle: 'minimal', layout: 'horizontal', label: 'Minimal Horizontal' },
      { templateStyle: 'minimal', layout: 'stacked',    label: 'Minimal Stacked' },
      { templateStyle: 'minimal', layout: 'icon-only',  label: 'Icon Only' },
      { templateStyle: 'minimal', layout: 'horizontal', swapColors: true, label: 'Minimal Alt Colors' },
    ],
    emblem: [
      { templateStyle: 'emblem', layout: 'stacked', label: 'Classic Emblem' },
      { templateStyle: 'emblem', layout: 'stacked', swapColors: true, label: 'Emblem Alt' },
      { templateStyle: 'abstract', layout: 'horizontal', label: 'Abstract Companion' },
      { templateStyle: 'minimal', layout: 'horizontal', label: 'Minimal Variant' },
    ],
    wordmark: [
      { templateStyle: 'wordmark', layout: 'horizontal', label: 'Wordmark Primary' },
      { templateStyle: 'wordmark', layout: 'horizontal', swapColors: true, label: 'Wordmark Alt' },
      { templateStyle: 'minimal',  layout: 'text-only' as LayoutChoice,  label: 'Text Only' },
      { templateStyle: 'lettermark', layout: 'stacked', label: 'Lettermark Pair' },
    ],
    lettermark: [
      { templateStyle: 'lettermark', layout: 'stacked',    label: 'Lettermark Square' },
      { templateStyle: 'lettermark', layout: 'horizontal', swapColors: true, label: 'Lettermark Alt' },
      { templateStyle: 'wordmark',   layout: 'horizontal', label: 'Wordmark Companion' },
      { templateStyle: 'minimal',    layout: 'horizontal', label: 'Minimal Text' },
    ],
    mascot: [
      { templateStyle: 'mascot',   layout: 'stacked',    label: 'Mascot Full' },
      { templateStyle: 'mascot',   layout: 'stacked',    swapColors: true, label: 'Mascot Alt' },
      { templateStyle: 'emblem',   layout: 'stacked',    label: 'Emblem Variant' },
      { templateStyle: 'minimal',  layout: 'horizontal', label: 'Minimal Companion' },
    ],
    abstract: [
      { templateStyle: 'abstract', layout: 'horizontal', label: 'Abstract Horizontal' },
      { templateStyle: 'abstract', layout: 'stacked',    label: 'Abstract Stacked' },
      { templateStyle: 'abstract', layout: 'horizontal', swapColors: true, label: 'Abstract Alt' },
      { templateStyle: 'minimal',  layout: 'stacked',    label: 'Minimal Variant' },
    ],
  };

  return configMap[style] ?? configMap.minimal;
}

export function generateLogoVariants(
  inputs: LogoInputs,
  prefs: DesignPrefs,
  promptString: string,
): GeneratedLogo[] {
  const configs = getVariantConfigs(prefs);

  return configs.map((cfg, idx) => {
    // Possibly swap primary/secondary
    const variantPrefs: DesignPrefs = cfg.swapColors
      ? { ...prefs, primaryColor: prefs.secondaryColor, secondaryColor: prefs.primaryColor, templateStyle: cfg.templateStyle, layout: cfg.layout }
      : { ...prefs, templateStyle: cfg.templateStyle, layout: cfg.layout };

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
      prompt: promptString,
      label: cfg.label,
    };
  });
}

/* ── Single logo update (for editor re-renders) ──────────────── */
export function regenerateSingleLogo(
  inputs: LogoInputs,
  prefs: DesignPrefs,
  existingLogo: GeneratedLogo,
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
  return { ...existingLogo, svgString, primaryColor: prefs.primaryColor, secondaryColor: prefs.secondaryColor };
}
