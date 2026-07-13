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
  const [stats, setStats] = useState({ pro: 0, business: 0, free: 0, revenue: 0 });

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
        
        setStats({
          free: data.length - proCount - bizCount,
          pro: proCount,
          business: bizCount,
          // Mock revenue calculation: Pro = $12, Biz = $39
          revenue: (proCount * 12) + (bizCount * 39)
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
            <h3>Pro Subscribers</h3>
            <div className={styles.statNumber}>{stats.pro}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Business Subscribers</h3>
            <div className={styles.statNumber}>{stats.business}</div>
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
