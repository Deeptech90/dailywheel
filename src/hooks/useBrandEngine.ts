import { BrandKit, BrandIntelligence, BrandStory, BrandIdentity, BrandTypography, DomainSuggestion, SocialHandle, LogoConcept } from '../types';

// Deterministic random generator based on a string seed
function seedRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function select<T>(arr: T[], seedFunc: () => number): T {
  return arr[seedFunc() % arr.length];
}

function selectMultiple<T>(arr: T[], count: number, seedFunc: () => number): T[] {
  const result: T[] = [];
  const cloned = [...arr];
  for (let i = 0; i < count; i++) {
    if (cloned.length === 0) break;
    const index = seedFunc() % cloned.length;
    result.push(cloned.splice(index, 1)[0]);
  }
  return result;
}

const MEANINGS = [
  "A fusion of innovation and reliability, implying a forward-thinking approach built on solid foundations.",
  "Evokes a sense of trust, community, and approachable expertise.",
  "Suggests rapid growth, breaking boundaries, and leading the industry into the future.",
  "Implies warmth, accessibility, and a customer-first mindset.",
  "Represents premium quality, unparalleled service, and exclusive experiences.",
  "A bold statement of disruption, challenging the status quo with creative solutions.",
  "Radiates harmony, balance, and a holistic approach to business.",
];

const WHY_IT_WORKS = [
  "The concise syllable structure makes it highly memorable and easy to pronounce globally.",
  "The combination of soft and hard consonants creates a rhythmic, catchy cadence.",
  "It leverages familiar phonetic patterns while remaining entirely unique, reducing cognitive load.",
  "The abstract nature of the name allows the brand to pivot across industries without rebranding.",
  "It directly taps into modern naming trends, instantly signaling a contemporary, tech-savvy brand.",
];

const PERSONALITIES = [
  "Bold & Confident", "Creative & Playful", "Professional & Trustworthy", 
  "Modern & Innovative", "Friendly & Approachable", "Premium & Luxurious",
  "Energetic & Dynamic", "Calm & Grounded", "Rebellious & Disruptive"
];

const TARGET_AUDIENCES = [
  "Tech-savvy millennials and Gen Z looking for disruptive solutions.",
  "Established enterprise clients seeking reliable, B2B services.",
  "Health-conscious consumers valuing transparency and wellness.",
  "Creatives and freelancers who prioritize aesthetics and usability.",
  "Affluent individuals looking for exclusive, high-end experiences.",
  "Families and community-driven individuals seeking dependable products."
];

const BRAND_VOICES = [
  "Authoritative, clear, and professional.",
  "Witty, conversational, and slightly irreverent.",
  "Empathetic, warm, and supportive.",
  "Visionary, inspiring, and forward-looking.",
  "Minimalist, direct, and sophisticated."
];

const TAGLINES = [
  "Think Differently. Grow Boldly.", "Innovation at Every Step.", "Your Vision, Our Mission.",
  "Excellence, Simplified.", "Where Ideas Become Reality.", "Building Tomorrow, Today.",
  "Simply Better.", "Empowering Your Potential.", "Experience the Extraordinary.",
  "Driven by Passion, Defined by Results.", "Connecting You to What Matters.",
  "The Smart Choice for a Brighter Future.", "Redefining the Standard.",
  "Unleash Your Creativity.", "Trust in Every Interaction."
];

const FONTS_HEADING = ["Inter", "Outfit", "Playfair Display", "Montserrat", "Poppins", "Oswald", "Syne", "Space Grotesk"];
const FONTS_BODY = ["Roboto", "Lato", "Open Sans", "Nunito", "Source Sans Pro", "Work Sans", "DM Sans", "Inter"];

const LOGO_STYLES = ["Minimalist Monogram", "Abstract Geometric", "Friendly Mascot", "Elegant Wordmark", "Vintage Emblem", "Dynamic Gradient Icon"];
const LOGO_ICONS = ["Abstract Leaf", "Interlocking Rings", "Upward Arrow", "Minimalist Infinity", "Stylized Crown", "Origami Fold", "Digital Wave", "Glowing Orb"];

