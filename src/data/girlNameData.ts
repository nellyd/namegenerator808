// data/girlNameData.ts

export const girlNameData = {
    origins: {
      english: {
        traditional: [
          'Alice', 'Beatrice', 'Charlotte', 'Dorothy', 'Eleanor',
          'Florence', 'Grace', 'Helen', 'Isabel', 'Jane',
          'Katherine', 'Louise', 'Margaret', 'Nancy', 'Olivia',
          'Patricia', 'Rachel', 'Sarah', 'Victoria', 'Wendy'
        ],
        modern: [
          'Aria', 'Brooklyn', 'Chloe', 'Daisy', 'Emma',
          'Faith', 'Harper', 'Ivy', 'Journey', 'Kennedy',
          'Luna', 'Mia', 'Nova', 'Ocean', 'Piper',
          'Quinn', 'Riley', 'Skylar', 'Trinity', 'Willow'
        ]
      },
      celtic: [
        'Ailish', 'Bridget', 'Cara', 'Deirdre', 'Erin',
        'Fiona', 'Gwen', 'Keela', 'Maeve', 'Niamh',
        'Orla', 'Quinn', 'Riona', 'Siobhan', 'Tara',
        'Una', 'Vida', 'Wynne', 'Yseult', 'Catriona'
      ],
      french: [
        'Adeline', 'Bernadette', 'Celeste', 'Delphine', 'Elise',
        'Fleur', 'Genevieve', 'Helene', 'Isabelle', 'Josephine',
        'Louise', 'Madeleine', 'Nicolette', 'Odette', 'Paulette',
        'Rosalie', 'Simone', 'Therese', 'Vivienne', 'Yvette'
      ],
      latin: [
        'Aurora', 'Beatrix', 'Clara', 'Diana', 'Elena',
        'Flora', 'Gloria', 'Julia', 'Luna', 'Marina',
        'Nova', 'Olivia', 'Regina', 'Silvia', 'Terra',
        'Ursula', 'Valeria', 'Victoria', 'Viola', 'Celeste'
      ],
      greek: [
        'Alexandra', 'Cassandra', 'Daphne', 'Eurydice', 'Helena',
        'Iris', 'Kalliope', 'Lyra', 'Melissa', 'Phoebe',
        'Penelope', 'Rhea', 'Sophia', 'Thalia', 'Xenia',
        'Zoe', 'Ariadne', 'Chloe', 'Dorothea', 'Echo'
      ]
    },
    meanings: {
      nature: [
        'Daisy', 'Flora', 'Hazel', 'Iris', 'Ivy',
        'Lily', 'Rose', 'Violet', 'Willow', 'Summer',
        'River', 'Dawn', 'Aurora', 'Luna', 'Stella'
      ],
      strength: [
        'Audrey', 'Valerie', 'Andrea', 'Gabrielle', 'Brianna',
        'Matilda', 'Millicent', 'Valerie', 'Victoria', 'Alexandria'
      ],
      beauty: [
        'Bella', 'Calista', 'Helena', 'Linda', 'Jamal',
        'Bonita', 'Jolie', 'Nadia', 'Venus', 'Zara'
      ],
      wisdom: [
        'Minerva', 'Sophia', 'Sage', 'Athena', 'Prudence',
        'Cordelia', 'Meredith', 'Carina', 'Claire', 'Alanna'
      ],
      grace: [
        'Grace', 'Hannah', 'Anna', 'Charis', 'Karen',
        'Nancy', 'Jane', 'Joan', 'Anita', 'Nina'
      ]
    },
    popularity: {
      classic: [
        'Elizabeth', 'Catherine', 'Margaret', 'Anne', 'Mary',
        'Sarah', 'Jane', 'Emily', 'Alice', 'Helen',
        'Louise', 'Grace', 'Rose', 'Victoria', 'Charlotte'
      ],
      trending: [
        'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava',
        'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper',
        'Luna', 'Camila', 'Gianna', 'Elena', 'Layla'
      ],
      unique: [
        'Aria', 'Aurora', 'Echo', 'Fable', 'Gaia',
        'Haven', 'Indigo', 'Juniper', 'Lyra', 'Nova',
        'Sage', 'Winter', 'Vesper', 'River', 'Phoenix'
      ]
    },
    middleNames: {
      traditional: [
        'Anne', 'Elizabeth', 'Grace', 'Jane', 'Louise',
        'Marie', 'Rose', 'Catherine', 'Frances', 'Margaret'
      ],
      modern: [
        'Blue', 'Gray', 'Quinn', 'Rain', 'Sage',
        'Snow', 'Star', 'True', 'Winter', 'Wren'
      ],
      floral: [
        'Rose', 'Lily', 'Violet', 'Iris', 'Flora',
        'Daisy', 'Jasmine', 'Poppy', 'Marigold', 'Dahlia'
      ]
    },
    styles: {
      feminine: [
        'Isabella', 'Sophia', 'Arabella', 'Rosalie', 'Valentina',
        'Evangeline', 'Seraphina', 'Juliette', 'Genevieve', 'Angelina'
      ],
      unisex: [
        'Avery', 'Charlie', 'Riley', 'Jordan', 'Quinn',
        'Parker', 'Taylor', 'Morgan', 'Blake', 'Alex'
      ],
      vintage: [
        'Adelaide', 'Beatrice', 'Clara', 'Dorothy', 'Edith',
        'Florence', 'Hazel', 'Mabel', 'Pearl', 'Ruth'
      ],
      modern: [
        'Brooklyn', 'Harper', 'Kennedy', 'Madison', 'Peyton',
        'Reagan', 'Skylar', 'Taylor', 'Winter', 'Zoe'
      ]
    }
  };
  
  export type NameOrigin = 'any' | 'english' | 'celtic' | 'french' | 'latin' | 'greek';
  export type NameMeaning = 'any' | 'nature' | 'strength' | 'beauty' | 'wisdom' | 'grace';
  export type Popularity = 'any' | 'classic' | 'trending' | 'unique';
  export type NameStyle = 'any' | 'feminine' | 'unisex' | 'vintage' | 'modern';
  export type MiddleNameStyle = 'traditional' | 'modern' | 'floral';
  
  export interface GeneratedGirlName {
    firstName: string;
    middleName?: string;
    origin: string;
    meaning?: string;
    popularity?: string;
    style?: string;
  }