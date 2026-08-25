/* ============================================================
   /logo-maker — Page
   ============================================================ */
import { useEffect } from 'react';
import LogoMakerApp from '../../components/LogoMaker/LogoMakerApp';
import { SEOHead } from '../../components/SEOHead/SEOHead';

export default function LogoMakerPage() {
  useEffect(() => {
    document.title = 'Create Logo for Business Free — Company Logo Maker & 3D Logo Generator | UniqueBusinessName.com';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Create logo for business free with the #1 AI company logo maker. Explore free logo design templates, company 3D logo maker mockups, name logo design, and creative logo design free download.';

    let keywordsMeta = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.content =
      'create logo for business, logo design, create logo free, free online logo maker and download, free logo design and download, name logo design, free logo design templates, creative logo design free download, logo design online, company logo maker, company name logo maker, company design logo maker, company logo maker free, company logo maker ai, company name logo maker free, company brand logo maker, company stamp logo maker, company business logo maker, company 3d logo maker';
  }, []);

  const logoMakerSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Create Logo for Business — Free Company Logo Maker & 3D Logo Generator",
    "url": "https://uniquebusinessname.com/logo-maker",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Create logo for business free with our company logo maker, creative logo design templates, and 3D mockup studio.",
    "featureList": [
      "Create Logo for Business Free",
      "Company Logo Maker & AI Studio",
      "Company Name Logo Maker Free",
      "Company 3D Logo Maker Mockups",
      "Creative Logo Design Free Download",
      "Free Logo Design Templates",
      "Name Logo Design",
      "Company Stamp Logo Maker",
      "Vector SVG & High-Res PNG Exports"
    ]
  };

  return (
    <>
      <SEOHead
        title="Create Logo for Business Free — Company Logo Maker & 3D Logo Generator | UniqueBusinessName.com"
        description="Create logo for business free with the #1 AI company logo maker. Explore free logo design templates, company 3D logo maker mockups, name logo design, and creative logo design free download."
        keywords="create logo for business, logo design, create logo free, free online logo maker and download, free logo design and download, name logo design, free logo design templates, creative logo design free download, logo design online, company logo maker, company name logo maker, company design logo maker, company logo maker free, company logo maker ai, company name logo maker free, company brand logo maker, company stamp logo maker, company business logo maker, company 3d logo maker"
        url="https://uniquebusinessname.com/logo-maker"
        type="WebApplication"
        schema={logoMakerSchema}
      />
      <LogoMakerApp />
      
      {/* ── On-Page SEO Guide & Keyword Section ───────────── */}
      <section style={{ maxWidth: '1100px', margin: '3rem auto 5rem', padding: '0 1.5rem', color: 'var(--text)' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>
              ✦ Free Online Logo Maker and Download Suite
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              The Ultimate Company Logo Maker &amp; Free Logo Design Online Studio
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Discover how to create logo for business free, customize creative logo design templates, test company 3D logo maker mockups, and download infinite-resolution vector assets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
                1. Create Logo for Business in Seconds
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Looking to <strong>create logo free</strong> for your new venture? Our <strong>company logo maker ai</strong> analyzes your company name and industry to generate matching visual marks, curated color palettes, and balanced typography.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
                2. Free Logo Design Templates &amp; Name Logo Design
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Explore dozens of <strong>free logo design templates</strong> spanning Minimalist, Modern Gradient, Geometric, and <strong>company stamp logo maker</strong> styles. Perfect for founders seeking modern <strong>name logo design</strong>.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
                3. Company 3D Logo Maker &amp; Mockup Studio
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                See your brand come to life before launching. Our <strong>company 3d logo maker</strong> studio renders your logo onto business cards, mobile app screens, storefront signs, and apparel with real lighting and perspective.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
                4. Creative Logo Design Free Download (SVG, PNG, PDF)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Enjoy instant <strong>creative logo design free download</strong>. Export print-ready vector SVGs, 2048px transparent PNGs, and brand style sheets with 100% full commercial rights and zero watermark restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
