/* ============================================================
   NameGenerator — Namelix Architecture AI Business Name Engine
   Search interface, 8 naming styles, temperature decoding,
   length constraints, and live domain lookup name card grid
   ============================================================ */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Heart,
  CheckCircle2,
  X,
  ArrowRight,
  TrendingUp,
  Globe,
  Layers,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  GeneratedBusinessName,
  NamingStyle,
  RandomnessLevel,
  NameLengthFilter,
  NamingFilterConfig,
  TLD,
  DomainStatus
} from '../../types';
import { generateNames, synthesizeBrandNames } from '../../engines/namingEngine';
import { useBrandState } from '../../context/BrandStateContext';
import { NameCard } from './NameCard';
import styles from './NameGenerator.module.css';

const NAMING_STYLES: { id: NamingStyle; label: string; example: string; desc: string }[] = [
  { id: 'brandable', label: 'Brandable', example: 'Google, Vroom', desc: 'Catchy, invented coinages' },
  { id: 'compound', label: 'Compound Words', example: 'FedEx, Instagram', desc: 'Two words fused seamlessly' },
  { id: 'alternate-spelling', label: 'Alt Spellings', example: 'Lyft, Flickr', desc: 'Phonetic modern variations' },
  { id: 'real-word', label: 'Real Words', example: 'Apple, Shell', desc: 'Evocative dictionary terms' },
  { id: 'rhyming', label: 'Rhyming Words', example: 'FireWire, LeanBean', desc: 'Memorable phonetic cadence' },
  { id: 'non-english', label: 'Non-English Roots', example: 'Terra, Novus', desc: 'Latin & Greek roots' },
  { id: 'multiple-words', label: 'Multiple Words', example: 'Blue Horizon, Pure Flow', desc: 'Two-word brand narratives' },
  { id: 'person-name', label: "Person's Names", example: 'Harrison, Madison', desc: 'Prestige heritage surnames' },
];

const RANDOMNESS_OPTIONS: { id: RandomnessLevel; label: string; temp: string; desc: string }[] = [
  { id: 'low', label: 'Low', temp: '0.2', desc: 'Direct, keyword-bound' },
  { id: 'medium', label: 'Medium', temp: '0.7', desc: 'Balanced creativity' },
  { id: 'high', label: 'High', temp: '1.1', desc: 'Abstract, imaginative' },
];

const LENGTH_OPTIONS: { id: NameLengthFilter; label: string; chars: string }[] = [
  { id: 'all', label: 'All Lengths', chars: 'Any' },
  { id: 'short', label: 'Short', chars: '3–6 chars' },
  { id: 'medium', label: 'Medium', chars: '6–12 chars' },
  { id: 'long', label: 'Long', chars: '12+ chars' },
];

const POPULAR_KEYWORDS = [
  'AI Tech', 'SaaS Platform', 'Coffee Shop', 'Eco Green', 'Fintech',
  'Health & Yoga', 'Luxury Fashion', 'Cybersecurity', 'Modern Studio'
];

