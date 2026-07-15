import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';
import { useSubscription } from '../../hooks/useSubscription';
import { loadHistory } from '../../utils/storage';
import { Link } from '../../components/Link/Link';
import { Icon } from '../../components/Icon/Icon';
import { exportJSON, exportCSV, exportPDF } from '../../utils/exportUtils';
import { UpgradeModal } from '../../components/UpgradeModal/UpgradeModal';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const { user, isGuest, signInWithGoogle, logout } = useAuth();
  const { plan, isPro, isBusiness } = useSubscription();
  const { favorites, removeFavorite } = useFavorites();
  const history = loadHistory();
  const [activeTab, setActiveTab] = useState<'brands' | 'activity' | 'subscription' | 'referrals'>('brands');
  const [upgradeReason, setUpgradeReason] = useState<'generation_limit' | 'brand_kit_limit' | 'export_pdf' | 'export_json' | 'saved_brands_limit' | null>(null);

  const stats = useMemo(() => {
    return {
      brands: favorites.length,
      spins: history.length,
      lastActive: favorites.length > 0 ? new Date(favorites[0].createdAt).toLocaleDateString() : 'Never'
    };
  }, [favorites, history]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <Icon name="arrow-left" size={24} />
        </Link>
        <h1 className={styles.title}>My Brands</h1>
        <button onClick={logout} className={styles.logoutBtn} aria-label="Log out">
          <Icon name="close" size={20} />
        </button>
      </header>

      <main className={styles.main}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.photoURL ? <img src={user.photoURL} alt="Avatar" /> : <span>{user?.email?.[0]?.toUpperCase() || 'U'}</span>}
            </div>
            <div>
              <h2>{user?.displayName || (isGuest ? 'Guest User' : 'User')}</h2>
              <p className={styles.email}>{user?.email || 'Not signed in'}</p>
            </div>
          </div>
          {isGuest && (
            <button className={styles.googleBtn} onClick={signInWithGoogle}>
              <Icon name="google" size={16} /> Sign in to sync
            </button>
          )}
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.brands}</span>
            <span className={styles.statLabel}>Saved Brands</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.spins}</span>
            <span className={styles.statLabel}>Total Spins</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.lastActive}</span>
            <span className={styles.statLabel}>Last Saved</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'brands' ? styles.tabActive : ''}`} onClick={() => setActiveTab('brands')}>
            Saved Brands
          </button>
          <button className={`${styles.tab} ${activeTab === 'subscription' ? styles.tabActive : ''}`} onClick={() => setActiveTab('subscription')}>
            Subscription
          </button>
          <button className={`${styles.tab} ${activeTab === 'referrals' ? styles.tabActive : ''}`} onClick={() => setActiveTab('referrals')}>
            Referrals
          </button>
          <button className={`${styles.tab} ${activeTab === 'activity' ? styles.tabActive : ''}`} onClick={() => setActiveTab('activity')}>
            Recent Activity
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'brands' && (
            <div className={styles.brandsGrid}>
              {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>You haven't saved any brands yet.</p>
                  <Link href="/" className={styles.emptyStateBtn}>Go Spin the Wheel</Link>
                </div>
              ) : (
                favorites.map(kit => (
                  <div key={kit.name} className={styles.brandCard}>
                    <div className={styles.brandHeader} style={{ background: `linear-gradient(135deg, ${kit.identity?.primaryColor || '#a855f7'}, ${kit.identity?.secondaryColor || '#3b82f6'})` }}>
                      <h3>{kit.name}</h3>
                      <span className={styles.brandCat}>{kit.category}</span>
                    </div>
                    <div className={styles.brandBody}>
                      <p className={styles.brandDesc}>{kit.intelligence?.meaning || 'Legacy favorite'}</p>
                      
                      <div className={styles.brandActions}>
                        <button className={styles.actionBtn} onClick={() => {
                          if (isPro) exportPDF(kit);
                          else setUpgradeReason('export_pdf');
                        }}>📄 PDF {!isPro && '🔒'}</button>
                        <button className={styles.actionBtn} onClick={() => exportCSV(kit)}>📊 CSV</button>
                        <button className={styles.actionBtn} onClick={() => {
                          if (isPro) exportJSON(kit);
                          else setUpgradeReason('export_json');
                        }}>💾 JSON {!isPro && '🔒'}</button>
                        <button className={styles.actionBtn} style={{color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)'}} onClick={() => removeFavorite(kit.name)}>
                           🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={styles.activityList}>
              {history.length === 0 ? (
                <p className={styles.emptyState}>No recent spins.</p>
              ) : (
                history.slice(0, 50).map((h, i) => (
                  <div key={h.id || i} className={styles.activityItem}>
                    <div className={styles.activityIcon}>🎡</div>
                    <div className={styles.activityDetails}>
                      <span className={styles.activityName}>{h.segment?.label}</span>
                      <span className={styles.activityTime}>{new Date(h.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className={styles.subscriptionView}>
              <div className={styles.subCard}>
                <h3>Current Plan: <span style={{textTransform: 'uppercase', color: 'var(--primary)'}}>{plan}</span></h3>
                <p>Status: {user?.subscription.status || 'active'}</p>
                {plan !== 'free' && (
                  <p>Renews on: {new Date(user?.subscription.currentPeriodEnd || Date.now()).toLocaleDateString()}</p>
                )}
                
                <div style={{marginTop: '1.5rem', display: 'flex', gap: '1rem'}}>
                  {plan === 'free' ? (
                    <Link href="/pricing" className={styles.primaryBtn}>Upgrade to Pro</Link>
                  ) : (
                    <>
                      <Link href="/pricing" className={styles.primaryBtn}>Change Plan</Link>
                      <button className={styles.outlineBtn} onClick={() => alert('Mock Cancelation successful.')}>Cancel Subscription</button>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.subCard} style={{marginTop: '1.5rem'}}>
                <h3>Billing History</h3>
                <p className={styles.textMuted}>No invoices found (Mock UI).</p>
              </div>
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className={styles.subscriptionView}>
              <div className={styles.subCard}>
                <h3>Refer a Friend</h3>
                <p>Get 100 free generations for every friend who joins using your code!</p>
                <div style={{marginTop: '1rem', padding: '1rem', background: 'var(--surface-2)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.2em'}}>
                  {user?.stats?.referralCode || 'UBN-REF-123'}
                </div>
                <div style={{marginTop: '1.5rem'}}>
                  <p><strong>Total Referrals:</strong> {user?.stats?.referralsCount || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {upgradeReason && (
        <UpgradeModal 
          reason={upgradeReason} 
          onClose={() => setUpgradeReason(null)} 
        />
      )}
    </div>
  );
}
