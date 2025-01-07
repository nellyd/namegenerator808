'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Globe2 } from 'lucide-react';
import { countryNameData } from '@/data/countryNameData';
import type { NameType, RegionStyle } from '@/data/countryNameData';

interface GeneratedCountry {
  name: string;
  type: NameType;
  style?: RegionStyle;
  government?: string;
}

interface FormData {
  count: number;
  nameType: NameType;
  startsWith: string;
  endsWith: string;
  style: RegionStyle;
  includeGovernment: boolean;
}

const getRegionEndings = (style: RegionStyle): string[] => {
  if (style === 'any' || !countryNameData.real.regions) {
    return countryNameData.real.syllables.end;
  }
  return countryNameData.real.regions[style as keyof typeof countryNameData.real.regions];
};

export default function CountryNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    count: 10,
    nameType: 'real',
    startsWith: '',
    endsWith: '',
    style: 'any',
    includeGovernment: false
  });
  
  const [results, setResults] = useState<GeneratedCountry[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to generate a name based on syllables
  const generateSyllabicName = (type: NameType, startsWith: string = '', endsWith: string = ''): string => {
    const { syllables } = countryNameData[type];
    let name = '';

    if (startsWith) {
      const validStarts = syllables.start.filter(s => 
        s.toLowerCase().startsWith(startsWith.toLowerCase())
      );
      name = validStarts.length > 0 ? getRandom(validStarts) : getRandom(syllables.start);
    } else {
      name = getRandom(syllables.start);
    }

    // Add middle syllable 50% of the time
    if (Math.random() > 0.5) {
      name += getRandom(syllables.middle);
    }

    if (endsWith) {
      const validEndings = syllables.end.filter(e => 
        e.toLowerCase().endsWith(endsWith.toLowerCase())
      );
      name += validEndings.length > 0 ? getRandom(validEndings) : getRandom(syllables.end);
    } else {
      name += getRandom(syllables.end);
    }

    return name;
  };

  // Helper function to generate a name based on regional style
  const generateStyledName = (style: RegionStyle, startsWith: string = '', endsWith: string = ''): string => {
    const endings = getRegionEndings(style);
    let name = '';

    if (startsWith) {
      const validStarts = countryNameData.real.syllables.start.filter(s => 
        s.toLowerCase().startsWith(startsWith.toLowerCase())
      );
      name = validStarts.length > 0 ? getRandom(validStarts) : getRandom(countryNameData.real.syllables.start);
    } else {
      name = getRandom(countryNameData.real.syllables.start);
    }

    name += getRandom(countryNameData.real.syllables.middle);

    if (endsWith) {
      const validEndings = endings.filter(e => 
        e.toLowerCase().endsWith(endsWith.toLowerCase())
      );
      name += validEndings.length > 0 ? getRandom(validEndings) : getRandom(endings);
    } else {
      name += getRandom(endings);
    }

    return name;
  };

  // Helper function to generate a fictional name
  const generateFictionalName = (startsWith: string = '', endsWith: string = ''): string => {
    const { prefixes, roots, elements, fantasyWords, suffixes } = countryNameData.fictional;
    // Replace the patterns array in the generateFictionalName function with this:
    const patterns: Array<() => string> = [
      function(): string { 
        return getRandom(prefixes) + getRandom(roots);
      },
      function(): string { 
        return (elements ? getRandom(elements) : '') + getRandom(roots).toLowerCase();
      },
      function(): string {
        if (fantasyWords && suffixes) {
          return getRandom(fantasyWords) + ' ' + getRandom(suffixes);
        }
        return generateSyllabicName('fictional', startsWith, endsWith);
      },
      function(): string {
        return generateSyllabicName('fictional', startsWith, endsWith);
      }
    ];
    
    let name = getRandom(patterns)();
    
    if ((startsWith && !name.toLowerCase().startsWith(startsWith.toLowerCase())) ||
        (endsWith && !name.toLowerCase().endsWith(endsWith.toLowerCase()))) {
      name = generateSyllabicName('fictional', startsWith, endsWith);
    }

    return name;
  };

  function generateCountryName(type: NameType, style: RegionStyle, startsWith: string, endsWith: string): string {
    if (type === 'fictional') {
      return generateFictionalName(startsWith, endsWith);
    } else {
      return generateStyledName(style, startsWith, endsWith);
    }
  }

  function generateCountries(): GeneratedCountry[] {
    const countries: GeneratedCountry[] = [];
    const { count, nameType, startsWith, endsWith, style, includeGovernment } = formData;

    for (let i = 0; i < count; i++) {
      const country: GeneratedCountry = {
        name: generateCountryName(nameType, style, startsWith, endsWith),
        type: nameType,
        style: style === 'any' ? undefined : style
      };

      if (includeGovernment) {
        country.government = getRandom(countryNameData.governmentTypes);
        country.name = `${country.name} ${country.government}`;
      }

      // Randomly add geographic features or cardinal directions (20% chance each)
      if (Math.random() < 0.2) {
        const feature = getRandom(countryNameData.geographicFeatures);
        country.name = `${country.name} ${feature}`;
      } else if (Math.random() < 0.2) {
        const direction = getRandom(countryNameData.cardinalDirections);
        country.name = `${direction} ${country.name}`;
      }

      countries.push(country);
    }

    return countries;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCountries = generateCountries();
    setResults(generatedCountries);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (country: GeneratedCountry, index: number) => {
    try {
      await navigator.clipboard.writeText(country.name);
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
          <Globe2 className="h-8 w-8 text-emerald-600" />
          Country Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate unique country names for your world-building projects.
            Create realistic or fictional names with various styles and patterns.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Names
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 10})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Type
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  value={formData.nameType}
                  onChange={(e) => setFormData({...formData, nameType: e.target.value as NameType})}
                >
                  <option value="real">Realistic</option>
                  <option value="fictional">Fictional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Begins With
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.startsWith}
                  onChange={(e) => setFormData({...formData, startsWith: e.target.value})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Leave blank for any"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ends With
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.endsWith}
                  onChange={(e) => setFormData({...formData, endsWith: e.target.value})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Leave blank for any"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regional Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as RegionStyle})}
                  disabled={formData.nameType === 'fictional'}
                >
                  <option value="any">Any Style</option>
                  <option value="european">European</option>
                  <option value="asian">Asian</option>
                  <option value="african">African</option>
                  <option value="latin">Latin American</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeGovernment"
                  checked={formData.includeGovernment}
                  onChange={(e) => setFormData({...formData, includeGovernment: e.target.checked})}
                  className="rounded text-emerald-600 mr-2"
                />
                <label htmlFor="includeGovernment" className="text-sm text-gray-700">
                  Include Government Type
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Generate Countries
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Country Names
            </h2>
            <div className="grid gap-2">
              {results.map((country, index) => (
                <div 
                  key={index}
                  className="group flex justify-between items-center p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <span className="font-medium text-lg">
                      {country.name}
                    </span>
                    {country.style && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({country.style} style)
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(country, index)}
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

      <div className="max-w-3xl mx-auto">
 <h2 className="text-3xl font-bold mb-6">The Art of Country Names: A Worldbuilder's Guide</h2>

 <h3 className="text-2xl font-semibold mb-4">National Identity: Core Meaning</h3>
 <p className="mb-6">
   A country's name embodies its people's collective identity, dreams, and history. These names become powerful symbols, uniting populations and marking their place in the world. Whether inspired by ancient tribes, legendary heroes, or natural features, the name tells the story of who these people are.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Landscape and Territory: Geographic Names</h3>
 <p className="mb-6">
   Geography shapes nations and their names. "Mountainhaven" speaks of alpine sanctuary, while "The Verdant Republic" suggests fertile abundance. From island chains to desert kingdoms, these names reflect how environment influences national identity and development.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Legacy and Time: Historical Names</h3>
 <p className="mb-6">
   Historical events and eras often inspire country names. "The United Provinces of the Silver Revolution" might reference an industrial uprising, while "The Commonwealth of the First Dawn" could mark a cultural awakening. Such names bridge past and present, preserving crucial moments in a nation's story.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Values and Beliefs: Cultural Names</h3>
 <p className="mb-6">
   Names often reflect core cultural values. Consider how "The Harmony Collective" or "The Sacred Confederation" instantly communicate societal priorities and beliefs. These names tell us what the people hold dear and how they see themselves.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Government and Power: Political Names</h3>
 <p className="mb-6">
   Political structure shapes nomenclature. "Republic," "Kingdom," "Empire," or "Free States" immediately convey systems of rule. "The Democratic Federation" tells us about governance, while "The Sovereign Collective" suggests a unique power structure.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Language Origins: Etymology</h3>
 <p className="mb-6">
   Names evolve through language. Like "England" coming from "Angle-land," your nations can carry linguistic traces of their origins. Consider how names might evolve from ancient languages within your world, adding historical depth.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Growth and Change: Evolving Names</h3>
 <p className="mb-6">
   Nations change, and names follow. "The Third Republic" implies previous versions, while "New Avalonia" suggests expansion. Revolutionary changes often bring new names, marking new chapters in history.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Local Usage: Common Names</h3>
 <p className="mb-6">
   Official names often differ from everyday use. Consider how locals might shorten or modify names, and how different cultures might have their own versions. This adds authenticity to your world's social interactions.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Imagery and Metaphor: Symbolic Names</h3>
 <p className="mb-6">
   Metaphorical names can powerfully evoke national identity. "The Golden Crescent" might reference a cherished symbol, while "The Eternal Flame Federation" suggests enduring principles or beliefs.
 </p>

 <h3 className="text-2xl font-semibold mb-4">International Context: Relational Names</h3>
 <p className="mb-6">
   Names can show how nations connect. "The Allied Territories" suggests political unions, while "The Free Cities of the Eastern Reach" implies both independence and regional ties. Consider how names reflect your world's international dynamics.
 </p>

 <p className="mb-6">
   The best country names feel natural and inevitable, growing organically from your world's history, culture, and politics. They crystallize a nation's identity into a few carefully chosen words.
 </p>
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