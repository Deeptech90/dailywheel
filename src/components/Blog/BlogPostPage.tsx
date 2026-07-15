import { Link } from '../Link/Link';
import { SEOHead } from '../SEOHead/SEOHead';
import { BlogPost } from '../../data/blogPosts';
import styles from './Blog.module.css';

export function BlogPostPage({ post }: { post: BlogPost }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "description": post.excerpt
  };

  return (
    <div className={styles.container}>
      <SEOHead 
        title={`${post.title} | UBN Blog`}
        description={post.excerpt}
        keywords={post.keywords}
        type="Article"
        schema={articleSchema}
      />
      
      <main className={styles.main}>
        <Link href="/blog" className={styles.backBtn}>← Back to Blog</Link>
        
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <div className={styles.articleMeta}>
              <span>By {post.author}</span>
              <span>•</span>
              <time>{post.date}</time>
            </div>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p className={styles.articleExcerpt}>{post.excerpt}</p>
          </header>

          <div 
            className={styles.articleBody} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </div>
  );
}
