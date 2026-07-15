export interface SEOFAQ {
  question: string;
  answer: string;
}

export interface SEOCategory {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  faqs: SEOFAQ[];
}

export const SEO_CATEGORIES: SEOCategory[] = [
  {
    id: "restaurant",
    slug: "restaurant-name-generator",
    name: "Restaurant",
    title: "Restaurant Name Generator | AI Powered",
    description: "Generate unique and catchy restaurant names in seconds with our free AI-powered business name generator.",
    keywords: "restaurant name generator, restaurant names, name ideas for restaurant, brandable restaurant names",
    faqs: [
      {
        question: "How do I choose a good name for my restaurant?",
        answer: "A good restaurant name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these restaurant names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my restaurant name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cafe",
    slug: "cafe-name-generator",
    name: "Cafe",
    title: "Cafe Name Generator | AI Powered",
    description: "Generate unique and catchy cafe names in seconds with our free AI-powered business name generator.",
    keywords: "cafe name generator, cafe names, name ideas for cafe, brandable cafe names",
    faqs: [
      {
        question: "How do I choose a good name for my cafe?",
        answer: "A good cafe name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cafe names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cafe name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bakery",
    slug: "bakery-name-generator",
    name: "Bakery",
    title: "Bakery Name Generator | AI Powered",
    description: "Generate unique and catchy bakery names in seconds with our free AI-powered business name generator.",
    keywords: "bakery name generator, bakery names, name ideas for bakery, brandable bakery names",
    faqs: [
      {
        question: "How do I choose a good name for my bakery?",
        answer: "A good bakery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bakery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bakery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "salon",
    slug: "salon-name-generator",
    name: "Salon",
    title: "Salon Name Generator | AI Powered",
    description: "Generate unique and catchy salon names in seconds with our free AI-powered business name generator.",
    keywords: "salon name generator, salon names, name ideas for salon, brandable salon names",
    faqs: [
      {
        question: "How do I choose a good name for my salon?",
        answer: "A good salon name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these salon names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my salon name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "gym",
    slug: "gym-name-generator",
    name: "Gym",
    title: "Gym Name Generator | AI Powered",
    description: "Generate unique and catchy gym names in seconds with our free AI-powered business name generator.",
    keywords: "gym name generator, gym names, name ideas for gym, brandable gym names",
    faqs: [
      {
        question: "How do I choose a good name for my gym?",
        answer: "A good gym name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these gym names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my gym name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "real-estate",
    slug: "real-estate-name-generator",
    name: "Real Estate",
    title: "Real Estate Name Generator | AI Powered",
    description: "Generate unique and catchy real estate names in seconds with our free AI-powered business name generator.",
    keywords: "real estate name generator, real estate names, name ideas for real estate, brandable real estate names",
    faqs: [
      {
        question: "How do I choose a good name for my real estate?",
        answer: "A good real estate name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these real estate names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my real estate name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "construction-company",
    slug: "construction-company-name-generator",
    name: "Construction Company",
    title: "Construction Company Name Generator | AI Powered",
    description: "Generate unique and catchy construction company names in seconds with our free AI-powered business name generator.",
    keywords: "construction company name generator, construction company names, name ideas for construction company, brandable construction company names",
    faqs: [
      {
        question: "How do I choose a good name for my construction company?",
        answer: "A good construction company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these construction company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my construction company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "medical-store",
    slug: "medical-store-name-generator",
    name: "Medical Store",
    title: "Medical Store Name Generator | AI Powered",
    description: "Generate unique and catchy medical store names in seconds with our free AI-powered business name generator.",
    keywords: "medical store name generator, medical store names, name ideas for medical store, brandable medical store names",
    faqs: [
      {
        question: "How do I choose a good name for my medical store?",
        answer: "A good medical store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these medical store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my medical store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "ai-startup",
    slug: "ai-startup-name-generator",
    name: "AI Startup",
    title: "AI Startup Name Generator | AI Powered",
    description: "Generate unique and catchy ai startup names in seconds with our free AI-powered business name generator.",
    keywords: "ai startup name generator, ai startup names, name ideas for ai startup, brandable ai startup names",
    faqs: [
      {
        question: "How do I choose a good name for my ai startup?",
        answer: "A good ai startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these ai startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my ai startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "youtube-channel",
    slug: "youtube-channel-name-generator",
    name: "YouTube Channel",
    title: "YouTube Channel Name Generator | AI Powered",
    description: "Generate unique and catchy youtube channel names in seconds with our free AI-powered business name generator.",
    keywords: "youtube channel name generator, youtube channel names, name ideas for youtube channel, brandable youtube channel names",
    faqs: [
      {
        question: "How do I choose a good name for my youtube channel?",
        answer: "A good youtube channel name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these youtube channel names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my youtube channel name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "podcast",
    slug: "podcast-name-generator",
    name: "Podcast",
    title: "Podcast Name Generator | AI Powered",
    description: "Generate unique and catchy podcast names in seconds with our free AI-powered business name generator.",
    keywords: "podcast name generator, podcast names, name ideas for podcast, brandable podcast names",
    faqs: [
      {
        question: "How do I choose a good name for my podcast?",
        answer: "A good podcast name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these podcast names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my podcast name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "clothing-brand",
    slug: "clothing-brand-name-generator",
    name: "Clothing Brand",
    title: "Clothing Brand Name Generator | AI Powered",
    description: "Generate unique and catchy clothing brand names in seconds with our free AI-powered business name generator.",
    keywords: "clothing brand name generator, clothing brand names, name ideas for clothing brand, brandable clothing brand names",
    faqs: [
      {
        question: "How do I choose a good name for my clothing brand?",
        answer: "A good clothing brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these clothing brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my clothing brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "jewelry-brand",
    slug: "jewelry-brand-name-generator",
    name: "Jewelry Brand",
    title: "Jewelry Brand Name Generator | AI Powered",
    description: "Generate unique and catchy jewelry brand names in seconds with our free AI-powered business name generator.",
    keywords: "jewelry brand name generator, jewelry brand names, name ideas for jewelry brand, brandable jewelry brand names",
    faqs: [
      {
        question: "How do I choose a good name for my jewelry brand?",
        answer: "A good jewelry brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these jewelry brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my jewelry brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "technology-company",
    slug: "technology-company-name-generator",
    name: "Technology Company",
    title: "Technology Company Name Generator | AI Powered",
    description: "Generate unique and catchy technology company names in seconds with our free AI-powered business name generator.",
    keywords: "technology company name generator, technology company names, name ideas for technology company, brandable technology company names",
    faqs: [
      {
        question: "How do I choose a good name for my technology company?",
        answer: "A good technology company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these technology company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my technology company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "travel-agency",
    slug: "travel-agency-name-generator",
    name: "Travel Agency",
    title: "Travel Agency Name Generator | AI Powered",
    description: "Generate unique and catchy travel agency names in seconds with our free AI-powered business name generator.",
    keywords: "travel agency name generator, travel agency names, name ideas for travel agency, brandable travel agency names",
    faqs: [
      {
        question: "How do I choose a good name for my travel agency?",
        answer: "A good travel agency name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these travel agency names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my travel agency name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "marketing-agency",
    slug: "marketing-agency-name-generator",
    name: "Marketing Agency",
    title: "Marketing Agency Name Generator | AI Powered",
    description: "Generate unique and catchy marketing agency names in seconds with our free AI-powered business name generator.",
    keywords: "marketing agency name generator, marketing agency names, name ideas for marketing agency, brandable marketing agency names",
    faqs: [
      {
        question: "How do I choose a good name for my marketing agency?",
        answer: "A good marketing agency name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these marketing agency names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my marketing agency name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "law-firm",
    slug: "law-firm-name-generator",
    name: "Law Firm",
    title: "Law Firm Name Generator | AI Powered",
    description: "Generate unique and catchy law firm names in seconds with our free AI-powered business name generator.",
    keywords: "law firm name generator, law firm names, name ideas for law firm, brandable law firm names",
    faqs: [
      {
        question: "How do I choose a good name for my law firm?",
        answer: "A good law firm name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these law firm names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my law firm name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "accounting-firm",
    slug: "accounting-firm-name-generator",
    name: "Accounting Firm",
    title: "Accounting Firm Name Generator | AI Powered",
    description: "Generate unique and catchy accounting firm names in seconds with our free AI-powered business name generator.",
    keywords: "accounting firm name generator, accounting firm names, name ideas for accounting firm, brandable accounting firm names",
    faqs: [
      {
        question: "How do I choose a good name for my accounting firm?",
        answer: "A good accounting firm name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these accounting firm names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my accounting firm name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "photography-studio",
    slug: "photography-studio-name-generator",
    name: "Photography Studio",
    title: "Photography Studio Name Generator | AI Powered",
    description: "Generate unique and catchy photography studio names in seconds with our free AI-powered business name generator.",
    keywords: "photography studio name generator, photography studio names, name ideas for photography studio, brandable photography studio names",
    faqs: [
      {
        question: "How do I choose a good name for my photography studio?",
        answer: "A good photography studio name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these photography studio names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my photography studio name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cleaning-service",
    slug: "cleaning-service-name-generator",
    name: "Cleaning Service",
    title: "Cleaning Service Name Generator | AI Powered",
    description: "Generate unique and catchy cleaning service names in seconds with our free AI-powered business name generator.",
    keywords: "cleaning service name generator, cleaning service names, name ideas for cleaning service, brandable cleaning service names",
    faqs: [
      {
        question: "How do I choose a good name for my cleaning service?",
        answer: "A good cleaning service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cleaning service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cleaning service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "landscaping-business",
    slug: "landscaping-business-name-generator",
    name: "Landscaping Business",
    title: "Landscaping Business Name Generator | AI Powered",
    description: "Generate unique and catchy landscaping business names in seconds with our free AI-powered business name generator.",
    keywords: "landscaping business name generator, landscaping business names, name ideas for landscaping business, brandable landscaping business names",
    faqs: [
      {
        question: "How do I choose a good name for my landscaping business?",
        answer: "A good landscaping business name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these landscaping business names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my landscaping business name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "plumbing-company",
    slug: "plumbing-company-name-generator",
    name: "Plumbing Company",
    title: "Plumbing Company Name Generator | AI Powered",
    description: "Generate unique and catchy plumbing company names in seconds with our free AI-powered business name generator.",
    keywords: "plumbing company name generator, plumbing company names, name ideas for plumbing company, brandable plumbing company names",
    faqs: [
      {
        question: "How do I choose a good name for my plumbing company?",
        answer: "A good plumbing company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these plumbing company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my plumbing company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "electrician",
    slug: "electrician-name-generator",
    name: "Electrician",
    title: "Electrician Name Generator | AI Powered",
    description: "Generate unique and catchy electrician names in seconds with our free AI-powered business name generator.",
    keywords: "electrician name generator, electrician names, name ideas for electrician, brandable electrician names",
    faqs: [
      {
        question: "How do I choose a good name for my electrician?",
        answer: "A good electrician name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these electrician names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my electrician name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "hvac-company",
    slug: "hvac-company-name-generator",
    name: "HVAC Company",
    title: "HVAC Company Name Generator | AI Powered",
    description: "Generate unique and catchy hvac company names in seconds with our free AI-powered business name generator.",
    keywords: "hvac company name generator, hvac company names, name ideas for hvac company, brandable hvac company names",
    faqs: [
      {
        question: "How do I choose a good name for my hvac company?",
        answer: "A good hvac company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these hvac company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my hvac company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "roofing-company",
    slug: "roofing-company-name-generator",
    name: "Roofing Company",
    title: "Roofing Company Name Generator | AI Powered",
    description: "Generate unique and catchy roofing company names in seconds with our free AI-powered business name generator.",
    keywords: "roofing company name generator, roofing company names, name ideas for roofing company, brandable roofing company names",
    faqs: [
      {
        question: "How do I choose a good name for my roofing company?",
        answer: "A good roofing company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these roofing company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my roofing company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pest-control",
    slug: "pest-control-name-generator",
    name: "Pest Control",
    title: "Pest Control Name Generator | AI Powered",
    description: "Generate unique and catchy pest control names in seconds with our free AI-powered business name generator.",
    keywords: "pest control name generator, pest control names, name ideas for pest control, brandable pest control names",
    faqs: [
      {
        question: "How do I choose a good name for my pest control?",
        answer: "A good pest control name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pest control names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pest control name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "auto-repair-shop",
    slug: "auto-repair-shop-name-generator",
    name: "Auto Repair Shop",
    title: "Auto Repair Shop Name Generator | AI Powered",
    description: "Generate unique and catchy auto repair shop names in seconds with our free AI-powered business name generator.",
    keywords: "auto repair shop name generator, auto repair shop names, name ideas for auto repair shop, brandable auto repair shop names",
    faqs: [
      {
        question: "How do I choose a good name for my auto repair shop?",
        answer: "A good auto repair shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these auto repair shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my auto repair shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "car-wash",
    slug: "car-wash-name-generator",
    name: "Car Wash",
    title: "Car Wash Name Generator | AI Powered",
    description: "Generate unique and catchy car wash names in seconds with our free AI-powered business name generator.",
    keywords: "car wash name generator, car wash names, name ideas for car wash, brandable car wash names",
    faqs: [
      {
        question: "How do I choose a good name for my car wash?",
        answer: "A good car wash name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these car wash names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my car wash name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "towing-company",
    slug: "towing-company-name-generator",
    name: "Towing Company",
    title: "Towing Company Name Generator | AI Powered",
    description: "Generate unique and catchy towing company names in seconds with our free AI-powered business name generator.",
    keywords: "towing company name generator, towing company names, name ideas for towing company, brandable towing company names",
    faqs: [
      {
        question: "How do I choose a good name for my towing company?",
        answer: "A good towing company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these towing company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my towing company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "moving-company",
    slug: "moving-company-name-generator",
    name: "Moving Company",
    title: "Moving Company Name Generator | AI Powered",
    description: "Generate unique and catchy moving company names in seconds with our free AI-powered business name generator.",
    keywords: "moving company name generator, moving company names, name ideas for moving company, brandable moving company names",
    faqs: [
      {
        question: "How do I choose a good name for my moving company?",
        answer: "A good moving company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these moving company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my moving company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "storage-facility",
    slug: "storage-facility-name-generator",
    name: "Storage Facility",
    title: "Storage Facility Name Generator | AI Powered",
    description: "Generate unique and catchy storage facility names in seconds with our free AI-powered business name generator.",
    keywords: "storage facility name generator, storage facility names, name ideas for storage facility, brandable storage facility names",
    faqs: [
      {
        question: "How do I choose a good name for my storage facility?",
        answer: "A good storage facility name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these storage facility names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my storage facility name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "event-planning",
    slug: "event-planning-name-generator",
    name: "Event Planning",
    title: "Event Planning Name Generator | AI Powered",
    description: "Generate unique and catchy event planning names in seconds with our free AI-powered business name generator.",
    keywords: "event planning name generator, event planning names, name ideas for event planning, brandable event planning names",
    faqs: [
      {
        question: "How do I choose a good name for my event planning?",
        answer: "A good event planning name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these event planning names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my event planning name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "wedding-planner",
    slug: "wedding-planner-name-generator",
    name: "Wedding Planner",
    title: "Wedding Planner Name Generator | AI Powered",
    description: "Generate unique and catchy wedding planner names in seconds with our free AI-powered business name generator.",
    keywords: "wedding planner name generator, wedding planner names, name ideas for wedding planner, brandable wedding planner names",
    faqs: [
      {
        question: "How do I choose a good name for my wedding planner?",
        answer: "A good wedding planner name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these wedding planner names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my wedding planner name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "catering-service",
    slug: "catering-service-name-generator",
    name: "Catering Service",
    title: "Catering Service Name Generator | AI Powered",
    description: "Generate unique and catchy catering service names in seconds with our free AI-powered business name generator.",
    keywords: "catering service name generator, catering service names, name ideas for catering service, brandable catering service names",
    faqs: [
      {
        question: "How do I choose a good name for my catering service?",
        answer: "A good catering service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these catering service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my catering service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "food-truck",
    slug: "food-truck-name-generator",
    name: "Food Truck",
    title: "Food Truck Name Generator | AI Powered",
    description: "Generate unique and catchy food truck names in seconds with our free AI-powered business name generator.",
    keywords: "food truck name generator, food truck names, name ideas for food truck, brandable food truck names",
    faqs: [
      {
        question: "How do I choose a good name for my food truck?",
        answer: "A good food truck name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these food truck names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my food truck name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "ice-cream-shop",
    slug: "ice-cream-shop-name-generator",
    name: "Ice Cream Shop",
    title: "Ice Cream Shop Name Generator | AI Powered",
    description: "Generate unique and catchy ice cream shop names in seconds with our free AI-powered business name generator.",
    keywords: "ice cream shop name generator, ice cream shop names, name ideas for ice cream shop, brandable ice cream shop names",
    faqs: [
      {
        question: "How do I choose a good name for my ice cream shop?",
        answer: "A good ice cream shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these ice cream shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my ice cream shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "coffee-shop",
    slug: "coffee-shop-name-generator",
    name: "Coffee Shop",
    title: "Coffee Shop Name Generator | AI Powered",
    description: "Generate unique and catchy coffee shop names in seconds with our free AI-powered business name generator.",
    keywords: "coffee shop name generator, coffee shop names, name ideas for coffee shop, brandable coffee shop names",
    faqs: [
      {
        question: "How do I choose a good name for my coffee shop?",
        answer: "A good coffee shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these coffee shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my coffee shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bar",
    slug: "bar-name-generator",
    name: "Bar",
    title: "Bar Name Generator | AI Powered",
    description: "Generate unique and catchy bar names in seconds with our free AI-powered business name generator.",
    keywords: "bar name generator, bar names, name ideas for bar, brandable bar names",
    faqs: [
      {
        question: "How do I choose a good name for my bar?",
        answer: "A good bar name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bar names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bar name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "nightclub",
    slug: "nightclub-name-generator",
    name: "Nightclub",
    title: "Nightclub Name Generator | AI Powered",
    description: "Generate unique and catchy nightclub names in seconds with our free AI-powered business name generator.",
    keywords: "nightclub name generator, nightclub names, name ideas for nightclub, brandable nightclub names",
    faqs: [
      {
        question: "How do I choose a good name for my nightclub?",
        answer: "A good nightclub name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these nightclub names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my nightclub name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "brewery",
    slug: "brewery-name-generator",
    name: "Brewery",
    title: "Brewery Name Generator | AI Powered",
    description: "Generate unique and catchy brewery names in seconds with our free AI-powered business name generator.",
    keywords: "brewery name generator, brewery names, name ideas for brewery, brandable brewery names",
    faqs: [
      {
        question: "How do I choose a good name for my brewery?",
        answer: "A good brewery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these brewery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my brewery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "winery",
    slug: "winery-name-generator",
    name: "Winery",
    title: "Winery Name Generator | AI Powered",
    description: "Generate unique and catchy winery names in seconds with our free AI-powered business name generator.",
    keywords: "winery name generator, winery names, name ideas for winery, brandable winery names",
    faqs: [
      {
        question: "How do I choose a good name for my winery?",
        answer: "A good winery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these winery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my winery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "liquor-store",
    slug: "liquor-store-name-generator",
    name: "Liquor Store",
    title: "Liquor Store Name Generator | AI Powered",
    description: "Generate unique and catchy liquor store names in seconds with our free AI-powered business name generator.",
    keywords: "liquor store name generator, liquor store names, name ideas for liquor store, brandable liquor store names",
    faqs: [
      {
        question: "How do I choose a good name for my liquor store?",
        answer: "A good liquor store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these liquor store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my liquor store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dispensary",
    slug: "dispensary-name-generator",
    name: "Dispensary",
    title: "Dispensary Name Generator | AI Powered",
    description: "Generate unique and catchy dispensary names in seconds with our free AI-powered business name generator.",
    keywords: "dispensary name generator, dispensary names, name ideas for dispensary, brandable dispensary names",
    faqs: [
      {
        question: "How do I choose a good name for my dispensary?",
        answer: "A good dispensary name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dispensary names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dispensary name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "yoga-studio",
    slug: "yoga-studio-name-generator",
    name: "Yoga Studio",
    title: "Yoga Studio Name Generator | AI Powered",
    description: "Generate unique and catchy yoga studio names in seconds with our free AI-powered business name generator.",
    keywords: "yoga studio name generator, yoga studio names, name ideas for yoga studio, brandable yoga studio names",
    faqs: [
      {
        question: "How do I choose a good name for my yoga studio?",
        answer: "A good yoga studio name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these yoga studio names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my yoga studio name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pilates-studio",
    slug: "pilates-studio-name-generator",
    name: "Pilates Studio",
    title: "Pilates Studio Name Generator | AI Powered",
    description: "Generate unique and catchy pilates studio names in seconds with our free AI-powered business name generator.",
    keywords: "pilates studio name generator, pilates studio names, name ideas for pilates studio, brandable pilates studio names",
    faqs: [
      {
        question: "How do I choose a good name for my pilates studio?",
        answer: "A good pilates studio name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pilates studio names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pilates studio name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "martial-arts-school",
    slug: "martial-arts-school-name-generator",
    name: "Martial Arts School",
    title: "Martial Arts School Name Generator | AI Powered",
    description: "Generate unique and catchy martial arts school names in seconds with our free AI-powered business name generator.",
    keywords: "martial arts school name generator, martial arts school names, name ideas for martial arts school, brandable martial arts school names",
    faqs: [
      {
        question: "How do I choose a good name for my martial arts school?",
        answer: "A good martial arts school name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these martial arts school names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my martial arts school name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dance-studio",
    slug: "dance-studio-name-generator",
    name: "Dance Studio",
    title: "Dance Studio Name Generator | AI Powered",
    description: "Generate unique and catchy dance studio names in seconds with our free AI-powered business name generator.",
    keywords: "dance studio name generator, dance studio names, name ideas for dance studio, brandable dance studio names",
    faqs: [
      {
        question: "How do I choose a good name for my dance studio?",
        answer: "A good dance studio name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dance studio names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dance studio name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "crossfit-gym",
    slug: "crossfit-gym-name-generator",
    name: "Crossfit Gym",
    title: "Crossfit Gym Name Generator | AI Powered",
    description: "Generate unique and catchy crossfit gym names in seconds with our free AI-powered business name generator.",
    keywords: "crossfit gym name generator, crossfit gym names, name ideas for crossfit gym, brandable crossfit gym names",
    faqs: [
      {
        question: "How do I choose a good name for my crossfit gym?",
        answer: "A good crossfit gym name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these crossfit gym names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my crossfit gym name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "personal-trainer",
    slug: "personal-trainer-name-generator",
    name: "Personal Trainer",
    title: "Personal Trainer Name Generator | AI Powered",
    description: "Generate unique and catchy personal trainer names in seconds with our free AI-powered business name generator.",
    keywords: "personal trainer name generator, personal trainer names, name ideas for personal trainer, brandable personal trainer names",
    faqs: [
      {
        question: "How do I choose a good name for my personal trainer?",
        answer: "A good personal trainer name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these personal trainer names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my personal trainer name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "massage-therapy",
    slug: "massage-therapy-name-generator",
    name: "Massage Therapy",
    title: "Massage Therapy Name Generator | AI Powered",
    description: "Generate unique and catchy massage therapy names in seconds with our free AI-powered business name generator.",
    keywords: "massage therapy name generator, massage therapy names, name ideas for massage therapy, brandable massage therapy names",
    faqs: [
      {
        question: "How do I choose a good name for my massage therapy?",
        answer: "A good massage therapy name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these massage therapy names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my massage therapy name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "chiropractor",
    slug: "chiropractor-name-generator",
    name: "Chiropractor",
    title: "Chiropractor Name Generator | AI Powered",
    description: "Generate unique and catchy chiropractor names in seconds with our free AI-powered business name generator.",
    keywords: "chiropractor name generator, chiropractor names, name ideas for chiropractor, brandable chiropractor names",
    faqs: [
      {
        question: "How do I choose a good name for my chiropractor?",
        answer: "A good chiropractor name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these chiropractor names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my chiropractor name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dental-clinic",
    slug: "dental-clinic-name-generator",
    name: "Dental Clinic",
    title: "Dental Clinic Name Generator | AI Powered",
    description: "Generate unique and catchy dental clinic names in seconds with our free AI-powered business name generator.",
    keywords: "dental clinic name generator, dental clinic names, name ideas for dental clinic, brandable dental clinic names",
    faqs: [
      {
        question: "How do I choose a good name for my dental clinic?",
        answer: "A good dental clinic name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dental clinic names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dental clinic name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "veterinary-clinic",
    slug: "veterinary-clinic-name-generator",
    name: "Veterinary Clinic",
    title: "Veterinary Clinic Name Generator | AI Powered",
    description: "Generate unique and catchy veterinary clinic names in seconds with our free AI-powered business name generator.",
    keywords: "veterinary clinic name generator, veterinary clinic names, name ideas for veterinary clinic, brandable veterinary clinic names",
    faqs: [
      {
        question: "How do I choose a good name for my veterinary clinic?",
        answer: "A good veterinary clinic name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these veterinary clinic names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my veterinary clinic name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pet-grooming",
    slug: "pet-grooming-name-generator",
    name: "Pet Grooming",
    title: "Pet Grooming Name Generator | AI Powered",
    description: "Generate unique and catchy pet grooming names in seconds with our free AI-powered business name generator.",
    keywords: "pet grooming name generator, pet grooming names, name ideas for pet grooming, brandable pet grooming names",
    faqs: [
      {
        question: "How do I choose a good name for my pet grooming?",
        answer: "A good pet grooming name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pet grooming names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pet grooming name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dog-walking",
    slug: "dog-walking-name-generator",
    name: "Dog Walking",
    title: "Dog Walking Name Generator | AI Powered",
    description: "Generate unique and catchy dog walking names in seconds with our free AI-powered business name generator.",
    keywords: "dog walking name generator, dog walking names, name ideas for dog walking, brandable dog walking names",
    faqs: [
      {
        question: "How do I choose a good name for my dog walking?",
        answer: "A good dog walking name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dog walking names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dog walking name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pet-store",
    slug: "pet-store-name-generator",
    name: "Pet Store",
    title: "Pet Store Name Generator | AI Powered",
    description: "Generate unique and catchy pet store names in seconds with our free AI-powered business name generator.",
    keywords: "pet store name generator, pet store names, name ideas for pet store, brandable pet store names",
    faqs: [
      {
        question: "How do I choose a good name for my pet store?",
        answer: "A good pet store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pet store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pet store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "hardware-store",
    slug: "hardware-store-name-generator",
    name: "Hardware Store",
    title: "Hardware Store Name Generator | AI Powered",
    description: "Generate unique and catchy hardware store names in seconds with our free AI-powered business name generator.",
    keywords: "hardware store name generator, hardware store names, name ideas for hardware store, brandable hardware store names",
    faqs: [
      {
        question: "How do I choose a good name for my hardware store?",
        answer: "A good hardware store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these hardware store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my hardware store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "furniture-store",
    slug: "furniture-store-name-generator",
    name: "Furniture Store",
    title: "Furniture Store Name Generator | AI Powered",
    description: "Generate unique and catchy furniture store names in seconds with our free AI-powered business name generator.",
    keywords: "furniture store name generator, furniture store names, name ideas for furniture store, brandable furniture store names",
    faqs: [
      {
        question: "How do I choose a good name for my furniture store?",
        answer: "A good furniture store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these furniture store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my furniture store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "antique-shop",
    slug: "antique-shop-name-generator",
    name: "Antique Shop",
    title: "Antique Shop Name Generator | AI Powered",
    description: "Generate unique and catchy antique shop names in seconds with our free AI-powered business name generator.",
    keywords: "antique shop name generator, antique shop names, name ideas for antique shop, brandable antique shop names",
    faqs: [
      {
        question: "How do I choose a good name for my antique shop?",
        answer: "A good antique shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these antique shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my antique shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "thrift-store",
    slug: "thrift-store-name-generator",
    name: "Thrift Store",
    title: "Thrift Store Name Generator | AI Powered",
    description: "Generate unique and catchy thrift store names in seconds with our free AI-powered business name generator.",
    keywords: "thrift store name generator, thrift store names, name ideas for thrift store, brandable thrift store names",
    faqs: [
      {
        question: "How do I choose a good name for my thrift store?",
        answer: "A good thrift store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these thrift store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my thrift store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bookstore",
    slug: "bookstore-name-generator",
    name: "Bookstore",
    title: "Bookstore Name Generator | AI Powered",
    description: "Generate unique and catchy bookstore names in seconds with our free AI-powered business name generator.",
    keywords: "bookstore name generator, bookstore names, name ideas for bookstore, brandable bookstore names",
    faqs: [
      {
        question: "How do I choose a good name for my bookstore?",
        answer: "A good bookstore name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bookstore names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bookstore name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "florist",
    slug: "florist-name-generator",
    name: "Florist",
    title: "Florist Name Generator | AI Powered",
    description: "Generate unique and catchy florist names in seconds with our free AI-powered business name generator.",
    keywords: "florist name generator, florist names, name ideas for florist, brandable florist names",
    faqs: [
      {
        question: "How do I choose a good name for my florist?",
        answer: "A good florist name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these florist names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my florist name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "gift-shop",
    slug: "gift-shop-name-generator",
    name: "Gift Shop",
    title: "Gift Shop Name Generator | AI Powered",
    description: "Generate unique and catchy gift shop names in seconds with our free AI-powered business name generator.",
    keywords: "gift shop name generator, gift shop names, name ideas for gift shop, brandable gift shop names",
    faqs: [
      {
        question: "How do I choose a good name for my gift shop?",
        answer: "A good gift shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these gift shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my gift shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "toy-store",
    slug: "toy-store-name-generator",
    name: "Toy Store",
    title: "Toy Store Name Generator | AI Powered",
    description: "Generate unique and catchy toy store names in seconds with our free AI-powered business name generator.",
    keywords: "toy store name generator, toy store names, name ideas for toy store, brandable toy store names",
    faqs: [
      {
        question: "How do I choose a good name for my toy store?",
        answer: "A good toy store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these toy store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my toy store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "sporting-goods-store",
    slug: "sporting-goods-store-name-generator",
    name: "Sporting Goods Store",
    title: "Sporting Goods Store Name Generator | AI Powered",
    description: "Generate unique and catchy sporting goods store names in seconds with our free AI-powered business name generator.",
    keywords: "sporting goods store name generator, sporting goods store names, name ideas for sporting goods store, brandable sporting goods store names",
    faqs: [
      {
        question: "How do I choose a good name for my sporting goods store?",
        answer: "A good sporting goods store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these sporting goods store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my sporting goods store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bicycle-shop",
    slug: "bicycle-shop-name-generator",
    name: "Bicycle Shop",
    title: "Bicycle Shop Name Generator | AI Powered",
    description: "Generate unique and catchy bicycle shop names in seconds with our free AI-powered business name generator.",
    keywords: "bicycle shop name generator, bicycle shop names, name ideas for bicycle shop, brandable bicycle shop names",
    faqs: [
      {
        question: "How do I choose a good name for my bicycle shop?",
        answer: "A good bicycle shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bicycle shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bicycle shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "music-store",
    slug: "music-store-name-generator",
    name: "Music Store",
    title: "Music Store Name Generator | AI Powered",
    description: "Generate unique and catchy music store names in seconds with our free AI-powered business name generator.",
    keywords: "music store name generator, music store names, name ideas for music store, brandable music store names",
    faqs: [
      {
        question: "How do I choose a good name for my music store?",
        answer: "A good music store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these music store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my music store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "art-gallery",
    slug: "art-gallery-name-generator",
    name: "Art Gallery",
    title: "Art Gallery Name Generator | AI Powered",
    description: "Generate unique and catchy art gallery names in seconds with our free AI-powered business name generator.",
    keywords: "art gallery name generator, art gallery names, name ideas for art gallery, brandable art gallery names",
    faqs: [
      {
        question: "How do I choose a good name for my art gallery?",
        answer: "A good art gallery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these art gallery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my art gallery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "tattoo-shop",
    slug: "tattoo-shop-name-generator",
    name: "Tattoo Shop",
    title: "Tattoo Shop Name Generator | AI Powered",
    description: "Generate unique and catchy tattoo shop names in seconds with our free AI-powered business name generator.",
    keywords: "tattoo shop name generator, tattoo shop names, name ideas for tattoo shop, brandable tattoo shop names",
    faqs: [
      {
        question: "How do I choose a good name for my tattoo shop?",
        answer: "A good tattoo shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these tattoo shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my tattoo shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "barbershop",
    slug: "barbershop-name-generator",
    name: "Barbershop",
    title: "Barbershop Name Generator | AI Powered",
    description: "Generate unique and catchy barbershop names in seconds with our free AI-powered business name generator.",
    keywords: "barbershop name generator, barbershop names, name ideas for barbershop, brandable barbershop names",
    faqs: [
      {
        question: "How do I choose a good name for my barbershop?",
        answer: "A good barbershop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these barbershop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my barbershop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "nail-salon",
    slug: "nail-salon-name-generator",
    name: "Nail Salon",
    title: "Nail Salon Name Generator | AI Powered",
    description: "Generate unique and catchy nail salon names in seconds with our free AI-powered business name generator.",
    keywords: "nail salon name generator, nail salon names, name ideas for nail salon, brandable nail salon names",
    faqs: [
      {
        question: "How do I choose a good name for my nail salon?",
        answer: "A good nail salon name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these nail salon names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my nail salon name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "spa",
    slug: "spa-name-generator",
    name: "Spa",
    title: "Spa Name Generator | AI Powered",
    description: "Generate unique and catchy spa names in seconds with our free AI-powered business name generator.",
    keywords: "spa name generator, spa names, name ideas for spa, brandable spa names",
    faqs: [
      {
        question: "How do I choose a good name for my spa?",
        answer: "A good spa name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these spa names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my spa name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cosmetics-brand",
    slug: "cosmetics-brand-name-generator",
    name: "Cosmetics Brand",
    title: "Cosmetics Brand Name Generator | AI Powered",
    description: "Generate unique and catchy cosmetics brand names in seconds with our free AI-powered business name generator.",
    keywords: "cosmetics brand name generator, cosmetics brand names, name ideas for cosmetics brand, brandable cosmetics brand names",
    faqs: [
      {
        question: "How do I choose a good name for my cosmetics brand?",
        answer: "A good cosmetics brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cosmetics brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cosmetics brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "skincare-brand",
    slug: "skincare-brand-name-generator",
    name: "Skincare Brand",
    title: "Skincare Brand Name Generator | AI Powered",
    description: "Generate unique and catchy skincare brand names in seconds with our free AI-powered business name generator.",
    keywords: "skincare brand name generator, skincare brand names, name ideas for skincare brand, brandable skincare brand names",
    faqs: [
      {
        question: "How do I choose a good name for my skincare brand?",
        answer: "A good skincare brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these skincare brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my skincare brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "haircare-brand",
    slug: "haircare-brand-name-generator",
    name: "Haircare Brand",
    title: "Haircare Brand Name Generator | AI Powered",
    description: "Generate unique and catchy haircare brand names in seconds with our free AI-powered business name generator.",
    keywords: "haircare brand name generator, haircare brand names, name ideas for haircare brand, brandable haircare brand names",
    faqs: [
      {
        question: "How do I choose a good name for my haircare brand?",
        answer: "A good haircare brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these haircare brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my haircare brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "supplement-brand",
    slug: "supplement-brand-name-generator",
    name: "Supplement Brand",
    title: "Supplement Brand Name Generator | AI Powered",
    description: "Generate unique and catchy supplement brand names in seconds with our free AI-powered business name generator.",
    keywords: "supplement brand name generator, supplement brand names, name ideas for supplement brand, brandable supplement brand names",
    faqs: [
      {
        question: "How do I choose a good name for my supplement brand?",
        answer: "A good supplement brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these supplement brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my supplement brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "fitness-apparel",
    slug: "fitness-apparel-name-generator",
    name: "Fitness Apparel",
    title: "Fitness Apparel Name Generator | AI Powered",
    description: "Generate unique and catchy fitness apparel names in seconds with our free AI-powered business name generator.",
    keywords: "fitness apparel name generator, fitness apparel names, name ideas for fitness apparel, brandable fitness apparel names",
    faqs: [
      {
        question: "How do I choose a good name for my fitness apparel?",
        answer: "A good fitness apparel name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these fitness apparel names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my fitness apparel name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "shoe-brand",
    slug: "shoe-brand-name-generator",
    name: "Shoe Brand",
    title: "Shoe Brand Name Generator | AI Powered",
    description: "Generate unique and catchy shoe brand names in seconds with our free AI-powered business name generator.",
    keywords: "shoe brand name generator, shoe brand names, name ideas for shoe brand, brandable shoe brand names",
    faqs: [
      {
        question: "How do I choose a good name for my shoe brand?",
        answer: "A good shoe brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these shoe brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my shoe brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bag-brand",
    slug: "bag-brand-name-generator",
    name: "Bag Brand",
    title: "Bag Brand Name Generator | AI Powered",
    description: "Generate unique and catchy bag brand names in seconds with our free AI-powered business name generator.",
    keywords: "bag brand name generator, bag brand names, name ideas for bag brand, brandable bag brand names",
    faqs: [
      {
        question: "How do I choose a good name for my bag brand?",
        answer: "A good bag brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bag brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bag brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "watch-brand",
    slug: "watch-brand-name-generator",
    name: "Watch Brand",
    title: "Watch Brand Name Generator | AI Powered",
    description: "Generate unique and catchy watch brand names in seconds with our free AI-powered business name generator.",
    keywords: "watch brand name generator, watch brand names, name ideas for watch brand, brandable watch brand names",
    faqs: [
      {
        question: "How do I choose a good name for my watch brand?",
        answer: "A good watch brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these watch brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my watch brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "sunglass-brand",
    slug: "sunglass-brand-name-generator",
    name: "Sunglass Brand",
    title: "Sunglass Brand Name Generator | AI Powered",
    description: "Generate unique and catchy sunglass brand names in seconds with our free AI-powered business name generator.",
    keywords: "sunglass brand name generator, sunglass brand names, name ideas for sunglass brand, brandable sunglass brand names",
    faqs: [
      {
        question: "How do I choose a good name for my sunglass brand?",
        answer: "A good sunglass brand name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these sunglass brand names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my sunglass brand name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "tech-startup",
    slug: "tech-startup-name-generator",
    name: "Tech Startup",
    title: "Tech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy tech startup names in seconds with our free AI-powered business name generator.",
    keywords: "tech startup name generator, tech startup names, name ideas for tech startup, brandable tech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my tech startup?",
        answer: "A good tech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these tech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my tech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "saas-company",
    slug: "saas-company-name-generator",
    name: "SaaS Company",
    title: "SaaS Company Name Generator | AI Powered",
    description: "Generate unique and catchy saas company names in seconds with our free AI-powered business name generator.",
    keywords: "saas company name generator, saas company names, name ideas for saas company, brandable saas company names",
    faqs: [
      {
        question: "How do I choose a good name for my saas company?",
        answer: "A good saas company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these saas company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my saas company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "app-development",
    slug: "app-development-name-generator",
    name: "App Development",
    title: "App Development Name Generator | AI Powered",
    description: "Generate unique and catchy app development names in seconds with our free AI-powered business name generator.",
    keywords: "app development name generator, app development names, name ideas for app development, brandable app development names",
    faqs: [
      {
        question: "How do I choose a good name for my app development?",
        answer: "A good app development name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these app development names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my app development name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "web-design",
    slug: "web-design-name-generator",
    name: "Web Design",
    title: "Web Design Name Generator | AI Powered",
    description: "Generate unique and catchy web design names in seconds with our free AI-powered business name generator.",
    keywords: "web design name generator, web design names, name ideas for web design, brandable web design names",
    faqs: [
      {
        question: "How do I choose a good name for my web design?",
        answer: "A good web design name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these web design names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my web design name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "graphic-design",
    slug: "graphic-design-name-generator",
    name: "Graphic Design",
    title: "Graphic Design Name Generator | AI Powered",
    description: "Generate unique and catchy graphic design names in seconds with our free AI-powered business name generator.",
    keywords: "graphic design name generator, graphic design names, name ideas for graphic design, brandable graphic design names",
    faqs: [
      {
        question: "How do I choose a good name for my graphic design?",
        answer: "A good graphic design name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these graphic design names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my graphic design name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "seo-agency",
    slug: "seo-agency-name-generator",
    name: "SEO Agency",
    title: "SEO Agency Name Generator | AI Powered",
    description: "Generate unique and catchy seo agency names in seconds with our free AI-powered business name generator.",
    keywords: "seo agency name generator, seo agency names, name ideas for seo agency, brandable seo agency names",
    faqs: [
      {
        question: "How do I choose a good name for my seo agency?",
        answer: "A good seo agency name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these seo agency names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my seo agency name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "social-media-agency",
    slug: "social-media-agency-name-generator",
    name: "Social Media Agency",
    title: "Social Media Agency Name Generator | AI Powered",
    description: "Generate unique and catchy social media agency names in seconds with our free AI-powered business name generator.",
    keywords: "social media agency name generator, social media agency names, name ideas for social media agency, brandable social media agency names",
    faqs: [
      {
        question: "How do I choose a good name for my social media agency?",
        answer: "A good social media agency name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these social media agency names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my social media agency name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pr-agency",
    slug: "pr-agency-name-generator",
    name: "PR Agency",
    title: "PR Agency Name Generator | AI Powered",
    description: "Generate unique and catchy pr agency names in seconds with our free AI-powered business name generator.",
    keywords: "pr agency name generator, pr agency names, name ideas for pr agency, brandable pr agency names",
    faqs: [
      {
        question: "How do I choose a good name for my pr agency?",
        answer: "A good pr agency name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pr agency names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pr agency name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "copywriting-service",
    slug: "copywriting-service-name-generator",
    name: "Copywriting Service",
    title: "Copywriting Service Name Generator | AI Powered",
    description: "Generate unique and catchy copywriting service names in seconds with our free AI-powered business name generator.",
    keywords: "copywriting service name generator, copywriting service names, name ideas for copywriting service, brandable copywriting service names",
    faqs: [
      {
        question: "How do I choose a good name for my copywriting service?",
        answer: "A good copywriting service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these copywriting service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my copywriting service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "translation-service",
    slug: "translation-service-name-generator",
    name: "Translation Service",
    title: "Translation Service Name Generator | AI Powered",
    description: "Generate unique and catchy translation service names in seconds with our free AI-powered business name generator.",
    keywords: "translation service name generator, translation service names, name ideas for translation service, brandable translation service names",
    faqs: [
      {
        question: "How do I choose a good name for my translation service?",
        answer: "A good translation service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these translation service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my translation service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "tutoring-service",
    slug: "tutoring-service-name-generator",
    name: "Tutoring Service",
    title: "Tutoring Service Name Generator | AI Powered",
    description: "Generate unique and catchy tutoring service names in seconds with our free AI-powered business name generator.",
    keywords: "tutoring service name generator, tutoring service names, name ideas for tutoring service, brandable tutoring service names",
    faqs: [
      {
        question: "How do I choose a good name for my tutoring service?",
        answer: "A good tutoring service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these tutoring service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my tutoring service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "language-school",
    slug: "language-school-name-generator",
    name: "Language School",
    title: "Language School Name Generator | AI Powered",
    description: "Generate unique and catchy language school names in seconds with our free AI-powered business name generator.",
    keywords: "language school name generator, language school names, name ideas for language school, brandable language school names",
    faqs: [
      {
        question: "How do I choose a good name for my language school?",
        answer: "A good language school name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these language school names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my language school name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "driving-school",
    slug: "driving-school-name-generator",
    name: "Driving School",
    title: "Driving School Name Generator | AI Powered",
    description: "Generate unique and catchy driving school names in seconds with our free AI-powered business name generator.",
    keywords: "driving school name generator, driving school names, name ideas for driving school, brandable driving school names",
    faqs: [
      {
        question: "How do I choose a good name for my driving school?",
        answer: "A good driving school name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these driving school names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my driving school name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "daycare-center",
    slug: "daycare-center-name-generator",
    name: "Daycare Center",
    title: "Daycare Center Name Generator | AI Powered",
    description: "Generate unique and catchy daycare center names in seconds with our free AI-powered business name generator.",
    keywords: "daycare center name generator, daycare center names, name ideas for daycare center, brandable daycare center names",
    faqs: [
      {
        question: "How do I choose a good name for my daycare center?",
        answer: "A good daycare center name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these daycare center names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my daycare center name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "preschool",
    slug: "preschool-name-generator",
    name: "Preschool",
    title: "Preschool Name Generator | AI Powered",
    description: "Generate unique and catchy preschool names in seconds with our free AI-powered business name generator.",
    keywords: "preschool name generator, preschool names, name ideas for preschool, brandable preschool names",
    faqs: [
      {
        question: "How do I choose a good name for my preschool?",
        answer: "A good preschool name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these preschool names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my preschool name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "private-school",
    slug: "private-school-name-generator",
    name: "Private School",
    title: "Private School Name Generator | AI Powered",
    description: "Generate unique and catchy private school names in seconds with our free AI-powered business name generator.",
    keywords: "private school name generator, private school names, name ideas for private school, brandable private school names",
    faqs: [
      {
        question: "How do I choose a good name for my private school?",
        answer: "A good private school name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these private school names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my private school name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "summer-camp",
    slug: "summer-camp-name-generator",
    name: "Summer Camp",
    title: "Summer Camp Name Generator | AI Powered",
    description: "Generate unique and catchy summer camp names in seconds with our free AI-powered business name generator.",
    keywords: "summer camp name generator, summer camp names, name ideas for summer camp, brandable summer camp names",
    faqs: [
      {
        question: "How do I choose a good name for my summer camp?",
        answer: "A good summer camp name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these summer camp names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my summer camp name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "coworking-space",
    slug: "coworking-space-name-generator",
    name: "Coworking Space",
    title: "Coworking Space Name Generator | AI Powered",
    description: "Generate unique and catchy coworking space names in seconds with our free AI-powered business name generator.",
    keywords: "coworking space name generator, coworking space names, name ideas for coworking space, brandable coworking space names",
    faqs: [
      {
        question: "How do I choose a good name for my coworking space?",
        answer: "A good coworking space name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these coworking space names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my coworking space name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "hotel",
    slug: "hotel-name-generator",
    name: "Hotel",
    title: "Hotel Name Generator | AI Powered",
    description: "Generate unique and catchy hotel names in seconds with our free AI-powered business name generator.",
    keywords: "hotel name generator, hotel names, name ideas for hotel, brandable hotel names",
    faqs: [
      {
        question: "How do I choose a good name for my hotel?",
        answer: "A good hotel name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these hotel names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my hotel name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "motel",
    slug: "motel-name-generator",
    name: "Motel",
    title: "Motel Name Generator | AI Powered",
    description: "Generate unique and catchy motel names in seconds with our free AI-powered business name generator.",
    keywords: "motel name generator, motel names, name ideas for motel, brandable motel names",
    faqs: [
      {
        question: "How do I choose a good name for my motel?",
        answer: "A good motel name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these motel names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my motel name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bed-and-breakfast",
    slug: "bed-and-breakfast-name-generator",
    name: "Bed and Breakfast",
    title: "Bed and Breakfast Name Generator | AI Powered",
    description: "Generate unique and catchy bed and breakfast names in seconds with our free AI-powered business name generator.",
    keywords: "bed and breakfast name generator, bed and breakfast names, name ideas for bed and breakfast, brandable bed and breakfast names",
    faqs: [
      {
        question: "How do I choose a good name for my bed and breakfast?",
        answer: "A good bed and breakfast name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bed and breakfast names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bed and breakfast name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "hostel",
    slug: "hostel-name-generator",
    name: "Hostel",
    title: "Hostel Name Generator | AI Powered",
    description: "Generate unique and catchy hostel names in seconds with our free AI-powered business name generator.",
    keywords: "hostel name generator, hostel names, name ideas for hostel, brandable hostel names",
    faqs: [
      {
        question: "How do I choose a good name for my hostel?",
        answer: "A good hostel name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these hostel names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my hostel name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "property-management",
    slug: "property-management-name-generator",
    name: "Property Management",
    title: "Property Management Name Generator | AI Powered",
    description: "Generate unique and catchy property management names in seconds with our free AI-powered business name generator.",
    keywords: "property management name generator, property management names, name ideas for property management, brandable property management names",
    faqs: [
      {
        question: "How do I choose a good name for my property management?",
        answer: "A good property management name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these property management names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my property management name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "architectural-firm",
    slug: "architectural-firm-name-generator",
    name: "Architectural Firm",
    title: "Architectural Firm Name Generator | AI Powered",
    description: "Generate unique and catchy architectural firm names in seconds with our free AI-powered business name generator.",
    keywords: "architectural firm name generator, architectural firm names, name ideas for architectural firm, brandable architectural firm names",
    faqs: [
      {
        question: "How do I choose a good name for my architectural firm?",
        answer: "A good architectural firm name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these architectural firm names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my architectural firm name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "interior-design",
    slug: "interior-design-name-generator",
    name: "Interior Design",
    title: "Interior Design Name Generator | AI Powered",
    description: "Generate unique and catchy interior design names in seconds with our free AI-powered business name generator.",
    keywords: "interior design name generator, interior design names, name ideas for interior design, brandable interior design names",
    faqs: [
      {
        question: "How do I choose a good name for my interior design?",
        answer: "A good interior design name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these interior design names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my interior design name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "home-staging",
    slug: "home-staging-name-generator",
    name: "Home Staging",
    title: "Home Staging Name Generator | AI Powered",
    description: "Generate unique and catchy home staging names in seconds with our free AI-powered business name generator.",
    keywords: "home staging name generator, home staging names, name ideas for home staging, brandable home staging names",
    faqs: [
      {
        question: "How do I choose a good name for my home staging?",
        answer: "A good home staging name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these home staging names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my home staging name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "security-company",
    slug: "security-company-name-generator",
    name: "Security Company",
    title: "Security Company Name Generator | AI Powered",
    description: "Generate unique and catchy security company names in seconds with our free AI-powered business name generator.",
    keywords: "security company name generator, security company names, name ideas for security company, brandable security company names",
    faqs: [
      {
        question: "How do I choose a good name for my security company?",
        answer: "A good security company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these security company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my security company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "private-investigator",
    slug: "private-investigator-name-generator",
    name: "Private Investigator",
    title: "Private Investigator Name Generator | AI Powered",
    description: "Generate unique and catchy private investigator names in seconds with our free AI-powered business name generator.",
    keywords: "private investigator name generator, private investigator names, name ideas for private investigator, brandable private investigator names",
    faqs: [
      {
        question: "How do I choose a good name for my private investigator?",
        answer: "A good private investigator name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these private investigator names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my private investigator name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "courier-service",
    slug: "courier-service-name-generator",
    name: "Courier Service",
    title: "Courier Service Name Generator | AI Powered",
    description: "Generate unique and catchy courier service names in seconds with our free AI-powered business name generator.",
    keywords: "courier service name generator, courier service names, name ideas for courier service, brandable courier service names",
    faqs: [
      {
        question: "How do I choose a good name for my courier service?",
        answer: "A good courier service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these courier service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my courier service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "logistics-company",
    slug: "logistics-company-name-generator",
    name: "Logistics Company",
    title: "Logistics Company Name Generator | AI Powered",
    description: "Generate unique and catchy logistics company names in seconds with our free AI-powered business name generator.",
    keywords: "logistics company name generator, logistics company names, name ideas for logistics company, brandable logistics company names",
    faqs: [
      {
        question: "How do I choose a good name for my logistics company?",
        answer: "A good logistics company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these logistics company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my logistics company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "trucking-company",
    slug: "trucking-company-name-generator",
    name: "Trucking Company",
    title: "Trucking Company Name Generator | AI Powered",
    description: "Generate unique and catchy trucking company names in seconds with our free AI-powered business name generator.",
    keywords: "trucking company name generator, trucking company names, name ideas for trucking company, brandable trucking company names",
    faqs: [
      {
        question: "How do I choose a good name for my trucking company?",
        answer: "A good trucking company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these trucking company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my trucking company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "freight-broker",
    slug: "freight-broker-name-generator",
    name: "Freight Broker",
    title: "Freight Broker Name Generator | AI Powered",
    description: "Generate unique and catchy freight broker names in seconds with our free AI-powered business name generator.",
    keywords: "freight broker name generator, freight broker names, name ideas for freight broker, brandable freight broker names",
    faqs: [
      {
        question: "How do I choose a good name for my freight broker?",
        answer: "A good freight broker name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these freight broker names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my freight broker name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "import-export-business",
    slug: "import-export-business-name-generator",
    name: "Import Export Business",
    title: "Import Export Business Name Generator | AI Powered",
    description: "Generate unique and catchy import export business names in seconds with our free AI-powered business name generator.",
    keywords: "import export business name generator, import export business names, name ideas for import export business, brandable import export business names",
    faqs: [
      {
        question: "How do I choose a good name for my import export business?",
        answer: "A good import export business name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these import export business names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my import export business name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "manufacturing-company",
    slug: "manufacturing-company-name-generator",
    name: "Manufacturing Company",
    title: "Manufacturing Company Name Generator | AI Powered",
    description: "Generate unique and catchy manufacturing company names in seconds with our free AI-powered business name generator.",
    keywords: "manufacturing company name generator, manufacturing company names, name ideas for manufacturing company, brandable manufacturing company names",
    faqs: [
      {
        question: "How do I choose a good name for my manufacturing company?",
        answer: "A good manufacturing company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these manufacturing company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my manufacturing company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "wholesale-business",
    slug: "wholesale-business-name-generator",
    name: "Wholesale Business",
    title: "Wholesale Business Name Generator | AI Powered",
    description: "Generate unique and catchy wholesale business names in seconds with our free AI-powered business name generator.",
    keywords: "wholesale business name generator, wholesale business names, name ideas for wholesale business, brandable wholesale business names",
    faqs: [
      {
        question: "How do I choose a good name for my wholesale business?",
        answer: "A good wholesale business name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these wholesale business names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my wholesale business name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dropshipping-store",
    slug: "dropshipping-store-name-generator",
    name: "Dropshipping Store",
    title: "Dropshipping Store Name Generator | AI Powered",
    description: "Generate unique and catchy dropshipping store names in seconds with our free AI-powered business name generator.",
    keywords: "dropshipping store name generator, dropshipping store names, name ideas for dropshipping store, brandable dropshipping store names",
    faqs: [
      {
        question: "How do I choose a good name for my dropshipping store?",
        answer: "A good dropshipping store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dropshipping store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dropshipping store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "subscription-box",
    slug: "subscription-box-name-generator",
    name: "Subscription Box",
    title: "Subscription Box Name Generator | AI Powered",
    description: "Generate unique and catchy subscription box names in seconds with our free AI-powered business name generator.",
    keywords: "subscription box name generator, subscription box names, name ideas for subscription box, brandable subscription box names",
    faqs: [
      {
        question: "How do I choose a good name for my subscription box?",
        answer: "A good subscription box name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these subscription box names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my subscription box name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "etsy-shop",
    slug: "etsy-shop-name-generator",
    name: "Etsy Shop",
    title: "Etsy Shop Name Generator | AI Powered",
    description: "Generate unique and catchy etsy shop names in seconds with our free AI-powered business name generator.",
    keywords: "etsy shop name generator, etsy shop names, name ideas for etsy shop, brandable etsy shop names",
    faqs: [
      {
        question: "How do I choose a good name for my etsy shop?",
        answer: "A good etsy shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these etsy shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my etsy shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "amazon-fba",
    slug: "amazon-fba-name-generator",
    name: "Amazon FBA",
    title: "Amazon FBA Name Generator | AI Powered",
    description: "Generate unique and catchy amazon fba names in seconds with our free AI-powered business name generator.",
    keywords: "amazon fba name generator, amazon fba names, name ideas for amazon fba, brandable amazon fba names",
    faqs: [
      {
        question: "How do I choose a good name for my amazon fba?",
        answer: "A good amazon fba name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these amazon fba names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my amazon fba name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "affiliate-marketing",
    slug: "affiliate-marketing-name-generator",
    name: "Affiliate Marketing",
    title: "Affiliate Marketing Name Generator | AI Powered",
    description: "Generate unique and catchy affiliate marketing names in seconds with our free AI-powered business name generator.",
    keywords: "affiliate marketing name generator, affiliate marketing names, name ideas for affiliate marketing, brandable affiliate marketing names",
    faqs: [
      {
        question: "How do I choose a good name for my affiliate marketing?",
        answer: "A good affiliate marketing name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these affiliate marketing names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my affiliate marketing name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "blogging",
    slug: "blogging-name-generator",
    name: "Blogging",
    title: "Blogging Name Generator | AI Powered",
    description: "Generate unique and catchy blogging names in seconds with our free AI-powered business name generator.",
    keywords: "blogging name generator, blogging names, name ideas for blogging, brandable blogging names",
    faqs: [
      {
        question: "How do I choose a good name for my blogging?",
        answer: "A good blogging name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these blogging names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my blogging name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "vlogging",
    slug: "vlogging-name-generator",
    name: "Vlogging",
    title: "Vlogging Name Generator | AI Powered",
    description: "Generate unique and catchy vlogging names in seconds with our free AI-powered business name generator.",
    keywords: "vlogging name generator, vlogging names, name ideas for vlogging, brandable vlogging names",
    faqs: [
      {
        question: "How do I choose a good name for my vlogging?",
        answer: "A good vlogging name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these vlogging names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my vlogging name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "twitch-streamer",
    slug: "twitch-streamer-name-generator",
    name: "Twitch Streamer",
    title: "Twitch Streamer Name Generator | AI Powered",
    description: "Generate unique and catchy twitch streamer names in seconds with our free AI-powered business name generator.",
    keywords: "twitch streamer name generator, twitch streamer names, name ideas for twitch streamer, brandable twitch streamer names",
    faqs: [
      {
        question: "How do I choose a good name for my twitch streamer?",
        answer: "A good twitch streamer name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these twitch streamer names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my twitch streamer name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "esports-team",
    slug: "esports-team-name-generator",
    name: "Esports Team",
    title: "Esports Team Name Generator | AI Powered",
    description: "Generate unique and catchy esports team names in seconds with our free AI-powered business name generator.",
    keywords: "esports team name generator, esports team names, name ideas for esports team, brandable esports team names",
    faqs: [
      {
        question: "How do I choose a good name for my esports team?",
        answer: "A good esports team name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these esports team names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my esports team name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "game-development",
    slug: "game-development-name-generator",
    name: "Game Development",
    title: "Game Development Name Generator | AI Powered",
    description: "Generate unique and catchy game development names in seconds with our free AI-powered business name generator.",
    keywords: "game development name generator, game development names, name ideas for game development, brandable game development names",
    faqs: [
      {
        question: "How do I choose a good name for my game development?",
        answer: "A good game development name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these game development names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my game development name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "vr-startup",
    slug: "vr-startup-name-generator",
    name: "VR Startup",
    title: "VR Startup Name Generator | AI Powered",
    description: "Generate unique and catchy vr startup names in seconds with our free AI-powered business name generator.",
    keywords: "vr startup name generator, vr startup names, name ideas for vr startup, brandable vr startup names",
    faqs: [
      {
        question: "How do I choose a good name for my vr startup?",
        answer: "A good vr startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these vr startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my vr startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "ar-startup",
    slug: "ar-startup-name-generator",
    name: "AR Startup",
    title: "AR Startup Name Generator | AI Powered",
    description: "Generate unique and catchy ar startup names in seconds with our free AI-powered business name generator.",
    keywords: "ar startup name generator, ar startup names, name ideas for ar startup, brandable ar startup names",
    faqs: [
      {
        question: "How do I choose a good name for my ar startup?",
        answer: "A good ar startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these ar startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my ar startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "crypto-startup",
    slug: "crypto-startup-name-generator",
    name: "Crypto Startup",
    title: "Crypto Startup Name Generator | AI Powered",
    description: "Generate unique and catchy crypto startup names in seconds with our free AI-powered business name generator.",
    keywords: "crypto startup name generator, crypto startup names, name ideas for crypto startup, brandable crypto startup names",
    faqs: [
      {
        question: "How do I choose a good name for my crypto startup?",
        answer: "A good crypto startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these crypto startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my crypto startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "nft-project",
    slug: "nft-project-name-generator",
    name: "NFT Project",
    title: "NFT Project Name Generator | AI Powered",
    description: "Generate unique and catchy nft project names in seconds with our free AI-powered business name generator.",
    keywords: "nft project name generator, nft project names, name ideas for nft project, brandable nft project names",
    faqs: [
      {
        question: "How do I choose a good name for my nft project?",
        answer: "A good nft project name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these nft project names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my nft project name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "web3-company",
    slug: "web3-company-name-generator",
    name: "Web3 Company",
    title: "Web3 Company Name Generator | AI Powered",
    description: "Generate unique and catchy web3 company names in seconds with our free AI-powered business name generator.",
    keywords: "web3 company name generator, web3 company names, name ideas for web3 company, brandable web3 company names",
    faqs: [
      {
        question: "How do I choose a good name for my web3 company?",
        answer: "A good web3 company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these web3 company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my web3 company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "fintech-startup",
    slug: "fintech-startup-name-generator",
    name: "Fintech Startup",
    title: "Fintech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy fintech startup names in seconds with our free AI-powered business name generator.",
    keywords: "fintech startup name generator, fintech startup names, name ideas for fintech startup, brandable fintech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my fintech startup?",
        answer: "A good fintech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these fintech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my fintech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "healthtech-startup",
    slug: "healthtech-startup-name-generator",
    name: "Healthtech Startup",
    title: "Healthtech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy healthtech startup names in seconds with our free AI-powered business name generator.",
    keywords: "healthtech startup name generator, healthtech startup names, name ideas for healthtech startup, brandable healthtech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my healthtech startup?",
        answer: "A good healthtech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these healthtech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my healthtech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "edtech-startup",
    slug: "edtech-startup-name-generator",
    name: "Edtech Startup",
    title: "Edtech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy edtech startup names in seconds with our free AI-powered business name generator.",
    keywords: "edtech startup name generator, edtech startup names, name ideas for edtech startup, brandable edtech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my edtech startup?",
        answer: "A good edtech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these edtech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my edtech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "proptech-startup",
    slug: "proptech-startup-name-generator",
    name: "Proptech Startup",
    title: "Proptech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy proptech startup names in seconds with our free AI-powered business name generator.",
    keywords: "proptech startup name generator, proptech startup names, name ideas for proptech startup, brandable proptech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my proptech startup?",
        answer: "A good proptech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these proptech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my proptech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cleantech-startup",
    slug: "cleantech-startup-name-generator",
    name: "Cleantech Startup",
    title: "Cleantech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy cleantech startup names in seconds with our free AI-powered business name generator.",
    keywords: "cleantech startup name generator, cleantech startup names, name ideas for cleantech startup, brandable cleantech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my cleantech startup?",
        answer: "A good cleantech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cleantech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cleantech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "agtech-startup",
    slug: "agtech-startup-name-generator",
    name: "Agtech Startup",
    title: "Agtech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy agtech startup names in seconds with our free AI-powered business name generator.",
    keywords: "agtech startup name generator, agtech startup names, name ideas for agtech startup, brandable agtech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my agtech startup?",
        answer: "A good agtech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these agtech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my agtech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "spacetech-startup",
    slug: "spacetech-startup-name-generator",
    name: "SpaceTech Startup",
    title: "SpaceTech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy spacetech startup names in seconds with our free AI-powered business name generator.",
    keywords: "spacetech startup name generator, spacetech startup names, name ideas for spacetech startup, brandable spacetech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my spacetech startup?",
        answer: "A good spacetech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these spacetech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my spacetech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "biotech-startup",
    slug: "biotech-startup-name-generator",
    name: "Biotech Startup",
    title: "Biotech Startup Name Generator | AI Powered",
    description: "Generate unique and catchy biotech startup names in seconds with our free AI-powered business name generator.",
    keywords: "biotech startup name generator, biotech startup names, name ideas for biotech startup, brandable biotech startup names",
    faqs: [
      {
        question: "How do I choose a good name for my biotech startup?",
        answer: "A good biotech startup name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these biotech startup names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my biotech startup name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "robotics-company",
    slug: "robotics-company-name-generator",
    name: "Robotics Company",
    title: "Robotics Company Name Generator | AI Powered",
    description: "Generate unique and catchy robotics company names in seconds with our free AI-powered business name generator.",
    keywords: "robotics company name generator, robotics company names, name ideas for robotics company, brandable robotics company names",
    faqs: [
      {
        question: "How do I choose a good name for my robotics company?",
        answer: "A good robotics company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these robotics company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my robotics company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "drone-company",
    slug: "drone-company-name-generator",
    name: "Drone Company",
    title: "Drone Company Name Generator | AI Powered",
    description: "Generate unique and catchy drone company names in seconds with our free AI-powered business name generator.",
    keywords: "drone company name generator, drone company names, name ideas for drone company, brandable drone company names",
    faqs: [
      {
        question: "How do I choose a good name for my drone company?",
        answer: "A good drone company name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these drone company names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my drone company name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "3d-printing-service",
    slug: "3d-printing-service-name-generator",
    name: "3D Printing Service",
    title: "3D Printing Service Name Generator | AI Powered",
    description: "Generate unique and catchy 3d printing service names in seconds with our free AI-powered business name generator.",
    keywords: "3d printing service name generator, 3d printing service names, name ideas for 3d printing service, brandable 3d printing service names",
    faqs: [
      {
        question: "How do I choose a good name for my 3d printing service?",
        answer: "A good 3d printing service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these 3d printing service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my 3d printing service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "consulting-firm",
    slug: "consulting-firm-name-generator",
    name: "Consulting Firm",
    title: "Consulting Firm Name Generator | AI Powered",
    description: "Generate unique and catchy consulting firm names in seconds with our free AI-powered business name generator.",
    keywords: "consulting firm name generator, consulting firm names, name ideas for consulting firm, brandable consulting firm names",
    faqs: [
      {
        question: "How do I choose a good name for my consulting firm?",
        answer: "A good consulting firm name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these consulting firm names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my consulting firm name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "life-coach",
    slug: "life-coach-name-generator",
    name: "Life Coach",
    title: "Life Coach Name Generator | AI Powered",
    description: "Generate unique and catchy life coach names in seconds with our free AI-powered business name generator.",
    keywords: "life coach name generator, life coach names, name ideas for life coach, brandable life coach names",
    faqs: [
      {
        question: "How do I choose a good name for my life coach?",
        answer: "A good life coach name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these life coach names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my life coach name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "business-coach",
    slug: "business-coach-name-generator",
    name: "Business Coach",
    title: "Business Coach Name Generator | AI Powered",
    description: "Generate unique and catchy business coach names in seconds with our free AI-powered business name generator.",
    keywords: "business coach name generator, business coach names, name ideas for business coach, brandable business coach names",
    faqs: [
      {
        question: "How do I choose a good name for my business coach?",
        answer: "A good business coach name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these business coach names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my business coach name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "career-counselor",
    slug: "career-counselor-name-generator",
    name: "Career Counselor",
    title: "Career Counselor Name Generator | AI Powered",
    description: "Generate unique and catchy career counselor names in seconds with our free AI-powered business name generator.",
    keywords: "career counselor name generator, career counselor names, name ideas for career counselor, brandable career counselor names",
    faqs: [
      {
        question: "How do I choose a good name for my career counselor?",
        answer: "A good career counselor name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these career counselor names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my career counselor name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "therapist",
    slug: "therapist-name-generator",
    name: "Therapist",
    title: "Therapist Name Generator | AI Powered",
    description: "Generate unique and catchy therapist names in seconds with our free AI-powered business name generator.",
    keywords: "therapist name generator, therapist names, name ideas for therapist, brandable therapist names",
    faqs: [
      {
        question: "How do I choose a good name for my therapist?",
        answer: "A good therapist name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these therapist names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my therapist name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "psychiatrist",
    slug: "psychiatrist-name-generator",
    name: "Psychiatrist",
    title: "Psychiatrist Name Generator | AI Powered",
    description: "Generate unique and catchy psychiatrist names in seconds with our free AI-powered business name generator.",
    keywords: "psychiatrist name generator, psychiatrist names, name ideas for psychiatrist, brandable psychiatrist names",
    faqs: [
      {
        question: "How do I choose a good name for my psychiatrist?",
        answer: "A good psychiatrist name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these psychiatrist names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my psychiatrist name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "nutritionist",
    slug: "nutritionist-name-generator",
    name: "Nutritionist",
    title: "Nutritionist Name Generator | AI Powered",
    description: "Generate unique and catchy nutritionist names in seconds with our free AI-powered business name generator.",
    keywords: "nutritionist name generator, nutritionist names, name ideas for nutritionist, brandable nutritionist names",
    faqs: [
      {
        question: "How do I choose a good name for my nutritionist?",
        answer: "A good nutritionist name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these nutritionist names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my nutritionist name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dietitian",
    slug: "dietitian-name-generator",
    name: "Dietitian",
    title: "Dietitian Name Generator | AI Powered",
    description: "Generate unique and catchy dietitian names in seconds with our free AI-powered business name generator.",
    keywords: "dietitian name generator, dietitian names, name ideas for dietitian, brandable dietitian names",
    faqs: [
      {
        question: "How do I choose a good name for my dietitian?",
        answer: "A good dietitian name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dietitian names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dietitian name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "personal-chef",
    slug: "personal-chef-name-generator",
    name: "Personal Chef",
    title: "Personal Chef Name Generator | AI Powered",
    description: "Generate unique and catchy personal chef names in seconds with our free AI-powered business name generator.",
    keywords: "personal chef name generator, personal chef names, name ideas for personal chef, brandable personal chef names",
    faqs: [
      {
        question: "How do I choose a good name for my personal chef?",
        answer: "A good personal chef name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these personal chef names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my personal chef name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "food-delivery",
    slug: "food-delivery-name-generator",
    name: "Food Delivery",
    title: "Food Delivery Name Generator | AI Powered",
    description: "Generate unique and catchy food delivery names in seconds with our free AI-powered business name generator.",
    keywords: "food delivery name generator, food delivery names, name ideas for food delivery, brandable food delivery names",
    faqs: [
      {
        question: "How do I choose a good name for my food delivery?",
        answer: "A good food delivery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these food delivery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my food delivery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "grocery-delivery",
    slug: "grocery-delivery-name-generator",
    name: "Grocery Delivery",
    title: "Grocery Delivery Name Generator | AI Powered",
    description: "Generate unique and catchy grocery delivery names in seconds with our free AI-powered business name generator.",
    keywords: "grocery delivery name generator, grocery delivery names, name ideas for grocery delivery, brandable grocery delivery names",
    faqs: [
      {
        question: "How do I choose a good name for my grocery delivery?",
        answer: "A good grocery delivery name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these grocery delivery names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my grocery delivery name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "laundry-service",
    slug: "laundry-service-name-generator",
    name: "Laundry Service",
    title: "Laundry Service Name Generator | AI Powered",
    description: "Generate unique and catchy laundry service names in seconds with our free AI-powered business name generator.",
    keywords: "laundry service name generator, laundry service names, name ideas for laundry service, brandable laundry service names",
    faqs: [
      {
        question: "How do I choose a good name for my laundry service?",
        answer: "A good laundry service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these laundry service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my laundry service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dry-cleaner",
    slug: "dry-cleaner-name-generator",
    name: "Dry Cleaner",
    title: "Dry Cleaner Name Generator | AI Powered",
    description: "Generate unique and catchy dry cleaner names in seconds with our free AI-powered business name generator.",
    keywords: "dry cleaner name generator, dry cleaner names, name ideas for dry cleaner, brandable dry cleaner names",
    faqs: [
      {
        question: "How do I choose a good name for my dry cleaner?",
        answer: "A good dry cleaner name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dry cleaner names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dry cleaner name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "tailor",
    slug: "tailor-name-generator",
    name: "Tailor",
    title: "Tailor Name Generator | AI Powered",
    description: "Generate unique and catchy tailor names in seconds with our free AI-powered business name generator.",
    keywords: "tailor name generator, tailor names, name ideas for tailor, brandable tailor names",
    faqs: [
      {
        question: "How do I choose a good name for my tailor?",
        answer: "A good tailor name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these tailor names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my tailor name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "shoe-repair",
    slug: "shoe-repair-name-generator",
    name: "Shoe Repair",
    title: "Shoe Repair Name Generator | AI Powered",
    description: "Generate unique and catchy shoe repair names in seconds with our free AI-powered business name generator.",
    keywords: "shoe repair name generator, shoe repair names, name ideas for shoe repair, brandable shoe repair names",
    faqs: [
      {
        question: "How do I choose a good name for my shoe repair?",
        answer: "A good shoe repair name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these shoe repair names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my shoe repair name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "locksmith",
    slug: "locksmith-name-generator",
    name: "Locksmith",
    title: "Locksmith Name Generator | AI Powered",
    description: "Generate unique and catchy locksmith names in seconds with our free AI-powered business name generator.",
    keywords: "locksmith name generator, locksmith names, name ideas for locksmith, brandable locksmith names",
    faqs: [
      {
        question: "How do I choose a good name for my locksmith?",
        answer: "A good locksmith name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these locksmith names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my locksmith name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "handyman",
    slug: "handyman-name-generator",
    name: "Handyman",
    title: "Handyman Name Generator | AI Powered",
    description: "Generate unique and catchy handyman names in seconds with our free AI-powered business name generator.",
    keywords: "handyman name generator, handyman names, name ideas for handyman, brandable handyman names",
    faqs: [
      {
        question: "How do I choose a good name for my handyman?",
        answer: "A good handyman name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these handyman names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my handyman name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "painter",
    slug: "painter-name-generator",
    name: "Painter",
    title: "Painter Name Generator | AI Powered",
    description: "Generate unique and catchy painter names in seconds with our free AI-powered business name generator.",
    keywords: "painter name generator, painter names, name ideas for painter, brandable painter names",
    faqs: [
      {
        question: "How do I choose a good name for my painter?",
        answer: "A good painter name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these painter names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my painter name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "carpenter",
    slug: "carpenter-name-generator",
    name: "Carpenter",
    title: "Carpenter Name Generator | AI Powered",
    description: "Generate unique and catchy carpenter names in seconds with our free AI-powered business name generator.",
    keywords: "carpenter name generator, carpenter names, name ideas for carpenter, brandable carpenter names",
    faqs: [
      {
        question: "How do I choose a good name for my carpenter?",
        answer: "A good carpenter name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these carpenter names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my carpenter name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "welder",
    slug: "welder-name-generator",
    name: "Welder",
    title: "Welder Name Generator | AI Powered",
    description: "Generate unique and catchy welder names in seconds with our free AI-powered business name generator.",
    keywords: "welder name generator, welder names, name ideas for welder, brandable welder names",
    faqs: [
      {
        question: "How do I choose a good name for my welder?",
        answer: "A good welder name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these welder names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my welder name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "masonry-contractor",
    slug: "masonry-contractor-name-generator",
    name: "Masonry Contractor",
    title: "Masonry Contractor Name Generator | AI Powered",
    description: "Generate unique and catchy masonry contractor names in seconds with our free AI-powered business name generator.",
    keywords: "masonry contractor name generator, masonry contractor names, name ideas for masonry contractor, brandable masonry contractor names",
    faqs: [
      {
        question: "How do I choose a good name for my masonry contractor?",
        answer: "A good masonry contractor name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these masonry contractor names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my masonry contractor name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "pool-cleaning",
    slug: "pool-cleaning-name-generator",
    name: "Pool Cleaning",
    title: "Pool Cleaning Name Generator | AI Powered",
    description: "Generate unique and catchy pool cleaning names in seconds with our free AI-powered business name generator.",
    keywords: "pool cleaning name generator, pool cleaning names, name ideas for pool cleaning, brandable pool cleaning names",
    faqs: [
      {
        question: "How do I choose a good name for my pool cleaning?",
        answer: "A good pool cleaning name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these pool cleaning names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my pool cleaning name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "snow-removal",
    slug: "snow-removal-name-generator",
    name: "Snow Removal",
    title: "Snow Removal Name Generator | AI Powered",
    description: "Generate unique and catchy snow removal names in seconds with our free AI-powered business name generator.",
    keywords: "snow removal name generator, snow removal names, name ideas for snow removal, brandable snow removal names",
    faqs: [
      {
        question: "How do I choose a good name for my snow removal?",
        answer: "A good snow removal name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these snow removal names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my snow removal name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "window-cleaning",
    slug: "window-cleaning-name-generator",
    name: "Window Cleaning",
    title: "Window Cleaning Name Generator | AI Powered",
    description: "Generate unique and catchy window cleaning names in seconds with our free AI-powered business name generator.",
    keywords: "window cleaning name generator, window cleaning names, name ideas for window cleaning, brandable window cleaning names",
    faqs: [
      {
        question: "How do I choose a good name for my window cleaning?",
        answer: "A good window cleaning name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these window cleaning names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my window cleaning name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "carpet-cleaning",
    slug: "carpet-cleaning-name-generator",
    name: "Carpet Cleaning",
    title: "Carpet Cleaning Name Generator | AI Powered",
    description: "Generate unique and catchy carpet cleaning names in seconds with our free AI-powered business name generator.",
    keywords: "carpet cleaning name generator, carpet cleaning names, name ideas for carpet cleaning, brandable carpet cleaning names",
    faqs: [
      {
        question: "How do I choose a good name for my carpet cleaning?",
        answer: "A good carpet cleaning name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these carpet cleaning names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my carpet cleaning name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "upholstery-cleaning",
    slug: "upholstery-cleaning-name-generator",
    name: "Upholstery Cleaning",
    title: "Upholstery Cleaning Name Generator | AI Powered",
    description: "Generate unique and catchy upholstery cleaning names in seconds with our free AI-powered business name generator.",
    keywords: "upholstery cleaning name generator, upholstery cleaning names, name ideas for upholstery cleaning, brandable upholstery cleaning names",
    faqs: [
      {
        question: "How do I choose a good name for my upholstery cleaning?",
        answer: "A good upholstery cleaning name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these upholstery cleaning names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my upholstery cleaning name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "junk-removal",
    slug: "junk-removal-name-generator",
    name: "Junk Removal",
    title: "Junk Removal Name Generator | AI Powered",
    description: "Generate unique and catchy junk removal names in seconds with our free AI-powered business name generator.",
    keywords: "junk removal name generator, junk removal names, name ideas for junk removal, brandable junk removal names",
    faqs: [
      {
        question: "How do I choose a good name for my junk removal?",
        answer: "A good junk removal name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these junk removal names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my junk removal name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "recycling-center",
    slug: "recycling-center-name-generator",
    name: "Recycling Center",
    title: "Recycling Center Name Generator | AI Powered",
    description: "Generate unique and catchy recycling center names in seconds with our free AI-powered business name generator.",
    keywords: "recycling center name generator, recycling center names, name ideas for recycling center, brandable recycling center names",
    faqs: [
      {
        question: "How do I choose a good name for my recycling center?",
        answer: "A good recycling center name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these recycling center names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my recycling center name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "scrap-metal",
    slug: "scrap-metal-name-generator",
    name: "Scrap Metal",
    title: "Scrap Metal Name Generator | AI Powered",
    description: "Generate unique and catchy scrap metal names in seconds with our free AI-powered business name generator.",
    keywords: "scrap metal name generator, scrap metal names, name ideas for scrap metal, brandable scrap metal names",
    faqs: [
      {
        question: "How do I choose a good name for my scrap metal?",
        answer: "A good scrap metal name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these scrap metal names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my scrap metal name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "towing-service",
    slug: "towing-service-name-generator",
    name: "Towing Service",
    title: "Towing Service Name Generator | AI Powered",
    description: "Generate unique and catchy towing service names in seconds with our free AI-powered business name generator.",
    keywords: "towing service name generator, towing service names, name ideas for towing service, brandable towing service names",
    faqs: [
      {
        question: "How do I choose a good name for my towing service?",
        answer: "A good towing service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these towing service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my towing service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "taxi-service",
    slug: "taxi-service-name-generator",
    name: "Taxi Service",
    title: "Taxi Service Name Generator | AI Powered",
    description: "Generate unique and catchy taxi service names in seconds with our free AI-powered business name generator.",
    keywords: "taxi service name generator, taxi service names, name ideas for taxi service, brandable taxi service names",
    faqs: [
      {
        question: "How do I choose a good name for my taxi service?",
        answer: "A good taxi service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these taxi service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my taxi service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "limo-service",
    slug: "limo-service-name-generator",
    name: "Limo Service",
    title: "Limo Service Name Generator | AI Powered",
    description: "Generate unique and catchy limo service names in seconds with our free AI-powered business name generator.",
    keywords: "limo service name generator, limo service names, name ideas for limo service, brandable limo service names",
    faqs: [
      {
        question: "How do I choose a good name for my limo service?",
        answer: "A good limo service name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these limo service names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my limo service name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "party-bus",
    slug: "party-bus-name-generator",
    name: "Party Bus",
    title: "Party Bus Name Generator | AI Powered",
    description: "Generate unique and catchy party bus names in seconds with our free AI-powered business name generator.",
    keywords: "party bus name generator, party bus names, name ideas for party bus, brandable party bus names",
    faqs: [
      {
        question: "How do I choose a good name for my party bus?",
        answer: "A good party bus name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these party bus names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my party bus name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "boat-rental",
    slug: "boat-rental-name-generator",
    name: "Boat Rental",
    title: "Boat Rental Name Generator | AI Powered",
    description: "Generate unique and catchy boat rental names in seconds with our free AI-powered business name generator.",
    keywords: "boat rental name generator, boat rental names, name ideas for boat rental, brandable boat rental names",
    faqs: [
      {
        question: "How do I choose a good name for my boat rental?",
        answer: "A good boat rental name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these boat rental names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my boat rental name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "rv-rental",
    slug: "rv-rental-name-generator",
    name: "RV Rental",
    title: "RV Rental Name Generator | AI Powered",
    description: "Generate unique and catchy rv rental names in seconds with our free AI-powered business name generator.",
    keywords: "rv rental name generator, rv rental names, name ideas for rv rental, brandable rv rental names",
    faqs: [
      {
        question: "How do I choose a good name for my rv rental?",
        answer: "A good rv rental name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these rv rental names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my rv rental name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "bike-rental",
    slug: "bike-rental-name-generator",
    name: "Bike Rental",
    title: "Bike Rental Name Generator | AI Powered",
    description: "Generate unique and catchy bike rental names in seconds with our free AI-powered business name generator.",
    keywords: "bike rental name generator, bike rental names, name ideas for bike rental, brandable bike rental names",
    faqs: [
      {
        question: "How do I choose a good name for my bike rental?",
        answer: "A good bike rental name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these bike rental names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my bike rental name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "scooter-rental",
    slug: "scooter-rental-name-generator",
    name: "Scooter Rental",
    title: "Scooter Rental Name Generator | AI Powered",
    description: "Generate unique and catchy scooter rental names in seconds with our free AI-powered business name generator.",
    keywords: "scooter rental name generator, scooter rental names, name ideas for scooter rental, brandable scooter rental names",
    faqs: [
      {
        question: "How do I choose a good name for my scooter rental?",
        answer: "A good scooter rental name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these scooter rental names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my scooter rental name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "surf-shop",
    slug: "surf-shop-name-generator",
    name: "Surf Shop",
    title: "Surf Shop Name Generator | AI Powered",
    description: "Generate unique and catchy surf shop names in seconds with our free AI-powered business name generator.",
    keywords: "surf shop name generator, surf shop names, name ideas for surf shop, brandable surf shop names",
    faqs: [
      {
        question: "How do I choose a good name for my surf shop?",
        answer: "A good surf shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these surf shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my surf shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "dive-shop",
    slug: "dive-shop-name-generator",
    name: "Dive Shop",
    title: "Dive Shop Name Generator | AI Powered",
    description: "Generate unique and catchy dive shop names in seconds with our free AI-powered business name generator.",
    keywords: "dive shop name generator, dive shop names, name ideas for dive shop, brandable dive shop names",
    faqs: [
      {
        question: "How do I choose a good name for my dive shop?",
        answer: "A good dive shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these dive shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my dive shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "ski-shop",
    slug: "ski-shop-name-generator",
    name: "Ski Shop",
    title: "Ski Shop Name Generator | AI Powered",
    description: "Generate unique and catchy ski shop names in seconds with our free AI-powered business name generator.",
    keywords: "ski shop name generator, ski shop names, name ideas for ski shop, brandable ski shop names",
    faqs: [
      {
        question: "How do I choose a good name for my ski shop?",
        answer: "A good ski shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these ski shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my ski shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "snowboard-shop",
    slug: "snowboard-shop-name-generator",
    name: "Snowboard Shop",
    title: "Snowboard Shop Name Generator | AI Powered",
    description: "Generate unique and catchy snowboard shop names in seconds with our free AI-powered business name generator.",
    keywords: "snowboard shop name generator, snowboard shop names, name ideas for snowboard shop, brandable snowboard shop names",
    faqs: [
      {
        question: "How do I choose a good name for my snowboard shop?",
        answer: "A good snowboard shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these snowboard shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my snowboard shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "skate-shop",
    slug: "skate-shop-name-generator",
    name: "Skate Shop",
    title: "Skate Shop Name Generator | AI Powered",
    description: "Generate unique and catchy skate shop names in seconds with our free AI-powered business name generator.",
    keywords: "skate shop name generator, skate shop names, name ideas for skate shop, brandable skate shop names",
    faqs: [
      {
        question: "How do I choose a good name for my skate shop?",
        answer: "A good skate shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these skate shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my skate shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "record-store",
    slug: "record-store-name-generator",
    name: "Record Store",
    title: "Record Store Name Generator | AI Powered",
    description: "Generate unique and catchy record store names in seconds with our free AI-powered business name generator.",
    keywords: "record store name generator, record store names, name ideas for record store, brandable record store names",
    faqs: [
      {
        question: "How do I choose a good name for my record store?",
        answer: "A good record store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these record store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my record store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "comic-book-store",
    slug: "comic-book-store-name-generator",
    name: "Comic Book Store",
    title: "Comic Book Store Name Generator | AI Powered",
    description: "Generate unique and catchy comic book store names in seconds with our free AI-powered business name generator.",
    keywords: "comic book store name generator, comic book store names, name ideas for comic book store, brandable comic book store names",
    faqs: [
      {
        question: "How do I choose a good name for my comic book store?",
        answer: "A good comic book store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these comic book store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my comic book store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "hobby-shop",
    slug: "hobby-shop-name-generator",
    name: "Hobby Shop",
    title: "Hobby Shop Name Generator | AI Powered",
    description: "Generate unique and catchy hobby shop names in seconds with our free AI-powered business name generator.",
    keywords: "hobby shop name generator, hobby shop names, name ideas for hobby shop, brandable hobby shop names",
    faqs: [
      {
        question: "How do I choose a good name for my hobby shop?",
        answer: "A good hobby shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these hobby shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my hobby shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "craft-store",
    slug: "craft-store-name-generator",
    name: "Craft Store",
    title: "Craft Store Name Generator | AI Powered",
    description: "Generate unique and catchy craft store names in seconds with our free AI-powered business name generator.",
    keywords: "craft store name generator, craft store names, name ideas for craft store, brandable craft store names",
    faqs: [
      {
        question: "How do I choose a good name for my craft store?",
        answer: "A good craft store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these craft store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my craft store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "fabric-store",
    slug: "fabric-store-name-generator",
    name: "Fabric Store",
    title: "Fabric Store Name Generator | AI Powered",
    description: "Generate unique and catchy fabric store names in seconds with our free AI-powered business name generator.",
    keywords: "fabric store name generator, fabric store names, name ideas for fabric store, brandable fabric store names",
    faqs: [
      {
        question: "How do I choose a good name for my fabric store?",
        answer: "A good fabric store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these fabric store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my fabric store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "yarn-shop",
    slug: "yarn-shop-name-generator",
    name: "Yarn Shop",
    title: "Yarn Shop Name Generator | AI Powered",
    description: "Generate unique and catchy yarn shop names in seconds with our free AI-powered business name generator.",
    keywords: "yarn shop name generator, yarn shop names, name ideas for yarn shop, brandable yarn shop names",
    faqs: [
      {
        question: "How do I choose a good name for my yarn shop?",
        answer: "A good yarn shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these yarn shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my yarn shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "stationery-store",
    slug: "stationery-store-name-generator",
    name: "Stationery Store",
    title: "Stationery Store Name Generator | AI Powered",
    description: "Generate unique and catchy stationery store names in seconds with our free AI-powered business name generator.",
    keywords: "stationery store name generator, stationery store names, name ideas for stationery store, brandable stationery store names",
    faqs: [
      {
        question: "How do I choose a good name for my stationery store?",
        answer: "A good stationery store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these stationery store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my stationery store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "party-supply-store",
    slug: "party-supply-store-name-generator",
    name: "Party Supply Store",
    title: "Party Supply Store Name Generator | AI Powered",
    description: "Generate unique and catchy party supply store names in seconds with our free AI-powered business name generator.",
    keywords: "party supply store name generator, party supply store names, name ideas for party supply store, brandable party supply store names",
    faqs: [
      {
        question: "How do I choose a good name for my party supply store?",
        answer: "A good party supply store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these party supply store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my party supply store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "costume-shop",
    slug: "costume-shop-name-generator",
    name: "Costume Shop",
    title: "Costume Shop Name Generator | AI Powered",
    description: "Generate unique and catchy costume shop names in seconds with our free AI-powered business name generator.",
    keywords: "costume shop name generator, costume shop names, name ideas for costume shop, brandable costume shop names",
    faqs: [
      {
        question: "How do I choose a good name for my costume shop?",
        answer: "A good costume shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these costume shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my costume shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "magic-shop",
    slug: "magic-shop-name-generator",
    name: "Magic Shop",
    title: "Magic Shop Name Generator | AI Powered",
    description: "Generate unique and catchy magic shop names in seconds with our free AI-powered business name generator.",
    keywords: "magic shop name generator, magic shop names, name ideas for magic shop, brandable magic shop names",
    faqs: [
      {
        question: "How do I choose a good name for my magic shop?",
        answer: "A good magic shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these magic shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my magic shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "joke-shop",
    slug: "joke-shop-name-generator",
    name: "Joke Shop",
    title: "Joke Shop Name Generator | AI Powered",
    description: "Generate unique and catchy joke shop names in seconds with our free AI-powered business name generator.",
    keywords: "joke shop name generator, joke shop names, name ideas for joke shop, brandable joke shop names",
    faqs: [
      {
        question: "How do I choose a good name for my joke shop?",
        answer: "A good joke shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these joke shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my joke shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "smoke-shop",
    slug: "smoke-shop-name-generator",
    name: "Smoke Shop",
    title: "Smoke Shop Name Generator | AI Powered",
    description: "Generate unique and catchy smoke shop names in seconds with our free AI-powered business name generator.",
    keywords: "smoke shop name generator, smoke shop names, name ideas for smoke shop, brandable smoke shop names",
    faqs: [
      {
        question: "How do I choose a good name for my smoke shop?",
        answer: "A good smoke shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these smoke shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my smoke shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "vape-shop",
    slug: "vape-shop-name-generator",
    name: "Vape Shop",
    title: "Vape Shop Name Generator | AI Powered",
    description: "Generate unique and catchy vape shop names in seconds with our free AI-powered business name generator.",
    keywords: "vape shop name generator, vape shop names, name ideas for vape shop, brandable vape shop names",
    faqs: [
      {
        question: "How do I choose a good name for my vape shop?",
        answer: "A good vape shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these vape shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my vape shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cbd-shop",
    slug: "cbd-shop-name-generator",
    name: "CBD Shop",
    title: "CBD Shop Name Generator | AI Powered",
    description: "Generate unique and catchy cbd shop names in seconds with our free AI-powered business name generator.",
    keywords: "cbd shop name generator, cbd shop names, name ideas for cbd shop, brandable cbd shop names",
    faqs: [
      {
        question: "How do I choose a good name for my cbd shop?",
        answer: "A good cbd shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cbd shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cbd shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "kratom-shop",
    slug: "kratom-shop-name-generator",
    name: "Kratom Shop",
    title: "Kratom Shop Name Generator | AI Powered",
    description: "Generate unique and catchy kratom shop names in seconds with our free AI-powered business name generator.",
    keywords: "kratom shop name generator, kratom shop names, name ideas for kratom shop, brandable kratom shop names",
    faqs: [
      {
        question: "How do I choose a good name for my kratom shop?",
        answer: "A good kratom shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these kratom shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my kratom shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "vitamin-store",
    slug: "vitamin-store-name-generator",
    name: "Vitamin Store",
    title: "Vitamin Store Name Generator | AI Powered",
    description: "Generate unique and catchy vitamin store names in seconds with our free AI-powered business name generator.",
    keywords: "vitamin store name generator, vitamin store names, name ideas for vitamin store, brandable vitamin store names",
    faqs: [
      {
        question: "How do I choose a good name for my vitamin store?",
        answer: "A good vitamin store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these vitamin store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my vitamin store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "health-food-store",
    slug: "health-food-store-name-generator",
    name: "Health Food Store",
    title: "Health Food Store Name Generator | AI Powered",
    description: "Generate unique and catchy health food store names in seconds with our free AI-powered business name generator.",
    keywords: "health food store name generator, health food store names, name ideas for health food store, brandable health food store names",
    faqs: [
      {
        question: "How do I choose a good name for my health food store?",
        answer: "A good health food store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these health food store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my health food store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "farmer-s-market",
    slug: "farmer-s-market-name-generator",
    name: "Farmer's Market",
    title: "Farmer's Market Name Generator | AI Powered",
    description: "Generate unique and catchy farmer's market names in seconds with our free AI-powered business name generator.",
    keywords: "farmer's market name generator, farmer's market names, name ideas for farmer's market, brandable farmer's market names",
    faqs: [
      {
        question: "How do I choose a good name for my farmer's market?",
        answer: "A good farmer's market name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these farmer's market names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my farmer's market name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "butcher-shop",
    slug: "butcher-shop-name-generator",
    name: "Butcher Shop",
    title: "Butcher Shop Name Generator | AI Powered",
    description: "Generate unique and catchy butcher shop names in seconds with our free AI-powered business name generator.",
    keywords: "butcher shop name generator, butcher shop names, name ideas for butcher shop, brandable butcher shop names",
    faqs: [
      {
        question: "How do I choose a good name for my butcher shop?",
        answer: "A good butcher shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these butcher shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my butcher shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "seafood-market",
    slug: "seafood-market-name-generator",
    name: "Seafood Market",
    title: "Seafood Market Name Generator | AI Powered",
    description: "Generate unique and catchy seafood market names in seconds with our free AI-powered business name generator.",
    keywords: "seafood market name generator, seafood market names, name ideas for seafood market, brandable seafood market names",
    faqs: [
      {
        question: "How do I choose a good name for my seafood market?",
        answer: "A good seafood market name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these seafood market names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my seafood market name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "cheese-shop",
    slug: "cheese-shop-name-generator",
    name: "Cheese Shop",
    title: "Cheese Shop Name Generator | AI Powered",
    description: "Generate unique and catchy cheese shop names in seconds with our free AI-powered business name generator.",
    keywords: "cheese shop name generator, cheese shop names, name ideas for cheese shop, brandable cheese shop names",
    faqs: [
      {
        question: "How do I choose a good name for my cheese shop?",
        answer: "A good cheese shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these cheese shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my cheese shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "wine-shop",
    slug: "wine-shop-name-generator",
    name: "Wine Shop",
    title: "Wine Shop Name Generator | AI Powered",
    description: "Generate unique and catchy wine shop names in seconds with our free AI-powered business name generator.",
    keywords: "wine shop name generator, wine shop names, name ideas for wine shop, brandable wine shop names",
    faqs: [
      {
        question: "How do I choose a good name for my wine shop?",
        answer: "A good wine shop name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these wine shop names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my wine shop name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  },
  {
    id: "beer-store",
    slug: "beer-store-name-generator",
    name: "Beer Store",
    title: "Beer Store Name Generator | AI Powered",
    description: "Generate unique and catchy beer store names in seconds with our free AI-powered business name generator.",
    keywords: "beer store name generator, beer store names, name ideas for beer store, brandable beer store names",
    faqs: [
      {
        question: "How do I choose a good name for my beer store?",
        answer: "A good beer store name should be memorable, easy to pronounce, and reflect your brand's core values. Use our AI generator to find ideas that resonate with your target audience."
      },
      {
        question: "Are these beer store names free to use?",
        answer: "Yes, the names generated are free to use. However, we always recommend checking trademark databases and domain availability before making your final decision."
      },
      {
        question: "Can I check domain availability for my beer store name?",
        answer: "Our Pro plan includes instant domain availability checks and premium export options to help you secure your new brand identity."
      }
    ]
  }
];

export function getCategoryBySlug(slug: string): SEOCategory | undefined {
  return SEO_CATEGORIES.find(c => c.slug === slug);
}
