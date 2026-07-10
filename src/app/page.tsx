import { GeneratorApp } from '../components/GeneratorApp/GeneratorApp';
import { AdSlot } from '../components/AdSlot/AdSlot';
import { Link } from '../components/Link/Link';

export const metadata = {
  title: 'AI-Powered Unique Business Name Generator | Anti-Gravity Wheel',
  description: 'Generate high-quality, creative, and brandable business names instantly. Spin the physics-driven Anti-Gravity Wheel of Names to choose the perfect name for your venture.',
  alternates: {
    canonical: 'https://uniquebusinessname.com',
  },
};

export default function Home() {
  return (
    <>
      {/* Top Banner AdSlot (CLS-protected) */}
      <AdSlot type="banner" adSlot="9876543210" />

      {/* Main Interactive Application Component */}
      <GeneratorApp />

      {/* High-Quality, AdSense-Compliant Original Content Section */}
      <div 
        style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '2rem 1.5rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.7',
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(168, 85, 247, 0.15)',
          background: 'rgba(10, 10, 26, 0.4)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>
          Find Your Unique Business Name (and more!)
        </h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Finding the right name for your startup, product, or service can feel overwhelming. Our AI-driven keyword engine combined with the anti-gravity physics decision wheel makes this process fast, scientific, and engaging.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          We've recently expanded the Anti-Gravity Wheel to support three distinct modes to help you overcome decision fatigue in all areas of life:
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          1. Business Name Generator
        </h3>
        <p style={{ marginBottom: '1.25rem' }}>
          Select your industry (Tech, Bakery, Consulting, E-Commerce, etc.) and we'll load the wheel with premium, highly-brandable name suggestions. Let the wheel pick the perfect identity for your next venture.
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          2. Daily Choices
        </h3>
        <p style={{ marginBottom: '1.25rem' }}>
          Can't decide what to eat, what workout to do, or what movie to watch? Type in your custom options, spin the wheel, and let physics make the choice for you. Say goodbye to analysis paralysis.
        </p>
        
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          3. Spirit Animal
        </h3>
        <p style={{ marginBottom: '1.25rem' }}>
          Just for fun—spin the wheel to discover which animal represents your personality today, complete with unique traits!
        </p>

        {/* Middle Inline Box AdSlot */}
        <AdSlot type="box" adSlot="8765432109" />

        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          The Science of Random Decision-Making
        </h3>
        <p style={{ marginBottom: '1.25rem' }}>
          Psychological studies in decision-making show that choice overload often leads to analysis paralysis. When we are faced with too many viable choices, we struggle to select a winner.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          By compiling choices onto an interactive wheel, you delegate the final selection to an objective, physics-driven randomizer. The wheel spins, shifts gravity parameters, and uses a deterministic mathematical friction formula to select a winner. This breaks mental friction and allows you to move forward with confidence.
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          Trademark and Domain Verification
        </h3>
        <p style={{ marginBottom: '1.25rem' }}>
          If you're using the wheel for business naming, make sure to follow these verification steps after you land on a winner:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Check domain registration availability (e.g., .com, .io, or local extensions like .co.uk).</li>
          <li>Search the national trademark database (such as the USPTO in the United States or EUIPO in the European Union) to ensure it doesn't conflict with existing active brands.</li>
          <li>Verify social media handle availability across major networks.</li>
        </ul>

        <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '2rem 0' }} />

        {/* FAQs */}
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
          Frequently Asked Questions (FAQ)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>Is the generator free to use?</h4>
            <p>Yes, UniqueBusinessName.com is 100% free. You can generate names, customize the wheel with daily choices, and spin as many times as you like.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>Can I use the wheel for things other than business names?</h4>
            <p>Absolutely! Switch to the "Daily Choices" mode to enter your own custom options for anything you want—from picking a restaurant to choosing a workout.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>Do I own the rights to the generated names?</h4>
            <p>The names are generated programmatically. We make no intellectual property claims on them. However, you must verify trademark registries before registering.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>How does the anti-gravity engine work?</h4>
            <p>We use the HTML5 Canvas API combined with custom physics formulas simulating angular torque, speed-dependent kinetic friction, and vertical vector acceleration to model realistic wheel motion.</p>
          </div>
        </div>
      </div>

      {/* Bottom Banner AdSlot */}
      <AdSlot type="banner" adSlot="7654321098" />

      {/* Footer component */}
      <footer 
        style={{
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(5, 5, 15, 0.9)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-body)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <Link href="/" style={{ color: 'var(--glow)', textDecoration: 'none' }}>Generator</Link>
          <Link href="/about" style={{ color: 'var(--glow)', textDecoration: 'none' }}>About Us</Link>
          <Link href="/contact" style={{ color: 'var(--glow)', textDecoration: 'none' }}>Contact Us</Link>
          <Link href="/privacy" style={{ color: 'var(--glow)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'var(--glow)', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/cookies" style={{ color: 'var(--glow)', textDecoration: 'none' }}>Cookie Policy</Link>
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          © 2026 UniqueBusinessName.com. All rights reserved. Registered PWA for mobile.
        </p>
      </footer>
    </>
  );
}
export const dynamic = 'force-static';
