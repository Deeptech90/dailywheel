import styles from './SpinButton.module.css';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <button
      id="spin-button"
      className={`${styles.btn} ${disabled ? styles.spinning : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Spin the wheel"
    >
      <span className={styles.icon}>✦</span>
      <span className={styles.label}>{disabled ? 'Spinning…' : 'SPIN'}</span>
      <div className={styles.ripple} />
    </button>
  );
}
