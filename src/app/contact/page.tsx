import { useState } from 'react';
import { Link } from '../../components/Link/Link';
import { Icon } from '../../components/Icon/Icon';

const pageStyles: React.CSSProperties = {
  minHeight: '100vh',
  fontFamily: 'var(--font-body)',
  color: 'var(--text)',
  position: 'relative',
  zIndex: 10,
};

const containerStyles: React.CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto',
  padding: '5rem 1.5rem 4rem',
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setMessage('');
    }, 1500);
  };

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
            marginBottom: '3rem',
            transition: 'opacity 0.2s',
          }}
        >
          ← Back to Wheel
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
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
            marginBottom: '1rem',
          }}>
            👋 Get in Touch
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: '1rem',
          }}>
            We'd love to hear from you
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Have a feature request, found a bug, or just want to say hi? Drop us a message below.
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', animation: 'scaleBounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Message Sent!
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.5 }}>
                Thanks for reaching out. We'll get back to you as soon as the wheel stops spinning.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-glow"
                style={{ padding: '0.75rem 2rem' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 78, 216, 0.15)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 78, 216, 0.15)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="subject" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Subject</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="subject"
                    required
                    style={{
                      appearance: 'none',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 2.5rem 0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 78, 216, 0.15)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <option value="">Select a topic...</option>
                    <option value="feedback">General Feedback</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                  <Icon 
                    name="chevron-down" 
                    size={16} 
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Message</label>
                  <span style={{ fontSize: '0.75rem', color: message.length > 400 ? 'var(--accent)' : 'var(--text-dim)' }}>
                    {message.length} / 500
                  </span>
                </div>
                <textarea
                  id="message"
                  required
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    minHeight: '120px',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 78, 216, 0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-glow"
                style={{
                  padding: '0.875rem',
                  marginTop: '0.5rem',
                  opacity: status === 'submitting' ? 0.7 : 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  Prefer email? <a href="mailto:hello@uniquebusinessname.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>hello@uniquebusinessname.com</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
