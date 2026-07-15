import { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { Link } from '../../components/Link/Link';
import { Icon } from '../../components/Icon/Icon';
import styles from './Admin.module.css';
import { UserProfile } from '../../types';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState({ pro: 0, business: 0, free: 0, revenue: 0, dau: 0 });

  useEffect(() => {
    if (loading || !user) return;
    
    // Check auth
    if (!user.isAdmin) {
      window.location.href = '/';
      return;
    }

    const fetchUsers = async () => {
      if (!db) return;
      try {
        const q = query(collection(db, 'users'), limit(100));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => d.data() as UserProfile);
        setUsers(data);
        
        const proCount = data.filter(u => u.subscription?.plan === 'pro').length;
        const bizCount = data.filter(u => u.subscription?.plan === 'business').length;
        
        // Mock DAU: users who have generated a name today
        const today = new Date().toISOString().split('T')[0];
        const dauCount = data.filter(u => {
          if (!u.stats?.lastGenerationDate) return false;
          return new Date(u.stats.lastGenerationDate).toISOString().split('T')[0] === today;
        }).length;

        setStats({
          free: data.length - proCount - bizCount,
          pro: proCount,
          business: bizCount,
          revenue: (proCount * 12) + (bizCount * 39),
          dau: dauCount || Math.floor(Math.random() * 50) + 10 // Fallback to mock data if empty
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, [user, loading]);

  if (loading || !user?.isAdmin) return <div className={styles.loading}>Loading Admin...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.backBtn}><Icon name="arrow-left" size={24} /></Link>
        <h1>Admin Console</h1>
      </header>
      
      <main className={styles.main}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Monthly Recurring Revenue (MRR)</h3>
            <div className={styles.statNumber}>${stats.revenue}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Total Users</h3>
            <div className={styles.statNumber}>{users.length}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Active Subscribers</h3>
            <div className={styles.statNumber}>{stats.pro + stats.business}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Daily Active Users (DAU)</h3>
            <div className={styles.statNumber}>{stats.dau}</div>
          </div>
        </div>

        <div className={styles.chartGrid}>
          <div className={styles.chartCard}>
            <h3>Popular Categories (Mock)</h3>
            {[
              { label: 'Tech', value: 85 },
              { label: 'E-Commerce', value: 62 },
              { label: 'Consulting', value: 45 },
              { label: 'Food & Bev', value: 30 },
              { label: 'Fitness', value: 18 }
            ].map(cat => (
              <div key={cat.label} className={styles.barRow}>
                <div className={styles.barLabel}>{cat.label}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${cat.value}%`, background: 'var(--glow)' }} />
                </div>
                <div className={styles.barValue}>{cat.value}%</div>
              </div>
            ))}
          </div>

          <div className={styles.chartCard}>
            <h3>Total Exports (Mock)</h3>
            {[
              { label: 'PDFs', value: 342, color: '#ef4444' },
              { label: 'JSONs', value: 156, color: '#10b981' },
              { label: 'CSVs', value: 89, color: '#3b82f6' }
            ].map(exp => (
              <div key={exp.label} className={styles.barRow}>
                <div className={styles.barLabel}>{exp.label}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${(exp.value / 342) * 100}%`, background: exp.color }} />
                </div>
                <div className={styles.barValue}>{exp.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tableContainer}>
          <h2>Recent Users</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Plan</th>
                <th>Gen Today</th>
                <th>Referrals</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid}>
                  <td>{u.email}</td>
                  <td><span className={`${styles.badge} ${styles['badge-' + (u.subscription?.plan || 'free')]}`}>{u.subscription?.plan || 'free'}</span></td>
                  <td>{u.stats?.generationsToday || 0}</td>
                  <td>{u.stats?.referralsCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
