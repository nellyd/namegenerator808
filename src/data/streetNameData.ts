// data/streetNameData.ts

export const streetNameData = {
    prefixes: {
      compass: ['North', 'South', 'East', 'West', 'Upper', 'Lower', 'Old', 'New'],
      size: ['Great', 'Little', 'High', 'Low', 'Broad', 'Long', 'Short', 'Wide'],
      descriptive: ['Royal', 'Grand', 'Fair', 'Pleasant', 'Sweet', 'Golden', 'Silver', 'Crystal']
    },
    
    bases: {
      nature: {
        trees: [
          'Oak', 'Maple', 'Pine', 'Elm', 'Birch', 'Cedar', 'Willow', 'Aspen',
          'Cherry', 'Cypress', 'Magnolia', 'Palm', 'Sycamore', 'Ash', 'Beech'
        ],
        flowers: [
          'Rose', 'Lily', 'Magnolia', 'Daisy', 'Violet', 'Jasmine', 'Iris',
          'Primrose', 'Tulip', 'Azalea', 'Poppy', 'Dahlia', 'Marigold'
        ],
        landscape: [
          'Hill', 'Valley', 'Ridge', 'Brook', 'Creek', 'River', 'Lake',
          'Forest', 'Glen', 'Grove', 'Park', 'Wood', 'Garden', 'Field'
        ]
      },
      urban: {
        landmarks: [
          'Church', 'Chapel', 'Market', 'Station', 'Bridge', 'Tower',
          'Castle', 'Court', 'Square', 'Plaza', 'Center', 'Mall'
        ],
        historical: [
          'Mill', 'Forge', 'Farm', 'Grange', 'Manor', 'Hall',
          'Abbey', 'Priory', 'Lodge', 'Cottage', 'Gate', 'Well'
        ],
        commercial: [
          'Market', 'Commerce', 'Trade', 'Exchange', 'Industry',
          'Business', 'Shop', 'Store', 'Merchant', 'Retail'
        ]
      },
      residential: {
        community: [
          'Village', 'Town', 'Harbor', 'Haven', 'Commons', 'Green',
          'Park', 'Garden', 'Plaza', 'Square', 'Circle', 'Court'
        ],
        status: [
          'Kings', 'Queens', 'Princes', 'Royal', 'Noble', 'Crown',
          'Palace', 'Castle', 'Manor', 'Estate', 'Regency'
        ],
        family: [
          'Hamilton', 'Washington', 'Lincoln', 'Windsor', 'Victoria',
          'Elizabeth', 'Churchill', 'Madison', 'Franklin', 'Adams'
        ]
      }
    },
  
    suffixes: {
      standard: [
        'Street', 'Road', 'Avenue', 'Lane', 'Drive', 'Way', 'Place',
        'Boulevard', 'Circle', 'Court', 'Terrace', 'Path', 'Walk'
      ],
      british: [
        'Close', 'Mews', 'Passage', 'Row', 'Vale', 'Rise', 'Green',
        'Gardens', 'Grove', 'Gate', 'Yard', 'Circus', 'Hill'
      ],
      american: [
        'Pike', 'Highway', 'Trail', 'Parkway', 'Loop', 'Junction',
        'Circle', 'Crossing', 'Ridge', 'Run', 'Pass', 'View'
      ]
    },
  
    styles: {
      modern: {
        elements: [
          'Park', 'View', 'Ridge', 'Hills', 'Heights', 'Point', 'Square',
          'Commons', 'Center', 'Place', 'Plaza', 'Circle', 'Crossing'
        ],
        themes: [
          'Metro', 'City', 'Urban', 'Central', 'Town', 'Village',
          'District', 'Quarter', 'Zone', 'Sector', 'Block'
        ]
      },
      suburban: {
        elements: [
          'Glen', 'Grove', 'Woods', 'Green', 'Meadow', 'Fields',
          'Gardens', 'Park', 'Hills', 'Valley', 'Ridge', 'Creek'
        ],
        themes: [
          'Estates', 'Heights', 'Manor', 'Village', 'Commons',
          'Gardens', 'Park', 'Meadows', 'Woods', 'Hills'
        ]
      }
    },
  
    patterns: {
      standard: '[Prefix?] [Base] [Suffix]',
      compound: '[Base] [Base] [Suffix]',
      possessive: '[Base]\'s [Suffix]',
      descriptive: '[Prefix] [Base] [Suffix]'
    }
  };
  
  export type StreetStyle = 'nature' | 'urban' | 'residential' | 'modern' | 'suburban';
  export type SuffixStyle = 'standard' | 'british' | 'american';
  export type NamePattern = 'standard' | 'compound' | 'possessive' | 'descriptive';
  
  export interface GeneratedStreet {
    name: string;
    style: StreetStyle;
    pattern: NamePattern;
  }