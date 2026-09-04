/* ============================================================
   NameGenerator — AI Business Name Discovery Engine
   Morphological synthesis, 8 styles, temperature controls,
   and real-time asynchronous domain checking
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
import { generateNames, synthesizeBrandNames, INDUSTRY_CATEGORIES } from '../../engines/namingEngine';
import { useBrandState } from '../../context/BrandStateContext';
import { NameCard } from './NameCard';
import styles from './NameGenerator.module.css';

export interface GenerationBatch {
  id: string;
  timestamp: number;
  keywords: string;
  category: string;
  categoryLabel: string;
  style: NamingStyle;
  names: GeneratedBusinessName[];
}

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
  'AI Tech', 'Indian Startup', 'SaaS Platform', 'Free Logo Ideas', 'Coffee Shop', 
  'Eco Green', 'Fintech', 'Health & Yoga', 'Luxury Fashion', 'Cybersecurity'
];

export interface NameGeneratorProps {
  initialKeywords?: string;
  initialStyle?: NamingStyle;
  initialCategory?: string;
}

export const NameGenerator: React.FC<NameGeneratorProps> = ({ initialKeywords, initialStyle, initialCategory }) => {
  const {
    savedNames,
    removeSavedName,
    isSavedDrawerOpen,
    setIsSavedDrawerOpen,
    preferenceWeights,
    createLogoWithName
  } = useBrandState();

  const [keywords, setKeywords] = useState<string>(initialKeywords || 'cloud analytics');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedStyle, setSelectedStyle] = useState<NamingStyle>(initialStyle || 'brandable');
  const [randomness, setRandomness] = useState<RandomnessLevel>('medium');
  const [lengthFilter, setLengthFilter] = useState<NameLengthFilter>('all');
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const [names, setNames] = useState<GeneratedBusinessName[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationCount, setGenerationCount] = useState<number>(0);

  // Refine, don't restart: store previous batches so prior suggestions are preserved
  const [previousBatches, setPreviousBatches] = useState<GenerationBatch[]>([]);
  const [showPreviousSuggestions, setShowPreviousSuggestions] = useState<boolean>(true);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentKeywordsRef = useRef<string>(keywords);
  currentKeywordsRef.current = keywords;

  // Callback to update domain availability on individual cards asynchronously
  const handleDomainUpdate = useCallback((nameId: string, domainMap: Record<TLD, DomainStatus>) => {
    setNames(prev => prev.map(item => {
      if (item.id === nameId) {
        return { ...item, domains: domainMap };
      }
      return item;
    }));

    setPreviousBatches(prevBatches => prevBatches.map(batch => ({
      ...batch,
      names: batch.names.map(item => item.id === nameId ? { ...item, domains: domainMap } : item)
    })));
  }, []);

  const runGeneration = useCallback(async (queryKeywords?: string, queryCategory?: string) => {
    const activeKeywords = queryKeywords !== undefined ? queryKeywords : keywords;
    const activeCategory = queryCategory !== undefined ? queryCategory : selectedCategory;
    if (!activeKeywords.trim()) return;

    setIsGenerating(true);

    const config: NamingFilterConfig = {
      keywords: activeKeywords,
      style: selectedStyle,
      randomness,
      length: lengthFilter,
      industry: activeCategory
    };

    try {
      const generated = await generateNames(config, preferenceWeights, handleDomainUpdate);

      // Preserve previous batch before replacing
      if (names.length > 0) {
        const catLabel = INDUSTRY_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'All Industries';
        setPreviousBatches(prev => [
          {
            id: `batch-${Date.now()}`,
            timestamp: Date.now(),
            keywords: currentKeywordsRef.current,
            category: selectedCategory,
            categoryLabel: catLabel,
            style: selectedStyle,
            names: [...names]
          },
          ...prev.slice(0, 4) // Retain last 5 batches
        ]);
      }

      setNames(generated);
      setVisibleCount(12);
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
      const fallbackNames = synthesizeBrandNames(config, preferenceWeights, 30);
      setNames(fallbackNames);
      setVisibleCount(12);
    } finally {
      setIsGenerating(false);
    }
  }, [keywords, selectedCategory, selectedStyle, randomness, lengthFilter, preferenceWeights, handleDomainUpdate, generationCount, names]);

  // Initial load generation
  useEffect(() => {
    runGeneration('cloud analytics', 'all');
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    runGeneration(keywords, categoryId);
  };

  const handleRestoreBatch = (batch: GenerationBatch) => {
    setNames(batch.names);
    setKeywords(batch.keywords);
    setSelectedCategory(batch.category);
    setSelectedStyle(batch.style);
    setVisibleCount(12);
  };

  return (
    <section className={styles.generatorRoot} id="name-generator-section">
      {/* Search Header Container */}
      <div className={styles.searchHero}>
        <h1 className={styles.mainTitle}>
          Distinctive business names, built with identity.
        </h1>
        <p className={styles.mainSubtitle}>
          Generate evocative brand names, verify domain availability in real time, and preview complete vector identities on production mockups.
        </p>

        {/* Search Input Bar with Industry Category Selector */}
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          {/* Category Dropdown */}
          <div className={styles.categoryDropdownWrap}>
            <label htmlFor="industry-category-select" className={styles.categoryDropdownLabel}>Industry</label>
            <select
              id="industry-category-select"
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className={styles.categorySelect}
              aria-label="Select industry category"
            >
              {INDUSTRY_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputDivider} />

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

        {/* Industry Category Quick-Pills */}
        <div className={styles.categoryQuickPills} role="group" aria-label="Quick Industry Filter">
          <span className={styles.quickTagsLabel}>Industries:</span>
          {INDUSTRY_CATEGORIES.slice(0, 10).map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryPill} ${selectedCategory === cat.id ? styles.categoryPillActive : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
              aria-pressed={selectedCategory === cat.id}
            >
              <span className={styles.categoryPillIcon}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

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
      <div className={`${styles.filterMatrix} ${showFilters ? styles.filterMatrixOpen : styles.filterMatrixCollapsed}`}>
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <div className={styles.headerTitleWrap}>
              <span className={styles.headerIconBadge} style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' }}>
                <Layers size={15} />
              </span>
              <span className={styles.filterSectionTitle}>1. Naming Style Taxonomy</span>
            </div>
            <span className={styles.filterSubtext}>8 AI Generation Archetypes</span>
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
              <div className={styles.headerTitleWrap}>
                <span className={styles.headerIconBadge} style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' }}>
                  <TrendingUp size={15} />
                </span>
                <span className={styles.filterSectionTitle}>2. Generation Randomness</span>
              </div>
              <span className={styles.filterSubtext}>Decoding Temperature</span>
            </div>
            <div className={styles.segmentedControl}>
              {RANDOMNESS_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  data-randomness={opt.id}
                  className={`${styles.segmentBtn} ${styles[`rand_${opt.id}`]} ${randomness === opt.id ? styles.segmentBtnActive : ''}`}
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
              <div className={styles.headerTitleWrap}>
                <span className={styles.headerIconBadge} style={{ background: 'rgba(14, 165, 233, 0.12)', color: '#0EA5E9' }}>
                  <Globe size={15} />
                </span>
                <span className={styles.filterSectionTitle}>3. String Length Filter</span>
              </div>
              <span className={styles.filterSubtext}>Character Count</span>
            </div>
            <div className={styles.segmentedControl}>
              {LENGTH_OPTIONS.map(len => (
                <button
                  key={len.id}
                  type="button"
                  data-length={len.id}
                  className={`${styles.segmentBtn} ${styles[`len_${len.id}`]} ${lengthFilter === len.id ? styles.segmentBtnActive : ''}`}
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
          <span className={styles.resultsCountBadge}>{names.length} Ideas</span>
          <span>
            Brandable names for <span className={styles.resultsKeywordHighlight}>&ldquo;{keywords}&rdquo;</span>
            {selectedCategory !== 'all' && (
              <span className={styles.categoryHighlightBadge}>
                &bull; {INDUSTRY_CATEGORIES.find(c => c.id === selectedCategory)?.label}
              </span>
            )}
          </span>
        </div>

        <div className={styles.resultsActions}>
          <button
            type="button"
            className={styles.savedDrawerTrigger}
            onClick={() => setIsSavedDrawerOpen(true)}
            id="view-saved-names-btn"
          >
            <Heart size={16} fill={savedNames.length > 0 ? '#EF4444' : 'none'} color={savedNames.length > 0 ? '#EF4444' : '#DC2626'} />
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
            title="Refine and generate more variations"
          >
            <RefreshCw size={15} className={isGenerating ? styles.spinner : ''} />
            <span>Shuffle &amp; Regenerate</span>
          </button>
        </div>
      </div>

      {/* Name Cards Grid (Showing visibleCount of 30) */}
      <div className={styles.nameGrid}>
        {names.slice(0, visibleCount).map((item, index) => (
          <NameCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Load More Pagination */}
      {names.length > visibleCount && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={() => setVisibleCount(c => Math.min(names.length, c + 12))}
            id="load-more-names-btn"
          >
            <span>Load More Names ({names.length - visibleCount} remaining)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Refine, don't restart: Previous Suggestions Section */}
      {previousBatches.length > 0 && (
        <div className={styles.previousSection}>
          <div className={styles.previousHeader}>
            <button
              type="button"
              className={styles.previousToggleBtn}
              onClick={() => setShowPreviousSuggestions(p => !p)}
              aria-expanded={showPreviousSuggestions}
            >
              <span className={styles.previousClockIcon}>🕒</span>
              <span className={styles.previousTitle}>
                Previous Suggestions ({previousBatches.reduce((acc, b) => acc + b.names.length, 0)} names from {previousBatches.length} search{previousBatches.length > 1 ? 'es' : ''})
              </span>
              <span className={styles.previousToggleState}>
                {showPreviousSuggestions ? '▲ Hide' : '▼ View'}
              </span>
            </button>
            <button
              type="button"
              className={styles.clearHistoryBtn}
              onClick={() => setPreviousBatches([])}
              title="Clear previous search history"
            >
              Clear History
            </button>
          </div>

          {showPreviousSuggestions && (
            <div className={styles.previousBatchesContainer}>
              {previousBatches.map(batch => (
                <div key={batch.id} className={styles.previousBatchCard}>
                  <div className={styles.previousBatchMeta}>
                    <div className={styles.previousBatchInfo}>
                      <span className={styles.batchKeywords}>&ldquo;{batch.keywords}&rdquo;</span>
                      <span className={styles.batchCategoryBadge}>{batch.categoryLabel}</span>
                      <span className={styles.batchStyleBadge}>{batch.style}</span>
                      <span className={styles.batchCountBadge}>{batch.names.length} ideas</span>
                    </div>
                    <button
                      type="button"
                      className={styles.restoreBatchBtn}
                      onClick={() => handleRestoreBatch(batch)}
                      title="Restore this search to active results"
                    >
                      Restore This Batch
                    </button>
                  </div>
                  <div className={styles.previousBatchGrid}>
                    {batch.names.slice(0, 6).map(item => (
                      <NameCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
