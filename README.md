# 🌀 UniqueBusinessName.com — Multi-Mode Anti-Gravity Wheel

A production-ready, mobile-first, physics-driven decision engine and unique name generator built with **Next.js (App Router) + TypeScript + HTML5 Canvas**.

This platform combines a brandable business name generator, custom daily decision wheels, and mascot personality selection tools. It leverages custom physics simulation, regional privacy consent management (GDPR/CCPA/ePrivacy), and native analytics telemetry, optimized for Lighthouse 100/100 performance.

---

## 🚀 Key Features

*   **🏢 Business Name Mode**: Generates curated, brandable name suggestions across 7 startup categories (Tech, Bakery, Consulting, E-Commerce, Salon, Fitness, Restaurant).
*   **📋 Daily Choices Mode**: Custom textarea-based entries (up to 20 options) with local storage retention and interactive presets.
*   **🐾 Spirit Animal Mode**: Mascot selector mapping 12 animals with personality traits and colorful segments.
*   **🎮 Physics-Driven HTML5 Canvas**: Deterministic Ease-Out Cubic rotation, particle emission, anti-gravity drift, collision tick sounds, and confetti bursts.
*   **🔒 Consent Manager (GDPR/CCPA)**: Integrated compliance banners supporting Google Consent Mode v2, automated GPC header detection, and regional tracking gates.
*   **📊 Dynamic Telemetry**: Dynamic loading of Google Analytics, Microsoft Clarity, and Hotjar, fully integrated with user cookie consent updates.
*   **⚡ Performance & SEO**: Server-side rendering, dynamic meta tags, JSON-LD structured schema, PWA-configured app manifests, dynamic SVG/PNG favicons, clean URLs, and custom error boundaries (404/500/Offline).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + React 18 |
| Language | TypeScript 5 |
| Rendering | Canvas API + `requestAnimationFrame` |
| Style | CSS Modules + Custom Design Tokens |
| Storage | LocalStorage + Cookie Session Sync |
| Analytics | GA4 + Microsoft Clarity + Hotjar |
| Compliance | Custom TCF v2.3 compliant CMP |
| Deployment | Vercel (Edge Network + CDN + Compression) |

---

## 📂 Project Structure

```
daily_wheel/
├── .next/                  # Next.js Build Output (Ignored in Git)
├── public/                 # Static Assets
│   ├── favicon.ico         # App Favicon (32x32)
│   ├── icon-192.png        # PWA Icon (192x192)
│   ├── icon-512.png        # PWA Icon (512x512)
│   ├── manifest.json       # Web App Manifest
│   ├── robots.txt          # Crawling Config for SEO
│   └── sitemap.xml         # XML Sitemap
├── src/
│   ├── app/                # Route Handlers and Pages
│   │   ├── api/log-event/  # Telemetry Event Logging Endpoint
│   │   ├── about/          # Transparency Pages
│   │   ├── contact/        # Secure Contact Page
│   │   ├── cookies/        # Cookies Policy Page
│   │   ├── privacy/        # Privacy Policy Page
│   │   ├── terms/          # Terms of Service Page
│   │   ├── offline/        # PWA Offline fallback
│   │   ├── layout.tsx      # Core root layout, telemetry, and structured data
│   │   └── page.tsx        # Homepage containing the orchestrator app
│   ├── components/         # Modular Components
│   │   ├── AdSlot/         # Google AdSense placeholder slot
│   │   ├── CookieConsent/  # GDPR/CCPA Banner and Preference modal
│   │   ├── DailyChoicesInput/ # Options compiler with quick-presets
│   │   ├── GeneratorApp/   # Central application orchestrator
│   │   ├── TrackingScripts/# Telemetry loader (respects cookie choices)
│   │   ├── WheelCanvas/    # Canvas viewport, pointer draw, and touch bindings
│   │   ├── WheelModeSelector/# Cards switcher for Business/Daily/Animal modes
│   │   └── ResultModal/    # Congratulatory modal, copier, and canvas-confetti
│   ├── data/               # Static Data Modules
│   │   ├── animalData.ts   # Spirit animal registry
│   │   └── businessNames.ts# Curated brandable names database
│   ├── engines/            # Physics and canvas logic
│   │   ├── WheelEngine.ts  # Kinetic friction and motion solver
│   │   └── PhysicsEngine.ts# Particle emission and drift dynamics
│   ├── hooks/              # Custom React Hooks
│   │   ├── useWheel.ts     # Canvas lifecycle controller
│   │   ├── usePhysics.ts   # Particle container controller
│   │   ├── useTouch.ts     # Mobile gestures (swipe/pinch/zoom)
│   │   └── useSound.ts     # Web Audio API context synthesizer
│   ├── utils/              # Helper libraries
│   │   ├── analytics.ts    # SendBeacon client instrumentation
│   │   ├── colors.ts       # HSL palette generator
│   │   ├── easing.ts       # Mathematical interpolation curves
│   │   └── storage.ts      # LocalStorage operations
│   └── types/              # TypeScript schemas
│       └── index.ts
├── vercel.json             # Deployment headers and HSTS configurations
├── tsconfig.json           # Compiler strict settings
└── package.json            # Scripts and dependencies
```

