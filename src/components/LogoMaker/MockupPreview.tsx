/* ============================================================
   MockupPreview — Real-World Product Mockup Studio
   Renders active brand logo across:
   1. Business Card
   2. Mobile Screen
   3. T-Shirt Apparel
   4. Storefront Signage
   ============================================================ */

import React from 'react';
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
  { id: 'social-banner',   label: 'Social Cover',   icon: '🌐' },
  { id: 'email-signature', label: 'Email Sig',      icon: '✉️' },
  { id: 'mobile-screen',   label: 'Mobile App',     icon: '📱' },
  { id: 't-shirt',         label: 'Apparel / Merch',icon: '👕' },
  { id: 'storefront',      label: 'Store Signage',  icon: '🏬' },
  { id: 'letterhead',      label: 'Letterhead',     icon: '📄' },
];

export const MockupPreview: React.FC<MockupPreviewProps> = ({
  logo,
  businessName,
  tagline,
  activeMockup,
  onSelectMockup,
}) => {
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

      {/* Mockup Canvas Display */}
      <div className={styles.mockupDisplayContainer}>
        {/* 1. BUSINESS CARD MOCKUP */}
        {activeMockup === 'business-card' && (
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
        )}

        {/* 2. SOCIAL MEDIA COVER MOCKUP */}
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

        {/* 3. EMAIL SIGNATURE MOCKUP */}
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

        {/* 4. MOBILE SCREEN MOCKUP */}
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

        {/* 5. T-SHIRT APPAREL MOCKUP */}
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

        {/* 6. STOREFRONT SIGNAGE MOCKUP */}
        {activeMockup === 'storefront' && (
          <div className={styles.mockupStorefrontScene}>
            <div className={styles.storefrontWall}>
              <div className={styles.storefrontSignboard} style={{ borderLeft: `6px solid ${logo.primaryColor}` }}>
                <div className={styles.storeSignBacklight} style={{ background: `radial-gradient(circle, ${logo.primaryColor}22 0%, transparent 70%)` }} />
                <img src={logoDataUrl} alt={`${businessName} outdoor signage`} className={styles.storefrontLogoImg} />
              </div>
              <div className={styles.storefrontGlassReflection} />
            </div>
          </div>
        )}

        {/* 7. CORPORATE LETTERHEAD MOCKUP */}
        {activeMockup === 'letterhead' && (
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
        )}
      </div>
    </div>
  );
};
