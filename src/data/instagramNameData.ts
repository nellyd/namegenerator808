// data/instagramNameData.ts

export const instagramNameData = {
    prefixes: {
      aesthetic: [
        'aesthetic', 'dreamy', 'soft', 'sunny', 'moody',
        'artsy', 'golden', 'pastel', 'mystic', 'cosmic'
      ],
      cool: [
        'cool', 'epic', 'savage', 'ultra', 'elite',
        'prime', 'next', 'pure', 'dark', 'lit'
      ],
      professional: [
        'official', 'real', 'its', 'im', 'the',
        'pro', 'expert', 'master', 'dr', 'chief'
      ]
    },
  
    themes: {
      creative: {
        words: [
          'art', 'create', 'design', 'style', 'vision',
          'color', 'paint', 'draw', 'craft', 'maker'
        ],
        suffixes: [
          'artist', 'creator', 'designer', 'creative', 'maker',
          'studio', 'gallery', 'works', 'space', 'lab'
        ]
      },
      lifestyle: {
        words: [
          'life', 'living', 'vibe', 'mood', 'soul',
          'mind', 'heart', 'spirit', 'energy', 'aura'
        ],
        suffixes: [
          'life', 'living', 'lifestyle', 'vibes', 'diary',
          'stories', 'moments', 'times', 'days', 'adventures'
        ]
      },
      fashion: {
        words: [
          'style', 'fashion', 'trend', 'vogue', 'chic',
          'glam', 'luxe', 'mode', 'couture', 'wear'
        ],
        suffixes: [
          'style', 'fashion', 'looks', 'outfits', 'wear',
          'wardrobe', 'closet', 'attire', 'ensemble', 'threads'
        ]
      },
      travel: {
        words: [
          'travel', 'wander', 'roam', 'explore', 'journey',
          'voyage', 'trek', 'quest', 'adventure', 'discover'
        ],
        suffixes: [
          'traveler', 'wanderer', 'explorer', 'adventurer', 'nomad',
          'journeys', 'travels', 'adventures', 'discoveries', 'tales'
        ]
      },
      fitness: {
        words: [
          'fit', 'health', 'strong', 'active', 'power',
          'muscle', 'gym', 'train', 'athletic', 'sport'
        ],
        suffixes: [
          'fitness', 'health', 'strength', 'gains', 'athletics',
          'training', 'workout', 'lifestyle', 'coach', 'guru'
        ]
      }
    },
  
    decorative: {
      symbols: ['✨', '🌟', '⭐️', '🌙', '☀️', '🌺', '🌸', '🍃', '💫', '⚡️'],
      separators: ['.', '_', '__', '._.', '._', '-', '--', '...'],
      numbers: ['1', '2', '3', '4', '5', '7', '8', '9', '0', '00']
    },
  
    personalizers: {
      traits: [
        'happy', 'wild', 'free', 'sweet', 'crazy',
        'quiet', 'loud', 'bold', 'shy', 'fierce'
      ],
      adjectives: [
        'little', 'big', 'smol', 'tiny', 'mini',
        'mega', 'super', 'uber', 'ultra', 'extra'
      ],
      descriptors: [
        'cute', 'pretty', 'lovely', 'beauty', 'gorgeous',
        'divine', 'perfect', 'ideal', 'unique', 'special'
      ]
    },
  
    patterns: {
      standard: '[prefix]_[word]_[suffix]',
      decorated: '[word][separator][suffix][symbol]',
      numbered: '[word][number][suffix]',
      personalized: '[trait]_[word]_[suffix]'
    }
  };
  
  export type InstagramTheme = 'creative' | 'lifestyle' | 'fashion' | 'travel' | 'fitness';
  export type NameStyle = 'standard' | 'decorated' | 'numbered' | 'personalized';
  export type PrefixStyle = 'aesthetic' | 'cool' | 'professional';
  
  export interface GeneratedInstagramName {
    name: string;
    theme: string;
    style: string;
  }