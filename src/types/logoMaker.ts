/* ============================================================
   Logo Maker — Visual Brand Suite Type Definitions
   ============================================================ */

export type TemplateStyle = 'minimal' | 'emblem' | 'wordmark' | 'lettermark' | 'mascot' | 'abstract' | 'badge' | 'modern-geo';
export type FontStyle = 'sans' | 'serif' | 'script' | 'geometric' | 'display' | 'mono';
export type LayoutChoice = 'horizontal' | 'stacked' | 'icon-only' | 'text-only' | 'badge-left' | 'emblem-center';
export type AspectRatio = '1:1' | '16:9' | '4:3';
export type ExportFormat = 'svg' | 'png' | 'pdf' | 'jpg';
export type PromptVariant = 'concise' | 'detailed' | 'creative' | 'minimalist';
export type MockupType = 'business-card' | 'mobile-screen' | 't-shirt' | 'storefront' | 'social-banner' | 'email-signature' | 'letterhead';

export type Industry =
  | 'technology' | 'saas' | 'food-beverage' | 'health-wellness' | 'finance'
  | 'education' | 'retail' | 'creative-agency' | 'real-estate'
  | 'fashion' | 'sports' | 'travel' | 'legal' | 'non-profit' | 'consulting' | 'other';

export type StyleKeyword =
  | 'modern' | 'minimalist' | 'elegant' | 'playful' | 'vintage' | 'corporate'
  | 'bold' | 'creative' | 'professional' | 'friendly' | 'luxurious' | 'eco';

export interface ColorPalette {
  id: string;
  name: string;
  category: string;
  primary: string;
  secondary: string;
  accent?: string;
  gradient?: [string, string];
}

export interface VectorSymbol {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svgPath: string;
  filled?: boolean;
}

export interface LogoInputs {
  businessName: string;
  tagline: string;
  industry: Industry;
  styleKeywords: StyleKeyword[];
  targetAudience: string;
  usageContexts: string[];
  selectedPalettes: string[]; // up to 3 palette IDs
  selectedSymbols: string[];  // up to 5 symbol IDs
}

export interface DesignPrefs {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  iconKeyword: string;
  symbolId?: string;
  fontStyle: FontStyle;
  layout: LayoutChoice;
  templateStyle: TemplateStyle;
  aspectRatio: AspectRatio;
  fontSize?: number;
  letterSpacing?: number;
  iconScale?: number;
  bgFill?: string;
  gradientAngle?: number;
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
  accentColor?: string;
  symbolId?: string;
  fontStyle: FontStyle;
  prompt: string;
  label: string;
  score?: number;
}

export interface LogoMakerState {
  step: 1 | 2 | 3 | 4 | 5 | 6; // 6-step guided wizard & editor
  inputs: LogoInputs;
  prefs: DesignPrefs;
  prompts: PromptSet | null;
  logos: GeneratedLogo[];
  selectedLogoId: string | null;
  isGenerating: boolean;
  generationError: string | null;
  showEditor: boolean;
  showPromptPreview: boolean;
  activeMockup: MockupType;
}

