/* ============================================================
   Logo Maker — Type Definitions
   ============================================================ */

export type TemplateStyle = 'minimal' | 'emblem' | 'wordmark' | 'lettermark' | 'mascot' | 'abstract';
export type FontStyle = 'sans' | 'serif' | 'script' | 'geometric';
export type LayoutChoice = 'horizontal' | 'stacked' | 'icon-only' | 'text-only';
export type AspectRatio = '1:1' | '16:9' | '4:3';
export type ColorMode = 'rgb' | 'bw';
export type ExportFormat = 'svg' | 'png' | 'pdf';
export type PromptVariant = 'concise' | 'detailed' | 'creative' | 'minimalist';

export type Industry =
  | 'technology' | 'food-beverage' | 'health-wellness' | 'finance'
  | 'education' | 'retail' | 'creative-agency' | 'real-estate'
  | 'fashion' | 'sports' | 'travel' | 'legal' | 'non-profit' | 'other';

export type StyleKeyword =
  | 'modern' | 'minimalist' | 'elegant' | 'playful' | 'vintage' | 'corporate'
  | 'bold' | 'creative' | 'professional' | 'friendly' | 'luxurious' | 'eco';

export interface LogoInputs {
  businessName: string;
  tagline: string;
  industry: Industry;
  styleKeywords: StyleKeyword[];
  targetAudience: string;
  usageContexts: string[];
}

export interface DesignPrefs {
  primaryColor: string;
  secondaryColor: string;
  iconKeyword: string;
  fontStyle: FontStyle;
  layout: LayoutChoice;
  templateStyle: TemplateStyle;
  aspectRatio: AspectRatio;
  seed?: number;
}

export interface PromptSet {
  concise: string;
  detailed: string;
  creative: string;
  minimalist: string;
  negative: string;
  activeVariant: PromptVariant;
  customPrompt: string;
}

export interface GeneratedLogo {
  id: string;
  svgString: string;
  templateStyle: TemplateStyle;
  layout: LayoutChoice;
  primaryColor: string;
  secondaryColor: string;
  prompt: string;
  label: string;
}

export interface LogoMakerState {
  step: 1 | 2 | 3;
  inputs: LogoInputs;
  prefs: DesignPrefs;
  prompts: PromptSet | null;
  logos: GeneratedLogo[];
  selectedLogoId: string | null;
  isGenerating: boolean;
  generationError: string | null;
  showEditor: boolean;
  showPromptPreview: boolean;
}

/* ── Industry metadata ─────────────────────────────────────── */
export const INDUSTRIES: { id: Industry; label: string; icon: string }[] = [
  { id: 'technology',      label: 'Technology & Software', icon: '💻' },
  { id: 'food-beverage',   label: 'Food & Beverage',       icon: '🍕' },
  { id: 'health-wellness', label: 'Health & Wellness',     icon: '💪' },
  { id: 'finance',         label: 'Finance & Banking',     icon: '💰' },
  { id: 'education',       label: 'Education',             icon: '📚' },
  { id: 'retail',          label: 'Retail & E-commerce',   icon: '🛍️' },
  { id: 'creative-agency', label: 'Creative & Design',     icon: '🎨' },
  { id: 'real-estate',     label: 'Real Estate',           icon: '🏠' },
  { id: 'fashion',         label: 'Fashion & Apparel',     icon: '👗' },
  { id: 'sports',          label: 'Sports & Fitness',      icon: '⚽' },
  { id: 'travel',          label: 'Travel & Hospitality',  icon: '✈️' },
  { id: 'legal',           label: 'Legal & Consulting',    icon: '⚖️' },
  { id: 'non-profit',      label: 'Non-Profit & NGO',      icon: '🌱' },
  { id: 'other',           label: 'Other',                 icon: '✨' },
];

export const STYLE_KEYWORDS: StyleKeyword[] = [
  'modern', 'minimalist', 'elegant', 'playful', 'vintage', 'corporate',
  'bold', 'creative', 'professional', 'friendly', 'luxurious', 'eco',
];

export const TEMPLATE_STYLES: {
  id: TemplateStyle;
  label: string;
  description: string;
  icon: string;
  bestFor: string;
}[] = [
  { id: 'minimal',     label: 'Minimal',     icon: '◻', description: 'Clean & simple. One or two elements, no noise.',            bestFor: 'Tech, agencies, fashion' },
  { id: 'emblem',      label: 'Emblem',       icon: '🛡', description: 'Classic badge or crest with text inside a shape.',         bestFor: 'Education, sports, breweries' },
  { id: 'wordmark',    label: 'Wordmark',     icon: 'Aa', description: 'Text-only logo with distinctive typography.',              bestFor: 'Media, retail, tech giants' },
  { id: 'lettermark',  label: 'Lettermark',   icon: 'AB', description: 'Initials or monogram. Compact and memorable.',             bestFor: 'Legal, finance, consulting' },
  { id: 'mascot',      label: 'Mascot',       icon: '🦁', description: 'Character-driven illustration for a friendly brand.',      bestFor: 'Sports, kids, food' },
  { id: 'abstract',    label: 'Abstract',     icon: '◈',  description: 'Unique geometric or symbolic mark.',                       bestFor: 'Startups, design, health' },
];

/* ── Preset palettes ───────────────────────────────────────── */
export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
}

export const PRESET_PALETTES: ColorPalette[] = [
  { name: 'Ocean Blue',    primary: '#1D4ED8', secondary: '#06B6D4' },
  { name: 'Violet Dream',  primary: '#7C3AED', secondary: '#EC4899' },
  { name: 'Emerald',       primary: '#059669', secondary: '#34D399' },
  { name: 'Sunset',        primary: '#EA580C', secondary: '#FBBF24' },
  { name: 'Rose Gold',     primary: '#BE185D', secondary: '#F9A8D4' },
  { name: 'Midnight',      primary: '#1E293B', secondary: '#475569' },
  { name: 'Forest',        primary: '#166534', secondary: '#4ADE80' },
  { name: 'Crimson',       primary: '#DC2626', secondary: '#FCA5A5' },
  { name: 'Royal',         primary: '#312E81', secondary: '#A5B4FC' },
  { name: 'Copper',        primary: '#92400E', secondary: '#FCD34D' },
];
