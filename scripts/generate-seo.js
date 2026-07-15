import fs from 'fs';
import path from 'path';

// Need to match the same data as the app uses
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

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-name-generator';
}

const blogs = [
  { slug: 'how-to-choose-a-business-name', title: 'How to Choose a Business Name: 7 Essential Rules', desc: 'Picking the right business name can make or break your brand.' },
  { slug: 'startup-branding-guide-2026', title: 'The Ultimate Startup Branding Guide for 2026', desc: 'Branding is more than a logo.' },
  { slug: 'domain-name-selection-tips', title: 'Should You Buy a .COM or an Alternative TLD?', desc: 'With the rise of .ai, .io, and .co, is the .com still king?' },
  { slug: 'logo-inspiration-2026', title: 'Logo Inspiration: 5 Trends Dominating 2026', desc: 'From glassmorphism to brutalist typography.' },
  { slug: 'brand-personality-archetypes', title: 'Finding Your Brand Personality Archetype', desc: 'Are you the Hero, the Magician, or the Outlaw?' }
];

const SITE_URL = 'https://uniquebusinessname.com';
const DIST_DIR = path.resolve('dist');

async function main() {
  console.log('Starting Post-Build SEO Generation...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist directory not found. Please run vite build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  let sitemapEntries = [
    { url: '/', priority: '1.0' },
    { url: '/about', priority: '0.8' },
    { url: '/pricing', priority: '0.9' },
    { url: '/blog', priority: '0.9' }
  ];

  const writeStaticPage = (routePath, title, description, keywords, schema) => {
    const fullDir = path.join(DIST_DIR, routePath);
    if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });

    let modifiedHtml = indexHtml
      .replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="(.*?)"\s*\/?>/, `<meta name="description" content="${description}" />`)
      .replace('</head>', `
        <meta name="keywords" content="${keywords || ''}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="${SITE_URL}${routePath}" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="${SITE_URL}${routePath}" />
        <script type="application/ld+json">${JSON.stringify(schema)}</script>
      </head>`);

    fs.writeFileSync(path.join(fullDir, 'index.html'), modifiedHtml);
    sitemapEntries.push({ url: routePath, priority: '0.7' });
  };

  // Generate 200 Landing Pages
  industries.forEach((industry) => {
    const slug = generateSlug(industry);
    const title = `${industry} Name Generator | AI Powered`;
    const description = `Generate unique and catchy ${industry.toLowerCase()} names in seconds with our free AI-powered business name generator.`;
    const keywords = `${industry.toLowerCase()} name generator, ${industry.toLowerCase()} names, name ideas for ${industry.toLowerCase()}`;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title,
      "description": description,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All"
    };

    writeStaticPage(`/generator/${slug}`, title, description, keywords, schema);
  });

  // Generate Blog Pages
  blogs.forEach((blog) => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "description": blog.desc
    };
    writeStaticPage(`/blog/${blog.slug}`, `${blog.title} | UBN Blog`, blog.desc, 'startup branding, business names', schema);
  });

  // Generate Sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => `  <url>
    <loc>${SITE_URL}${e.url}</loc>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

  // Generate Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);

  console.log(`Successfully generated ${industries.length} category pages and ${blogs.length} blog pages.`);
  console.log('Sitemap and robots.txt created successfully.');
}

main();
