import styles from './LandingHero.module.css';

// NOTE: The H1 for the homepage now lives in src/app/page.tsx for SEO focus.
// This component renders an animated visual sub-heading only — no <h1> tag here.
export function LandingHero() {
  return (
    <section className={styles.hero} aria-label="Hero tagline">
      <p className={styles.headline}>
        The Physics-Powered Name Generator
      </p>
      <p className={styles.subheading}>
        Spin the Anti-Gravity Wheel — get a unique, brandable business name instantly.
      </p>
    </section>
  );
}