export const NameGenerator: React.FC = () => {
  const {
    savedNames,
    removeSavedName,
    isSavedDrawerOpen,
    setIsSavedDrawerOpen,
    preferenceWeights,
    createLogoWithName
  } = useBrandState();

  const [keywords, setKeywords] = useState<string>('cloud analytics');
  const [selectedStyle, setSelectedStyle] = useState<NamingStyle>('brandable');
  const [randomness, setRandomness] = useState<RandomnessLevel>('medium');
  const [lengthFilter, setLengthFilter] = useState<NameLengthFilter>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [names, setNames] = useState<GeneratedBusinessName[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationCount, setGenerationCount] = useState<number>(0);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Callback to update domain availability on individual cards asynchronously
  const handleDomainUpdate = useCallback((nameId: string, domainMap: Record<TLD, DomainStatus>) => {
    setNames(prev => prev.map(item => {
      if (item.id === nameId) {
        return { ...item, domains: domainMap };
      }
      return item;
    }));
  }, []);

  const runGeneration = useCallback(async (queryKeywords?: string) => {
    const activeKeywords = queryKeywords !== undefined ? queryKeywords : keywords;
    if (!activeKeywords.trim()) return;

    setIsGenerating(true);

    const config: NamingFilterConfig = {
      keywords: activeKeywords,
      style: selectedStyle,
      randomness,
      length: lengthFilter
    };

    try {
      const generated = await generateNames(config, preferenceWeights, handleDomainUpdate);
      setNames(generated);
      setGenerationCount(c => c + 1);

      if (generationCount === 0) {
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.85 }
          });
        } catch {}
      }
    } catch (err) {
      console.error('Generation error:', err);
      // Fallback
      const fallbackNames = synthesizeBrandNames(config, preferenceWeights, 24);
      setNames(fallbackNames);
    } finally {
      setIsGenerating(false);
    }
  }, [keywords, selectedStyle, randomness, lengthFilter, preferenceWeights, handleDomainUpdate, generationCount]);

  // Initial load generation
  useEffect(() => {
    runGeneration('cloud analytics');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runGeneration();
  };

  const handleKeywordTagClick = (tag: string) => {
    setKeywords(tag);
    runGeneration(tag);
  };

  return (
    <section className={styles.generatorRoot} id="name-generator-section">
      {/* Search Header Container */}
      <div className={styles.searchHero}>
        <div className={styles.badgeWrap}>
          <span className={styles.heroBadge}>
            <Sparkles size={14} /> AI Brand Engine
          </span>
          <span className={styles.subBadge}>Namelix-Grade Architecture</span>
        </div>

        <h1 className={styles.mainTitle}>
          AI Business Name Generator
        </h1>
        <p className={styles.mainSubtitle}>
          Generate catchy, brandable, high-conversion company names with instant domain checks and automated logo creation.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <Search className={styles.searchIcon} size={22} />
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords or business concept (e.g. cloud, cafe, finance)..."
              aria-label="Business keywords input"
              id="name-generator-input"
            />
            {keywords && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setKeywords('')}
                aria-label="Clear input"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className={styles.actionButtons}>
            <button
              type="button"
              className={`${styles.filterToggleBtn} ${showFilters ? styles.filterToggleActive : ''}`}
              onClick={() => setShowFilters(f => !f)}
              aria-label="Toggle naming filters"
              id="toggle-filters-btn"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isGenerating || !keywords.trim()}
              id="generate-names-submit-btn"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={18} className={styles.spinner} />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  <span>Generate Names</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Popular Keyword Suggestions */}
        <div className={styles.quickTags}>
          <span className={styles.quickTagsLabel}>Popular Ideas:</span>
          {POPULAR_KEYWORDS.map(tag => (
            <button
              key={tag}
              type="button"
              className={styles.tagBtn}
              onClick={() => handleKeywordTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Axis Filter Matrix Controls (Collapsible or Always Active) */}
      <div className={`${styles.filterMatrix} ${showFilters ? styles.filterMatrixOpen : ''}`}>
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <Layers size={16} />
            <span>1. Naming Style Taxonomy (8 Categories)</span>
          </div>
          <div className={styles.stylePills}>
            {NAMING_STYLES.map(st => (
              <button
                key={st.id}
                type="button"
                className={`${styles.stylePill} ${selectedStyle === st.id ? styles.stylePillActive : ''}`}
                onClick={() => {
                  setSelectedStyle(st.id);
                  runGeneration();
                }}
              >
                <span className={styles.stylePillLabel}>{st.label}</span>
                <span className={styles.stylePillExample}>{st.example}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterRowTwo}>
          {/* Randomness / Temperature */}
          <div className={styles.subFilterGroup}>
            <div className={styles.filterGroupHeader}>
              <TrendingUp size={16} />
              <span>2. Generation Randomness (Decoding Temperature)</span>
            </div>
            <div className={styles.segmentedControl}>
              {RANDOMNESS_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.segmentBtn} ${randomness === opt.id ? styles.segmentBtnActive : ''}`}
                  onClick={() => {
                    setRandomness(opt.id);
                    runGeneration();
                  }}
                >
                  <span className={styles.segmentTitle}>{opt.label}</span>
                  <span className={styles.segmentTemp}>Temp {opt.temp}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Length Filter */}
          <div className={styles.subFilterGroup}>
            <div className={styles.filterGroupHeader}>
              <Globe size={16} />
              <span>3. String Length Filter</span>
            </div>
            <div className={styles.segmentedControl}>
              {LENGTH_OPTIONS.map(len => (
                <button
                  key={len.id}
                  type="button"
                  className={`${styles.segmentBtn} ${lengthFilter === len.id ? styles.segmentBtnActive : ''}`}
                  onClick={() => {
                    setLengthFilter(len.id);
                    runGeneration();
                  }}
                >
                  <span className={styles.segmentTitle}>{len.label}</span>
                  <span className={styles.segmentTemp}>{len.chars}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header Bar */}
      <div className={styles.resultsBar}>
        <div className={styles.resultsCount}>
          <span>Showing <strong>{names.length}</strong> brandable name ideas for &ldquo;{keywords}&rdquo;</span>
        </div>

        <div className={styles.resultsActions}>
          <button
            type="button"
            className={styles.savedDrawerTrigger}
            onClick={() => setIsSavedDrawerOpen(true)}
            id="view-saved-names-btn"
          >
            <Heart size={16} fill={savedNames.length > 0 ? '#EF4444' : 'none'} color={savedNames.length > 0 ? '#EF4444' : 'currentColor'} />
            <span>Saved Names</span>
            {savedNames.length > 0 && (
              <span className={styles.savedBadge}>{savedNames.length}</span>
            )}
          </button>

          <button
            type="button"
            className={styles.refreshBtn}
            onClick={() => runGeneration()}
            disabled={isGenerating}
            title="Generate more variations"
          >
            <RefreshCw size={15} className={isGenerating ? styles.spinner : ''} />
            <span>Shuffle &amp; Generate More</span>
          </button>
        </div>
      </div>

      {/* Name Cards Grid */}
      <div className={styles.nameGrid}>
        {names.map(item => (
          <NameCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {names.length === 0 && !isGenerating && (
        <div className={styles.emptyState}>
          <p>No names found matching your filter combination. Try adjusting the length or naming style.</p>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => {
              setLengthFilter('all');
              setSelectedStyle('brandable');
              runGeneration('modern brand');
            }}
          >
            Reset Filters &amp; Search
          </button>
        </div>
      )}

      {/* Saved Names Slide-Over Drawer */}
      {isSavedDrawerOpen && (
        <>
          <div
            className={styles.drawerBackdrop}
            onClick={() => setIsSavedDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className={styles.savedDrawer} aria-label="Saved Names Drawer">
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitleWrap}>
                <Heart size={20} fill="#EF4444" color="#EF4444" />
                <h2 className={styles.drawerTitle}>Saved Brand Names ({savedNames.length})</h2>
              </div>
              <button
                type="button"
                className={styles.closeDrawerBtn}
                onClick={() => setIsSavedDrawerOpen(false)}
                aria-label="Close saved drawer"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {savedNames.length === 0 ? (
                <div className={styles.emptyDrawer}>
                  <Heart size={36} className={styles.emptyHeartIcon} />
                  <p className={styles.emptyDrawerText}>
                    No saved names yet. Click the heart icon on any card to save names to your shortlist!
                  </p>
                </div>
              ) : (
                <div className={styles.savedList}>
                  {savedNames.map(item => (
                    <div key={item.id} className={styles.savedItem}>
                      <div className={styles.savedItemInfo}>
                        <h4 className={styles.savedItemName}>{item.name}</h4>
                        <span className={styles.savedItemPhonetic}>[{item.phonetic}]</span>
                        <p className={styles.savedItemMeaning}>{item.meaning}</p>
                      </div>

                      <div className={styles.savedItemActions}>
                        <button
                          type="button"
                          className={styles.savedCreateLogoBtn}
                          onClick={() => {
                            setIsSavedDrawerOpen(false);
                            createLogoWithName(item.name, item.meaning);
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Create Logo</span>
                        </button>
                        <button
                          type="button"
                          className={styles.removeSavedBtn}
                          onClick={() => removeSavedName(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </section>
  );
};
