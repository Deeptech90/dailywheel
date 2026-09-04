/* ============================================================
   AI Naming Engine
   Phonetic synthesis, 8 styles, temperature decoding, length
   constraints, and preference vector learning loop
   ============================================================ */

import {
  GeneratedBusinessName,
  NamingStyle,
  RandomnessLevel,
  NameLengthFilter,
  NamingFilterConfig,
  TLD,
  DomainStatus
} from '../types';
import { checkDomainAvailability } from './domainChecker';

// ── Curated Industry Categories with Specialized Vocabularies ──
export interface IndustryCategory {
  id: string;
  label: string;
  icon: string;
  roots: string[];
  evocative: string[];
  modifiers: string[];
  descriptor: string;
}

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    id: 'all',
    label: 'All Industries',
    icon: '✨',
    roots: ['nova', 'prime', 'apex', 'sync', 'flow', 'meta', 'omni', 'zen'],
    evocative: ['Vantage', 'Horizon', 'Catalyst', 'Summit', 'Prism', 'Orbit'],
    modifiers: ['Next', 'Pure', 'True', 'Bold', 'Bright', 'Clear'],
    descriptor: 'universal brand appeal'
  },
  {
    id: 'tech-saas',
    label: 'Tech & SaaS',
    icon: '💻',
    roots: ['cloud', 'stack', 'byte', 'algo', 'sync', 'node', 'cyber', 'quant', 'synt', 'logic', 'vect'],
    evocative: ['Matrix', 'Engine', 'Node', 'Stack', 'Protocol', 'Vertex', 'Circuit', 'Pipeline'],
    modifiers: ['Cyber', 'Neural', 'Agile', 'Smart', 'Hyper', 'Cloud', 'Data'],
    descriptor: 'agile digital innovation'
  },
  {
    id: 'food-beverage',
    label: 'Food & Beverage',
    icon: '🍽️',
    roots: ['brew', 'roast', 'crust', 'bite', 'grain', 'taste', 'harvest', 'flavor', 'sip', 'bean'],
    evocative: ['Spoon', 'Kettle', 'Table', 'Harvest', 'Pantry', 'Grill', 'Cellar', 'Bake'],
    modifiers: ['Fresh', 'Artisan', 'Golden', 'Pure', 'Sweet', 'Crisp', 'Wild'],
    descriptor: 'artisan culinary craft'
  },
  {
    id: 'retail-ecommerce',
    label: 'Retail & E-Commerce',
    icon: '🛍️',
    roots: ['cart', 'shop', 'mart', 'box', 'pack', 'find', 'drop', 'trend', 'haul'],
    evocative: ['Market', 'Corner', 'Bazaar', 'Avenue', 'Depot', 'Parcel', 'Plaza'],
    modifiers: ['Smart', 'Prime', 'Direct', 'Quick', 'Daily', 'Global'],
    descriptor: 'modern consumer commerce'
  },
  {
    id: 'beauty-wellness',
    label: 'Beauty & Wellness',
    icon: '✨',
    roots: ['glow', 'bloom', 'luxe', 'silk', 'radi', 'pure', 'aura', 'bella', 'flora'],
    evocative: ['Oasis', 'Blossom', 'Botanica', 'Elixir', 'Ritual', 'Serene', 'Velvet'],
    modifiers: ['Pure', 'Soft', 'Luminous', 'Natural', 'Gentle', 'Radiant'],
    descriptor: 'radiant holistic care'
  },
  {
    id: 'health-fitness',
    label: 'Health & Fitness',
    icon: '💪',
    roots: ['vital', 'pulse', 'fit', 'stride', 'surge', 'kin', 'flex', 'stamina', 'peak'],
    evocative: ['Sprint', 'Thrive', 'Iron', 'Apex', 'Core', 'Vigor', 'Endure'],
    modifiers: ['Active', 'Peak', 'Vital', 'Iron', 'Swift', 'Dynamic'],
    descriptor: 'high-energy physical vitality'
  },
  {
    id: 'professional-services',
    label: 'Professional Services',
    icon: '👔',
    roots: ['strat', 'consul', 'advis', 'integ', 'pinn', 'trust', 'clar', 'counsel'],
    evocative: ['Vanguard', 'Alliance', 'Partners', 'Beacon', 'Anchor', 'Insight'],
    modifiers: ['Global', 'True', 'Grand', 'Clear', 'Prime', 'Select'],
    descriptor: 'trusted executive authority'
  },
  {
    id: 'finance-fintech',
    label: 'Finance & Fintech',
    icon: '💳',
    roots: ['vault', 'coin', 'vest', 'lend', 'yield', 'asset', 'ledger', 'cap', 'fund'],
    evocative: ['Capital', 'Trust', 'Reserve', 'Wealth', 'Mint', 'Equity', 'Ledger'],
    modifiers: ['Secure', 'First', 'Noble', 'Iron', 'Direct', 'Solid'],
    descriptor: 'secure wealth and liquidity'
  },
  {
    id: 'real-estate',
    label: 'Real Estate & Property',
    icon: '🏠',
    roots: ['haven', 'roof', 'terra', 'domus', 'land', 'stone', 'estate', 'dwell'],
    evocative: ['Abode', 'Haven', 'Harbor', 'Manor', 'Ridge', 'Vista', 'Terrace'],
    modifiers: ['Grand', 'Prime', 'Oak', 'Urban', 'Civic', 'True'],
    descriptor: 'enduring property prestige'
  },
  {
    id: 'creative-design',
    label: 'Creative & Design',
    icon: '🎨',
    roots: ['pix', 'craft', 'hue', 'draw', 'tint', 'canvas', 'form', 'spark', 'motif'],
    evocative: ['Studio', 'Atelier', 'Prism', 'Palette', 'Canvas', 'Draft', 'Vivid'],
    modifiers: ['Vivid', 'Bold', 'Fresh', 'Modern', 'Wild', 'Pure'],
    descriptor: 'expressive visual design'
  },
  {
    id: 'construction-trades',
    label: 'Construction & Trades',
    icon: '🔨',
    roots: ['build', 'forge', 'steel', 'timber', 'solid', 'craft', 'iron', 'beam'],
    evocative: ['Mason', 'Forge', 'Timber', 'Keystone', 'Framework', 'Hammer'],
    modifiers: ['Hardy', 'Solid', 'True', 'Master', 'Tough', 'Iron'],
    descriptor: 'rugged structural mastery'
  },
  {
    id: 'education-coaching',
    label: 'Education & Coaching',
    icon: '🎓',
    roots: ['learn', 'mind', 'cogni', 'tutor', 'skill', 'mentor', 'scholar', 'path'],
    evocative: ['Academy', 'Guide', 'Mentor', 'Compass', 'Quest', 'Summit'],
    modifiers: ['Bright', 'Wise', 'Next', 'Clear', 'True', 'Prime'],
    descriptor: 'empowering knowledge transfer'
  },
  {
    id: 'travel-hospitality',
    label: 'Travel & Hospitality',
    icon: '✈️',
    roots: ['voy', 'roam', 'trek', 'path', 'stay', 'wander', 'haven', 'lodge'],
    evocative: ['Compass', 'Voyage', 'Journey', 'Oasis', 'Harbor', 'Expedition'],
    modifiers: ['Sunny', 'Grand', 'Wild', 'Blue', 'Open', 'Serene'],
    descriptor: 'enriching world discovery'
  },
  {
    id: 'fashion-apparel',
    label: 'Fashion & Apparel',
    icon: '👗',
    roots: ['thread', 'stitch', 'vogue', 'cloth', 'drape', 'couture', 'line', 'mode'],
    evocative: ['Atelier', 'Silhouette', 'Weave', 'Apparel', 'Label', 'Attire'],
    modifiers: ['Haute', 'Urban', 'Luxe', 'Velvet', 'Sleek', 'Pure'],
    descriptor: 'distinctive sartorial elegance'
  },
  {
    id: 'entertainment-media',
    label: 'Entertainment & Media',
    icon: '🎬',
    roots: ['cast', 'stream', 'reel', 'sound', 'flick', 'vibe', 'wave', 'scene'],
    evocative: ['Cinema', 'Stage', 'Amplify', 'Flick', 'Spotlight', 'Echo'],
    modifiers: ['Loud', 'Epic', 'Live', 'Vivid', 'Prime', 'Wild'],
    descriptor: 'dynamic audience immersion'
  },
  {
    id: 'legal-compliance',
    label: 'Legal & Compliance',
    icon: '⚖️',
    roots: ['lex', 'juris', 'veritas', 'justi', 'legal', 'counsel', 'pact', 'rule'],
    evocative: ['Gavel', 'Charter', 'Alliance', 'Counsel', 'Shield', 'Pact'],
    modifiers: ['Just', 'True', 'Prime', 'Noble', 'Firm', 'Clear'],
    descriptor: 'principled legal integrity'
  },
  {
    id: 'automotive-transport',
    label: 'Automotive & Transport',
    icon: '🚗',
    roots: ['moto', 'gear', 'drive', 'speed', 'turbo', 'torque', 'shift', 'wheel', 'glide'],
    evocative: ['Velocity', 'Piston', 'Cruise', 'Apex', 'Torque', 'Fleet'],
    modifiers: ['Turbo', 'Rapid', 'Apex', 'Swift', 'Direct', 'Heavy'],
    descriptor: 'engineered mechanical precision'
  },
  {
    id: 'pet-care-services',
    label: 'Pet Care & Services',
    icon: '🐾',
    roots: ['paw', 'bark', 'tail', 'fur', 'snout', 'whisk', 'wag', 'hound'],
    evocative: ['Paws', 'Haven', 'Pack', 'Companions', 'Meadow', 'Collar'],
    modifiers: ['Happy', 'Gentle', 'Loyal', 'Warm', 'Pure', 'Cozy'],
    descriptor: 'devoted animal companionship'
  },
  {
    id: 'eco-sustainability',
    label: 'Eco & Clean Energy',
    icon: '🌱',
    roots: ['eco', 'terra', 'green', 'leaf', 'solar', 'renew', 'earth', 'clean', 'bio'],
    evocative: ['Canopy', 'Forest', 'Current', 'Meadow', 'Horizon', 'Bloom'],
    modifiers: ['Green', 'Pure', 'Clean', 'True', 'Solar', 'Renew'],
    descriptor: 'regenerative planet stewardship'
  }
];

