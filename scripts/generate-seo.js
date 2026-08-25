import fs from 'fs';
import path from 'path';

// ── Industry list (matches app data) ──────────────────────────────────────────
const industries = [
  "Restaurant", "Cafe", "Bakery", "Salon", "Gym", "Real Estate", "Construction Company",
  "Medical Store", "AI Startup", "YouTube Channel", "Podcast", "Clothing Brand",
  "Jewelry Brand", "Technology Company", "Travel Agency", "Marketing Agency", "Law Firm",
  "Accounting Firm", "Photography Studio", "Cleaning Service", "Landscaping Business",
  "Plumbing Company", "Electrician", "HVAC Company", "Roofing Company", "Pest Control",
  "Auto Repair Shop", "Car Wash", "Towing Company", "Moving Company", "Storage Facility",
  "Event Planning", "Wedding Planner", "Catering Service", "Food Truck", "Ice Cream Shop",
  "Coffee Shop", "Bar", "Nightclub", "Brewery", "Winery", "Liquor Store", "Dispensary",
  "Yoga Studio", "Pilates Studio", "Martial Arts School", "Dance Studio", "Crossfit Gym",
  "Personal Trainer", "Massage Therapy", "Chiropractor", "Dental Clinic", "Veterinary Clinic",
  "Pet Grooming", "Dog Walking", "Pet Store", "Hardware Store", "Furniture Store",
  "Antique Shop", "Thrift Store", "Bookstore", "Florist", "Gift Shop", "Toy Store",
  "Sporting Goods Store", "Bicycle Shop", "Music Store", "Art Gallery", "Tattoo Shop",
  "Barbershop", "Nail Salon", "Spa", "Cosmetics Brand", "Skincare Brand", "Haircare Brand",
  "Supplement Brand", "Fitness Apparel", "Shoe Brand", "Bag Brand", "Watch Brand",
  "Sunglass Brand", "Tech Startup", "SaaS Company", "App Development", "Web Design",
  "Graphic Design", "SEO Agency", "Social Media Agency", "PR Agency", "Copywriting Service",
  "Translation Service", "Tutoring Service", "Language School", "Driving School", "Daycare Center",
  "Preschool", "Private School", "Summer Camp", "Coworking Space", "Hotel", "Motel",
  "Bed and Breakfast", "Hostel", "Property Management", "Architectural Firm", "Interior Design",
  "Home Staging", "Security Company", "Private Investigator", "Courier Service", "Logistics Company",
  "Trucking Company", "Freight Broker", "Import Export Business", "Manufacturing Company",
  "Wholesale Business", "Dropshipping Store", "Subscription Box", "Etsy Shop", "Amazon FBA",
  "Affiliate Marketing", "Blogging", "Vlogging", "Twitch Streamer", "Esports Team",
  "Game Development", "VR Startup", "AR Startup", "Crypto Startup", "NFT Project",
  "Web3 Company", "Fintech Startup", "Healthtech Startup", "Edtech Startup", "Proptech Startup",
  "Cleantech Startup", "Agtech Startup", "SpaceTech Startup", "Biotech Startup", "Robotics Company",
  "Drone Company", "3D Printing Service", "Consulting Firm", "Life Coach", "Business Coach",
  "Career Counselor", "Therapist", "Psychiatrist", "Nutritionist", "Dietitian", "Personal Chef",
  "Food Delivery", "Grocery Delivery", "Laundry Service", "Dry Cleaner", "Tailor", "Shoe Repair",
  "Locksmith", "Handyman", "Painter", "Carpenter", "Welder", "Masonry Contractor",
  "Pool Cleaning", "Snow Removal", "Window Cleaning", "Carpet Cleaning", "Upholstery Cleaning",
  "Junk Removal", "Recycling Center", "Scrap Metal", "Towing Service", "Taxi Service",
  "Limo Service", "Party Bus", "Boat Rental", "RV Rental", "Bike Rental", "Scooter Rental",
  "Surf Shop", "Dive Shop", "Ski Shop", "Snowboard Shop", "Skate Shop", "Record Store",
  "Comic Book Store", "Hobby Shop", "Craft Store", "Fabric Store", "Yarn Shop", "Stationery Store",
  "Party Supply Store", "Costume Shop", "Magic Shop", "Joke Shop", "Smoke Shop", "Vape Shop",
  "CBD Shop", "Kratom Shop", "Vitamin Store", "Health Food Store", "Farmer's Market",
  "Butcher Shop", "Seafood Market", "Cheese Shop", "Wine Shop", "Beer Store"
];

