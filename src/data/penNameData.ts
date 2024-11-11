// data/penNameData.ts

export const penNameData = {
    styles: {
      classic: {
        firstNames: [
          'Alexander', 'Benjamin', 'Charles', 'Daniel', 'Edward',
          'Frederick', 'George', 'Henry', 'Isaac', 'James',
          'Katherine', 'Laura', 'Margaret', 'Nathaniel', 'Oliver',
          'Penelope', 'Quinn', 'Rose', 'Samuel', 'Thomas'
        ],
        lastNames: [
          'Blackwood', 'Chandler', 'Darcy', 'Edwards', 'Fairfax',
          'Graham', 'Hamilton', 'Irving', 'James', 'Kingston',
          'Lawrence', 'Montgomery', 'Norton', 'Owen', 'Preston',
          'Quincy', 'Richmond', 'Sterling', 'Thorne', 'Winchester'
        ]
      },
      modern: {
        firstNames: [
          'Ash', 'Blake', 'Charlie', 'Drew', 'Eden',
          'Finn', 'Gray', 'Harper', 'Ivy', 'Jazz',
          'Kai', 'Luna', 'Maven', 'Nova', 'Phoenix',
          'Quinn', 'River', 'Sage', 'Tate', 'Winter'
        ],
        lastNames: [
          'Asher', 'Brooks', 'Chase', 'Drake', 'Ellis',
          'Frost', 'Gray', 'Hart', 'Ivory', 'Jones',
          'Knight', 'Lake', 'Moon', 'North', 'Onyx',
          'Price', 'Quest', 'Rain', 'Storm', 'Wilde'
        ]
      },
      artistic: {
        firstNames: [
          'Aurora', 'Cosmos', 'Dream', 'Echo', 'Fable',
          'Ghost', 'Haven', 'Iris', 'Journey', 'Lyric',
          'Myth', 'Neo', 'Oracle', 'Poet', 'Quest',
          'Raven', 'Storm', 'Truth', 'Vision', 'Zen'
        ],
        lastNames: [
          'Aire', 'Bloom', 'Cloud', 'Dusk', 'Echo',
          'Fable', 'Glass', 'Hawk', 'Isle', 'Jade',
          'Kite', 'Lark', 'Mist', 'Night', 'Ocean',
          'Peak', 'Quest', 'Rain', 'Snow', 'Tide'
        ]
      }
    },
    patterns: {
      initials: {
        connectors: ['.', '', '_', '-'],
        formats: [
          'F.L', 'F.L.', 'FL', 'F_L', 'F-L',
          'L.F', 'L.F.', 'LF', 'L_F', 'L-F'
        ]
      },
      elements: {
        nouns: [
          'River', 'Sky', 'Storm', 'Star', 'Moon',
          'Wind', 'Rain', 'Snow', 'Sun', 'Cloud',
          'Shadow', 'Light', 'Dawn', 'Dusk', 'Night'
        ],
        adjectives: [
          'Dark', 'Bright', 'Swift', 'Silent', 'Wild',
          'Deep', 'Golden', 'Silver', 'Blue', 'Green',
          'Red', 'White', 'Black', 'Grey', 'Purple'
        ]
      },
      titles: [
        'Author', 'Writer', 'Scribe', 'Poet', 'Wordsmith',
        'Storyteller', 'Bard', 'Chronicler', 'Sage', 'Penman'
      ],
      locations: [
        'of the North', 'of the South', 'of the East', 'of the West',
        'of the Mountains', 'of the Valley', 'of the Woods', 'of the Sea',
        'of the Lake', 'of the Hills', 'of the Plains', 'of the Coast'
      ]
    },
    genres: {
      mystery: {
        prefixes: ['Detective', 'Inspector', 'Agent', 'Investigator'],
        suffixes: ['Mystery', 'Case', 'File', 'Chronicles']
      },
      fantasy: {
        prefixes: ['Wizard', 'Mage', 'Sage', 'Mystic'],
        suffixes: ['Spells', 'Magic', 'Tales', 'Scrolls']
      },
      romance: {
        prefixes: ['Love', 'Heart', 'Passion', 'Soul'],
        suffixes: ['Romance', 'Dreams', 'Desires', 'Stories']
      },
      scifi: {
        prefixes: ['Quantum', 'Stellar', 'Cosmic', 'Neo'],
        suffixes: ['Protocol', 'Matrix', 'Code', 'Sequence']
      }
    }
  };