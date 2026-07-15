import { useAuth } from '../context/AuthContext';
import { PlanType } from '../types';

export const PLAN_LIMITS = {
  free: {
    generationsPerDay: 20,
    brandKitsPerDay: 5,
    savedBrands: 25,
    exportPDF: false,
    exportJSON: false,
    priorityAI: false,
    ads: true
  },
  pro: {
    generationsPerDay: Infinity,
    brandKitsPerDay: Infinity,
    savedBrands: Infinity,
    exportPDF: true,
    exportJSON: true,
    priorityAI: true,
    ads: false
  },
  business: {
    generationsPerDay: Infinity,
    brandKitsPerDay: Infinity,
    savedBrands: Infinity,
    exportPDF: true,
    exportJSON: true,
    priorityAI: true,
    ads: false
  }
};

export function useSubscription() {
  const { user, isGuest } = useAuth();
  
  const plan: PlanType = user?.subscription?.plan || 'free';
  const limits = PLAN_LIMITS[plan];

  const hasReachedGenerationLimit = () => {
    if (isGuest) return false; // Guests might have local limits, but we'll enforce 20 for guests elsewhere or just let them spin
    if (plan !== 'free') return false;
    
    // Check if the daily limit is hit
    const stats = user?.stats;
    if (!stats) return false;

    const today = new Date().toISOString().split('T')[0];
    const lastGen = new Date(stats.lastGenerationDate).toISOString().split('T')[0];
    
    if (today === lastGen && stats.generationsToday >= limits.generationsPerDay) {
      return true;
    }
    return false;
  };

  const canSaveBrand = (currentSavedCount: number) => {
    return currentSavedCount < limits.savedBrands;
  };

  const canExportPDF = () => limits.exportPDF;
  const canExportJSON = () => limits.exportJSON;
  const showAds = () => limits.ads;

  const hasReachedBrandKitLimit = () => {
    if (isGuest || plan !== 'free') return false;
    // We would track this in stats.brandKitsToday. For now, mock it:
    const stats = user?.stats;
    if (!stats) return false;
    const today = new Date().toISOString().split('T')[0];
    const lastGen = new Date(stats.lastGenerationDate).toISOString().split('T')[0];
    // Reusing generationsToday as proxy if brandKitsToday isn't in DB yet
    return today === lastGen && (stats.generationsToday >= limits.brandKitsPerDay);
  };

  return {
    plan,
    limits,
    hasReachedGenerationLimit,
    hasReachedBrandKitLimit,
    canSaveBrand,
    canExportPDF,
    canExportJSON,
    showAds,
    isPro: plan === 'pro' || plan === 'business',
    isBusiness: plan === 'business'
  };
}
