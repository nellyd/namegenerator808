// src/data/lastNameData.ts

export const lastNameData = {
    origins: {
      english: {
        traditional: [
          'Smith', 'Johnson', 'Williams', 'Brown', 'Taylor',
          'Davies', 'Wilson', 'Evans', 'Thomas', 'Roberts'
        ],
        occupational: [
          'Baker', 'Carpenter', 'Cook', 'Fisher', 'Farmer',
          'Mason', 'Miller', 'Potter', 'Shepherd', 'Wright'
        ],
        geographical: [
          'Hill', 'Wood', 'Forest', 'Lake', 'Brook',
          'Field', 'Green', 'Dale', 'Bridge', 'Pool'
        ]
      },
      irish: [
        "O'Brien", "O'Connor", "O'Sullivan", "O'Neill", "O'Reilly",
        "McCarthy", "Kelly", "Murphy", "Walsh", "Ryan"
      ],
      scottish: [
        'MacDonald', 'Campbell', 'MacLeod', 'Stewart', 'Robertson',
        'Murray', 'Fraser', 'Cameron', 'Ross', 'Graham'
      ],
      german: [
        'Schmidt', 'Müller', 'Weber', 'Wagner', 'Becker',
        'Hoffmann', 'Schulz', 'Koch', 'Richter', 'Klein'
      ],
      italian: [
        'Rossi', 'Ferrari', 'Russo', 'Romano', 'Colombo',
        'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo'
      ],
      french: [
        'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert',
        'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau'
      ],
      spanish: [
        'García', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez',
        'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres'
      ],
      nordic: [
        'Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson',
        'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'
      ],
      polish: [
        'Kowalski', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk',
        'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Woźniak'
      ]
    },
    styles: {
      compound: {
        prefixes: [
          'North', 'South', 'East', 'West', 'High',
          'Low', 'Old', 'New', 'Great', 'Little'
        ],
        suffixes: [
          'wood', 'field', 'ford', 'bridge', 'worth',
          'land', 'hill', 'dale', 'ley', 'ton'
        ]
      },
      noble: {
        prefixes: [
          'de', 'van', 'von', 'di', 'della',
          'du', 'la', 'le', 'al', 'el'
        ],
        names: [
          'Montfort', 'Beaumont', 'Belmont', 'Fairfax', 'Sinclair',
          'Montgomery', 'Winchester', 'Richmond', 'Somerset', 'Sterling'
        ]
      },
      elements: {
        materials: [
          'Gold', 'Silver', 'Steel', 'Iron', 'Copper',
          'Bronze', 'Stone', 'Crystal', 'Diamond', 'Pearl'
        ],
        nature: [
          'Wood', 'River', 'Lake', 'Hill', 'Forest',
          'Field', 'Mountain', 'Storm', 'Rain', 'Snow'
        ]
      }
    },
    modifiers: {
      prefixes: [
        'von', 'van', 'de', 'del', 'della',
        'du', 'das', 'dos', 'el', 'al'
      ],
      suffixes: [
        'son', 'sen', 'dottir', 'ez', 'ski',
        'ov', 'off', 'ic', 'vich', 'berg'
      ]
    }
  };
  
  export type LastNameOrigin = 'english' | 'irish' | 'scottish' | 'german' | 'italian' | 
                             'french' | 'spanish' | 'nordic' | 'polish' | 'any';
  export type LastNameStyle = 'traditional' | 'occupational' | 'geographical' | 
                            'compound' | 'noble' | 'elemental' | 'any';
  export type LastNameModifier = 'none' | 'prefix' | 'suffix' | 'both';
  
  export interface GeneratedLastName {
    name: string;
    origin: string;
    style?: string;
    meaning?: string;
  }