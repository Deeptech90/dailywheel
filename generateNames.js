import fs from 'fs';

const categories = [
  'restaurant', 'cafe', 'bakery', 'fashion', 'tech',
  'startup', 'real_estate', 'construction', 'fitness', 'healthcare',
  'beauty', 'jewelry', 'finance', 'consulting', 'education',
  'travel', 'youtube', 'podcast', 'gaming', 'ai_startup',
  'ecommerce', 'crypto', 'interior_design', 'photography', 'marketing',
  'cleaning', 'pet', 'events', 'home_decor', 'auto',
  'law', 'dental', 'medical', 'gym', 'furniture',
  'hotel', 'resort', 'salon', 'spa', 'barber'
];

// We will use high entropy generation rules for each category
const wordBanks = {
  restaurant: ['Velour', 'Marrow', 'Oxcart', 'Ember', 'Fennel', 'Thicket', 'Spoon', 'Root', 'Charred', 'Gilt', 'Coriander', 'Maize', 'Cask', 'Platter', 'Copper', 'Thyme', 'Rustic', 'Truffle', 'Whisk', 'Sage', 'Anvil', 'Ash', 'Olive', 'Bramble', 'Hearth', 'Stone'],
  cafe: ['Velvet', 'Crema', 'Obsidian', 'Bean', 'Mocha', 'Roaster', 'Steam', 'Drip', 'Bloom', 'Dark', 'Artisan', 'Grind', 'Mug', 'Froth', 'Fable', 'Dusk', 'Knot', 'Vessel', 'Sip', 'Brew', 'Craft'],
  bakery: ['Flour', 'Crust', 'Crumb', 'Dough', 'Yeast', 'Yonder', 'Butter', 'Oven', 'Oak', 'Sugar', 'Wheat', 'Loaf', 'Bake', 'Knead', 'Honey', 'Whim', 'Fold', 'Glaze', 'Grain', 'Proof'],
  fashion: ['Silk', 'Drape', 'Couture', 'Thread', 'Ward', 'Luster', 'Lace', 'Canvas', 'Veil', 'Thorn', 'Stitch', 'Hem', 'Pleat', 'Vogue', 'Chic', 'Textile', 'Loom', 'Weave', 'Tailor', 'Garb'],
  tech: ['Quantum', 'Cyber', 'Voxel', 'Synth', 'Grid', 'Graph', 'Neo', 'Data', 'Nexus', 'Drift', 'Stream', 'Glow', 'Nova', 'Den', 'Spark', 'Gear', 'Nest', 'Logic', 'Code', 'Byte', 'Core', 'Flux'],
  startup: ['Venture', 'Spark', 'Momentum', 'Forge', 'Fable', 'Mesh', 'Vanguard', 'Flux', 'Vista', 'Matrix', 'Frost', 'Pivot', 'Launch', 'Scale', 'Agile', 'Sprint', 'Nova', 'Disrupt', 'Traction'],
  real_estate: ['Hearth', 'Haven', 'Structure', 'Dwell', 'Manor', 'Estate', 'Land', 'Habitat', 'Residence', 'Prop', 'Villa', 'Terra', 'Keystone', 'Roof', 'Plot', 'Nest', 'Domain', 'Acre', 'Parcel'],
  construction: ['Iron', 'Anvil', 'Steel', 'Build', 'Frame', 'Foundation', 'Concrete', 'Architect', 'Blueprint', 'Mason', 'Truss', 'Beam', 'Grade', 'Construct', 'Solid', 'Elevate', 'Gird', 'Pillar'],
  fitness: ['Sweat', 'Pulse', 'Core', 'Flex', 'Grind', 'Endura', 'Vital', 'Lift', 'Body', 'Cardio', 'Stamina', 'Power', 'Muscle', 'Train', 'Run', 'Zen', 'Gain', 'Rep', 'Pace', 'Form'],
  healthcare: ['Heal', 'Vital', 'Cure', 'Nurture', 'Wellness', 'Clinic', 'Care', 'Remedy', 'Treat', 'Cliniq', 'Ward', 'Med', 'Mend', 'Health', 'Pulse', 'Soothe', 'Therapy', 'Aura', 'Well'],
  beauty: ['Glow', 'Radiance', 'Aura', 'Blush', 'Lumine', 'Velvet', 'Prism', 'Petal', 'Shimmer', 'Rose', 'Gleam', 'Glazing', 'Pore', 'Flawless', 'Tint', 'Pigment', 'Luster', 'Sheer', 'Plump'],
  jewelry: ['Gem', 'Sparkle', 'Luster', 'Crystal', 'Jewel', 'Gold', 'Diamond', 'Precious', 'Carat', 'Brilliant', 'Treasure', 'Platinum', 'Pearl', 'Orna', 'Metal', 'Ring', 'Stone', 'Facet', 'Glint'],
  finance: ['Coin', 'Wealth', 'Capital', 'Fund', 'Invest', 'Profit', 'Asset', 'Vault', 'Economy', 'Trust', 'Fiscal', 'Portfolio', 'Credit', 'Growth', 'Equity', 'Mint', 'Stock', 'Bond', 'Ledger'],
  consulting: ['Strategy', 'Vision', 'Guide', 'Insight', 'Apex', 'Clarity', 'Counsel', 'Pivot', 'Core', 'Brain', 'Wise', 'Savvy', 'Praxis', 'Elite', 'Mentor', 'Summit', 'Plan', 'Solve', 'Advisors'],
  education: ['Learn', 'Wisdom', 'Scholar', 'Teach', 'Skill', 'Knowledge', 'Mind', 'Tutor', 'Academy', 'Class', 'Study', 'Course', 'Lesson', 'Grade', 'Literacy', 'Edu', 'Logic', 'Read', 'Think'],
  travel: ['Roam', 'Voyage', 'Trek', 'Journey', 'Explore', 'Adventure', 'Glob', 'Destin', 'Pilgrim', 'Nomad', 'Expedition', 'Trace', 'Waypoint', 'Atlas', 'Quest', 'Compass', 'Horizon', 'Wander', 'Trip'],
  youtube: ['Frame', 'View', 'Cast', 'Stream', 'Channel', 'Content', 'Viral', 'Reel', 'Click', 'Watch', 'Tube', 'Shoot', 'Edit', 'Pixel', 'Vlog', 'Capture', 'Snap', 'Studio', 'Scene', 'Cut'],
  podcast: ['Voice', 'Echo', 'Sound', 'Wave', 'Mic', 'Audio', 'Frequency', 'Resonate', 'Amplify', 'Listen', 'Signal', 'Broad', 'Narrate', 'Spoken', 'Tune', 'Dialogue', 'Pod', 'Speak', 'Talk'],
  gaming: ['Pixel', 'Quest', 'Game', 'Play', 'Level', 'Arena', 'Spawn', 'Guild', 'Respawn', 'Loot', 'Fps', 'Raid', 'Map', 'Esport', 'Arcade', 'Control', 'Console', 'Boss', 'Match'],
  ai_startup: ['Neural', 'Synth', 'Logic', 'Data', 'Deep', 'Cogni', 'AI', 'Think', 'Synap', 'Algo', 'Smart', 'Intelli', 'Bot', 'Tensor', 'Cognitive', 'Mind', 'Brain', 'Robo', 'Automate'],
  ecommerce: ['Cart', 'Shop', 'Trade', 'Buy', 'Click', 'Market', 'Deal', 'Mega', 'Flash', 'Nova', 'Buzz', 'Quick', 'Omni', 'Web', 'Globe', 'Sale', 'Dash', 'Store', 'Retail'],
  crypto: ['Coin', 'Block', 'Ledger', 'Hash', 'Chain', 'Token', 'Wallet', 'DeFi', 'Mint', 'Node', 'Genesis', 'Bit', 'NFT', 'Decentral', 'Vault', 'Crypto', 'Satoshi', 'Exchange', 'Stake'],
  interior_design: ['Space', 'Decor', 'Room', 'Style', 'Aesthetic', 'Ambiance', 'Living', 'Theme', 'Accent', 'Comfort', 'Suite', 'Nook', 'Palette', 'Den', 'Hue', 'Design', 'Layout', 'Vibe'],
  photography: ['Lens', 'Snap', 'Frame', 'Shoot', 'Exposure', 'Shutter', 'Visual', 'Capture', 'Aperture', 'Light', 'Focus', 'Moment', 'Shot', 'FStop', 'Darkroom', 'Photo', 'Flash', 'Image'],
  marketing: ['Brand', 'Reach', 'Market', 'Buzz', 'Campaign', 'Impact', 'Engage', 'Audience', 'Convert', 'Influence', 'Vira', 'Pitch', 'Traction', 'Message', 'Target', 'Boost', 'Content', 'Ads'],
  cleaning: ['Shine', 'Clean', 'Fresh', 'Pure', 'Sparkle', 'Maid', 'Gleam', 'Scrub', 'Pristine', 'Bright', 'Tidy', 'Luster', 'Polish', 'Gloss', 'Sanity', 'Clear', 'Wipe', 'Dust', 'Spotless'],
  pet: ['Paw', 'Fur', 'Pet', 'Tail', 'Woof', 'Sniff', 'Bark', 'Mew', 'Treat', 'Wag', 'Pooch', 'Kitty', 'Animal', 'Dog', 'Cat', 'Vet', 'Groom', 'Claw', 'Bark'],
  events: ['Party', 'Gala', 'Event', 'Bash', 'Occasion', 'Festival', 'Celeb', 'Soiree', 'Banquet', 'Gather', 'Venu', 'Shindig', 'Fete', 'Wedding', 'Function', 'Host', 'Invite', 'Fiesta'],
  home_decor: ['Nest', 'Decor', 'Home', 'Style', 'Casa', 'Haven', 'Cozy', 'Artisan', 'Bliss', 'Idyll', 'Sanctum', 'Hearth', 'Sanctuary', 'Nook', 'Abode', 'Furnish', 'Plush', 'Chic'],
  auto: ['Gear', 'Drive', 'Auto', 'Ride', 'Garage', 'Wrench', 'Mechanic', 'Piston', 'Engine', 'Torque', 'Rev', 'Throttle', 'Speed', 'Car', 'Wheel', 'Motor', 'Tyre', 'Brake'],
  law: ['Rule', 'Law', 'Firm', 'Case', 'Justice', 'Counsel', 'Legal', 'Juris', 'Barrister', 'Attorney', 'Legacy', 'Jury', 'Defend', 'Litigate', 'Ledger', 'Precedent', 'Trial', 'Court', 'Statute'],
  dental: ['Tooth', 'Smile', 'Dental', 'Oral', 'Gum', 'Pearl', 'Crown', 'Brace', 'Enamel', 'Ortho', 'Floss', 'Molar', 'Cavity', 'Bite', 'Dent', 'White', 'Clean', 'Drill'],
  medical: ['Heal', 'Med', 'Care', 'Clinic', 'Pharma', 'Health', 'Cure', 'Rx', 'Wellness', 'Mart', 'Remedy', 'Root', 'Well', 'Drug', 'Pill', 'Life', 'Bio', 'Aid'],
  gym: ['Lift', 'Fit', 'Iron', 'Gym', 'Grind', 'Strength', 'Muscle', 'Power', 'Rep', 'Sweat', 'Barbell', 'Bulk', 'Massive', 'Heavy', 'Plate', 'Gain', 'Train', 'Work', 'Squat'],
  furniture: ['Wood', 'Craft', 'Table', 'Chair', 'Timber', 'Grain', 'Lumber', 'Cedar', 'Oak', 'Maple', 'Joinery', 'Cabinet', 'Carpentry', 'Sofa', 'Desk', 'Bed', 'Furnish', 'Shelf'],
  hotel: ['Stay', 'Inn', 'Room', 'Lodge', 'Grand', 'Suite', 'Luxe', 'Lounge', 'Residence', 'Velvet', 'Estate', 'Manor', 'Royal', 'Chambers', 'Hospital', 'Atrium', 'Plaza', 'Hostel'],
  resort: ['Rest', 'Spa', 'Sand', 'Sun', 'Tropical', 'Palm', 'Island', 'Lagoon', 'Wave', 'Beach', 'Ocean', 'Coral', 'Sunset', 'Marine', 'Reef', 'Azure', 'Breeze', 'Coastal'],
  salon: ['Style', 'Hair', 'Cut', 'Salon', 'Glamour', 'Chroma', 'Velvet', 'Chic', 'Mane', 'Pure', 'Locks', 'Silk', 'Shear', 'Gloss', 'Trend', 'Opal', 'Mirror', 'Charm', 'Diva'],
  spa: ['Relax', 'Zen', 'Calm', 'Soothe', 'Serene', 'Bliss', 'Bath', 'Soak', 'Tranquil', 'Rejuven', 'Peace', 'Restore', 'Sanctuary', 'Mend', 'Heal', 'Renewal', 'Refresh', 'Replenish', 'Massage'],
  barber: ['Fade', 'Trim', 'Cut', 'Shave', 'Sharp', 'Blade', 'Bureau', 'Razor', 'Clip', 'Grade', 'Line', 'Scissor', 'Groom', 'Nick', 'Kings', 'Classic', 'Comb', 'Beard', 'Buzz']
};

