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
  { slug: 'how-to-choose-a-business-name', title: 'How to Choose a Business Name: 7 Essential Rules', desc: 'Picking the right business name can make or break your brand. Here are the seven rules every founder should follow.' },
  { slug: 'startup-branding-guide-2026', title: 'The Ultimate Startup Branding Guide for 2026', desc: 'Branding is more than a logo. Learn how to build a cohesive brand identity from day one.' },
  { slug: 'domain-name-selection-tips', title: 'Should You Buy a .COM or an Alternative TLD?', desc: 'With the rise of .ai, .io, and .co, is the .com still king? We break down the pros and cons.' },
  { slug: 'logo-inspiration-2026', title: 'Logo Inspiration: 5 Trends Dominating 2026', desc: 'From glassmorphism to brutalist typography — the logo styles shaping modern brands in 2026.' },
  { slug: 'brand-personality-archetypes', title: 'Finding Your Brand Personality Archetype', desc: 'Are you the Hero, the Magician, or the Outlaw? Discover which archetype fits your brand.' }
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
      <h1>AI Business Name Generator &mdash; Generate Unique Brand Names &amp; Vector Logos Instantly</h1>
      <p>
        UniqueBusinessName.com is an enterprise-grade AI branding platform that unites an advanced Business Name Generator
        with a professional Vector Logo Creator Suite. Configure 8 distinct naming style taxonomies, temperature decoding
        parameters, and string length constraints. Discover brandable company names, check real-time domain availability
        across .com, .io, .ai, and .app TLDs, and export complete vector brand asset packages in a single click.
      </p>

      <h2>How the AI Naming &amp; Logo Discovery Pipeline Works</h2>
      <ol>
        <li><strong>Enter Keywords or Business Concepts</strong> &mdash; Type your venture theme and configure your desired naming style taxonomy (Brandable, Compound, Alt Spellings, Real Words, Rhyming, Non-English Roots).</li>
        <li><strong>Tune Decoding Randomness &amp; Length</strong> &mdash; Select low, medium, or high temperature variability and choose short, medium, or long character constraints.</li>
        <li><strong>Verify Real-Time Domain Availability</strong> &mdash; As candidate names are synthesized, asynchronous DNS over HTTPS lookups verify .com, .io, .ai, and .app registration statuses.</li>
        <li><strong>1-Click Vector Logo Creation</strong> &mdash; Select &ldquo;Create Logo with This Name&rdquo; to instantly launch the 6-stage Logo Creator Suite, customize typography and colors, preview on product mockups, and export vector SVGs and transparent PNGs.</li>
      </ol>

      <h2>Tips for Choosing a High-Conversion Business Name</h2>

      <h3>1. Keep It Short and Memorable</h3>
      <p>
        Aim for 1 to 3 syllables. Short names are easier to pronounce, spell, and recall.
        Think of iconic tech giants like Apple, Stripe, Lyft, and Google.
      </p>

      <h3>2. Verify Domain Availability Immediately</h3>
      <p>
        Securing a clean .com, .io, .ai, or .app domain is essential for credibility and brand discovery.
        Our asynchronous lookup engine tests domain registration status in real time.
      </p>

      <h3>3. Avoid Trademark Conflicts</h3>
      <p>
        Always search the USPTO TESS database before registering your business entity to avoid conflicting with existing trademarks.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <p class="faq-q">Is the AI business name generator free to use?</p>
        <p>Yes &mdash; UniqueBusinessName.com is 100% free with no credit card required. Generate unlimited brand name ideas and test visual logo designs without limits.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">Can I instantly create a logo for a generated business name?</p>
        <p>Yes. Every name card features a 1-click &ldquo;Create Logo with This Name&rdquo; button that seamlessly transfers your active brand name into the Logo Creator Suite without losing state.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">What file formats are provided with logo exports?</p>
        <p>You can export vector SVG files, high-resolution transparent PNGs at 512px, 1024px, and 2048px resolutions, and print-ready PDF brand sheets.</p>
      </div>

      <p><a href="/logo-maker">Try the Logo Creator Suite</a> &bull; <a href="/pricing">View Pro Features</a></p>
    </main>
  </div>
</div>`;

// ── Logo Maker pre-rendered content ──────────────────────────────────────────
const LOGO_MAKER_PRERENDER = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">Free Business Logo Creator Suite &mdash; Vector Brand Generator</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Design professional vector logos in minutes with our 6-stage guided logo wizard and interactive canvas customizer.
        Explore curated color palettes, searchable SVG vector symbols, live font styling, and real-world mockup studio previews.
        Export print-ready SVG, transparent PNG, and PDF files with 100% commercial ownership.
      </p>
      <p style="margin-top:2rem;color:#4B5563"><a href="/">Back to AI Name Generator</a></p>
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
      title = 'AI Business Name Generator & Logo Creator | UniqueBusinessName.com',
      description = 'Generate catchy, brandable, high-conversion business names and design vector logo packages instantly. Real-time domain checking and mockup studio previews. 100% free.',
      canonical = `${SITE_URL}/`,
      ogTitle = 'AI Business Name Generator & Logo Creator Suite',
      ogDescription = 'Generate brandable business names, check domain availability, and create vector logos with our enterprise AI branding engine.',
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
        "acceptedAnswer": { "@type": "Answer", "text": "Our AI naming engine leverages large language models and phonetic synthesis algorithms tuned for morphological brandability across 8 naming styles with real-time domain lookups." }
      },
      {
        "@type": "Question",
        "name": "Can I instantly create a logo for a generated business name?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every generated name card has a 1-click Create Logo with This Name action that pre-populates your brand identity into the Logo Creator Suite." }
      },
      {
        "@type": "Question",
        "name": "What file formats are provided with logo exports?",
        "acceptedAnswer": { "@type": "Answer", "text": "The Logo Creator Suite exports vector SVG files, high-resolution transparent PNGs (512px, 1024px, 2048px), and print-ready PDF brand sheets." }
      }
    ]
  });

  const homepagePatched = patchIndexHtml(indexHtml, HOMEPAGE_PRERENDER_CONTENT, {
    extraSchema: `<script type="application/ld+json">${homepageFaqSchema}</script>`,
  });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homepagePatched);
  console.log('✅ Homepage HTML patched with pre-rendered content');

  // ── Logo Maker static shell ────────────────────────────────────────────────
  writeStaticPage('/logo-maker', LOGO_MAKER_PRERENDER, {
    title: 'Free Business Logo Creator Suite | UniqueBusinessName.com',
    description: 'Design professional vector logos in minutes with our 6-stage guided logo wizard and interactive canvas customizer. Export print-ready SVG, PNG, and PDF brand packages.',
    canonical: `${SITE_URL}/logo-maker`,
    ogTitle: 'Business Logo Creator Suite — UniqueBusinessName.com',
    ogDescription: 'Design professional vector logos and preview live product mockups. 100% free vector and PNG exports.',
    ogUrl: `${SITE_URL}/logo-maker`,
    extraSchema: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Business Logo Creator Suite",
      "description": "An interactive AI logo maker and vector brand identity generator with real-world mockup studio.",
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
