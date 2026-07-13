import { useState, useEffect } from 'react';
import styles from './InstallPrompt.module.css';
import { Icon } from '../Icon/Icon';

// Extend Window interface for the non-standard beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('ubn_pwa_dismissed');
    if (isDismissed) return;

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('ubn_pwa_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <img src="/icon-192.png" alt="App Icon" className={styles.icon} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Install App</h3>
          <p className={styles.desc}>Get faster loading, offline access, and a better mobile experience.</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={handleInstall}>
            Install
          </button>
          <button className={styles.btnSecondary} onClick={handleDismiss} aria-label="Dismiss install prompt">
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
