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
// This makes view-source return real, crawlable text instead of an empty shell.
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
      <h1>Free Business Name Generator &mdash; Spin the Wheel for Instant Brand Name Ideas</h1>
      <p>
        Struggling to name your new venture? UniqueBusinessName.com&apos;s physics-driven Anti-Gravity Wheel
        generates unique, creative, and brandable business name ideas in seconds &mdash; completely free.
        Choose from dozens of industry categories (tech, food, fashion, fitness, and more), spin the wheel,
        and instantly get a curated shortlist of names worth building a brand around. Trusted by startups,
        freelancers, and small business owners who want a name that stands out from day one.
        No sign-up. No limits. Just great names.
      </p>

      <h2>How the Business Name Generator Works</h2>
      <ol>
        <li><strong>Choose your industry category</strong> &mdash; Select from 30+ categories such as Restaurant, Tech Startup, Clothing Brand, and more. Each category has a curated pool of highly brandable names.</li>
        <li><strong>Load the wheel</strong> &mdash; Click &ldquo;Load Names&rdquo; and the wheel is populated with 10 randomly selected names from your chosen category. Every load produces a fresh combination.</li>
        <li><strong>Spin it</strong> &mdash; Hit the big &ldquo;SPIN THE WHEEL&rdquo; button. The Anti-Gravity physics engine simulates real angular momentum, friction, and weighted deceleration.</li>
        <li><strong>Check your winner</strong> &mdash; When the wheel stops, your business name idea is revealed. Check domain availability, spin again, or save your favourite to history.</li>
      </ol>

      <h2>Tips for Choosing a Great Business Name</h2>

      <h3>Keep It Short and Memorable</h3>
      <p>
        Aim for one to three syllables. Short names are easier to say, spell, and remember.
        Think of iconic brands &mdash; Apple, Nike, Stripe, Lyft. If someone has to ask you to spell
        your business name twice over the phone, it&apos;s a red flag.
      </p>

      <h3>Check Domain Availability First</h3>
      <p>
        Before you fall in love with a name, verify the .com domain is available. A .com is not strictly
        required in 2026 &mdash; .io, .co, and .ai are widely accepted &mdash; but .com still carries the
        most credibility. Run a quick search on Namecheap or GoDaddy before registering any business entity.
      </p>

      <h3>Avoid Trademark Conflicts</h3>
      <p>
        Using a trademarked name can result in a cease-and-desist letter and a forced rebrand.
        Always search the USPTO TESS database (for the US) before filing your business registration.
        Pay attention to confusingly similar names in the same industry class, not just identical matches.
      </p>

      <h3>Make It Easy to Say and Spell</h3>
      <p>
        Word-of-mouth is still the most powerful marketing channel. If your business name is difficult
        to pronounce or has an unexpected spelling, you&apos;re working against every referral.
        Test shortlisted names by saying them out loud to someone unfamiliar with the brand.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <p class="faq-q">Is the business name generator free to use?</p>
        <p>Yes &mdash; UniqueBusinessName.com is 100% free. There are no hidden fees, no credit card required, and no limit on the number of spins. Generate as many business name ideas as you need, completely free of charge.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">Can I trademark a name I get from this tool?</p>
        <p>The names generated are not pre-cleared for trademark. Before attempting to register a name with the USPTO (or your country&apos;s equivalent), you must conduct a thorough trademark search. A name that appears brandable may already be in use. Consult a trademark attorney before filing.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">How do I check if a business name is already taken?</p>
        <p>Start with a free search on the USPTO TESS database (tmsearch.uspto.gov) for trademark conflicts. Also check your state&apos;s Secretary of State business name database. Finally, search Google and check domain availability &mdash; a name with an available .com is a strong signal it&apos;s not heavily used.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">How does the business name generator work?</p>
        <p>We maintain a curated database of highly brandable names across dozens of industries. When you select a category, the tool selects a random subset of names and loads them onto the wheel. Our physics engine simulates realistic angular momentum, friction, and deceleration to pick a winner.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">Can I use this tool for things other than business names?</p>
        <p>Yes. Visit our Decision Wheel at /decision-wheel to enter custom options for any random choice. Or try the Spirit Animal Wheel at /spirit-animal for a fun personality reveal. All three modes use the same physics-driven wheel.</p>
      </div>

      <div class="faq-item">
        <p class="faq-q">What makes a good business name?</p>
        <p>The best business names are short (1-3 syllables), easy to spell and pronounce, and meaningful or evocative. They should have an available .com domain and no trademark conflicts. Avoid overly generic names that are difficult to protect legally.</p>
      </div>

      <p><a href="/decision-wheel">Try the Decision Wheel</a> &bull; <a href="/spirit-animal">Try the Spirit Animal Wheel</a></p>
    </main>
  </div>
