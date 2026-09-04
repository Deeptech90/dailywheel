import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  /** @deprecated meta-keywords has no ranking value — omit from all pages */
  keywords?: never;
  image?: string;
  url?: string;
  type?: 'WebSite' | 'WebApplication' | 'FAQPage' | 'Article' | 'Organization';
  schema?: Record<string, any>;
}

export function SEOHead({ title, description, image, url, type = 'WebSite', schema }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update standard meta tags
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);

    // 3. Update canonical link (self-referencing per page)
    if (url) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    // 4. Update Open Graph
    const setOg = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:type', type === 'Article' ? 'article' : 'website');
    if (image) setOg('og:image', image);
    if (url) setOg('og:url', url);

    // 5. Update Twitter Card (per-page, not boilerplate)
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    // 6. Inject JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      name: title,
      description,
      ...(url ? { url } : {}),
      ...(image ? { image } : {}),
    };

    script.textContent = JSON.stringify(schema ?? defaultSchema);
  }, [title, description, image, url, type, schema]);

  return null;
}
