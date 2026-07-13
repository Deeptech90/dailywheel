import { useState, useEffect } from 'react';
import { Segment, WheelMode } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { useSubscription } from '../../hooks/useSubscription';
import { generateBrandKit } from '../../hooks/useBrandEngine';
import { exportJSON, exportCSV, exportPDF } from '../../utils/exportUtils';
import styles from './ResultModal.module.css';

interface ResultModalProps {
  segment: Segment | null;
  mode: WheelMode;
  category?: string;
  onClose: () => void;
  onSpinAgain?: () => void;
}

type TabId = 'intelligence' | 'taglines' | 'story' | 'identity' | 'domains' | 'logos' | 'share';

export function ResultModal({ segment, mode, category = 'general', onClose, onSpinAgain }: ResultModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('intelligence');
  const [copied, setCopied] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { canExportPDF, canExportJSON } = useSubscription();

  const name = segment?.label ?? '';
  
  // Use the brand engine to generate a comprehensive kit deterministically
  const brand = generateBrandKit(name, category);
  const favorited = isFavorite(name);

  useEffect(() => { setActiveTab('intelligence'); }, [name]);

  useEffect(() => {
    if ('vibrate' in navigator) navigator.vibrate([30, 20, 60]);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  const handleFav = () => {
    if (favorited) removeFavorite(name);
    else addFavorite(name, category, brand);
  };

  if (!segment) return null;

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'intelligence', label: 'Intelligence', icon: '🧠' },
    { id: 'taglines', label: 'Taglines', icon: '✍️' },
    { id: 'story', label: 'Story', icon: '📖' },
    { id: 'identity', label: 'Identity', icon: '🎨' },
    { id: 'logos', label: 'Logos', icon: '✨' },
    { id: 'domains', label: 'Web & Social', icon: '🌐' },
    { id: 'share', label: 'Share', icon: '📤' },
  ];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet}>
        <div className={styles.handle} aria-hidden="true" />

        <div className={styles.winnerSection}>
          <span className={styles.confettiEmoji} aria-hidden="true">🎉</span>
          <p className={styles.winnerLabel}>{mode === 'animal' ? 'Your Spirit Animal' : 'Your New Brand'}</p>
          <h2 className={styles.winnerName}>{name}</h2>
          {category !== 'general' && <span className={styles.categoryChip}>{category}</span>}
        </div>

        <div className={styles.quickActions}>
          <button className={styles.actionBtn} onClick={() => handleCopy(name)}>
            <span className={styles.actionIcon}>{copied ? '✅' : '📋'}</span>
            <span className={styles.actionLabel}>Copy</span>
          </button>
          <button className={`${styles.actionBtn} ${favorited ? styles.favorited : ''}`} onClick={handleFav}>
            <span className={styles.actionIcon}>{favorited ? '❤️' : '🤍'}</span>
            <span className={styles.actionLabel}>{favorited ? 'Saved' : 'Save Kit'}</span>
          </button>
          
          <div className={styles.exportDropdownGroup}>
            {canExportPDF() ? (
              <button className={styles.actionBtn} onClick={() => exportPDF(brand)}>
                <span className={styles.actionIcon}>📄</span>
                <span className={styles.actionLabel}>PDF</span>
              </button>
            ) : (
              <button className={`${styles.actionBtn} ${styles.lockedBtn}`} onClick={() => window.location.href = '/pricing'}>
                <span className={styles.actionIcon}>🔒</span>
                <span className={styles.actionLabel}>PDF (Pro)</span>
              </button>
            )}
            
            <button className={styles.actionBtn} onClick={() => exportCSV(brand)}>
              <span className={styles.actionIcon}>📊</span>
              <span className={styles.actionLabel}>CSV</span>
            </button>
            
            {canExportJSON() ? (
              <button className={styles.actionBtn} onClick={() => exportJSON(brand)}>
                <span className={styles.actionIcon}>💾</span>
                <span className={styles.actionLabel}>JSON</span>
              </button>
            ) : (
              <button className={`${styles.actionBtn} ${styles.lockedBtn}`} onClick={() => window.location.href = '/pricing'}>
                <span className={styles.actionIcon}>🔒</span>
                <span className={styles.actionLabel}>JSON (Pro)</span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.tabsScroller}>
          <div className={styles.tabs} role="tablist">
            {TABS.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tabContent} role="tabpanel">
          
          {activeTab === 'intelligence' && (
            <div className={styles.scrollArea}>
              <div className={styles.card}>
                <h3>Meaning & Psychology</h3>
                <p>{brand.intelligence.meaning}</p>
                <p><strong>Why it works:</strong> {brand.intelligence.whyItWorks}</p>
              </div>
              <div className={styles.cardGrid}>
                <div className={styles.card}>
                  <div className={styles.label}>Brand Personality</div>
                  <div className={styles.value}>{brand.intelligence.personality}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.label}>Brand Voice</div>
                  <div className={styles.value}>{brand.intelligence.brandVoice}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.label}>Target Audience</div>
                  <div className={styles.value}>{brand.intelligence.targetAudience}</div>
                </div>
              </div>
              <div className={styles.cardGrid}>
                <div className={styles.scoreCard}>
                  <div className={styles.scoreValue}>{brand.intelligence.memorabilityScore}%</div>
                  <div className={styles.scoreLabel}>Memorability</div>
                </div>
                <div className={styles.scoreCard}>
                  <div className={styles.scoreValue}>{brand.intelligence.pronunciationScore}%</div>
                  <div className={styles.scoreLabel}>Pronunciation</div>
                </div>
                <div className={styles.scoreCard}>
                  <div className={styles.scoreValue}>{brand.intelligence.uniquenessScore}%</div>
                  <div className={styles.scoreLabel}>Uniqueness</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'taglines' && (
            <div className={styles.scrollArea}>
              <p className={styles.helperText}>Click any tagline to copy it.</p>
              <div className={styles.listGroup}>
                {brand.taglines.map((t, i) => (
                  <button key={i} className={styles.listItemBtn} onClick={() => handleCopy(t)}>
                    "{t}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className={styles.scrollArea}>
              <div className={styles.card}>
                <h3>Elevator Pitch</h3>
                <p>{brand.story.elevatorPitch}</p>
              </div>
              <div className={styles.cardGrid}>
                <div className={styles.card}>
                  <h3>Mission</h3>
                  <p>{brand.story.mission}</p>
                </div>
                <div className={styles.card}>
                  <h3>Vision</h3>
                  <p>{brand.story.vision}</p>
                </div>
              </div>
              <div className={styles.card}>
                <h3>Core Values</h3>
                <div className={styles.chips}>
                  {brand.story.coreValues.map(v => <span key={v} className={styles.chip}>{v}</span>)}
                </div>
              </div>
              <div className={styles.card}>
                <h3>About Us</h3>
                <p>{brand.story.aboutUs}</p>
              </div>
            </div>
          )}

          {activeTab === 'identity' && (
            <div className={styles.scrollArea}>
              <div className={styles.card}>
                <h3>Brand Colors</h3>
                <div className={styles.colorPalette}>
                  <div className={styles.colorSwatch} style={{background: brand.identity.primaryColor}}>
                    <span>Primary</span>
                    <code>{brand.identity.primaryColor}</code>
                  </div>
                  <div className={styles.colorSwatch} style={{background: brand.identity.secondaryColor}}>
                    <span>Secondary</span>
                    <code>{brand.identity.secondaryColor}</code>
                  </div>
                  <div className={styles.colorSwatch} style={{background: brand.identity.accentColor}}>
                    <span>Accent</span>
                    <code>{brand.identity.accentColor}</code>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <h3>Typography</h3>
                <div className={styles.typePreview} style={{ fontFamily: `"${brand.typography.headingFont}", sans-serif` }}>
                  <h4>{brand.typography.headingFont}</h4>
                  <p>Heading Font</p>
                </div>
                <div className={styles.typePreview} style={{ fontFamily: `"${brand.typography.bodyFont}", sans-serif` }}>
                  <p style={{fontSize: '1.2rem'}}>{brand.typography.bodyFont}</p>
                  <p>Body Font</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logos' && (
            <div className={styles.scrollArea}>
               <p className={styles.helperText}>AI Logo Concepts to inspire your design.</p>
               <div className={styles.cardGrid}>
                  {brand.logos.map(logo => (
                    <div key={logo.id} className={styles.logoCard}>
                      <div className={styles.logoPreview} style={{ background: `linear-gradient(135deg, ${logo.colors[0]}, ${logo.colors[1]})` }}>
                        <span className={styles.logoName} style={{ fontFamily: `"${logo.typography}", sans-serif`}}>{name}</span>
                      </div>
                      <div className={styles.logoMeta}>
                        <div><strong>Icon:</strong> {logo.iconIdea}</div>
                        <div><strong>Style:</strong> {logo.style}</div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'domains' && (
            <div className={styles.scrollArea}>
              <div className={styles.card}>
                <h3>Domain Availability</h3>
                <div className={styles.domainList}>
                  {brand.domains.map(d => (
                    <div key={d.domain} className={styles.domainItem}>
                      <span className={styles.domainName}>{d.domain}</span>
                      {d.available ? (
                        <span className={styles.availBadge}>Available</span>
                      ) : (
                        <div className={styles.unavailGroup}>
                          <span className={styles.unavailBadge}>Taken</span>
                          <span className={styles.altName}>Try: {d.alternative}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.card}>
                <h3>Social Handles</h3>
                <div className={styles.domainList}>
                  {brand.socials.map(s => (
                    <div key={s.platform} className={styles.domainItem}>
                      <span className={styles.domainName}>{s.platform}</span>
                      <div className={styles.socialStatus}>
                        <span className={styles.socialHandle}>{s.handle}</span>
                        {s.available ? <span className={styles.availBadge}>✅</span> : <span className={styles.unavailBadge}>❌</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'share' && (
            <div className={styles.scrollArea}>
               <div className={styles.card}>
                 <h3>Share your Brand</h3>
                 <p>Link your new brand to the world.</p>
                 <div className={styles.quickActions} style={{marginTop: '1rem'}}>
                   <button className={styles.actionBtn} onClick={() => handleCopy(`https://uniquebusinessname.com/brand/${name}`)}>
                     <span className={styles.actionIcon}>🔗</span>
                     <span className={styles.actionLabel}>Copy Link</span>
                   </button>
                   <button className={styles.actionBtn} onClick={() => handleCopy(`I just generated ${name} using UniqueBusinessName.com!`)}>
                     <span className={styles.actionIcon}>💬</span>
                     <span className={styles.actionLabel}>Message</span>
                   </button>
                 </div>
               </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.spinAgainBtn} onClick={onSpinAgain}>
            🎡 Generate Another
          </button>
          <button className={styles.dismissBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
