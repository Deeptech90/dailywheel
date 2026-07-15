import { useState, useEffect, Suspense, lazy } from 'react';
import Home from './app/page';
import { CookieConsent } from './components/CookieConsent/CookieConsent';
import { TrackingScripts } from './components/TrackingScripts/TrackingScripts';

const AboutUs = lazy(() => import('./app/about/page'));
const Contact = lazy(() => import('./app/contact/page'));
const Privacy = lazy(() => import('./app/privacy/page'));
const Terms = lazy(() => import('./app/terms/page'));
const Cookies = lazy(() => import('./app/cookies/page'));
const OfflinePage = lazy(() => import('./app/offline/page'));
const DashboardPage = lazy(() => import('./app/dashboard/page'));
const PricingPage = lazy(() => import('./app/pricing/page'));
const AdminPage = lazy(() => import('./app/admin/page'));
const NotFound = lazy(() => import('./app/not-found'));

const BlogIndexPage = lazy(() => import('./components/Blog/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('./components/Blog/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const CategoryLandingPage = lazy(() => import('./components/CategoryLandingPage/CategoryLandingPage').then(m => ({ default: m.CategoryLandingPage })));

import { InstallPrompt } from './components/InstallPrompt/InstallPrompt';
import { UpdatePrompt } from './components/UpdatePrompt/UpdatePrompt';
import { getBlogPostBySlug } from './data/blogPosts';
import { getCategoryBySlug } from './data/seoCategories';

export function App() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const renderContent = () => {
    if (currentPath === '/') return <Home />;
    if (currentPath === '/about') return <AboutUs />;
    if (currentPath === '/contact') return <Contact />;
    if (currentPath === '/privacy') return <Privacy />;
    if (currentPath === '/terms') return <Terms />;
    if (currentPath === '/cookies') return <Cookies />;
    if (currentPath === '/offline') return <OfflinePage />;
    if (currentPath === '/dashboard') return <DashboardPage />;
    if (currentPath === '/pricing') return <PricingPage />;
    if (currentPath === '/admin') return <AdminPage />;
    if (currentPath === '/blog') return <BlogIndexPage />;
    
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.split('/blog/')[1]?.replace(/\/$/, ''); // handle trailing slash
      const post = getBlogPostBySlug(slug);
      return post ? <BlogPostPage post={post} /> : <NotFound />;
    }

    if (currentPath.startsWith('/generator/')) {
      const slug = currentPath.split('/generator/')[1]?.replace(/\/$/, '');
      const category = getCategoryBySlug(slug);
      return category ? <CategoryLandingPage category={category} /> : <NotFound />;
    }

    return <NotFound />;
  };

  return (
    <>
      <div id="app-root-container">
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh', color: 'var(--text-muted)' }}>Loading...</div>}>
          {renderContent()}
        </Suspense>
      </div>
      <InstallPrompt />
      <UpdatePrompt />
      <CookieConsent />
      <TrackingScripts />
    </>
  );
}
