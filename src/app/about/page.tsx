import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'About Us | UniqueBusinessName.com',
  description: 'Discover the story behind UniqueBusinessName.com, our anti-gravity physics decision wheel, and our creative naming engine.',
  alternates: {
    canonical: 'https://uniquebusinessname.com/about',
  },
};

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Generator
      </Link>
      
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.subtitle}>Innovating Decision-Making & Brand Creation</p>

      <section className={styles.section}>
        <p className={styles.text}>
          Welcome to <span className={styles.highlight}>UniqueBusinessName.com</span>, where creative brand naming meets state-of-the-art interactive technology. We build tools that help founders, creators, and entrepreneurs break through creative blocks and discover the perfect name for their next venture.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Naming Problem</h2>
        <p className={styles.text}>
          Starting a business is hard, and finding a unique, brandable name is often one of the most frustrating steps. Traditional generators output thousands of low-quality, generic combinations in boring lists. We wanted to make name generation structured, creative, and above all, <span className={styles.highlight}>fun</span>.
        </p>
        <p className={styles.text}>
          At UniqueBusinessName.com, we combine a smart, localized keyword naming algorithm with a highly interactive, physical decision-making interface.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Anti-Gravity Physics Engine</h2>
        <p className={styles.text}>
          Instead of just displaying list items, we use a custom-coded **Anti-Gravity Physics Engine** to power our Selection Wheel.
        </p>
        <p className={styles.text}>
          When you spin the wheel, the gravity parameters shift. Floating ornamental icon elements drift upward under negative gravity (-0.15 px/frame²), and a high-velocity particle burst radiates from the center hub upon selection.
        </p>
        <p className={styles.text}>
          This produces an immersive web experience that is optimized for mobile touch inputs, featuring swipe-velocity spinning, pinch-to-zoom scaling, and device-orientation parallax effects.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Technology Stack</h2>
        <p className={styles.text}>
          To achieve blistering performance on mobile devices, we built UniqueBusinessName.com using a cutting-edge technical stack:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><span className={styles.highlight}>Server-Side Rendering (SSR)</span>: Powered by Next.js, allowing the site structure, SEO markup, and text content to load instantly in raw HTML.</li>
          <li className={styles.listItem}><span className={styles.highlight}>HTML5 Canvas API</span>: Smooth 60fps animations via browser `requestAnimationFrame` loops, bypassing heavy DOM manipulation.</li>
          <li className={styles.listItem}><span className={styles.highlight}>Custom Physics Engine</span>: Pure math-based kinematic formulas for angular momentum, friction, and vector particle movement.</li>
        </ul>
      </section>

      <section className={styles.contactBox}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Join Our Journey</h2>
        <p className={styles.text}>
          We are constantly refining our algorithms to support more industries and naming trends. If you have feedback or suggestions, feel free to reach out to us!
        </p>
        <p className={styles.text}>
          Email: <span className={styles.highlight}>contact@uniquebusinessname.com</span>
        </p>
      </section>
    </div>
  );
}