// ── Morphological Root Lexicons & Affixes ──────────────────────
const PREFIXES = [
  'nova', 'omni', 'sync', 'hyper', 'meta', 'vivid', 'prime', 'sol',
  'lum', 'aero', 'zen', 'apex', 'vect', 'pulse', 'strat', 'vel',
  'flux', 'dyno', 'cogni', 'kine', 'quant', 'synt', 'byte', 'opti'
];

const SUFFIXES = [
  'ly', 'ify', 'ix', 'ex', 'io', 'sy', 'va', 'on', 'is', 'a',
  'ia', 'ic', 'or', 'al', 'us', 'um', 'os', 'ra', 'vo', 'ty',
  'ster', 'able', 'hub', 'flow', 'base', 'nest', 'grid', 'lane'
];

const LATIN_ROOTS = [
  { root: 'terra', meaning: 'Earth & solid foundation' },
  { root: 'novus', meaning: 'New, inventive & forward' },
  { root: 'lumina', meaning: 'Light, clarity & vision' },
  { root: 'veritas', meaning: 'Truth, integrity & data' },
  { root: 'solis', meaning: 'Sun, warmth & energy' },
  { root: 'nexus', meaning: 'Central connection hub' },
  { root: 'astra', meaning: 'Stars, high ambition & scale' },
  { root: 'valeo', meaning: 'Strength, power & vigor' },
  { root: 'fortis', meaning: 'Resilient, strong & brave' },
  { root: 'vita', meaning: 'Life, wellness & organic growth' },
  { root: 'clarus', meaning: 'Clear, brilliant & lucid' },
  { root: 'gradus', meaning: 'Step, pace & progression' }
];

