# 🌀 DailySpin — Anti-Gravity Spinning Wheel

A mobile-first, physics-driven spinning wheel PWA built with **React 18 + TypeScript + Vite**.

Spin the wheel to get your daily suggestion. Experience immersive anti-gravity UI effects — floating elements, orbital particle bursts, device-tilt parallax, and canvas-confetti celebrations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 6 + Terser |
| Rendering | Canvas API + `requestAnimationFrame` |
| Animation | Web Animations API + CSS `@keyframes` |
| Physics | Custom engine (FloatingElement + ParticleBurst) |
| Confetti | canvas-confetti |
| Styling | CSS Modules |
| Persistence | localStorage |
| PWA | Web App Manifest |
| Deployment | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:5173)
npm run dev

# Type-check
npx tsc --noEmit

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── engines/
│   ├── WheelEngine.ts      # Canvas draw loop, spin physics (ease-out cubic)
│   └── PhysicsEngine.ts    # FloatingElement + ParticleBurst engines
├── hooks/
│   ├── useWheel.ts         # RAF loop + WheelEngine lifecycle
│   ├── usePhysics.ts       # PhysicsEngine lifecycle + API
│   ├── useTouch.ts         # Swipe + pinch-to-zoom gesture handler
│   └── useSound.ts         # Web Audio API tick + fanfare
├── components/
│   ├── WheelCanvas/        # Canvas host, responsive sizing, touch wiring
│   ├── SpinButton/         # Pulsing glow + physics drift animation
│   ├── ResultModal/        # Winner display + canvas-confetti
│   ├── EditPanel/          # Participants management (add/rename/remove/sort/shuffle)
│   ├── HistoryFeed/        # Last 10 results with timeAgo
│   ├── AntiGravityField/   # Background orbs with DeviceOrientation parallax
│   ├── FloatingElements/   # Orbital icons with anti-gravity drift
│   └── QuestionPrompt/     # Daily context question module
├── utils/
│   ├── colors.ts           # HSL palette generator
│   ├── easing.ts           # ease-out cubic, spring, lerp, clamp
│   ├── labels.ts           # capitalizeLabel + validateLabel
│   └── storage.ts          # localStorage helpers
└── types/index.ts          # Shared TypeScript types
```

---

## Animation Loop Architecture

The core animation pattern (Section 6.2):

```typescript
// WheelEngine — per-frame update loop
function loop() {
  engine.update();     // 1. Update physics (angularVelocity × friction)
  engine.draw(canvas); // 2. Redraw UI elements
  requestAnimationFrame(loop); // 3. Schedule next frame
}
```

Physics parameters:
- Initial spin velocity: **15–25 rad/s** (randomized)
- Friction: **0.985/frame** (ease-out cubic feel)
- Stop threshold: **0.002 rad/s**
- Particle gravity: **0.3 px/frame²** (configurable)
- Anti-gravity: **−0.15 px/frame²** (inverted on spin)

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` handles:
- SPA rewrite (`/* → /index.html`)
- 1-year immutable cache for hashed assets
- Security headers

---

## Mobile Features

- **Touch swipe** → spin with velocity-proportional speed
- **Pinch-to-zoom** → scale wheel 0.6–1.5×  
- **Device tilt** → background orbs parallax via `DeviceOrientationEvent`
- **Landscape mode** → side-by-side layout (wheel + controls)
- **Safe area** → `env(safe-area-inset-bottom)` for iPhone notch
- **Reduced motion** → all animations disabled when system preference set

---

## PWA

Install to home screen on any mobile browser:
- Android Chrome: "Add to Home Screen" from browser menu
- iOS Safari: Share → "Add to Home Screen"

Works offline after first load (manifest + browser cache).
