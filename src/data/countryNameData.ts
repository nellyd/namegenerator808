// data/countryNameData.ts

export interface RegionData {
  european: string[];
  asian: string[];
  african: string[];
  latin: string[];
}

export interface SyllableData {
  start: string[];
  middle: string[];
  end: string[];
}

export interface CountryData {
  prefixes: string[];
  roots: string[];
  syllables: SyllableData;
  regions?: RegionData;
  elements?: string[];
  fantasyWords?: string[];
  suffixes?: string[];
}

export type NameType = 'real' | 'fictional';
export type RegionStyle = 'european' | 'asian' | 'african' | 'latin' | 'any';

export interface CountryNameData {
  real: CountryData;
  fictional: CountryData;
  governmentTypes: string[];
  geographicFeatures: string[];
  cardinalDirections: string[];
}

export const countryNameData: CountryNameData = {
  real: {
    prefixes: [
      'New', 'North', 'South', 'East', 'West',
      'United', 'Great', 'Republic of', 'State of', 'Kingdom of'
    ],
    roots: [
      'land', 'stan', 'ia', 'istan', 'ville',
      'berg', 'burg', 'dor', 'nia', 'rico'
    ],
    syllables: {
      start: [
        'Al', 'An', 'Ar', 'Ba', 'Be', 'Bo', 'Ca', 'Ce',
        'Da', 'De', 'El', 'En', 'Es', 'Fa', 'Fi', 'Ga'
      ],
      middle: [
        'ba', 'be', 'bi', 'bo', 'da', 'de', 'di', 'do',
        'ga', 'ge', 'gi', 'go', 'ka', 'ke', 'ki', 'ko'
      ],
      end: [
        'nia', 'lia', 'ria', 'sia', 'tia', 'dia', 'mia',
        'land', 'stan', 'mark', 'burg', 'berg', 'ville'
      ]
    },
    regions: {
      european: [
        'avia', 'land', 'mark', 'berg', 'burg',
        'grad', 'stein', 'shire', 'ton', 'nia'
      ],
      asian: [
        'stan', 'pur', 'bad', 'guo', 'han',
        'dao', 'jin', 'kong', 'jiang', 'yang'
      ],
      african: [
        'wa', 'to', 'so', 'go', 'we',
        'di', 'bia', 'da', 'na', 'wi'
      ],
      latin: [
        'guay', 'dor', 'zil', 'nas', 'cos',
        'rica', 'ela', 'ana', 'bia', 'ca'
      ]
    }
  },
  fictional: {
    prefixes: [
      'Aero', 'Cryo', 'Pyro', 'Hydro', 'Terra',
      'Neo', 'Cyber', 'Meta', 'Quantum', 'Astro'
    ],
    roots: [
      'topia', 'landia', 'world', 'realm', 'haven',
      'vale', 'gate', 'scape', 'sphere', 'zone'
    ],
    syllables: {
      start: [
        'Aer', 'Ast', 'Cel', 'Dra', 'Eld', 'Fae',
        'Gal', 'Hel', 'Iri', 'Jov', 'Kry', 'Lum'
      ],
      middle: [
        'ax', 'ex', 'ix', 'ox', 'ux',
        'ar', 'er', 'ir', 'or', 'ur'
      ],
      end: [
        'aria', 'eria', 'iria', 'oria', 'uria',
        'axis', 'exis', 'ixis', 'oxis', 'uxis'
      ]
    },
    elements: [
      'Crystal', 'Shadow', 'Storm', 'Frost', 'Dawn',
      'Dusk', 'Star', 'Moon', 'Sun', 'Sky'
    ],
    fantasyWords: [
      'myr', 'thal', 'dor', 'wyn', 'ryn',
      'vale', 'fell', 'reach', 'march', 'hold'
    ],
    suffixes: [
      'empire', 'dominion', 'federation', 'alliance', 'consortium',
      'collective', 'unity', 'covenant', 'enclave', 'sovereign'
    ]
  },
  governmentTypes: [
    'Republic', 'Kingdom', 'Empire', 'Federation', 'Union',
    'Commonwealth', 'Principality', 'Sultanate', 'Emirates', 'State'
  ],
  geographicFeatures: [
    'Islands', 'Peninsula', 'Coast', 'Mountains', 'Plains',
    'Desert', 'Forest', 'Valley', 'Hills', 'Lakes'
  ],
  cardinalDirections: [
    'Northern', 'Southern', 'Eastern', 'Western', 'Central',
    'Upper', 'Lower', 'Greater', 'Lesser', 'United'
  ]
};