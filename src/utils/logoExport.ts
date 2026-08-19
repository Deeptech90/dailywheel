/* ============================================================
   Logo Export Utilities
   SVG download, PNG via Canvas, filename builder
   ============================================================ */

import { buildExportFilename } from '../engines/logoPromptBuilder';
import { GeneratedLogo } from '../types/logoMaker';

/* ── SVG Download ────────────────────────────────────────────── */
export function downloadSVG(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  URL.revokeObjectURL(url);
}

/* ── PNG Download (SVG → Canvas → PNG) ──────────────────────── */
export function downloadPNG(svgString: string, filename: string, size = 1024): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) { reject(new Error('Canvas not supported')); return; }

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // White background option (for PNG without transparency)
      ctx.clearRect(0, 0, size, size);
      // Draw at full canvas size preserving aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let drawW = size, drawH = size;
      let offsetX = 0, offsetY = 0;
      if (imgAspect > 1) {
        drawH = size / imgAspect;
        offsetY = (size - drawH) / 2;
      } else if (imgAspect < 1) {
        drawW = size * imgAspect;
        offsetX = (size - drawW) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('PNG export failed')); return; }
        const pngUrl = URL.createObjectURL(blob);
        triggerDownload(pngUrl, filename);
        URL.revokeObjectURL(pngUrl);
        resolve();
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG render failed'));
    };

    img.src = url;
  });
}

/* ── PNG Download with transparent background ────────────────── */
export function downloadPNGTransparent(svgString: string, filename: string, size = 1024): Promise<void> {
  return downloadPNG(svgString, filename, size);
}

/* ── Trigger browser download ────────────────────────────────── */
function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ── High-level export from GeneratedLogo ─────────────────────── */
export function exportLogoSVG(logo: GeneratedLogo, businessName: string): void {
  const filename = buildExportFilename(
    businessName, logo.layout, 'RGB', 'svg',
  );
  downloadSVG(logo.svgString, filename);
}

export async function exportLogoPNG(
  logo: GeneratedLogo,
  businessName: string,
  size: 512 | 1024 | 2048 = 1024,
): Promise<void> {
  const filename = buildExportFilename(
    businessName, logo.layout, 'RGB', 'png',
    `${size}px`,
  );
  await downloadPNG(logo.svgString, filename, size);
}

/* ── SVG to data URL (for img src preview) ───────────────────── */
export function svgToDataUrl(svgString: string): string {
  const encoded = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${encoded}`;
}

/* ── Copy SVG to clipboard ───────────────────────────────────── */
export async function copySVGToClipboard(svgString: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(svgString);
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = svgString;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}
