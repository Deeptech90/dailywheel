import { useEffect, useState } from 'react';
import { Link } from '../../components/Link/Link';
import styles from '../legal.module.css';

export default function ContactUs() {
  useEffect(() => {
    document.title = 'Contact Us | UniqueBusinessName.com';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with the UniqueBusinessName.com team for inquiries or feedback.');
    }
  }, []);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Generator
      </Link>
      
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>Get in touch with the UniqueBusinessName.com team</p>

      <section className={styles.section}>
        <p className={styles.text}>
          Have a question about our naming generator, feedback on the anti-gravity physics wheel, or advertising opportunities? Reach out using the form below or email us directly.
        </p>
      </section>

      {submitted ? (
        <div className={styles.contactBox} style={{ border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.05)' }}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0, color: '#10b981' }}>✓ Message Sent</h2>
          <p className={styles.text} style={{ marginBottom: 0 }}>
            Thank you for reaching out! We have received your inquiry and will get back to you within 24–48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="contact-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '1rem',
                minHeight: '48px',
                fontFamily: 'var(--font-body)',
              }}
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="contact-email" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '1rem',
                minHeight: '48px',
                fontFamily: 'var(--font-body)',
              }}
              placeholder="e.g. jane@example.com"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="contact-message" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '1rem',
                minHeight: '120px',
                fontFamily: 'var(--font-body)',
                resize: 'vertical',
              }}
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--glow) 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '48px',
              fontFamily: 'var(--font-display)',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem',
            }}
          >
            Submit Message
          </button>
        </form>
      )}

      <div className={styles.contactBox} style={{ marginTop: '2.5rem' }}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Direct Inquiries</h2>
        <p className={styles.text}>
          General Support: <span className={styles.highlight}>support@uniquebusinessname.com</span>
        </p>
        <p className={styles.text}>
          Partnerships & Ads: <span className={styles.highlight}>ads@uniquebusinessname.com</span>
        </p>
      </div>
    </div>
  );
}
