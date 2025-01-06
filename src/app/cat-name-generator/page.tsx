'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const sampleData = {
  cuteNames: [
    'Milo', 'Luna', 'Bella', 'Oliver', 'Leo', 'Loki', 'Lily', 'Lucy',
    'Kitty', 'Nala', 'Simba', 'Felix', 'Oscar', 'Max', 'Coco', 'Ruby'
  ],
  foodNames: [
    'Biscuit', 'Cookie', 'Pepper', 'Pickle', 'Sushi', 'Mochi', 'Wasabi',
    'Pretzel', 'Taco', 'Nacho', 'Noodle', 'Dumpling', 'Tofu', 'Bean'
  ],
  colorNames: {
    black: ['Shadow', 'Midnight', 'Raven', 'Coal', 'Onyx', 'Ebony'],
    white: ['Pearl', 'Snow', 'Cloud', 'Angel', 'Ghost', 'Frost'],
    orange: ['Ginger', 'Marmalade', 'Rusty', 'Phoenix', 'Amber', 'Honey'],
    grey: ['Ash', 'Smokey', 'Storm', 'Misty', 'Dusty', 'Silver'],
    multicolor: ['Oreo', 'Patches', 'Tiger', 'Marble', 'Speckles', 'Spots']
  },
  personalityTraits: {
    playful: ['Ziggy', 'Bouncer', 'Rocket', 'Scout', 'Pixie', 'Jazzy'],
    lazy: ['Sleepy', 'Dozer', 'Snooze', 'Drowsy', 'Yawny', 'Lazy'],
    sassy: ['Diva', 'Princess', 'Sassy', 'Queen', 'Boss', 'Duchess'],
    gentle: ['Angel', 'Sweetie', 'Grace', 'Gentle', 'Sugar', 'Cotton']
  },
  famousCats: [
    'Garfield', 'Tom', 'Felix', 'Salem', 'Sylvester', 'Cheshire',
    'Figaro', 'Marie', 'Snowbell', 'Crookshanks'
  ],
  mythologicalNames: [
    'Zeus', 'Artemis', 'Luna', 'Atlas', 'Apollo', 'Athena',
    'Loki', 'Odin', 'Freya', 'Isis', 'Osiris', 'Ra'
  ]
};

export default function CatNameGenerator() {
  const [formData, setFormData] = useState({
    color: '',
    personality: '',
    gender: '',
    theme: 'general',
    nameStyle: ''
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateCatNames() {
    const names = new Set<string>();
    const { color, personality, gender, theme, nameStyle } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Always add some base names
    for (let i = 0; i < 3; i++) {
        names.add(getRandom(sampleData.cuteNames));
    }

    // Add color-based names
    if (color) {
        const colorNames = sampleData.colorNames[color as keyof typeof sampleData.colorNames];
        if (colorNames) {
            colorNames.forEach(name => names.add(name));
        }
    }

    // Add personality-based names
    if (personality) {
        const personalityNames = sampleData.personalityTraits[personality as keyof typeof sampleData.personalityTraits];
        if (personalityNames) {
            personalityNames.forEach(name => names.add(name));
        }
    }

    // Add theme-based names
    switch (theme) {
        case 'food':
            names.add(getRandom(sampleData.foodNames));
            names.add(getRandom(sampleData.foodNames));
            break;
        case 'mythological':
            names.add(getRandom(sampleData.mythologicalNames));
            names.add(getRandom(sampleData.mythologicalNames));
            break;
        case 'famous':
            names.add(getRandom(sampleData.famousCats));
            names.add(getRandom(sampleData.famousCats));
            break;
    }

    // Add gender-specific names
    if (gender === 'female') {
        names.add(`Lady ${getRandom(sampleData.cuteNames)}`);
        names.add(`Princess ${getRandom(sampleData.cuteNames)}`);
    } else if (gender === 'male') {
        names.add(`Sir ${getRandom(sampleData.cuteNames)}`);
        names.add(`King ${getRandom(sampleData.cuteNames)}`);
    }

    // Add style variations
    if (nameStyle) {
        switch (nameStyle) {
            case 'elegant':
                names.add(`Lord ${getRandom(sampleData.cuteNames)}`);
                names.add(`Duchess ${getRandom(sampleData.cuteNames)}`);
                break;
            case 'cute':
                names.add(`Little ${getRandom(sampleData.cuteNames)}`);
                names.add(`Sweet ${getRandom(sampleData.cuteNames)}`);
                break;
            case 'funny':
                names.add(`Professor ${getRandom(sampleData.cuteNames)}`);
                names.add(`Captain ${getRandom(sampleData.cuteNames)}`);
                break;
        }
    }

    // Ensure we have at least 5 names
    while (names.size < 5) {
        names.add(getRandom(sampleData.cuteNames));
    }

    return Array.from(names).slice(0, 10); // Return up to 10 names
}
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const generatedResults = generateCatNames();
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
    color: Object.keys(sampleData.colorNames)[Math.floor(Math.random() * Object.keys(sampleData.colorNames).length)],
    personality: Object.keys(sampleData.personalityTraits)[Math.floor(Math.random() * Object.keys(sampleData.personalityTraits).length)],
    gender: Math.random() > 0.5 ? 'male' : 'female',
    theme: ['general', 'food', 'mythological', 'famous'][Math.floor(Math.random() * 4)],
    nameStyle: ['elegant', 'cute', 'funny'][Math.floor(Math.random() * 3)]
  });
};

return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
        <Wand2 className="h-8 w-8 text-blue-600" />
        Cat Name Generator
      </h1>

      <div className="space-y-3 text-center">
        <p>Find the purr-fect name for your feline friend! Whether your cat is playful, 
          elegant, or mischievous, we'll help you discover a name that matches their 
          unique personality. From cute and classic to clever and creative, generate 
          the ideal name for your new furry family member.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cat's Color
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
            >
              <option value="">Select color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="orange">Orange/Ginger</option>
              <option value="grey">Grey</option>
              <option value="multicolor">Multi-colored</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personality Type
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.personality}
              onChange={(e) => setFormData({...formData, personality: e.target.value})}
            >
              <option value="">Select personality</option>
              <option value="playful">Playful/Energetic</option>
              <option value="lazy">Lazy/Relaxed</option>
              <option value="sassy">Sassy/Independent</option>
              <option value="gentle">Gentle/Sweet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name Theme
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.theme}
              onChange={(e) => setFormData({...formData, theme: e.target.value})}
            >
              <option value="general">General/Classic</option>
              <option value="food">Food Names</option>
              <option value="mythological">Mythological</option>
              <option value="famous">Famous Cats</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name Style
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.nameStyle}
              onChange={(e) => setFormData({...formData, nameStyle: e.target.value})}
            >
              <option value="">Select style</option>
              <option value="elegant">Elegant/Regal</option>
              <option value="cute">Cute/Sweet</option>
              <option value="funny">Funny/Quirky</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Cat Names
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
            Your Cat Names:
          </h2>
          <div className="grid gap-2">
            {results.map((result, index) => (
              <div 
                key={index}
                className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                }}
              >
                <span className="font-medium">{result}</span>
                <button
                  onClick={() => copyToClipboard(result, index)}
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