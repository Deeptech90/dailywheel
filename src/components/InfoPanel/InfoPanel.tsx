import styles from './InfoPanel.module.css';

interface InfoPanelProps {
  onClose: () => void;
}

const FEATURES = [
  {
    icon: '👆',
    label: 'Smart Touch',
    traditional: 'Tap to spin',
    enhanced: 'Swipe velocity + pinch-to-zoom',
  },
  {
    icon: '🌌',
    label: 'Animation',
    traditional: 'Basic easing',
    enhanced: 'Ease-out cubic + gravity bounce',
  },
  {
    icon: '🎉',
    label: 'Win Effect',
    traditional: 'Simple confetti',
    enhanced: 'Confetti + orbital particle burst',
  },
  {
    icon: '📱',
    label: 'Mobile',
    traditional: 'Responsive CSS',
    enhanced: 'Physics + device tilt parallax',
  },
  {
    icon: '🎨',
    label: 'Customization',
    traditional: 'Static styling',
    enhanced: 'Direction, gravity, segments, prompt',
  },
  {
    icon: '✨',
    label: 'Experience',
    traditional: 'Conventional',
    enhanced: 'Immersive anti-gravity UI',
  },
];

const HOW_TO_STEPS = [
  { icon: '📝', step: 'Add your options using the quick-add bar or Edit panel' },
  { icon: '👆', step: 'Tap the wheel, swipe across it, or press SPIN' },
  { icon: '🌌', step: 'Watch UI elements float as anti-gravity activates' },
  { icon: '🎯', step: 'The wheel decelerates — your daily suggestion is revealed' },
  { icon: '🎉', step: 'Celebrate with confetti + orbital particle burst' },
  { icon: '🔄', step: 'Re-spin or review your history anytime' },
];

export function InfoPanel({ onClose }: InfoPanelProps) {
  return (
    <div
      id="info-panel-overlay"
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-panel-title"
    >
      <div className={styles.panel}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 id="info-panel-title" className={styles.title}>
            ✦ About UniqueBusinessName
          </h2>
          <button
            id="info-panel-close"
            className={styles.closeX}
            onClick={onClose}
            aria-label="Close info panel"
          >
            ✕
          </button>
        </div>

        <p className={styles.intro}>
          An immersive, physics-driven spinning wheel that goes beyond traditional
          implementations — powered by a custom anti-gravity engine to select your perfect business name.
        </p>

        {/* How to use */}
        <h3 className={styles.sectionTitle}>How to use</h3>
        <div className={styles.stepList}>
          {HOW_TO_STEPS.map((s, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.stepIcon}>{s.icon}</span>
              <span className={styles.stepText}>{s.step}</span>
            </div>
          ))}
        </div>

        {/* Comparative analysis table — Section 7.1 */}
        <h3 className={styles.sectionTitle}>Why anti-gravity?</h3>
        <p className={styles.tableCaption}>
          Table 1 · Traditional vs. Anti-Gravity Enhanced Naming Wheel
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Feature</th>
                <th className={styles.th}>Traditional</th>
                <th className={`${styles.th} ${styles.thHighlight}`}>UniqueBusinessName ✦</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.tdFeature}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    {f.label}
                  </td>
                  <td className={styles.tdTraditional}>{f.traditional}</td>
                  <td className={`${styles.tdEnhanced}`}>{f.enhanced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Physics parameters callout */}
        <div className={styles.callout}>
          <p className={styles.calloutTitle}>⚙️ Physics Parameters</p>
          <div className={styles.paramGrid}>
            {[
              ['Gravity', '0.3 px/frame²'],
              ['Anti-gravity', '−0.15 px/frame²'],
              ['Damping', '0.75'],
              ['Air resistance', '0.98/frame'],
              ['Initial spin', '15–25 rad/s'],
              ['Friction', '0.985/frame'],
            ].map(([k, v]) => (
              <div key={k} className={styles.param}>
                <span className={styles.paramKey}>{k}</span>
                <span className={styles.paramVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          id="info-panel-done"
          className={styles.doneBtn}
          onClick={onClose}
        >
          Let's spin! 🌀
        </button>
      </div>
    </div>
  );
}
