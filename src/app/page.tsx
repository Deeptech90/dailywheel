/* ============================================================
   Homepage — UniqueBusinessName.com
   Dual-Engine AI Branding Platform:
   1. AI Business Name Generator
   2. Business Logo Creator Suite
   Connected via unified BrandStateContext
   ============================================================ */

import React, { useState } from 'react';
import { Sparkles, Palette, Wand2, ShieldCheck, Download, Globe, CheckCircle2, ChevronDown, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { useBrandState } from '../context/BrandStateContext';
import { NameGenerator } from '../components/NameGenerator/NameGenerator';
import { LogoMakerApp } from '../components/LogoMaker/LogoMakerApp';
import { Link } from '../components/Link/Link';
import { SEOHead } from '../components/SEOHead/SEOHead';

const FAQS = [
  {
    q: 'How does the AI Business Name Generator work?',
    a: 'Our AI naming engine leverages large language models and phonetic synthesis algorithms tuned for morphological brandability. You provide keywords and configure naming styles (Brandable, Compound, Alternate Spellings, Real Words, Rhyming, Non-English Roots), decoding randomness temperature, and length constraints. As names are synthesized, real-time asynchronous DNS lookups verify .com, .io, .ai, .app domain availability.'
  },
  {
    q: 'Can I design a logo for business cards and business plans online with AI?',
    a: 'Yes! Our design logo for business ai studio creates print-ready 300DPI vector SVGs and high-resolution transparent PNGs formatted specifically for business cards, stationery, investor pitch decks, and business plan cover pages.'
  },
  {
    q: 'How do I start designing a new logo for business without expensive local agencies near me?',
    a: 'Instead of paying thousands for design logo for business near me services, UniqueBusinessName lets you design your own logo for business online in minutes. Enjoy instant vector SVG downloads, 3D mockup previews, and 100% full commercial rights.'
  },
  {
    q: 'Is UniqueBusinessName a free business name generator with logo?',
    a: 'Yes! UniqueBusinessName is a 100% free business name generator with logo suite. Every generated name card includes a 1-click action to create, customize, and export vector SVG, high-res PNG, and PDF logo files with full commercial ownership.'
  },
  {
    q: 'How does this business name generator compare to Namelix?',
    a: 'Unlike Namelix, which primarily suggests expensive aftermarket domain names ($1,500+) and redirects users to paid third-party platforms for logos, UniqueBusinessName provides 100% free live DNS lookups for clean available domains (.com, .io, .ai, .app) and an integrated vector logo creator studio at zero cost.'
  },
  {
    q: 'Can I generate Indian business name ideas?',
    a: 'Yes! Our business name generator indian mode supports contemporary Indian startup names, Sanskrit and Hindi morphemes, cultural brand narratives, and modern global coinages with instant domain verification.'
  },
  {
    q: 'Can I use this as a business name generator no AI (deterministic dictionary mode)?',
    a: 'Yes. By selecting the "Low" temperature slider (0.2) and choosing "Real Words" or "Compound Words", the engine functions as a deterministic, dictionary-based business name generator no AI mode without non-dictionary coinages.'
  },
  {
    q: 'What is the difference between AI Free and Pro modes in this business name generator?',
    a: 'Our business name generator ai free suite allows unlimited brand name ideation, live domain DNS lookups, mockup previews, and complete vector logo exports without credit cards or subscriptions. Pro tiers unlock advanced team collaboration, high-volume exports, and trademark monitoring.'
  },
  {
    q: 'What file formats are provided with the logo generator?',
    a: 'The Business Logo Creator Suite exports complete brand asset packages including infinite-resolution vector SVGs (ideal for print, signage, and embroidery), high-resolution transparent PNGs (512px, 1024px, 2048px), and print-ready PDF brand sheets.'
  },
  {
    q: 'Do I have full commercial ownership of generated names and logos?',
    a: 'Yes. All business names and logo graphics generated on UniqueBusinessName.com come with 100% full commercial rights. You can trademark your name, register your domain, and use your logo on physical merchandise, websites, apps, and storefronts without attribution.'
  },
  {
    q: 'How do I check if a business name is already trademarked?',
    a: 'We recommend searching the USPTO TESS database (tmsearch.uspto.gov for the US) and your local trademark registry. Our tool provides instant domain availability signals across major TLDs, which serves as a powerful indicator of commercial viability.'
  },
  {
    q: 'Is UniqueBusinessName.com free to use?',
    a: 'Yes, both the AI Business Name Generator and the interactive Logo Creator are 100% free to use. Generate unlimited business names, check domain statuses, test visual styles in the Mockup Studio, and export your brand assets without subscription paywalls.'
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              style={{
                width: '100%',
                padding: '1.1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              <span>{faq.q}</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}>
                +
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '0 1.25rem 1.25rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '0.75rem',
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { activeTab, setActiveTab } = useBrandState();

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Design Logo for Business Free & AI Business Name Generator — UniqueBusinessName.com",
    "url": "https://uniquebusinessname.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Design logo for business free and generate brandable names with our company logo maker, graphic design online studio, business card exports, and vector SVG downloads.",
    "featureList": [
      "Design Logo for Business Free",
      "Design Logo for Business AI",
      "Design Logo for Business Online",
      "Design Your Own Logo for Business",
      "Design a Logo for Business Card",
      "Design a Cover Page and Logo for Business Plan",
      "Graphic Design Logo for Business",
      "Designing a New Logo for Business",
      "Company Logo Maker & AI Studio",
      "Company 3D Logo Maker Mockups",
      "Creative Logo Design Free Download",
      "Free Logo Design Templates",
      "AI Business Name Generator",
      "Real-Time Domain Verification (.com, .io, .ai, .app)",
      "Vector SVG & High-Res PNG Exports",
      "PWA Installable",
      "Offline Support"
    ]
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
      <SEOHead
        title="Design Logo for Business Free — AI Company Logo Maker & Brand Name Generator | UniqueBusinessName.com"
        description="Design logo for business free with the #1 AI company logo maker and business name generator. Design your own logo for business cards, business plans, 3D mockups, and instant vector SVG downloads."
        keywords="design logo for business, designing a new logo for business, design your own logo for business, design a logo for business card, design a cover page and logo for business plan, design logo for business free, design logo for business ai, design logo for business online, design logo for business near me, graphic design logo for business, create logo for business, logo design, create logo free, free online logo maker and download, free logo design and download, name logo design, free logo design templates, creative logo design free download, logo design online, company logo maker, company name logo maker, company design logo maker, company logo maker free, company logo maker ai, company name logo maker free, company brand logo maker, company stamp logo maker, company business logo maker, company 3d logo maker, business name generator, business name generators, business name generator ai, business name ideas, free business name generator, business name generator namelix, business name generator with logo, business name generator indian, business name generator ai free, business name generator no ai, namelix, logo maker, logo generator, business generator name, company generator name, generator business names, name generator for a business, names for a company generator, names for companies generator, name business generator, instant domain check"
        url="https://uniquebusinessname.com/"
        type="WebApplication"
        schema={homeSchema}
      />

      {/* ── Top Platform Navigation Banner / Segmented Hero Switch ───────── */}
      <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>
              ✦
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
              UniqueBusinessName
            </span>
          </div>

          {/* Segmented Dual-Engine Mode Toggle */}
          <nav aria-label="Engine switcher" style={{ display: 'inline-flex', background: 'var(--surface-2)', padding: '0.3rem', borderRadius: '999px', border: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('name-generator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === 'name-generator' ? 'var(--surface)' : 'transparent',
                color: activeTab === 'name-generator' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'name-generator' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
              id="nav-tab-name-generator"
            >
              <Sparkles size={15} />
              <span>Name Generator</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('logo-creator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === 'logo-creator' ? 'var(--surface)' : 'transparent',
                color: activeTab === 'logo-creator' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'logo-creator' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
              id="nav-tab-logo-creator"
            >
              <Palette size={15} />
              <span>Logo Creator</span>
            </button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>
              About
            </Link>
            <Link href="/pricing" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700 }}>
              Pro Suite
            </Link>
          </div>
        </div>
      </header>

      {/* ── Active Generative Engine Display ───────────────────────── */}
      <main>
        {activeTab === 'name-generator' ? (
          <NameGenerator />
        ) : (
          <LogoMakerApp />
        )}
      </main>

      {/* ── Platform Value Pillars & Workflow Integration ──────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--text)' }}>
            The Complete AI Brand Discovery Pipeline
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Eliminate weeks of branding friction. Generate memorable, domain-verified business names and design print-ready vector logo packages in one seamless session.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(29, 78, 216, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Wand2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
              1. Free Business Name Generator AI
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Configure 8 distinct naming style taxonomies, variable temperature decoding ($0.2$ to $1.1$), and string length parameters. Our phonetic synthesis algorithm creates catchy, memorable coinages.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
              2. Real-Time Domain Verification
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              As business names are generated, asynchronous DNS over HTTPS queries evaluate registration statuses across .com, .io, .ai, and .app top-level domains in parallel.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Palette size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
              3. Free Business Name Generator with Logo Suite
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Transfer your selected name into our free online logo maker &amp; logo generator. Download print-ready vector SVGs, high-resolution transparent PNGs, and PDF brand packages. Customize typography, colors, and live mockups instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── High-Authority SEO Content & Guide Section ───────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
              ✦ Comprehensive Founder&apos;s Guide
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.25 }}>
              The #1 Free Business Name Generator With Logo &amp; AI Brand Discovery Engine
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
              Explore endless business name ideas, generate Indian startup names, compare against Namelix, and design vector logos with our free logo maker &amp; logo generator.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Pillar 1 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                1. Free Business Name Generator With Logo: 1-Click Visual Branding
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Founding a company requires more than just an idea—you need a cohesive visual presence. As a dedicated <strong>business name generator with logo</strong>, UniqueBusinessName removes the disconnect between naming and design. When you find candidate <strong>business name ideas</strong>, click &ldquo;Create Logo with This Name&rdquo; to immediately launch our integrated <strong>logo maker</strong> and <strong>logo generator</strong>.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Customize typography, layout geometry, iconography, and color palettes, then export infinite-resolution vector SVG, high-res transparent PNG, and PDF packages with zero paywalls.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                2. AI Free vs. Business Name Generator No AI Modes
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Different founders prefer different naming philosophies. Our platform gives you full control over generative mechanics:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Business Name Generator AI Free:</strong> Generates creative, phonetic coinages, compound fusions, and evocative modern brand narratives using neural language models.</li>
                <li><strong>Business Name Generator No AI:</strong> Dial temperature down to Low (0.2) and select Real Words or Compound Words for strict, dictionary-based, deterministic combinations without invented coinages.</li>
                <li><strong>Linguistic Customization:</strong> Filter by character length (short, medium, long) and explore 8 distinct stylistic taxonomies.</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                3. Business Name Generator Indian &amp; Global Market Adaptability
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Looking for culturally resonant names for ventures in India and Southeast Asia? Our <strong>business name generator indian</strong> algorithms incorporate Sanskrit root words, Hindi morphemes, and global English blendings tailored for tech startups in Bangalore, D2C brands in Mumbai, and boutique agencies in Delhi NCR.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Every name idea is checked simultaneously against <code>.com</code>, <code>.io</code>, <code>.ai</code>, and <code>.app</code> domains so your Indian brand is immediately positioned for worldwide expansion.
              </p>
            </div>

            {/* Pillar 4 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                4. The Superior Free Namelix Alternative (Business Name Generator Namelix)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Many founders searching for a <strong>business name generator namelix</strong> alternative find that Namelix heavily promotes expensive premium domains listed at $1,000–$5,000+ through domain brokers, while charging extra for vector logo exports.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                UniqueBusinessName offers unbiased DNS lookups for clean available domains, zero broker markups, 8 fine-tuned naming styles, and an in-house vector <strong>logo maker</strong> completely free of charge.
              </p>
            </div>

            {/* Pillar 5 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                5. Design Logo for Business: Online AI Graphic Design &amp; Brand Suite
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Looking to <strong>design logo for business free</strong> or discover an AI-powered <strong>company logo maker</strong>? Whether you are <strong>designing a new logo for business</strong> or want to <strong>design your own logo for business</strong> online, our suite provides complete creative control:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Design Logo for Business AI &amp; Online:</strong> Generate bespoke monogram marks, geometric vectors, and custom typography with intelligent color harmonization.</li>
                <li><strong>Design a Logo for Business Card:</strong> Export print-ready 300DPI vector SVGs and transparent PNGs formatted specifically for luxury business cards, stickers, and letterheads.</li>
                <li><strong>Design a Cover Page and Logo for Business Plan:</strong> Create high-resolution brand assets and presentation covers to impress prospective investors and partners.</li>
                <li><strong>Graphic Design Logo for Business vs. &ldquo;Near Me&rdquo;:</strong> Avoid paying high agency retainers for <em>design logo for business near me</em> services. Our online AI graphic design studio delivers instant results with zero watermarks and 100% full commercial rights.</li>
                <li><strong>Company 3D Logo Maker Mockups &amp; Free Downloads:</strong> Test your logo rendered on photorealistic apparel, mobile app mockups, and signage before downloading print-ready SVG, PNG, and PDF files.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ & Legal Section ───────────────────────────────────── */}
      <section style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', color: 'var(--text)' }}>
          Frequently Asked Questions
        </h2>
        <FAQAccordion />
      </section>

      {/* ── Platform Footer ───────────────────────────────────────── */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)' }}>✦</span> UniqueBusinessName
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5, maxWidth: '280px', marginBottom: '0.75rem' }}>
              Enterprise-grade AI Business Name Generator and Vector Logo Creator Suite.
            </p>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: 1.5, borderTop: '1px dashed var(--border)', paddingTop: '0.75rem' }}>
              📍 <strong>Location:</strong><br />
              Palm Road, Shipra Suncity,<br />
              Indirapuram, Ghaziabad,<br />
              Uttar Pradesh 201014, India
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '0.85rem', fontSize: '0.95rem' }}>Core Engines</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('name-generator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Business Name Generator
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('logo-creator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Logo Creator Suite
              </button>
              <Link href="/pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>
                Brand Pro Plan
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '0.85rem', fontSize: '0.95rem' }}>Compare Alternatives</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/alternatives/namelix" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Namelix Alternative</Link>
              <Link href="/alternatives/looka" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Looka Alternative</Link>
              <Link href="/alternatives/business-name-generator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>BNG Alternative</Link>
              <Link href="/alternatives/godaddy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>GoDaddy Alternative</Link>
              <Link href="/alternatives/canva" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Canva Alternative</Link>
              <Link href="/alternatives/design-com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Design.com Alternative</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '0.85rem', fontSize: '0.95rem' }}>Company &amp; Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>About Us</Link>
              <Link href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Contact &amp; Support</Link>
              <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Blog &amp; Guides</Link>
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Terms of Service</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} UniqueBusinessName.com. All rights reserved. Built for modern founders.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
