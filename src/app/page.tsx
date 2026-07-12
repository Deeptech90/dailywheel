import { useState } from 'react';
import GeneratorApp from '../components/GeneratorApp/GeneratorApp';

const pageStyles: React.CSSProperties = {
  minHeight: '100vh',
  fontFamily: 'var(--font-body)',
  color: 'var(--text)',
};

const seoSectionStyles: React.CSSProperties = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '4rem 1.5rem',
  borderTop: '1px solid var(--border)',
};

const FAQS = [
  {
    q: 'How does the business name generator work?',
    a: 'We curated a database of highly brandable names across various industries. When you select a category (like Tech or Bakery), the wheel randomly selects a set of these names and uses our physics engine to pick a winner.'
  },
  {
    q: 'Can I use this for my own custom choices?',
    a: 'Yes! Switch to the "Daily Choices" mode to type in your own options (up to 20). It\'s perfect for deciding where to eat, what to watch, or settling friendly debates.'
  },
  {
    q: 'Is my spin history saved?',
    a: 'Your history is saved entirely in your local browser. We do not store your spin results or custom choices on any servers, ensuring total privacy.'
  },
  {
    q: 'Can I use the app offline?',
    a: 'Absolutely. Once you load the site once, it installs a Service Worker that allows you to use the core wheel functionality even without an internet connection.'
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div 
            key={i} 
            style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {faq.q}
              <span style={{ 
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: isOpen ? 'var(--primary)' : 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div style={{
              maxHeight: isOpen ? '200px' : '0',
              opacity: isOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'var(--surface-2)',
            }}>
              <p style={{ 
                margin: 0, 
                padding: '0 1.5rem 1.25rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div style={pageStyles}>
      <GeneratorApp />

      {/* SEO Content Section */}
      <section style={seoSectionStyles}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left Col: Features Content */}
          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.75rem', 
              fontWeight: 800,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              color: 'var(--text)'
            }}>
              The Ultimate Random Name Generator & Decision Wheel
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Whether you need to brainstorm a catchy name for your new startup, figure out what's for dinner, 
              or just settle a debate with friends, our physics-driven spinner wheel is the perfect tool.
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--success)' }}>✓</span>
                <span><strong>100% Free & No Signup:</strong> Generate unlimited ideas without creating an account.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--success)' }}>✓</span>
                <span><strong>Physics Engine:</strong> Real momentum, friction, and bounce physics for authentic spins.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--success)' }}>✓</span>
                <span><strong>Domain Checking:</strong> Found the perfect brand name? Check domain availability instantly.</span>
              </li>
            </ul>
          </div>

          {/* Right Col: FAQ */}
          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.75rem', 
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)'
            }}>
              Frequently Asked Questions
            </h2>
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 1.5rem',
        marginTop: '2rem',
      }}>
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              color: 'var(--text)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: 'var(--primary)' }}>●</span> UniqueBusinessName
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '280px' }}>
              The most advanced, physics-driven decision wheel on the web. Spin, decide, and conquer.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>App</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Business Mode</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Daily Choices</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Spirit Animals</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a>
              <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
              <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
            </div>
          </div>
        </div>
        <div style={{ 
          maxWidth: '1024px', 
          margin: '3rem auto 0', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} UniqueBusinessName.com. All rights reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
