import { useState } from 'react';
import { GeneratorApp } from '../components/GeneratorApp/GeneratorApp';
import { AdSlot } from '../components/AdSlot/AdSlot';
import { Link } from '../components/Link/Link';

/* ── Accordion FAQ ──────────────────────────────────────── */
const FAQS = [
  {
    q: 'Is the generator 100% free to use?',
    a: 'Yes, UniqueBusinessName.com is completely free. You can generate names, enter custom daily choices, spin as many times as you want — no account required.',
  },
  {
    q: 'Can I use it for things other than business names?',
    a: 'Absolutely! Switch to "Daily Choices" to enter your own custom options for anything — what to eat, which movie to watch, team decisions, and more. Or try Spirit Animal mode just for fun!',
  },
  {
    q: 'Do I own the rights to the generated names?',
    a: 'The names are generated programmatically and we make no intellectual property claims on them. However, always verify trademark registries (USPTO, EUIPO) before registering any business name.',
  },
  {
    q: 'How does the anti-gravity physics engine work?',
    a: 'We use the HTML5 Canvas API with custom physics formulas simulating angular torque, speed-dependent kinetic friction, and directional acceleration. The result is organic, realistic wheel motion — not a simple random timer.',
  },
  {
    q: 'Can I edit the wheel segments manually?',
    a: 'Yes! In Business Name or Daily Choices mode, click "Edit Segments" below the wheel to add, remove, or rename any option directly.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'UniqueBusinessName.com is a mobile-first Progressive Web App (PWA). You can swipe the wheel, tap the hub to spin, and even install it on your home screen for offline use.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          color: open ? 'var(--glow)' : '#fff',
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 700,
          padding: '1.1rem 0',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          transition: 'color 0.2s ease',
        }}
        aria-expanded={open}
      >
        {q}
        <span style={{
          flexShrink: 0,
          fontSize: '1.25rem',
          color: 'var(--glow)',
          transition: 'transform 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'none',
          display: 'inline-block',
        }}>+</span>
      </button>
      {open && (
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          paddingBottom: '1.1rem',
          margin: 0,
        }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Top Ad */}
      <AdSlot type="banner" adSlot="9876543210" />

      {/* Main App */}
      <GeneratorApp />

      {/* ── Content Section ── */}
      <div style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '3rem 1.5rem 1rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
          marginBottom: '3rem',
        }} />

        {/* Section headline */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 900,
          color: '#fff',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          Three Wheels. <span style={{
            background: 'linear-gradient(135deg, var(--glow), var(--cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Infinite Decisions.</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Finding the right name for your startup — or even just deciding what to eat — can feel overwhelming.
          Our physics-driven Anti-Gravity Wheel makes decisions fast, scientific, and surprisingly fun.
        </p>

        {/* Feature cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {[
            { icon: '🏢', title: 'Business Name Generator', desc: 'Pick an industry, load 10 premium brandable names, spin the wheel. Perfect for startups, freelancers, and side projects.' },
            { icon: '📋', title: 'Daily Choices Decider', desc: 'Enter your own options — what to eat, which workout to do, or which movie to watch. Say goodbye to analysis paralysis forever.' },
            { icon: '🐾', title: 'Spirit Animal Reveal', desc: 'A fun, personality-based wheel that reveals which animal represents your energy today — complete with unique character traits.' },
          ].map(card => (
            <div key={card.title} style={{
              background: 'rgba(13,13,34,0.7)',
              border: '1px solid rgba(168,85,247,0.18)',
              borderRadius: '20px',
              padding: '1.5rem',
              backdropFilter: 'blur(12px)',
              transition: 'border-color 0.25s ease, transform 0.25s ease',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Middle Ad */}
        <AdSlot type="box" adSlot="8765432109" />

        {/* Verification steps */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          color: '#fff',
          fontSize: '1.35rem',
          fontWeight: 800,
          marginTop: '2.5rem',
          marginBottom: '0.75rem',
        }}>
          After You Spin: 4 Verification Steps
        </h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          Once you land on a business name, run through these checks before committing:
        </p>
        <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: 1.65, fontSize: '0.93rem', marginBottom: '3rem' }}>
          <li>Search domain availability (.com, .io, .co) — use <a href="https://www.namecheap.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--glow)' }}>Namecheap</a> or GoDaddy.</li>
          <li>Check trademark databases — <a href="https://tmsearch.uspto.gov" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--glow)' }}>USPTO</a> (US), <a href="https://euipo.europa.eu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--glow)' }}>EUIPO</a> (EU).</li>
          <li>Verify social media handles on Instagram, X (Twitter), LinkedIn, and TikTok.</li>
          <li>Google the name to identify potential conflicts with existing brands.</li>
        </ol>

        {/* FAQ */}
        <div style={{
          background: 'rgba(13,13,34,0.65)',
          border: '1px solid rgba(168,85,247,0.15)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(12px)',
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 900,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <AdSlot type="banner" adSlot="7654321098" />

      {/* ── Footer ── */}
      <footer style={{
        padding: '3rem 1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,5,16,0.95)',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🌀</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>UniqueBusinessName</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              The physics-driven wheel for all your decisions. Built with ❤️ using React.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['/', '/'].map((href, i) => (
                <Link key={i} href={href} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>
                  {i === 0 ? '🏢 Business Name Generator' : '📋 Daily Decision Wheel'}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { href: '/about',   label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.85rem' }}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms',   label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.85rem' }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            © 2026 UniqueBusinessName.com — All rights reserved. GDPR &amp; CCPA Compliant.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: 'var(--glow)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </footer>
    </>
  );
}
