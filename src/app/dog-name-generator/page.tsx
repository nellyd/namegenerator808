'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  classicNames: {
    male: [
      'Max', 'Charlie', 'Buddy', 'Rocky', 'Bear', 'Duke', 'Tucker', 'Jack',
      'Sam', 'Cooper', 'Bailey', 'Murphy', 'Scout', 'Toby', 'Winston', 'Finn'
    ],
    female: [
      'Luna', 'Bella', 'Lucy', 'Daisy', 'Sadie', 'Molly', 'Bailey', 'Maggie',
      'Sophie', 'Chloe', 'Lily', 'Ruby', 'Stella', 'Willow', 'Penny', 'Coco'
    ]
  },
  sizeBasedNames: {
    small: [
      'Tiny', 'Pip', 'Peanut', 'Mini', 'Button', 'Bean', 'Pixie', 'Dot',
      'Cookie', 'Nugget', 'Runt', 'Bitsy', 'Midi', 'Zipper', 'Pocket'
    ],
    large: [
      'Tank', 'Titan', 'Atlas', 'Goliath', 'Bear', 'Moose', 'Zeus', 'Thor',
      'Kong', 'Brutus', 'Chief', 'Boss', 'Duke', 'King', 'Magnus'
    ]
  },
  colorNames: {
    black: ['Shadow', 'Midnight', 'Coal', 'Onyx', 'Ebony', 'Jet', 'Raven'],
    white: ['Snow', 'Pearl', 'Ghost', 'Cloud', 'Angel', 'Frost', 'Sugar'],
    brown: ['Cocoa', 'Mocha', 'Rusty', 'Cinnamon', 'Cedar', 'Amber', 'Hazel'],
    mixed: ['Patch', 'Spot', 'Speckles', 'Marble', 'Tiger', 'Ziggy', 'Domino']
  },
  personalityNames: {
    playful: ['Ziggy', 'Scout', 'Spark', 'Dash', 'Bounce', 'Happy', 'Joy', 'Skip'],
    calm: ['Zen', 'Peace', 'Mellow', 'Sage', 'Gentle', 'Harmony', 'Serenity'],
    smart: ['Einstein', 'Newton', 'Darwin', 'Tesla', 'Edison', 'Sherlock', 'Watson'],
    protective: ['Guard', 'Shield', 'Sentry', 'Ranger', 'Valor', 'Hero', 'Knight']
  },
  foodNames: [
    'Biscuit', 'Cookie', 'Pepper', 'Pickle', 'Waffle', 'Taco', 'Nacho', 'Noodle',
    'Mochi', 'Sushi', 'Pretzel', 'Bagel', 'Churro', 'Dumpling', 'Nugget'
  ],
  popularCultureNames: [
    'Loki', 'Thor', 'Groot', 'Vader', 'Yoda', 'Khaleesi', 'Sherlock', 'Watson',
    'Mario', 'Link', 'Zelda', 'Pikachu', 'Batman', 'Robin', 'Stark'
  ],
  suffixes: [
    'boy', 'girl', 'pup', 'dog', 'buddy', 'pal', 'face', 'pants',
    'bean', 'beast', 'master', 'chief', 'baby', 'love', 'heart'
  ]
};

export default function DogNameGenerator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    size: '',
    color: '',
    personality: '',
    theme: 'classic',
    usePrefix: false
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateDogName() {
    const names = new Set<string>();
    const { gender, size, color, personality, theme, usePrefix } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Add classic names based on gender
    function addClassicNames() {
      const classicList = sampleData.classicNames[gender as keyof typeof sampleData.classicNames];
      for (let i = 0; i < 3; i++) {
        names.add(getRandom(classicList));
      }
    }

    // Add size-based names
    if (size) {
      const sizeList = sampleData.sizeBasedNames[size as keyof typeof sampleData.sizeBasedNames];
      if (sizeList) {
        for (let i = 0; i < 2; i++) {
          names.add(getRandom(sizeList));
        }
      }
    }

    // Add color-based names
    if (color) {
      const colorList = sampleData.colorNames[color as keyof typeof sampleData.colorNames];
      if (colorList) {
        names.add(getRandom(colorList));
        // Combine with classic name
        const classicName = getRandom(sampleData.classicNames[gender as keyof typeof sampleData.classicNames]);
        names.add(`${getRandom(colorList)} ${classicName}`);
      }
    }

    // Add personality-based names
    if (personality) {
      const personalityList = sampleData.personalityNames[personality as keyof typeof sampleData.personalityNames];
      if (personalityList) {
        names.add(getRandom(personalityList));
        // Create combinations
        names.add(`${getRandom(personalityList)} ${getRandom(sampleData.suffixes)}`);
      }
    }

    // Add theme-based names
    switch (theme) {
      case 'food':
        for (let i = 0; i < 2; i++) {
          names.add(getRandom(sampleData.foodNames));
        }
        break;
      case 'popculture':
        for (let i = 0; i < 2; i++) {
          names.add(getRandom(sampleData.popularCultureNames));
        }
        break;
      default:
        addClassicNames();
    }

    // Add some fun combinations
    const classicName = getRandom(sampleData.classicNames[gender as keyof typeof sampleData.classicNames]);
    if (usePrefix) {
      names.add(`Sir ${classicName}`);
      names.add(`Lady ${classicName}`);
      names.add(`Mr. ${classicName}`);
      names.add(`Miss ${classicName}`);
    }

    // Create unique combinations
    names.add(`${getRandom(sampleData.classicNames[gender as keyof typeof sampleData.classicNames])} ${getRandom(sampleData.suffixes)}`);

    return Array.from(names).slice(0, 10);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateDogName();
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
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: ['small', 'large'][Math.floor(Math.random() * 2)],
      color: ['black', 'white', 'brown', 'mixed'][Math.floor(Math.random() * 4)],
      personality: ['playful', 'calm', 'smart', 'protective'][Math.floor(Math.random() * 4)],
      theme: ['classic', 'food', 'popculture'][Math.floor(Math.random() * 3)],
      usePrefix: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Dog Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Find the perfect name for your furry friend! Whether you're looking for something 
            classic, cute, or unique, our generator will help you discover the ideal name 
            that matches your dog's personality and characteristics.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
              >
                <option value="">Any Size</option>
                <option value="small">Small Dog</option>
                <option value="large">Large Dog</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
              >
                <option value="">Any Color</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="brown">Brown</option>
                <option value="mixed">Mixed/Spotted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personality
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.personality}
                onChange={(e) => setFormData({...formData, personality: e.target.value})}
              >
                <option value="">Any Personality</option>
                <option value="playful">Playful/Energetic</option>
                <option value="calm">Calm/Gentle</option>
                <option value="smart">Smart/Clever</option>
                <option value="protective">Protective/Loyal</option>
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
                <option value="classic">Classic Names</option>
                <option value="food">Food Names</option>
                <option value="popculture">Pop Culture Names</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="usePrefix"
                checked={formData.usePrefix}
                onChange={(e) => setFormData({...formData, usePrefix: e.target.checked})}
                className="rounded text-blue-600 mr-2"
              />
              <label htmlFor="usePrefix" className="text-sm text-gray-700">
                Include Titles (Sir, Lady, Mr., Miss)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Names
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
              Your Dog Names:
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