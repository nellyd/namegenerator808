'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Building2 } from 'lucide-react';
import { cityNameData } from '@/data/cityNameData';
import type { CityStyle, CityPattern } from '@/data/cityNameData';

interface GeneratedCity {
  name: string;
  style: CityStyle;
  pattern: CityPattern;
  description?: string;
}

interface FormData {
  style: CityStyle;
  pattern: CityPattern;
  includeDescription: boolean;
  count: number;
}

export default function CityNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    style: 'english',
    pattern: 'standard',
    includeDescription: false,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedCity[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to generate description
  const generateDescription = (style: CityStyle): string => {
    const { terrain, water, features } = cityNameData.geographic;
    const descriptions = [
      `A city nestled in the ${getRandom(terrain)}`,
      `A bustling metropolis near the ${getRandom(water)}`,
      `A settlement built around the ${getRandom(features)}`,
      `A city known for its ${getRandom(terrain)} views`,
      `A thriving center of commerce by the ${getRandom(water)}`
    ];
    return getRandom(descriptions);
  };

  // Helper function to generate standard name
  const generateStandardName = (style: CityStyle): string => {
    const styleData = cityNameData.styles[style];
    if (Math.random() > 0.5) {
      return `${getRandom(styleData.prefixes)} ${getRandom(styleData.suffixes)}`;
    } else {
      const baseType = getRandom(['nature', 'cultural', 'colors']) as keyof typeof cityNameData.baseNames.english;
      const base = cityNameData.baseNames.english[baseType];
      return `${getRandom(base)}${getRandom(styleData.suffixes)}`;
    }
  };

  // Helper function to generate compound name
  const generateCompoundName = (style: CityStyle): string => {
    const prefix = getRandom(cityNameData.prefixes[style] || cityNameData.prefixes.english);
    let base: string;
    
    if (style === 'fantasy') {
      const baseType = getRandom(['mystical', 'elements', 'nature']) as keyof typeof cityNameData.baseNames.fantasy;
      base = getRandom(cityNameData.baseNames.fantasy[baseType]);
    } else if (style === 'scifi') {
      const baseType = getRandom(['tech', 'future', 'space']) as keyof typeof cityNameData.baseNames.scifi;
      base = getRandom(cityNameData.baseNames.scifi[baseType]);
    } else {
      const baseType = getRandom(['nature', 'cultural', 'colors']) as keyof typeof cityNameData.baseNames.english;
      base = getRandom(cityNameData.baseNames.english[baseType]);
    }
    
    const suffix = getRandom(cityNameData.suffixes[style] || cityNameData.suffixes.english);
    return `${prefix}${base}${suffix}`;
  };

  // Helper function to generate geographic name
  const generateGeographicName = (style: CityStyle): string => {
    const { terrain, water, features } = cityNameData.geographic;
    const patterns = [
      `${getRandom(terrain)}${getRandom(cityNameData.suffixes[style] || cityNameData.suffixes.english)}`,
      `${getRandom(water)}${getRandom(cityNameData.styles[style].suffixes)}`,
      `${getRandom(features)} ${getRandom(cityNameData.styles[style].prefixes)}`,
      `${getRandom(cityNameData.styles[style].prefixes)} ${getRandom(terrain)}`,
      `${getRandom(water)} ${getRandom(cityNameData.styles[style].suffixes)}`
    ];
    return getRandom(patterns);
  };

  // Helper function to generate modified name
  const generateModifiedName = (style: CityStyle): string => {
    const { size, age, status } = cityNameData.modifiers;
    const modifier = getRandom([...size, ...age, ...status]);
    const baseName = generateStandardName(style);
    return `${modifier} ${baseName}`;
  };

  function generateCityName(style: CityStyle, pattern: CityPattern): GeneratedCity {
    let name: string;

    switch (pattern) {
      case 'compound':
        name = generateCompoundName(style);
        break;
      case 'geographic':
        name = generateGeographicName(style);
        break;
      case 'modified':
        name = generateModifiedName(style);
        break;
      default:
        name = generateStandardName(style);
    }

    const city: GeneratedCity = {
      name,
      style,
      pattern
    };

    if (formData.includeDescription) {
      city.description = generateDescription(style);
    }

    return city;
  }

  const generateCities = (): GeneratedCity[] => {
    const cities: GeneratedCity[] = [];
    for (let i = 0; i < formData.count; i++) {
      cities.push(generateCityName(formData.style, formData.pattern));
    }
    return cities;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCities = generateCities();
    setResults(generatedCities);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (city: GeneratedCity, index: number) => {
    try {
      let text = city.name;
      if (city.description) {
        text += `\n${city.description}`;
      }
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
          <Building2 className="h-8 w-8 text-blue-600" />
          City Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>Whether you're crafting a fantasy novel, designing a video game, or building a D&D campaign, naming your fictional city can shape your entire world. 
            A great city name sets the tone, hints at its culture, and sticks in your readers' or players' minds.
          Think about iconic fictional cities: Gotham City's name instantly evokes darkness and gothic architecture. 
          Rivendell captures elvish elegance in just three syllables. Even Ankh-Morpork tells you something about 
          its character before you know anything else about it.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as CityStyle})}
                >
                  <option value="english">English</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="european">European</option>
                  <option value="asian">Asian</option>
                  <option value="african">African</option>
                  <option value="arabic">Arabic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pattern
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.pattern}
                  onChange={(e) => setFormData({...formData, pattern: e.target.value as CityPattern})}
                >
                  <option value="standard">Standard</option>
                  <option value="compound">Compound</option>
                  <option value="geographic">Geographic</option>
                  <option value="modified">Modified</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDescription"
                  checked={formData.includeDescription}
                  onChange={(e) => setFormData({...formData, includeDescription: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeDescription" className="text-sm text-gray-700">
                  Include Description
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
              Generate Cities
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated City Names
            </h2>
            <div className="grid gap-4">
              {results.map((city, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {city.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({city.style} style)
                      </span>
                      {city.description && (
                        <p className="text-sm text-gray-600 mt-1 italic">
                          {city.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(city, index)}
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

      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold">Creating a memorable city names</h2>

<p><strong>Cultural flavor:</strong> Names like New Constantinople or Neo Tokyo immediately suggest the city's heritage</p>
<p><strong>Environment:</strong> Names like Frostreach or Sandspire tell us about the surrounding landscape</p>
<p><strong>History:</strong> Places like King's Landing or Dragon's Gate hint at important past events</p>
<p><strong>Atmosphere:</strong> Whether it's Shadowhaven or Brightport, the name sets expectations</p>

<p>Our city name generator helps you discover names that feel authentic to your world while being memorable and meaningful. Ready to name your next great city? Let's build something legendary.</p>
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