const blogs = [
  { slug: 'create-logo-for-business-guide', title: 'How to Create a Logo for Business: Free Logo Design, Templates & Vector Downloads (2026)', desc: 'Looking to create a logo for business? Learn how to create logo free, customize free logo design templates, and download print-ready vector SVGs with our free online logo maker and download suite.' },
  { slug: 'company-logo-maker-guide', title: 'The Ultimate Company Logo Maker Guide: AI, 3D Mockups & Free Brand Identity (2026)', desc: 'Discover how to use an AI company logo maker to generate company name logo maker free assets, test company 3d logo maker mockups, and build memorable brand marks.' },
  { slug: 'business-name-generator-with-logo-guide', title: 'Free Business Name Generator With Logo: How to Create Brand Ideas & Vector Logos in 2026', desc: 'Looking for a free business name generator with logo? Discover how to generate AI business name ideas, compare against Namelix, and design free vector logos with our logo maker and logo generator.' },
  { slug: 'indian-business-name-generator-guide', title: 'Indian Business Name Ideas & Startup Naming Guide (2026)', desc: 'Explore catchy Indian business name ideas for startups, retail, tech, and D2C brands. Learn how to use our AI business name generator indian engine to create culturally resonant names with available domains.' },
  { slug: 'business-name-generators-guide', title: 'The Complete Guide to Business Name Generators: Finding the Best Names for Companies in 2026', desc: 'Looking for the best name generator for a business or company generator name? Compare top business name generators, explore naming styles, and discover how to generate high-conversion brand names.' },
  { slug: 'how-to-choose-a-business-name', title: 'How to Choose a Business Name: 7 Essential Rules', desc: 'Picking the right business name can make or break your brand. Here are the seven rules every founder should follow.' },
  { slug: 'startup-branding-guide-2026', title: 'The Ultimate Startup Branding Guide for 2026', desc: 'Branding is more than a logo. Learn how to build a cohesive brand identity from day one.' },
  { slug: 'domain-name-selection-tips', title: 'Should You Buy a .COM or an Alternative TLD?', desc: 'With the rise of .ai, .io, and .co, is the .com still king? We break down the pros and cons.' },
  { slug: 'logo-inspiration-2026', title: 'Logo Inspiration: 5 Trends Dominating 2026', desc: 'From glassmorphism to brutalist typography — the logo styles shaping modern brands in 2026.' },
  { slug: 'brand-personality-archetypes', title: 'Finding Your Brand Personality Archetype', desc: 'Are you the Hero, the Magician, or the Outlaw? Discover which archetype fits your brand.' }
];

const competitors = [
  { slug: 'namelix', name: 'Namelix', title: 'Top Namelix Alternative (2026) | UniqueBusinessName vs Namelix', desc: 'Searching for a free Namelix alternative? Discover UniqueBusinessName: AI business names, real-time .com domain verification, and 1-click vector logo generation.' },
  { slug: 'looka', name: 'Looka', title: 'Best Looka Name Generator Alternative (2026) | UniqueBusinessName', desc: 'Looking for a Looka business name generator alternative? Generate catchy brand names and export high-res vector logos without expensive subscriptions.' },
  { slug: 'business-name-generator', name: 'BusinessNameGenerator.com', title: 'Top BusinessNameGenerator.com Alternative (2026) | UniqueBusinessName', desc: 'Tired of generic names and ad-heavy pages on BusinessNameGenerator.com? Experience AI-driven brandable names with instant DNS checks and logo makers.' },
  { slug: 'godaddy', name: 'GoDaddy', title: 'GoDaddy Name Generator Alternative (2026) | UniqueBusinessName', desc: 'Looking for a GoDaddy Business Name Generator alternative? Get creative AI brand names with unbiased domain checks and free vector logos.' },
  { slug: 'canva', name: 'Canva', title: 'Canva Name Generator Alternative (2026) | UniqueBusinessName', desc: 'Searching for a Canva business name generator alternative? Discover brandable AI names, live domain lookups, and instant logo exports.' },
  { slug: 'design-com', name: 'Design.com', title: 'Design.com Name Generator Alternative (2026) | UniqueBusinessName', desc: 'Looking for a free Design.com name generator alternative? Generate unique business names with instant domain verification and free vector logos.' }
];

