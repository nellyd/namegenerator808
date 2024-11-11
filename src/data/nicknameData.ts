export const nicknameData = {
    // Descriptive adjectives by category
    adjectives: {
      personality: [
        'brave', 'witty', 'clever', 'wise', 'calm', 'fierce', 'jolly', 'merry',
        'wild', 'bold', 'noble', 'proud', 'quirky', 'sunny', 'zesty', 'daring'
      ],
      physical: [
        'swift', 'mighty', 'tall', 'quick', 'strong', 'agile', 'nimble', 'graceful',
        'speedy', 'sturdy', 'tough', 'dynamic', 'bright', 'radiant', 'glowing'
      ],
      interests: [
        'crafty', 'sporty', 'artsy', 'brainy', 'musical', 'creative', 'techie', 'bookish',
        'gamer', 'dancer', 'dreamer', 'explorer', 'leader', 'scholar', 'wizard'
      ],
      vibes: [
        'cool', 'epic', 'super', 'mega', 'ultra', 'supreme', 'legendary', 'mythic',
        'cosmic', 'magic', 'mystic', 'stellar', 'prime', 'elite', 'royal'
      ]
    },
  
    // Pop culture references
    popCulture: {
      fantasy: [
        'Dragon', 'Phoenix', 'Wizard', 'Knight', 'Ninja', 'Warrior', 'Mage', 'Hero',
        'Legend', 'Mystic', 'Shadow', 'Storm', 'Thunder', 'Frost', 'Flame'
      ],
      gaming: [
        'Pro', 'Gamer', 'Player', 'Champion', 'Master', 'Elite', 'Boss', 'Captain',
        'Commander', 'Ace', 'Sniper', 'Tank', 'Healer', 'Striker', 'Raider'
      ],
      mythology: [
        'Zeus', 'Thor', 'Atlas', 'Apollo', 'Luna', 'Nova', 'Titan', 'Oracle',
        'Artemis', 'Mars', 'Mercury', 'Venus', 'Neptune', 'Jupiter', 'Saturn'
      ]
    },
  
    // Common suffixes for different contexts
    suffixes: {
      casual: ['y', 'ie', 'er', 'sy', 'o', 'z', 'zzy', 'ster'],
      gaming: ['Pro', 'Gaming', 'TV', 'YT', 'Live', 'Plays', 'Gaming', 'Stream'],
      professional: ['MD', 'PhD', 'Esq', 'Jr', 'Sr', 'III', 'IV', 'CEO'],
      social: ['gram', 'tok', 'tube', 'snap', 'net', 'web', 'blog', 'vlog']
    },
  
    // Rhyming patterns
    rhymePatterns: [
      { prefix: 'Mellow', suffix: 'Fellow' },
      { prefix: 'Super', suffix: 'Duper' },
      { prefix: 'Techy', suffix: 'Becky' },
      { prefix: 'Fancy', suffix: 'Nancy' },
      { prefix: 'Simple', suffix: 'Dimple' },
      { prefix: 'Silly', suffix: 'Billy' }
    ]
  };
  
  // Helper functions for name generation
  export const nameUtils = {
    getRandomItem: <T>(array: T[]): T => {
      return array[Math.floor(Math.random() * array.length)];
    },
  
    capitalize: (str: string): string => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  
    createAlliteration: (name: string, adjectives: string[]): string => {
      const firstLetter = name.charAt(0).toLowerCase();
      const matchingAdjectives = adjectives.filter(adj => 
        adj.charAt(0).toLowerCase() === firstLetter
      );
      return matchingAdjectives.length > 0 
        ? `${nameUtils.capitalize(nameUtils.getRandomItem(matchingAdjectives))} ${name}`
        : '';
    },
  
    generateRhyme: (name: string): string => {
      const lastSyllable = name.slice(-2);
      const rhymeOptions = [
        lastSyllable + 'y',
        lastSyllable + 'ie',
        lastSyllable + 'er',
        lastSyllable + 'ster'
      ];
      return nameUtils.getRandomItem(rhymeOptions);
    }
  };