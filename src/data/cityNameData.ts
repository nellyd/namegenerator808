// data/cityNameData.ts

export const cityNameData = {
    prefixes: {
      english: ['New', 'North', 'South', 'East', 'West', 'Old', 'Great', 'Little', 'Upper', 'Lower'],
      fantasy: ['High', 'Dark', 'Silver', 'Golden', 'Crystal', 'Shadow', 'Moon', 'Star', 'Sun', 'Storm'],
      scifi: ['Neo', 'Mega', 'Alpha', 'Beta', 'Omni', 'Tech', 'Cyber', 'Quantum', 'Astro', 'Nova'],
      ancient: ['Alta', 'Nova', 'Magna', 'Prima', 'Terra', 'Porta', 'Villa', 'Sancta', 'Meta', 'Para']
    },
  
    suffixes: {
      english: ['ton', 'ville', 'burgh', 'field', 'ford', 'port', 'mouth', 'bridge', 'wood', 'land'],
      fantasy: ['keep', 'haven', 'spire', 'hold', 'gate', 'fell', 'dale', 'vale', 'crest', 'glade'],
      scifi: ['plex', 'tron', 'corp', 'pod', 'dome', 'hub', 'port', 'station', 'core', 'nexus'],
      ancient: ['polis', 'ium', 'ica', 'ora', 'aria', 'terra', 'topia', 'thea', 'phia', 'thera']
    },
  
    baseNames: {
      english: {
        nature: ['River', 'Lake', 'Hill', 'Forest', 'Wood', 'Green', 'Sea', 'Rock', 'Spring', 'Bay'],
        cultural: ['Kings', 'Queens', 'Bishop', 'Castle', 'Church', 'Market', 'Trade', 'Harbor', 'Mill', 'Bridge'],
        colors: ['Blue', 'Red', 'Green', 'White', 'Black', 'Gold', 'Silver', 'Rose', 'Gray', 'Brown']
      },
      fantasy: {
        mystical: ['Dragon', 'Phoenix', 'Griffon', 'Unicorn', 'Wyrm', 'Raven', 'Fae', 'Mage', 'Spell', 'Oracle'],
        elements: ['Fire', 'Ice', 'Storm', 'Wind', 'Earth', 'Frost', 'Flame', 'Thunder', 'Shadow', 'Light'],
        nature: ['Moon', 'Star', 'Sun', 'Dawn', 'Dusk', 'Night', 'Twilight', 'Aurora', 'Crystal', 'Mist']
      },
      scifi: {
        tech: ['Chrome', 'Steel', 'Neon', 'Data', 'Cyber', 'Vector', 'Pixel', 'Grid', 'Circuit', 'Binary'],
        future: ['Prime', 'Zero', 'Apex', 'Echo', 'Pulse', 'Helix', 'Matrix', 'Nexus', 'Vertex', 'Zenith'],
        space: ['Star', 'Nova', 'Cosmos', 'Astro', 'Luna', 'Sol', 'Orbit', 'Galaxy', 'Nebula', 'Quasar']
      }
    },
  
    patterns: {
      english: [
        'PREFIX BASENAME',
        'BASENAME SUFFIX',
        'PREFIX BASENAME SUFFIX',
        'BASENAME by the SEA',
        'BASENAME on SEA',
        'BASENAME upon SEA'
      ],
      fantasy: [
        'MYSTICAL SUFFIX',
        'PREFIX MYSTICAL',
        'ELEMENT SUFFIX',
        'MYSTICAL of the ELEMENT',
        'PREFIX NATURE SUFFIX'
      ],
      scifi: [
        'PREFIX-TECH',
        'TECH SUFFIX',
        'FUTURE SUFFIX',
        'SPACE-TECH',
        'PREFIX SPACE SUFFIX'
      ]
    },
  
    geographic: {
      terrain: ['Mountain', 'Valley', 'Coast', 'Plains', 'Desert', 'Forest', 'Lake', 'River', 'Island', 'Hills'],
      water: ['Sea', 'Ocean', 'Bay', 'Harbor', 'River', 'Lake', 'Stream', 'Falls', 'Springs', 'Waters'],
      features: ['Cliffs', 'Peak', 'Canyon', 'Mesa', 'Ridge', 'Gulf', 'Delta', 'Basin', 'Shore', 'Banks']
    },
  
    styles: {
      european: {
        prefixes: ['Saint', 'San', 'Santa', 'Le', 'La', 'Les', 'De', 'Von', 'Van', 'Der'],
        suffixes: ['burg', 'stadt', 'dorf', 'furt', 'haven', 'heim', 'hof', 'kirk', 'berg', 'wick']
      },
      asian: {
        prefixes: ['New', 'North', 'South', 'East', 'West', 'Upper', 'Lower', 'Inner', 'Outer', 'Central'],
        suffixes: ['shi', 'jiang', 'dao', 'pur', 'bad', 'abad', 'yang', 'san', 'xian', 'zhou']
      },
      african: {
        prefixes: ['Great', 'New', 'Old', 'Upper', 'Lower', 'North', 'South', 'East', 'West', 'Royal'],
        suffixes: ['burg', 'town', 'ville', 'city', 'port', 'view', 'berg', 'land', 'field', 'park']
      },
      arabic: {
        prefixes: ['Al', 'El', 'Abu', 'Bab', 'Dar', 'Ras', 'Tel', 'Umm', 'Wadi', 'Ain'],
        suffixes: ['bad', 'pur', 'abad', 'stan', 'grad', 'polis', 'burgh', 'ton', 'field', 'gate']
      }
    },
  
    modifiers: {
      size: ['Greater', 'Lesser', 'Upper', 'Lower', 'Central', 'Inner', 'Outer', 'Metropolitan', 'Grand', 'Minor'],
      age: ['New', 'Old', 'Ancient', 'Modern', 'Neo', 'Classic', 'Traditional', 'Historic', 'Contemporary', 'Timeless'],
      status: ['Royal', 'Imperial', 'Free', 'United', 'Independent', 'Sovereign', 'Federal', 'Capital', 'Provincial', 'Municipal']
    }
  };
  
  export type CityStyle = 'english' | 'fantasy' | 'scifi' | 'european' | 'asian' | 'african' | 'arabic';
  export type CityPattern = 'standard' | 'compound' | 'geographic' | 'modified';