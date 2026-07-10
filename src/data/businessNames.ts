export type BusinessCategory = 'restaurant' | 'bakery' | 'tech' | 'consulting' | 'ecommerce' | 'salon' | 'fitness';

export interface CategoryData {
  id: BusinessCategory;
  label: string;
  icon: string;
  names: string[];
}

export const BUSINESS_CATEGORIES: CategoryData[] = [
  {
    id: 'restaurant',
    label: 'Restaurant / Food',
    icon: '🍽️',
    names: [
      'Feastopia', 'DineMingle', 'UrbanCrave', 'FlavorNest', 'AromaHarbor',
      'BistroBlend', 'PalatePulse', 'SavorLane', 'TableTide', 'CraveCanvas',
      'TasteTrail', 'YumFusion', 'FlavorVista', 'MealMuse', 'EpicureEase',
      'DishDelight', 'SpiceSphere', 'ForkFlair', 'DineDream', 'MenuMingle',
    ],
  },
  {
    id: 'bakery',
    label: 'Bakery / Café',
    icon: '🧁',
    names: [
      'CrumbCraft', 'BakeBloom', 'SweetForge', 'DoughDuo', 'FlourishCafe',
      'MorningCrust', 'BakersBounty', 'KneadNest', 'SugarSip', 'OvenAura',
      'YeastYard', 'RiseRoost', 'ToastyTreat', 'MugMatters', 'JavaBlend',
      'BrewBerry', 'CrustCorner', 'LatteLeaf', 'PaniniPick', 'ChillBrew',
    ],
  },
  {
    id: 'tech',
    label: 'Tech / Startup',
    icon: '💻',
    names: [
      'ByteWave', 'NexaCore', 'InnoVista', 'TechTide', 'QuantumLyft',
      'CodeNest', 'PixelPulse', 'DataDrift', 'LogicLeap', 'CyberHive',
      'NetNimble', 'CloudQuark', 'SyncPath', 'SmartFlux', 'ZenTech',
      'AlgoArc', 'VirtuCore', 'AppApex', 'BlueCircuit', 'NimbiSoft',
    ],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    icon: '📊',
    names: [
      'InsightWorks', 'StratEdge', 'GuideBeacon', 'ApexAdvisors', 'ClarityCrest',
      'PrimeCounsel', 'VisionaryOps', 'BeaconBridge', 'PivotPartners', 'CoreConsult',
      'BrainLens', 'WiseBridge', 'SavvySense', 'PraxisPoint', 'EliteStrategy',
      'InnoviAdvisors', 'MentorMatrix', 'SummitWise', 'Planarium', 'StratoSolve',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    icon: '🛒',
    names: [
      'ShopSphere', 'ClickCartel', 'TrendFusion', 'MarketNest', 'BuyHive',
      'CartCrafters', 'DealDrift', 'MegaMart', 'FlashSalesHQ', 'NovaShops',
      'BuzzCart', 'QuickDealio', 'OmniCommerce', 'EShopia', 'WebWagon',
      'PixelCart', 'GlobeGoods', 'StreamShop', 'SaleDash', 'CartConnect',
    ],
  },
  {
    id: 'salon',
    label: 'Salon / Beauty',
    icon: '💇',
    names: [
      'GlamourTree', 'StyleNest', 'ChromaSalon', 'VelvetGlow', 'ChicLane',
      'ManeMuse', 'PurePolish', 'BeautyAura', 'LuxeLocks', 'SilkShear',
      'GlossGarden', 'TrendTress', 'OpalSpa', 'MirrorMane', 'AuraShears',
      'CharmCove', 'GlowTrend', 'LuxeDiva', 'FlareSalon', 'IconixBeauty',
    ],
  },
  {
    id: 'fitness',
    label: 'Fitness / Gym',
    icon: '💪',
    names: [
      'PulsePeak', 'FitForge', 'CoreMotion', 'FlexHive', 'GrindGym',
      'ZenFitHub', 'EnduraCore', 'VitalStride', 'IronNest', 'LiftLab',
      'BodyBloom', 'CardioCube', 'StaminaSpace', 'PowerPeak', 'MuscleMinds',
      'TrainTrail', 'FitFoundry', 'RunRidge', 'ZenZest', 'GymGenius',
    ],
  },
];

/**
 * Returns `count` randomly selected names from the array using Fisher-Yates shuffle.
 * No duplicates will be returned.
 */
export function getRandomSubset(names: string[], count: number): string[] {
  const shuffled = [...names];
  const len = shuffled.length;
  const result: string[] = [];
  const limit = Math.min(count, len);

  for (let i = len - 1; i >= len - limit; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    result.push(shuffled[i]);
  }

  return result;
}
