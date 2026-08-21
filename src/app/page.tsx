/* ============================================================
   Homepage — UniqueBusinessName.com
   Dual-Engine AI Branding Platform:
   1. AI Business Name Generator
   2. Business Logo Creator Suite
   Connected via unified BrandStateContext
   ============================================================ */

import React, { useState } from 'react';
import { Sparkles, Palette, Wand2, ShieldCheck, Download, Globe, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { useBrandState } from '../context/BrandStateContext';
import { NameGenerator } from '../components/NameGenerator/NameGenerator';
import { LogoMakerApp } from '../components/LogoMaker/LogoMakerApp';
import { Link } from '../components/Link/Link';

const FAQS = [
  {
    q: 'How does the AI Business Name Generator work?',
    a: 'Our AI naming engine leverages large language models and phonetic synthesis algorithms tuned for morphological brandability. You provide keywords and configure naming styles (Brandable, Compound, Alternate Spellings, Real Words, Rhyming, Non-English Roots), decoding randomness temperature, and length constraints. As names are synthesized, real-time asynchronous DNS lookups verify .com, .io, .ai, and .app domain availability.'
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

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
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
              3. Vector Logo Creator Suite
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Transfer your selected name into a 6-stage logo creator. Customise typography font families, letter spacing, icon scales, color palettes, and preview live on product mockups.
            </p>
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
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5, maxWidth: '280px' }}>
              Enterprise-grade AI Business Name Generator and Vector Logo Creator Suite.
            </p>
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
            <h4 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '0.85rem', fontSize: '0.95rem' }}>Company &amp; Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>About Us</Link>
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