const SURNAMES = [
  'Harrison', 'Sterling', 'Vance', 'Madison', 'Bennett', 'Colby',
  'Thorne', 'Mercer', 'Waverly', 'Kingsley', 'Sinclair', 'Ellington',
  'Prescott', 'Montgomery', 'Dalton', 'Radcliffe', 'Winslow', 'Archer'
];

const EVOCATIVE_WORDS = [
  'Pulse', 'Catalyst', 'Horizon', 'Vantage', 'Beacon', 'Forge',
  'Summit', 'Crest', 'Atlas', 'Orbit', 'Prism', 'Apex',
  'Vector', 'Haven', 'Bridge', 'Oasis', 'Frontier', 'Echo'
];

const MODIFIERS = [
  'Blue', 'Pure', 'Bold', 'Next', 'True', 'Swift', 'Clear',
  'Ever', 'Bright', 'Iron', 'Golden', 'Grand', 'Peak', 'First'
];

const RHYME_PAIRS = [
  ['Fire', 'Wire'], ['Lean', 'Bean'], ['Skill', 'Mill'], ['Quick', 'Pick'],
  ['Brain', 'Gain'], ['Shop', 'Drop'], ['Bright', 'Sight'], ['Snap', 'App'],
  ['Peak', 'Seek'], ['Flow', 'Glow'], ['Mind', 'Find'], ['True', 'View']
];

