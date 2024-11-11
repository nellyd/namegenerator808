// data/gameNameData.ts

export const gameNameData = {
    prefixes: {
      action: [
        'Ultra', 'Mega', 'Super', 'Hyper', 'Turbo',
        'Power', 'Epic', 'Extreme', 'Ultimate', 'Fatal',
        'Cyber', 'Dark', 'Neon', 'Brutal', 'Critical'
      ],
      fantasy: [
        'Ancient', 'Mystic', 'Elder', 'Eternal', 'Divine',
        'Forgotten', 'Sacred', 'Mythic', 'Arcane', 'Lost',
        'Crystal', 'Dragon', 'Shadow', 'Storm', 'Star'
      ],
      scifi: [
        'Quantum', 'Stellar', 'Cosmic', 'Neo', 'Cyber',
        'Tech', 'Vector', 'Binary', 'Digital', 'Nano',
        'Astro', 'Space', 'Void', 'Zero', 'Apex'
      ],
      strategy: [
        'Grand', 'Total', 'Master', 'Supreme', 'Advanced',
        'Elite', 'Prime', 'Epic', 'Tactical', 'Strategic',
        'Imperial', 'Royal', 'Global', 'Universal', 'Eternal'
      ]
    },
    nouns: {
      action: [
        'Combat', 'Warrior', 'Strike', 'Force', 'Battle',
        'Hunter', 'Fight', 'Rage', 'Arena', 'Assault',
        'Fury', 'Rush', 'Edge', 'Siege', 'Rampage'
      ],
      fantasy: [
        'Realms', 'Legends', 'Tales', 'Quest', 'Saga',
        'Chronicles', 'Magic', 'Kingdoms', 'Souls', 'Dungeons',
        'Heroes', 'Dragons', 'Knights', 'Blade', 'Spells'
      ],
      scifi: [
        'Protocol', 'Effect', 'Impact', 'Core', 'System',
        'Matrix', 'Nexus', 'Grid', 'Pulse', 'Dawn',
        'Eclipse', 'Horizon', 'Initiative', 'Domain', 'Project'
      ],
      strategy: [
        'Empire', 'Kingdom', 'Command', 'Dynasty', 'Conquest',
        'Dominion', 'Legion', 'Army', 'Throne', 'Tactics',
        'Defense', 'Alliance', 'Colony', 'Nation', 'Civilization'
      ]
    },
    suffixes: {
      action: [
        'Unleashed', 'Evolved', 'Reloaded', 'Extreme', 'Ultimate',
        'Revolution', 'Mayhem', 'Crisis', 'Vengeance', 'Rising'
      ],
      fantasy: [
        'Awakening', 'Legacy', 'Origins', 'Destiny', 'Prophecy',
        'Ascension', 'Eternity', 'Rebirth', 'Legend', 'Mystery'
      ],
      scifi: [
        'Protocol', 'Initiative', 'Zero', 'Prime', 'Genesis',
        'Origins', 'Evolution', 'Beyond', 'Infinity', 'Reborn'
      ],
      strategy: [
        'Wars', 'Empire', 'Tactics', 'Campaign', 'Commander',
        'General', 'Master', 'Dynasty', 'Conquest', 'Domination'
      ]
    },
    substyles: {
      retro: [
        'Pixel', 'Bit', '8-Bit', '16-Bit', 'Classic',
        'Old School', 'Arcade', 'Retro', 'Vintage', 'Legacy'
      ],
      indie: [
        'Little', 'Tiny', 'Mini', 'Small', 'Simple',
        'Humble', 'Light', 'Basic', 'Quick', 'Easy'
      ],
      epic: [
        'Legendary', 'Immortal', 'Infinite', 'Supreme', 'Ultimate',
        'Mythical', 'Godlike', 'Divine', 'Eternal', 'Omega'
      ]
    },
    patterns: {
      standard: '[Prefix] [Noun]',
      extended: '[Prefix] [Noun] [Suffix]',
      compound: '[Noun] of [Noun]',
      subtitle: '[Noun]: [Suffix]',
      series: '[Noun] [Number]',
      spin: '[Noun]: [Prefix] [Suffix]'
    },
    gameTypes: {
      single: [
        'Adventure', 'Quest', 'Journey', 'Tale', 'Story',
        'Saga', 'Legend', 'Epic', 'Chronicles', 'Odyssey'
      ],
      multi: [
        'Arena', 'Battle', 'Wars', 'Clash', 'Tournament',
        'Combat', 'Warfare', 'Conflict', 'Showdown', 'Rivals'
      ],
      casual: [
        'World', 'Life', 'Land', 'Valley', 'Garden',
        'Town', 'City', 'Farm', 'Village', 'Paradise'
      ]
    },
    themes: {
      dark: [
        'Darkness', 'Shadow', 'Night', 'Doom', 'Death',
        'Blood', 'Black', 'Dark', 'Grim', 'Horror'
      ],
      light: [
        'Light', 'Sun', 'Day', 'Dawn', 'Hope',
        'Life', 'White', 'Bright', 'Glory', 'Divine'
      ],
      neutral: [
        'Balance', 'Harmony', 'Unity', 'Order', 'Peace',
        'Flow', 'Path', 'Way', 'Journey', 'Dream'
      ]
    }
  };
  
  export type GameGenre = 'action' | 'fantasy' | 'scifi' | 'strategy' | 'any';
  export type GameStyle = 'standard' | 'extended' | 'compound' | 'subtitle' | 'series' | 'spin';
  export type GameTheme = 'dark' | 'light' | 'neutral' | 'any';
  export type GameSubstyle = 'retro' | 'indie' | 'epic' | 'none';
  
  export interface GeneratedGameName {
    name: string;
    genre: string;
    theme?: string;
    style?: string;
  }