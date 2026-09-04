/* ============================================================
   MockupPreview — Real-World Product Mockup Studio
   Renders active brand logo across:
   1. Business Card (Interactive + 600gsm Letterpress Proof)
   2. Letterhead (Interactive + Archival Suite Proof)
   3. Storefront (Cast Bronze Architectural Signage)
   4. Packaging (Custom Rigid Matte Box Proof)
   5. Mobile App Frame
   6. Social Cover
   7. Email Signature
   8. Apparel / Merch
   ============================================================ */

import React, { useState } from 'react';
import { GeneratedLogo, MockupType } from '../../types/logoMaker';
import { svgToDataUrl } from '../../utils/logoExport';
import styles from './LogoMaker.module.css';

interface MockupPreviewProps {
  logo: GeneratedLogo;
  businessName: string;
  tagline?: string;
  activeMockup: MockupType;
  onSelectMockup: (type: MockupType) => void;
}

const MOCKUP_TABS: { id: MockupType; label: string; icon: string }[] = [
  { id: 'business-card',   label: 'Business Card',  icon: '📇' },
  { id: 'letterhead',      label: 'Stationery',     icon: '📄' },
  { id: 'storefront',      label: 'Storefront',     icon: '🏬' },
  { id: 'packaging',       label: 'Packaging',      icon: '📦' },
  { id: 'mobile-screen',   label: 'Mobile App',     icon: '📱' },
  { id: 'social-banner',   label: 'Social Cover',   icon: '🌐' },
  { id: 'email-signature', label: 'Email Sig',      icon: '✉️' },
  { id: 't-shirt',         label: 'Apparel',        icon: '👕' },
];