/* ── Industry metadata ─────────────────────────────────────── */
export const INDUSTRIES: { id: Industry; label: string; icon: string; desc: string }[] = [
  { id: 'technology',      label: 'Technology & AI',       icon: '💻', desc: 'Software, cloud, hardware, robotics' },
  { id: 'saas',            label: 'SaaS & Web Apps',       icon: '⚡', desc: 'Subscription software, B2B tools' },
  { id: 'food-beverage',   label: 'Food & Coffee Shop',    icon: '☕', desc: 'Cafes, bakeries, restaurants, bars' },
  { id: 'health-wellness', label: 'Health & Wellness',     icon: '🌿', desc: 'Clinics, fitness, supplements, yoga' },
  { id: 'finance',         label: 'Finance & Fintech',     icon: '💳', desc: 'Banking, crypto, investments, accounting' },
  { id: 'real-estate',     label: 'Real Estate & PropTech',icon: '🏠', desc: 'Brokers, property management, rentals' },
  { id: 'fashion',         label: 'Fashion & Apparel',     icon: '✨', desc: 'Clothing, jewelry, streetwear, luxury' },
  { id: 'retail',          label: 'E-commerce & Retail',   icon: '🛍️', desc: 'Online storefronts, boutique products' },
  { id: 'creative-agency', label: 'Creative & Marketing',  icon: '🎨', desc: 'Design studios, advertising, PR' },
  { id: 'education',       label: 'Education & EdTech',    icon: '📚', desc: 'E-learning, academies, tutoring' },
  { id: 'sports',          label: 'Sports & Athletics',    icon: '🏆', desc: 'Gyms, sports gear, personal training' },
  { id: 'travel',          label: 'Travel & Hospitality',  icon: '✈️', desc: 'Hotels, travel agencies, tour booking' },
  { id: 'legal',           label: 'Legal & Consulting',    icon: '⚖️', desc: 'Law firms, business coaching, advisory' },
  { id: 'consulting',      label: 'Professional Services', icon: '💼', desc: 'HR, staffing, operations, logistics' },
  { id: 'non-profit',      label: 'Eco & Non-Profit',      icon: '🌱', desc: 'Sustainability, charities, communities' },
  { id: 'other',           label: 'General & Other',       icon: '🌟', desc: 'All other innovative business concepts' },
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
  { id: 'minimal',     label: 'Minimal Clean', icon: '◻',  description: 'Clean & modern. Crisp iconography, zero clutter.',           bestFor: 'Tech, SaaS, fashion' },
  { id: 'emblem',      label: 'Emblem Crest',  icon: '🛡', description: 'Classic crest with balanced concentric geometry.',           bestFor: 'Breweries, academia, sports' },
  { id: 'wordmark',    label: 'Modern Wordmark', icon: 'Aa', description: 'Impactful typographic identity with custom accentuation.', bestFor: 'Media, retail, tech leaders' },
  { id: 'lettermark',  label: 'Monogram Mark', icon: 'AB', description: 'Iconic initials badge. Compact and memorable.',              bestFor: 'Finance, legal, agencies' },
  { id: 'abstract',    label: 'Abstract Geo',  icon: '◈',  description: 'Futuristic geometric mark expressing momentum.',              bestFor: 'AI startups, fintech, Web3' },
  { id: 'mascot',      label: 'Friendly Mascot',icon: '🦁', description: 'Character-driven visual mark with high engagement.',         bestFor: 'Consumer apps, food, gaming' },
];

/* ── Preset palettes (12 Curated Presets) ───────────────────── */
export const PRESET_PALETTES: ColorPalette[] = [
  { id: 'corporate-blue', name: 'Corporate Blue', category: 'Tech & Trust', primary: '#1D4ED8', secondary: '#06B6D4', accent: '#3B82F6', gradient: ['#1D4ED8', '#06B6D4'] },
  { id: 'tech-neon',      name: 'Tech Neon',       category: 'Modern & Bold', primary: '#0F172A', secondary: '#38BDF8', accent: '#818CF8', gradient: ['#0F172A', '#38BDF8'] },
  { id: 'violet-pulse',   name: 'Violet Pulse',    category: 'Creative', primary: '#7C3AED', secondary: '#EC4899', accent: '#F43F5E', gradient: ['#7C3AED', '#EC4899'] },
  { id: 'emerald-growth', name: 'Emerald Growth',  category: 'Nature & Wealth', primary: '#047857', secondary: '#10B981', accent: '#34D399', gradient: ['#047857', '#10B981'] },
  { id: 'minimal-mono',   name: 'Minimal Mono',    category: 'Sleek & Clean', primary: '#18181B', secondary: '#71717A', accent: '#27272A', gradient: ['#18181B', '#71717A'] },
  { id: 'warm-sunset',    name: 'Warm Sunset',     category: 'Vibrant', primary: '#EA580C', secondary: '#F59E0B', accent: '#FB7185', gradient: ['#EA580C', '#F59E0B'] },
  { id: 'luxury-gold',    name: 'Luxury Gold',     category: 'Premium', primary: '#1E1B4B', secondary: '#D97706', accent: '#FBBF24', gradient: ['#1E1B4B', '#D97706'] },
  { id: 'pastel-dream',   name: 'Pastel Dream',    category: 'Soft & Friendly', primary: '#4F46E5', secondary: '#A78BFA', accent: '#F472B6', gradient: ['#4F46E5', '#A78BFA'] },
  { id: 'crimson-fire',   name: 'Crimson Fire',    category: 'Bold & Dynamic', primary: '#DC2626', secondary: '#FB923C', accent: '#F43F5E', gradient: ['#DC2626', '#FB923C'] },
  { id: 'nordic-slate',   name: 'Nordic Slate',    category: 'Corporate', primary: '#334155', secondary: '#64748B', accent: '#0EA5E9', gradient: ['#334155', '#64748B'] },
  { id: 'cyberpunk',      name: 'Cyberpunk',       category: 'Futuristic', primary: '#831843', secondary: '#06B6D4', accent: '#F43F5E', gradient: ['#831843', '#06B6D4'] },
  { id: 'forest-earth',   name: 'Forest Earth',    category: 'Organic', primary: '#14532D', secondary: '#84CC16', accent: '#22C55E', gradient: ['#14532D', '#84CC16'] },
];
