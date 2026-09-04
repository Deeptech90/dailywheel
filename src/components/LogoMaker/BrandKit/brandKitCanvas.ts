/* ============================================================
   brandKitCanvas — Canvas Rendering Engine for Brand Kit Exports
   Renders 300 DPI print assets and high-res social media graphics
   directly onto HTMLCanvasElement for PNG and PDF export.
   ============================================================ */

import { GeneratedLogo } from '../../../types/logoMaker';

export interface BusinessCardData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface LetterheadData {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  date: string;
  recipient: string;
  subject: string;
  body: string;
  signerName: string;
  signerTitle: string;
}

export interface SocialMediaData {
  headline: string;
  subtitle: string;
  ctaText: string;
}

/**
 * Loads an SVG string into an HTMLImageElement
 */
export function loadSvgToImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Ensure XML namespace is present
    let cleanSvg = svgString;
    if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
      cleanSvg = cleanSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/**
 * Creates an inverted (white) version of an image
 */
function createInvertedImage(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = img.width || 400;
  c.height = img.height || 200;
  const ctx = c.getContext('2d');
  if (ctx) {
    ctx.filter = 'brightness(0) invert(1)';
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }
  return c;
}

/* ────────────────────────────────────────────────────────────
   1. BUSINESS CARD — FRONT (1125 x 675 px = 3.75" x 2.25" @ 300 DPI)
   ──────────────────────────────────────────────────────────── */
export async function renderBusinessCardFront(
  canvas: HTMLCanvasElement,
  data: BusinessCardData,
  logo: GeneratedLogo,
  businessName: string
): Promise<void> {
  const W = 1125;
  const H = 675;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Left accent strip (using primary and secondary brand colors)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, logo.primaryColor);
  grad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 36, H);

  // Subtle bottom border accent
  ctx.fillStyle = logo.secondaryColor;
  ctx.fillRect(36, H - 12, W - 36, 12);

  // Draw Logo on left-center
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const aspect = (logoImg.width || 360) / (logoImg.height || 200);
    const targetW = 380;
    const targetH = targetW / aspect;
    ctx.drawImage(logoImg, 100, (H - targetH) / 2 - 20, targetW, targetH);
  } catch (err) {
    // Fallback text if SVG fails to rasterize
    ctx.fillStyle = logo.primaryColor;
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(businessName, 100, H / 2 - 10);
  }

  // Vertical subtle divider line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(540, 100);
  ctx.lineTo(540, H - 100);
  ctx.stroke();

  // Contact details on the right side
  const startX = 600;
  let currentY = 160;

  // Full Name
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.fullName || 'Alex Morgan', startX, currentY);

  // Job Title
  currentY += 45;
  ctx.fillStyle = logo.primaryColor;
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText((data.jobTitle || 'Founder & CEO').toUpperCase(), startX, currentY);

  // Divider under title
  currentY += 35;
  ctx.fillStyle = logo.primaryColor;
  ctx.fillRect(startX, currentY, 60, 4);

  // Details
  currentY += 55;
  ctx.fillStyle = '#475569';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const details = [
    `✉  ${data.email || 'alex@' + businessName.toLowerCase().replace(/\s+/g, '') + '.com'}`,
    `☎  ${data.phone || '+1 (555) 234-5678'}`,
    `🌐  ${data.website || 'www.' + businessName.toLowerCase().replace(/\s+/g, '') + '.com'}`,
    `📍  ${data.address || '100 Innovation Blvd, Suite 400'}`,
  ];

  for (const line of details) {
    ctx.fillText(line, startX, currentY);
    currentY += 40;
  }
}

/* ────────────────────────────────────────────────────────────
   2. BUSINESS CARD — BACK (1125 x 675 px = 3.75" x 2.25" @ 300 DPI)
   ──────────────────────────────────────────────────────────── */
export async function renderBusinessCardBack(
  canvas: HTMLCanvasElement,
  logo: GeneratedLogo,
  businessName: string,
  tagline?: string
): Promise<void> {
  const W = 1125;
  const H = 675;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Premium diagonal gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, logo.primaryColor);
  grad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle decorative geometric watermarks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.arc(W - 100, 100, 320, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, H - 50, 240, 0, Math.PI * 2);
  ctx.fill();

  // White inverted logo in center
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const inverted = createInvertedImage(logoImg);
    const aspect = (logoImg.width || 360) / (logoImg.height || 200);
    const targetW = 460;
    const targetH = targetW / aspect;
    ctx.drawImage(inverted, (W - targetW) / 2, (H - targetH) / 2 - (tagline ? 25 : 0), targetW, targetH);
  } catch (err) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(businessName, W / 2, H / 2 - 10);
  }

  // Tagline below logo
  if (tagline) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText(tagline.toUpperCase(), W / 2, H / 2 + 130);
    ctx.textAlign = 'left';
  }
}

