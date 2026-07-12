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
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📡</div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '1rem',
      }}>
        You're Offline
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
        It looks like you lost your internet connection. Don't worry — once you're back online, the wheel will spin again!
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
        🔄 Try Again
      </Link>
    </div>
  );
}
