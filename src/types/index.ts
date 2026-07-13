export interface Segment {
  id: string;
  label: string;
  color: string;
  /** Optional metadata for animal mode */
  icon?: string;
  trait?: string;
}

export type WheelMode = 'business' | 'daily' | 'animal';

// ── SAAS INTERFACES ────────────────────────────────────────

export type PlanType = 'free' | 'pro' | 'business';

export interface SubscriptionData {
  plan: PlanType;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface UserStats {
  generationsToday: number;
  lastGenerationDate: number; // YYYY-MM-DD string or timestamp
  referralsCount: number;
  referralCode: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  subscription: SubscriptionData;
  stats: UserStats;
  isAdmin: boolean;
}

// ── BRAND KIT INTERFACES ────────────────────────────────────

export interface BrandIntelligence {
  meaning: string;
  whyItWorks: string;
  personality: string;
  targetAudience: string;
  brandVoice: string;
  industry: string;
  memorabilityScore: number;
  pronunciationScore: number;
  uniquenessScore: number;
}

export interface BrandStory {
  shortDescription: string; // 50-word
  longDescription: string;  // 100-word
  aboutUs: string;
  elevatorPitch: string;
  mission: string;
  vision: string;
  coreValues: string[];
}

export interface BrandIdentity {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: [string, string];
  traits: string[];
}

export interface BrandTypography {
  headingFont: string;
  bodyFont: string;
}

export interface DomainSuggestion {
  tld: string;
  domain: string;
  available: boolean;
  alternative?: string;
}

export interface SocialHandle {
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'X' | 'YouTube' | 'TikTok';
  handle: string;
  available: boolean;
}

export interface LogoConcept {
  id: string;
  iconIdea: string;
  style: string;
  colors: string[];
  typography: string;
}

export interface BrandKit {
  name: string;
  category: string;
  intelligence: BrandIntelligence;
  taglines: string[];
  story: BrandStory;
  identity: BrandIdentity;
  typography: BrandTypography;
  domains: DomainSuggestion[];
  socials: SocialHandle[];
  logos: LogoConcept[];
  createdAt: number;
  lastModified: number;
}

// ── EXISTING INTERFACES ────────────────────────────────────

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  angle: number;
  angularVelocity: number;
  shape: 'circle' | 'star' | 'rect';
}

export interface SpinResult {
  id: string;
  segment: Segment;
  timestamp: number;
}

export interface FloatingOrb {
  el: HTMLElement;
  originX: number;
  originY: number;
  animation: Animation | null;
}

export type AppState = {
  segments: Segment[];
  history: SpinResult[];
  isSpinning: boolean;
  soundEnabled: boolean;
  spinDirection: 1 | -1;  // 1 = CW, -1 = CCW
  showResult: boolean;
  currentResult: Segment | null;
  showEdit: boolean;
  showHistory: boolean;
  wheelMode: WheelMode;
};

export type AppAction =
  | { type: 'SPIN_START' }
  | { type: 'SPIN_END'; result: Segment }
  | { type: 'CLOSE_RESULT' }
  | { type: 'SET_SEGMENTS'; segments: Segment[] }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_DIRECTION' }
  | { type: 'TOGGLE_EDIT' }
  | { type: 'TOGGLE_HISTORY' }
  | { type: 'SET_MODE'; mode: WheelMode }
  | { type: 'HYDRATE_STATE'; segments: Segment[]; history: SpinResult[]; soundEnabled: boolean }
  | { type: 'HYDRATE'; payload: { segments: Segment[]; history: SpinResult[]; soundEnabled: boolean; wheelMode: WheelMode } }
  | { type: 'SET_HISTORY'; payload: SpinResult[] };