/* ────────────────────────────────────────────────────────────
   3. LETTERHEAD (2550 x 3300 px = 8.5" x 11" @ 300 DPI)
   ──────────────────────────────────────────────────────────── */
export async function renderLetterhead(
  canvas: HTMLCanvasElement,
  data: LetterheadData,
  logo: GeneratedLogo
): Promise<void> {
  const W = 2550;
  const H = 3300;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // White sheet
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Top header gradient band
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, logo.primaryColor);
  topGrad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 40);

  // Thin secondary sub-bar
  ctx.fillStyle = logo.secondaryColor;
  ctx.fillRect(0, 40, W, 8);

  // Draw Logo in top-left
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const aspect = (logoImg.width || 360) / (logoImg.height || 200);
    const targetW = 600;
    const targetH = targetW / aspect;
    ctx.drawImage(logoImg, 180, 140, targetW, targetH);
  } catch (err) {
    ctx.fillStyle = logo.primaryColor;
    ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(data.businessName, 180, 220);
  }

  // Company Contact Details in top-right
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.businessName, W - 180, 160);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.address || '100 Innovation Blvd, Suite 400', W - 180, 205);
  ctx.fillText(`${data.phone || '+1 (555) 234-5678'}  •  ${data.email || 'contact@brand.com'}`, W - 180, 245);
  ctx.fillText(data.website || 'www.brand.com', W - 180, 285);

  // Top dividing rule
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(180, 360);
  ctx.lineTo(W - 180, 360);
  ctx.stroke();

  // Date & Recipient
  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.date || 'September 4, 2026', 180, 480);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.recipient || 'Dear Valued Partner,', 180, 560);

  // Subject line
  if (data.subject) {
    ctx.fillStyle = logo.primaryColor;
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`RE: ${data.subject.toUpperCase()}`, 180, 640);
  }

  // Letter Body (Word wrapped)
  const bodyText = data.body ||
    `We are delighted to share our updated corporate identity and strategic roadmap for the upcoming quarter.\n\n` +
    `Our brand represents a relentless commitment to exceptional quality, innovation, and client success. ` +
    `Every element of our visual identity—from the curated color palette to our typographic precision—reflects ` +
    `our dedication to industry leadership and seamless digital execution.\n\n` +
    `We look forward to continuing our collaboration and delivering high-impact solutions for your organization. ` +
    `Should you require any additional brand assets, guidelines, or technical documentation, please contact our office.`;

  ctx.fillStyle = '#1E293B';
  ctx.font = '400 28px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const maxWidth = W - 360;
  const lineHeight = 48;
  let cursorY = data.subject ? 730 : 640;

  const paragraphs = bodyText.split('\n');
  for (const para of paragraphs) {
    if (!para.trim()) {
      cursorY += 28;
      continue;
    }
    const words = para.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 180, cursorY);
        line = words[n] + ' ';
        cursorY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 180, cursorY);
    cursorY += lineHeight + 18;
  }

  // Sign-off
  cursorY += 40;
  ctx.fillStyle = '#334155';
  ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Sincerely,', 180, cursorY);

  cursorY += 80;
  // Signature line
  ctx.strokeStyle = logo.primaryColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(180, cursorY);
  ctx.lineTo(480, cursorY);
  ctx.stroke();

  cursorY += 45;
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.signerName || 'Alex Morgan', 180, cursorY);

  cursorY += 35;
  ctx.fillStyle = '#64748B';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.signerTitle || 'Executive Director', 180, cursorY);

  // Footer Accent & Metadata
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(180, H - 180);
  ctx.lineTo(W - 180, H - 180);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CONFIDENTIAL & PROPRIETARY • FOR AUTHORIZED USE ONLY', 180, H - 130);

  ctx.textAlign = 'right';
  ctx.fillText('Page 1 of 1', W - 180, H - 130);

  // Bottom color bar
  const botGrad = ctx.createLinearGradient(0, 0, W, 0);
  botGrad.addColorStop(0, logo.primaryColor);
  botGrad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, H - 24, W, 24);
}

/* ────────────────────────────────────────────────────────────
   4. INSTAGRAM POST (1080 x 1080 px Square)
   ──────────────────────────────────────────────────────────── */
