/* ============================================================
   Logo Editor — slide-in panel for editing a selected logo
   ============================================================ */
import { useState, useEffect } from 'react';
import { GeneratedLogo, LogoInputs, DesignPrefs, FontStyle, LayoutChoice, TemplateStyle, TEMPLATE_STYLES } from '../../types/logoMaker';
import { ColorPalettePicker } from './ColorPalettePicker';
import { regenerateSingleLogo } from '../../engines/logoRenderer';
import { svgToDataUrl, exportLogoSVG, exportLogoPNG, copySVGToClipboard } from '../../utils/logoExport';
import styles from './LogoMaker.module.css';

interface LogoEditorProps {
  logo: GeneratedLogo;
  inputs: LogoInputs;
  onClose: () => void;
  onSave: (updated: GeneratedLogo) => void;
}

const FONT_OPTIONS: { id: FontStyle; label: string }[] = [
  { id: 'sans',      label: 'Sans-Serif' },
  { id: 'serif',     label: 'Serif' },
  { id: 'script',    label: 'Script' },
  { id: 'geometric', label: 'Geometric' },
];

const LAYOUT_OPTIONS: { id: LayoutChoice; label: string }[] = [
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'stacked',    label: 'Stacked' },
  { id: 'icon-only',  label: 'Icon Only' },
  { id: 'text-only',  label: 'Text Only' },
];

export function LogoEditor({ logo, inputs, onClose, onSave }: LogoEditorProps) {
  const [prefs, setPrefs] = useState<DesignPrefs>({
    primaryColor:   logo.primaryColor,
    secondaryColor: logo.secondaryColor,
    iconKeyword:    '',
    fontStyle:      'sans',
    layout:         logo.layout,
    templateStyle:  logo.templateStyle,
    aspectRatio:    '1:1',
  });

  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo>(logo);
  const [downloadingPng, setDownloadingPng] = useState<512 | 1024 | 2048 | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBg, setShowBg] = useState(false);

  // Live re-render whenever prefs change
  useEffect(() => {
    const updated = regenerateSingleLogo(inputs, prefs, currentLogo);
    setCurrentLogo(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefs]);

  const handleColorChange = (primary: string, secondary: string) => {
    setPrefs(p => ({ ...p, primaryColor: primary, secondaryColor: secondary }));
  };

  const handleSave = () => {
    onSave(currentLogo);
    onClose();
  };

  const handleDownloadPng = async (size: 512 | 1024 | 2048) => {
    setDownloadingPng(size);
    try {
      await exportLogoPNG(currentLogo, inputs.businessName, size);
    } finally {
      setDownloadingPng(null);
    }
  };

  const handleCopySvg = async () => {
    await copySVGToClipboard(currentLogo.svgString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dataUrl = svgToDataUrl(currentLogo.svgString);

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.editorBackdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={styles.editorPanel}
        role="dialog"
        aria-label="Logo Editor"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.editorHeader}>
          <h2 className={styles.editorTitle}>Edit Logo</h2>
          <div className={styles.editorHeaderActions}>
            <button
              type="button"
              className={styles.editorSaveBtn}
              onClick={handleSave}
              aria-label="Save changes"
            >
              Save Changes
            </button>
            <button
              type="button"
              className={styles.editorCloseBtn}
              onClick={onClose}
              aria-label="Close editor"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.editorBody}>
          {/* ── Live Preview ────────────────────────────────────── */}
          <div className={styles.editorPreviewSection}>
            <div
              className={styles.editorPreviewWrap}
              style={{ background: showBg ? prefs.primaryColor : 'transparent' }}
            >
              <img
                src={dataUrl}
                alt={`Live preview of ${inputs.businessName} logo`}
                className={styles.editorPreviewImg}
                draggable={false}
              />
            </div>
            <div className={styles.editorPreviewControls}>
              <button
                type="button"
                className={`${styles.bgToggleBtn} ${showBg ? styles.bgToggleBtnActive : ''}`}
                onClick={() => setShowBg(b => !b)}
                aria-pressed={showBg}
              >
                {showBg ? 'Transparent BG' : 'Colored BG'}
              </button>
            </div>
          </div>

          {/* ── Controls ────────────────────────────────────────── */}
          <div className={styles.editorControls}>

            {/* Colors */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Colors</h3>
              <ColorPalettePicker
                primaryColor={prefs.primaryColor}
                secondaryColor={prefs.secondaryColor}
                onChange={handleColorChange}
              />
            </div>

            {/* Template Style */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Logo Style</h3>
              <div className={styles.editorChipRow}>
                {TEMPLATE_STYLES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.editorChip} ${prefs.templateStyle === t.id ? styles.editorChipActive : ''}`}
                    onClick={() => setPrefs(p => ({ ...p, templateStyle: t.id as TemplateStyle }))}
                    aria-pressed={prefs.templateStyle === t.id}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Layout</h3>
              <div className={styles.editorChipRow}>
                {LAYOUT_OPTIONS.map(l => (
                  <button
                    key={l.id}
                    type="button"
                    className={`${styles.editorChip} ${prefs.layout === l.id ? styles.editorChipActive : ''}`}
                    onClick={() => setPrefs(p => ({ ...p, layout: l.id as LayoutChoice }))}
                    aria-pressed={prefs.layout === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Font Style</h3>
              <div className={styles.editorChipRow}>
                {FONT_OPTIONS.map(f => (
                  <button
                    key={f.id}
                    type="button"
                    className={`${styles.editorChip} ${prefs.fontStyle === f.id ? styles.editorChipActive : ''}`}
                    onClick={() => setPrefs(p => ({ ...p, fontStyle: f.id as FontStyle }))}
                    aria-pressed={prefs.fontStyle === f.id}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Keyword */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Icon</h3>
              <input
                type="text"
                className={styles.fieldInput}
                value={prefs.iconKeyword}
                onChange={(e) => setPrefs(p => ({ ...p, iconKeyword: e.target.value }))}
                placeholder='e.g. "leaf", "bolt", "heart"'
                aria-label="Icon keyword search"
                id="editor-icon-keyword"
              />
              <p className={styles.fieldHint}>Type a keyword to match a different icon</p>
            </div>

            {/* ── Export ────────────────────────────────────────── */}
            <div className={styles.editorSection}>
              <h3 className={styles.editorSectionTitle}>Export</h3>

              <div className={styles.exportGroup}>
                <button
                  type="button"
                  className={styles.exportBtn}
                  onClick={() => exportLogoSVG(currentLogo, inputs.businessName)}
                  id="editor-download-svg"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download SVG
                </button>

                <button
                  type="button"
                  className={`${styles.exportBtn} ${copied ? styles.exportBtnSuccess : ''}`}
                  onClick={handleCopySvg}
                  id="editor-copy-svg"
                >
                  {copied ? '✓ Copied' : 'Copy SVG Code'}
                </button>
              </div>

              <div className={styles.pngExportGroup}>
                <label className={styles.exportLabel}>Download PNG</label>
                <div className={styles.exportGroup}>
                  {([512, 1024, 2048] as const).map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.exportBtn} ${styles.exportBtnSm}`}
                      onClick={() => handleDownloadPng(size)}
                      disabled={downloadingPng !== null}
                      aria-label={`Download PNG at ${size}×${size}px`}
                      id={`editor-download-png-${size}`}
                    >
                      {downloadingPng === size ? (
                        <span className={styles.miniSpinner} aria-hidden="true" />
                      ) : null}
                      {size}px
                    </button>
                  ))}
                </div>
              </div>

              <p className={styles.exportNote}>
                All exports include embedded metadata (name, date, style).
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
