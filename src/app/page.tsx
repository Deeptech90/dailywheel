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
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
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
                color: 'var(--color-ink)',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              <span>{faq.q}</span>
              <span style={{ fontSize: '1.1rem', color: 'var(--color-brass)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}>
                +
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '0 1.25rem 1.25rem',
                  color: 'var(--color-ink-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '0.85rem',
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
    "url": "https://www.uniquebusinessname.com",
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
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--color-ink)', background: 'var(--color-paper)' }}>
      <SEOHead
        title="Free AI Business Name Generator with Logo Maker | UniqueBusinessName.com"
        description="Generate unique AI business names with live domain checks and design your logo free — all in one tool. Business name generator, brand name ideas, and company logo maker."
        url="https://www.uniquebusinessname.com/"
        type="WebApplication"
        schema={homeSchema}
      />

      {/* ── Top Platform Navigation Banner / Architectural Header ───────── */}
      <header style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: 'var(--color-ink)', color: 'var(--color-brass)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', border: '1px solid var(--color-border)' }}>
              ✦
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
              UniqueBusinessName
            </span>
          </div>

          {/* Segmented Dual-Engine Mode Toggle */}
          <nav aria-label="Engine switcher" style={{ display: 'inline-flex', background: 'var(--color-paper)', padding: '3px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
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
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'name-generator' ? 'var(--color-ink)' : 'transparent',
                color: activeTab === 'name-generator' ? '#FFFFFF' : 'var(--color-ink-muted)',
                fontWeight: activeTab === 'name-generator' ? 600 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              id="nav-tab-name-generator"
            >
              <Sparkles size={14} />
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
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'logo-creator' ? 'var(--color-ink)' : 'transparent',
                color: activeTab === 'logo-creator' ? '#FFFFFF' : 'var(--color-ink-muted)',
                fontWeight: activeTab === 'logo-creator' ? 600 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              id="nav-tab-logo-creator"
            >
              <Palette size={14} />
              <span>Logo Studio</span>
            </button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Link href="/about" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
              About
            </Link>
            <Link href="/pricing" style={{ color: 'var(--color-brass)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>
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

      {/* ── Production Mockup Showcase Gallery ─────────────────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-brass)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
            Tangible Output • Zero Templates
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink)', lineHeight: 1.2 }}>
            From evocative name to architectural reality.
          </h2>
          <p style={{ color: 'var(--color-ink-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Every identity created on UniqueBusinessName is engineered for tangible applications: foil-stamped stationery, architectural facades, and tactile product packaging.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {/* Mockup 1: Business Card */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="/mockups/mockup_business_card.jpg"
                alt="Letterpress Foil Business Cards"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                Print Specification
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.35rem' }}>
                Letterpress Foil on 600gsm Cotton
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, margin: 0 }}>
                High-density blind deboss and metallic foil stamping with crisp vector outlines.
              </p>
            </div>
          </div>

          {/* Mockup 2: Letterhead */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="/mockups/mockup_letterhead.jpg"
                alt="Executive Stationery Suite"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                Corporate Collateral
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.35rem' }}>
                Debossed Archival Executive Stationery
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, margin: 0 }}>
                Matched letterheads, wax-sealed envelopes, and official brand guidelines.
              </p>
            </div>
          </div>

          {/* Mockup 3: Storefront */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="/mockups/mockup_storefront.jpg"
                alt="Architectural Storefront Signage"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                Physical Presence
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.35rem' }}>
                Cast Bronze Architectural Facade
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, margin: 0 }}>
                Dimensional signage with warm halo-lighting and honed natural limestone backdrops.
              </p>
            </div>
          </div>

          {/* Mockup 4: Packaging */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="/mockups/mockup_packaging.jpg"
                alt="Custom Rigid Packaging Box"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                Unboxing Experience
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.35rem' }}>
                Rigid Matte Custom Packaging
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, margin: 0 }}>
                Gold-foil debossed presentation boxes with soft-touch protective finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Value Pillars & Workflow Integration ──────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--color-ink)' }}>
            The Complete Brand Discovery Pipeline
          </h2>
          <p style={{ color: 'var(--color-ink-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Eliminate weeks of branding friction. Generate memorable, domain-verified business names and design print-ready vector logo packages in one seamless session.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          <div style={{ padding: '2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brass)', marginBottom: '1rem' }}>
              01
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
              Intelligent Naming Synthesis
            </h3>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              Configure 8 distinct naming style taxonomies, variable temperature decoding ($0.2$ to $1.1$), and string length parameters. Our phonetic synthesis algorithm creates catchy, memorable coinages.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brass)', marginBottom: '1rem' }}>
              02
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
              Real-Time Domain Verification
            </h3>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              As business names are generated, asynchronous DNS queries evaluate registration statuses across .com, .io, .ai, and .app top-level domains in parallel with zero broker markups.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brass)', marginBottom: '1rem' }}>
              03
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
              Integrated Vector Studio
            </h3>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              Transfer your selected name directly into the Vector Studio. Export infinite-resolution SVGs, high-res transparent PNGs, and print-ready 300 DPI PDF brand packages with 100% commercial ownership.
            </p>
          </div>
        </div>
      </section>

      {/* ── High-Authority SEO Content & Guide Section ───────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.35rem 1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-brass)', marginBottom: '1rem' }}>
              ✦ Comprehensive Founder&apos;s Guide
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink)', lineHeight: 1.25 }}>
              The #1 Free Business Name Generator With Logo &amp; AI Brand Discovery Engine
            </h2>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
              Explore endless business name ideas, generate Indian startup names, compare against Namelix, and design vector logos with our free logo maker &amp; logo generator.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Pillar 1 */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                1. Free Business Name Generator With Logo: 1-Click Visual Branding
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Founding a company requires more than just an idea—you need a cohesive visual presence. As a dedicated <strong>business name generator with logo</strong>, UniqueBusinessName removes the disconnect between naming and design. When you find candidate <strong>business name ideas</strong>, click &ldquo;Create Logo with This Name&rdquo; to immediately launch our integrated <strong>logo maker</strong> and <strong>logo generator</strong>.
              </p>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Customize typography, layout geometry, iconography, and color palettes, then export infinite-resolution vector SVG, high-res transparent PNG, and PDF packages with zero paywalls.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                2. AI Free vs. Business Name Generator No AI Modes
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Different founders prefer different naming philosophies. Our platform gives you full control over generative mechanics:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Business Name Generator AI Free:</strong> Generates creative, phonetic coinages, compound fusions, and evocative modern brand narratives using neural language models.</li>
                <li><strong>Business Name Generator No AI:</strong> Dial temperature down to Low (0.2) and select Real Words or Compound Words for strict, dictionary-based, deterministic combinations without invented coinages.</li>
                <li><strong>Linguistic Customization:</strong> Filter by character length (short, medium, long) and explore 8 distinct stylistic taxonomies.</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                3. Business Name Generator Indian &amp; Global Market Adaptability
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Looking for culturally resonant names for ventures in India and Southeast Asia? Our <strong>business name generator indian</strong> algorithms incorporate Sanskrit root words, Hindi morphemes, and global English blendings tailored for tech startups in Bangalore, D2C brands in Mumbai, and boutique agencies in Delhi NCR.
              </p>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Every name idea is checked simultaneously against <code>.com</code>, <code>.io</code>, <code>.ai</code>, and <code>.app</code> domains so your Indian brand is immediately positioned for worldwide expansion.
              </p>
            </div>

            {/* Pillar 4 */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                4. The Superior Free Namelix Alternative (Business Name Generator Namelix)
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Many founders searching for a <strong>business name generator namelix</strong> alternative find that Namelix heavily promotes expensive premium domains listed at $1,000–$5,000+ through domain brokers, while charging extra for vector logo exports.
              </p>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                UniqueBusinessName offers unbiased DNS lookups for clean available domains, zero broker markups, 8 fine-tuned naming styles, and an in-house vector <strong>logo maker</strong> completely free of charge.
              </p>
            </div>

            {/* Pillar 5 */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                5. Design Logo for Business: Online AI Graphic Design &amp; Brand Suite
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Looking to <strong>design logo for business free</strong> or discover an AI-powered <strong>company logo maker</strong>? Whether you are <strong>designing a new logo for business</strong> or want to <strong>design your own logo for business</strong> online, our suite provides complete creative control:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', color: 'var(--color-ink)' }}>
          Frequently Asked Questions
        </h2>
        <FAQAccordion />
      </section>

      {/* ── Platform Footer ───────────────────────────────────────── */}
      <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-ink)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-brass)' }}>✦</span> UniqueBusinessName
            </div>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.88rem', lineHeight: 1.5, maxWidth: '280px', marginBottom: '0.75rem' }}>
              Precision AI Business Name Generator and Vector Logo Studio.
            </p>
            <div style={{ color: 'var(--color-ink-faint)', fontSize: '0.8rem', lineHeight: 1.5, borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
              📍 <strong>Location:</strong><br />
              Palm Road, Shipra Suncity,<br />
              Indirapuram, Ghaziabad,<br />
              Uttar Pradesh 201014, India
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-ink)', fontWeight: 600, marginBottom: '0.85rem', fontSize: '0.92rem' }}>Core Engines</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('name-generator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-ink-muted)', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Business Name Generator
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('logo-creator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-ink-muted)', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Logo Creator Suite
              </button>
              <Link href="/pricing" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>
                Brand Pro Plan
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-ink)', fontWeight: 600, marginBottom: '0.85rem', fontSize: '0.92rem' }}>Compare Alternatives</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/alternatives/namelix" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Namelix Alternative</Link>
              <Link href="/alternatives/looka" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Looka Alternative</Link>
              <Link href="/alternatives/business-name-generator" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>BNG Alternative</Link>
              <Link href="/alternatives/godaddy" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>GoDaddy Alternative</Link>
              <Link href="/alternatives/canva" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Canva Alternative</Link>
              <Link href="/alternatives/design-com" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Design.com Alternative</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-ink)', fontWeight: 600, marginBottom: '0.85rem', fontSize: '0.92rem' }}>Company &amp; Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/about" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>About Us</Link>
              <Link href="/contact" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Contact &amp; Support</Link>
              <Link href="/blog" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Blog &amp; Guides</Link>
              <Link href="/privacy" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Terms of Service</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--color-ink-faint)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} UniqueBusinessName.com. All rights reserved. Built for modern founders.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'var(--color-paper)', border: '1px solid var(--color-border)', color: 'var(--color-ink-muted)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
