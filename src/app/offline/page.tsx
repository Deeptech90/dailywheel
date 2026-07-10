'use client';

export default function OfflinePage() {
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
        background: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.05em'
      }}>Offline</h1>
      <h2 style={{ fontSize: '2rem', marginTop: '1rem', fontWeight: 700 }}>Connection Lost</h2>
      <p style={{ color: '#94a3b8', maxWidth: '450px', marginTop: '0.5rem', lineHeight: '1.6' }}>
        You are currently offline. Please check your internet connection and try reloading the page.
      </p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
          color: '#fff',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(71, 85, 105, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(71, 85, 105, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(71, 85, 105, 0.4)';
        }}
      >
        Retry Connection
      </button>
    </div>
  );
}
