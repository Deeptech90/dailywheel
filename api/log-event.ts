import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 30;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_REQUESTS;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (request.headers['x-forwarded-for'] as string) || 'unknown';
  
  if (isRateLimited(ip)) {
    return response.status(429).json({ error: 'Rate limited' });
  }

  try {
    const { event, payload, timestamp } = request.body;
    
    console.log(`[Analytics] ${event}`, { payload, timestamp, ip });
    
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(400).json({ error: 'Invalid request' });
  }
}
