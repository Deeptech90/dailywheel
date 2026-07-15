import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'WebSite' | 'WebApplication' | 'FAQPage' | 'Article' | 'Organization';
  schema?: Record<string, any>;
}

export function SEOHead({ title, description, keywords, image, url, type = 'WebSite', schema }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update standard meta
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // 3. Update Open Graph
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
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

    // 4. Inject JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    // Default schema structure
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": type,
      "name": title,
      "description": description,
      ...(url ? { "url": url } : {}),
      ...(image ? { "image": image } : {})
    };

    script.innerText = JSON.stringify(schema || defaultSchema);

    // Clean up
    return () => {
      // In a robust app you might revert to defaults, 
      // but client routing just overwrites it on the next page
    };
  }, [title, description, keywords, image, url, type, schema]);

  return null;
}
