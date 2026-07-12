import { Link } from '../../components/Link/Link';

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
  padding: '5rem 1.5rem 4rem',
};

const FEATURES = [
  {
    icon: '⚛️',
    title: 'Physics-Driven Engine',
    desc: 'Custom angular torque, kinetic friction, and gravity formulas make every spin feel organic and real — no two spins are alike.',
  },
  {
    icon: '🏢',
    title: 'Business Name Generator',
    desc: 'Curated databases across 15+ industries deliver premium, brandable name suggestions ready to register.',
  },
  {
    icon: '📋',
    title: 'Custom Decision Wheel',
    desc: 'Enter your own choices for any decision — from lunch to life — and let the physics determine the winner.',
  },
  {
    icon: '🐾',
    title: 'Spirit Animal Mode',
    desc: 'A fun, personality-based wheel with animal traits that adds a playful dimension to your daily routine.',
  },
  {
    icon: '📱',
    title: 'Mobile-First PWA',
    desc: 'Fully installable as a Progressive Web App with offline support, home-screen icon, and smooth touch gestures.',
  },
  {
    icon: '🔐',
    title: 'Privacy First',
    desc: 'No account required. All preferences and spin history live in your browser — we never track your personal data without consent.',
  },
];

const STEPS = [
  { step: '01', title: 'Choose Your Mode', desc: 'Select Business Name, Daily Choices, or Spirit Animal.' },
  { step: '02', title: 'Load Your Options', desc: 'Pick a category or enter your custom choices.' },
  { step: '03', title: 'Spin the Wheel', desc: 'Tap the hub, swipe, or press Space. Watch physics take over.' },
  { step: '04', title: 'Get Your Answer', desc: 'The wheel stops on a winner. Copy, share, or check the domain!' },
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
            color: 'var(--glow)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '3rem',
            opacity: 0.85,
            transition: 'opacity 0.2s',
          }}
        >
          ← Back to Wheel
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--glow)',
            letterSpacing: '0.05em',
            marginBottom: '1.25rem',
          }}>
            🌀 About Us
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #fff 0%, #e2d9f3 30%, var(--glow) 65%, var(--cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.25rem',
          }}>
            Decisions Made Beautifully
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: '600px' }}>
            UniqueBusinessName.com was built to solve a universal problem: decision fatigue. 
            Whether you're naming a startup or just picking lunch, our physics-driven Anti-Gravity Wheel turns 
            any list of options into a kinetic, satisfying experience.
          </p>
        </div>

        {/* Mission */}
        <div style={{
          background: 'rgba(13,13,34,0.75)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '24px',
          padding: '2rem',
          backdropFilter: 'blur(16px)',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--accent), var(--glow), var(--cyan))',
          }} />
          <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Our Mission
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
            We believe great decisions shouldn't be stressful. By combining a physics simulation engine with curated data, 
            we created a tool that feels alive — one that makes the mundane act of choosing into something joyful. 
            From Fortune 500 team meetings to solo dinner-time dilemmas, the Anti-Gravity Wheel is your objective, 
            impartial, and entertaining co-pilot.
          </p>
        </div>

        {/* Features grid */}
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          What Makes Us Different
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: 'rgba(13,13,34,0.65)',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: '18px',
              padding: '1.5rem',
              backdropFilter: 'blur(12px)',
              transition: 'border-color 0.25s, transform 0.25s',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.625rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '0.975rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          How It Works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {STEPS.map(s => (
            <div key={s.step} style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              background: 'rgba(13,13,34,0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '1.25rem',
            }}>
              <div style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.8rem',
                color: '#fff',
                boxShadow: '0 0 16px rgba(124,58,237,0.35)',
              }}>
                {s.step}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              color: '#fff',
              textDecoration: 'none',
              padding: '0.875rem 2rem',
              borderRadius: '999px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 0 24px rgba(124,58,237,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            🌀 Try the Wheel Now
          </Link>
        </div>
      </div>
    </div>
  );
}
