import { useState, useEffect } from 'react';
import Home from './app/page';
import AboutUs from './app/about/page';
import Contact from './app/contact/page';
import Privacy from './app/privacy/page';
import Terms from './app/terms/page';
import Cookies from './app/cookies/page';
import OfflinePage from './app/offline/page';
import NotFound from './app/not-found';
import { CookieConsent } from './components/CookieConsent/CookieConsent';
import { TrackingScripts } from './components/TrackingScripts/TrackingScripts';

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
        {renderContent()}
      </div>
      <CookieConsent />
      <TrackingScripts />
    </>
  );
}
