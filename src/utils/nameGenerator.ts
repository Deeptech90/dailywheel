export type NamingStyle = 'tech' | 'modern' | 'creative' | 'eco' | 'consulting';

const PREFIXES = {
  tech: ['Nex', 'Cyber', 'Synapse', 'Volt', 'Byte', 'Quantum', 'App', 'Cloud'],
  modern: ['Apex', 'Vero', 'Nova', 'Lumen', 'Zenith', 'Aura', 'Axis', 'Modo'],
  creative: ['Vibe', 'Pixel', 'Idea', 'Spark', 'Spire', 'Flow', 'Muse', 'Prism'],
  eco: ['Green', 'Bio', 'Eco', 'Terra', 'Flora', 'Enviro', 'Leaf', 'Root'],
  consulting: ['Prime', 'Alpha', 'Vanguard', 'Crest', 'Summit', 'Fortis', 'Omni', 'Sterling']
};

const SUFFIXES = {
  tech: ['ify', 'ly', 'io', 'tech', 'labs', 'grid', 'base', 'core'],
  modern: [' Co', ' Studio', ' Group', ' & Co', ' Global', ' Loft', ' Space', ' Line'],
  creative: ['ora', 'iva', 'ux', 'ia', 'verse', 'ology', 'scape', 'craft'],
  eco: ['wood', 'bloom', 'earth', 'vale', 'path', 'stone', 'field', 'crest'],
  consulting: [' Partners', ' Capital', ' Advisors', ' Consulting', ' Trust', ' Venture', ' Equity', ' Shield']
};

const BLENDS = {
  tech: ['engine', 'force', 'nexus', 'matrix', 'link', 'sphere'],
  modern: ['west', 'east', 'nord', 'south', 'arc', 'vibe'],
  creative: ['wave', 'shift', 'spin', 'bloom', 'glow', 'spark'],
  eco: ['wild', 'pure', 'fresh', 'grow', 'soil', 'wind'],
  consulting: ['peak', 'bridge', 'source', 'beacon', 'anchor', 'crest']
};

export function generateBusinessNames(keyword: string, style: NamingStyle): string[] {
  const kw = keyword.trim() ? keyword.trim() : 'Spark';
  // Capitalize keyword
  const cleanKw = kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase();

  const names = new Set<string>();
  const prefixes = PREFIXES[style];
  const suffixes = SUFFIXES[style];
  const blends = BLENDS[style];

  // Pattern 1: Keyword + Suffix (e.g. Keywordify)
  suffixes.forEach(s => {
    if (s.startsWith(' ') || s.startsWith(' &')) {
      names.add(`${cleanKw}${s}`);
    } else {
      names.add(`${cleanKw}${s.toLowerCase()}`);
    }
  });

  // Pattern 2: Prefix + Keyword (e.g. NexKeyword)
  prefixes.forEach(p => {
    names.add(`${p}${cleanKw}`);
  });

  // Pattern 3: Keyword + Blend (e.g. Keywordnexus)
  blends.forEach(b => {
    names.add(`${cleanKw} ${b.charAt(0).toUpperCase() + b.slice(1)}`);
  });

  // Convert set to array and shuffle
  const list = Array.from(names);
  const shuffled = list.sort(() => 0.5 - Math.random());

  // Return exactly 8 items (or up to 8)
  return shuffled.slice(0, 8);
}
