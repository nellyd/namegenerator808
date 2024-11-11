'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  prefixes: [
    'Lord', 'Doctor', 'Professor', 'Master', 'Baron', 'Emperor', 'Dark',
    'Shadow', 'Night', 'Blood', 'Cyber', 'Evil', 'Queen', 'Lady', 'Mistress'
  ],
  darkAdjectives: [
    'Sinister', 'Dark', 'Evil', 'Wicked', 'Malevolent', 'Cruel', 'Vicious',
    'Twisted', 'Corrupt', 'Nefarious', 'Malicious', 'Dreadful', 'Dire', 'Grim'
  ],
  powerAdjectives: [
    'Supreme', 'Ultimate', 'Infinite', 'Eternal', 'Mighty', 'Unstoppable',
    'Invincible', 'Almighty', 'Omnipotent', 'Devastating', 'Overwhelming'
  ],
  nouns: [
    'Doom', 'Death', 'Chaos', 'Shadow', 'Terror', 'Destruction', 'Pain',
    'Darkness', 'Night', 'Fear', 'Horror', 'Void', 'Abyss', 'Nightmare'
  ],
  villainyTypes: {
    scifi: [
      'Cyborg', 'Android', 'Mutant', 'Clone', 'Alien', 'Robot', 'Techno',
      'Quantum', 'Cyber', 'Mech', 'Vector', 'Neural', 'Cosmic', 'Nano'
    ],
    fantasy: [
      'Warlock', 'Necromancer', 'Sorcerer', 'Dragon', 'Demon', 'Wraith',
      'Lich', 'Witch', 'Mage', 'Wizard', 'Specter', 'Phantom', 'Beast'
    ],
    criminal: [
      'Mastermind', 'Kingpin', 'Boss', 'Don', 'Overlord', 'Crime Lord',
      'Assassin', 'Mercenary', 'Butcher', 'Executioner', 'Enforcer'
    ],
    supernatural: [
      'Vampire', 'Demon', 'Ghost', 'Wraith', 'Spirit', 'Undead', 'Zombie',
      'Monster', 'Fiend', 'Devil', 'Beast', 'Ghoul', 'Specter'
    ]
  },
  endings: [
    'the Destroyer', 'the Conqueror', 'the Terrible', 'the Ruthless',
    'the Merciless', 'the Tyrant', 'the Cruel', 'the Wicked', 'the Dark',
    'the Dreadful', 'the Feared', 'the Mighty', 'the Eternal', 'the Supreme'
  ]
};

