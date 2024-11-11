'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  types: {
    manor: ['Manor', 'House', 'Hall', 'Estate', 'Place', 'Court', 'Mansion', 'Grange'],
    cottage: ['Cottage', 'Lodge', 'Cabin', 'Retreat', 'Haven', 'Hideaway', 'Nest', 'Nook'],
    castle: ['Castle', 'Keep', 'Fortress', 'Towers', 'Palace', 'Citadel', 'Hold', 'Stronghold'],
    villa: ['Villa', 'Residence', 'Gardens', 'Grove', 'Terrace', 'View', 'Point', 'Ridge']
  },
  locations: {
    hill: ['Hill', 'Ridge', 'Heights', 'Crest', 'Peak', 'Summit', 'Rise', 'Hilltop'],
    water: ['Bay', 'Lake', 'River', 'Stream', 'Beach', 'Shore', 'Harbor', 'Cove'],
    forest: ['Wood', 'Forest', 'Grove', 'Glade', 'Copse', 'Thicket', 'Woodland', 'Arbor'],
    field: ['Field', 'Meadow', 'Green', 'Dale', 'Valley', 'Glen', 'Plains', 'Lea']
  },
  adjectives: {
    grand: ['Royal', 'Grand', 'Noble', 'Majestic', 'Stately', 'Regal', 'Imperial', 'Palatial'],
    nature: ['Green', 'Sunny', 'Misty', 'Windy', 'Shady', 'Golden', 'Wild', 'Serene'],
    color: ['White', 'Red', 'Blue', 'Grey', 'Green', 'Black', 'Silver', 'Golden'],
    atmosphere: ['Peaceful', 'Silent', 'Quiet', 'Tranquil', 'Serene', 'Pleasant', 'Happy', 'Cozy']
  },
  prefixes: {
    compass: ['North', 'South', 'East', 'West', 'Upper', 'Lower', 'High', 'Far'],
    time: ['Old', 'New', 'Ancient', 'Modern', 'Early', 'Late', 'Classic', 'Traditional'],
    size: ['Great', 'Little', 'Big', 'Small', 'Broad', 'Wide', 'Long', 'Tall']
  },
  features: {
    gardens: ['Garden', 'Park', 'Lawn', 'Orchard', 'Vineyard', 'Gardens', 'Grounds', 'Courtyard'],
    architecture: ['Tower', 'Gate', 'Bridge', 'Wall', 'Arch', 'Spire', 'Dome', 'Portal'],
    nature: ['Oak', 'Elm', 'Birch', 'Pine', 'Rose', 'Willow', 'Maple', 'Cedar']
  },
  suffixes: {
    traditional: ['shire', 'ton', 'field', 'wick', 'worth', 'stead', 'ham', 'thorpe'],
    modern: ['view', 'side', 'lands', 'scape', 'wood', 'crest', 'way', 'dale'],
    descriptive: ['retreat', 'rest', 'corner', 'place', 'spot', 'way', 'walk', 'path']
  }
};

export default function HouseNameGenerator() {
  const [formData, setFormData] = useState({
    houseType: 'manor',
    location: '',
    style: 'traditional',
    theme: '',
    includeFeatures: false
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateHouseName() {
    const names = new Set<string>();
    const { houseType, location, style, theme, includeFeatures } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Generate basic house names
    function generateBaseName(): string {
      const prefix = getRandom(Object.values(sampleData.prefixes).flat());
      const type = getRandom(sampleData.types[houseType as keyof typeof sampleData.types]);
      return `${prefix} ${type}`;
    }

    // Add location-based names
    if (location && sampleData.locations[location as keyof typeof sampleData.locations]) {
      const locationWords = sampleData.locations[location as keyof typeof sampleData.locations];
      names.add(`${getRandom(locationWords)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);
      names.add(`The ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])} on the ${getRandom(locationWords)}`);
    }

    // Add style-based variations
    const adjectives = sampleData.adjectives[style as keyof typeof sampleData.adjectives] || sampleData.adjectives.grand;
    names.add(`${getRandom(adjectives)} ${generateBaseName()}`);

    // Add themed variations
    if (theme) {
      const themeWords = sampleData.features[theme as keyof typeof sampleData.features];
      if (themeWords) {
        names.add(`${getRandom(themeWords)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);
        names.add(`The ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])} by the ${getRandom(themeWords)}`);
      }
    }

    // Add feature-based names
    if (includeFeatures) {
      Object.values(sampleData.features).forEach(featureSet => {
        names.add(`${getRandom(featureSet)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);
      });
    }

    // Add suffix variations
    const suffixes = sampleData.suffixes[style as keyof typeof sampleData.suffixes] || sampleData.suffixes.traditional;
    names.add(`${getRandom(sampleData.prefixes.compass)}${getRandom(suffixes)}`);

    // Add combined variations
    for (let i = 0; i < 3; i++) {
      const adj = getRandom(Object.values(sampleData.adjectives).flat());
      const type = getRandom(sampleData.types[houseType as keyof typeof sampleData.types]);
      const suffix = getRandom(Object.values(sampleData.suffixes).flat());
      names.add(`${adj} ${type} ${suffix}`);
    }

    // Add some classic combinations
    names.add(`The ${getRandom(sampleData.adjectives.grand)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);
    names.add(`${getRandom(sampleData.prefixes.compass)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);
    names.add(`${getRandom(sampleData.prefixes.time)} ${getRandom(sampleData.types[houseType as keyof typeof sampleData.types])}`);

    return Array.from(names).slice(0, 10);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateHouseName();
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
      houseType: Object.keys(sampleData.types)[Math.floor(Math.random() * Object.keys(sampleData.types).length)],
      location: Object.keys(sampleData.locations)[Math.floor(Math.random() * Object.keys(sampleData.locations).length)],
      style: Object.keys(sampleData.suffixes)[Math.floor(Math.random() * Object.keys(sampleData.suffixes).length)],
      theme: Object.keys(sampleData.features)[Math.floor(Math.random() * Object.keys(sampleData.features).length)],
      includeFeatures: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          House Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create the perfect name for your residence! Whether it's a grand manor, 
            a cozy cottage, or a majestic castle, our generator will help you find 
            the ideal name. Choose your preferred style and features to generate names 
            that capture the essence of your property.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Residence
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.houseType}
                onChange={(e) => setFormData({...formData, houseType: e.target.value})}
              >
                <option value="manor">Manor/Estate</option>
                <option value="cottage">Cottage/Lodge</option>
                <option value="castle">Castle/Keep</option>
                <option value="villa">Villa/Residence</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Feature
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="">Choose a Location</option>
                <option value="hill">Hill/Mountain</option>
                <option value="water">Water/Coastal</option>
                <option value="forest">Forest/Woods</option>
                <option value="field">Field/Meadow</option>
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
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="descriptive">Descriptive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Feature Theme
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
              >
                <option value="">Choose a Theme</option>
                <option value="gardens">Gardens & Grounds</option>
                <option value="architecture">Architectural Features</option>
                <option value="nature">Natural Elements</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeFeatures"
                checked={formData.includeFeatures}
                onChange={(e) => setFormData({...formData, includeFeatures: e.target.checked})}
                className="rounded text-blue-600 mr-2"
              />
              <label htmlFor="includeFeatures" className="text-sm text-gray-700">
                Include Special Features in Names
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate House Names
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
              Your House Names:
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