/* ============================================================
   BrandStateContext — Unified State Bridge between
   Name Generator & Logo Creator Suite
   ============================================================ */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GeneratedBusinessName, NamingStyle } from '../types';
import { Industry, GeneratedLogo } from '../types/logoMaker';

interface BrandStateContextValue {
  activeTab: 'name-generator' | 'logo-creator';
  setActiveTab: (tab: 'name-generator' | 'logo-creator') => void;
  
  // Active Brand Data Bridge
  activeBrandName: string;
  setActiveBrandName: (name: string) => void;
  activeTagline: string;
  setActiveTagline: (tagline: string) => void;
  activeIndustry: Industry;
  setActiveIndustry: (industry: Industry) => void;
  
  // Saved Names Collection & Preference Vector Loop
  savedNames: GeneratedBusinessName[];
  saveName: (name: GeneratedBusinessName) => void;
  removeSavedName: (id: string) => void;
  isNameSaved: (id: string) => boolean;
  preferenceWeights: Record<NamingStyle, number>;
  
  // Logo Wizard Step State
  logoWizardStep: 1 | 2 | 3 | 4 | 5 | 6;
  setLogoWizardStep: (step: 1 | 2 | 3 | 4 | 5 | 6) => void;
  
  // Saved Logos Collection
  savedLogos: GeneratedLogo[];
  saveLogo: (logo: GeneratedLogo) => void;
  removeSavedLogo: (id: string) => void;
  
  // UI Drawers
  isSavedDrawerOpen: boolean;
  setIsSavedDrawerOpen: (open: boolean) => void;
  
  // 1-Click State Bridge Action
  createLogoWithName: (name: string, tagline?: string, industry?: Industry) => void;
}

const STORAGE_KEY_SAVED_NAMES = 'ubn_saved_names_v2';
const STORAGE_KEY_SAVED_LOGOS = 'ubn_saved_logos_v2';
const STORAGE_KEY_PREFERENCES = 'ubn_preference_weights_v2';
const STORAGE_KEY_ACTIVE_BRAND = 'ubn_active_brand_state';

const DEFAULT_PREFERENCES: Record<NamingStyle, number> = {
  'brandable': 1,
  'compound': 1,
  'alternate-spelling': 1,
  'real-word': 1,
  'rhyming': 1,
  'non-english': 1,
  'multiple-words': 1,
  'person-name': 1,
};

const BrandStateContext = createContext<BrandStateContextValue | undefined>(undefined);

export const BrandStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'name-generator' | 'logo-creator'>('name-generator');
  const [activeBrandName, setActiveBrandName] = useState<string>('');
  const [activeTagline, setActiveTagline] = useState<string>('');
  const [activeIndustry, setActiveIndustry] = useState<Industry>('technology');
  const [logoWizardStep, setLogoWizardStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);

  // Saved collections loaded from LocalStorage
  const [savedNames, setSavedNames] = useState<GeneratedBusinessName[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED_NAMES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [savedLogos, setSavedLogos] = useState<GeneratedLogo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED_LOGOS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [preferenceWeights, setPreferenceWeights] = useState<Record<NamingStyle, number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFERENCES);
      return raw ? { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Restore active brand session if present
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACTIVE_BRAND);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.name) setActiveBrandName(data.name);
        if (data.tagline) setActiveTagline(data.tagline);
        if (data.industry) setActiveIndustry(data.industry);
      }
    } catch {}
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_NAMES, JSON.stringify(savedNames));
    } catch {}
  }, [savedNames]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_LOGOS, JSON.stringify(savedLogos));
    } catch {}
  }, [savedLogos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferenceWeights));
    } catch {}
  }, [preferenceWeights]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_ACTIVE_BRAND,
        JSON.stringify({ name: activeBrandName, tagline: activeTagline, industry: activeIndustry })
      );
    } catch {}
  }, [activeBrandName, activeTagline, activeIndustry]);

  const saveName = useCallback((nameItem: GeneratedBusinessName) => {
    setSavedNames(prev => {
      if (prev.some(item => item.name.toLowerCase() === nameItem.name.toLowerCase())) {
        return prev;
      }
      return [{ ...nameItem, isSaved: true }, ...prev];
    });

    // Update preference vector to bias subsequent generations towards liked styles
    setPreferenceWeights(prev => ({
      ...prev,
      [nameItem.style]: (prev[nameItem.style] || 1) + 1.2,
    }));
  }, []);

  const removeSavedName = useCallback((id: string) => {
    setSavedNames(prev => prev.filter(item => item.id !== id && item.name !== id));
  }, []);

  const isNameSaved = useCallback((idOrName: string) => {
    return savedNames.some(item => item.id === idOrName || item.name.toLowerCase() === idOrName.toLowerCase());
  }, [savedNames]);

  const saveLogo = useCallback((logo: GeneratedLogo) => {
    setSavedLogos(prev => {
      if (prev.some(l => l.id === logo.id)) return prev;
      return [logo, ...prev];
    });
  }, []);

  const removeSavedLogo = useCallback((id: string) => {
    setSavedLogos(prev => prev.filter(l => l.id !== id));
  }, []);

  // 1-Click Bridge: From Name Generator card directly into Logo Wizard
  const createLogoWithName = useCallback((name: string, tagline?: string, industry?: Industry) => {
    setActiveBrandName(name);
    if (tagline !== undefined) setActiveTagline(tagline);
    if (industry !== undefined) setActiveIndustry(industry);
    setLogoWizardStep(1);
    setActiveTab('logo-creator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <BrandStateContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeBrandName,
        setActiveBrandName,
        activeTagline,
        setActiveTagline,
        activeIndustry,
        setActiveIndustry,
        savedNames,
        saveName,
        removeSavedName,
        isNameSaved,
        preferenceWeights,
        logoWizardStep,
        setLogoWizardStep,
        savedLogos,
        saveLogo,
        removeSavedLogo,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        createLogoWithName,
      }}
    >
      {children}
    </BrandStateContext.Provider>
  );
};

export function useBrandState() {
  const context = useContext(BrandStateContext);
  if (!context) {
    throw new Error('useBrandState must be used within a BrandStateProvider');
  }
  return context;
}