export async function renderInstagramPost(
  canvas: HTMLCanvasElement,
  data: SocialMediaData,
  logo: GeneratedLogo,
  businessName: string
): Promise<void> {
  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  const grad = ctx.createRadialGradient(S / 2, S * 0.35, 100, S / 2, S / 2, S * 0.75);
  grad.addColorStop(0, '#1E293B');
  grad.addColorStop(1, '#0F172A');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Subtle ambient color glow behind logo
  const glow = ctx.createRadialGradient(S / 2, 280, 20, S / 2, 280, 280);
  glow.addColorStop(0, `${logo.primaryColor}55`);
  glow.addColorStop(0.6, `${logo.secondaryColor}22`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, S, S);

  // Corner decorative badge
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(S - 240, 60, 180, 44, 22);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ OFFICIAL', S - 150, 88);

  // Centered Inverted Logo
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const inverted = createInvertedImage(logoImg);
    const aspect = (logoImg.width || 360) / (logoImg.height || 200);
    const targetW = 380;
    const targetH = targetW / aspect;
    ctx.drawImage(inverted, (S - targetW) / 2, 220 - targetH / 2, targetW, targetH);
  } catch (err) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(businessName, S / 2, 240);
  }

  // Inner framed content card
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(100, 380, S - 200, 520, 24);
  ctx.fill();
  ctx.stroke();

  // Headline
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const headline = data.headline || 'Redefining the Brand Experience';
  // Wrap headline in card
  const words = headline.split(' ');
  let line = '';
  let curY = 500;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > S - 300 && n > 0) {
      ctx.fillText(line, S / 2, curY);
      line = words[n] + ' ';
      curY += 56;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, S / 2, curY);

  // Subtitle
  curY += 50;
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const subtitle = data.subtitle || 'Crafted with precision, innovation, and modern aesthetics.';
  ctx.fillText(subtitle, S / 2, curY);

  // CTA Pill Button
  curY += 75;
  const btnW = 320;
  const btnH = 64;
  const btnX = (S - btnW) / 2;
  const btnY = curY;

  const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY);
  btnGrad.addColorStop(0, logo.primaryColor);
  btnGrad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = btnGrad;
  ctx.beginPath();
  ctx.roundRect(btnX, btnY, btnW, btnH, 32);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.ctaText || 'Learn More →', S / 2, btnY + 40);

  // Bottom handle / website
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`@${businessName.toLowerCase().replace(/\s+/g, '')}  •  uniquebusinessname.com`, S / 2, S - 80);
}

/* ────────────────────────────────────────────────────────────
   5. SOCIAL BANNER / OG IMAGE (1200 x 630 px)
   ──────────────────────────────────────────────────────────── */
export async function renderSocialBanner(
  canvas: HTMLCanvasElement,
  data: SocialMediaData,
  logo: GeneratedLogo,
  businessName: string
): Promise<void> {
  const W = 1200;
  const H = 630;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0F172A');
  grad.addColorStop(1, '#1E293B');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Right ambient brand glow
  const glow = ctx.createRadialGradient(W - 200, H / 2, 50, W - 200, H / 2, 450);
  glow.addColorStop(0, `${logo.primaryColor}44`);
  glow.addColorStop(0.7, `${logo.secondaryColor}15`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Accent border lines
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, logo.primaryColor);
  topGrad.addColorStop(1, logo.secondaryColor);
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 8);

  // Left Content: Logo + Headline + Subtitle
  const startX = 100;
  let curY = 160;

  // Draw white logo
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const inverted = createInvertedImage(logoImg);
    const aspect = (logoImg.width || 360) / (logoImg.height || 200);
    const targetW = 280;
    const targetH = targetW / aspect;
    ctx.drawImage(inverted, startX, curY, targetW, targetH);
    curY += targetH + 50;
  } catch (err) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(businessName, startX, curY + 40);
    curY += 90;
  }

  // Headline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const headline = data.headline || 'Building Next-Generation Brand Solutions';
  const words = headline.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 680 && n > 0) {
      ctx.fillText(line, startX, curY);
      line = words[n] + ' ';
      curY += 52;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, startX, curY);

  // Subtitle
  curY += 40;
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.subtitle || `Official website and channels for ${businessName}.`, startX, curY);

  // Right Side Decorative Badge / Watermark
  try {
    const logoImg = await loadSvgToImage(logo.svgString);
    const inverted = createInvertedImage(logoImg);
    ctx.globalAlpha = 0.08;
    const wmSize = 520;
    ctx.drawImage(inverted, W - 450, (H - wmSize) / 2, wmSize, wmSize);
    ctx.globalAlpha = 1.0;
  } catch {}

  // Footer Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`www.${businessName.toLowerCase().replace(/\s+/g, '')}.com`, startX, H - 50);
}
