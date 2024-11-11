// data/teamNameData.ts

interface TeamNameData {
    categories: {
      [key: string]: CategoryData;
    };
    patterns: {
      [key: string]: string;
    };
    mascots: {
      [key: string]: string[];
    };
    colors: {
      primary: string[];
      secondary: string[];
    };
    mottos: {
      [key: string]: string[];
    };
  }
  
  interface CategoryData {
    prefixes: string[];
    baseNames: string[];
    suffixes: string[];
    locations?: string[];
    colors?: string[];
    themes?: string[];
    modifiers?: string[];
    industries?: string[];
    attributes?: string[];
  }
  
  export const teamNameData: TeamNameData = {
    categories: {
      sports: {
        prefixes: [
          'Royal', 'Elite', 'United', 'Real', 'Athletic',
          'Racing', 'Sporting', 'Dynamic', 'Inter', 'Pro'
        ],
        baseNames: [
          'Lions', 'Tigers', 'Bears', 'Eagles', 'Hawks',
          'Warriors', 'Knights', 'Dragons', 'Phoenix', 'Wolves',
          'Panthers', 'Falcons', 'Sharks', 'Bulls', 'Titans'
        ],
        suffixes: [
          'FC', 'United', 'City', 'Athletic', 'Sports Club',
          'Academy', 'All-Stars', 'Elite'
        ],
        locations: [
          'North', 'South', 'East', 'West', 'Central',
          'Metro', 'City', 'Valley', 'Coast', 'Mountain'
        ],
        colors: [
          'Red', 'Blue', 'Green', 'Black', 'White',
          'Gold', 'Silver', 'Purple', 'Orange', 'Yellow'
        ]
      },
      esports: {
        prefixes: [
          'Team', 'Guild', 'Clan', 'Squad', 'Force',
          'Legion', 'Alliance', 'Dynasty', 'Empire', 'Order'
        ],
        baseNames: [
          'Ninjas', 'Assassins', 'Pirates', 'Rogues', 'Legends',
          'Guardians', 'Phantom', 'Cyber', 'Digital', 'Virtual',
          'Shadow', 'Storm', 'Fury', 'Rage', 'Thunder'
        ],
        suffixes: [
          'Gaming', 'Esports', 'Team', 'Squad', 'Crew',
          'Network', 'Pro', 'Elite', 'X', 'Core'
        ],
        modifiers: [
          'Pro', 'Elite', 'Ultra', 'Apex', 'Prime',
          'Supreme', 'Ultimate', 'Infinite', 'Premium', 'Master'
        ],
        themes: [
          'Cyber', 'Digital', 'Quantum', 'Pixel', 'Binary',
          'Neural', 'Virtual', 'Crypto', 'Tech', 'Net'
        ]
      },
      business: {
        prefixes: [
          'Peak', 'Prime', 'Core', 'Elite', 'Alpha',
          'Beta', 'Meta', 'Next', 'Future', 'Smart'
        ],
        baseNames: [
          'Solutions', 'Systems', 'Dynamics', 'Innovation', 'Tech',
          'Connect', 'Network', 'Synergy', 'Venture', 'Logic'
        ],
        suffixes: [
          'Group', 'Team', 'Labs', 'Co', 'Inc',
          'Partners', 'Associates', 'Consulting', 'International', 'Global'
        ],
        industries: [
          'Tech', 'Digital', 'Creative', 'Marketing', 'Design',
          'Finance', 'Media', 'Data', 'Cloud', 'Mobile'
        ],
        attributes: [
          'Innovative', 'Dynamic', 'Agile', 'Strategic', 'Creative',
          'Forward', 'Leading', 'Advanced', 'Modern', 'Progressive'
        ]
      }
    },
    patterns: {
      standard: '[Prefix] [BaseName]',
      location: '[Location] [BaseName]',
      colored: '[Color] [BaseName]',
      modified: '[Prefix] [BaseName] [Suffix]',
      themed: '[Theme] [BaseName]',
      composite: '[Prefix] [Location] [BaseName]',
      attribute: '[Attribute] [BaseName] [Suffix]',
      industry: '[Industry] [BaseName] [Suffix]'
    },
    mascots: {
      animals: [
        'Lion', 'Tiger', 'Bear', 'Eagle', 'Wolf',
        'Hawk', 'Panther', 'Dragon', 'Phoenix', 'Shark'
      ],
      mythical: [
        'Griffin', 'Unicorn', 'Phoenix', 'Dragon', 'Hydra',
        'Titan', 'Kraken', 'Chimera', 'Sphinx', 'Pegasus'
      ],
      warriors: [
        'Knight', 'Warrior', 'Gladiator', 'Viking', 'Samurai',
        'Spartan', 'Ninja', 'Paladin', 'Champion', 'Guardian'
      ]
    },
    colors: {
      primary: [
        'Red', 'Blue', 'Green', 'Yellow', 'Purple',
        'Orange', 'Black', 'White', 'Gold', 'Silver'
      ],
      secondary: [
        'Crimson', 'Navy', 'Forest', 'Golden', 'Royal',
        'Azure', 'Emerald', 'Ruby', 'Sapphire', 'Bronze'
      ]
    },
    mottos: {
      sports: [
        'Victory Through Unity', 'Strength in Numbers', 'Never Back Down',
        'Rise to Glory', 'Beyond Limits', 'United We Stand'
      ],
      esports: [
        'Play to Win', 'Game On', 'Level Up', 'Beyond Gaming',
        'Digital Warriors', 'Pixel Perfect'
      ],
      business: [
        'Innovation First', 'Excellence Always', 'Leading the Future',
        'Together Forward', 'Building Tomorrow', 'Creating Value'
      ]
    }
  };