'use client';

import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV || '6';

export function TrackingScripts() {
  useEffect(() => {
    // Helper to dynamically load external scripts
    const loadScript = (src: string, id: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    };

    // Helper to dynamically execute inline scripts
    const runInlineScript = (code: string, id: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.text = code;
      script.id = id;
      script.async = true;
      document.head.appendChild(script);
    };

    const initializeTracking = () => {
      const stored = localStorage.getItem('cookie_consent');
      if (!stored) return;

      try {
        const consent = JSON.parse(stored);
        if (consent.performance) {
          // 1. Google Analytics
          if (GA_ID) {
            loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, 'ga-script').then(() => {
              const code = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `;
              runInlineScript(code, 'ga-inline');
            });
          }

          // 2. Microsoft Clarity
          if (CLARITY_ID) {
            const clarityCode = `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");
            `;
            runInlineScript(clarityCode, 'clarity-script');
          }

          // 3. Hotjar
          if (HOTJAR_ID) {
            const hotjarCode = `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `;
            runInlineScript(hotjarCode, 'hotjar-script');
          }
        }
      } catch (e) {
        console.error('Failed to parse cookie consent for tracking scripts:', e);
      }
    };

    // Initialize on load if consent already exists
    initializeTracking();

    // Listen for updates
    window.addEventListener('cookie_consent_updated', initializeTracking);
    return () => window.removeEventListener('cookie_consent_updated', initializeTracking);
  }, []);

  return null;
}
