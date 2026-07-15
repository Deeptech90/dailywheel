import { SEOCategory } from '../../data/seoCategories';
import { SEOHead } from '../SEOHead/SEOHead';
import GeneratorApp from '../GeneratorApp/GeneratorApp';
import { Link } from '../Link/Link';
import { BUSINESS_CATEGORIES } from '../../data/businessNames';
import styles from './CategoryLandingPage.module.css';

export function CategoryLandingPage({ category }: { category: SEOCategory }) {
  return (
    <>
      <SEOHead 
        title={category.title}
        description={category.description}
        type="WebApplication"
      />
      
      {/* The main interactive app */}
      <GeneratorApp />

      {/* SEO Content strictly for crawlers & organic discovery */}
      <article className={styles.seoContent}>
        <div className={styles.seoMain}>
           <h2>Why use our {category.name} Name Generator?</h2>
           <p>
             Finding the perfect name for your {category.name.toLowerCase()} is crucial for brand recognition and customer trust. 
             Our AI-powered engine analyzes thousands of successful brands to generate unique, memorable, and highly-brandable names tailored specifically to your industry.
           </p>

           <h3>Frequently Asked Questions</h3>
           <div className={styles.faqList}>
             {category.faqs.map((faq, i) => (
               <details key={i} className={styles.faqItem}>
                 <summary>{faq.question}</summary>
                 <p>{faq.answer}</p>
               </details>
             ))}
           </div>
           
           <h3 style={{ marginTop: '3rem' }}>Explore Related Generators</h3>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
             {BUSINESS_CATEGORIES.map(c => (
               <Link key={c.id} href={`/generator/${c.id}-name-generator`} className={styles.tagBtn}>
                 {c.icon} {c.label} Name Generator
               </Link>
             ))}
           </div>
        </div>
      </article>
    </>
  );
}
