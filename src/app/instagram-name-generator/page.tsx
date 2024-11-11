'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, Instagram } from 'lucide-react';
import { instagramNameData } from '@/data/instagramNameData';
import type { 
  InstagramTheme,
  NameStyle,
  PrefixStyle,
  GeneratedInstagramName 
} from '@/data/instagramNameData';

interface FormData {
  theme: InstagramTheme;
  style: NameStyle;
  prefixStyle: PrefixStyle;
  includeNumbers: boolean;
  includeSymbols: boolean;
  count: number;
}

export default function InstagramNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    theme: 'creative',
    style: 'standard',
    prefixStyle: 'aesthetic',
    includeNumbers: false,
    includeSymbols: true,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedInstagramName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get prefix based on style
  const getPrefix = (style: PrefixStyle): string => {
    return getRandom(instagramNameData.prefixes[style]);
  };

  // Get theme specific word and suffix
  const getThemeWords = (theme: InstagramTheme) => {
    const word = getRandom(instagramNameData.themes[theme].words);
    const suffix = getRandom(instagramNameData.themes[theme].suffixes);
    return { word, suffix };
  };

  // Get decorative elements
  const getDecorative = () => {
    const symbol = getRandom(instagramNameData.decorative.symbols);
    const separator = getRandom(instagramNameData.decorative.separators);
    const number = getRandom(instagramNameData.decorative.numbers);
    return { symbol, separator, number };
  };

  // Get personalizer
  const getPersonalizer = (): string => {
    const types = ['traits', 'adjectives', 'descriptors'] as const;
    const type = getRandom(types);
    return getRandom(instagramNameData.personalizers[type]);
  };

  // Generate an Instagram username
  const generateInstagramName = (): GeneratedInstagramName => {
    const { theme, style, prefixStyle, includeNumbers, includeSymbols } = formData;
    const { word, suffix } = getThemeWords(theme);
    const { symbol, separator, number } = getDecorative();
    let name: string;

    switch (style) {
      case 'decorated':
        name = `${word}${separator}${suffix}`;
        if (includeSymbols) name += symbol;
        break;

      case 'numbered':
        name = `${word}${includeNumbers ? number : ''}${suffix}`;
        break;

      case 'personalized':
        const personalizer = getPersonalizer();
        name = `${personalizer}${separator}${word}${separator}${suffix}`;
        break;

      default:
        name = `${getPrefix(prefixStyle)}${separator}${word}${separator}${suffix}`;
    }

    return {
      name,
      theme,
      style
    };
  };

  const generateNames = (): GeneratedInstagramName[] => {
    const names: GeneratedInstagramName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateInstagramName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (instagram: GeneratedInstagramName, index: number) => {
    try {
      await navigator.clipboard.writeText(instagram.name);
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
          <Instagram className="h-8 w-8 text-pink-600" />
          Instagram Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique and trendy Instagram usernames for your profile.
            Choose from different themes and styles to match your content.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Theme
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value as InstagramTheme})}
                >
                  <option value="creative">Creative & Art</option>
                  <option value="lifestyle">Lifestyle & Personal</option>
                  <option value="fashion">Fashion & Style</option>
                  <option value="travel">Travel & Adventure</option>
                  <option value="fitness">Fitness & Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as NameStyle})}
                >
                  <option value="standard">Standard</option>
                  <option value="decorated">Decorated</option>
                  <option value="numbered">Numbered</option>
                  <option value="personalized">Personalized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prefix Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  value={formData.prefixStyle}
                  onChange={(e) => setFormData({...formData, prefixStyle: e.target.value as PrefixStyle})}
                >
                  <option value="aesthetic">Aesthetic</option>
                  <option value="cool">Cool</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeNumbers"
                    checked={formData.includeNumbers}
                    onChange={(e) => setFormData({...formData, includeNumbers: e.target.checked})}
                    className="rounded text-pink-600 mr-2"
                  />
                  <label htmlFor="includeNumbers" className="text-sm text-gray-700">
                    Include Numbers
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeSymbols"
                    checked={formData.includeSymbols}
                    onChange={(e) => setFormData({...formData, includeSymbols: e.target.checked})}
                    className="rounded text-pink-600 mr-2"
                  />
                  <label htmlFor="includeSymbols" className="text-sm text-gray-700">
                    Include Symbols
                  </label>
                </div>
              </div>
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
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Generate Instagram Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Instagram Names
            </h2>
            <div className="grid gap-4">
              {results.map((instagram, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {instagram.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Theme: {instagram.theme}
                        </span>
                        <span className="inline-block">
                          Style: {instagram.style}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(instagram, index)}
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