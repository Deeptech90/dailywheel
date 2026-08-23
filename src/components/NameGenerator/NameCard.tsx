/* ============================================================
   NameCard — Interactive brand name card
   Displays phonetics, domain status badges, heart save action,
   and 1-click "Create Logo with This Name" CTA
   ============================================================ */

import React, { useState, useMemo } from 'react';
import { Heart, Sparkles, Copy, Check, ExternalLink, ArrowRight, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedBusinessName, TLD, DomainStatus } from '../../types';
import { useBrandState } from '../../context/BrandStateContext';
import { getRegistrarUrl } from '../../engines/domainChecker';
import { generateDynamicLogoPreview } from '../../engines/dynamicLogoGenerator';
import styles from './NameGenerator.module.css';

interface NameCardProps {
  item: GeneratedBusinessName;
}

const TLD_LIST: TLD[] = ['.com', '.io', '.ai', '.app'];

export const NameCard: React.FC<NameCardProps> = ({ item }) => {
  const { isNameSaved, saveName, removeSavedName, createLogoWithName } = useBrandState();
  const [copied, setCopied] = useState(false);
  const saved = isNameSaved(item.id) || isNameSaved(item.name);

  const logoPreview = useMemo(() => {
    return generateDynamicLogoPreview(item.name, item.style);
  }, [item.name, item.style]);

  const handleToggleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedName(item.id);
    } else {
      saveName(item);
      // Trigger subtle celebratory confetti burst
      try {
        confetti({
          particleCount: 28,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#1D4ED8', '#7C3AED', '#EC4899', '#10B981']
        });
      } catch {}
    }
  };

  const handleCopyName = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    createLogoWithName(item.name, item.meaning);
  };

  return (
    <div className={styles.nameCard} id={`name-card-${item.id}`}>
      {/* Top Header: Style pill & Heart button */}
      <div className={styles.cardHeader}>
        <span className={styles.styleBadge}>
          {item.style.replace('-', ' ')}
        </span>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleCopyName}
            title="Copy name to clipboard"
            aria-label={`Copy ${item.name}`}
          >
            {copied ? <Check size={16} className={styles.copiedIcon} /> : <Copy size={16} />}
          </button>
          
          <button
            type="button"
            className={`${styles.heartBtn} ${saved ? styles.heartBtnActive : ''}`}
            onClick={handleToggleHeart}
            title={saved ? 'Remove from saved' : 'Save to favorites'}
            aria-label={`Favorite ${item.name}`}
          >
            <Heart size={18} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : 'currentColor'} />
          </button>
        </div>
      </div>

      {/* Dynamic Logo Live Preview Tile (Phase 1 Dynamic Canvas Engine) */}
      <div
        className={styles.logoPreviewBanner}
        onClick={handleCreateLogo}
        title="Click to customize this logo in Vector Studio"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCreateLogo(e as any)}
      >
        <div
          className={styles.logoPreviewSvgWrap}
          dangerouslySetInnerHTML={{ __html: logoPreview.svgString }}
        />
        <span className={styles.logoPreviewTag}>
          <Sparkles size={11} color="#A855F7" /> Edit in Studio
        </span>
      </div>

      {/* Main Brand Typography Presentation */}
      <div className={styles.cardBody}>
        <h3 className={styles.brandTitle}>{item.name}</h3>
        <div className={styles.phoneticTag}>
          <span>[{item.phonetic}]</span>
          <span className={styles.scorePill}>{item.score}% Match</span>
        </div>
        <p className={styles.meaningText}>{item.meaning}</p>
      </div>

      {/* Domain Availability Live Status Grid */}
      <div className={styles.domainSection}>
        <div className={styles.domainLabel}>Domain Availability</div>
        <div className={styles.domainPills}>
          {TLD_LIST.map((tld) => {
            const status: DomainStatus = item.domains[tld] || 'checking';
            const regUrl = getRegistrarUrl(item.name, tld);

            return (
              <a
                key={tld}
                href={regUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.domainPill} ${styles[`domain_${status}`]}`}
                title={`Check ${item.name}${tld} (${status})`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.domainTld}>{tld}</span>
                <span className={styles.domainDot} />
                <span className={styles.domainStatusText}>
                  {status === 'checking' ? '...' : status}
                </span>
                <ExternalLink size={10} className={styles.domainExtIcon} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Primary CTA: 1-Click State Bridge to Logo Creator */}
      <div className={styles.cardFooter}>
        <button
          type="button"
          className={styles.createLogoBtn}
          onClick={handleCreateLogo}
          id={`create-logo-btn-${item.id}`}
        >
          <Sparkles size={16} className={styles.sparkleIcon} />
          <span>Create Logo with This Name</span>
          <ArrowRight size={15} className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};
