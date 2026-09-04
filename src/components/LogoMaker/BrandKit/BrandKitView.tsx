/* ============================================================
   BrandKitView — Complete Brand Identity Suite (Design.com Parity)
   Allows users to preview, edit inline, and export:
   1. Business Cards (Front/Back) -> PNG + 300 DPI Print PDF with Bleed
   2. Corporate Letterhead -> PNG + 300 DPI Print PDF
   3. Instagram Post (1080x1080) -> PNG
   4. Social / OG Banner (1200x630) -> PNG
   ============================================================ */

import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  FileText,
  Camera,
  Globe,
  Download,
  Printer,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { GeneratedLogo } from '../../../types/logoMaker';
import {
  BusinessCardData,
  LetterheadData,
  SocialMediaData,
  renderBusinessCardFront,
  renderBusinessCardBack,
  renderLetterhead,
  renderInstagramPost,
  renderSocialBanner
} from './brandKitCanvas';
import { downloadCanvasAsPng, exportCanvasToPdf } from '../../../utils/pdfExport';
import styles from './BrandKitView.module.css';

interface BrandKitViewProps {
  logo: GeneratedLogo;
  businessName: string;
  tagline?: string;
}

type KitTab = 'business-card' | 'letterhead' | 'instagram' | 'social-banner';

