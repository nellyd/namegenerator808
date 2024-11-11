'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Baby } from 'lucide-react';

// First, let's define our data structure here for now
const boyNameData = {
  origins: {
    english: {
      traditional: [
        'Alexander', 'Benjamin', 'Charles', 'Daniel', 'Edward',
        'Frederick', 'George', 'Henry', 'Isaac', 'James'
      ],
      modern: [
        'Aiden', 'Blake', 'Caleb', 'Dylan', 'Ethan',
        'Finn', 'Gavin', 'Hunter', 'Ian', 'Jackson'
      ]
    },
    celtic: [
      'Aidan', 'Brendan', 'Callum', 'Declan', 'Eoin',
      'Finn', 'Gavin', 'Hugh', 'Ian', 'Keith'
    ],
    nordic: [
      'Axel', 'Bjorn', 'Erik', 'Finn', 'Gustav',
      'Harald', 'Ivar', 'Klaus', 'Lars', 'Magnus'
    ],
    latin: [
      'Adrian', 'Caesar', 'Felix', 'Julius', 'Leo',
      'Marcus', 'Maximus', 'Octavius', 'Paul', 'Roman'
    ],
    greek: [
      'Alexander', 'Andreas', 'Demetrius', 'Elias', 'Gregory',
      'Homer', 'Jason', 'Leonidas', 'Nicholas', 'Orion'
    ],
    hebrew: [
      'Aaron', 'Benjamin', 'Daniel', 'David', 'Elijah',
      'Gabriel', 'Isaac', 'Jacob', 'Joshua', 'Matthew'
    ]
  },
  meanings: {
    strength: [
      'Alexander', 'Andrew', 'Ethan', 'Gabriel', 'Kenzo',
      'Oscar', 'Patrick', 'Richard', 'Valentine', 'William'
    ],
    wisdom: [
      'Alden', 'Calvin', 'Conrad', 'Hugo', 'Kenneth',
      'Raymond', 'Solomon', 'Sophia', 'Theodore', 'Xavier'
    ],
    courage: [
      'Wyatt', 'Leo', 'Aiden', 'Valor', 'Hardy',
      'Bernard', 'Audrey', 'Barrett', 'Leonard', 'Andrew'
    ],
    leadership: [
      'Donald', 'Henry', 'Marcus', 'Reagan', 'Richard',
      'Roy', 'Ryan', 'Winston', 'Derek', 'Duke'
    ],
    peace: [
      'Frederick', 'Geoffrey', 'Humphrey', 'Oliver', 'Solomon',
      'William', 'Noah', 'Axel', 'Frederick', 'Solomon'
    ]
  },
  popularity: {
    classic: [
      'James', 'John', 'William', 'Henry', 'George',
      'Charles', 'Joseph', 'Edward', 'Frank', 'Thomas'
    ],
    trending: [
      'Liam', 'Noah', 'Oliver', 'Elijah', 'James',
      'William', 'Henry', 'Lucas', 'Theodore', 'Jack'
    ],
    unique: [
      'Atlas', 'Orion', 'Phoenix', 'Caspian', 'Jasper',
      'Felix', 'August', 'Silas', 'Magnus', 'Atticus'
    ]
  },
  middleNames: {
    traditional: [
      'Alexander', 'Benjamin', 'Charles', 'Daniel', 'Edward',
      'Francis', 'George', 'Henry', 'Isaac', 'James'
    ],
    modern: [
      'Ace', 'Blake', 'Chase', 'Drake', 'Finn',
      'Gray', 'Hayes', 'Jett', 'Kane', 'Lane'
    ],
    nature: [
      'River', 'Sky', 'Stone', 'Wolf', 'Bear',
      'Fox', 'Hawk', 'Lake', 'Rain', 'Storm'
    ]
  }
};

interface GeneratedBoyName {
  firstName: string;
  middleName?: string;
  origin: string;
  meaning?: string;
  popularity?: string;
}

interface FormData {
  origin: string;
  meaning: string;
  popularity: string;
  includeMiddleName: boolean;
  middleNameStyle: string;
  count: number;
}

