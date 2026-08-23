import React from 'react';
import { Link } from '../../components/Link/Link';
import { Sparkles, Palette, Globe, ShieldCheck, Download, Wand2 } from 'lucide-react';

const pageStyles: React.CSSProperties = {
  minHeight: '100vh',
  fontFamily: 'var(--font-body)',
  color: 'var(--text)',
  position: 'relative',
  zIndex: 10,
};

const containerStyles: React.CSSProperties = {
  maxWidth: '860px',
  margin: '0 auto',
  padding: '4rem 1.5rem 4rem',
};

const FEATURES = [
  {
    icon: '✨',
    title: 'AI Business Name Generator',
    desc: 'Linguistic synthesis and LLM-driven generation across 8 naming styles with temperature randomness controls.',
  },
  {
    icon: '🎨',
    title: 'Vector Logo Creator Suite',
    desc: 'Interactive visual identity builder producing high-resolution SVG, transparent PNG, and PDF brand packages.',
  },
  {
    icon: '🌐',
    title: 'Real-Time Domain Verification',
    desc: 'Asynchronous DNS over HTTPS lookups verify .com, .io, .ai, and .app top-level domain availability instantly.',
  },
  {
    icon: '📱',
    title: 'Real-World Mockup Studio',
    desc: 'Preview generated brand marks projected onto realistic business cards, mobile screens, apparel, and storefronts.',
  },
  {
    icon: '⚡',
    title: '1-Click State Bridge',
    desc: 'Select any generated name to immediately populate the Logo Wizard without losing state or context.',
  },
  {
    icon: '🔐',
    title: '100% Commercial Rights',
    desc: 'You own all names and logos created on our platform. Free for commercial registration, trademarking, and branding.',
  },
];

const STEPS = [
  { step: '01', title: 'Enter Your Concept', desc: 'Type your business keywords or venture idea into the search engine.' },
  { step: '02', title: 'Tune Filters & Styles', desc: 'Select from 8 naming styles, decoding temperature, and name length constraints.' },
  { step: '03', title: 'Check Domain & Shortlist', desc: 'Review real-time domain availability and save preferred candidate names.' },
  { step: '04', title: 'Build Visual Brand Package', desc: 'Click "Create Logo with This Name" to design vector logos and export print-ready assets.' },
];

export default function AboutUs() {
  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2.5rem',
            transition: 'opacity 0.2s',
          }}
        >
          ← Back to Generator
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--primary)',
            letterSpacing: '0.02em',
            marginBottom: '1.25rem',
          }}>
            ✦ About UniqueBusinessName.com
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}>
            Empowering Modern Founders
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '640px' }}>
            UniqueBusinessName.com is a specialized AI branding platform designed to streamline the journey from business concept to complete visual brand identity in a single friction-free workflow.
          </p>
        </div>

        {/* Mission */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          }} />
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Our Mission
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Starting a new venture shouldn't require weeks of brainstorm gridlock or thousands of dollars in design agency fees. By uniting large language models, phonetic algorithms, and client-side vector composition tools, we give founders instant access to high-conversion branding assets.
          </p>
        </div>

        {/* Features grid */}
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Key Platform Capabilities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '0.975rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          How It Works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {STEPS.map(s => (
            <div key={s.step} style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--primary)',
              }}>
                {s.step}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Office Location & Contact */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '3.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            📍 Our Registered Location
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            <strong>UniqueBusinessName.com</strong><br />
            Palm Road, Shipra Suncity, Indirapuram,<br />
            Ghaziabad, Uttar Pradesh 201014, India<br />
            Inquiries: <a href="mailto:hello@uniquebusinessname.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>hello@uniquebusinessname.com</a>
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            className="btn-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              padding: '0.875rem 2.5rem',
            }}
          >
            ✦ Launch AI Name Generator
          </Link>
        </div>
      </div>
    </div>
  );
}
