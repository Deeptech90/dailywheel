import { useState } from 'react';
import { Link } from '../../components/Link/Link';

const SUBJECTS = [
  'General Question',
  'Business Name Suggestion',
  'Bug Report',
  'Feature Request',
  'Partnership Inquiry',
  'Press & Media',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name    = 'Name is required';
    if (!form.email.trim()) e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Please write at least 20 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    // Mailto fallback — replace with Formspree or a serverless function for production
    const mailto = `mailto:contact@uniquebusinessname.com?subject=${encodeURIComponent(`[${form.subject}] ${form.name}`)}&body=${encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)}`;
    window.open(mailto, '_blank');
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(5,5,16,0.9)',
    border: '1.5px solid rgba(168,85,247,0.25)',
    borderRadius: '14px',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    padding: '0.875rem 1.125rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const errorStyle: React.CSSProperties = {
    color: '#f87171',
    fontSize: '0.8rem',
    marginTop: '0.375rem',
    display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--text)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--glow)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, marginBottom: '3rem', opacity: 0.85 }}>
          ← Back to Wheel
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '999px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--cyan-light)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
            ✉️ Contact Us
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #fff 0%, #e2d9f3 30%, var(--glow) 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
            We'd Love to Hear From You
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Have a question, suggestion, or just want to say hi? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {submitted ? (
          /* Success state */
          <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Message Sent!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your email client should open. If not, email us directly at <strong style={{ color: 'var(--glow)' }}>contact@uniquebusinessname.com</strong></p>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }); }} style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-light))', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.75rem 1.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
              Send Another Message
            </button>
          </div>
        ) : (
          /* Contact form */
          <form onSubmit={handleSubmit} noValidate style={{ background: 'rgba(13,13,34,0.75)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}>
            {/* Accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent), var(--glow), var(--cyan))' }} />

            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ ...inputBase, borderColor: errors.name ? '#f87171' : undefined }}
                />
                {errors.name && <span style={errorStyle}>{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ ...inputBase, borderColor: errors.email ? '#f87171' : undefined }}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Subject</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="contact-subject"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{ ...inputBase, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}
                >
                  {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#1c1c40' }}>{s}</option>)}
                </select>
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>▾</span>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Message *</label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell us how we can help…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputBase, resize: 'vertical', minHeight: '130px', borderColor: errors.message ? '#f87171' : undefined }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {errors.message && <span style={errorStyle}>{errors.message}</span>}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: 'auto', marginTop: '0.375rem' }}>{form.message.length} chars</span>
              </div>
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                padding: '0.9rem 2rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                letterSpacing: '0.01em',
              }}
            >
              ✉️ Send Message
            </button>
          </form>
        )}

        {/* Alternative contact */}
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          Or email us directly at{' '}
          <a href="mailto:contact@uniquebusinessname.com" style={{ color: 'var(--glow)', textDecoration: 'none' }}>
            contact@uniquebusinessname.com
          </a>
        </div>
      </div>
    </div>
  );
}
