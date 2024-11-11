// src/data/usernameData.ts

export const usernameData = {
    prefixes: {
      gaming: [
        'Pro', 'Epic', 'Elite', 'Ultra', 'Dark',
        'Ghost', 'Shadow', 'Storm', 'Fire', 'Ice'
      ],
      social: [
        'Cool', 'Real', 'Its', 'The', 'Just',
        'Best', 'Top', 'True', 'Life', 'Daily'
      ],
      professional: [
        'Dev', 'Tech', 'Pro', 'Dr', 'Chief',
        'Expert', 'Master', 'Senior', 'Lead', 'Coach'
      ]
    },
    themes: {
      gaming: {
        nouns: [
          'Gamer', 'Player', 'Ninja', 'Assassin', 'Warrior',
          'Knight', 'Legend', 'Master', 'Champion', 'Hunter'
        ],
        actions: [
          'Gaming', 'Slaying', 'Hunting', 'Raiding', 'Fighting',
          'Winning', 'Racing', 'Ruling', 'Dominating', 'Crushing'
        ]
      },
      tech: {
        nouns: [
          'Coder', 'Hacker', 'Dev', 'Builder', 'Creator',
          'Engineer', 'Maker', 'Designer', 'Architect', 'Pioneer'
        ],
        adjectives: [
          'Smart', 'Digital', 'Cyber', 'Tech', 'Code',
          'Data', 'Net', 'Web', 'Cloud', 'Quantum'
        ]
      },
      creative: {
        nouns: [
          'Artist', 'Creator', 'Designer', 'Maker', 'Writer',
          'Author', 'Painter', 'Dreamer', 'Visionary', 'Poet'
        ],
        adjectives: [
          'Creative', 'Artistic', 'Inspired', 'Dreamy', 'Wild',
          'Free', 'Bold', 'Unique', 'Vibrant', 'Colorful'
        ]
      }
    },
    decorators: {
      symbols: ['x', '_', '.', '-', '~'],
      numbers: ['1', '2', '3', '4', '5', '7', '8', '9', '0'],
      leetSpeak: {
        a: '4',
        e: '3',
        i: '1',
        o: '0',
        s: '5',
        t: '7'
      }
    }
  };
  
  export type UsernameTheme = 'gaming' | 'tech' | 'creative';
  export type PrefixStyle = 'gaming' | 'social' | 'professional';
  export type NamePattern = 'standard' | 'action' | 'descriptive' | 'leet';
  
  export interface GeneratedUsername {
    name: string;
    theme: string;
    style: string;
  }
  
  export interface FormData {
    theme: UsernameTheme;
    prefixStyle: PrefixStyle;
    pattern: NamePattern;
    includeNumbers: boolean;
    useLeetSpeak: boolean;
    minLength: number;
    maxLength: number;
    count: number;
  }