const SITE_URL = 'https://uniquebusinessname.com';
const DIST_DIR = path.resolve('dist');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-name-generator';
}

// ── Homepage pre-rendered HTML content (injected into <div id="root">) ────────
const HOMEPAGE_PRERENDER_CONTENT = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <noscript>
      <style>
        .seo-prerender{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
        .seo-prerender h1{font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem;letter-spacing:-0.03em}
        .seo-prerender h2{font-size:1.5rem;font-weight:800;margin:2rem 0 0.75rem;letter-spacing:-0.02em}
        .seo-prerender h3{font-size:1.1rem;font-weight:700;margin:1.5rem 0 0.5rem}
        .seo-prerender p,.seo-prerender li{line-height:1.7;color:#4B5563;margin-bottom:0.75rem}
        .seo-prerender ol,.seo-prerender ul{padding-left:1.5rem}
        .seo-prerender .faq-item{margin-bottom:1.5rem;border-bottom:1px solid #e5e7eb;padding-bottom:1.5rem}
        .seo-prerender .faq-q{font-weight:700;color:#111827;margin-bottom:0.5rem}
      </style>
    </noscript>
    <main class="seo-prerender">
      <h1>AI Business Name Generator &amp; Company Logo Maker &mdash; Free Logo Design &amp; Vector Downloads</h1>
      <p>
        UniqueBusinessName.com is the #1 <strong>company logo maker</strong> and <strong>business name generator</strong> suite.
        <strong>Create logo for business</strong>, explore <strong>free online logo maker and download</strong> templates, generate <strong>company name logo maker free</strong> assets,
        and test <strong>company 3d logo maker</strong> mockups with instant vector SVG and PNG downloads.
      </p>

      <h2>How to Create Logo for Business and Generate Brand Names</h2>
      <ol>
        <li><strong>Enter Business Concepts &amp; Keywords</strong> &mdash; Generate brandable company names or type your existing venture title.</li>
        <li><strong>Select AI Free or No AI Naming Modes</strong> &mdash; Customize decoding temperature for creative neural coinages or dictionary words.</li>
        <li><strong>Launch Free Online Logo Maker and Download</strong> &mdash; Select &ldquo;Create Logo with This Name&rdquo; to launch our interactive <strong>logo design online</strong> canvas.</li>
        <li><strong>Customize Templates &amp; 3D Mockups</strong> &mdash; Explore <strong>free logo design templates</strong>, monograms, and test <strong>company 3d logo maker</strong> mockups.</li>
        <li><strong>Creative Logo Design Free Download</strong> &mdash; Export vector SVG, 2048px transparent PNG, and PDF brand guidelines with 100% commercial ownership.</li>
      </ol>

      <h2>Key Logo Maker &amp; Brand Features</h2>

      <h3>1. Company Logo Maker AI &amp; Free Vector Exports</h3>
      <p>
        Our <strong>company logo maker free</strong> engine synthesizes balanced typography, harmonious colors, and scalable icons with zero subscription paywalls.
      </p>

      <h3>2. Free Logo Design Templates &amp; Name Logo Design</h3>
      <p>
        Discover high-impact <strong>free logo design templates</strong> for tech startups, boutique agencies, retail shops, and corporate consulting.
      </p>

      <h3>3. Company 3D Logo Maker &amp; Mockup Studio</h3>
      <p>
        Preview your brand on photorealistic business cards, storefront signs, mobile apps, and apparel before publishing.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <p class="faq-q">How do I create a logo for business using this company logo maker free?</p>
        <p>Simply enter your business name, choose an aesthetic style, customize typography and colors in the live editor, and download vector SVG and PNG files instantly.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">Is this a free online logo maker and download platform?</p>
        <p>Yes! UniqueBusinessName offers 100% free logo design and download with full commercial rights and zero watermarks.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">What file formats are included with creative logo design free download?</p>
        <p>You can export vector SVG files, high-resolution transparent PNGs at 512px, 1024px, and 2048px resolutions, and print-ready PDF brand sheets.</p>
      </div>

      <p><a href="/logo-maker">Try the Company Logo Maker</a> &bull; <a href="/blog/create-logo-for-business-guide">Read the Create Logo for Business Guide</a> &bull; <a href="/blog/company-logo-maker-guide">Company Logo Maker Guide</a> &bull; <a href="/pricing">View Pro Features</a></p>
    </main>
  </div>
</div>`;

// ── Logo Maker pre-rendered content ──────────────────────────────────────────
const LOGO_MAKER_PRERENDER = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">Create Logo for Business Free &mdash; Company Logo Maker &amp; 3D Logo Generator</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Welcome to the #1 <strong>company logo maker</strong> and <strong>free online logo maker and download</strong> suite.
        Whether you need to <strong>create logo free</strong>, design a modern <strong>company name logo maker</strong> mark, explore <strong>free logo design templates</strong>,
        or render <strong>company 3d logo maker</strong> mockups, our studio provides infinite-resolution vector SVG, transparent PNG, and PDF brand packages with 100% full commercial ownership.
      </p>

      <h2 style="font-size:1.4rem;font-weight:800;margin:2rem 0 0.75rem">How to Create Logo for Business Online</h2>
      <ol style="padding-left:1.5rem;line-height:1.7;color:#4B5563">
        <li><strong>Enter Company Name &amp; Tagline</strong> &mdash; Input your brand title to generate custom typography and <strong>name logo design</strong>.</li>
        <li><strong>Choose Aesthetic Archetype</strong> &mdash; Select Minimalist, Modern Gradient, Geometric, Tech Studio, or <strong>company stamp logo maker</strong> styles.</li>
        <li><strong>Customize in Live Canvas</strong> &mdash; Adjust font pairings, letter-spacing, icon scales, and curated color palettes in our <strong>logo design online</strong> studio.</li>
        <li><strong>Preview on 3D Mockups</strong> &mdash; See your logo rendered onto business cards, mobile app interfaces, apparel, and storefronts.</li>
        <li><strong>Creative Logo Design Free Download</strong> &mdash; Download print-ready vector SVGs and transparent PNGs up to 2048px with zero paywalls.</li>
      </ol>

      <h2 style="font-size:1.4rem;font-weight:800;margin:2rem 0 0.75rem">Company Logo Maker Features</h2>
      <ul style="padding-left:1.5rem;line-height:1.7;color:#4B5563">
        <li><strong>Company Logo Maker AI:</strong> Intelligent icon matching and automated typography balancing.</li>
        <li><strong>Company Name Logo Maker Free:</strong> Monograms, initials, and bespoke wordmark designs.</li>
        <li><strong>Free Logo Design Templates:</strong> 50+ pre-built layout compositions and design frameworks.</li>
        <li><strong>Company 3D Logo Maker:</strong> Real-time realistic lighting and material mockup studio.</li>
        <li><strong>Full Commercial Ownership:</strong> Trademark and use your logo everywhere without attribution.</li>
      </ul>

      <p style="margin-top:2rem;color:#4B5563"><a href="/">Back to AI Business Name Generator</a> &bull; <a href="/blog/create-logo-for-business-guide">How to Create Logo for Business Guide</a> &bull; <a href="/blog/company-logo-maker-guide">Company Logo Maker Guide</a></p>
    </main>
  </div>
</div>`;

async function main() {
  console.log('🚀 Starting Post-Build SEO Generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Please run vite build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  let sitemapEntries = [
    { url: '/',                priority: '1.0', changefreq: 'daily' },
    { url: '/logo-maker',      priority: '0.9', changefreq: 'monthly' },
    { url: '/about',           priority: '0.7', changefreq: 'monthly' },
    { url: '/pricing',         priority: '0.8', changefreq: 'monthly' },
    { url: '/blog',            priority: '0.8', changefreq: 'weekly' },
    { url: '/contact',         priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy',         priority: '0.4', changefreq: 'monthly' },
    { url: '/terms',           priority: '0.4', changefreq: 'monthly' },
  ];

  // ── Patch homepage HTML with pre-rendered content ─────────────────────────
  const patchIndexHtml = (htmlTemplate, prerenderContent, opts = {}) => {
    const {
      title = 'AI Business Name Generator With Logo — Free Business Name Ideas & Logo Maker | UniqueBusinessName.com',
      description = 'Generate brandable names with the #1 free AI business name generator with logo. Discover creative business name ideas, Indian startup names, Namelix alternatives, and create vector logos with our free logo maker & logo generator.',
      canonical = `${SITE_URL}/`,
      ogTitle = 'AI Business Name Generator With Logo — Free Business Name Ideas & Logo Maker',
      ogDescription = 'Free AI business name generator with logo. Generate catchy business name ideas, Indian brand names, check live domains, and export vector logos instantly.',
      ogUrl = `${SITE_URL}/`,
      extraSchema = '',
    } = opts;

    return htmlTemplate
      // Update title
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      // Update description
      .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
      // Update canonical
      .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
      // Update OG tags
      .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${ogTitle}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${ogDescription}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${ogUrl}" />`)
      // Inject extra schema before </head> if provided
      .replace('</head>', `${extraSchema}\n  </head>`)
      // Replace empty root div with pre-rendered content
      .replace('<div id="root"></div>', prerenderContent);
  };

  // ── Helper: write a static route shell ────────────────────────────────────
  const writeStaticPage = (routePath, prerenderContent, opts = {}) => {
    const fullDir = path.join(DIST_DIR, routePath);
    if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
    const modifiedHtml = patchIndexHtml(indexHtml, prerenderContent, opts);
    fs.writeFileSync(path.join(fullDir, 'index.html'), modifiedHtml);
  };

  // ── Homepage ──────────────────────────────────────────────────────────────
  const homepageFaqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI Business Name Generator work?",
        "acceptedAnswer": { "@type": "Answer", "text": "Our AI naming engine leverages large language models and phonetic synthesis algorithms to generate brandable business names across 8 distinct styles with real-time domain checking." }
      },
      {
        "@type": "Question",
        "name": "Is UniqueBusinessName a free business name generator with logo?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! UniqueBusinessName is a 100% free business name generator with logo functionality. Every generated name card includes a 1-click action to customize and export vector SVG and PNG logos." }
      },
      {
        "@type": "Question",
        "name": "How does this AI business name generator compare to Namelix?",
        "acceptedAnswer": { "@type": "Answer", "text": "Unlike Namelix, which heavily pushes expensive aftermarket domains ($1,500+) and requires paid third-party tools for logos, UniqueBusinessName provides 100% free live DNS lookups and an integrated vector logo creator suite." }
      },
      {
        "@type": "Question",
        "name": "Can I generate Indian business name ideas?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our AI business name generator indian mode supports contemporary Indian startup naming, Hindi/Sanskrit morphemes, and global brand fusions with live domain verification." }
      },
      {
        "@type": "Question",
        "name": "Can I use this as a business name generator no AI (deterministic mode)?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can switch to Low decoding temperature (0.2) and select Real Words or Compound Words to generate direct, dictionary-based business name ideas without non-dictionary coinages." }
      },
      {
        "@type": "Question",
        "name": "What file formats are provided with logo generator exports?",
        "acceptedAnswer": { "@type": "Answer", "text": "The Logo Creator Suite exports vector SVG files, high-resolution transparent PNGs (512px, 1024px, 2048px), and print-ready PDF brand sheets." }
      }
    ]
  });

  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "UniqueBusinessName.com",
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon-512.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@uniquebusinessname.com",
      "contactType": "Customer Support"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Palm Road, Shipra Suncity, Indirapuram",
      "addressLocality": "Ghaziabad",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201014",
      "addressCountry": "IN"
    }
  });

  const homepagePatched = patchIndexHtml(indexHtml, HOMEPAGE_PRERENDER_CONTENT, {
    extraSchema: `<script type="application/ld+json">${homepageFaqSchema}</script>\n    <script type="application/ld+json">${orgSchema}</script>`,
  });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homepagePatched);
  console.log('✅ Homepage HTML patched with pre-rendered content and Organization schema');

  // ── Logo Maker static shell ────────────────────────────────────────────────
  writeStaticPage('/logo-maker', LOGO_MAKER_PRERENDER, {
    title: 'Create Logo for Business Free — Company Logo Maker & 3D Logo Generator | UniqueBusinessName.com',
    description: 'Create logo for business free with the #1 AI company logo maker. Explore free logo design templates, company 3D logo maker mockups, name logo design, and creative logo design free download.',
    canonical: `${SITE_URL}/logo-maker`,
    ogTitle: 'Create Logo for Business Free — Company Logo Maker & 3D Logo Generator',
    ogDescription: 'Design professional company logos free. Choose from free logo design templates, preview company 3D logo maker mockups, and export vector SVG/PNG.',
    ogUrl: `${SITE_URL}/logo-maker`,
    extraSchema: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Create Logo for Business — Free Company Logo Maker & 3D Logo Generator",
      "description": "Create logo for business free with our company logo maker, creative logo design templates, and 3D mockup studio.",
      "url": `${SITE_URL}/logo-maker`,
      "applicationCategory": "DesignApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
    })}</script>`,
  });
  console.log('✅ /logo-maker static shell written');

  // ── Industry category landing pages ──────────────────────────────────────
  industries.forEach((industry) => {
    const slug = generateSlug(industry);
    const title = `${industry} Name Generator — Free & Instant | UniqueBusinessName.com`;
    const description = `Generate unique, catchy ${industry.toLowerCase()} names in seconds with our AI-powered name generator and create vector logos instantly.`;
    const prerender = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">${industry} Name Generator &mdash; Free &amp; Instant</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Looking for a unique ${industry.toLowerCase()} name? Use our AI business name generator to discover
        creative, brandable name ideas and design matching vector logos instantly.
      </p>
      <p style="color:#4B5563"><a href="/">Back to AI Business Name Generator</a></p>
    </main>
  </div>
</div>`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `${industry} Name Generator`,
      "description": description,
      "url": `${SITE_URL}/generator/${slug}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
    };

    writeStaticPage(`/generator/${slug}`, prerender, {
      title,
      description,
      canonical: `${SITE_URL}/generator/${slug}`,
      ogTitle: `${industry} Name Generator`,
      ogDescription: description,
      ogUrl: `${SITE_URL}/generator/${slug}`,
      extraSchema: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    });
    sitemapEntries.push({ url: `/generator/${slug}`, priority: '0.7', changefreq: 'monthly' });
  });
  console.log(`✅ ${industries.length} industry category pages written`);

  // ── Blog pages ────────────────────────────────────────────────────────────
  blogs.forEach((blog) => {
    const prerender = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">${blog.title}</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">${blog.desc}</p>
      <p style="color:#4B5563"><a href="/blog">Back to Blog</a> &bull; <a href="/">AI Name Generator</a></p>
    </main>
  </div>
</div>`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "description": blog.desc,
      "url": `${SITE_URL}/blog/${blog.slug}`,
      "publisher": { "@type": "Organization", "name": "UniqueBusinessName.com", "url": SITE_URL }
    };
    writeStaticPage(`/blog/${blog.slug}`, prerender, {
      title: `${blog.title} | UniqueBusinessName Blog`,
      description: blog.desc,
      canonical: `${SITE_URL}/blog/${blog.slug}`,
      ogTitle: blog.title,
      ogDescription: blog.desc,
      ogUrl: `${SITE_URL}/blog/${blog.slug}`,
      extraSchema: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    });
    sitemapEntries.push({ url: `/blog/${blog.slug}`, priority: '0.7', changefreq: 'monthly' });
  });
  console.log(`✅ ${blogs.length} blog pages written`);

  // ── Competitor Alternative pages ──────────────────────────────────────────
  competitors.forEach((comp) => {
    const prerender = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">${comp.title}</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">${comp.desc}</p>
      <p style="color:#4B5563">
        Discover why founders are switching from ${comp.name} to UniqueBusinessName for real-time .com domain checking and 1-click vector logo generation.
      </p>
      <p style="color:#4B5563"><a href="/">Back to AI Name Generator</a> &bull; <a href="/alternatives">All Alternatives</a></p>
    </main>
  </div>
</div>`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `${comp.name} Alternative - UniqueBusinessName`,
      "description": comp.desc,
      "url": `${SITE_URL}/alternatives/${comp.slug}`,
      "applicationCategory": "BusinessApplication",
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
    };
    writeStaticPage(`/alternatives/${comp.slug}`, prerender, {
      title: comp.title,
      description: comp.desc,
      canonical: `${SITE_URL}/alternatives/${comp.slug}`,
      ogTitle: comp.title,
      ogDescription: comp.desc,
      ogUrl: `${SITE_URL}/alternatives/${comp.slug}`,
      extraSchema: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    });
    sitemapEntries.push({ url: `/alternatives/${comp.slug}`, priority: '0.9', changefreq: 'weekly' });
  });
  console.log(`✅ ${competitors.length} competitor alternative pages written`);

  // ── Sitemap ────────────────────────────────────────────────────────────────
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => `  <url>
    <loc>${SITE_URL}${e.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${e.changefreq || 'monthly'}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
  console.log('✅ sitemap.xml generated with', sitemapEntries.length, 'URLs');

  // ── Robots.txt ────────────────────────────────────────────────────────────
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt written');

  console.log('\n🎉 Post-Build SEO Generation complete!');
  console.log(`   Total URLs in sitemap: ${sitemapEntries.length}`);
}

main();
