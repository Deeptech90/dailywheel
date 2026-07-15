export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  date: string;
  author: string;
  keywords: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-choose-a-business-name',
    title: 'How to Choose a Business Name: 7 Essential Rules',
    excerpt: 'Picking the right business name can make or break your brand. Learn the 7 unbreakable rules for naming your startup.',
    content: `
      <div class="toc">
        <h3>Table of Contents</h3>
        <ul>
          <li><a href="#keep-it-short">1. Keep it short and simple</a></li>
          <li><a href="#make-it-memorable">2. Make it memorable</a></li>
          <li><a href="#check-availability">3. Check availability</a></li>
          <li><a href="#dont-box-yourself">4. Don't box yourself in</a></li>
        </ul>
      </div>
      <h2 id="keep-it-short">1. Keep it short and simple</h2>
      <p>Your business name should be easy to pronounce, spell, and remember. Avoid complex words or weird spellings.</p>
      <h2 id="make-it-memorable">2. Make it memorable</h2>
      <p>A catchy name sticks in the customer's mind. Think about Apple or Google—simple, memorable, and distinct.</p>
      <h2 id="check-availability">3. Check availability</h2>
      <p>Before falling in love with a name, make sure the domain (.com) and social media handles are available.</p>
      <h2 id="dont-box-yourself">4. Don't box yourself in</h2>
      <p>Avoid names that limit your future growth. "Jeff's Shoe Repair" might restrict you if you decide to sell apparel later.</p>
      
      <div class="cta-block" style="background: rgba(168, 85, 247, 0.1); padding: 2rem; border-radius: 12px; margin-top: 2rem; border: 1px solid rgba(168, 85, 247, 0.3); text-align: center;">
        <h3 style="margin-top: 0;">Ready to find your perfect business name?</h3>
        <p>Use our AI-powered generator to instantly discover unique, brandable names for your startup.</p>
        <a href="/" style="display: inline-block; background: var(--primary); color: #fff; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 1rem;">Start Generating Now</a>
      </div>
    `,
    date: '2026-06-15',
    author: 'UBN Editorial Team',
    keywords: 'how to choose a business name, naming a startup, business naming tips'
  },
  {
    slug: 'startup-branding-guide-2026',
    title: 'The Ultimate Startup Branding Guide for 2026',
    excerpt: 'Branding is more than a logo. It is how the world perceives your business. Dive into the future of branding.',
    content: `
      <h2>The Shift in 2026</h2>
      <p>This year, branding has shifted from purely aesthetic to highly personal and mission-driven. Consumers care about what you stand for.</p>
      <h2>Visual Identity</h2>
      <p>Your visual identity needs to be adaptable across various platforms: from ultra-wide monitors to tiny smartwatches.</p>
      <h2>Brand Voice</h2>
      <p>Consistency is key. Whether you're playful, professional, or sarcastic, your brand voice must echo across every customer touchpoint.</p>
    `,
    date: '2026-06-22',
    author: 'Sarah Jenkins',
    keywords: 'startup branding guide, brand identity, 2026 branding trends'
  },
  {
    slug: 'domain-name-selection-tips',
    title: 'Should You Buy a .COM or an Alternative TLD?',
    excerpt: 'With the rise of .ai, .io, and .co, is the .com still king? We analyze the data behind successful domains.',
    content: `
      <h2>The Reign of .COM</h2>
      <p>The .com extension remains the most trusted and recognized TLD in the world. If you can get it, get it.</p>
      <h2>When to use .AI or .IO</h2>
      <p>For tech startups, .io and .ai have become highly acceptable. They signal innovation and are often much cheaper than their .com equivalents.</p>
    `,
    date: '2026-07-02',
    author: 'Michael Chang',
    keywords: 'domain names, dot com vs dot ai, choosing a TLD'
  },
  {
    slug: 'logo-inspiration-2026',
    title: 'Logo Inspiration: 5 Trends Dominating 2026',
    excerpt: 'From glassmorphism to brutalist typography, here is what is shaping the future of logo design.',
    content: `
      <h2>1. Glassmorphism</h2>
      <p>Frosted glass effects have taken over UI design, and now they are heavily influencing logos, providing a multi-dimensional feel.</p>
      <h2>2. Custom Typography</h2>
      <p>Brands are moving away from standard sans-serif fonts in favor of highly customized, bespoke typography.</p>
    `,
    date: '2026-07-10',
    author: 'UBN Design Team',
    keywords: 'logo inspiration, logo design trends 2026, startup logos'
  },
  {
    slug: 'brand-personality-archetypes',
    title: 'Finding Your Brand Personality Archetype',
    excerpt: 'Are you the Hero, the Magician, or the Outlaw? Understanding your brand archetype helps you connect with your audience.',
    content: `
      <h2>The 12 Archetypes</h2>
      <p>Jungian archetypes are powerful tools for brand building. They provide a blueprint for your brand's voice, aesthetic, and behavior.</p>
      <h2>How to Choose</h2>
      <p>Align your archetype with your target audience's aspirations. If you sell adventure gear, the Explorer archetype is a natural fit.</p>
    `,
    date: '2026-07-12',
    author: 'Emma Watson',
    keywords: 'brand archetypes, brand personality, branding psychology'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
