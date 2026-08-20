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

const ANIMAL_FAQS = [
  {
    q: 'How does the spirit animal wheel work?',
    a: 'The wheel is loaded with a curated list of spirit animals, each with a unique personality trait. You give it a spin and the physics engine determines which animal lands in the winner slot — that\'s your spirit animal for today.',
  },
  {
    q: 'What is a spirit animal?',
    a: 'The concept of a spirit animal, or power animal, originates from indigenous spiritual traditions where certain animals are believed to guide or protect individuals. In modern pop culture it\'s used more lightheartedly to describe a creature whose personality or characteristics resonate with your own.',
  },
  {
    q: 'What spirit animals are included?',
    a: 'The wheel includes a diverse range of animals — from majestic creatures like the Eagle (vision, freedom) and Wolf (loyalty, instinct) to playful ones like the Dolphin (playfulness, intelligence) and Fox (cleverness, adaptability). Each result includes the animal\'s signature trait.',
  },
  {
    q: 'Can I spin multiple times?',
    a: 'Absolutely! You can spin as many times as you like. Each result is saved to your spin history so you can look back at past reveals.',
  },
  {
    q: 'Is the spirit animal reveal free?',
    a: 'Yes, completely free. No account needed. Spin to your heart\'s content.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
      {ANIMAL_FAQS.map((faq, i) => {
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

export default function SpiritAnimalPage() {
  return (
    <div style={pageStyles}>
      {/* Pre-rendered SEO content — visible to crawlers before JS executes */}
      <section style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--text)', marginBottom: '1rem' }}>
          Spirit Animal Wheel — Spin to Discover Your Inner Animal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '680px', marginBottom: '2rem' }}>
          Which creature speaks to your soul today? Spin the Anti-Gravity Spirit Animal Wheel and discover
          which animal's energy is guiding you. Our curated collection of spirit animals — from the wise
          Owl to the bold Lion — each carry unique personality traits and symbolic meanings. Give it a whirl
          and see which one the universe sends your way. Free to play, no sign-up required.
        </p>
      </section>

      {/* Interactive Wheel — initialized in "animal" mode */}
      <GeneratorApp initialMode="animal" />

      {/* SEO Content Section */}
      <section style={seoSectionStyles}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Spirit Animals &amp; Their Meanings
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Each animal on the wheel carries a symbolic trait associated with it across many cultural traditions.
              Here are some examples of what landing on each spirit animal might signify:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', lineHeight: 2.0 }}>
              <li><strong>🦅 Eagle</strong> — Vision, freedom, and spiritual awareness</li>
              <li><strong>🐺 Wolf</strong> — Loyalty, intuition, and pack strength</li>
              <li><strong>🦁 Lion</strong> — Courage, leadership, and confidence</li>
              <li><strong>🦊 Fox</strong> — Cleverness, adaptability, and quick thinking</li>
              <li><strong>🐬 Dolphin</strong> — Playfulness, intelligence, and harmony</li>
              <li><strong>🐻 Bear</strong> — Grounding, strength, and introspection</li>
              <li><strong>🦋 Butterfly</strong> — Transformation, growth, and renewal</li>
              <li><strong>🐢 Turtle</strong> — Patience, wisdom, and steady progress</li>
            </ul>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem' }}>
              How to Use the Spirit Animal Wheel
            </h3>
            <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>The wheel is pre-loaded with all spirit animals — no setup needed.</li>
              <li>Take a breath, set an intention, then press <strong>SPIN THE WHEEL</strong>.</li>
              <li>Watch the physics-powered wheel slow to a stop.</li>
              <li>Read the animal name and trait revealed in the result panel.</li>
              <li>Reflect on how that energy applies to your day!</li>
            </ol>
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
            <Link href="/decision-wheel" style={{ padding: '0.65rem 1.5rem', background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              🎯 Decision Wheel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
