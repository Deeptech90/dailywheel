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
  { id: 'business-card', label: 'Business Card', icon: '📇' },
  { id: 'mobile-screen', label: 'Mobile App',    icon: '📱' },
  { id: 't-shirt',       label: 'Apparel / Merch',icon: '👕' },
  { id: 'storefront',    label: 'Store Signage', icon: '🏬' },
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

        {/* 2. MOBILE SCREEN MOCKUP */}
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

        {/* 3. T-SHIRT APPAREL MOCKUP */}
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

        {/* 4. STOREFRONT SIGNAGE MOCKUP */}
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
      </div>
    </div>
  );
};
