import { useState } from 'react';
import { Link } from '../../components/Link/Link';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import { logEvent } from '../../utils/analytics';
import styles from './Pricing.module.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const VALID_COUPONS: Record<string, number> = {
  'LAUNCH50': 50,
  'EARLYBIRD': 25,
  'UBN2026': 20,
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const { user, firebaseUser, isGuest } = useAuth();
  const { plan: currentPlan } = useSubscription();

  const applyDiscount = (price: number) => {
    if (!couponApplied) return price;
    return Math.round(price * (1 - couponApplied.discount / 100));
  };

  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim();
    if (VALID_COUPONS[code]) {
      setCouponApplied({ code, discount: VALID_COUPONS[code] });
      setCouponError('');
      logEvent('coupon_applied', { code });
    } else {
      setCouponError('Invalid or expired coupon code.');
      setCouponApplied(null);
    }
  };

  const handleUpgrade = async (plan: 'pro' | 'business') => {
    logEvent('upgrade_clicked', { plan, source: 'pricing_page', billing: annual ? 'annual' : 'monthly' });

    if (isGuest || !firebaseUser || firebaseUser.isAnonymous) {
      alert('Please sign in with Google first to upgrade.');
      return;
    }
    if (!db) return;

    setLoading(plan);
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userRef, {
        'subscription.plan': plan,
        'subscription.status': 'active',
        'subscription.currentPeriodEnd': Date.now() + (annual ? 31536000000 : 2592000000),
        'subscription.cancelAtPeriodEnd': false,
      });
      logEvent('subscription_upgrade', { plan, billing: annual ? 'annual' : 'monthly', coupon: couponApplied?.code });
      alert(`✅ Successfully upgraded to ${plan.toUpperCase()}! (Simulated checkout)`);
    } catch (e) {
      console.error(e);
      alert('Upgrade failed. Please try again.');
    }
    setLoading(null);
  };

  const handleStartTrial = async () => {
    logEvent('trial_started', { plan: 'pro' });
    if (isGuest || !firebaseUser || firebaseUser.isAnonymous) {
      alert('Please sign in to start your free trial.');
      return;
    }
    if (!db) return;
    const trialEnd = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const userRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(userRef, {
      'subscription.plan': 'pro',
      'subscription.status': 'trialing',
      'subscription.currentPeriodEnd': trialEnd,
    });
    logEvent('trial_started', { trialEnd });
    alert('🎉 Your 7-day free Pro trial has started!');
  };

  const PRO_PRICE = annual ? applyDiscount(9) : applyDiscount(12);
  const BIZ_PRICE = annual ? applyDiscount(29) : applyDiscount(39);

  const planLabel = (plan: 'free' | 'pro' | 'business') => {
    if (currentPlan === plan) return 'Current Plan';
    if (plan === 'free') return 'Downgrade';
    return `Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>← Back</Link>
        <div className={styles.logo}>UBN <span>Pro</span></div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Build your brand faster.</h1>
          <p>Choose the plan that fits your business. Upgrade, downgrade, or cancel anytime.</p>

          <div className={styles.toggleGroup}>
            <span className={!annual ? styles.active : ''}>Monthly</span>
            <button
              className={styles.toggleBtn}
              onClick={() => setAnnual(!annual)}
              aria-pressed={annual}
            >
              <div className={`${styles.toggleKnob} ${annual ? styles.toggled : ''}`} />
            </button>
            <span className={annual ? styles.active : ''}>
              Annually <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </div>

          {/* Coupon Code */}
          <div className={styles.couponRow}>
            <input
              type="text"
              placeholder="Coupon code (e.g. LAUNCH50)"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              className={styles.couponInput}
              maxLength={20}
            />
            <button className={styles.couponBtn} onClick={handleApplyCoupon}>Apply</button>
          </div>
          {couponApplied && (
            <p className={styles.couponSuccess}>✅ {couponApplied.code} — {couponApplied.discount}% off applied!</p>
          )}
          {couponError && <p className={styles.couponError}>{couponError}</p>}
        </div>

        <div className={styles.grid}>
          {/* Free Plan */}
          <div className={`${styles.card} ${currentPlan === 'free' ? styles.currentCard : ''}`}>
            {currentPlan === 'free' && <div className={styles.currentBadge}>Your Plan</div>}
            <h2>Free</h2>
            <div className={styles.price}>$0<span>/mo</span></div>
            <p className={styles.desc}>For trying out the generator.</p>
            <button className={styles.btnOutline} disabled={currentPlan === 'free'}>
              {planLabel('free')}
            </button>
            <ul className={styles.features}>
              <li>✓ 20 generations per day</li>
              <li>✓ 5 brand kits per day</li>
              <li>✓ Save up to 25 brands</li>
              <li className={styles.muted}>✕ Ad-supported</li>
              <li className={styles.muted}>✕ No PDF/JSON Export</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className={`${styles.card} ${styles.popular} ${currentPlan === 'pro' ? styles.currentCard : ''}`}>
            {currentPlan === 'pro' ? (
              <div className={styles.currentBadge}>Your Plan</div>
            ) : (
              <div className={styles.popularBadge}>Most Popular</div>
            )}
            <h2>Pro</h2>
            <div className={styles.price}>
              ${PRO_PRICE}<span>/mo</span>
              {couponApplied && <span className={styles.originalPrice}>${annual ? 9 : 12}</span>}
            </div>
            <p className={styles.desc}>For founders and creators.</p>
            <button
              className={styles.btnPrimary}
              onClick={() => handleUpgrade('pro')}
              disabled={!!loading || currentPlan === 'pro'}
            >
              {loading === 'pro' ? 'Processing…' : planLabel('pro')}
            </button>
            {currentPlan !== 'pro' && currentPlan !== 'business' && (
              <button className={styles.trialLink} onClick={handleStartTrial}>
                Start 7-day free trial
              </button>
            )}
            <ul className={styles.features}>
              <li>✓ <strong>Unlimited</strong> generations</li>
              <li>✓ <strong>Unlimited</strong> brand kits</li>
              <li>✓ <strong>Unlimited</strong> saved brands</li>
              <li>✓ Export to PDF & JSON</li>
              <li>✓ Priority AI Generation</li>
              <li>✓ Zero Ads</li>
              <li>✓ Priority Support</li>
            </ul>
          </div>

          {/* Business Plan */}
          <div className={`${styles.card} ${currentPlan === 'business' ? styles.currentCard : ''}`}>
            {currentPlan === 'business' && <div className={styles.currentBadge}>Your Plan</div>}
            <h2>Business</h2>
            <div className={styles.price}>
              ${BIZ_PRICE}<span>/mo</span>
              {couponApplied && <span className={styles.originalPrice}>${annual ? 29 : 39}</span>}
            </div>
            <p className={styles.desc}>For agencies and teams.</p>
            <button
              className={styles.btnOutline}
              onClick={() => handleUpgrade('business')}
              disabled={!!loading || currentPlan === 'business'}
            >
              {loading === 'business' ? 'Processing…' : planLabel('business')}
            </button>
            <ul className={styles.features}>
              <li>✓ Everything in Pro</li>
              <li>✓ Shared Team Workspaces</li>
              <li>✓ Multiple Team Members</li>
              <li>✓ Admin Dashboard</li>
              <li>✓ Priority Support</li>
              <li>✓ Future API Access</li>
            </ul>
          </div>
        </div>

        <div className={styles.paymentNote}>
          <span>🔒 Secure Checkout</span>
          <span>💳 Stripe & Razorpay</span>
          <span>🍎 Apple Pay</span>
          <span>🌐 Google Pay</span>
          <span>🔄 Cancel Anytime</span>
        </div>
      </main>
    </div>
  );
}
