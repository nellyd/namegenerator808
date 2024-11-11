// data/middleNameData.ts

export const middleNameData = {
    traditional: {
      male: [
        'Alexander', 'Benjamin', 'Charles', 'Daniel', 'Edward',
        'Francis', 'George', 'Henry', 'Isaac', 'James',
        'John', 'Lee', 'Michael', 'Paul', 'Robert',
        'Thomas', 'William', 'David', 'Joseph', 'Richard'
      ],
      female: [
        'Anne', 'Elizabeth', 'Grace', 'Jane', 'Louise',
        'Marie', 'Rose', 'Catherine', 'Frances', 'Margaret',
        'Mary', 'Victoria', 'Claire', 'Faith', 'Hope',
        'Joy', 'May', 'Pearl', 'Ruth', 'Alice'
      ]
    },
    modern: {
      male: [
        'Ace', 'Blaze', 'Chase', 'Drake', 'Finn',
        'Gray', 'Hayes', 'Jett', 'Kane', 'Lane',
        'Nash', 'Quinn', 'Reid', 'Stone', 'Wolf',
        'Phoenix', 'River', 'Sky', 'Zane', 'Atlas'
      ],
      female: [
        'Aria', 'Blue', 'Dawn', 'Eden', 'Faye',
        'Haven', 'Iris', 'Jade', 'Kate', 'Luna',
        'Maven', 'Nova', 'Olive', 'Paige', 'Quinn',
        'Rain', 'Sage', 'True', 'Vale', 'Winter'
      ]
    },
    nature: {
      male: [
        'Ash', 'Bear', 'Brook', 'Cliff', 'Dale',
        'Forest', 'Glen', 'Hawk', 'Lake', 'Mountain',
        'Oak', 'Pine', 'Ridge', 'River', 'Sky',
        'Stone', 'Storm', 'Vale', 'Wolf', 'Wood'
      ],
      female: [
        'Autumn', 'Dawn', 'Fern', 'Flora', 'Hazel',
        'Iris', 'Ivy', 'Lily', 'Maple', 'Meadow',
        'River', 'Rose', 'Ruby', 'Sky', 'Star',
        'Summer', 'Violet', 'Willow', 'Winter', 'Rain'
      ]
    },
    family: {
      grandfather: [
        'James', 'John', 'Robert', 'William', 'Richard',
        'Charles', 'Joseph', 'Thomas', 'Harold', 'Walter',
        'Arthur', 'Albert', 'Donald', 'Eugene', 'Francis',
        'George', 'Henry', 'Kenneth', 'Louis', 'Ralph', 'Cornelius'
      ],
      grandmother: [
        'Alice', 'Betty', 'Carol', 'Dorothy', 'Elizabeth',
        'Florence', 'Helen', 'Irene', 'Jean', 'Katherine',
        'Louise', 'Margaret', 'Mary', 'Nancy', 'Patricia',
        'Ruth', 'Sarah', 'Shirley', 'Virginia', 'Barbara'
      ]
    },
    virtues: [
      'Grace', 'Faith', 'Hope', 'Joy', 'Love',
      'Peace', 'Truth', 'Honor', 'Justice', 'Liberty',
      'Mercy', 'Patience', 'Prudence', 'Valor', 'Wisdom',
      'Courage', 'Harmony', 'Serenity', 'Unity', 'Victory'
    ],
    cultural: {
      irish: [
        'Aidan', 'Brendan', 'Connor', 'Declan', 'Finn',
        'Liam', 'Owen', 'Patrick', 'Quinn', 'Ryan',
        'Sean', 'Bridget', 'Eileen', 'Kathleen', 'Maeve',
        'Siobhan', 'Rory', 'Kelly', 'Shannon', 'Kerry'
      ],
      italian: [
        'Angelo', 'Bruno', 'Carlo', 'Dante', 'Enzo',
        'Franco', 'Giovanni', 'Lorenzo', 'Marco', 'Paolo',
        'Rosa', 'Maria', 'Lucia', 'Bella', 'Chiara',
        'Diana', 'Elena', 'Francesca', 'Stella', 'Valentina'
      ],
      french: [
        'Antoine', 'Bernard', 'Claude', 'Denis', 'Étienne',
        'François', 'Henri', 'Jean', 'Louis', 'Pierre',
        'Marie', 'Claire', 'Louise', 'Simone', 'Thérèse',
        'Yvette', 'Céline', 'Dominique', 'Michel', 'René'
      ]
    },
    patterns: {
      firstNameInspired: true,   // Use first name to influence middle name choice
      familyInspired: true,      // Use family names
      meaningBased: true,        // Use names with specific meanings
      soundBased: true          // Use names that sound good with first name
    }
  };
  
  export type NameStyle = 'traditional' | 'modern' | 'nature' | 'family' | 'virtue' | 'cultural';
  export type Gender = 'male' | 'female';
  export type Cultural = 'any' | 'irish' | 'italian' | 'french';
  export type Pattern = 'firstNameInspired' | 'familyInspired' | 'meaningBased' | 'soundBased';
  
  export interface GeneratedMiddleName {
    name: string;
    style: string;
    gender: string;
    meaning?: string;
  }