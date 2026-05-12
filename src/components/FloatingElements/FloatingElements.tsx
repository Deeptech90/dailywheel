import { useEffect, useRef } from 'react';
import styles from './FloatingElements.module.css';

interface FloatingElementsProps {
  isSpinning: boolean;
  centerRef: React.RefObject<HTMLDivElement>;
}

// Decorative icons that orbit the wheel
const ICONS = ['✦', '★', '◆', '●', '▲', '✿', '⬡', '✺'];

interface OrbitalState {
  angle: number;         // Current orbital angle (radians)
  radius: number;        // Distance from wheel center
  speed: number;         // Orbital angular speed (rad/frame)
  drift: { x: number; y: number };     // Current drift offset
  driftV: { x: number; y: number };   // Drift velocity
  launched: boolean;     // Whether anti-gravity has been activated
}

export function FloatingElements({ isSpinning, centerRef }: FloatingElementsProps) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statesRef = useRef<OrbitalState[]>(
    ICONS.map((_, i) => ({
      angle: (i / ICONS.length) * Math.PI * 2,
      radius: 0,   // Set on first resize
      speed: (0.008 + Math.random() * 0.006) * (i % 2 === 0 ? 1 : -1),
      drift: { x: 0, y: 0 },
      driftV: { x: 0, y: 0 },
      launched: false,
    })),
  );
  const rafRef = useRef<number>(0);
  const isSpinningRef = useRef(isSpinning);
  isSpinningRef.current = isSpinning;

  // Main RAF loop: orbit + physics drift
  useEffect(() => {
    const loop = () => {
      const center = centerRef.current;
      if (!center) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const rect = center.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const baseRadius = rect.width / 2 + 28;

      const spinning = isSpinningRef.current;

      statesRef.current.forEach((state, i) => {
        const el = iconRefs.current[i];
        if (!el) return;

        // Advance orbital angle (faster when spinning)
        state.angle += state.speed * (spinning ? 3.5 : 1);

        // Target position on orbit circle
        const targetX = cx + Math.cos(state.angle) * baseRadius;
        const targetY = cy + Math.sin(state.angle) * baseRadius;

        if (spinning) {
          // Anti-gravity drift: apply upward velocity + air resistance
          if (!state.launched) {
            state.driftV.x = (Math.random() - 0.5) * 3;
            state.driftV.y = -(2 + Math.random() * 4);
            state.launched = true;
          }

          // Apply gravity (inverted = upward) + damping
          state.driftV.y -= 0.05;            // anti-gravity lift
          state.driftV.x *= 0.97;            // air resistance
          state.drift.x += state.driftV.x;
          state.drift.y += state.driftV.y;

          // Soft clamp: don't drift too far
          state.drift.x = Math.max(-80, Math.min(80, state.drift.x));
          state.drift.y = Math.max(-200, Math.min(20, state.drift.y));

        } else {
          // Return drift to zero with spring easing
          state.drift.x *= 0.88;
          state.drift.y *= 0.88;
          state.driftV = { x: 0, y: 0 };
          state.launched = false;
          if (Math.abs(state.drift.x) < 0.5) state.drift.x = 0;
          if (Math.abs(state.drift.y) < 0.5) state.drift.y = 0;
        }

        // Pulse opacity / scale with spin speed
        const opacity = spinning ? 0.6 + Math.sin(state.angle * 3) * 0.4 : 0.4;
        const scale = spinning ? 1.1 + Math.sin(state.angle * 2) * 0.15 : 0.85;

        el.style.left = `${targetX + state.drift.x}px`;
        el.style.top = `${targetY + state.drift.y}px`;
        el.style.opacity = String(Math.max(0, opacity));
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [centerRef]);

  return (
    <div className={styles.container} aria-hidden="true">
      {ICONS.map((icon, i) => (
        <div
          key={i}
          ref={el => { iconRefs.current[i] = el; }}
          className={`${styles.icon} ${isSpinning ? styles.spinning : ''}`}
          style={{
            color: `hsl(${(i / ICONS.length) * 360}, 70%, 65%)`,
            fontSize: `${12 + (i % 3) * 4}px`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
