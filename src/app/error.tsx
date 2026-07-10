'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

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
        background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.05em'
      }}>500</h1>
      <h2 style={{ fontSize: '2rem', marginTop: '1rem', fontWeight: 700 }}>Something went wrong!</h2>
      <p style={{ color: '#94a3b8', maxWidth: '450px', marginTop: '0.5rem', lineHeight: '1.6' }}>
        We encountered a telemetry or rendering issue. Our automated systems have been notified.
      </p>
      <button 
        onClick={() => reset()}
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
          color: '#fff',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(239, 68, 68, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.4)';
        }}
      >
        Try Again
      </button>
    </div>
  );
}
