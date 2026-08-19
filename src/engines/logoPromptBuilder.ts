/* ============================================================
   Logo Prompt Builder
   Constructs structured AI prompts from user inputs
   ============================================================ */

import {
  LogoInputs,
  DesignPrefs,
  PromptSet,
  PromptVariant,
  INDUSTRIES,
} from '../types/logoMaker';

function getIndustryLabel(id: string): string {
  return INDUSTRIES.find(i => i.id === id)?.label ?? id;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Individual prompt builders ──────────────────────────────── */

export function buildConcisePrompt(inputs: LogoInputs, prefs: DesignPrefs): string {
  const industry = getIndustryLabel(inputs.industry);
  const style = inputs.styleKeywords.join(', ') || 'modern';
  const icon = prefs.iconKeyword || 'abstract geometric shape';
  return `Create a minimalist vector logo for a ${style} ${industry} company named "${inputs.businessName}". ` +
    `Include a simple icon (${icon}) and the name in a clean ${prefs.fontStyle}-serif font. ` +
    `Use a color scheme of ${prefs.primaryColor} and ${prefs.secondaryColor}. ` +
    `Layout: ${prefs.layout}. Transparent background. High resolution.`;
}

export function buildDetailedPrompt(inputs: LogoInputs, prefs: DesignPrefs): string {
  const industry = getIndustryLabel(inputs.industry);
  const style = inputs.styleKeywords.map(capitalize).join(', ') || 'Modern, Professional';
  const icon = prefs.iconKeyword || 'abstract symbol';
  const taglinePart = inputs.tagline ? `Include the tagline "${inputs.tagline}" below the company name. ` : '';
  const audiencePart = inputs.targetAudience ? `The logo should resonate with ${inputs.targetAudience}. ` : '';

  return `Design a professional logo for a ${industry} business called "${inputs.businessName}". ` +
    taglinePart +
    `Style: ${style} — polished, legible, and balanced. ` +
    `Use primary color ${prefs.primaryColor} and accent ${prefs.secondaryColor}. ` +
    `Incorporate an icon matching "${icon}" (an abstract symbol relevant to ${industry}). ` +
    `Arrange icon and text in ${prefs.layout} layout. ` +
    audiencePart +
    `Template style: ${prefs.templateStyle}. ` +
    `Output: high-resolution vector art, ${prefs.aspectRatio} aspect ratio.`;
}

export function buildCreativePrompt(inputs: LogoInputs, prefs: DesignPrefs): string {
  const industry = getIndustryLabel(inputs.industry);
  const style = inputs.styleKeywords.join(', ') || 'creative, vibrant';
  const icon = prefs.iconKeyword || 'stylized symbol';
  const taglinePart = inputs.tagline ? `Include "${inputs.tagline}" below the name. ` : '';
  const audiencePart = inputs.targetAudience ? `targeted at ${inputs.targetAudience}` : 'modern audiences';

  return `Imagine a unique ${prefs.templateStyle} logo for "${inputs.businessName}", ` +
    `a ${industry} brand ${audiencePart}. ` +
    `Style: ${style}. ` +
    `Feature a ${icon} motif and use a palette of ${prefs.primaryColor} + ${prefs.secondaryColor}. ` +
    taglinePart +
    `The design should be eye-catching, distinctive, and vector-quality. ` +
    `Font: ${prefs.fontStyle}. Layout: ${prefs.layout}.`;
}

export function buildMinimalistPrompt(inputs: LogoInputs, prefs: DesignPrefs): string {
  const icon = prefs.iconKeyword || 'simple geometric';
  return `Minimalist logo: "${inputs.businessName}" in a clean ${prefs.fontStyle} font, ` +
    `with a simple ${icon} icon (line art). ` +
    `Colors: ${prefs.primaryColor} and ${prefs.secondaryColor}. ` +
    `Emphasize clarity and negative space. Avoid gradients, shadows, or complex textures. ` +
    `Layout: ${prefs.layout}. Transparent background.`;
}

export function buildNegativePrompt(inputs: LogoInputs, prefs: DesignPrefs): string {
  const extras = prefs.templateStyle === 'mascot' ? '' : ', cartoon characters unless requested';
  return `Exclude: blurry, pixelated, distorted, low-resolution, watermark, signature, ` +
    `random background, extra unnecessary text, photography, oil paint, sketch lines${extras}, ` +
    `3D renders unless specified, excessive gradients, drop shadows, clipart, stock imagery.`;
}

/* ── Main builder ────────────────────────────────────────────── */

export function buildPromptSet(
  inputs: LogoInputs,
  prefs: DesignPrefs,
  activeVariant: PromptVariant = 'detailed',
): PromptSet {
  const concise = buildConcisePrompt(inputs, prefs);
  const detailed = buildDetailedPrompt(inputs, prefs);
  const creative = buildCreativePrompt(inputs, prefs);
  const minimalist = buildMinimalistPrompt(inputs, prefs);
  const negative = buildNegativePrompt(inputs, prefs);

  const variants: Record<PromptVariant, string> = { concise, detailed, creative, minimalist };

  return {
    concise,
    detailed,
    creative,
    minimalist,
    negative,
    activeVariant,
    customPrompt: variants[activeVariant],
  };
}

/* ── Export filename builder ─────────────────────────────────── */

export function buildExportFilename(
  businessName: string,
  layout: string,
  colorMode: 'RGB' | 'CMYK' | 'BlackWhite',
  format: 'svg' | 'png' | 'pdf',
  variant?: string,
): string {
  // Sanitize: remove non-alphanumeric chars, camelCase from spaces
  const safeName = businessName
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
    .replace(/\s/g, '')
    || 'Logo';

  const safeLayout = layout.replace(/[^a-zA-Z0-9]/g, '');
  const variantPart = variant ? `_${variant}` : '';

  return `${safeName}_${safeLayout}${variantPart}_${colorMode}.${format}`;
}

/* ── Seed string ─────────────────────────────────────────────── */

export function buildSeedString(seed?: number): string {
  if (!seed) return '';
  return ` --seed ${seed}`;
}
