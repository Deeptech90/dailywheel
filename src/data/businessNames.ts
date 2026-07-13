// ============================================================
// Business Categories Data — 40 Categories, 20 Names Each
// ============================================================

export type BusinessCategory =
  | 'restaurant' | 'cafe' | 'bakery' | 'fashion' | 'tech'
  | 'startup' | 'real_estate' | 'construction' | 'fitness' | 'healthcare'
  | 'beauty' | 'jewelry' | 'finance' | 'consulting' | 'education'
  | 'travel' | 'youtube' | 'podcast' | 'gaming' | 'ai_startup'
  | 'ecommerce' | 'crypto' | 'interior_design' | 'photography' | 'marketing'
  | 'cleaning' | 'pet' | 'events' | 'home_decor' | 'auto'
  | 'law' | 'dental' | 'medical' | 'gym' | 'furniture'
  | 'hotel' | 'resort' | 'salon' | 'spa' | 'barber';

export interface CategoryData {
  id: BusinessCategory;
  label: string;
  icon: string;
  description: string;
  gradient: [string, string]; // CSS color pair [from, to]
  popular?: boolean;
  names: string[];
}

export const BUSINESS_CATEGORIES: CategoryData[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: '🍽️',
    description: 'Food & dining experiences',
    gradient: ['#FF6B35', '#F7931E'],
    popular: true,
    names: [
      'Feastopia','DineMingle','UrbanCrave','FlavorNest','AromaHarbor',
      'BistroBlend','PalatePulse','SavorLane','TableTide','CraveCanvas',
      'TasteTrail','YumFusion','FlavorVista','MealMuse','EpicureEase',
      'DishDelight','SpiceSphere','ForkFlair','DineDream','MenuMingle',
    ],
  },
  {
    id: 'cafe',
    label: 'Cafe',
    icon: '☕',
    description: 'Coffee shops & cafés',
    gradient: ['#8B5E3C', '#C9883A'],
    names: [
      'BrewMuse','SipSphere','CafeNova','MomentMug','BeanBliss',
      'LatteLane','CupCraft','RoastRoute','SteamScene','AromaticNook',
      'FoamFable','PourPath','BrewHarbor','CuppaNest','MochaMingle',
      'EspressoEra','CafeCanvas','SipSaga','GrindGarden','BlendBase',
    ],
  },
  {
    id: 'bakery',
    label: 'Bakery',
    icon: '🥐',
    description: 'Baked goods & pastries',
    gradient: ['#E8A598', '#F4C5A1'],
    names: [
      'CrumbCraft','BakeBloom','SweetForge','DoughDuo','FlourishCafe',
      'MorningCrust','BakersBounty','KneadNest','SugarSip','OvenAura',
      'YeastYard','RiseRoost','ToastyTreat','MugMatters','JavaBlend',
      'BrewBerry','CrustCorner','LatteLeaf','PaniniPick','ChillBrew',
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: '👗',
    description: 'Clothing & lifestyle brands',
    gradient: ['#9B59B6', '#E91E8C'],
    popular: true,
    names: [
      'ThreadTide','VoguVista','StitchSphere','HauteLine','FabricFable',
      'TrendThread','StyleSurge','WeavWave','CoutureCore','DrapeDrift',
      'PatternPeak','LoomLane','SeamScene','TextileTide','ChicCircuit',
      'FashFusion','WardrobeWave','LuxeLayer','RunwayRoot','DressDrift',
    ],
  },
  {
    id: 'tech',
    label: 'Technology',
    icon: '💻',
    description: 'Software & tech companies',
    gradient: ['#2563EB', '#06B6D4'],
    popular: true,
    names: [
      'ByteWave','NexaCore','InnoVista','TechTide','QuantumLyft',
      'CodeNest','PixelPulse','DataDrift','LogicLeap','CyberHive',
      'NetNimble','CloudQuark','SyncPath','SmartFlux','ZenTech',
      'AlgoArc','VirtuCore','AppApex','BlueCircuit','NimbiSoft',
    ],
  },
  {
    id: 'startup',
    label: 'Startup',
    icon: '🚀',
    description: 'Innovative new ventures',
    gradient: ['#7C3AED', '#3B82F6'],
    popular: true,
    names: [
      'LaunchLift','PivotPath','VentureVine','ScaleSpark','MomentumMesh',
      'FounderForge','IdeaIgnite','RunwayRise','TractionTide','GrowthGrid',
      'SprintSphere','AgileArc','IteratIQ','BuildBurst','PitchPoint',
      'FundFlow','DisruptDen','NovaNest','BreakthroughBase','StartSurge',
    ],
  },
  {
    id: 'real_estate',
    label: 'Real Estate',
    icon: '🏠',
    description: 'Property & housing services',
    gradient: ['#059669', '#34D399'],
    names: [
      'NestNova','HomeCraft','DwellDrift','PropertyPeak','RealtySphere',
      'AbordeArc','EstateEdge','LandLoft','HabitatHub','ResidenceRise',
      'PropPath','VillaVista','TerraThread','KeystoneKraft','PremierPlace',
      'RoofReach','FoundationFair','AddressAura','ListingLane','PlotPoint',
    ],
  },
  {
    id: 'construction',
    label: 'Construction',
    icon: '🏗️',
    description: 'Building & infrastructure',
    gradient: ['#D97706', '#F59E0B'],
    names: [
      'BuildBridge','StructureSurge','FrameForge','FoundationFlex','CraftCrew',
      'ConcreteCore','SteelStream','ArchitectArc','BlueprintBase','ProjectPeak',
      'SiteSphere','MasonMesh','TrussTrail','BeamBlend','GradeGrid',
      'ConstructCraft','SolidSet','PlanPivot','BuildBurst','ElevateEdge',
    ],
  },
  {
    id: 'fitness',
    label: 'Fitness',
    icon: '💪',
    description: 'Health & workout brands',
    gradient: ['#DC2626', '#F97316'],
    popular: true,
    names: [
      'PulsePeak','FitForge','CoreMotion','FlexHive','GrindGym',
      'ZenFitHub','EnduraCore','VitalStride','IronNest','LiftLab',
      'BodyBloom','CardioCube','StaminaSpace','PowerPeak','MuscleMinds',
      'TrainTrail','FitFoundry','RunRidge','ZenZest','GymGenius',
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: '⚕️',
    description: 'Medical & wellness services',
    gradient: ['#0D9488', '#06B6D4'],
    names: [
      'CareCore','VitalVine','MedMesh','HealthHive','CurePath',
      'WellnessWave','HealHub','ClinicCraft','NurtureNest','PulsePlus',
      'CareBridge','VitaCare','MendMuse','RemedyRise','TreatTrail',
      'HealthHarbor','CliniqCore','WellWard','MedNova','CareCanvas',
    ],
  },
  {
    id: 'beauty',
    label: 'Beauty',
    icon: '💄',
    description: 'Cosmetics & personal care',
    gradient: ['#DB2777', '#F472B6'],
    popular: true,
    names: [
      'GlowCraft','BlushBlend','BeautyBurst','RadianceRise','LumineLane',
      'VelvetVibe','PrismPetal','ShimmerSphere','RoseRoot','GleamGrid',
      'GlazingGlow','AllurAura','PorePoint','FlawlessForge','BeauBloom',
      'TintTrail','PigmentPath','BlusherBase','GlowGrid','LuxeLuster',
    ],
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    icon: '💍',
    description: 'Gems, accessories & luxury',
    gradient: ['#B45309', '#D97706'],
    names: [
      'GemGlow','CrystalCraft','JewelJunction','SparkSphere','CaclCrown',
      'GoldGrain','DiamondDrift','PreciousPath','GemGrid','CaratCore',
      'SparkleSet','LusterLane','BrilliantBase','GemstonGuild','TreasureTide',
      'PlatinumPoint','PearlPeak','OrnaOrbit','JewelJet','MetalMuse',
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: '📈',
    description: 'Banking, investment & fintech',
    gradient: ['#1E40AF', '#3B82F6'],
    names: [
      'CapitalCore','WealthWave','FundForge','InvestIQ','ProfitPath',
      'FinFlux','AssetArc','MoneyMesh','VaultVista','EconomyEdge',
      'TrustTide','FiscalFuse','PortfolioPoint','CreditCraft','GrowthGate',
      'EquityEdge','MintMesh','StockSphere','BondBase','FinanceFlair',
    ],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    icon: '📊',
    description: 'Strategy & advisory services',
    gradient: ['#475569', '#64748B'],
    names: [
      'InsightWorks','StratEdge','GuideBeacon','ApexAdvisors','ClarityCrest',
      'PrimeCounsel','VisionaryOps','BeaconBridge','PivotPartners','CoreConsult',
      'BrainLens','WiseBridge','SavvySense','PraxisPoint','EliteStrategy',
      'InnoviAdvisors','MentorMatrix','SummitWise','Planarium','StratoSolve',
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    description: 'Learning & training services',
    gradient: ['#4F46E5', '#7C3AED'],
    names: [
      'LearnLoft','EduEdge','SkillSphere','KnowledgeKraft','TeachTide',
      'MindMesh','ScholarShift','TutorTree','AcademyArc','ClassCraft',
      'WisdomWave','StudyStream','CourseCore','BrainBase','EduNova',
      'LessonLane','TeachTech','GrowthGrade','LiteracyLift','EducaEdge',
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: '✈️',
    description: 'Tours, trips & adventures',
    gradient: ['#0284C7', '#38BDF8'],
    names: [
      'WanderWave','JourneyJet','ExploreEdge','RoamRoute','AdventureArc',
      'VoyageVine','TrekTide','GlobGlide','DestinDrift','PilgrimPath',
      'NomadNest','ExpeditionEdge','TravelTrace','JourneyJive','WaypointWave',
      'TrailTide','AtlasArc','Quest Quest','CompassCraft','HorizonHub',
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube Channel',
    icon: '🎥',
    description: 'Content creators & streamers',
    gradient: ['#DC2626', '#F87171'],
    names: [
      'FrameForge','ChannelCraft','ViewVault','ContentCore','ViralVista',
      'StreamSphere','ReelRise','ClickCraft','WatchWave','TubeTrail',
      'ShootSphere','EditEdge','PixelPost','VlogVault','CaptureCore',
      'SnapSurge','StudioStream','SceneSphere','CutCraft','FrameFusion',
    ],
  },
  {
    id: 'podcast',
    label: 'Podcast',
    icon: '🎙️',
    description: 'Audio shows & broadcasting',
    gradient: ['#7C3AED', '#A855F7'],
    names: [
      'WaveCast','EchoPod','SoundSphere','MicMesh','VoiceVault',
      'AudioArc','CastCore','FrequencyForge','ResonateRise','AmplifyAura',
      'PodPath','ListenLoft','SignalSurge','CastCraft','BroadBase',
      'NarrateNest','SpokenSphere','AudioBlend','TuneTrail','DialogueDrift',
    ],
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: '🎮',
    description: 'Games, esports & entertainment',
    gradient: ['#4F46E5', '#7C3AED'],
    popular: true,
    names: [
      'PixelPulse','QuestCore','LevelLoft','GameGrid','ArenaArc',
      'SpawnSphere','GuildGate','RespawnRise','QuestQuasar','LootLane',
      'FpsForge','RaidRoute','MapMesh','SpawnSurge','GamerGuild',
      'EsportEdge','ArcadeAura','PlayPath','ControlCraft','GameGlide',
    ],
  },
  {
    id: 'ai_startup',
    label: 'AI Startup',
    icon: '🤖',
    description: 'Artificial intelligence ventures',
    gradient: ['#0369A1', '#06B6D4'],
    popular: true,
    names: [
      'NeuralNest','DeepDrift','CogniCore','AIArc','ThinkTide',
      'MindMesh','SynapSphere','AlgoAura','SmartSurge','IntelliIQ',
      'BotBase','LearnLoop','DataDawn','AIEdge','CognitiveCraft',
      'NeuralNova','DeepDive','TensorTrail','MindMapMesh','AIApex',
    ],
  },
  {
    id: 'ecommerce',
    label: 'eCommerce',
    icon: '🛒',
    description: 'Online retail & marketplaces',
    gradient: ['#059669', '#10B981'],
    names: [
      'ShopSphere','ClickCartel','TrendFusion','MarketNest','BuyHive',
      'CartCrafters','DealDrift','MegaMart','FlashSalesHQ','NovaShops',
      'BuzzCart','QuickDealio','OmniCommerce','EShopia','WebWagon',
      'PixelCart','GlobeGoods','StreamShop','SaleDash','CartConnect',
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    icon: '₿',
    description: 'Blockchain & digital assets',
    gradient: ['#D97706', '#FBBF24'],
    names: [
      'ChainCore','BlockBase','TokenTide','CryptoCanvas','LedgerLoft',
      'CoinCraft','HashHive','WalletWave','DeFiDrift','MintMesh',
      'NodeNest','GenesisGrid','BitBridge','NFTNova','TokenForge',
      'ChainCraft','DecentralDawn','VaultVine','CryptoCore','BlockBlend',
    ],
  },
  {
    id: 'interior_design',
    label: 'Interior Design',
    icon: '🛋️',
    description: 'Home & space aesthetics',
    gradient: ['#92400E', '#D97706'],
    names: [
      'SpaceSphere','DesignDrift','InteriorIQ','AestheticArc','StyleSpace',
      'RoomRoot','DecorDrift','PlacePulse','AmbianceAura','VogueVault',
      'LivingLoft','ThemeThread','AccentArc','ComfortCraft','SuiteStyle',
      'NookNova','PalettePlace','DesignDen','HomoHue','RoomRise',
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    icon: '📸',
    description: 'Visual arts & photo studios',
    gradient: ['#374151', '#6B7280'],
    names: [
      'LenLoft','SnapSphere','ExposureEdge','FrameFocus','ShutterShift',
      'VisualVault','CaptureCore','ApertureArc','LightLane','FocusForge',
      'PixelPath','MomentMesh','ShotSphere','FStop','DarkroomDrift',
      'LensLegacy','ExposureEra','ShootSurge','VisualVine','FrameForge',
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing Agency',
    icon: '📣',
    description: 'Advertising & brand growth',
    gradient: ['#EA580C', '#F97316'],
    names: [
      'BrandBurst','CampaignCore','ReachRise','ImpactIQ','MarketMesh',
      'GrowthGrid','EngageEdge','AudienceArc','ConvertCraft','InfluenceIQ',
      'ViraVault','PitchPath','TractionTide','BrandBridge','MessageMesh',
      'TargetTrail','BoostBase','BuzzBuild','ReachRoot','ContentCore',
    ],
  },
  {
    id: 'cleaning',
    label: 'Cleaning Services',
    icon: '🧹',
    description: 'Home & office cleaning',
    gradient: ['#0EA5E9', '#38BDF8'],
    names: [
      'SparkleSet','CleanCraft','ShineShift','MaidMesh','GleamGrid',
      'ScrubSphere','FreshForge','PristinePath','BrightBase','CleanCore',
      'TidyTide','PurePulse','LusterLane','CleanCanvas','PolishPeak',
      'GlossGrid','SanitySphere','FreshFlair','ClearCraft','ScrubSurge',
    ],
  },
  {
    id: 'pet',
    label: 'Pet Business',
    icon: '🐾',
    description: 'Pet care, grooming & supplies',
    gradient: ['#D97706', '#FBBF24'],
    names: [
      'PawPath','FurFriends','PetPeak','TailTide','WoofWave',
      'SniffSphere','FurForge','PawPulse','PetNest','BarkBase',
      'MewMesh','TreatTrail','WagWave','PetPoint','FurFusion',
      'PoochPath','KittyCore','PawPark','AnimalAura','PetCraft',
    ],
  },
  {
    id: 'events',
    label: 'Event Management',
    icon: '🎉',
    description: 'Parties, weddings & corporate events',
    gradient: ['#7C3AED', '#DB2777'],
    names: [
      'GalaGrid','EventEdge','OccasionOrbit','FestivalForge','CelebCraft',
      'SoireeSet','BanquetBase','GatherGrid','VenuVibe','EventEra',
      'PartyPath','ShindigSphere','BashBase','GalaGlow','FeteForge',
      'CelebSurge','EventArc','WeddingWave','FunctionFlair','GatherGate',
    ],
  },
  {
    id: 'home_decor',
    label: 'Home Decor',
    icon: '🏡',
    description: 'Furniture & interior accessories',
    gradient: ['#4D7C0F', '#84CC16'],
    names: [
      'DecorDrift','HomeSphere','NestNiche','DwellDream','CasaCraft',
      'HomeHaven','LivingLoft','CozyCraft','ArtisanAbode','BlissBase',
      'InteriorIdyll','ComfortCore','StyleSanctum','HouseHue','HearthHaven',
      'SanctuarySphere','DecorNest','HomeHarbor','NookNice','CasaCanvas',
    ],
  },
  {
    id: 'auto',
    label: 'Auto Garage',
    icon: '🔧',
    description: 'Auto repair & car services',
    gradient: ['#475569', '#334155'],
    names: [
      'AutoArc','GarageGrid','WrenchWave','DriveForge','MechanicMesh',
      'PistonPath','EngineEdge','TorqueTide','GearGrid','AutoApex',
      'RevRise','ThrottleThread','DriveCore','SpeedSphere','CarCraft',
      'AutoArena','MechanicMuse','PistonPeak','WheelWork','GarageGate',
    ],
  },
  {
    id: 'law',
    label: 'Law Firm',
    icon: '⚖️',
    description: 'Legal services & attorneys',
    gradient: ['#1E3A5F', '#2563EB'],
    names: [
      'JusticePath','LawLoft','CounselCore','LegalLane','JurisdictionIQ',
      'BarristerBase','AttorneyArc','LegalLegacy','CausalCounsel','JuryJunction',
      'DefendDrift','LitigateLane','LawLedger','PrecedentPath','TrialTide',
      'LegalLeap','StatuteSet','VerVault','CourtCraft','LawLuminary',
    ],
  },
  {
    id: 'dental',
    label: 'Dental Clinic',
    icon: '🦷',
    description: 'Dental care & orthodontics',
    gradient: ['#0891B2', '#22D3EE'],
    names: [
      'BrightSmile','DentalDrift','OralOrbit','SmileSphere','ToothTide',
      'GumGrid','PearlPath','DentalCore','CrownCraft','BraceBase',
      'Enameledge','OrthOrbit','SmileSurge','FlossForge','DentalDawn',
      'MolarMesh','CavityCare','SmileStream','DentalNova','PerfectPearls',
    ],
  },
  {
    id: 'medical',
    label: 'Medical Store',
    icon: '💊',
    description: 'Pharmacy & medical supplies',
    gradient: ['#059669', '#34D399'],
    names: [
      'PharmaPulse','MediMesh','HealthHub','CureCore','RxRise',
      'WellnessWave','MedMart','PharmPath','ClinicCraft','CareCraft',
      'RemedyRise','RxRoot','PharmaForge','MediNova','HealthHaven',
      'CureCraft','MedMuse','PharmaPeak','WellBase','CarePath',
    ],
  },
  {
    id: 'gym',
    label: 'Gym',
    icon: '🏋️',
    description: 'Weightlifting & strength training',
    gradient: ['#B91C1C', '#EF4444'],
    popular: true,
    names: [
      'IronHive','GrindZone','LiftLegacy','StrengthSphere','MuscleMap',
      'PowerPoint','RepsRise','GymGlide','SweatSphere','BarbellBase',
      'IronIQ','BulkBridge','GymGrid','MassiveMesh','LifterLoft',
      'HeavyHive','PlatePoint','GainGrid','GymGate','IronEmpire',
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    icon: '🪑',
    description: 'Home & office furniture',
    gradient: ['#92400E', '#B45309'],
    names: [
      'WoodWave','CraftChair','TimberTide','FurnitureForge','WoodWork',
      'ChairCraft','TableTide','GrainGrid','LumberLoft','WoodNest',
      'SolidSet','CedarCore','OakOrbit','MaplesMesh','WoodWise',
      'JoineryJunction','CabinetCraft','WoodWarden','CarpentryCo','TimberedTide',
    ],
  },
  {
    id: 'hotel',
    label: 'Hotel',
    icon: '🏨',
    description: 'Hotels & accommodations',
    gradient: ['#B45309', '#D97706'],
    names: [
      'GrandGate','SuiteSet','LuxeLounge','HotelHarbor','ResidenceRise',
      'VelvetVault','GoldenGrid','EliteEstate','MarbleManor','RoyalRoost',
      'LodgeLane','ChambersChic','PremierPlace','HospitalHaven','GrandGlide',
      'SuiteStream','AtriumArc','BelvedereBase','PlazaPeak','HotelHaven',
    ],
  },
  {
    id: 'resort',
    label: 'Resort',
    icon: '🏖️',
    description: 'Resorts & holiday destinations',
    gradient: ['#0284C7', '#06B6D4'],
    names: [
      'TropicalTide','PalmPath','IslandIQ','LagoonLoft','SunSphere',
      'WavesWard','BeachBase','OceanOrbit','CoralCore','SunsetSurge',
      'MarineManor','TropicTree','ReefRetreat','AzureArc','BreezeBase',
      'ShorelineSphere','CoastalCraft','TidalTide','IsleIQ','SunSanctuary',
    ],
  },
  {
    id: 'salon',
    label: 'Salon',
    icon: '💇',
    description: 'Hair salons & styling',
    gradient: ['#BE185D', '#EC4899'],
    popular: true,
    names: [
      'GlamourTree','StyleNest','ChromaSalon','VelvetGlow','ChicLane',
      'ManeMuse','PurePolish','BeautyAura','LuxeLocks','SilkShear',
      'GlossGarden','TrendTress','OpalSpa','MirrorMane','AuraShears',
      'CharmCove','GlowTrend','LuxeDiva','FlareSalon','IconixBeauty',
    ],
  },
  {
    id: 'spa',
    label: 'Spa',
    icon: '🧖',
    description: 'Wellness, relaxation & therapy',
    gradient: ['#7C3AED', '#A78BFA'],
    names: [
      'SereneSet','BlissBath','SoakSphere','ZenZone','RelaxRoute',
      'TranquilTide','SpaStream','RejuvenRoot','PeacefulPath','WellnessWard',
      'SootheSphere','CalmCraft','RestoreRoot','SanctuarySphere','MendMesh',
      'HealHarbor','SpaAura','RenewalRise','RefreshRoot','ReplenishPoint',
    ],
  },
  {
    id: 'barber',
    label: 'Barber',
    icon: '💈',
    description: 'Barber shops & men\'s grooming',
    gradient: ['#1E40AF', '#3B82F6'],
    names: [
      'SharpShave','BladeBase','TrimTide','BarberBureau','CutCraft',
      'RazorRise','ClipCore','GradeGrid','LineUp','BarberBlend',
      'FadeForge','ScissorSphere','SharpSet','GroomGrid','NickNest',
      'BarberAura','KingsCut','ShaveSurge','ClipCraft','ClassicCut',
    ],
  },
];

/**
 * Returns `count` randomly selected names from the array using Fisher-Yates shuffle.
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
