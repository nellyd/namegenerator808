'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Baby } from 'lucide-react';
import { girlNameData } from '@/data/girlNameData';
import type { 
  NameOrigin, 
  NameMeaning, 
  Popularity, 
  NameStyle,
  MiddleNameStyle,
  GeneratedGirlName 
} from '@/data/girlNameData';

interface FormData {
  origin: NameOrigin | 'any';
  meaning: NameMeaning | 'any';
  style: NameStyle;
  popularity: Popularity | 'any';
  includeMiddleName: boolean;
  middleNameStyle: MiddleNameStyle;
  count: number;
}

export default function GirlNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    origin: 'any',
    meaning: 'any',
    style: 'any',
    popularity: 'any',
    includeMiddleName: false,
    middleNameStyle: 'traditional',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedGirlName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random origin
  const getRandomOrigin = (): NameOrigin => {
    return getRandom(Object.keys(girlNameData.origins) as NameOrigin[]);
  };

  // Generate a name based on criteria
  const generateName = (): GeneratedGirlName => {
    const { origin, meaning, style, popularity, includeMiddleName, middleNameStyle } = formData;
    let firstName: string;
    const selectedOrigin = origin === 'any' ? getRandomOrigin() : origin;

    // Determine the name based on priority: style > popularity > meaning > origin
    if (style !== 'any' && girlNameData.styles[style]) {
      firstName = getRandom(girlNameData.styles[style]);
    } else if (popularity !== 'any' && girlNameData.popularity[popularity]) {
      firstName = getRandom(girlNameData.popularity[popularity]);
    } else if (meaning !== 'any' && girlNameData.meanings[meaning]) {
      firstName = getRandom(girlNameData.meanings[meaning]);
    } else {
      if (selectedOrigin === 'english') {
        const subset = getRandom(['traditional', 'modern']) as 'traditional' | 'modern';
        firstName = getRandom(girlNameData.origins.english[subset]);
      } else {
        firstName = getRandom(girlNameData.origins[selectedOrigin]);
      }
    }

    const generatedName: GeneratedGirlName = {
      firstName,
      origin: selectedOrigin,
    };

    if (meaning !== 'any') {
      generatedName.meaning = meaning;
    }

    if (style !== 'any') {
      generatedName.style = style;
    }

    if (popularity !== 'any') {
      generatedName.popularity = popularity;
    }

    if (includeMiddleName) {
      generatedName.middleName = getRandom(girlNameData.middleNames[middleNameStyle]);
    }

    return generatedName;
  };

  const generateNames = (): GeneratedGirlName[] => {
    const names: GeneratedGirlName[] = [];
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

  const copyToClipboard = async (name: GeneratedGirlName, index: number) => {
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Baby className="h-8 w-8 text-pink-600" />
          Girl Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate beautiful and meaningful girl names from various cultures and styles.
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value as NameOrigin | 'any'})}
                >
                  <option value="any">Any Origin</option>
                  <option value="english">English</option>
                  <option value="celtic">Celtic</option>
                  <option value="french">French</option>
                  <option value="latin">Latin</option>
                  <option value="greek">Greek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meaning
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.meaning}
                  onChange={(e) => setFormData({...formData, meaning: e.target.value as NameMeaning | 'any'})}
                >
                  <option value="any">Any Meaning</option>
                  <option value="nature">Nature</option>
                  <option value="strength">Strength</option>
                  <option value="beauty">Beauty</option>
                  <option value="wisdom">Wisdom</option>
                  <option value="grace">Grace</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as NameStyle})}
                >
                  <option value="any">Any Style</option>
                  <option value="feminine">Feminine</option>
                  <option value="unisex">Unisex</option>
                  <option value="vintage">Vintage</option>
                  <option value="modern">Modern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Popularity
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.popularity}
                  onChange={(e) => setFormData({...formData, popularity: e.target.value as Popularity | 'any'})}
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.middleNameStyle}
                  onChange={(e) => setFormData({...formData, middleNameStyle: e.target.value as MiddleNameStyle})}
                  disabled={!formData.includeMiddleName}
                >
                  <option value="traditional">Traditional</option>
                  <option value="modern">Modern</option>
                  <option value="floral">Floral</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeMiddleName"
                    checked={formData.includeMiddleName}
                    onChange={(e) => setFormData({...formData, includeMiddleName: e.target.checked})}
                    className="rounded text-pink-600 mr-2"
                  />
                  <label htmlFor="includeMiddleName" className="text-sm text-gray-700">
                    Include Middle Name
                  </label>
                </div>

                <div className="w-20">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.count}
                    onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 5})}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Generate Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Girl Names
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
                        {name.style && (
                          <span className="inline-block mr-3">
                            Style: {name.style}
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