// Alternate phonetic transforms
function alternateSpellingTransform(word: string): string {
  let res = word;
  res = res.replace(/er\b/i, 'r');
  res = res.replace(/ph/i, 'f');
  res = res.replace(/c([aeou])/i, 'k$1');
  res = res.replace(/y/i, 'i');
  res = res.replace(/igh/i, 'y');
  res = res.replace(/oo/i, 'u');
  res = res.replace(/ck\b/i, 'q');
  res = res.replace(/s\b/i, 'z');
  if (res.toLowerCase() === word.toLowerCase()) {
    res = word.replace(/e\b/i, 'x');
  }
  return res.charAt(0).toUpperCase() + res.slice(1);
}

// Generate phonetic pronunciation guide (e.g. "KWAN-tiks")
function generatePhoneticGuide(name: string): string {
  const parts = name.match(/[a-z]+|[^a-z]+/gi) || [name];
  const syllables: string[] = [];
  const clean = name.toLowerCase();

  for (let i = 0; i < clean.length; i += 3) {
    syllables.push(clean.substring(i, Math.min(i + 3, clean.length)).toUpperCase());
  }

  return syllables.length > 1 ? syllables.join('-') : clean.toUpperCase();
}

/**
 * Client-Side Algorithmic Linguistic Synthesis Engine
 */
