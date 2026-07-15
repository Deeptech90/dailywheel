import { Link } from '../Link/Link';
import { SEOHead } from '../SEOHead/SEOHead';
import { BLOG_POSTS } from '../../data/blogPosts';
import styles from './Blog.module.css';

export function BlogIndexPage() {
  return (
    <div className={styles.container}>
      <SEOHead 
        title="Branding & Naming Blog | UniqueBusinessName"
        description="Learn the best tips and tricks for naming your startup, building a brand identity, and standing out in 2026."
        type="WebSite"
      />
      <main className={styles.main}>
        <div className={styles.hero}>
          <Link href="/" className={styles.backBtn}>← Back to Generator</Link>
          <h1 className={styles.title}>The Branding Hub</h1>
          <p className={styles.desc}>Insights, guides, and inspiration for founders and creators.</p>
        </div>

        <div className={styles.grid}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardMeta}>
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className={styles.readMore}>Read article →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
