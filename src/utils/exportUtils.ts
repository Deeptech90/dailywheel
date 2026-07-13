import { BrandKit } from '../types';

export function exportJSON(brand: BrandKit) {
  const data = JSON.stringify(brand, null, 2);
  downloadBlob(data, 'application/json', `${brand.name.toLowerCase()}-brand-kit.json`);
}

export function exportCSV(brand: BrandKit) {
  // Convert brand kit to a flat CSV structure
  const rows = [
    ['Field', 'Value'],
    ['Brand Name', brand.name],
    ['Category', brand.category],
    ['Meaning', brand.intelligence.meaning],
    ['Why It Works', brand.intelligence.whyItWorks],
    ['Personality', brand.intelligence.personality],
    ['Brand Voice', brand.intelligence.brandVoice],
    ['Target Audience', brand.intelligence.targetAudience],
    ['Memorability Score', String(brand.intelligence.memorabilityScore)],
    ['Pronunciation Score', String(brand.intelligence.pronunciationScore)],
    ['Uniqueness Score', String(brand.intelligence.uniquenessScore)],
    ['Mission', brand.story.mission],
    ['Vision', brand.story.vision],
    ['Core Values', brand.story.coreValues.join(', ')],
    ['Elevator Pitch', brand.story.elevatorPitch],
    ['Primary Color', brand.identity.primaryColor],
    ['Secondary Color', brand.identity.secondaryColor],
    ['Heading Font', brand.typography.headingFont],
    ['Body Font', brand.typography.bodyFont]
  ];

  brand.taglines.forEach((t, i) => rows.push([`Tagline ${i + 1}`, t]));
  brand.domains.forEach(d => rows.push([`Domain ${d.tld}`, `${d.domain} (${d.available ? 'Available' : 'Taken'})`]));
  brand.socials.forEach(s => rows.push([`Social ${s.platform}`, `${s.handle} (${s.available ? 'Available' : 'Taken'})`]));

  // Escape CSV values
  const csvContent = rows.map(row => 
    row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  downloadBlob(csvContent, 'text/csv', `${brand.name.toLowerCase()}-brand-kit.csv`);
}

export function exportPDF(brand: BrandKit) {
  // For maximum performance and PWA offline capability, we use the browser's native print API
  // by creating a temporary printable iframe or just calling window.print().
  // We'll dispatch an event that the UI can listen to, which applies a @media print class,
  // or we just call window.print() because the CSS in ResultModal should handle @media print.
  // Actually, let's just trigger print. The CSS in ResultModal will be updated to format it nicely.
  
  // Note: To make window.print() work properly for a single component, 
  // we could generate a new window and write HTML to it, then print that.
  
  const printWindow = window.open('', '', 'width=800,height=900');
  if (!printWindow) {
    alert("Please allow popups to generate PDF.");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${brand.name} - Brand Kit</title>
      <style>
        body { font-family: "${brand.typography.bodyFont}", sans-serif; color: #333; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; }
        h1, h2, h3 { font-family: "${brand.typography.headingFont}", sans-serif; color: #111; }
        h1 { font-size: 3rem; margin-bottom: 0; color: ${brand.identity.primaryColor}; }
        .subtitle { font-size: 1.2rem; color: #666; text-transform: uppercase; letter-spacing: 2px; }
        .section { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee; }
        .row { display: flex; gap: 2rem; }
        .col { flex: 1; }
        .box { background: #f9f9f9; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid ${brand.identity.primaryColor}; }
        .colors { display: flex; gap: 1rem; margin-top: 1rem; }
        .color { width: 100px; height: 100px; border-radius: 8px; display: flex; align-items: flex-end; padding: 0.5rem; color: #fff; font-size: 0.8rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
        .taglines { list-style: none; padding: 0; }
        .taglines li { font-size: 1.2rem; font-style: italic; margin-bottom: 0.5rem; }
        .scores { display: flex; gap: 1rem; }
        .score { text-align: center; background: #f0f0f0; padding: 1rem; border-radius: 8px; flex: 1; }
        .score span { display: block; font-size: 2rem; font-weight: bold; color: ${brand.identity.primaryColor}; }
        @media print {
          body { padding: 0; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <h1>${brand.name}</h1>
      <div class="subtitle">${brand.category} Brand Kit</div>

      <div class="section">
        <h2>Brand Intelligence</h2>
        <p><strong>Meaning:</strong> ${brand.intelligence.meaning}</p>
        <p><strong>Why it Works:</strong> ${brand.intelligence.whyItWorks}</p>
        <div class="row">
          <div class="col"><p><strong>Personality:</strong> ${brand.intelligence.personality}</p></div>
          <div class="col"><p><strong>Voice:</strong> ${brand.intelligence.brandVoice}</p></div>
          <div class="col"><p><strong>Audience:</strong> ${brand.intelligence.targetAudience}</p></div>
        </div>
        <div class="scores">
          <div class="score"><span>${brand.intelligence.memorabilityScore}%</span>Memorability</div>
          <div class="score"><span>${brand.intelligence.pronunciationScore}%</span>Pronunciation</div>
          <div class="score"><span>${brand.intelligence.uniquenessScore}%</span>Uniqueness</div>
        </div>
      </div>

      <div class="section">
        <h2>Brand Story</h2>
        <div class="box">
          <strong>Elevator Pitch</strong>
          <p>${brand.story.elevatorPitch}</p>
        </div>
        <div class="row">
          <div class="col">
            <strong>Mission</strong>
            <p>${brand.story.mission}</p>
          </div>
          <div class="col">
            <strong>Vision</strong>
            <p>${brand.story.vision}</p>
          </div>
        </div>
        <p><strong>Core Values:</strong> ${brand.story.coreValues.join(', ')}</p>
      </div>

      <div class="section">
        <h2>Visual Identity</h2>
        <div class="row">
          <div class="col">
            <strong>Colors</strong>
            <div class="colors">
              <div class="color" style="background: ${brand.identity.primaryColor}">Primary</div>
              <div class="color" style="background: ${brand.identity.secondaryColor}">Secondary</div>
              <div class="color" style="background: ${brand.identity.accentColor}">Accent</div>
            </div>
          </div>
          <div class="col">
            <strong>Typography</strong>
            <p style="font-family: '${brand.typography.headingFont}', sans-serif; font-size: 1.5rem;">${brand.typography.headingFont}</p>
            <p style="font-family: '${brand.typography.bodyFont}', sans-serif;">${brand.typography.bodyFont}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Taglines</h2>
        <ul class="taglines">
          ${brand.taglines.map(t => `<li>"${t}"</li>`).join('')}
        </ul>
      </div>

    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  
  // Wait for fonts to load then print
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 250);
}

function downloadBlob(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
