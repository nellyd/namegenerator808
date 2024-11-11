'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, MapPin } from 'lucide-react';
import { streetNameData } from '@/data/streetNameData';
import type { StreetStyle, SuffixStyle, NamePattern, GeneratedStreet } from '@/data/streetNameData';

interface FormData {
  style: StreetStyle;
  suffixStyle: SuffixStyle;
  pattern: NamePattern;
  includePrefix: boolean;
  count: number;
}

function StreetNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    style: 'nature',
    suffixStyle: 'standard',
    pattern: 'standard',
    includePrefix: true,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedStreet[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random prefix
  const getPrefix = (): string => {
    const prefixTypes = ['compass', 'size', 'descriptive'];
    const randomType = getRandom(prefixTypes);
    return getRandom(streetNameData.prefixes[randomType]);
  };

  // Get base name based on style
  const getBaseName = (style: StreetStyle): string => {
    if (style === 'modern' || style === 'suburban') {
      const elements = streetNameData.styles[style].elements;
      const themes = streetNameData.styles[style].themes;
      return Math.random() > 0.5 ? getRandom(elements) : getRandom(themes);
    }

    const categories = Object.keys(streetNameData.bases[style]);
    const randomCategory = getRandom(categories);
    return getRandom(streetNameData.bases[style][randomCategory]);
  };

  // Get suffix based on style
  const getSuffix = (suffixStyle: SuffixStyle): string => {
    return getRandom(streetNameData.suffixes[suffixStyle]);
  };

  // Generate a street name
  const generateStreetName = (): GeneratedStreet => {
    const { style, suffixStyle, pattern, includePrefix } = formData;
    let name: string;

    switch (pattern) {
      case 'compound':
        const base1 = getBaseName(style);
        const base2 = getBaseName(style);
        name = `${base1} ${base2} ${getSuffix(suffixStyle)}`;
        break;
      
      case 'possessive':
        name = `${getBaseName(style)}'s ${getSuffix(suffixStyle)}`;
        break;
      
      case 'descriptive':
        name = `${getPrefix()} ${getBaseName(style)} ${getSuffix(suffixStyle)}`;
        break;
      
      default:
        name = includePrefix ? 
          `${getPrefix()} ${getBaseName(style)} ${getSuffix(suffixStyle)}` :
          `${getBaseName(style)} ${getSuffix(suffixStyle)}`;
    }

    return {
      name,
      style,
      pattern
    };
  };

  const generateStreetNames = (): GeneratedStreet[] => {
    const streets: GeneratedStreet[] = [];
    for (let i = 0; i < formData.count; i++) {
      streets.push(generateStreetName());
    }
    return streets;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedStreets = generateStreetNames();
    setResults(generatedStreets);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (street: GeneratedStreet, index: number) => {
    try {
      await navigator.clipboard.writeText(street.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <MapPin className="h-8 w-8 text-emerald-600" />
          Street Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate authentic-sounding street names for your maps, stories, or world-building projects.
            Choose from various styles and patterns to create the perfect street name.
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as StreetStyle})}
                >
                  <option value="nature">Nature & Parks</option>
                  <option value="urban">Urban & Historical</option>
                  <option value="residential">Residential & Community</option>
                  <option value="modern">Modern & City</option>
                  <option value="suburban">Suburban & Estates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Pattern
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  value={formData.pattern}
                  onChange={(e) => setFormData({...formData, pattern: e.target.value as NamePattern})}
                >
                  <option value="standard">Standard</option>
                  <option value="compound">Compound</option>
                  <option value="possessive">Possessive</option>
                  <option value="descriptive">Descriptive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suffix Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  value={formData.suffixStyle}
                  onChange={(e) => setFormData({...formData, suffixStyle: e.target.value as SuffixStyle})}
                >
                  <option value="standard">Standard (Street, Road, Avenue)</option>
                  <option value="british">British (Close, Mews, Vale)</option>
                  <option value="american">American (Pike, Trail, Parkway)</option>
                </select>
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includePrefix"
                checked={formData.includePrefix}
                onChange={(e) => setFormData({...formData, includePrefix: e.target.checked})}
                className="rounded text-emerald-600 mr-2"
              />
              <label htmlFor="includePrefix" className="text-sm text-gray-700">
                Include Prefix (North, South, Old, New, etc.)
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Generate Street Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Street Names
            </h2>
            <div className="grid gap-4">
              {results.map((street, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {street.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Style: {street.style} | Pattern:
{street.pattern}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(street, index)}
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

export default StreetNameGenerator;