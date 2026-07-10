export function logEvent(event: string, payload?: Record<string, unknown>) {
  try {
    const body = JSON.stringify({ event, payload, timestamp: Date.now() });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/log-event', body);
    } else {
      fetch('/api/log-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics should never block UX
  }
}
