/* ============================================================
   Logo Editor — Interactive Canvas & Customizer
   Mobile-First Responsive Bottom Sheet + Desktop Sidebar
   Hardware-accelerated rendering, touch gesture disambiguation,
   dynamic viewport scaling, and multi-format brand kit exporter.
   ============================================================ */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sliders,
  Eye,
  Download,
  Copy,
  Check,
  X,
  Palette,
  Type,
  Layout,
  RefreshCw,
  Move,
  Lock,
  Smartphone,
  ChevronUp
} from 'lucide-react';
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

type EditorToolTab = 'colors' | 'typography' | 'layout' | 'style' | 'icon' | 'mockups' | 'export';

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
  const [activeTool, setActiveTool] = useState<EditorToolTab>('colors');
  const [activeMockup, setActiveMockup] = useState<MockupType>('business-card');
  const [downloadingPng, setDownloadingPng] = useState<512 | 1024 | 2048 | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [touchMode, setTouchMode] = useState<'scroll' | 'edit'>('scroll');
  const [isMobile, setIsMobile] = useState(false);

  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen width with passive resize listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      {/* Main Panel / Mobile Bottom Sheet */}
      <div
        className={`${styles.editorPanel} ${isMobile ? styles.mobileEditorSheet : ''}`}
        role="dialog"
        aria-label="Logo Editor Suite"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className={styles.editorHeader}>
          <div className={styles.editorHeaderLeft}>
            <div className={styles.brandTitleHeader}>
              <span className={styles.headerDot} style={{ background: prefs.primaryColor }} />
              <h2 className={styles.editorTitle}>Brand Editor</h2>
            </div>
            <span className={styles.activeBrandBadge}>{inputs.businessName}</span>
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

        {/* Dynamic Responsive Viewport Stage */}
        <div className={styles.editorStageSection}>
          <div
            id="fabric-canvas-wrapper"
            ref={canvasWrapperRef}
            className={`${styles.editorCanvasWrapper} ${touchMode === 'edit' ? styles.interactiveCanvas : ''}`}
            style={{
              background: showBg ? prefs.primaryColor : 'transparent',
              touchAction: touchMode === 'edit' ? 'none' : 'pan-y'
            }}
          >
            <img
              src={dataUrl}
              alt={`Live preview of ${inputs.businessName} logo`}
              className={styles.editorPreviewImg}
              draggable={false}
            />
          </div>

          {/* Quick Stage Controls Overlay */}
          <div className={styles.stageControlBar}>
            <button
              type="button"
              className={`${styles.stagePillBtn} ${showBg ? styles.stagePillActive : ''}`}
              onClick={() => setShowBg(b => !b)}
              aria-pressed={showBg}
            >
              {showBg ? 'Transparent Background' : 'Solid Brand Fill'}
            </button>

            {/* Mobile Touch Mode Toggle */}
            <button
              type="button"
              className={`${styles.stagePillBtn} ${touchMode === 'edit' ? styles.touchModeActive : ''}`}
              onClick={() => setTouchMode(m => m === 'scroll' ? 'edit' : 'scroll')}
              aria-label={touchMode === 'scroll' ? 'Switch to interactive edit mode' : 'Switch to smooth scroll mode'}
            >
              {touchMode === 'scroll' ? (
                <>
                  <Move size={13} />
                  <span>Scroll Mode</span>
                </>
              ) : (
                <>
                  <Lock size={13} />
                  <span>Edit Object Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tool Pills (Scrollable horizontally) */}
        <nav className={styles.toolTabBar} aria-label="Editor customization tools">
          {[
            { id: 'colors',     label: 'Colors',    icon: <Palette size={15} /> },
            { id: 'typography', label: 'Type',      icon: <Type size={15} /> },
            { id: 'layout',     label: 'Layout',    icon: <Layout size={15} /> },
            { id: 'style',      label: 'Archetype', icon: <Sparkles size={15} /> },
            { id: 'icon',       label: 'Icon',      icon: <Sliders size={15} /> },
            { id: 'mockups',    label: 'Mockups',   icon: <Smartphone size={15} /> },
            { id: 'export',     label: 'Export',    icon: <Download size={15} /> },
          ].map(t => (
            <button
              key={t.id}
              type="button"
              className={`${styles.toolTabBtn} ${activeTool === t.id ? styles.toolTabBtnActive : ''}`}
              onClick={() => setActiveTool(t.id as EditorToolTab)}
              aria-pressed={activeTool === t.id}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Scrollable Tool Drawer Panel */}
        <div className={styles.toolDrawerBody}>
          {/* 1. COLORS TAB */}
          {activeTool === 'colors' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Palette size={16} />
                <h3 className={styles.editorSectionTitle}>Brand Color Palette</h3>
              </div>
              <ColorPalettePicker
                primaryColor={prefs.primaryColor}
                secondaryColor={prefs.secondaryColor}
                onChange={handleColorChange}
              />
            </div>
          )}

          {/* 2. TYPOGRAPHY TAB */}
          {activeTool === 'typography' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Type size={16} />
                <h3 className={styles.editorSectionTitle}>Typography &amp; Kerning</h3>
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

              {/* Letter Spacing Range Slider */}
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
          )}

          {/* 3. LAYOUT & SCALING TAB */}
          {activeTool === 'layout' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Layout size={16} />
                <h3 className={styles.editorSectionTitle}>Layout &amp; Composition</h3>
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

              {/* Icon Scaling Slider */}
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <span>Icon Size Scale</span>
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
          )}

          {/* 4. ARCHETYPE STYLE TAB */}
          {activeTool === 'style' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Sparkles size={16} />
                <h3 className={styles.editorSectionTitle}>Logo Style Archetype</h3>
              </div>
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
          )}

          {/* 5. ICON SEARCH KEYWORD TAB */}
          {activeTool === 'icon' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Sliders size={16} />
                <h3 className={styles.editorSectionTitle}>Vector Symbol Search</h3>
              </div>
              <input
                type="text"
                className={styles.fieldInput}
                value={prefs.iconKeyword}
                onChange={(e) => setPrefs(p => ({ ...p, iconKeyword: e.target.value }))}
                placeholder='Search symbol: "leaf", "rocket", "shield", "cube"...'
                aria-label="Vector icon search"
                id="editor-icon-keyword"
              />
              <p className={styles.fieldHint}>Type any theme or industry keyword to match custom vector marks.</p>
            </div>
          )}

          {/* 6. MOCKUPS TAB */}
          {activeTool === 'mockups' && (
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

          {/* 7. EXPORT BRAND ASSETS TAB */}
          {activeTool === 'export' && (
            <div className={styles.editorSection}>
              <div className={styles.sectionHeader}>
                <Download size={16} />
                <h3 className={styles.editorSectionTitle}>Export Brand Asset Package</h3>
              </div>

              <div className={styles.exportGroup}>
                <button
                  type="button"
                  className={styles.exportBtn}
                  onClick={() => exportLogoSVG(currentLogo, inputs.businessName)}
                  id="editor-download-svg"
                >
                  <Download size={16} />
                  Download Vector SVG (Print-Ready)
                </button>

                <button
                  type="button"
                  className={`${styles.exportBtn} ${copied ? styles.exportBtnSuccess : ''}`}
                  onClick={handleCopySvg}
                  id="editor-copy-svg"
                >
                  {copied ? <><Check size={16} /> Copied to Clipboard</> : <><Copy size={16} /> Copy SVG Code</>}
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
                        <RefreshCw size={14} className={styles.spinner} />
                      ) : null}
                      {size}px High-Res
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
