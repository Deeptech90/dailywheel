/* ============================================================
   Logo Editor — Turbologo Interactive Canvas & Customizer
   Live controls: Typography, Letter Spacing, Icon Scale,
   Color Palettes, Mockup Previews, and Multi-Format Exports
   ============================================================ */

import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Eye, Download, Copy, Check, X, Palette, Type, Layout, RefreshCw } from 'lucide-react';
import {
  GeneratedLogo,
  LogoInputs,
  DesignPrefs,
  FontStyle,
  LayoutChoice,
  TemplateStyle,
  MockupType,
  TEMPLATE_STYLES
} from '../../types/logoMaker';
import { ColorPalettePicker } from './ColorPalettePicker';
import { MockupPreview } from './MockupPreview';
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
  { id: 'geometric', label: 'Geometric (Modern)' },
  { id: 'sans',      label: 'Sans-Serif (Clean)' },
  { id: 'serif',     label: 'Serif (Classic)' },
  { id: 'display',   label: 'Display (Bold)' },
  { id: 'script',    label: 'Script (Artisan)' },
  { id: 'mono',      label: 'Monospace (Tech)' },
];

const LAYOUT_OPTIONS: { id: LayoutChoice; label: string }[] = [
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'stacked',    label: 'Stacked' },
  { id: 'icon-only',  label: 'Icon Only' },
  { id: 'text-only',  label: 'Text Only' },
];