</div>`;

// ── Decision Wheel pre-rendered content ───────────────────────────────────────
const DECISION_WHEEL_PRERENDER = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">Free Decision Wheel Spinner &mdash; Let Fate Decide for You</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Can&apos;t make up your mind? Our free decision wheel spinner takes the stress out of everyday choices.
        Enter your custom options, give the wheel a spin, and let physics decide. Whether you&apos;re picking
        a restaurant, choosing a movie, settling a debate with friends, or making any other daily decision &mdash;
        the Anti-Gravity Decision Wheel delivers a fair, random, and satisfying answer every time.
        No sign-up needed. 100% free.
      </p>
      <h2 style="font-size:1.5rem;font-weight:800;margin:2rem 0 0.75rem">How the Decision Wheel Works</h2>
      <ol style="padding-left:1.5rem;color:#4B5563;line-height:1.8">
        <li><strong>Enter your choices</strong> &mdash; type each option into the Daily Choices panel. Add up to 20 custom options.</li>
        <li><strong>Load the wheel</strong> &mdash; click &ldquo;Load Wheel&rdquo; to populate the spinner with your options.</li>
        <li><strong>Spin it</strong> &mdash; press SPIN THE WHEEL or tap Space. The physics engine takes over.</li>
        <li><strong>Accept the result</strong> &mdash; the wheel decelerates with real momentum and lands on a winner. Decision made!</li>
      </ol>
      <p style="margin-top:2rem;color:#4B5563"><a href="/">Business Name Generator</a> &bull; <a href="/spirit-animal">Spirit Animal Wheel</a></p>
    </main>
  </div>
</div>`;

// ── Spirit Animal pre-rendered content ────────────────────────────────────────
const SPIRIT_ANIMAL_PRERENDER = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">Spirit Animal Wheel &mdash; Spin to Discover Your Inner Animal</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Which creature speaks to your soul today? Spin the Anti-Gravity Spirit Animal Wheel and discover
        which animal&apos;s energy is guiding you. Our curated collection of spirit animals &mdash; from the
        wise Owl to the bold Lion &mdash; each carry unique personality traits and symbolic meanings.
        Free to play, no sign-up required.
      </p>
      <h2 style="font-size:1.5rem;font-weight:800;margin:2rem 0 0.75rem">Spirit Animals &amp; Their Meanings</h2>
      <ul style="padding-left:1.5rem;color:#4B5563;line-height:2">
        <li><strong>Eagle</strong> &mdash; Vision, freedom, and spiritual awareness</li>
        <li><strong>Wolf</strong> &mdash; Loyalty, intuition, and pack strength</li>
        <li><strong>Lion</strong> &mdash; Courage, leadership, and confidence</li>
        <li><strong>Fox</strong> &mdash; Cleverness, adaptability, and quick thinking</li>
        <li><strong>Dolphin</strong> &mdash; Playfulness, intelligence, and harmony</li>
        <li><strong>Bear</strong> &mdash; Grounding, strength, and introspection</li>
        <li><strong>Butterfly</strong> &mdash; Transformation, growth, and renewal</li>
        <li><strong>Turtle</strong> &mdash; Patience, wisdom, and steady progress</li>
      </ul>
      <p style="margin-top:2rem;color:#4B5563"><a href="/">Business Name Generator</a> &bull; <a href="/decision-wheel">Decision Wheel</a></p>
    </main>
  </div>