---

## ⚙️ Environment Variables

Create a `.env` or `.env.local` file in your root directory based on `.env.example`:

```env
# Telemetry IDs (Optional in Development)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=cl_xxxxxxxxxx
NEXT_PUBLIC_HOTJAR_ID=xxxxxxx
NEXT_PUBLIC_HOTJAR_SV=6

# Search Engine Indexing Validation
NEXT_PUBLIC_GSC_ID=your_gsc_verification_code
```

---

## 🌎 Vercel Deployment Workflow

We use zero-config automatic deployment integrated directly with GitHub. 

### 1. Initial Connection
1. Log in to your **Vercel Dashboard** and click **Add New Project**.
2. Select your repository: `Deeptech90/dailywheel`.
3. Vercel will automatically detect **Next.js** as the framework.
4. **Environment Variables**: Add your production telemetry keys (e.g. `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_ID`) if required.
5. Click **Deploy**.

### 2. Automatic Git Integrations
Every push to your GitHub branches triggers automated runs:
*   **Push to `main`**: Automatically builds and releases the production version live with SSL, HTTP/2 compression, and CDN caching.
*   **Push to other branches**: Automatically compiles a Preview Deployment, providing a unique staging URL to test changes before merging.

### 3. Vercel Configuration (`vercel.json`)
The included `vercel.json` ensures that security headers are injected globally:
*   **Strict-Transport-Security (HSTS)**: Forced SSL coverage.
*   **X-Content-Type-Options**: Prevent mime-sniffing exploits.
*   **X-Frame-Options**: Strict clickjacking protection (`DENY`).
*   **Referrer-Policy**: Leak prevention on cross-origin redirects.
*   **Permissions-Policy**: Disables hardware access (camera/microphone) to maximize security.

---

## 🛡️ Telemetry & User Privacy

All third-party scripts (Google Analytics, Microsoft Clarity, and Hotjar) are loaded dynamically inside `TrackingScripts.tsx`. They will **remain inactive** until the visitor explicitly gives **Analytics & Performance** consent in the Privacy Banner.
*   **CCPA/CPRA Compliant**: The "Do Not Sell" links in the footer trigger an opt-out event that restricts marketing cookie storage.
*   **Global Privacy Control (GPC)**: The site automatically listens to the browser's GPC headers and shuts down non-essential tracking if active.

---

## 🔍 Troubleshooting

*   **Corrupted Next.js Cache (Local)**:
    If Next.js encounters a file locking issue on Windows (`EINVAL: invalid argument`), clear the cache and recompile:
    ```powershell
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm run build
    ```
*   **Vercel Build Fails**:
    Make sure your project settings in the Vercel dashboard are set to **Next.js** framework instead of **Vite** (since we migrated the project structure).

---

## 📄 License
This project is open-source. Feel free to use the name-wheel decision formulas for any application!
