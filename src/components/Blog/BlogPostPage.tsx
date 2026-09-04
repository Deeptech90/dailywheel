import { Link } from '../Link/Link';
import { SEOHead } from '../SEOHead/SEOHead';
import { BlogPost } from '../../data/blogPosts';
import styles from './Blog.module.css';

export function BlogPostPage({ post }: { post: BlogPost }) {
  const postUrl = `https://www.uniquebusinessname.com/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    url: postUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'UniqueBusinessName.com',
      url: 'https://www.uniquebusinessname.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UniqueBusinessName.com',
      url: 'https://www.uniquebusinessname.com',
    },
    description: post.excerpt,
  };

  return (
    <div className={styles.container}>
      <SEOHead
        title={`${post.title} | UniqueBusinessName Blog`}
        description={post.excerpt}
        url={postUrl}
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
