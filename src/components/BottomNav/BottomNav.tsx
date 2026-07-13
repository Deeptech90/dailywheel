import { useState } from 'react';
import styles from './BottomNav.module.css';

export type BottomNavTab = 'home' | 'generator' | 'saved' | 'premium' | 'menu';

interface BottomNavProps {
  activeTab?: BottomNavTab;
  onTabChange?: (tab: BottomNavTab) => void;
  savedCount?: number;
}

const TABS: { id: BottomNavTab; icon: string; label: string }[] = [
  { id: 'home',      icon: '🏠', label: 'Home' },
  { id: 'generator', icon: '🎡', label: 'Generator' },
  { id: 'saved',     icon: '❤️', label: 'Saved' },
  { id: 'premium',   icon: '⭐', label: 'Premium' },
  { id: 'menu',      icon: '☰', label: 'Menu' },
];

export function BottomNav({ activeTab = 'generator', onTabChange, savedCount = 0 }: BottomNavProps) {
  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => onTabChange?.(tab.id)}
          aria-label={tab.label}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className={styles.tabIcon} aria-hidden="true">{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
          {tab.id === 'saved' && savedCount > 0 && (
            <span className={styles.badge}>{Math.min(savedCount, 99)}</span>
          )}
        </button>
      ))}
    </nav>
  );
}
