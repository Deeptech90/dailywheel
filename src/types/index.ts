export type NamingStyle =
  | 'brandable'          // e.g., Google, Spotify, Vroom
  | 'compound'           // e.g., FedEx, Instagram, SnapChat
  | 'alternate-spelling' // e.g., Lyft, Flickr, Tumblr
  | 'real-word'          // e.g., Apple, Shell, Target
  | 'rhyming'            // e.g., FireWire, LeanBean, CrunchPunch
  | 'non-english'        // e.g., Terra, Novus, Lumina
  | 'multiple-words'     // e.g., Blue Horizon, Next Wave, Pure Flow
  | 'person-name';       // e.g., Harrison, Madison, Watson

export type RandomnessLevel = 'low' | 'medium' | 'high'; // 0.2, 0.7, 1.1

export type NameLengthFilter = 'all' | 'short' | 'medium' | 'long'; // short: 3-6, med: 6-12, long: 12+

export type TLD = '.com' | '.io' | '.ai' | '.app';

export type DomainStatus = 'available' | 'taken' | 'premium' | 'checking';

export interface DomainCheckResult {
  tld: TLD;
  domain: string;
  status: DomainStatus;
  priceEstimate?: string;
  registrarUrl?: string;
}

export interface GeneratedBusinessName {
  id: string;
  name: string;
  phonetic: string;
  meaning: string;
  style: NamingStyle;
  lengthCategory: 'short' | 'medium' | 'long';
  score: number;
  domains: Record<TLD, DomainStatus>;
  brandColors?: [string, string];
  industryCategory?: string;
  isSaved?: boolean;
}

export interface NamingFilterConfig {
  keywords: string;
  style: NamingStyle;
  randomness: RandomnessLevel;
  length: NameLengthFilter;
  industry?: string;
}

// ── SAAS & USER INTERFACES ──────────────────────────────────
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
  lastGenerationDate: number;
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
  shortDescription: string;
  longDescription: string;
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
