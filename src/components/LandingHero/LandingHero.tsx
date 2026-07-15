import styles from './LandingHero.module.css';

export function LandingHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <h1 className={styles.headline}>
        Find Your Perfect Business Name
      </h1>
      <p className={styles.subheading}>
        Generate a unique business name instantly with our interactive spinning wheel.
      </p>
    </section>
  );
}
