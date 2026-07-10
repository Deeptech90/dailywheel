import { useEffect } from 'react';
import { Link } from '../../components/Link/Link';
import styles from '../legal.module.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | UniqueBusinessName.com';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn how we collect, use, and protect your personal information at UniqueBusinessName.com. Fully GDPR & CCPA compliant.');
    }
  }, []);
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Generator
      </Link>
      
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.subtitle}>Last updated: May 20, 2026</p>

      <section className={styles.section}>
        <p className={styles.text}>
          At <span className={styles.highlight}>UniqueBusinessName.com</span>, accessible from https://uniquebusinessname.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by UniqueBusinessName.com and how we use it.
        </p>
        <p className={styles.text}>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General Data Protection Regulation (GDPR)</h2>
        <p className={styles.text}>
          We are a Data Controller of your information. UniqueBusinessName.com legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>UniqueBusinessName.com needs to perform a contract with you</li>
          <li className={styles.listItem}>You have given UniqueBusinessName.com permission to do so</li>
          <li className={styles.listItem}>Processing your personal information is in UniqueBusinessName.com legitimate interests</li>
          <li className={styles.listItem}>UniqueBusinessName.com needs to comply with the law</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Log Files</h2>
        <p className={styles.text}>
          UniqueBusinessName.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cookies and Web Beacons</h2>
        <p className={styles.text}>
          Like any other website, UniqueBusinessName.com uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
        <p className={styles.text}>
          For more general information on cookies, please read our <Link href="/cookies" className={styles.highlight}>Cookie Policy</Link>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Google DoubleClick DART Cookie</h2>
        <p className={styles.text}>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className={styles.highlight}>https://policies.google.com/technologies/ads</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Advertising Partners</h2>
        <p className={styles.text}>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Google AdSense</span>: Google's privacy policy is accessible at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Privacy Policies</h2>
        <p className={styles.text}>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on UniqueBusinessName.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p className={styles.text}>
          Note that UniqueBusinessName.com has no access to or control over these cookies that are used by third-party advertisers.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CCPA/CPRA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p className={styles.text}>
          Under the CCPA/CPRA, among other rights, California consumers have the right to:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li className={styles.listItem}>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li className={styles.listItem}>Request that a business that sells/shares a consumer's personal data, not sell/share the consumer's personal data.</li>
        </ul>
        <p className={styles.text}>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us or use our cookie preference center.
        </p>
      </section>

      <section className={styles.contactBox}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Contact Support</h2>
        <p className={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className={styles.text}>
          Email: <span className={styles.highlight}>support@uniquebusinessname.com</span>
        </p>
      </section>
    </div>
  );
}