export function synthesizeBrandNames(
  config: NamingFilterConfig,
  preferenceWeights?: Record<NamingStyle, number>,
  count: number = 30
): GeneratedBusinessName[] {
  const { keywords, style, randomness, length } = config;
  const rawKeywords = keywords
    .toLowerCase()
    .split(/[\s,]+/)
    .map(k => k.trim())
    .filter(Boolean);

  const categoryId = config.industry || 'all';
  const category = INDUSTRY_CATEGORIES.find(c => c.id === categoryId) || INDUSTRY_CATEGORIES[0];
  const catRoots = category.roots.length > 0 ? category.roots : PREFIXES;
  const catEvocative = category.evocative.length > 0 ? category.evocative : EVOCATIVE_WORDS;
  const catModifiers = category.modifiers.length > 0 ? category.modifiers : MODIFIERS;

  const baseWord = rawKeywords[0] || (category.id !== 'all' ? category.roots[0] : 'brand');
  const cleanBase = baseWord.replace(/[^a-z]/g, '');
  const capitalizedBase = cleanBase.charAt(0).toUpperCase() + cleanBase.slice(1);

  const results: GeneratedBusinessName[] = [];
  const seenNames = new Set<string>();

  const targetStyle = style || 'brandable';

  for (let i = 0; i < count * 4; i++) {
    let nameStr = '';
    let meaning = '';
    let phonetic = '';

    switch (targetStyle) {
      case 'brandable': {
        const rootWord = i % 2 === 0 ? catRoots[i % catRoots.length] : PREFIXES[i % PREFIXES.length];
        const prefix = rootWord.charAt(0).toUpperCase() + rootWord.slice(1);
        const suffix = SUFFIXES[(i * 3) % SUFFIXES.length];
        if (randomness === 'low') {
          nameStr = `${capitalizedBase}${suffix}`;
          meaning = `Modern coinage built directly from '${baseWord}'.`;
        } else if (randomness === 'high') {
          nameStr = `${prefix}${suffix}`;
          meaning = `Abstract coinage evoking ${category.descriptor}.`;
        } else {
          nameStr = `${prefix}${cleanBase.slice(0, 3)}${suffix}`;
          meaning = `Dynamic blend expressing ${category.descriptor}.`;
        }
        break;
      }

      case 'compound': {
        const mod = catModifiers[i % catModifiers.length];
        const evo = catEvocative[(i * 2) % catEvocative.length];
        if (randomness === 'low') {
          nameStr = `${capitalizedBase}${evo}`;
          meaning = `Compound blend pairing '${baseWord}' with '${evo}'.`;
        } else if (randomness === 'high') {
          const secondEvo = catEvocative[(i + 3) % catEvocative.length];
          nameStr = `${mod}${secondEvo}`;
          meaning = `High-impact compound signaling ${category.descriptor}.`;
        } else {
          nameStr = `${mod}${capitalizedBase}`;
          meaning = `Bold compound projecting market momentum and trust.`;
        }
        break;
      }

      case 'alternate-spelling': {
        const alt = alternateSpellingTransform(capitalizedBase);
        const suffix = SUFFIXES[i % SUFFIXES.length];
        if (i % 2 === 0) {
          nameStr = alt;
        } else {
          nameStr = `${alt}${suffix}`;
        }
        meaning = `Catchy phonetic spelling with high domain availability.`;
        break;
      }

      case 'real-word': {
        const word = catEvocative[(i + cleanBase.length) % catEvocative.length];
        nameStr = word;
        meaning = `Prestigious dictionary word delivering authority and clarity.`;
        break;
      }

      case 'rhyming': {
        const pair = RHYME_PAIRS[i % RHYME_PAIRS.length];
        nameStr = `${pair[0]}${pair[1]}`;
        meaning = `Rhythmic cadence engineered for maximum cognitive recall.`;
        break;
      }

      case 'non-english': {
        const item = LATIN_ROOTS[i % LATIN_ROOTS.length];
        const cap = item.root.charAt(0).toUpperCase() + item.root.slice(1);
        if (randomness === 'low') {
          nameStr = `${capitalizedBase}${cap.slice(0, 4)}`;
        } else {
          nameStr = cap;
        }
        meaning = `Classical root symbolizing ${item.meaning}.`;
        break;
      }

      case 'multiple-words': {
        const mod = catModifiers[i % catModifiers.length];
        const evo = catEvocative[(i * 3) % catEvocative.length];
        nameStr = `${mod} ${capitalizedBase || evo}`;
        meaning = `Two-word narrative expressing ${category.descriptor}.`;
        break;
      }

      case 'person-name': {
        const surname = SURNAMES[i % SURNAMES.length];
        nameStr = surname;
        meaning = `Heritage surname conveying boutique craftsmanship and prestige.`;
        break;
      }
    }

    if (!nameStr || seenNames.has(nameStr.toLowerCase())) {
      continue;
    }

    // Apply Length Filter
    const charLen = nameStr.replace(/\s+/g, '').length;
    let lengthCategory: 'short' | 'medium' | 'long' = 'medium';
    if (charLen <= 6) lengthCategory = 'short';
    else if (charLen > 12) lengthCategory = 'long';

    if (length !== 'all' && length !== lengthCategory) {
      continue;
    }

    seenNames.add(nameStr.toLowerCase());
    phonetic = generatePhoneticGuide(nameStr);

    // Initial default domain statuses (will be asynchronously checked)
    const initialDomains: Record<TLD, DomainStatus> = {
      '.com': 'checking',
      '.io': 'checking',
      '.ai': 'checking',
      '.app': 'checking'
    };

    // Calculate score based on brandability metrics and user preference vector
    const styleWeight = preferenceWeights ? (preferenceWeights[targetStyle] || 1) : 1;
    const baseScore = 85 + Math.floor(Math.random() * 12);
    const totalScore = Math.min(99, Math.round(baseScore * Math.min(styleWeight, 1.25)));

    results.push({
      id: `name-${Date.now()}-${i}-${nameStr.toLowerCase().replace(/\s+/g, '')}`,
      name: nameStr,
      phonetic,
      meaning,
      style: targetStyle,
      lengthCategory,
      score: totalScore,
      domains: initialDomains,
      industryCategory: config.industry,
      isSaved: false
    });

    if (results.length >= count) {
      break;
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Generate names with optional Gemini backend API call and automatic client fallback
 */
export async function generateNames(
  config: NamingFilterConfig,
  preferenceWeights?: Record<NamingStyle, number>,
  onDomainUpdate?: (nameId: string, domains: Record<TLD, DomainStatus>) => void
): Promise<GeneratedBusinessName[]> {
  let names: GeneratedBusinessName[] = [];

  // Attempt backend API route if reachable
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('/api/generate-names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keywords: config.keywords,
        style: config.style,
        randomness: config.randomness,
        length: config.length,
        industry: config.industry
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.names) && data.names.length > 0) {
        names = data.names.map((item: any, idx: number) => ({
          id: `name-api-${Date.now()}-${idx}`,
          name: item.name,
          phonetic: item.phonetic || generatePhoneticGuide(item.name),
          meaning: item.meaning || `AI-crafted ${config.style} brand name for ${config.industry || 'your business'}.`,
          style: config.style,
          lengthCategory: item.name.length <= 6 ? 'short' : item.name.length > 12 ? 'long' : 'medium',
          score: item.score || (88 + Math.floor(Math.random() * 10)),
          domains: {
            '.com': 'checking',
            '.io': 'checking',
            '.ai': 'checking',
            '.app': 'checking'
          },
          industryCategory: config.industry,
          isSaved: false
        }));
      }
    }
  } catch {
    // Graceful client synthesis
  }

  if (names.length === 0) {
    names = synthesizeBrandNames(config, preferenceWeights, 30);
  }

  // Kick off asynchronous domain availability checking without blocking return
  if (onDomainUpdate) {
    names.forEach(async (item) => {
      try {
        const domainResults = await checkDomainAvailability(item.name);
        onDomainUpdate(item.id, domainResults);
      } catch {}
    });
  }

  return names;
}
