import { useEffect, useRef } from 'react';
import styles from './AntiGravityField.module.css';

interface AntiGravityFieldProps {
  isSpinning: boolean;
}

const ORB_COUNT = 12;

// Each orb gets a stable random config generated once
const ORB_CONFIGS = Array.from({ length: ORB_COUNT }, (_, i) => ({
  size: 60 + Math.random() * 160,
  opacity: 0.3 + Math.random() * 0.4,
  hue: (i / ORB_COUNT) * 360,
  left: `${5 + (i % 4) * 25}%`,
  top: `${10 + Math.floor(i / 4) * 35}%`,
  animDelay: `${i * 0.7}s`,
  animDuration: `${6 + i * 0.8}s`,
}));

export function AntiGravityField({ isSpinning }: AntiGravityFieldProps) {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // ── Device Orientation (gyroscope tilt) ──────────────────────
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // gamma = left/right tilt (-90 to 90), beta = front/back (-180 to 180)
      tiltRef.current = {
        x: Math.max(-30, Math.min(30, e.gamma ?? 0)),
        y: Math.max(-30, Math.min(30, (e.beta ?? 0) - 45)),
      };
    };

    // Request permission on iOS 13+
    if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
        .requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(() => { /* ignore */ });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Animate orbs toward tilt target
    const animateTilt = () => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb || isSpinning) return;
        const factor = 0.5 + i * 0.1;
        const tx = tiltRef.current.x * factor;
        const ty = tiltRef.current.y * factor * 0.5;
        orb.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      rafRef.current = requestAnimationFrame(animateTilt);
    };
    rafRef.current = requestAnimationFrame(animateTilt);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isSpinning]);

  // ── Anti-gravity float / restore ─────────────────────────────
  useEffect(() => {
    orbRefs.current.forEach((orb, i) => {
      if (!orb) return;

      if (isSpinning) {
        const xDrift = (Math.random() - 0.5) * 120;
        const yLift = -(80 + Math.random() * 200);
        const rotation = (Math.random() - 0.5) * 60;

        orb.animate(
          [
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: String(ORB_CONFIGS[i].opacity) },
            { transform: `translateY(${yLift}px) translateX(${xDrift}px) rotate(${rotation}deg)`, opacity: '0' },
          ],
          {
            duration: 800 + i * 100,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards',
          },
        );
      } else {
        orb.animate(
          [
            { transform: 'translateY(-200px) translateX(0)', opacity: '0' },
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: String(ORB_CONFIGS[i].opacity) },
          ],
          {
            duration: 900 + i * 60,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards',
            delay: i * 50,
          },
        );
      }
    });
  }, [isSpinning]);

  return (
    <div className={styles.field} aria-hidden="true">
      {ORB_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          ref={el => { orbRefs.current[i] = el; }}
          className={styles.orb}
          data-opacity={cfg.opacity}
          style={{
            width: cfg.size,
            height: cfg.size,
            left: cfg.left,
            top: cfg.top,
            background: `radial-gradient(circle, hsl(${cfg.hue}, 70%, 60%) 0%, transparent 70%)`,
            opacity: cfg.opacity,
            animationDelay: cfg.animDelay,
            animationDuration: cfg.animDuration,
          }}
        />
      ))}
    </div>
  );
}
