import { Link } from '../components/Link/Link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%)',
      color: '#fff',
      fontFamily: 'var(--font-body), system-ui, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '6rem',
        fontWeight: 900,
        margin: 0,
        background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.05em'
      }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginTop: '1rem', fontWeight: 700 }}>Lost in Gravity?</h2>
      <p style={{ color: '#94a3b8', maxWidth: '450px', marginTop: '0.5rem', lineHeight: '1.6' }}>
        The page you are looking for has been pulled into a black hole or never existed. Let's get you back on track.
      </p>
      <Link href="/" style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
        color: '#fff',
        padding: '0.75rem 2rem',
        borderRadius: '9999px',
        fontWeight: 600,
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 25px rgba(139, 92, 246, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.4)';
      }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
