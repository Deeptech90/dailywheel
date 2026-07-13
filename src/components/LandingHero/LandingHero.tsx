import styles from './LandingHero.module.css';

interface LandingHeroProps {
  onStartGenerating: () => void;
  onExploreCategories: () => void;
}

const BENEFITS = [
  '100+ Categories',
  'AI Powered',
  'Free Forever',
  'Domain Suggestions',
];

export function LandingHero({ onStartGenerating, onExploreCategories }: LandingHeroProps) {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Live badge */}
      <div className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        Business Name Generator
      </div>

      {/* Headline */}
      <h1 className={styles.headline}>
        Find the{' '}
        <span className={styles.headlineAccent}>Perfect Business Name</span>
        {' '}in Seconds
      </h1>

      {/* Subheading */}
      <p className={styles.subheading}>
        Generate creative, brandable business names instantly with our interactive spinning wheel.
      </p>

      {/* Benefit pills */}
      <div className={styles.benefits}>
        {BENEFITS.map(b => (
          <span key={b} className={styles.benefit}>
            <span className={styles.benefitCheck}>✓</span>
            {b}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className={styles.ctaRow}>
        <button
          className={styles.ctaPrimary}
          onClick={onStartGenerating}
          id="hero-start-generating"
        >
          🎡 Start Generating
        </button>
        <button
          className={styles.ctaSecondary}
          onClick={onExploreCategories}
          id="hero-explore-categories"
        >
          Explore Categories ↓
        </button>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollChevron}>↓</span>
        Scroll to explore
      </div>
    </section>
  );
}
