import React from 'react';
import { SEOCategory } from '../../data/seoCategories';
import { SEOHead } from '../SEOHead/SEOHead';
import { NameGenerator } from '../NameGenerator/NameGenerator';
import { Link } from '../Link/Link';
import { BUSINESS_CATEGORIES } from '../../data/businessNames';
import { COMPETITOR_COMPARISONS } from '../../data/competitorComparisons';
import styles from './CategoryLandingPage.module.css';

export function CategoryLandingPage({ category }: { category: SEOCategory }) {
  const categorySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `https://uniquebusinessname.com/generator/${category.slug}#app`,
        "name": `${category.name} Business Name Generator`,
        "url": `https://uniquebusinessname.com/generator/${category.slug}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://uniquebusinessname.com/generator/${category.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://uniquebusinessname.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Generators",
            "item": "https://uniquebusinessname.com/generator"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": category.name,
            "item": `https://uniquebusinessname.com/generator/${category.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://uniquebusinessname.com/generator/${category.slug}#faq`,
        "mainEntity": category.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title={category.title}
        description={category.description}
        type="WebApplication"
        schema={categorySchema}
      />
      
      {/* The main interactive AI Naming Engine pre-seeded with this niche */}
      <NameGenerator initialKeywords={category.name} />

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

           <h3 style={{ marginTop: '3rem' }}>Compare Alternatives</h3>
           <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
             Looking for a free alternative to legacy generators with live .com DNS lookups?
           </p>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
             {Object.values(COMPETITOR_COMPARISONS).map(c => (
               <Link
                 key={c.slug}
                 href={`/alternatives/${c.slug}`}
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   padding: '0.45rem 0.85rem',
                   background: 'var(--surface-2)',
                   border: '1px solid var(--border)',
                   borderRadius: 'var(--radius-sm, 6px)',
                   fontSize: '0.85rem',
                   color: 'var(--text)',
                   textDecoration: 'none'
                 }}
               >
                 {c.competitorName} Alternative &rarr;
               </Link>
             ))}
           </div>
           
           <h3>Explore Related Generators</h3>
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
