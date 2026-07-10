'use client';

import { useState, useEffect } from 'react';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import styles from './NavigationDrawer.module.css';

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

  const toggleDrawer = () => setIsOpen(!isOpen);

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
      >
        <Icon name="menu" size={24} />
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={toggleDrawer} role="presentation" />
          <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Navigation drawer">
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu Navigation</span>
              <button
                className={styles.closeBtn}
                onClick={toggleDrawer}
                aria-label="Close navigation menu"
              >
                <Icon name="close" size={24} />
              </button>
            </div>

            <nav className={styles.navLinks}>
              <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                Name Generator
              </Link>
              <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.navLinkActive : ''}`}>
                About Us
              </Link>
              <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.navLinkActive : ''}`}>
                Contact Us
              </Link>
              <Link href="/privacy" className={`${styles.navLink} ${pathname === '/privacy' ? styles.navLinkActive : ''}`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`${styles.navLink} ${pathname === '/terms' ? styles.navLinkActive : ''}`}>
                Terms of Service
              </Link>
              <Link href="/cookies" className={`${styles.navLink} ${pathname === '/cookies' ? styles.navLinkActive : ''}`}>
                Cookie Policy
              </Link>
            </nav>

            <div className={styles.drawerFooter}>
              <button
                className={styles.optOutBtn}
                onClick={handleCCPAOptOut}
                title="California Consumer Privacy Act Opt Out"
              >
                Do Not Sell/Share My Info
              </button>
              <button
                className={styles.optOutBtn}
                onClick={handleOpenCookieSettings}
              >
                Cookie Settings
              </button>
              <p className={styles.complianceText}>
                © 2026 UniqueBusinessName.com. All rights reserved. US/EU Compliance Certified.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