export const BrandKitView: React.FC<BrandKitViewProps> = ({
  logo,
  businessName,
  tagline
}) => {
  const [activeTab, setActiveTab] = useState<KitTab>('business-card');
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [isExporting, setIsExporting] = useState(false);

  // Business Card State
  const [cardData, setCardData] = useState<BusinessCardData>({
    fullName: 'Alex Morgan',
    jobTitle: 'Founder & CEO',
    email: `alex@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
    phone: '+1 (555) 234-5678',
    website: `www.${businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
    address: '100 Innovation Blvd, Suite 400',
  });

  // Letterhead State
  const [letterheadData, setLetterheadData] = useState<LetterheadData>({
    businessName,
    address: '100 Innovation Blvd, Suite 400',
    phone: '+1 (555) 234-5678',
    email: `contact@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
    website: `www.${businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
    date: 'September 4, 2026',
    recipient: 'Dear Valued Partner,',
    subject: 'Brand Launch & Partnership Overview',
    body: `We are pleased to introduce our official corporate branding and visual identity suite.\n\n` +
      `Our mission is to deliver world-class digital innovation with meticulous craftsmanship. ` +
      `Every aspect of our brand—from our distinctive color palette to our typographic precision—reflects ` +
      `our commitment to excellence and transformative customer experiences.\n\n` +
      `We welcome the opportunity to discuss prospective strategic initiatives and look forward ` +
      `to a fruitful collaboration with your team.`,
    signerName: 'Alex Morgan',
    signerTitle: 'Founder & Managing Director',
  });

  // Social Media State
  const [socialData, setSocialData] = useState<SocialMediaData>({
    headline: 'Redefining Next-Gen Brand Experiences',
    subtitle: `Official launch of ${businessName} — built for forward-thinking leaders.`,
    ctaText: 'Explore Brand →',
  });

  // Live Canvas Ref
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Update letterhead businessName if prop changes
  useEffect(() => {
    setLetterheadData(prev => ({ ...prev, businessName }));
  }, [businessName]);

  // Redraw preview whenever tab, side, or inputs change
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    async function draw() {
      if (!canvas) return;
      if (activeTab === 'business-card') {
        if (cardSide === 'front') {
          await renderBusinessCardFront(canvas, cardData, logo, businessName);
        } else {
          await renderBusinessCardBack(canvas, logo, businessName, tagline);
        }
      } else if (activeTab === 'letterhead') {
        await renderLetterhead(canvas, letterheadData, logo);
      } else if (activeTab === 'instagram') {
        await renderInstagramPost(canvas, socialData, logo, businessName);
      } else if (activeTab === 'social-banner') {
        await renderSocialBanner(canvas, socialData, logo, businessName);
      }
    }

    draw();

    return () => {
      isMounted = false;
    };
  }, [activeTab, cardSide, cardData, letterheadData, socialData, logo, businessName, tagline]);

  /* ── Export Handlers ────────────────────────────────────────── */

  // Export Business Card PNG
  const handleExportCardPng = async (side: 'front' | 'back') => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      if (side === 'front') {
        await renderBusinessCardFront(exportCanvas, cardData, logo, businessName);
        downloadCanvasAsPng(exportCanvas, `${businessName.toLowerCase()}-business-card-front.png`);
      } else {
        await renderBusinessCardBack(exportCanvas, logo, businessName, tagline);
        downloadCanvasAsPng(exportCanvas, `${businessName.toLowerCase()}-business-card-back.png`);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Export Business Card 300 DPI Print PDF (with 1/8" bleed included)
  const handleExportCardPdf = async (side: 'front' | 'back') => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      if (side === 'front') {
        await renderBusinessCardFront(exportCanvas, cardData, logo, businessName);
        exportCanvasToPdf(exportCanvas, `${businessName.toLowerCase()}-business-card-front-print.pdf`, {
          widthInches: 3.5,
          heightInches: 2.0,
          bleedInches: 0.125,
          title: `${businessName} Business Card Front (300 DPI Print)`
        });
      } else {
        await renderBusinessCardBack(exportCanvas, logo, businessName, tagline);
        exportCanvasToPdf(exportCanvas, `${businessName.toLowerCase()}-business-card-back-print.pdf`, {
          widthInches: 3.5,
          heightInches: 2.0,
          bleedInches: 0.125,
          title: `${businessName} Business Card Back (300 DPI Print)`
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Export Letterhead PNG
  const handleExportLetterheadPng = async () => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      await renderLetterhead(exportCanvas, letterheadData, logo);
      downloadCanvasAsPng(exportCanvas, `${businessName.toLowerCase()}-letterhead.png`);
    } finally {
      setIsExporting(false);
    }
  };

  // Export Letterhead 300 DPI Print PDF
  const handleExportLetterheadPdf = async () => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      await renderLetterhead(exportCanvas, letterheadData, logo);
      exportCanvasToPdf(exportCanvas, `${businessName.toLowerCase()}-letterhead-print.pdf`, {
        widthInches: 8.5,
        heightInches: 11.0,
        bleedInches: 0.125,
        title: `${businessName} Corporate Letterhead (300 DPI Print)`
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Export Social Media Post PNG
  const handleExportSocialPng = async (type: 'instagram' | 'banner') => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      if (type === 'instagram') {
        await renderInstagramPost(exportCanvas, socialData, logo, businessName);
        downloadCanvasAsPng(exportCanvas, `${businessName.toLowerCase()}-instagram-post-1080x1080.png`);
      } else {
        await renderSocialBanner(exportCanvas, socialData, logo, businessName);
        downloadCanvasAsPng(exportCanvas, `${businessName.toLowerCase()}-social-banner-1200x630.png`);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={styles.brandKitRoot} id="brand-kit-suite">
      {/* Header */}
      <div className={styles.brandKitHeader}>
        <div className={styles.headerTitleWrap}>
          <div className={styles.headerIconBadge}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className={styles.headerTitle}>Brand Kit Studio</h3>
            <p className={styles.headerSubtitle}>
              Export print-ready business stationery &amp; social media templates from your generated logo.
            </p>
          </div>
        </div>

        <div className={styles.brandPill}>
          <span>{businessName}</span>
          <div className={styles.brandColorSwatches}>
            <span className={styles.swatchDot} style={{ background: logo.primaryColor }} title={`Primary: ${logo.primaryColor}`} />
            <span className={styles.swatchDot} style={{ background: logo.secondaryColor }} title={`Secondary: ${logo.secondaryColor}`} />
          </div>
          <span className={styles.printBadge}>
            <CheckCircle2 size={12} /> 300 DPI Print Parity
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.kitTabs} role="tablist">
        <button
          type="button"
          className={`${styles.kitTabBtn} ${activeTab === 'business-card' ? styles.kitTabBtnActive : ''}`}
          onClick={() => setActiveTab('business-card')}
          role="tab"
          aria-selected={activeTab === 'business-card'}
          id="tab-business-card"
        >
          <CreditCard size={16} />
          Business Card (Front &amp; Back)
        </button>

        <button
          type="button"
          className={`${styles.kitTabBtn} ${activeTab === 'letterhead' ? styles.kitTabBtnActive : ''}`}
          onClick={() => setActiveTab('letterhead')}
          role="tab"
          aria-selected={activeTab === 'letterhead'}
          id="tab-letterhead"
        >
          <FileText size={16} />
          Letterhead (8.5&times;11&quot;)
        </button>

        <button
          type="button"
          className={`${styles.kitTabBtn} ${activeTab === 'instagram' ? styles.kitTabBtnActive : ''}`}
          onClick={() => setActiveTab('instagram')}
          role="tab"
          aria-selected={activeTab === 'instagram'}
          id="tab-instagram"
        >
          <Camera size={16} />
          Instagram Post (1080&times;1080)
        </button>

        <button
          type="button"
          className={`${styles.kitTabBtn} ${activeTab === 'social-banner' ? styles.kitTabBtnActive : ''}`}
          onClick={() => setActiveTab('social-banner')}
          role="tab"
          aria-selected={activeTab === 'social-banner'}
          id="tab-social-banner"
        >
          <Globe size={16} />
          Social / OG Banner (1200&times;630)
        </button>
      </div>

      {/* Main Grid: Form Inputs + Live Preview Stage */}
      <div className={styles.kitGrid}>
        {/* Form Panel */}
        <div className={styles.formPanel}>
          {activeTab === 'business-card' && (
            <>
              <h4 className={styles.panelTitle}>
                <CreditCard size={18} /> Edit Business Card Details
              </h4>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-name">Full Name</label>
                <input
                  id="bc-name"
                  type="text"
                  className={styles.formInput}
                  value={cardData.fullName}
                  onChange={e => setCardData({ ...cardData, fullName: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-title">Job Title</label>
                <input
                  id="bc-title"
                  type="text"
                  className={styles.formInput}
                  value={cardData.jobTitle}
                  onChange={e => setCardData({ ...cardData, jobTitle: e.target.value })}
                  placeholder="e.g. Founder & CEO"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-email">Email Address</label>
                <input
                  id="bc-email"
                  type="email"
                  className={styles.formInput}
                  value={cardData.email}
                  onChange={e => setCardData({ ...cardData, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-phone">Phone Number</label>
                <input
                  id="bc-phone"
                  type="text"
                  className={styles.formInput}
                  value={cardData.phone}
                  onChange={e => setCardData({ ...cardData, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 234-5678"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-web">Website</label>
                <input
                  id="bc-web"
                  type="text"
                  className={styles.formInput}
                  value={cardData.website}
                  onChange={e => setCardData({ ...cardData, website: e.target.value })}
                  placeholder="e.g. www.company.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="bc-address">Office Address</label>
                <input
                  id="bc-address"
                  type="text"
                  className={styles.formInput}
                  value={cardData.address}
                  onChange={e => setCardData({ ...cardData, address: e.target.value })}
                  placeholder="e.g. 100 Innovation Blvd"
                />
              </div>

              <div className={styles.actionBtnGroup}>
                <button
                  type="button"
                  className={styles.primaryExportBtn}
                  onClick={() => handleExportCardPdf(cardSide)}
                  disabled={isExporting}
                >
                  <Printer size={16} />
                  Download 300 DPI Print PDF ({cardSide === 'front' ? 'Front' : 'Back'})
                </button>

                <button
                  type="button"
                  className={styles.secondaryExportBtn}
                  onClick={() => handleExportCardPng(cardSide)}
                  disabled={isExporting}
                >
                  <Download size={16} />
                  Download High-Res PNG ({cardSide === 'front' ? 'Front' : 'Back'})
                </button>
              </div>
            </>
          )}

          {activeTab === 'letterhead' && (
            <>
              <h4 className={styles.panelTitle}>
                <FileText size={18} /> Edit Letterhead Details
              </h4>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lh-date">Date</label>
                <input
                  id="lh-date"
                  type="text"
                  className={styles.formInput}
                  value={letterheadData.date}
                  onChange={e => setLetterheadData({ ...letterheadData, date: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lh-subject">Subject Line</label>
                <input
                  id="lh-subject"
                  type="text"
                  className={styles.formInput}
                  value={letterheadData.subject}
                  onChange={e => setLetterheadData({ ...letterheadData, subject: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lh-body">Letter Body</label>
                <textarea
                  id="lh-body"
                  className={styles.formTextarea}
                  value={letterheadData.body}
                  rows={5}
                  onChange={e => setLetterheadData({ ...letterheadData, body: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lh-signer">Signer Name &amp; Title</label>
                <input
                  id="lh-signer"
                  type="text"
                  className={styles.formInput}
                  value={letterheadData.signerName}
                  onChange={e => setLetterheadData({ ...letterheadData, signerName: e.target.value })}
                />
              </div>

              <div className={styles.actionBtnGroup}>
                <button
                  type="button"
                  className={styles.primaryExportBtn}
                  onClick={handleExportLetterheadPdf}
                  disabled={isExporting}
                >
                  <Printer size={16} />
                  Download 300 DPI Letterhead PDF
                </button>

                <button
                  type="button"
                  className={styles.secondaryExportBtn}
                  onClick={handleExportLetterheadPng}
                  disabled={isExporting}
                >
                  <Download size={16} />
                  Download Letterhead PNG
                </button>
              </div>
            </>
          )}

          {(activeTab === 'instagram' || activeTab === 'social-banner') && (
            <>
              <h4 className={styles.panelTitle}>
                <Sparkles size={18} /> Edit Social Media Copy
              </h4>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="sm-headline">Headline Text</label>
                <input
                  id="sm-headline"
                  type="text"
                  className={styles.formInput}
                  value={socialData.headline}
                  onChange={e => setSocialData({ ...socialData, headline: e.target.value })}
                  placeholder="Headline copy..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="sm-sub">Subtitle / Details</label>
                <textarea
                  id="sm-sub"
                  className={styles.formTextarea}
                  value={socialData.subtitle}
                  rows={3}
                  onChange={e => setSocialData({ ...socialData, subtitle: e.target.value })}
                  placeholder="Subtitle copy..."
                />
              </div>

              {activeTab === 'instagram' && (
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="sm-cta">Button Call to Action</label>
                  <input
                    id="sm-cta"
                    type="text"
                    className={styles.formInput}
                    value={socialData.ctaText}
                    onChange={e => setSocialData({ ...socialData, ctaText: e.target.value })}
                    placeholder="e.g. Learn More →"
                  />
                </div>
              )}

              <div className={styles.actionBtnGroup}>
                <button
                  type="button"
                  className={styles.primaryExportBtn}
                  onClick={() => handleExportSocialPng(activeTab === 'instagram' ? 'instagram' : 'banner')}
                  disabled={isExporting}
                >
                  <Download size={16} />
                  {activeTab === 'instagram' ? 'Download Instagram Post (1080×1080 PNG)' : 'Download Social Banner (1200×630 PNG)'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Live Preview Stage */}
        <div className={styles.previewStage}>
          <div className={styles.previewToolbar}>
            <span>
              {activeTab === 'business-card' && `Standard US Business Card (3.5" × 2.0" + 0.125" Bleed)`}
              {activeTab === 'letterhead' && `Standard US Letter (8.5" × 11.0" at 300 DPI)`}
              {activeTab === 'instagram' && `Instagram Square Post (1080 × 1080 px)`}
              {activeTab === 'social-banner' && `Social / OpenGraph Banner (1200 × 630 px)`}
            </span>

            {activeTab === 'business-card' && (
              <div className={styles.previewToggleGroup} role="group" aria-label="Card side">
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${cardSide === 'front' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setCardSide('front')}
                >
                  Front Side
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${cardSide === 'back' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setCardSide('back')}
                >
                  Back Side
                </button>
              </div>
            )}
          </div>

          {/* Interactive Live Canvas */}
          <div className={styles.previewCanvasWrapper}>
            <canvas
              ref={previewCanvasRef}
              className={styles.interactivePreviewCanvas}
              aria-label={`Live preview of ${businessName} ${activeTab}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrandKitView;
