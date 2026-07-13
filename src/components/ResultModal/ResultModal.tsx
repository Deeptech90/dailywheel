import { useState, useEffect } from 'react';
import { Segment, WheelMode } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './ResultModal.module.css';

interface ResultModalProps {
  segment: Segment | null;
  mode: WheelMode;
  category?: string;
  onClose: () => void;
  onSpinAgain?: () => void;
}

type TabId = 'overview' | 'branding' | 'domain' | 'share';

// ── Derived brand data from a name (deterministic, no API needed) ──────────
function deriveBrandData(name: string) {
  const len = name.length;
  const hasVowelEnd = /[aeiou]$/i.test(name);
  const syllables = name.replace(/[^aeiouy]/gi, '').length || 1;

  const memorability = syllables <= 2 ? 'High' : syllables <= 3 ? 'Medium' : 'Low';
  const pronunciation = syllables <= 2 ? 'Easy' : syllables <= 4 ? 'Moderate' : 'Challenging';
  const trademarkRisk = len <= 7 ? 'Low' : len <= 12 ? 'Medium' : 'High';

  const personalities = [
    'Bold & Confident', 'Creative & Playful', 'Professional & Trustworthy',
    'Modern & Innovative', 'Friendly & Approachable', 'Premium & Luxurious',
  ];
  const personality = personalities[name.charCodeAt(0) % personalities.length];

  const slogans = [
    `${name} — Where Excellence Meets Innovation.`,
    `Discover the ${name} Difference.`,
    `${name}: Built for the Bold.`,
    `Your Future Starts with ${name}.`,
    `${name} — Redefining What's Possible.`,
  ];
  const slogan = slogans[name.charCodeAt(1) % slogans.length];

  const taglines = [
    'Think Differently. Grow Boldly.',
    'Innovation at Every Step.',
    'Your Vision, Our Mission.',
    'Excellence, Simplified.',
    'Where Ideas Become Reality.',
  ];
  const tagline = taglines[name.charCodeAt(0) % taglines.length];

  const fontPairs = [
    'Outfit + Inter', 'Playfair + Lato', 'Montserrat + Open Sans',
    'Raleway + Nunito', 'Poppins + Source Sans',
  ];
  const fontPair = fontPairs[name.charCodeAt(2) % fontPairs.length];

  // Deterministic color palette from name
  const hue1 = (name.charCodeAt(0) * 37) % 360;
  const hue2 = (hue1 + 40) % 360;
  const hue3 = (hue1 + 200) % 360;

  const colors = [
    `hsl(${hue1}, 65%, 55%)`,
    `hsl(${hue2}, 60%, 45%)`,
    `hsl(${hue3}, 50%, 60%)`,
  ];

  const industries = [
    'Technology & Software', 'Creative Agency', 'Health & Wellness',
    'E-commerce & Retail', 'Consulting & Finance', 'Food & Beverage',
  ];
  const industry = industries[name.charCodeAt(1) % industries.length];

  const meanings = [
    'A blend of forward-thinking and robust foundations.',
    'Evokes a sense of trust, reliability, and growth.',
    'Suggests speed, innovation, and breaking boundaries.',
    'Implies warmth, approachability, and community.',
    'Represents premium quality and unparalleled service.',
  ];
  const meaning = meanings[name.charCodeAt(2) % meanings.length];

  return { memorability, pronunciation, trademarkRisk, personality, slogan, tagline, fontPair, colors, industry, meaning };
}

// ── TLD Domains ─────────────────────────────────────────────
const TLDS = ['.com', '.net', '.org', '.co', '.io', '.ai', '.in'];

function buildDomainUrl(name: string, tld: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://www.godaddy.com/domainsearch/find?domainToCheck=${slug}${tld.replace('.', '')}`;
}

