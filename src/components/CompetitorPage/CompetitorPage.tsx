import React from 'react';
import { CompetitorComparison, COMPETITOR_COMPARISONS } from '../../data/competitorComparisons';
import { BUSINESS_CATEGORIES } from '../../data/businessNames';
import { SEOHead } from '../SEOHead/SEOHead';
import { NameGenerator } from '../NameGenerator/NameGenerator';
import { Link } from '../Link/Link';
import { Check, X, Sparkles, ShieldCheck, Globe, Zap, ArrowRight } from 'lucide-react';
import styles from './CompetitorPage.module.css';

export function CompetitorPage({ comparison }: { comparison: CompetitorComparison }) {
  const otherCompetitors = Object.values(COMPETITOR_COMPARISONS).filter(
    c => c.slug !== comparison.slug
  );

  // High-Grade Multi-Graph JSON-LD Schema for GEO and Google Search
  const richSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `https://uniquebusinessname.com/alternatives/${comparison.slug}#app`,
        "name": "Unique Business Name Generator",
        "url": `https://uniquebusinessname.com/alternatives/${comparison.slug}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Multi-Style AI Brand Naming (8 Styles)",
          "Real-time .com DNS Domain Verification",
          "1-Click Vector Logo Creator (SVG, PNG, PDF)",
          "100% Free Commercial Licensing"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://uniquebusinessname.com/alternatives/${comparison.slug}#breadcrumb`,
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
            "name": "Alternatives",
            "item": "https://uniquebusinessname.com/alternatives"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${comparison.competitorName} Alternative`,
            "item": `https://uniquebusinessname.com/alternatives/${comparison.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://uniquebusinessname.com/alternatives/${comparison.slug}#faq`,
        "mainEntity": comparison.faqs.map(faq => ({
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
        title={comparison.title}
        description={comparison.metaDescription}
        keywords={`${comparison.primaryKeyword}, ${comparison.competitorName.toLowerCase()} alternative, business name generator, free logo maker`}
        url={`https://uniquebusinessname.com/alternatives/${comparison.slug}`}
        type="WebApplication"
        schema={richSchema}
      />

      <div className={styles.container}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={15} />
            {comparison.badge}
          </div>
          <h1 className={styles.title}>{comparison.h1}</h1>
          <p className={styles.subtitle}>{comparison.tagline}</p>

          <div className={styles.keyPillars}>
            <span className={styles.pillarTag}>
              <Zap size={16} color="var(--primary)" /> 100% Free Forever
            </span>
            <span className={styles.pillarTag}>
              <Globe size={16} color="#10b981" /> Live .COM DNS Lookups
            </span>
            <span className={styles.pillarTag}>
              <ShieldCheck size={16} color="#3b82f6" /> Full Commercial Rights
            </span>
          </div>
        </header>

        {/* Live Interactive Engine */}
        <section className={styles.generatorWrapper}>
          <NameGenerator initialKeywords={comparison.sampleKeywords[0]} />
        </section>

        {/* Comparison Matrix Table */}
        <h2 className={styles.sectionHeading}>
          Side-by-Side Comparison: UniqueBusinessName vs {comparison.competitorName}
        </h2>
        <p className={styles.sectionSub}>
          See how our AI brand discovery engine compares in speed, features, domain checking, and export freedom.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th style={{ width: '36%' }}>Feature</th>
                <th className={styles.highlightHeader} style={{ width: '32%' }}>
                  UniqueBusinessName (Recommended)
                </th>
                <th style={{ width: '32%' }}>{comparison.competitorName}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.comparisonMatrix.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{row.feature}</strong>
                  </td>
                  <td className={styles.highlightCell}>
                    <Check size={16} className={styles.checkIcon} />
                    {row.us}
                  </td>
                  <td>
                    {row.usAdvantage ? (
                      <X size={16} className={styles.crossIcon} />
                    ) : (
                      <Check size={16} className={styles.checkIcon} />
                    )}
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pros & Cons Cards */}
        <div className={styles.cardsGrid}>
          {/* UniqueBusinessName Card */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.cardTitle}>
              <span>UniqueBusinessName</span>
              <span className={styles.badge} style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                Winner
              </span>
            </div>
            <p className={styles.cardDesc}>{comparison.ourAdvantage}</p>

            <div className={styles.listTitle}>Advantages</div>
            <ul className={styles.featureList}>
              {comparison.prosUs.map((pro, i) => (
                <li key={i}>
                  <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitor Card */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <span>{comparison.competitorName}</span>
            </div>
            <p className={styles.cardDesc}>{comparison.competitorOverview}</p>

            <div className={styles.listTitle}>Pros</div>
            <ul className={styles.featureList}>
              {comparison.prosCompetitor.map((pro, i) => (
                <li key={i}>
                  <Check size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>

            <div className={styles.listTitle} style={{ color: '#ef4444' }}>
              Cons &amp; Limitations
            </div>
            <ul className={styles.featureList}>
              {comparison.consCompetitor.map((con, i) => (
                <li key={i}>
                  <X size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* In-depth Editorial Analysis (GEO & Crawler signals) */}
        <article className={styles.editorialSection}>
          <h3>Why Founders are Switching from {comparison.competitorName}</h3>
          <p>
            When naming a new venture, speed and domain availability make all the difference. While {comparison.competitorName} has been a popular tool in the ecosystem, founders frequently encounter limitations such as expensive domain broker markups, paywalled logo vector downloads, or generic prefix/suffix algorithms.
          </p>

          <h3>Linguistic AI vs Legacy Keyword Matching</h3>
          <p>
            UniqueBusinessName utilizes multi-style phonosemantic AI modeling. Instead of simply attaching words like "Corp" or "Global", our engine invents harmonious coinages, rhyming cadences, compound blends, and classical root words that feel authentic and modern.
          </p>

          <h3>Instant Brand Assets without Paywalls</h3>
          <p>
            Once you discover your ideal business name, you can immediately transition into our integrated Vector Logo Creator Suite to customize typography, iconography, and color schemes, exporting crisp SVGs and high-resolution PNGs at zero cost.
          </p>

          <div className={styles.verdictBox}>
            <div className={styles.verdictTitle}>The Verdict</div>
            <p style={{ margin: 0, color: 'var(--text)' }}>{comparison.verdict}</p>
          </div>
        </article>

        {/* FAQs */}
        <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {comparison.faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem} open={i === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* Explore other alternatives */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '3rem', marginBottom: '0.5rem' }}>
          Compare More Naming Tool Alternatives
        </h3>
        <div className={styles.alternativesGrid}>
          {otherCompetitors.map(c => (
            <Link key={c.slug} href={`/alternatives/${c.slug}`} className={styles.altLinkCard}>
              <span className={styles.altLinkTitle}>{c.competitorName} Alternative</span>
              <span className={styles.altLinkSub}>{c.badge} &rarr;</span>
            </Link>
          ))}
        </div>

        {/* Popular Niche Categories */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '3rem', marginBottom: '0.5rem' }}>
          Explore Industry-Specific Name Generators
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
          {BUSINESS_CATEGORIES.slice(0, 16).map(cat => (
            <Link
              key={cat.id}
              href={`/generator/${cat.id}-name-generator`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: 'none'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label} Name Generator</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