export const MockupPreview: React.FC<MockupPreviewProps> = ({
  logo,
  businessName,
  tagline,
  activeMockup,
  onSelectMockup,
}) => {
  const [photoProof, setPhotoProof] = useState<boolean>(true);
  const logoDataUrl = svgToDataUrl(logo.svgString);

  return (
    <div className={styles.mockupStudioRoot}>
      {/* Mockup Selector Tabs */}
      <div className={styles.mockupTabs}>
        {MOCKUP_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.mockupTabBtn} ${activeMockup === tab.id ? styles.mockupTabBtnActive : ''}`}
            onClick={() => onSelectMockup(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Proof Mode Toggle for Tangible Products */}
      {(activeMockup === 'business-card' || activeMockup === 'letterhead') && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
          <button
            type="button"
            onClick={() => setPhotoProof(!photoProof)}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.3rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-brass)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>{photoProof ? 'Switch to Vector Canvas' : '✦ View Physical Print Proof'}</span>
          </button>
        </div>
      )}

      {/* Mockup Canvas Display */}
      <div className={styles.mockupDisplayContainer}>
        {/* 1. BUSINESS CARD MOCKUP */}
        {activeMockup === 'business-card' && (
          photoProof ? (
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-subtle)' }}>
              <img
                src="/mockups/mockup_business_card.jpg"
                alt={`${businessName} Letterpress Foil Cards`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Production Proof
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                    {businessName} • 600gsm Cotton Foil
                  </div>
                </div>
                <img src={logoDataUrl} alt={businessName} style={{ height: '24px', maxWidth: '75px', objectFit: 'contain' }} />
              </div>
            </div>
          ) : (
            <div className={styles.mockupCardScene}>
              <div className={styles.businessCardFront} style={{ borderColor: logo.primaryColor }}>
                <div className={styles.cardLogoWrap}>
                  <img src={logoDataUrl} alt={`${businessName} logo on business card`} className={styles.cardLogoImg} />
                </div>
                <div className={styles.cardContactDetails}>
                  <div className={styles.cardPersonName}>Alex Morgan</div>
                  <div className={styles.cardPersonRole}>Founder &amp; CEO</div>
                  <div className={styles.cardDivider} style={{ background: logo.primaryColor }} />
                  <div className={styles.cardMeta}>hello@{businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
                  <div className={styles.cardMeta}>+1 (555) 234-5678</div>
                  <div className={styles.cardMeta}>www.{businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
              </div>

              <div className={styles.businessCardBack} style={{ background: `linear-gradient(135deg, ${logo.primaryColor} 0%, ${logo.secondaryColor} 100%)` }}>
                <div className={styles.cardBackContent}>
                  <img src={logoDataUrl} alt={`${businessName} badge`} className={styles.cardBackLogoImg} style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
              </div>
            </div>
          )
        )}

        {/* 2. CORPORATE LETTERHEAD MOCKUP */}
        {activeMockup === 'letterhead' && (
          photoProof ? (
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-subtle)' }}>
              <img
                src="/mockups/mockup_letterhead.jpg"
                alt={`${businessName} Stationery Suite`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Corporate Collateral
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                    {businessName} • Archival Executive Suite
                  </div>
                </div>
                <img src={logoDataUrl} alt={businessName} style={{ height: '24px', maxWidth: '75px', objectFit: 'contain' }} />
              </div>
            </div>
          ) : (
            <div className={styles.mockupLetterheadScene}>
              <div className={styles.letterheadBody}>
                <div className={styles.letterheadTopAccent} style={{ background: `linear-gradient(90deg, ${logo.primaryColor}, ${logo.secondaryColor})` }} />
                <div className={styles.letterheadHeader}>
                  <img src={logoDataUrl} alt={`${businessName} letterhead`} className={styles.letterheadLogo} />
                  <div className={styles.letterheadCompanyMeta}>
                    <strong>{businessName} Inc.</strong><br />
                    100 Innovation Blvd, Suite 400<br />
                    contact@{businessName.toLowerCase().replace(/\s+/g, '')}.com
                  </div>
                </div>
                <div className={styles.letterheadContentPlaceholder}>
                  <div className={styles.letterheadLine} style={{ width: '80%' }} />
                  <div className={styles.letterheadLine} style={{ width: '95%' }} />
                  <div className={styles.letterheadLine} style={{ width: '90%' }} />
                  <div className={styles.letterheadLine} style={{ width: '60%' }} />
                </div>
                <div className={styles.letterheadFooter}>
                  <span>CONFIDENTIAL &bull; FOR INTERNAL USE ONLY</span>
                  <span>Page 1 of 1</span>
                </div>
              </div>
            </div>
          )
        )}

        {/* 3. STOREFRONT SIGNAGE MOCKUP */}
        {activeMockup === 'storefront' && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-subtle)' }}>
            <img
              src="/mockups/mockup_storefront.jpg"
              alt={`${businessName} Storefront Signage`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Architectural Exterior
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                  {businessName} • Cast Bronze Facade
                </div>
              </div>
              <img src={logoDataUrl} alt={businessName} style={{ height: '24px', maxWidth: '75px', objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {/* 4. LUXURY PACKAGING MOCKUP */}
        {activeMockup === 'packaging' && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-subtle)' }}>
            <img
              src="/mockups/mockup_packaging.jpg"
              alt={`${businessName} Luxury Rigid Box`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Unboxing Collateral
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                  {businessName} • Rigid Matte Box
                </div>
              </div>
              <img src={logoDataUrl} alt={businessName} style={{ height: '24px', maxWidth: '75px', objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {/* 5. SOCIAL MEDIA COVER MOCKUP */}
        {activeMockup === 'social-banner' && (
          <div className={styles.mockupSocialScene}>
            <div
              className={styles.socialBannerBody}
              style={{ background: `linear-gradient(135deg, ${logo.primaryColor} 0%, ${logo.secondaryColor} 100%)` }}
            >
              <div className={styles.socialBannerLeft}>
                <img src={logoDataUrl} alt={`${businessName} social cover`} className={styles.socialBannerLogo} style={{ filter: 'brightness(0) invert(1)' }} />
                <span className={styles.socialBannerTagline}>{tagline || 'The Next-Gen Brand Experience'}</span>
                <span className={styles.socialBannerBadge}>✦ Official Verified Channel</span>
              </div>
              <img src={logoDataUrl} alt="" className={styles.socialBannerWatermark} />
            </div>
          </div>
        )}

        {/* 6. EMAIL SIGNATURE MOCKUP */}
        {activeMockup === 'email-signature' && (
          <div className={styles.mockupEmailScene}>
            <div className={styles.emailSignatureCard}>
              <div className={styles.emailAvatar} style={{ borderColor: logo.primaryColor }}>
                {businessName.slice(0, 2).toUpperCase()}
              </div>
              <div className={styles.emailInfo}>
                <span className={styles.emailName}>Jordan Hayes</span>
                <span className={styles.emailTitle}>Executive Director &bull; {businessName}</span>
                <img src={logoDataUrl} alt={`${businessName} email signature`} className={styles.emailLogo} />
                <span className={styles.emailContactLine}>✉ jordan@{businessName.toLowerCase().replace(/\s+/g, '')}.com &bull; 🌐 www.{businessName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
          </div>
        )}

        {/* 7. MOBILE SCREEN MOCKUP */}
        {activeMockup === 'mobile-screen' && (
          <div className={styles.mockupMobileScene}>
            <div className={styles.mobilePhoneFrame}>
              <div className={styles.mobileSpeakerNotch} />
              <div className={styles.mobileScreenContent}>
                <div className={styles.mobileStatusBar}>
                  <span>9:41</span>
                  <span>5G 100%</span>
                </div>
                <div className={styles.mobileAppHeader} style={{ background: logo.primaryColor }}>
                  <img src={logoDataUrl} alt={`${businessName} app header`} className={styles.mobileHeaderLogo} style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
                <div className={styles.mobileAppBody}>
                  <div className={styles.mobileHeroBanner}>
                    <h4 className={styles.mobileHeroTitle}>Welcome to {businessName}</h4>
                    <p className={styles.mobileHeroSub}>{tagline || 'Your premium digital experience starts here.'}</p>
                    <button type="button" className={styles.mobileActionBtn} style={{ background: logo.primaryColor }}>
                      Get Started
                    </button>
                  </div>
                  <div className={styles.mobileCardPlaceholder} />
                  <div className={styles.mobileCardPlaceholder} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. T-SHIRT APPAREL MOCKUP */}
        {activeMockup === 't-shirt' && (
          <div className={styles.mockupTshirtScene}>
            <div className={styles.tshirtGraphicWrapper}>
              <div className={styles.tshirtMockupBody}>
                <div className={styles.tshirtCollar} />
                <div className={styles.tshirtChestLogo}>
                  <img src={logoDataUrl} alt={`${businessName} logo on apparel`} className={styles.tshirtLogoImg} />
                </div>
              </div>
              <span className={styles.mockupCaption}>Premium Heavyweight Cotton T-Shirt</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