export default function BoyNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    origin: 'any',
    meaning: 'any',
    popularity: 'any',
    includeMiddleName: false,
    middleNameStyle: 'traditional',
    count: 5
  });

  const [results, setResults] = useState<GeneratedBoyName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Generate a name based on criteria
  const generateName = (): GeneratedBoyName => {
    const { origin, meaning, popularity, includeMiddleName, middleNameStyle } = formData;
    let firstName: string;
    const selectedOrigin = origin === 'any' ? getRandom(['english', 'celtic', 'nordic', 'latin', 'greek', 'hebrew']) : origin;

    if (popularity !== 'any' && boyNameData.popularity[popularity]) {
      firstName = getRandom(boyNameData.popularity[popularity]);
    } else if (meaning !== 'any' && boyNameData.meanings[meaning]) {
      firstName = getRandom(boyNameData.meanings[meaning]);
    } else {
      if (selectedOrigin === 'english') {
        const subset = getRandom(['traditional', 'modern']) as 'traditional' | 'modern';
        firstName = getRandom(boyNameData.origins.english[subset]);
      } else {
        firstName = getRandom(boyNameData.origins[selectedOrigin]);
      }
    }

    const generatedName: GeneratedBoyName = {
      firstName,
      origin: selectedOrigin,
    };

    if (meaning !== 'any') {
      generatedName.meaning = meaning;
    }

    if (popularity !== 'any') {
      generatedName.popularity = popularity;
    }

    if (includeMiddleName) {
      generatedName.middleName = getRandom(boyNameData.middleNames[middleNameStyle]);
    }

    return generatedName;
  };

  const generateNames = (): GeneratedBoyName[] => {
    const names: GeneratedBoyName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (name: GeneratedBoyName, index: number) => {
    try {
      const text = name.middleName 
        ? `${name.firstName} ${name.middleName}`
        : name.firstName;
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Baby className="h-8 w-8 text-blue-600" />
          Boy Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate unique and meaningful boy names from various cultures and origins.
            Find the perfect name with optional meanings and middle names.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                >
                  <option value="any">Any Origin</option>
                  <option value="english">English</option>
                  <option value="celtic">Celtic</option>
                  <option value="nordic">Nordic</option>
                  <option value="latin">Latin</option>
                  <option value="greek">Greek</option>
                  <option value="hebrew">Hebrew</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meaning
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.meaning}
                  onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                >
                  <option value="any">Any Meaning</option>
                  <option value="strength">Strength</option>
                  <option value="wisdom">Wisdom</option>
                  <option value="courage">Courage</option>
                  <option value="leadership">Leadership</option>
                  <option value="peace">Peace</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Popularity
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.popularity}
                  onChange={(e) => setFormData({...formData, popularity: e.target.value})}
                >
                  <option value="any">Any Popularity</option>
                  <option value="classic">Classic</option>
                  <option value="trending">Trending</option>
                  <option value="unique">Unique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.middleNameStyle}
                  onChange={(e) => setFormData({...formData, middleNameStyle: e.target.value})}
                  disabled={!formData.includeMiddleName}
                >
                  <option value="traditional">Traditional</option>
                  <option value="modern">Modern</option>
                  <option value="nature">Nature-Inspired</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeMiddleName"
                  checked={formData.includeMiddleName}
                  onChange={(e) => setFormData({...formData, includeMiddleName: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeMiddleName" className="text-sm text-gray-700">
                  Include Middle Name
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Names
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 5})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Boy Names
            </h2>
            <div className="grid gap-4">
              {results.map((name, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {name.firstName}
                        {name.middleName && (
                          <span className="text-gray-600">
                            {" "}{name.middleName}
                          </span>
                        )}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Origin: {name.origin}
                        </span>
                        {name.meaning && (
                          <span className="inline-block mr-3">
                            Meaning: {name.meaning}
                          </span>
                        )}
                        {name.popularity && (
                          <span className="inline-block">
                            Popularity: {name.popularity}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <CheckCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}