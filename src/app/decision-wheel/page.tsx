import { useState } from 'react';
import GeneratorApp from '../../components/GeneratorApp/GeneratorApp';
import { Link } from '../../components/Link/Link';

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

const DECISION_FAQS = [
  {
    q: 'What can I use the decision wheel for?',
    a: 'Anything that requires a random choice! Common uses include picking a restaurant for dinner, choosing a movie to watch, deciding who pays the bill, settling friendly debates, selecting a workout routine, picking a travel destination, or making any everyday decision you find hard to commit to.',
  },
  {
    q: 'How do I add my own options to the wheel?',
    a: "Switch to \"Daily Choices\" mode, then type each of your options into the text fields provided. You can add up to 20 custom options. Once you've entered at least two choices, hit \"Load Wheel\" and spin away.",
  },
  {
    q: 'Is the spin truly random?',
    a: "Yes. The wheel uses a physics simulation with randomised initial torque, so each spin produces a genuinely unpredictable result. There's no bias toward any particular segment.",
  },
  {
    q: 'Can I save my custom option sets?',
    a: "Your options are saved in your browser's local storage so they persist across page reloads. If you sign in, your options can sync across devices via cloud backup.",
  },
  {
    q: 'Is the decision wheel free?',
    a: 'Yes, completely free. No signup required. You can spin as many times as you like.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
      {DECISION_FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
            >
              {faq.q}
              <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', color: isOpen ? 'var(--primary)' : 'var(--text-dim)', display: 'inline-block' }}>▾</span>
            </button>
            <div style={{ maxHeight: isOpen ? '300px' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <p style={{ margin: 0, padding: '0 1.5rem 1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DecisionWheelPage() {
  return (
    <div style={pageStyles}>
      {/* Pre-rendered SEO content — visible to crawlers before JS executes */}
      <section style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--text)', marginBottom: '1rem' }}>
          Free Decision Wheel Spinner — Let Fate Decide for You
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '680px', marginBottom: '2rem' }}>
          Can't make up your mind? Our free decision wheel spinner takes the stress out of everyday choices.
          Enter your custom options, give the wheel a spin, and let physics decide. Whether you're picking
          a restaurant, choosing a movie, settling a debate with friends, or making any other daily decision —
          the Anti-Gravity Decision Wheel delivers a fair, random, and satisfying answer every time.
          No sign-up needed. 100% free.
        </p>
      </section>

      {/* Interactive Wheel — initialized in "daily" mode */}
      <GeneratorApp initialMode="daily" />

      {/* SEO Content Section */}
      <section style={seoSectionStyles}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              How the Decision Wheel Works
            </h2>
            <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <li><strong>Enter your choices</strong> — type each option into the "Daily Choices" panel. Add up to 20 custom options.</li>
              <li><strong>Load the wheel</strong> — click "Load Wheel" to populate the spinner with your options.</li>
              <li><strong>Spin it</strong> — press "SPIN THE WHEEL" or tap Space. The physics engine takes over.</li>
              <li><strong>Accept the result</strong> — the wheel decelerates with real momentum and lands on a winner. Decision made!</li>
            </ol>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem' }}>
              Popular Uses for the Decision Wheel
            </h3>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>Where to eat tonight (add your favourite restaurants)</li>
              <li>What movie or TV show to watch</li>
              <li>Who picks up the tab</li>
              <li>Which workout to do today</li>
              <li>Random gift ideas for a friend</li>
              <li>Classroom activities or lesson plans</li>
              <li>Team-building icebreakers</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
            <FAQAccordion />
          </div>
        </div>

        {/* Cross-link CTA */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Also try our other free tools:</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ padding: '0.65rem 1.5rem', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              🏢 Business Name Generator
            </Link>
            <Link href="/spirit-animal" style={{ padding: '0.65rem 1.5rem', background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              🐾 Spirit Animal Wheel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