export default function VillainNameGenerator() {
  const [formData, setFormData] = useState({
    villainType: '',
    powerLevel: '',
    style: 'modern',
    genre: '',
    useTitle: true
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateVillainName() {
    const names = new Set<string>();
    const { villainType, powerLevel, style, genre, useTitle } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to capitalize
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Generate villain names based on type
    function generateByType() {
      if (villainType) {
        const typeSpecificWords = sampleData.villainyTypes[villainType as keyof typeof sampleData.villainyTypes];
        if (typeSpecificWords) {
          // Basic type-specific name
          names.add(`${getRandom(typeSpecificWords)} ${getRandom(sampleData.endings)}`);

          // Title with type
          if (useTitle) {
            names.add(`${getRandom(sampleData.prefixes)} ${getRandom(typeSpecificWords)}`);
          }

          // Combined with adjective
          names.add(`The ${getRandom(sampleData.darkAdjectives)} ${getRandom(typeSpecificWords)}`);
        }
      }
    }

    // Generate power-level based names
    function generateByPowerLevel() {
      const powerWords = powerLevel === 'ultimate' ? 
        sampleData.powerAdjectives.slice(-5) : 
        sampleData.powerAdjectives.slice(0, 5);

      names.add(`${getRandom(powerWords)} ${getRandom(sampleData.nouns)}`);
      names.add(`The ${getRandom(powerWords)} ${getRandom(sampleData.endings)}`);
    }

    // Generate style-based names
    function generateByStyle() {
      if (style === 'modern') {
        names.add(`${getRandom(sampleData.prefixes)}-${getRandom(sampleData.nouns)}`);
        names.add(`${capitalize(getRandom(sampleData.darkAdjectives))}X`);
      } else {
        names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.darkAdjectives)}`);
        names.add(`The ${getRandom(sampleData.darkAdjectives)} One`);
      }
    }

    // Generate genre-specific names
    function generateByGenre() {
      switch (genre) {
        case 'scifi':
          names.add(`${getRandom(sampleData.villainyTypes.scifi)}-${getRandom(sampleData.nouns)}`);
          names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.villainyTypes.scifi)}`);
          break;
        case 'fantasy':
          names.add(`${getRandom(sampleData.darkAdjectives)} ${getRandom(sampleData.villainyTypes.fantasy)}`);
          names.add(`${getRandom(sampleData.prefixes)} of ${getRandom(sampleData.nouns)}`);
          break;
        case 'criminal':
          names.add(`The ${getRandom(sampleData.villainyTypes.criminal)} of ${getRandom(sampleData.nouns)}`);
          break;
        case 'supernatural':
          names.add(`${getRandom(sampleData.villainyTypes.supernatural)} ${getRandom(sampleData.endings)}`);
          break;
      }
    }

    // Generate all types
    generateByType();
    generateByPowerLevel();
    generateByStyle();
    generateByGenre();

    // Add some random combinations
    for (let i = 0; i < 3; i++) {
      names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.darkAdjectives)} ${getRandom(sampleData.nouns)}`);
      names.add(`The ${getRandom(sampleData.darkAdjectives)} ${getRandom(sampleData.nouns)}`);
    }

    return Array.from(names).slice(0, 10);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateVillainName();
    setResults(generatedResults);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillRandomData = () => {
    setFormData({
      villainType: ['scifi', 'fantasy', 'criminal', 'supernatural'][Math.floor(Math.random() * 4)],
      powerLevel: ['minion', 'boss', 'ultimate'][Math.floor(Math.random() * 3)],
      style: Math.random() > 0.5 ? 'modern' : 'classic',
      genre: ['scifi', 'fantasy', 'criminal', 'supernatural'][Math.floor(Math.random() * 4)],
      useTitle: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Villain Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create the perfect name for your antagonist! Whether you're crafting a 
            sci-fi supervillain, a fantasy dark lord, or a criminal mastermind, 
            our generator will help you find the perfect sinister name. Choose your 
            villain's type and style to generate names that strike fear into the 
            hearts of heroes everywhere.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Villain Type
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.villainType}
                onChange={(e) => setFormData({...formData, villainType: e.target.value})}
              >
                <option value="">Select type</option>
                <option value="scifi">Sci-Fi Villain</option>
                <option value="fantasy">Fantasy Villain</option>
                <option value="criminal">Criminal Mastermind</option>
                <option value="supernatural">Supernatural Being</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Power Level
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.powerLevel}
                onChange={(e) => setFormData({...formData, powerLevel: e.target.value})}
              >
                <option value="minion">Minor Villain</option>
                <option value="boss">Major Villain</option>
                <option value="ultimate">Ultimate Big Bad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naming Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
              >
                <option value="scifi">Science Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="criminal">Crime</option>
                <option value="supernatural">Supernatural</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="useTitle"
                checked={formData.useTitle}
                onChange={(e) => setFormData({...formData, useTitle: e.target.checked})}
                className="rounded text-blue-600 mr-2"
              />
              <label htmlFor="useTitle" className="text-sm text-gray-700">
                Include Titles (Lord, Doctor, Master, etc.)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Villain Name
              </button>
              
              <button
                type="button"
                onClick={fillRandomData}
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Random
              </button>
            </div>
          </form>
        </div>

        {results.length > 0 && (
          <div 
            className="bg-white rounded-lg shadow-lg p-6"
            style={{
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Your Villain Names:
            </h2>
            <div className="grid gap-2">
              {results.map((name, index) => (
                <div 
                  key={index}
                  className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <span className="font-medium">{name}</span>
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
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}