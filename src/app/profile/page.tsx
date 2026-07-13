import { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';
import { loadHistory } from '../../utils/storage';
import { Link } from '../../components/Link/Link';
import { Icon } from '../../components/Icon/Icon';
import styles from './Profile.module.css';

export default function ProfilePage() {
  const { user, isGuest, signInWithGoogle, logout } = useAuth();
  const { favorites } = useFavorites();
  const history = loadHistory();

  const handleExportJSON = () => {
    const data = JSON.stringify({ favorites, history }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ubn_data_export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csvContent = [
      'Type,Name,Category,Timestamp',
      ...favorites.map(f => `Favorite,"${f.name}","${f.category}",${f.savedAt}`),
      ...history.map(h => `History,"${h.segment.label}","History",${h.timestamp}`)
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ubn_data_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <Icon name="arrow-left" size={24} />
        </Link>
        <h1 className={styles.title}>Your Profile</h1>
        <div style={{width: 24}}></div>
      </header>

      <main className={styles.main}>
        {isGuest || !user ? (
          <div className={styles.authCard}>
            <div className={styles.authIcon}>👤</div>
            <h2>Guest Mode</h2>
            <p className={styles.desc}>Sign in to securely sync your favorites and history across all your devices.</p>
            <button className={styles.googleBtn} onClick={signInWithGoogle}>
              <Icon name="google" size={20} />
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className={styles.avatarImg} />
              ) : (
                <span>{user.email?.[0].toUpperCase() || 'U'}</span>
              )}
            </div>
            <h2>{user.displayName || 'User'}</h2>
            <p className={styles.email}>{user.email}</p>
            
            <div className={styles.stats}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>{favorites.length}</span>
                <span className={styles.statLabel}>Favorites</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>{history.length}</span>
                <span className={styles.statLabel}>History</span>
              </div>
            </div>

            <button className={styles.logoutBtn} onClick={logout}>
              Sign Out
            </button>
          </div>
        )}

        <div className={styles.section}>
          <h3>Data Management</h3>
          <div className={styles.actionList}>
            <button className={styles.actionItem} onClick={handleExportCSV}>
              <Icon name="download" size={20} />
              <span>Export as CSV</span>
            </button>
            <button className={styles.actionItem} onClick={handleExportJSON}>
              <Icon name="code" size={20} />
              <span>Export as JSON</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
