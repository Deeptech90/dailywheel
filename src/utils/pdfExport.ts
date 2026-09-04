/* ============================================================
   pdfExport — Client-side 300 DPI Print-Ready PDF Generator
   Zero-dependency PDF 1.4 generator with DCTDecode (JPEG),
   MediaBox, TrimBox, and BleedBox support for professional printing.
   ============================================================ */

export interface PdfExportOptions {
  widthInches: number;
  heightInches: number;
  bleedInches?: number; // e.g. 0.125 in for standard 1/8" print bleed
  title?: string;
  dpi?: number; // target DPI, default 300
}

/**
 * Converts a data URI (image/jpeg base64) into a binary Uint8Array
 */
function dataUriToUint8Array(dataUri: string): Uint8Array {
  const base64Index = dataUri.indexOf(';base64,');
  if (base64Index === -1) {
    throw new Error('Invalid data URI');
  }
  const base64 = dataUri.substring(base64Index + 8);
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Trigger browser file download for a given Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Downloads an HTMLCanvasElement directly as a high-res PNG
 */
export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Encodes an HTMLCanvasElement into a print-ready PDF 1.4 file
 * with standard 72 pt/in geometry, /MediaBox, /TrimBox, /BleedBox, and 300 DPI image stream.
 */
export function generatePdfFromCanvas(
  canvas: HTMLCanvasElement,
  options: PdfExportOptions
): Blob {
  const {
    widthInches,
    heightInches,
    bleedInches = 0,
    title = 'Print Document'
  } = options;

  // 1 inch = 72 PDF points
  const bleedPt = bleedInches * 72;
  const trimWidthPt = widthInches * 72;
  const trimHeightPt = heightInches * 72;
  const mediaWidthPt = trimWidthPt + bleedPt * 2;
  const mediaHeightPt = trimHeightPt + bleedPt * 2;

  // Convert canvas to highest quality JPEG for PDF DCTDecode stream
  const jpegDataUri = canvas.toDataURL('image/jpeg', 0.98);
  const imageBytes = dataUriToUint8Array(jpegDataUri);

  const imgWidthPx = canvas.width;
  const imgHeightPx = canvas.height;

  // PDF stream for painting the image over the full MediaBox
  const contentStream = `q\n${mediaWidthPt.toFixed(2)} 0 0 ${mediaHeightPt.toFixed(2)} 0 0 cm\n/Im1 Do\nQ\n`;
  const contentEncoder = new TextEncoder();
  const contentBytes = contentEncoder.encode(contentStream);

  // PDF Objects construction
  const offsets: number[] = [];
  const parts: Uint8Array[] = [];

  function addPart(text: string) {
    const encoded = contentEncoder.encode(text);
    parts.push(encoded);
    return encoded.length;
  }

  function addBinary(bytes: Uint8Array) {
    parts.push(bytes);
    return bytes.length;
  }

  // Header
  let currentOffset = 0;
  const header = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
  currentOffset += addPart(header);

  // Object 1: Catalog
  offsets[1] = currentOffset;
  currentOffset += addPart(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

  // Object 2: Pages
  offsets[2] = currentOffset;
  currentOffset += addPart(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);

  // Object 3: Page (with MediaBox, BleedBox, TrimBox for commercial print)
  offsets[3] = currentOffset;
  const mediaBox = `[0 0 ${mediaWidthPt.toFixed(2)} ${mediaHeightPt.toFixed(2)}]`;
  const trimBox = `[${bleedPt.toFixed(2)} ${bleedPt.toFixed(2)} ${(mediaWidthPt - bleedPt).toFixed(2)} ${(mediaHeightPt - bleedPt).toFixed(2)}]`;
  const bleedBox = mediaBox;

  currentOffset += addPart(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox ${mediaBox} /BleedBox ${bleedBox} /TrimBox ${trimBox} ` +
    `/Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`
  );

  // Object 4: Image XObject with DCTDecode (JPEG)
  offsets[4] = currentOffset;
  const imageDict =
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidthPx} /Height ${imgHeightPx} ` +
    `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`;
  currentOffset += addPart(imageDict);
  currentOffset += addBinary(imageBytes);
  currentOffset += addPart(`\nendstream\nendobj\n`);

  // Object 5: Content stream
  offsets[5] = currentOffset;
  currentOffset += addPart(`5 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`);
  currentOffset += addBinary(contentBytes);
  currentOffset += addPart(`endstream\nendobj\n`);

  // Object 6: Info
  offsets[6] = currentOffset;
  const now = new Date();
  const dateStr = `D:${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`;
  currentOffset += addPart(
    `6 0 obj\n<< /Title (${title}) /Creator (UniqueBusinessName.com Brand Engine) /CreationDate (${dateStr}) >>\nendobj\n`
  );

  // Xref table
  const startXref = currentOffset;
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 1; i <= 6; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  addPart(xref);

  return new Blob(parts as BlobPart[], { type: 'application/pdf' });
}

/**
 * Export canvas directly as print-ready PDF and initiate download
 */
export function exportCanvasToPdf(
  canvas: HTMLCanvasElement,
  filename: string,
  options: PdfExportOptions
): void {
  const pdfBlob = generatePdfFromCanvas(canvas, options);
  const downloadName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  downloadBlob(pdfBlob, downloadName);
}
