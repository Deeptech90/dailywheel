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
    a: 'Our AI naming engine leverages large language models and phonetic synthesis algorithms tuned for morphological brandability. You provide keywords and configure naming styles (Brandable, Compound, Alternate Spellings, Real Words, Rhyming, Non-English Roots), decoding randomness temperature, and length constraints. As names are synthesized, real-time asynchronous DNS lookups verify .com, .io, .ai, and .app domain availability.'
  },
  {
    q: 'What makes UniqueBusinessName the best name generator for a business or startup?',
    a: 'Unlike traditional business name generators that simply attach generic dictionary prefixes, our AI name generator for a business uses 8 linguistic archetypes, neural temperature decoding, and live DNS domain checks across .com, .io, .ai, and .app to produce distinctive, high-conversion brand names with instant logo creation.'
  },
  {
    q: 'Can this company generator name tool check real-time domain availability?',
    a: 'Yes! As you generate names with our company generator name engine, live DNS over HTTPS queries evaluate registration statuses across .com, .io, .ai, and .app top-level domains in parallel so you never fall in love with an unavailable name.'
  },
  {
    q: 'Why use an AI name business generator instead of manual brainstorming?',
    a: 'An AI name business generator explores thousands of morphological coinages, Greek and Latin roots, phonetic rhythms, and semantic associations in seconds. It eliminates brainstorm gridlock and ensures every candidate name is evaluated for domain viability and trademark friendliness.'
  },
  {
    q: 'Can I instantly create a logo for a generated business name?',
    a: 'Yes! Every generated name card has a 1-click "Create Logo with This Name" action button. Clicking it instantly bridges your brand name into the Logo Creator Suite, pre-populating your brand identity into an automated visual composition and interactive canvas customizer.'
  },
  {
    q: 'What file formats are included with the logo generator?',
    a: 'The Business Logo Creator Suite exports complete brand asset packages including infinite-resolution vector SVGs (ideal for print, signage, and embroidery), high-resolution transparent PNGs (512px, 1024px, 2048px), and print-ready PDF brand sheets.'
  },
  {
    q: 'Is UniqueBusinessName a free online logo maker and download tool?',
    a: 'Yes! UniqueBusinessName is a 100% free online logo maker and download platform. You can generate unlimited brand logos, test real-world mockup studio previews, and download high-resolution SVG, transparent PNG, and PDF brand packages with zero subscription paywalls.'
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
              boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {faq.q}
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  color: isOpen ? 'var(--primary)' : 'var(--text-dim)',
                  flexShrink: 0,
                  marginLeft: '1rem',
                }}
              />
            </button>
            <div
              style={{
                maxHeight: isOpen ? '300px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'var(--surface-2)',
              }}
            >
              <p style={{ margin: 0, padding: '0 1.5rem 1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {faq.a}
              </p>
            </div>
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
    "name": "UniqueBusinessName.com — AI Business Name Generator & Company Generator Name Suite",
    "url": "https://uniquebusinessname.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Generate unique, creative, and brandable business names with our top-rated business name generators and company generator name engine. Free names for companies generator with real-time domain verification and vector logo creator.",
    "featureList": [
      "AI Business Name Generator",
      "Company Generator Name Engine",
      "Name Generator for a Business",
      "Names for Companies Generator",
      "Vector Logo Creator Suite",
      "Real-Time Domain Verification (.com, .io, .ai, .app)",
      "Mockup Studio Previews",
      "1-Click State Bridge",
      "Vector SVG & High-Res PNG Exports",
      "PWA Installable",
      "Offline Support"
    ]
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
      <SEOHead
        title="AI Business Name Generator — Company Generator Name & Free Logo Maker | UniqueBusinessName.com"
        description="Generate catchy, brandable names with the #1 AI business name generator and company generator name suite. Free names for companies generator, live domain checks (.com, .io, .ai), and instant vector logo downloads."
        keywords="business generator name, business name generators, company generator name, generator business names, name generator for a business, names for a company generator, names for companies generator, business name generator, name business generator, ai business name generator, free online logo maker and download, instant domain check, brand kit generator"
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
              1. Intelligent AI Naming Engine
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
              3. Free Online Logo Maker and Download Suite
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Transfer your selected name into our free online logo maker and download print-ready vector SVGs, high-resolution transparent PNGs, and PDF brand packages. Customize typography, colors, and live mockups instantly.
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
              The Ultimate AI Business Name Generator &amp; Company Generator Name Suite
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
              Everything you need to discover memorable names for companies generator tools produce, check instant domain registrations, and launch your brand.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Pillar 1 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                1. Why Choose Our AI Name Generator for a Business?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Choosing the right brand name is the single most critical foundation for your company&apos;s identity. Traditional <strong>business name generators</strong> often spit out generic dictionary compound words or outdated dictionary mashups with unavailable domains. Our modern <strong>name generator for a business</strong> solves this by synthesizing phonetic morphology, syllable cadence, and brand psychology across 8 distinct styles (Brandable coinages, Compound words, Alternative spellings, Real words, Rhyming pairs, Non-English roots, Multi-word narratives, and Prestige surnames).
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Whether you need a cutting-edge tech startup moniker, a boutique agency title, or an e-commerce brand, our <strong>name business generator</strong> provides tailored, high-converting suggestions ready for trademark filing and commercial launch.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                2. Live DNS Verification: Real-Time Names for Companies Generator
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                There is nothing more frustrating than finding the perfect <strong>company generator name</strong> only to realize that the <code>.com</code> or <code>.io</code> domain was purchased a decade ago and parked with a $5,000 price tag. Unlike other <strong>names for a company generator</strong> platforms that push expensive broker markups, UniqueBusinessName performs real-time asynchronous DNS over HTTPS lookups directly on every generated card.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                You get instant, unbiased verification for <code>.com</code>, <code>.io</code>, <code>.ai</code>, and <code>.app</code> extensions, empowering you to claim an affordable, pristine digital home before you commit to your new <strong>business generator name</strong>.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                3. How to Turn Generator Business Names into a Complete Brand Package
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                A business name is only half the battle—your audience recognizes visual marks first. Our integrated platform bridges your chosen <strong>generator business names</strong> directly into an automated Vector Logo Creator Suite with one click.
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Explore Curated Aesthetics:</strong> Choose from Minimalist, Modern Gradient, Geometric, Emblem, Vintage, and Tech visual styles.</li>
                <li><strong>Real-World Mockup Previews:</strong> See your logo rendered instantly on business cards, mobile app screens, t-shirts, and storefront signage.</li>
                <li><strong>Print-Ready Exports:</strong> Download high-resolution vector SVG files, transparent PNGs up to 2048px, and PDF brand style sheets at zero cost.</li>
                <li><strong>100% Commercial Rights:</strong> Retain complete ownership of all generated names and vector assets for trademarking and marketing campaigns.</li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                4. Proven 4-Step Framework for Evaluating Names for Companies Generator Results
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Step 1: Pronounceability</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Pass the &ldquo;Radio Test&rdquo; — ensure anyone can spell your name accurately just by hearing it once.</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Step 2: Scalability</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Avoid overly narrow geographic or product constraints that limit future market expansion.</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Step 3: Trademark Clearance</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Verify candidate names against the USPTO TESS database and global trademark registries.</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Step 4: Vector Identity</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Test your typography and logo mark in high-contrast formats across light and dark backgrounds.</span>
                </div>
              </div>
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
