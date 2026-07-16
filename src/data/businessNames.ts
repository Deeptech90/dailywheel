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
      'SolaOlive','CharredRustic','TruffleCoriander','CorianderCask','SpoonGilt','Rusticon','LumiCask','SpoonThicket','VeloAero','MiroAnvil','CharredWhisk','AshPlatter','ZenSage','RusticTruffle','RooAura','AuraCoriander','NovaBramble','RootOxcart','CopperFennel','VeloKori','MarrowEmber','ZenOxcart','MarrowRustic','VelaCoriander'
    ],
  },
  {
    id: 'cafe',
    label: 'Cafe',
    icon: '☕',
    description: 'Coffee shops & cafés',
    gradient: ['#8B5E3C', '#C9883A'],
    names: [
      'GrindFroth','FabNova','DuskBean','BeanKnot','SolaDark','Frothon','ZenMug','SteamDark','AeroCrema','FabOrio','VesselBean','DuskBloom','Mochaen','VesselDrip','DarkMug','Steamus','DriAlta','Beanon','DriEcho','AuraDusk','VeraCraft','PuroArtisan','KnoAlta','KoriCrema'
    ],
  },
  {
    id: 'bakery',
    label: 'Bakery',
    icon: '🥐',
    description: 'Baked goods & pastries',
    gradient: ['#E8A598', '#F4C5A1'],
    names: [
      'Oakify','CruOrio','SolaOak','FoldBake','YeastSugar','Oaker','OrioHoney','Whimex','AeroOven','AuraGlaze','Proofor','Loafen','VeraProof','Yonderity','Oakum','HonZen','Proofis','Grainum','OakLumi','CruPuro','NexaOven','CrustGlaze','OmniCrumb','BakNova'
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
      'Drapeify','Loomia','Coutureis','LooPuro','OrioCanvas','Garbio','LaceCanvas','ThornDrape','VeraLace','ZetaTailor','Stitchia','SilVera','StitchThorn','ZetaDrape','SilkLoom','StitchCouture','PleAero','ThreadTailor','VeilWeave','KoriCanvas','AeroDrape','OrioWard','Weaveum','Canvasar'
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
      'ZetaData','Novais','Sparkis','KoriCore','LogicCore','VoxelGlow','QuantPuro','GlowVoxel','CodOrio','GriMiro','GraphLogic','LumiByte','Nestor','LumiDrift','NexSola','SynNova','FluxNexus','MiroNova','LumiGrid','Voxelia','Sparkly','AltaGlow','ZetaNexus','QuantAlta'
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
      'OmniScale','Pivotix','VanguardVenture','ZenAgile','FrostAgile','SparkVenture','Tractionum','FluxMesh','LaunchFrost','EchoVista','Scaleor','ZetaMomentum','Vanguardis','NexaVanguard','FabZen','SolaFable','ZenTraction','AltaFlux','Pivotar','PivZeta','PuroPivot','Sprinton','FableSprint','AgiPuro'
    ],
  },
  {
    id: 'real_estate',
    label: 'Real Estate',
    icon: '🏠',
    description: 'Property & housing services',
    gradient: ['#059669', '#34D399'],
    names: [
      'Roofen','EchoResidence','ProOmni','Parcelen','Roofer','Dwellix','Keystoneia','NexaParcel','RoofRoof','ManLumi','Keystoneon','ProEcho','VilNexa','ZenLand','ManEcho','StructuOmni','HabitatStructure','PuroDomain','MiroProp','AltaHabitat','AuraRoof','VelaKeystone','SolaDomain','MiroHaven'
    ],
  },
  {
    id: 'construction',
    label: 'Construction',
    icon: '🏗️',
    description: 'Building & infrastructure',
    gradient: ['#D97706', '#F59E0B'],
    names: [
      'SolaSteel','Trussus','BuildPillar','Architecton','FoundationBuild','IronFoundation','Anvilum','BlueprintConstruct','IronPillar','FrameFoundation','VelaFoundation','Blueprintia','TrussBuild','TrussTruss','TruEcho','BluepriNexa','TrussIron','GirdGird','SolidMason','SolaBuild','ConcreteMason','Concreteor','Builden','FraNova'
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
      'MiroGrind','MiroCardio','VeraPace','PacLumi','FormEndura','GaiVela','ZenTrain','SolaForm','PulseRep','Grindio','MuscleRep','KoriFlex','PulZen','TrainSweat','Grindify','MuscleLift','GrindStamina','Liftio','VitalRep','TrainGrind','AltaGrind','LumiStamina','Formix','VitOmni'
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: '⚕️',
    description: 'Medical & wellness services',
    gradient: ['#0D9488', '#06B6D4'],
    names: [
      'CurLumi','MiroCure','Treater','AurAlta','NexaPulse','Vitalify','MendHeal','Cliniqar','WellnessNurture','CureCare','WellnessCare','TheraKori','RemeAura','Nurtureify','MiroNurture','Cureity','WelZeta','RemeAlta','PulseNurture','OmniWell','Remedyix','NurtureHeal','RemePuro','AuraNurture'
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
      'Auraix','PetalLumine','LusterFlawless','GloAero','Tintly','AltaPetal','OmniGlow','PigmeNova','PrismTint','Glazingum','ShimmerRose','GleNexa','PlumpGleam','PigmentGleam','Blushex','Petalio','ShimmerAura','LumineAura','KoriGlazing','SolaAura','Plumply','Gleamix','MiroPlump','Prismio'
    ],
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    icon: '💍',
    description: 'Gems, accessories & luxury',
    gradient: ['#B45309', '#D97706'],
    names: [
      'BrilliaZen','Goldar','AeroDiamond','GoldGem','DiamondCarat','GliMiro','MiroCarat','NexaPrecious','VelaGold','Facetex','StoPuro','Crystally','KoriPearl','BrilliantCarat','GoldTreasure','Caratia','FacEcho','LumiBrilliant','GlintTreasure','Brilliantor','Glintis','KoriCrystal','TreasuLumi','NovaFacet'
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: '📈',
    description: 'Banking, investment & fintech',
    gradient: ['#1E40AF', '#3B82F6'],
    names: [
      'StockPortfolio','OmniVault','VeraCapital','TruAero','EconomyFiscal','ProfitFiscal','Profitor','WealthPortfolio','WealNexa','Stockix','OrioEquity','InvestCredit','Equityio','SolaEquity','WealthAsset','FundEconomy','Mintis','VelaAsset','Profitus','CoinInvest','Economyon','ZetaEquity','AltaGrowth','AssLumi'
    ],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    icon: '📊',
    description: 'Strategy & advisory services',
    gradient: ['#475569', '#64748B'],
    names: [
      'MiroSummit','CounsAlta','PraxNexa','CounselElite','NovaInsight','KoriSummit','Visionar','SolveSavvy','PuroSavvy','Strategyex','Brainon','Mentoren','Wiseer','ZetaElite','LumiAdvisors','AdvisorsCore','CorNova','VisiSola','Insightio','ZetaSolve','NovaPraxis','WisAlta','EchoSavvy','Savvyly'
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    description: 'Learning & training services',
    gradient: ['#4F46E5', '#7C3AED'],
    names: [
      'Tutorar','MiroStudy','Lessonon','Learnus','ClassLogic','NovaLiteracy','VelaLearn','Academyia','ThiVela','StudyWisdom','KnowledgeTutor','EduAlta','AcadeOmni','Classis','ScholNova','Courseum','ThinkLiteracy','Coursely','LiteraVela','LiteracyClass','EduGrade','PuroScholar','ZenLearn','KnowledgeLearn'
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: '✈️',
    description: 'Tours, trips & adventures',
    gradient: ['#0284C7', '#38BDF8'],
    names: [
      'OmniHorizon','GlobGlob','ExploOmni','Nomadio','LumiAtlas','TreAero','NexaCompass','PuroHorizon','Nomader','TriOrio','VeraCompass','Questis','VoyaNova','Expeditionon','Adventureio','AdventureDestin','HorizonNomad','NexaDestin','Voyageia','TraKori','Pilgrimix','AtlasVoyage','Pilgrimon','JournLumi'
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube Channel',
    icon: '🎥',
    description: 'Content creators & streamers',
    gradient: ['#DC2626', '#F87171'],
    names: [
      'EdiKori','SceneClick','LumiWatch','VelaReel','EditWatch','TubNova','OrioViral','Sceneor','ChannZen','AltaContent','Watchia','CutCut','ContentWatch','Castly','Clickly','CastCapture','SolaStream','SceneSnap','KoriEdit','VieKori','KoriFrame','CaptuVera','ReeZen','TubOrio'
    ],
  },
  {
    id: 'podcast',
    label: 'Podcast',
    icon: '🎙️',
    description: 'Audio shows & broadcasting',
    gradient: ['#7C3AED', '#A855F7'],
    names: [
      'MicMic','Micio','FrequencyEcho','OmniSignal','EchoSpeak','OmniEcho','Speaken','ZetaTune','AudioSound','VelaAmplify','AeroListen','TuneSpoken','FrequencyWave','SpeakResonate','LumiDialogue','OrioNarrate','Soundia','EchoWave','NovaDialogue','LumiVoice','NexaResonate','SpeOrio','TunPuro','PodLumi'
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
      'PlaOrio','MapGuild','NovaGame','ArcaVera','Pixelex','PuroMap','LevelPixel','QuestConsole','PlayEsport','Raidia','NexaLevel','Spawnor','Respawnly','Spawnity','MapEcho','PuroEsport','LevelEsport','EsportGuild','AltaPlay','VelaGuild','GuildEsport','AeroLoot','ControlMatch','PixAura'
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
      'ThinkData','Botio','LogicCognitive','RoboBrain','RobMiro','RoboNeural','NeuralDeep','DatZen','RobOmni','ZenDeep','CogniThink','AuraSynth','SolaBot','BrainCogni','AiTensor','NeurKori','VelaSynap','LogPuro','LogZen','TensorSynth','AlgoIntelli','AeroThink','VelaSynth','Brainex'
    ],
  },
  {
    id: 'ecommerce',
    label: 'eCommerce',
    icon: '🛒',
    description: 'Online retail & marketplaces',
    gradient: ['#059669', '#10B981'],
    names: [
      'DasSola','VeraTrade','StoMiro','AuraBuy','Omnior','TradeShop','Clickus','ShopNova','CarAero','AeroBuzz','Buzzor','EchoClick','GloNova','Buzzer','GloLumi','KoriNova','ZenOmni','ZetaRetail','Tradeus','OmnKori','OmniBuzz','Marketly','PuroDeal','LumiDeal'
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    icon: '₿',
    description: 'Blockchain & digital assets',
    gradient: ['#D97706', '#FBBF24'],
    names: [
      'SatoshiWallet','AltaBlock','ZenCoin','VauAlta','ZetaLedger','LumiMint','DecentralVault','CoiOmni','NodeNode','DefLumi','KoriSatoshi','DefiBit','ChaAura','LedgerStake','WalletVault','Nften','AuraNft','Coinex','AeroGenesis','MinVera','DefiGenesis','Ledgeria','TokenBit','Ledgerify'
    ],
  },
  {
    id: 'interior_design',
    label: 'Interior Design',
    icon: '🛋️',
    description: 'Home & space aesthetics',
    gradient: ['#92400E', '#D97706'],
    names: [
      'HueVibe','SpaceTheme','MiroComfort','Themear','ZenSpace','AestheticTheme','Vibeon','DesignAesthetic','OmniNook','Hueex','StyleDecor','OrioTheme','Livingum','Paletteify','LivingAccent','ZenAesthetic','TheAero','PaletteComfort','AccentTheme','Nookis','EchoLayout','KoriAccent','Ambianceus','DenRoom'
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    icon: '📸',
    description: 'Visual arts & photo studios',
    gradient: ['#374151', '#6B7280'],
    names: [
      'PuroExposure','EchoShot','OmniPhoto','PhotoImage','SolaShot','VeraLens','Exposurear','SolaExposure','NexaVisual','VelaLight','Shutteron','Shotex','ShutterFocus','PhotoPhoto','ShootSnap','ExposureSnap','NovaFlash','OrioImage','SolaSnap','ShutterDarkroom','ShootFstop','OmniFrame','Flashify','Shutterex'
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing Agency',
    icon: '📣',
    description: 'Advertising & brand growth',
    gradient: ['#EA580C', '#F97316'],
    names: [
      'ContePuro','VeraEngage','OmniContent','EngageBrand','ConvertEngage','MessaZeta','VirZeta','VeraConvert','OrioInfluence','OmniMessage','ZenAudience','MarketTraction','Influenceity','Engageer','CampaiPuro','Pitchon','OmniCampaign','EchoConvert','Messagear','MarketMessage','BoostVira','Targetis','CampaignReach','ConteSola'
    ],
  },
  {
    id: 'cleaning',
    label: 'Cleaning Services',
    icon: '🧹',
    description: 'Home & office cleaning',
    gradient: ['#0EA5E9', '#38BDF8'],
    names: [
      'TidNexa','LusterPristine','EchoClean','Clearar','Gleamor','SolaLuster','GlossTidy','DusPuro','VelaMaid','BrigAura','AuraMaid','SpotlessClean','PuroShine','Tidyus','Pureio','CleOmni','TidyPure','ShiMiro','PureSpotless','CleNexa','PoliVera','Pristineum','LumiWipe','SparkZeta'
    ],
  },
  {
    id: 'pet',
    label: 'Pet Business',
    icon: '🐾',
    description: 'Pet care, grooming & supplies',
    gradient: ['#D97706', '#FBBF24'],
    names: [
      'BarkBark','EchoTail','PawWag','MewTreat','VelaCat','Vetum','PoochFur','PuroVet','NovaBark','MewCat','PawAnimal','LumiKitty','DogNexa','SniffVet','CatAura','FurPuro','NexaGroom','PoochGroom','Dogio','Mewor','SniAlta','KitVera','Petly','KoriWoof'
    ],
  },
  {
    id: 'events',
    label: 'Event Management',
    icon: '🎉',
    description: 'Parties, weddings & corporate events',
    gradient: ['#7C3AED', '#DB2777'],
    names: [
      'AuraHost','Shindigum','VenuParty','Galaor','Partyus','Fiestaen','HosAura','GalaShindig','Eventor','AltaShindig','FiesMiro','VeraEvent','OccasionSoiree','FunctiNova','ZetaSoiree','InviteGala','SolaFunction','Galaex','GathNova','SolaGather','GatherFiesta','Banquetor','NovaSoiree','ParZeta'
    ],
  },
  {
    id: 'home_decor',
    label: 'Home Decor',
    icon: '🏡',
    description: 'Furniture & interior accessories',
    gradient: ['#4D7C0F', '#84CC16'],
    names: [
      'SolaHaven','SanctuaOrio','FurnishIdyll','DecorNest','AltaHearth','Nestus','ArtisAura','PluNova','Idyllen','OrioBliss','Sanctuaryex','Styleix','SanctuaAlta','FurnishCasa','FurniOrio','VelaSanctum','IdyllIdyll','ChicSanctum','KoriAbode','FurnishFurnish','HearNexa','Homeus','SanctKori','VeraAbode'
    ],
  },
  {
    id: 'auto',
    label: 'Auto Garage',
    icon: '🔧',
    description: 'Auto repair & car services',
    gradient: ['#475569', '#334155'],
    names: [
      'TyrOrio','WrenLumi','EngineAuto','Autoia','Torquely','CarTyre','NovaPiston','TorqAura','TorqAero','RideGear','Pistonon','PistonPiston','GarageWheel','WheNexa','ZetaSpeed','MiroAuto','AeroDrive','AltaDrive','BrakeThrottle','Rideis','GearGear','EngineRide','TorqKori','MotVela'
    ],
  },
  {
    id: 'law',
    label: 'Law Firm',
    icon: '⚖️',
    description: 'Legal services & attorneys',
    gradient: ['#1E3A5F', '#2563EB'],
    names: [
      'SolaJustice','CounselPrecedent','FirAero','OrioJury','VeraJustice','StatuteLaw','PrecedeKori','PrecedentTrial','JustiPuro','JurisLegacy','LedgerLegacy','Juryis','StatuVela','RuleCourt','AttorneyFirm','Barristeris','FirmRule','Courton','EchoTrial','DefendCourt','Legacyon','Precedentus','DefeNova','LegalRule'
    ],
  },
  {
    id: 'dental',
    label: 'Dental Clinic',
    icon: '🦷',
    description: 'Dental care & orthodontics',
    gradient: ['#0891B2', '#22D3EE'],
    names: [
      'CavityOral','Crownum','ZenBrace','VelaClean','PearlOrtho','Pearlon','ToothPearl','FloAero','PuroPearl','NexaGum','Whiteen','CroAlta','Denton','FlossCavity','TooLumi','EchoSmile','Molarex','OrtAura','DentOmni','BitOrio','OrioDent','WhiteCavity','PuroMolar','CavityOrtho'
    ],
  },
  {
    id: 'medical',
    label: 'Medical Store',
    icon: '💊',
    description: 'Pharmacy & medical supplies',
    gradient: ['#059669', '#34D399'],
    names: [
      'MartPharma','AeroHeal','AidAero','RxClinic','LifPuro','ZenDrug','PharMiro','MarOmni','AeroCure','MedEcho','WelAero','KoriHeal','SolaWell','ZenBio','SolaHealth','RxPill','Careity','Healon','PharmaMart','Cureen','MiroRemedy','MiroRoot','Rootia','WelOrio'
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
      'Trainex','KoriPlate','TrainLift','Sweator','TrainWork','Trainity','SweZeta','GrindBulk','PuroMuscle','GymSola','SquatPower','GrindFit','Squatar','LiftPower','Barbellly','StrengthRep','VeraGrind','Ironis','RepGrind','StrengthPower','HeavyStrength','GrindGrind','MuscleLift','KoriGain'
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    icon: '🪑',
    description: 'Home & office furniture',
    gradient: ['#92400E', '#B45309'],
    names: [
      'Lumberify','CedarCarpentry','VeraLumber','MapleSofa','VelaWood','BedFurnish','PuroGrain','AeroWood','CedAura','NovaGrain','LumiDesk','LumiCarpentry','VeraGrain','Chairus','GraNova','Chairor','TimberCraft','Oaken','OakNova','FurnishCarpentry','CabinLumi','SheAura','FurniMiro','CarpentAlta'
    ],
  },
  {
    id: 'hotel',
    label: 'Hotel',
    icon: '🏨',
    description: 'Hotels & accommodations',
    gradient: ['#B45309', '#D97706'],
    names: [
      'EchoLounge','ResidenNova','LoungeLodge','NovaChambers','RoomChambers','Lodgeis','RooOmni','AltaLounge','PuroVelvet','RooPuro','Estateix','ResidenceChambers','VelvetVelvet','AtriPuro','ManorStay','LuxeChambers','VelvetStay','AtriZeta','StaNexa','AuraRoom','VelaAtrium','VelvOrio','Luxeis','ChambersLodge'
    ],
  },
  {
    id: 'resort',
    label: 'Resort',
    icon: '🏖️',
    description: 'Resorts & holiday destinations',
    gradient: ['#0284C7', '#06B6D4'],
    names: [
      'ZenBeach','SanVera','Islander','AzureBeach','ReeVera','TropicOmni','SolaLagoon','Beachity','LumiSun','Sunity','VelaSunset','Sandis','BreeVela','BreeEcho','Spaio','ReefBeach','OmniTropical','AzureCoastal','ZetaRest','PalAura','ReeZen','PuroSpa','ReefBreeze','SanOmni'
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
      'SheOmni','Locksor','Cutum','ZenMirror','Purely','LumiShear','PureVelvet','PuroTrend','GlossShear','DivaDiva','Pureia','ManMiro','SalonChroma','Pureen','SalonHair','SolaMirror','ChaSola','HaiVela','Opalon','ChicTrend','SolaLocks','ChromaHair','GloVera','Trendor'
    ],
  },
  {
    id: 'spa',
    label: 'Spa',
    icon: '🧖',
    description: 'Wellness, relaxation & therapy',
    gradient: ['#7C3AED', '#A78BFA'],
    names: [
      'Rejuvenus','PuroHeal','EchoMassage','Relaxus','SoakReplenish','RejuvNexa','Massageix','Peaceer','MiroTranquil','Zenum','Blissix','KoriSoothe','BliVera','RefreshRejuven','Replenishus','PuroSoothe','LumiCalm','OmniSoak','VeraMend','Tranquilor','RefreZen','RepleniSola','VelaSoothe','OmniBliss'
    ],
  },
  {
    id: 'barber',
    label: 'Barber',
    icon: '💈',
    description: 'Barber shops & men\'s grooming',
    gradient: ['#1E40AF', '#3B82F6'],
    names: [
      'BladeBuzz','Kingsis','Cutio','Bureauity','RazorGrade','RazorBuzz','Bladeix','EchoScissor','ScissorComb','Razorio','Fadeen','BeardKings','EchoClip','BuzzBuzz','Clipix','VeraSharp','AeroClassic','MiroClassic','KoriClip','LineClassic','CombClip','KingsClassic','LineComb','Sharpar'
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
