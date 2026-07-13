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
const NotFound = lazy(() => import('./app/not-found'));

import { InstallPrompt } from './components/InstallPrompt/InstallPrompt';
import { UpdatePrompt } from './components/UpdatePrompt/UpdatePrompt';

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
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <AboutUs />;
      case '/contact':
        return <Contact />;
      case '/privacy':
        return <Privacy />;
      case '/terms':
        return <Terms />;
      case '/cookies':
        return <Cookies />;
      case '/offline':
        return <OfflinePage />;
      default:
        return <NotFound />;
    }
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
