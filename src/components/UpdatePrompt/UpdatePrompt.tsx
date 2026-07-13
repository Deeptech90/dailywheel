import { useRegisterSW } from 'virtual:pwa-register/react';
import styles from '../InstallPrompt/InstallPrompt.module.css'; // Reuse install prompt styles

export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className={styles.overlay} style={{ bottom: '20px' }}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h3 className={styles.title}>New version available</h3>
          <p className={styles.desc}>Click refresh to update to the latest version.</p>
        </div>
        <div className={styles.actions} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <button 
            className={styles.btnPrimary} 
            onClick={() => updateServiceWorker(true)}
          >
            Refresh
          </button>
          <button 
            className={styles.btnSecondary} 
            onClick={() => setNeedRefresh(false)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
