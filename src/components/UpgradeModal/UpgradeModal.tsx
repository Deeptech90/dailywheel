import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { logEvent } from '../../utils/analytics';
import styles from './UpgradeModal.module.css';

interface UpgradeModalProps {
  reason: 'generation_limit' | 'brand_kit_limit' | 'export_pdf' | 'export_json' | 'saved_brands_limit';
  onClose: () => void;
}

const REASON_MESSAGES: Record<string, { title: string; body: string }> = {
  generation_limit: {
    title: "Daily Limit Reached ⚡",
    body: "You've used all 20 free generations today. Upgrade to Pro for unlimited name generation."
  },
  brand_kit_limit: {
    title: "Brand Kit Limit Reached 🎨",
    body: "Free users can generate 5 brand kits per day. Upgrade to Pro for unlimited brand kit generation."
  },
  export_pdf: {
    title: "Pro Feature: PDF Export 📄",
    body: "PDF exports are available on the Pro plan. Upgrade now to download beautiful brand reports."
  },
  export_json: {
    title: "Pro Feature: JSON Export 💾",
    body: "JSON exports are available on the Pro plan. Upgrade now to integrate your brand data anywhere."
  },
  saved_brands_limit: {
    title: "Saved Brands Limit Reached 💼",
    body: "Free users can save up to 25 brands. Upgrade to Pro for unlimited brand storage."
  }
};

export function UpgradeModal({ reason, onClose }: UpgradeModalProps) {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, firebaseUser, isGuest } = useAuth();
  const msg = REASON_MESSAGES[reason];

  const handleUpgrade = async (plan: 'pro' | 'business') => {
    logEvent('upgrade_clicked', { plan, reason, billing: annual ? 'annual' : 'monthly' });
    
    if (isGuest || !firebaseUser || firebaseUser.isAnonymous) {
      alert('Please sign in with Google to upgrade.');
      return;
    }
    if (!db) return;

    setLoading(true);
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userRef, {
        'subscription.plan': plan,
        'subscription.status': 'active',
        'subscription.currentPeriodEnd': Date.now() + (annual ? 31536000000 : 2592000000)
      });
      logEvent('subscription_upgrade', { plan, billing: annual ? 'annual' : 'monthly' });
      onClose();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.lockIcon}>⚡</div>
        <h2 className={styles.title}>{msg.title}</h2>
        <p className={styles.body}>{msg.body}</p>

        <div className={styles.billingToggle}>
          <button
            className={`${styles.togglePill} ${!annual ? styles.active : ''}`}
            onClick={() => setAnnual(false)}
          >Monthly</button>
          <button
            className={`${styles.togglePill} ${annual ? styles.active : ''}`}
            onClick={() => setAnnual(true)}
          >Annual <span className={styles.savePill}>-20%</span></button>
        </div>

        <div className={styles.plans}>
          <div className={styles.planCard}>
            <div className={styles.planName}>Pro</div>
            <div className={styles.planPrice}>${annual ? '9' : '12'}<span>/mo</span></div>
            <ul className={styles.planFeatures}>
              <li>✓ Unlimited generations</li>
              <li>✓ Unlimited brand kits</li>
              <li>✓ PDF & JSON exports</li>
              <li>✓ Zero ads</li>
              <li>✓ Priority AI</li>
            </ul>
            <button
              className={styles.btnPro}
              onClick={() => handleUpgrade('pro')}
              disabled={loading || user?.subscription?.plan === 'pro'}
            >
              {user?.subscription?.plan === 'pro' ? 'Current Plan' : loading ? 'Processing…' : 'Upgrade to Pro'}
            </button>
          </div>

          <div className={`${styles.planCard} ${styles.planBiz}`}>
            <div className={styles.planName}>Business</div>
            <div className={styles.planPrice}>${annual ? '29' : '39'}<span>/mo</span></div>
            <ul className={styles.planFeatures}>
              <li>✓ Everything in Pro</li>
              <li>✓ Team workspaces</li>
              <li>✓ Shared brand libraries</li>
              <li>✓ Admin dashboard</li>
              <li>✓ API access (soon)</li>
            </ul>
            <button
              className={styles.btnBiz}
              onClick={() => handleUpgrade('business')}
              disabled={loading || user?.subscription?.plan === 'business'}
            >
              {user?.subscription?.plan === 'business' ? 'Current Plan' : loading ? 'Processing…' : 'Upgrade to Business'}
            </button>
          </div>
        </div>

        <p className={styles.payNote}>🔒 Secure mock checkout &nbsp;|&nbsp; 🌐 Google Pay & Apple Pay supported &nbsp;|&nbsp; 7-day free trial</p>
        <button className={styles.skipBtn} onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}