const genericPrefixes = ['Omni', 'Aura', 'Vela', 'Zen', 'Lumi', 'Nova', 'Echo', 'Nexa', 'Aero', 'Kori', 'Puro', 'Vera', 'Alta', 'Miro', 'Sola', 'Zeta', 'Orio'];
const genericSuffixes = ['ia', 'io', 'us', 'um', 'ix', 'ex', 'is', 'on', 'en', 'ar', 'er', 'or', 'ify', 'ly', 'ity'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function generateName(category) {
  const bank = wordBanks[category];
  const type = Math.random();
  
  if (type < 0.3) {
    // Word + Word
    return capitalize(randomElement(bank)) + capitalize(randomElement(bank));
  } else if (type < 0.6) {
    // Prefix + Word
    return capitalize(randomElement(genericPrefixes)) + capitalize(randomElement(bank));
  } else if (type < 0.8) {
    // Word + Suffix
    return capitalize(randomElement(bank)) + randomElement(genericSuffixes);
  } else {
    // Abstraction
    const first = randomElement(bank);
    const second = randomElement(genericPrefixes);
    return capitalize(first.slice(0, Math.max(3, first.length - 2))) + capitalize(second);
  }
}

// Read the original file
const content = fs.readFileSync('./src/data/businessNames.ts', 'utf-8');

// We need to replace the names array for each category
let newContent = content;

categories.forEach(cat => {
  const generatedNames = new Set();
  while(generatedNames.size < 24) {
    generatedNames.add(generateName(cat));
  }
  
  const namesArrayString = Array.from(generatedNames).map(n => "'" + n + "'").join(',');
  
  // Find the exact object block in the file string and replace the names array
  // We'll use a regex to match the category id and its names array
  const regex = new RegExp("(id:\\s*'" + cat + "'[\\s\\S]*?names:\\s*\\[)[^\\]]*(\\])", 'g');
  newContent = newContent.replace(regex, "$1\n      " + namesArrayString + "\n    $2");
});

fs.writeFileSync('./src/data/businessNames.ts', newContent);
console.log('Successfully updated businessNames.ts with 24 high entropy names per category.');
