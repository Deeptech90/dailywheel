import '../index.css';
import { CookieConsent } from '../components/CookieConsent/CookieConsent';
import { Metadata, Viewport } from 'next';

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
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts and AdSense */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Google AdSense Script - loaded asynchronously */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-placeholder"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        {/* GDPR/CCPA Consent Manager */}
        <CookieConsent />
      </body>
    </html>
  );
}
