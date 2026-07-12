import { Link } from '../components/Link/Link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      color: 'var(--text)',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🌀</div>
      <p style={{
        fontFamily: 'var(--font-accent)',
        fontSize: '6rem',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        404
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
        fontWeight: 800,
        color: 'var(--text)',
        marginBottom: '0.875rem',
        letterSpacing: '-0.02em',
      }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '380px', lineHeight: 1.6, marginBottom: '2.5rem', fontSize: '1rem' }}>
        The wheel spun off into the cosmos and couldn't find that page. Let's get you back to spinning!
      </p>
      <Link
        href="/"
        className="btn-glow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          padding: '0.875rem 2rem',
        }}
      >
        🌀 Back to the Wheel
      </Link>
    </div>
  );
}
