import { useState, useEffect } from 'react';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import styles from './NavigationDrawer.module.css';

const NAV_LINKS = [
  { href: '/',          label: 'Name Generator',  emoji: '🌀' },
  { href: '/dashboard', label: 'My Brands',       emoji: '🎨' },
  { href: '/about',     label: 'About Us',         emoji: '💡' },
  { href: '/contact',   label: 'Contact Us',       emoji: '✉️'  },
  { href: '/privacy',   label: 'Privacy Policy',   emoji: '🔒' },
  { href: '/terms',     label: 'Terms of Service', emoji: '📜' },
  { href: '/cookies',   label: 'Cookie Policy',    emoji: '🍪' },
];

export function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
      setIsOpen(false);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const toggleDrawer = () => setIsOpen(prev => !prev);

  const handleOpenCookieSettings = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  const handleCCPAOptOut = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('open-cookie-settings', { detail: { optOutOnly: true } }));
  };

  return (
    <>
      <button
        className={styles.hamburgerBtn}
        onClick={toggleDrawer}
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
        id="nav-hamburger-btn"
      >
        <Icon name="menu" size={22} />
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={toggleDrawer} role="presentation" />
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.drawerBrand}>
                <div className={styles.drawerBrandIcon}>🌀</div>
                <span className={styles.drawerTitle}>UBN</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={toggleDrawer}
                aria-label="Close navigation menu"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className={styles.navLinks} aria-label="Site navigation">
              <div className={styles.navSection}>Navigation</div>
              {NAV_LINKS.map(({ href, label, emoji }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ''}`}
                >
                  <span className={styles.navLinkEmoji}>{emoji}</span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className={styles.drawerFooter}>
              <button className={styles.optOutBtn} onClick={handleCCPAOptOut}>
                🚫 Do Not Sell/Share My Info
              </button>
              <button className={styles.optOutBtn} onClick={handleOpenCookieSettings}>
                🍪 Cookie Settings
              </button>
              <p className={styles.complianceText}>
                © 2026 UniqueBusinessName.com — All rights reserved.<br />
                GDPR &amp; CCPA Compliant
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
