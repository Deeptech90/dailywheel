import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service | UniqueBusinessName.com',
  description: 'Read the Terms of Service for using UniqueBusinessName.com decision wheel and business name generator.',
  alternates: {
    canonical: 'https://uniquebusinessname.com/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Generator
      </Link>
      
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.subtitle}>Last updated: May 20, 2026</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
        <p className={styles.text}>
          By accessing or using <span className={styles.highlight}>UniqueBusinessName.com</span>, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not access or use our website.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Use of the Services</h2>
        <p className={styles.text}>
          We grant you a non-exclusive, non-transferable, revocable license to access our platform solely for personal and business name generation purposes. You agree not to:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Use the site for any unlawful purpose or in violation of local, state, national, or international laws.</li>
          <li className={styles.listItem}>Decompile, reverse engineer, or attempt to extract the source code of the spinning wheel or anti-gravity engine.</li>
          <li className={styles.listItem}>Attempt to disrupt or overload our infrastructure or launch malicious scripts against the site.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Intellectual Property Rights</h2>
        <p className={styles.text}>
          All content, features, and functionality on UniqueBusinessName.com—including text, graphics, logos, icons, layout, and algorithms (specifically the anti-gravity physics simulation)—are the exclusive property of UniqueBusinessName.com and are protected by international copyright, trademark, patent, and other intellectual property laws.
        </p>
        <p className={styles.text}>
          The generated business names are generated programmatically on your client device. UniqueBusinessName.com makes no claim of ownership over the generated names and does not guarantee that the names are free from third-party trademark rights. It is your responsibility to verify trademark availability before registering a business name.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Disclaimer of Warranties</h2>
        <p className={styles.text}>
          The site and generator are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. UniqueBusinessName.com does not warrant that the service will be uninterrupted, error-free, or secure, or that the names generated are suitable for your business or legally available.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Limitation of Liability</h2>
        <p className={styles.text}>
          To the maximum extent permitted by law, UniqueBusinessName.com shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of, or inability to use the site, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      <section className={styles.contactBox}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Support & Contact</h2>
        <p className={styles.text}>
          For legal inquiries, please contact:
        </p>
        <p className={styles.text}>
          Email: <span className={styles.highlight}>legal@uniquebusinessname.com</span>
        </p>
      </section>
    </div>
  );
}
