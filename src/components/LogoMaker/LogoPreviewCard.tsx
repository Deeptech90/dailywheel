/* ============================================================
   Logo Preview Card — individual card in the results grid
   ============================================================ */
import { useState } from 'react';
import { GeneratedLogo } from '../../types/logoMaker';
import { svgToDataUrl, exportLogoSVG, exportLogoPNG } from '../../utils/logoExport';
import styles from './LogoMaker.module.css';

interface LogoPreviewCardProps {
  logo: GeneratedLogo;
  businessName: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
}

export function LogoPreviewCard({
  logo, businessName, isSelected, onSelect, onEdit,
}: LogoPreviewCardProps) {
  const [downloadingPng, setDownloadingPng] = useState(false);
  const dataUrl = svgToDataUrl(logo.svgString);

  const handleDownloadPNG = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingPng(true);
    try {
      await exportLogoPNG(logo, businessName, 1024);
    } finally {
      setDownloadingPng(false);
    }
  };

  const handleDownloadSVG = (e: React.MouseEvent) => {
    e.stopPropagation();
    exportLogoSVG(logo, businessName);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(logo.id);
  };

  return (
    <div
      className={`${styles.previewCard} ${isSelected ? styles.previewCardSelected : ''}`}
      onClick={() => onSelect(logo.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(logo.id); }}
      aria-pressed={isSelected}
      aria-label={`${logo.label} logo variant. Click to select.`}
    >
      {/* Color dot indicators */}
      <div className={styles.previewColorDots}>
        <span className={styles.colorDot} style={{ background: logo.primaryColor }} />
        <span className={styles.colorDot} style={{ background: logo.secondaryColor }} />
      </div>

      {/* Selected badge */}
      {isSelected && (
        <div className={styles.selectedBadge} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Selected
        </div>
      )}

      {/* Logo preview */}
      <div className={styles.previewImageWrap}>
        <img
          src={dataUrl}
          alt={`${logo.label} logo for ${businessName}`}
          className={styles.previewImage}
          draggable={false}
        />
      </div>

      {/* Label */}
      <div className={styles.previewLabel}>{logo.label}</div>

      {/* Action buttons */}
      <div className={styles.previewActions}>
        <button
          type="button"
          className={styles.previewActionBtn}
          onClick={handleEdit}
          aria-label={`Edit ${logo.label} logo`}
          id={`edit-logo-${logo.id}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>

        <button
          type="button"
          className={styles.previewActionBtn}
          onClick={handleDownloadSVG}
          aria-label={`Download ${logo.label} logo as SVG`}
          id={`download-svg-${logo.id}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          SVG
        </button>

        <button
          type="button"
          className={`${styles.previewActionBtn} ${downloadingPng ? styles.previewActionBtnLoading : ''}`}
          onClick={handleDownloadPNG}
          disabled={downloadingPng}
          aria-label={`Download ${logo.label} logo as PNG`}
          id={`download-png-${logo.id}`}
        >
          {downloadingPng ? (
            <span className={styles.miniSpinner} aria-hidden="true" />
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
          PNG
        </button>
      </div>
    </div>
  );
}
