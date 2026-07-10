'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

interface ConsentState {
  necessary: boolean;
  performance: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    // Check localStorage
    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(stored) as ConsentState;
        setConsent(parsed);
        // Expose global state
        (window as any).cookieConsent = parsed;
      } catch (e) {
        setIsVisible(true);
      }
    }

    // Listen for custom trigger to open settings
    const handleOpenSettings = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.optOutOnly) {
        // CCPA Opt-Out trigger: auto toggle marketing to false and open settings
        setConsent(prev => ({ ...prev, marketing: false }));
      }
      setShowSettings(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (updatedConsent: ConsentState) => {
    localStorage.setItem('cookie_consent', JSON.stringify(updatedConsent));
    setConsent(updatedConsent);
    (window as any).cookieConsent = updatedConsent;
    setIsVisible(false);
    setShowSettings(false);

    // Write a cookie for server-side checks
    document.cookie = `cookie_consent_accepted=${JSON.stringify(updatedConsent)}; path=/; max-age=31536000; SameSite=Lax; Secure`;

    // Notify any script trackers
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: updatedConsent }));
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, performance: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, performance: false, marketing: false });
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  if (!isVisible && !showSettings) return null;

  return (
    <>
      {isVisible && !showSettings && (
        <div className={styles.banner} role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-desc">
          <div className={styles.content}>
            <h2 id="cookie-banner-title" className={styles.title}>
              🍪 Cookie Settings & Privacy Preference
            </h2>
            <p id="cookie-banner-desc" className={styles.text}>
              We use cookies to personalize content and ads, analyze traffic, and ensure the basic functioning of our website. You can review your choices and adjust them at any time. Read our{' '}
              <a href="/privacy">Privacy Policy</a> and{' '}
              <a href="/cookies">Cookie Policy</a> for details.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.btnSettings}`} onClick={() => setShowSettings(true)}>
              Customize Settings
            </button>
            <button className={`${styles.btn} ${styles.btnReject}`} onClick={handleRejectAll}>
              Reject Non-Essential
            </button>
            <button className={`${styles.btn} ${styles.btnAccept}`} onClick={handleAcceptAll}>
              Accept All
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setShowSettings(false)}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <div className={styles.modalHeader}>
              <h2 id="settings-title" className={styles.modalTitle}>
                Privacy Preference Center
              </h2>
              <button className={styles.closeBtn} onClick={() => setShowSettings(false)} aria-label="Close preferences">
                ✕
              </button>
            </div>

            <div className={styles.cookieList}>
              {/* Necessary */}
              <div className={styles.cookieItem}>
                <div className={styles.cookieHeader}>
                  <span className={styles.cookieLabel}>Strictly Necessary (Always Active)</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked disabled aria-label="Strictly Necessary cookies toggle" />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.cookieDesc}>
                  These cookies are essential for you to browse the website and use its features, such as saving your custom wheel segments and result history.
                </p>
              </div>

              {/* Performance */}
              <div className={styles.cookieItem}>
                <div className={styles.cookieHeader}>
                  <span className={styles.cookieLabel}>Analytics & Performance</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={consent.performance}
                      onChange={(e) => setConsent({ ...consent, performance: e.target.checked })}
                      aria-label="Analytics and performance cookies toggle"
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.cookieDesc}>
                  These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. All of the data is aggregated and anonymized.
                </p>
              </div>

              {/* Marketing */}
              <div className={styles.cookieItem}>
                <div className={styles.cookieHeader}>
                  <span className={styles.cookieLabel}>Marketing & Advertising (AdSense)</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                      aria-label="Marketing and advertising cookies toggle"
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.cookieDesc}>
                  These cookies are used by our advertising partners, like Google AdSense, to deliver relevant advertisements tailored to your interests and browsing behavior.
                </p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.btnReject}`} onClick={handleRejectAll}>
                Reject All
              </button>
              <button className={`${styles.btn} ${styles.btnAccept}`} onClick={handleAcceptAll}>
                Accept All
              </button>
              <button className={`${styles.btn} ${styles.btnSettings}`} onClick={handleSaveSettings}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
