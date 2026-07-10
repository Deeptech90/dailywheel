import '../index.css';
import { CookieConsent } from '../components/CookieConsent/CookieConsent';
import { TrackingScripts } from '../components/TrackingScripts/TrackingScripts';
import { Metadata, Viewport } from 'next';

const GSC_ID = process.env.NEXT_PUBLIC_GSC_ID;

export const metadata: Metadata = {
  title: 'AI-Powered Unique Business Name Generator | Anti-Gravity Wheel',
  description: 'Generate unique, creative, and brandable business names. Spin the physics-driven Anti-Gravity Wheel of Names to choose the perfect name for your venture.',
  keywords: 'business name generator, brand name generator, naming wheel, random business names, unique business name, decision wheel',
  metadataBase: new URL('https://uniquebusinessname.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Unique Business Name Generator — Anti-Gravity Wheel',
    description: 'Find your perfect business name using our advanced AI-powered generator and physics-based selection wheel.',
    url: 'https://uniquebusinessname.com',
    type: 'website',
    siteName: 'Unique Business Name Generator',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Unique Business Name Generator Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unique Business Name Generator — Anti-Gravity Wheel',
    description: 'Find your perfect business name using our advanced AI-powered generator and physics-based selection wheel.',
    images: ['/icon-512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'UniqueBusinessName.com',
    'url': 'https://uniquebusinessname.com',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    },
    'description': 'Generate unique, creative, and brandable business names. Spin the physics-driven Anti-Gravity Wheel of Names to choose the perfect name for your venture.'
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts and AdSense */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Google Search Console Verification */}
        {GSC_ID && <meta name="google-site-verification" content={GSC_ID} />}

        {/* Google AdSense Script - loaded asynchronously */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-placeholder"
          crossOrigin="anonymous"
        />

        {/* Structured Data (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        {/* GDPR/CCPA Consent Manager */}
        <CookieConsent />
        {/* Dynamic Telemetry / Analytics Manager */}
        <TrackingScripts />
      </body>
    </html>
  );
}
