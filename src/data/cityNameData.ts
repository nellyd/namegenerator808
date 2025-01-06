// Types
export type CityStyle = 'english' | 'fantasy' | 'scifi' | 'european' | 'asian' | 'african' | 'arabic';
export type CityPattern = 'standard' | 'compound' | 'geographic' | 'modified';

type BaseNameTypes = {
  [key: string]: string[];
};

interface StyleData {
  prefixes: string[];
  suffixes: string[];
}

export const cityNameData = {
  styles: {
    english: { prefixes: ['New', 'West', 'East', 'North'], suffixes: ['ton', 'ville', 'bury'] },
    fantasy: { prefixes: ['Mist', 'Silver', 'Shadow'], suffixes: ['vale', 'keep', 'hold'] },
    scifi: { prefixes: ['Neo', 'Cyber', 'Tech'], suffixes: ['plex', 'tron', 'core'] },
    european: { prefixes: ['San', 'Sankt', 'Saint'], suffixes: ['burg', 'grad', 'stadt'] },
    asian: { prefixes: ['Shin', 'Nishi', 'Kita'], suffixes: ['shi', 'kou', 'machi'] },
    african: { prefixes: ['New', 'Great', 'Upper'], suffixes: ['burg', 'town', 'city'] },
    arabic: { prefixes: ['Al', 'El', 'Dar'], suffixes: ['iyah', 'bad', 'pur'] }
  } as Record<CityStyle, StyleData>,

  baseNames: {
    english: {
      nature: ['Wood', 'River', 'Lake', 'Hill', 'Green', 'Forest', 'Valley', 'Mountain'],
      cultural: ['King', 'Queen', 'Bishop', 'Castle', 'Church', 'Market', 'Bridge', 'Mill'],
      colors: ['Red', 'Blue', 'Green', 'White', 'Black', 'Golden', 'Silver', 'Gray']
    },
    fantasy: {
      mystical: ['Dragon', 'Phoenix', 'Unicorn', 'Griffin', 'Wyrm', 'Oracle', 'Mystic', 'Rune'],
      elements: ['Fire', 'Water', 'Earth', 'Air', 'Storm', 'Frost', 'Thunder', 'Lightning'],
      nature: ['Moon', 'Star', 'Sun', 'Sky', 'Cloud', 'Wind', 'Rain', 'Snow']
    },
    scifi: {
      tech: ['Circuit', 'Data', 'Binary', 'Vector', 'Matrix', 'Grid', 'Nexus', 'Core'],
      future: ['Chrome', 'Steel', 'Neon', 'Plasma', 'Laser', 'Cyber', 'Tech', 'Mech'],
      space: ['Star', 'Nova', 'Nebula', 'Astro', 'Cosmos', 'Galaxy', 'Solar', 'Lunar']
    }
  },

  prefixes: {
    english: ['New', 'Old', 'Great', 'Little', 'Upper', 'Lower', 'East', 'West'],
    fantasy: ['Mist', 'Storm', 'Frost', 'Shadow', 'Dawn', 'Dusk', 'Moon', 'Star'],
    scifi: ['Neo', 'Cyber', 'Tech', 'Alpha', 'Beta', 'Prime', 'Ultra', 'Hyper'],
    european: ['San', 'Sankt', 'Saint', 'Monte', 'Les', 'La', 'Le', 'De'],
    asian: ['Shin', 'Nishi', 'Kita', 'Minami', 'Higashi', 'New', 'Great', 'Royal'],
    african: ['New', 'Great', 'Upper', 'Lower', 'Royal', 'Lake', 'River', 'Mount'],
    arabic: ['Al', 'El', 'Dar', 'Bab', 'Ain', 'Ras', 'Wadi', 'Madinat']
  } as Record<CityStyle, string[]>,

  suffixes: {
    english: ['ton', 'ville', 'burg', 'ford', 'port', 'field', 'land', 'shire'],
    fantasy: ['keep', 'hold', 'vale', 'haven', 'gard', 'fell', 'dale', 'realm'],
    scifi: ['plex', 'tron', 'core', 'hub', 'port', 'base', 'dome', 'zone'],
    european: ['burg', 'grad', 'stadt', 'dorf', 'berg', 'heim', 'hof', 'garten'],
    asian: ['shi', 'kou', 'machi', 'cho', 'shi', 'pur', 'abad', 'nagar'],
    african: ['burg', 'town', 'city', 'port', 'ville', 'land', 'state', 'region'],
    arabic: ['iyah', 'bad', 'pur', 'stan', 'abad', 'ville', 'city', 'port']
  } as Record<CityStyle, string[]>,

  geographic: {
    terrain: ['mountains', 'hills', 'plains', 'forest', 'desert', 'valley', 'canyon', 'meadow'],
    water: ['river', 'lake', 'sea', 'ocean', 'bay', 'harbor', 'stream', 'falls'],
    features: ['caves', 'cliffs', 'springs', 'grove', 'ridge', 'peaks', 'shores', 'banks']
  },

  modifiers: {
    size: ['Great', 'Little', 'Grand', 'Lesser', 'Greater', 'Small', 'Vast', 'Tiny'],
    age: ['New', 'Old', 'Ancient', 'Young', 'Elder', 'First', 'Last', 'Eternal'],
    status: ['Royal', 'Imperial', 'Free', 'Holy', 'Sacred', 'Divine', 'Noble', 'High']
  }
};