export const LogoEditor: React.FC<LogoEditorProps> = ({
  logo,
  inputs,
  onClose,
  onSave
}) => {
  const [prefs, setPrefs] = useState<DesignPrefs>({
    primaryColor:   logo.primaryColor,
    secondaryColor: logo.secondaryColor,
    iconKeyword:    '',
    fontStyle:      logo.fontStyle || 'geometric',
    layout:         logo.layout,
    templateStyle:  logo.templateStyle,
    aspectRatio:    '1:1',
    fontSize:       undefined,
    letterSpacing:  0,
    iconScale:      1,
    bgFill:         undefined,
  });

  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo>(logo);
  const [activeTab, setActiveTab] = useState<'canvas' | 'mockups'>('canvas');
  const [activeMockup, setActiveMockup] = useState<MockupType>('business-card');
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
          <div className={styles.editorHeaderLeft}>
            <h2 className={styles.editorTitle}>Interactive Logo Customizer</h2>
            <div className={styles.editorTabToggle}>
              <button
                type="button"
                className={`${styles.editorTabBtn} ${activeTab === 'canvas' ? styles.editorTabBtnActive : ''}`}
                onClick={() => setActiveTab('canvas')}
              >
                <Sliders size={14} /> Editor Canvas
              </button>
              <button
                type="button"
                className={`${styles.editorTabBtn} ${activeTab === 'mockups' ? styles.editorTabBtnActive : ''}`}
                onClick={() => setActiveTab('mockups')}
              >
                <Eye size={14} /> Mockup Studio
              </button>
            </div>
          </div>

          <div className={styles.editorHeaderActions}>
            <button
              type="button"
              className={styles.editorSaveBtn}
              onClick={handleSave}
              aria-label="Save changes"
            >
              Save Brand Kit
            </button>
            <button
              type="button"
              className={styles.editorCloseBtn}
              onClick={onClose}
              aria-label="Close editor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className={styles.editorBody}>
          {activeTab === 'canvas' ? (
            <>
              {/* ── Live Preview Canvas ────────────────────────── */}
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
                    {showBg ? 'Transparent Background' : 'Solid Brand Fill'}
                  </button>
                </div>
              </div>

              {/* ── Live Controls Customization Suite ──────────── */}
              <div className={styles.editorControls}>
                {/* Colors */}
                <div className={styles.editorSection}>
                  <div className={styles.sectionHeader}>
                    <Palette size={16} />
                    <h3 className={styles.editorSectionTitle}>Brand Colors</h3>
                  </div>
                  <ColorPalettePicker
                    primaryColor={prefs.primaryColor}
                    secondaryColor={prefs.secondaryColor}
                    onChange={handleColorChange}
                  />
                </div>

                {/* Typography & Font */}
                <div className={styles.editorSection}>
                  <div className={styles.sectionHeader}>
                    <Type size={16} />
                    <h3 className={styles.editorSectionTitle}>Typography</h3>
                  </div>
                  <div className={styles.editorChipRow}>
                    {FONT_OPTIONS.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        className={`${styles.editorChip} ${prefs.fontStyle === f.id ? styles.editorChipActive : ''}`}
                        onClick={() => setPrefs(p => ({ ...p, fontStyle: f.id }))}
                        aria-pressed={prefs.fontStyle === f.id}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Letter Spacing & Font Scaling */}
                  <div className={styles.sliderGroup}>
                    <label className={styles.sliderLabel}>
                      <span>Letter Spacing</span>
                      <span>{prefs.letterSpacing || 0}px</span>
                    </label>
                    <input
                      type="range"
                      min="-2"
                      max="10"
                      step="0.5"
                      value={prefs.letterSpacing || 0}
                      onChange={(e) => setPrefs(p => ({ ...p, letterSpacing: parseFloat(e.target.value) }))}
                      className={styles.rangeSlider}
                    />
                  </div>
                </div>

                {/* Layout & Composition */}
                <div className={styles.editorSection}>
                  <div className={styles.sectionHeader}>
                    <Layout size={16} />
                    <h3 className={styles.editorSectionTitle}>Layout &amp; Weight</h3>
                  </div>
                  <div className={styles.editorChipRow}>
                    {LAYOUT_OPTIONS.map(l => (
                      <button
                        key={l.id}
                        type="button"
                        className={`${styles.editorChip} ${prefs.layout === l.id ? styles.editorChipActive : ''}`}
                        onClick={() => setPrefs(p => ({ ...p, layout: l.id }))}
                        aria-pressed={prefs.layout === l.id}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  {/* Icon Scale */}
                  <div className={styles.sliderGroup}>
                    <label className={styles.sliderLabel}>
                      <span>Icon Scale</span>
                      <span>{Math.round((prefs.iconScale || 1) * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.6"
                      step="0.1"
                      value={prefs.iconScale || 1}
                      onChange={(e) => setPrefs(p => ({ ...p, iconScale: parseFloat(e.target.value) }))}
                      className={styles.rangeSlider}
                    />
                  </div>
                </div>

                {/* Template Style */}
                <div className={styles.editorSection}>
                  <h3 className={styles.editorSectionTitle}>Logo Style Archetype</h3>
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

                {/* Icon Keyword Search */}
                <div className={styles.editorSection}>
                  <h3 className={styles.editorSectionTitle}>Vector Symbol Keyword</h3>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    value={prefs.iconKeyword}
                    onChange={(e) => setPrefs(p => ({ ...p, iconKeyword: e.target.value }))}
                    placeholder='e.g. "leaf", "rocket", "coffee", "shield"'
                    aria-label="Icon keyword search"
                    id="editor-icon-keyword"
                  />
                  <p className={styles.fieldHint}>Type a keyword to dynamically change the vector symbol</p>
                </div>

                {/* ── Multi-Format Export Package ────────────────── */}
                <div className={styles.editorSection}>
                  <h3 className={styles.editorSectionTitle}>Export Brand Assets</h3>

                  <div className={styles.exportGroup}>
                    <button
                      type="button"
                      className={styles.exportBtn}
                      onClick={() => exportLogoSVG(currentLogo, inputs.businessName)}
                      id="editor-download-svg"
                    >
                      <Download size={15} />
                      Download Vector SVG
                    </button>

                    <button
                      type="button"
                      className={`${styles.exportBtn} ${copied ? styles.exportBtnSuccess : ''}`}
                      onClick={handleCopySvg}
                      id="editor-copy-svg"
                    >
                      {copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy SVG</>}
                    </button>
                  </div>

                  <div className={styles.pngExportGroup}>
                    <label className={styles.exportLabel}>High-Resolution Transparent PNG</label>
                    <div className={styles.exportGroup}>
                      {([512, 1024, 2048] as const).map(size => (
                        <button
                          key={size}
                          type="button"
                          className={`${styles.exportBtn} ${styles.exportBtnSm}`}
                          onClick={() => handleDownloadPng(size)}
                          disabled={downloadingPng !== null}
                          id={`editor-download-png-${size}`}
                        >
                          {downloadingPng === size ? (
                            <RefreshCw size={13} className={styles.spinner} />
                          ) : null}
                          {size}px
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ── Mockup Studio Tab ──────────────────────────────── */
            <div className={styles.mockupTabContainer}>
              <MockupPreview
                logo={currentLogo}
                businessName={inputs.businessName}
                tagline={inputs.tagline}
                activeMockup={activeMockup}
                onSelectMockup={setActiveMockup}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
