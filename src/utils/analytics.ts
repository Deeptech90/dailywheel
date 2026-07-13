declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

export function logEvent(event: string, payload?: Record<string, unknown>) {
  try {
    console.log(`[Analytics] ${event}`, payload);
    
    // GA4 Integration
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, payload);
    }

    // Clarity Integration (if needed for custom events)
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', event, JSON.stringify(payload || {}));
    }
  } catch {
    // Analytics should never block UX
  }
}
