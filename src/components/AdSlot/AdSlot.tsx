'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './AdSlot.module.css';

interface AdSlotProps {
  type: 'banner' | 'box';
  adSlot?: string;
  adClient?: string;
}

export function AdSlot({ type, adSlot = '1234567890', adClient = 'ca-pub-placeholder' }: AdSlotProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Check initial consent status
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHasConsent(!!parsed.marketing);
      } catch (e) {
        setHasConsent(false);
      }
    } else {
      setHasConsent(false); // Default to false until consent given
    }

    // Listen for consent updates
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setHasConsent(!!customEvent.detail.marketing);
      }
    };

    window.addEventListener('cookie_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
  }, []);

  useEffect(() => {
    if (hasConsent && !initialized.current) {
      try {
        // Only run on client and once
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          initialized.current = true;
        }
      } catch (err) {
        console.error('AdSense initialization failed:', err);
      }
    }
  }, [hasConsent]);

  const containerClass = `${styles.adContainer} ${type === 'banner' ? styles.banner : styles.box}`;

  const triggerCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <div className={containerClass}>
      <span className={styles.adLabel}>Advertisement</span>
      {hasConsent ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={type === 'banner' ? 'horizontal' : 'auto'}
          data-full-width-responsive="true"
        />
      ) : (
        <div className={styles.placeholder}>
          {hasConsent === null ? (
            <span>Loading...</span>
          ) : (
            <span>
              Ad disabled. Customize choices in{' '}
              <button
                onClick={triggerCookieSettings}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--glow)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                Cookie Settings
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
