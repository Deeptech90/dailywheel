import { Link } from '../../components/Link/Link';

export default function OfflinePage() {
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
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📡</div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #fff, var(--glow))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
      }}>
        You're Offline
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>
        It looks like you lost your internet connection. Don't worry — once you're back online, the wheel will spin again!
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
        🔄 Try Again
      </Link>
    </div>
  );
}
