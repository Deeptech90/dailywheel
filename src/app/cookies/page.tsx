import { useEffect } from 'react';
import { Link } from '../../components/Link/Link';
import styles from '../legal.module.css';
import { CookieSettingsButton } from '../../components/CookieSettingsButton/CookieSettingsButton';

export default function CookiePolicy() {
  useEffect(() => {
    document.title = 'Cookie Policy | UniqueBusinessName.com';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Detailed Cookie Policy for UniqueBusinessName.com. Understand how we use cookies for analytics and advertising.');
    }
  }, []);
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Generator
      </Link>
      
      <h1 className={styles.title}>Cookie Policy</h1>
      <p className={styles.subtitle}>Last updated: May 20, 2026</p>

      <section className={styles.section}>
        <p className={styles.text}>
          This is the Cookie Policy for <span className={styles.highlight}>UniqueBusinessName.com</span>. We believe in being transparent about how we collect and use data related to you. This policy provides detailed information about how and when we use cookies on our website.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Are Cookies?</h2>
        <p className={styles.text}>
          Cookies are small text files sent by us to your computer or mobile device. They are unique to your account or your browser. They help us remember your preferences, like the segments you entered on your spin wheel, your last results history, and whether you turned sound effects on or off.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How We Use Cookies</h2>
        <p className={styles.text}>
          We use cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Online Properties, or to serve relevant advertisements.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Types of Cookies We Use</h2>
        
        <h3 className={styles.sectionTitle} style={{ fontSize: '1.2rem' }}>1. Strictly Necessary Cookies</h3>
        <p className={styles.text}>
          These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.2rem' }}>2. Performance and Analytics Cookies</h3>
        <p className={styles.text}>
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.2rem' }}>3. Targeting and Advertising Cookies</h3>
        <p className={styles.text}>
          These cookies may be set through our site by our advertising partners, such as Google AdSense. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Control Cookies</h2>
        <p className={styles.text}>
          You have the right to decide whether to accept or reject non-essential cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Preference Center.
        </p>
        <p className={styles.text}>
          You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
      </section>

      <section className={styles.contactBox}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Manage Preferences</h2>
        <p className={styles.text}>
          If you want to modify your cookie settings, you can trigger the preference manager instantly:
        </p>
        <p className={styles.text}>
          <CookieSettingsButton
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--glow) 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '48px',
              fontFamily: 'var(--font-display)',
            }}
          />
        </p>
      </section>
    </div>
  );
}