export function generateBrandKit(name: string, category: string): BrandKit {
  const rand = seedRandom(name + category);

  // Intelligence
  const syllables = name.replace(/[^aeiouy]/gi, '').length || 1;
  const len = name.length;
  
  const intelligence: BrandIntelligence = {
    meaning: select(MEANINGS, rand),
    whyItWorks: select(WHY_IT_WORKS, rand),
    personality: select(PERSONALITIES, rand),
    targetAudience: select(TARGET_AUDIENCES, rand),
    brandVoice: select(BRAND_VOICES, rand),
    industry: category !== 'general' ? category.charAt(0).toUpperCase() + category.slice(1) : 'Technology & Innovation',
    memorabilityScore: Math.floor(75 + (rand() % 25)), // 75-99
    pronunciationScore: syllables <= 2 ? 98 : syllables <= 4 ? 85 : 70,
    uniquenessScore: Math.floor(70 + (rand() % 28)) // 70-98
  };

  // Taglines
  const taglines = selectMultiple(TAGLINES, 5, rand);

  // Story
  const story: BrandStory = {
    shortDescription: `${name} is a forward-thinking ${intelligence.industry} brand dedicated to providing innovative solutions. By focusing on ${intelligence.personality.toLowerCase()} values, we empower our ${intelligence.targetAudience.toLowerCase().split(' ')[0]} to achieve more.`,
    longDescription: `Founded on the principles of excellence and innovation, ${name} has quickly become a beacon in the ${intelligence.industry} space. Our journey began with a simple idea: to make complex challenges simple. Today, we stand as a testament to what happens when you combine a ${intelligence.brandVoice.toLowerCase()} with relentless dedication. We don't just offer products; we build lasting relationships with our community.`,
    aboutUs: `At ${name}, we believe in pushing boundaries. Our team is a diverse group of thinkers and makers who share a passion for creating impactful experiences. We are driven by our commitment to quality and our unwavering belief in our customers' potential.`,
    elevatorPitch: `For ${intelligence.targetAudience.toLowerCase().split(' ')[0]}s who need reliable solutions, ${name} is the ${intelligence.industry} platform that delivers ${intelligence.personality.toLowerCase()} experiences unlike anyone else.`,
    mission: `To empower our users through accessible, high-quality solutions that enrich their daily lives.`,
    vision: `To be the global standard for excellence and innovation in the ${intelligence.industry} sector.`,
    coreValues: ["Innovation", "Integrity", "Customer Success", "Simplicity", "Excellence"]
  };

  // Identity
  const hue1 = rand() % 360;
  const hue2 = (hue1 + 45) % 360;
  const hue3 = (hue1 + 180) % 360;
  const identity: BrandIdentity = {
    primaryColor: `hsl(${hue1}, 75%, 55%)`,
    secondaryColor: `hsl(${hue2}, 65%, 50%)`,
    accentColor: `hsl(${hue3}, 70%, 60%)`,
    gradient: [`hsl(${hue1}, 75%, 55%)`, `hsl(${hue2}, 75%, 45%)`],
    traits: selectMultiple(PERSONALITIES, 3, rand)
  };

  // Typography
  const typography: BrandTypography = {
    headingFont: select(FONTS_HEADING, rand),
    bodyFont: select(FONTS_BODY, rand)
  };

  // Domains
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const domains: DomainSuggestion[] = ['.com', '.co', '.io', '.ai', '.net', '.org', '.in'].map(tld => {
    // Deterministically mock availability (make .com rare, .io/.ai common for tech, etc)
    const isTech = category === 'tech' || category === 'ai_startup' || category === 'startup';
    let available = (rand() % 100) > 40; 
    if (tld === '.com') available = (rand() % 100) > 85; // .com is hard to get
    if ((tld === '.io' || tld === '.ai') && isTech) available = (rand() % 100) > 50;

    return {
      tld,
      domain: `${slug}${tld}`,
      available,
      alternative: available ? undefined : `${slug}hq${tld}`
    };
  });

  // Socials
  const socials: SocialHandle[] = ['Instagram', 'Facebook', 'LinkedIn', 'X', 'YouTube', 'TikTok'].map(platform => {
    const available = (rand() % 100) > 30; // 70% chance available
    return {
      platform: platform as any,
      handle: available ? `@${slug}` : `@${slug}official`,
      available
    };
  });

  // Logos
  const logos: LogoConcept[] = Array.from({ length: 4 }).map((_, i) => {
    const lHue = (hue1 + (i * 90)) % 360;
    return {
      id: `logo-${i + 1}`,
      iconIdea: select(LOGO_ICONS, rand),
      style: select(LOGO_STYLES, rand),
      colors: [`hsl(${lHue}, 70%, 50%)`, `hsl(${(lHue + 40) % 360}, 60%, 40%)`],
      typography: select(FONTS_HEADING, rand)
    };
  });

  return {
    name,
    category,
    intelligence,
    taglines,
    story,
    identity,
    typography,
    domains,
    socials,
    logos,
    createdAt: Date.now(),
    lastModified: Date.now()
  };
}
