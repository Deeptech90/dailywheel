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
      <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🌀</div>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '5rem',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--glow), var(--cyan))',
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
        color: '#fff',
        marginBottom: '0.875rem',
        letterSpacing: '-0.02em',
      }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '380px', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem' }}>
        The wheel spun off into the cosmos and couldn't find that page. Let's get you back to spinning!
      </p>
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
        }}
      >
        🌀 Back to the Wheel
      </Link>
    </div>
  );
}