</div>`;

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting Post-Build SEO Generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Please run vite build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  let sitemapEntries = [
    { url: '/',                priority: '1.0', changefreq: 'daily' },
    { url: '/decision-wheel',  priority: '0.9', changefreq: 'monthly' },
    { url: '/spirit-animal',   priority: '0.9', changefreq: 'monthly' },
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
      title = 'Free Business Name Generator | Spin the Anti-Gravity Wheel | UniqueBusinessName.com',
      description = 'Generate unique, creative, and brandable business names instantly. Use our physics-driven Anti-Gravity Wheel to pick the perfect name. 100% free.',
      canonical = `${SITE_URL}/`,
      ogTitle = 'Free Business Name Generator — Anti-Gravity Wheel',
      ogDescription = 'Spin the physics-driven wheel to generate unique, brandable business names. 100% free.',
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

  // ── Homepage ──────────────────────────────────────────────────────────────
  const homepageFaqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the business name generator free to use?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — UniqueBusinessName.com is 100% free. There are no hidden fees, no credit card required, and no limit on the number of spins. Generate as many business name ideas as you need, completely free of charge." }
      },
      {
        "@type": "Question",
        "name": "Can I trademark a name I get from this tool?",
        "acceptedAnswer": { "@type": "Answer", "text": "The names generated by this tool are not pre-cleared for trademark. Before attempting to register a name with the USPTO (or your country's equivalent), you must conduct a thorough trademark search. A name that appears brandable may already be in use. We strongly recommend consulting a trademark attorney before filing." }
      },
      {
        "@type": "Question",
        "name": "How do I check if a business name is already taken?",
        "acceptedAnswer": { "@type": "Answer", "text": "Start with a free search on the USPTO TESS database (tmsearch.uspto.gov) for trademark conflicts. Also check your state's Secretary of State business name database for entity registrations. Finally, search Google and run a domain availability check — a name with an available .com domain is a strong signal it's not heavily used." }
      },
      {
        "@type": "Question",
        "name": "How does the business name generator work?",
        "acceptedAnswer": { "@type": "Answer", "text": "We maintain a curated database of highly brandable names across dozens of industries. When you select a category — such as Tech, Bakery, or Fitness — the tool selects a random subset of names and loads them onto the wheel. Our physics engine then simulates realistic angular momentum, friction, and deceleration to pick a winner." }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool for things other than business names?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Switch to \"Daily Choices\" mode at /decision-wheel to enter your own custom options for any random decision — from picking a restaurant to choosing a workout. Or visit /spirit-animal for a fun spirit animal reveal." }
      },
      {
        "@type": "Question",
        "name": "What makes a good business name?",
        "acceptedAnswer": { "@type": "Answer", "text": "The best business names are short (1-3 syllables), easy to spell, easy to pronounce, and meaningful or evocative. They should have an available .com domain, no existing trademark conflicts, and no negative connotations in other languages if you plan to operate internationally." }
      }
    ]
  });

  const homepageBreadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Decision Wheel", "item": SITE_URL + "/decision-wheel" },
      { "@type": "ListItem", "position": 3, "name": "Spirit Animal Wheel", "item": SITE_URL + "/spirit-animal" }
    ]
  });

  const homepagePatched = patchIndexHtml(indexHtml, HOMEPAGE_PRERENDER_CONTENT, {
    extraSchema: `<script type="application/ld+json">${homepageFaqSchema}</script>\n  <script type="application/ld+json">${homepageBreadcrumb}</script>`,
  });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homepagePatched);
  console.log('✅ Homepage HTML patched with pre-rendered content');

  // ── Helper: write a static route shell ────────────────────────────────────
  const writeStaticPage = (routePath, prerenderContent, opts = {}) => {
    const fullDir = path.join(DIST_DIR, routePath);
    if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
    // NOTE: No keywords meta added here — keywords meta has no SEO value
    const modifiedHtml = patchIndexHtml(indexHtml, prerenderContent, opts);
    fs.writeFileSync(path.join(fullDir, 'index.html'), modifiedHtml);
  };

  // ── Decision Wheel static shell ────────────────────────────────────────────
  writeStaticPage('/decision-wheel', DECISION_WHEEL_PRERENDER, {
    title: 'Free Decision Wheel Spinner — Let Fate Decide | UniqueBusinessName.com',
    description: 'Spin the free decision wheel to settle any daily choice. Add your custom options, give it a spin, and let the physics-powered wheel decide. No signup required.',
    canonical: `${SITE_URL}/decision-wheel`,
    ogTitle: 'Free Decision Wheel Spinner — UniqueBusinessName.com',
    ogDescription: 'Add your custom options and spin the physics-powered decision wheel. Perfect for picking restaurants, movies, workouts, or settling any debate.',
    ogUrl: `${SITE_URL}/decision-wheel`,
    extraSchema: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Decision Wheel Spinner",
      "description": "A free, physics-driven decision wheel spinner. Enter your custom choices, spin, and get a random result.",
      "url": `${SITE_URL}/decision-wheel`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
    })}</script>`,
  });
  console.log('✅ /decision-wheel static shell written');

  // ── Spirit Animal static shell ─────────────────────────────────────────────
  writeStaticPage('/spirit-animal', SPIRIT_ANIMAL_PRERENDER, {
    title: 'Spirit Animal Wheel — Discover Your Inner Animal | UniqueBusinessName.com',
    description: 'Spin the Spirit Animal Wheel to discover which animal guides you today. From the wise Owl to the bold Lion — a fun, free personality reveal tool.',
    canonical: `${SITE_URL}/spirit-animal`,
    ogTitle: 'Spirit Animal Wheel — Discover Your Inner Animal',
    ogDescription: 'Spin the wheel to find your spirit animal. Each result reveals the animal\'s symbolic meaning and personality trait. Free to play, no signup.',
    ogUrl: `${SITE_URL}/spirit-animal`,
    extraSchema: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Spirit Animal Wheel",
      "description": "A free, physics-driven spirit animal wheel. Spin to discover which animal spirit guides you today.",
      "url": `${SITE_URL}/spirit-animal`,
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
    })}</script>`,
  });
  console.log('✅ /spirit-animal static shell written');

  // ── Industry category landing pages ──────────────────────────────────────
  industries.forEach((industry) => {
    const slug = generateSlug(industry);
    const title = `${industry} Name Generator — Free & Instant | UniqueBusinessName.com`;
    const description = `Generate unique and catchy ${industry.toLowerCase()} names in seconds with our free, physics-driven name generator. No signup required.`;
    const prerender = `
<div id="root">
  <div style="min-height:100vh;font-family:system-ui,sans-serif;color:#111827">
    <main style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
      <h1 style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:1rem">${industry} Name Generator — Free &amp; Instant</h1>
      <p style="color:#4B5563;line-height:1.7;margin-bottom:1.5rem">
        Looking for a unique ${industry.toLowerCase()} name? Spin our free physics-powered wheel and get
        creative, brandable name ideas instantly. No signup required.
      </p>
      <p style="color:#4B5563"><a href="/">Back to Business Name Generator</a></p>
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
      <p style="color:#4B5563"><a href="/blog">Back to Blog</a> &bull; <a href="/">Business Name Generator</a></p>
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