export function ResultModal({ segment, mode, category = 'general', onClose, onSpinAgain }: ResultModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [copied, setCopied] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const name = segment?.label ?? '';
  const brand = deriveBrandData(name);
  const favorited = isFavorite(name);

  // Reset tab when a new result appears
  useEffect(() => { setActiveTab('overview'); }, [name]);

  // Haptic feedback on mount
  useEffect(() => {
    if ('vibrate' in navigator) navigator.vibrate([30, 20, 60]);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback — nothing */
    }
  };

  const handleFav = () => {
    if (favorited) removeFavorite(name);
    else addFavorite(name, category);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Business Name', text: `Check out my new business name: "${name}" — generated at UniqueBusinessName.com`, url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  if (!segment) return null;

  const TABS: { id: TabId; label: string }[] = [
    { id: 'overview', label: '✨ Overview' },
    { id: 'branding', label: '🎨 Branding' },
    { id: 'domain',   label: '🌐 Domain' },
    { id: 'share',    label: '📤 Share' },
  ];

  const SHARE_LINKS = [
    {
      label: 'WhatsApp', icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(`I just generated "${name}" as my business name! 🎯 Try it: ${window.location.href}`)}`,
    },
    {
      label: 'X (Twitter)', icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just spun the wheel and got "${name}" as my business name! 🚀 Generate yours free 👇`)}&url=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: 'Facebook', icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: 'LinkedIn', icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: 'Email', icon: '📧',
      url: `mailto:?subject=${encodeURIComponent(`Business Name Idea: ${name}`)}&body=${encodeURIComponent(`I used UniqueBusinessName.com and generated "${name}" for my business. Try it yourself: ${window.location.href}`)}`,
    },
    {
      label: 'Copy Link', icon: '🔗',
      url: '',
    },
  ];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Business name result" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        {/* Drag handle (mobile) */}
        <div className={styles.handle} aria-hidden="true" />

        {/* Winner Section */}
        <div className={styles.winnerSection}>
          <span className={styles.confettiEmoji} aria-hidden="true">🎉</span>
          <p className={styles.winnerLabel}>
            {mode === 'animal' ? 'Your Spirit Animal' : 'Your Business Name'}
          </p>
          <h2 className={styles.winnerName}>{name}</h2>
          {mode === 'animal' && segment.trait && (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              {segment.trait}
            </p>
          )}
          {category !== 'general' && (
            <span className={styles.categoryChip}>
              {category}
            </span>
          )}
        </div>

        {/* Quick action row */}
        <div className={styles.quickActions}>
          <button className={styles.actionBtn} onClick={handleCopy} aria-label="Copy name">
            <span className={styles.actionIcon}>{copied ? '✅' : '📋'}</span>
            <span className={styles.actionLabel}>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnFav} ${favorited ? styles.favorited : ''}`} onClick={handleFav} aria-label={favorited ? 'Remove from saved' : 'Save name'}>
            <span className={styles.actionIcon}>{favorited ? '❤️' : '🤍'}</span>
            <span className={styles.actionLabel}>{favorited ? 'Saved' : 'Save'}</span>
          </button>
          <button className={styles.actionBtn} onClick={handleShare} aria-label="Share name">
            <span className={styles.actionIcon}>📤</span>
            <span className={styles.actionLabel}>Share</span>
          </button>
          <button className={styles.actionBtn} onClick={onSpinAgain} aria-label="Generate again">
            <span className={styles.actionIcon}>🔄</span>
            <span className={styles.actionLabel}>Again</span>
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent} role="tabpanel" key={activeTab}>
          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Meaning</span>
                <span className={styles.brandVal} style={{ maxWidth: '240px', lineHeight: 1.4 }}>{brand.meaning}</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Suggested Industry</span>
                <span className={styles.brandVal}>{brand.industry}</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Brand Personality</span>
                <span className={styles.brandVal}>{brand.personality}</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Memorability</span>
                <span className={styles.brandVal}>
                  <span className={`${styles.meterBadge} ${brand.memorability === 'High' ? styles.meterHigh : brand.memorability === 'Medium' ? styles.meterMed : styles.meterLow}`}>
                    {brand.memorability === 'High' ? '🟢' : brand.memorability === 'Medium' ? '🟡' : '🔴'} {brand.memorability}
                  </span>
                </span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Pronunciation</span>
                <span className={styles.brandVal}>
                  <span className={`${styles.meterBadge} ${brand.pronunciation === 'Easy' ? styles.meterHigh : brand.pronunciation === 'Moderate' ? styles.meterMed : styles.meterLow}`}>
                    {brand.pronunciation}
                  </span>
                </span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Suggested Slogan</span>
                <span className={styles.brandVal} style={{ maxWidth: '240px', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)' }}>"{brand.slogan}"</span>
              </div>
            </div>
          )}

          {/* ── BRANDING TAB ── */}
          {activeTab === 'branding' && (
            <div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Brand Colors</span>
                <div className={styles.swatchRow}>
                  {brand.colors.map((c, i) => (
                    <div
                      key={i}
                      className={styles.swatch}
                      style={{ background: c }}
                      title={c}
                      onClick={() => navigator.clipboard.writeText(c).catch(() => {})}
                      role="button"
                      aria-label={`Copy color ${c}`}
                      tabIndex={0}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Font Pair</span>
                <span className={styles.brandVal}>{brand.fontPair}</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Suggested Tagline</span>
                <span className={styles.brandVal} style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', textAlign: 'right' }}>"{brand.tagline}"</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Social Handle</span>
                <span className={styles.brandVal}>@{name.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
              </div>
              <div className={styles.brandRow}>
                <span className={styles.brandKey}>Hashtag</span>
                <span className={styles.brandVal}>#{name.replace(/[^a-zA-Z0-9]/g, '')}</span>
              </div>
            </div>
          )}

          {/* ── DOMAIN TAB ── */}
          {activeTab === 'domain' && (
            <div className={styles.domainGrid}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                Check domain availability for <strong>{name}</strong>:
              </p>
              {TLDS.map(tld => {
                const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                return (
                  <div key={tld} className={styles.domainRow}>
                    <span className={styles.domainName}>{slug}{tld}</span>
                    <a
                      href={buildDomainUrl(name, tld)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.domainCheckBtn} ${styles.btnCheck}`}
                      aria-label={`Check ${slug}${tld} on GoDaddy`}
                    >
                      🔍 Check
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── SHARE TAB ── */}
          {activeTab === 'share' && (
            <div className={styles.shareGrid}>
              {SHARE_LINKS.map(link => (
                link.url ? (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareBtn}
                  >
                    <span className={styles.shareBtnIcon}>{link.icon}</span>
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    className={styles.shareBtn}
                    onClick={handleCopy}
                  >
                    <span className={styles.shareBtnIcon}>{link.icon}</span>
                    {copied ? 'Copied!' : link.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className={styles.footer}>
          <button className={styles.spinAgainBtn} onClick={onSpinAgain}>
            🎡 Generate Again
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={styles.dismissBtn} onClick={onSpinAgain} style={{ flex: 1, height: '48px', minHeight: '48px', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
              ✨ Generate Similar
            </button>
            <button className={styles.dismissBtn} onClick={onClose} style={{ flex: 1 }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
