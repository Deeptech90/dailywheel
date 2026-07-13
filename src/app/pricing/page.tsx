import { useState } from 'react';
import { Link } from '../../components/Link/Link';
import { Icon } from '../../components/Icon/Icon';
import { useAuth } from '../../context/AuthContext';
import styles from './Pricing.module.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, firebaseUser } = useAuth();

  const handleUpgrade = async (plan: 'pro' | 'business') => {
    if (!user || !firebaseUser || firebaseUser.isAnonymous) {
      alert("Please sign in with Google first to upgrade.");
      return;
    }
    
    // MOCK UPGRADE LOGIC for UI Demonstration
    setLoading(true);
    if (!db) {
      alert("Firebase not configured.");
      setLoading(false);
      return;
    }
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userRef, {
        'subscription.plan': plan,
        'subscription.status': 'active',
        'subscription.currentPeriodEnd': Date.now() + (annual ? 31536000000 : 2592000000) // +1 year or +1 month
      });
      alert(`Successfully upgraded to ${plan.toUpperCase()}! (Mock Payment Complete)`);
    } catch (e) {
      console.error(e);
      alert("Upgrade failed.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}><Icon name="arrow-left" size={24} /></Link>
        <div className={styles.logo}>UBN <span>Pro</span></div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Build your brand faster.</h1>
          <p>Choose the plan that fits your business. Upgrade anytime.</p>
          
          <div className={styles.toggleGroup}>
            <span className={!annual ? styles.active : ''}>Monthly</span>
            <button className={styles.toggleBtn} onClick={() => setAnnual(!annual)} aria-pressed={annual}>
              <div className={`${styles.toggleKnob} ${annual ? styles.toggled : ''}`} />
            </button>
            <span className={annual ? styles.active : ''}>Annually <span className={styles.saveBadge}>Save 20%</span></span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Free Plan */}
          <div className={styles.card}>
            <h2>Free</h2>
            <div className={styles.price}>$0<span>/mo</span></div>
            <p className={styles.desc}>For trying out the generator.</p>
            <button className={styles.btnOutline} disabled>Current Plan</button>
            <ul className={styles.features}>
              <li>✓ 20 generations per day</li>
              <li>✓ Save up to 25 brands</li>
              <li>✓ Basic Brand Kit</li>
              <li className={styles.muted}>✕ Ad-supported</li>
              <li className={styles.muted}>✕ No PDF/JSON Export</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className={`${styles.card} ${styles.popular}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <h2>Pro</h2>
            <div className={styles.price}>${annual ? '9' : '12'}<span>/mo</span></div>
            <p className={styles.desc}>For founders and creators.</p>
            <button className={styles.btnPrimary} onClick={() => handleUpgrade('pro')} disabled={loading || user?.subscription.plan === 'pro'}>
              {user?.subscription.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
            <ul className={styles.features}>
              <li>✓ <strong>Unlimited</strong> generations</li>
              <li>✓ <strong>Unlimited</strong> saved brands</li>
              <li>✓ Export to PDF & JSON</li>
              <li>✓ Priority AI Generation</li>
              <li>✓ Zero Ads</li>
            </ul>
          </div>

          {/* Business Plan */}
          <div className={styles.card}>
            <h2>Business</h2>
            <div className={styles.price}>${annual ? '29' : '39'}<span>/mo</span></div>
            <p className={styles.desc}>For agencies and teams.</p>
            <button className={styles.btnOutline} onClick={() => handleUpgrade('business')} disabled={loading || user?.subscription.plan === 'business'}>
               {user?.subscription.plan === 'business' ? 'Current Plan' : 'Upgrade to Business'}
            </button>
            <ul className={styles.features}>
              <li>✓ Everything in Pro</li>
              <li>✓ Shared Team Workspaces</li>
              <li>✓ Multiple Team Members</li>
              <li>✓ Admin Dashboard</li>
              <li>✓ Priority Support</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
