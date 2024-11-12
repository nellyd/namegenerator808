'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Pen } from 'lucide-react';
import { penNameData } from '@/data/penNameData';

type NameStyle = 'classic' | 'modern' | 'artistic';
type Genre = 'mystery' | 'fantasy' | 'romance' | 'scifi';

interface GeneratedName {
  name: string;
  style: NameStyle;
  alternates?: string[];
  genre?: Genre;
}

interface FormData {
  style: NameStyle;
  useInitials: boolean;
  includeGenre: boolean;
  includeLocation: boolean;
  genre?: Genre;
  count: number;
}

export default function PenNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    style: 'classic',
    useInitials: false,
    includeGenre: false,
    includeLocation: false,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

  // Generate initials format name
  const generateInitialsName = (firstName: string, lastName: string): string => {
    const format = getRandom(penNameData.patterns.initials.formats);
    const f = firstName[0];
    const l = lastName[0];
    return format.replace('F', f).replace('L', l);
  };

  // Generate artistic name with elements
  const generateArtisticName = (): string => {
    const { nouns, adjectives } = penNameData.patterns.elements;
    const patterns = [
      () => `${getRandom(adjectives)} ${getRandom(nouns)}`,
      () => `${getRandom(nouns)}${getRandom(['writer', 'scribe', 'poet'])}`,
      () => `${getRandom(adjectives)}${getRandom(['pen', 'quill', 'word'])}`,
      () => `${getRandom(nouns)} ${getRandom(penNameData.patterns.titles)}`
    ];
    return patterns[Math.floor(Math.random() * patterns.length)]();
  };

  // Generate name based on style and options
  const generatePenName = (): GeneratedName => {
    const { style, includeGenre, includeLocation, genre } = formData;
    const styleData = penNameData.styles[style];
    
    let name: string;
    const firstName = getRandom(styleData.firstNames);
    const lastName = getRandom(styleData.lastNames);

    if (formData.useInitials) {
      name = generateInitialsName(firstName, lastName);
    } else if (style === 'artistic') {
      name = Math.random() > 0.5 ? generateArtisticName() : `${firstName} ${lastName}`;
    } else {
      name = `${firstName} ${lastName}`;
    }

    // Add genre-specific elements
    if (includeGenre && genre) {
      const genreData = penNameData.genres[genre];
      if (Math.random() > 0.5) {
        name = `${getRandom(genreData.prefixes)} ${name}`;
      } else {
        name = `${name} ${getRandom(genreData.suffixes)}`;
      }
    }

    // Add location
    if (includeLocation && Math.random() > 0.5) {
      name = `${name} ${getRandom(penNameData.patterns.locations)}`;
    }

    return {
      name,
      style,
      genre,
      alternates: [
        generateInitialsName(firstName, lastName),
        `${lastName}, ${firstName}`,
        style === 'artistic' ? generateArtisticName() : `${firstName} ${getRandom(styleData.lastNames)}`
      ]
    };
  };

  const generateNames = (): GeneratedName[] => {
    const names: GeneratedName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generatePenName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (name: GeneratedName, index: number) => {
    try {
      await navigator.clipboard.writeText(name.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Pen className="h-8 w-8 text-purple-600" />
          Pen Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique pen names for your writing career. Whether you're crafting an elegant pseudonym for a historical novel, 
            a bold name for a sci-fi thriller, or something artistic for poetry, we’ve got you covered. 
            Choose from classic, modern, or creative styles, and customize each element to create a memorable name that 
            resonates with your writing voice and genre. Perfect for authors, bloggers, and creatives ready to make 
            their mark with a name as unique as their work.
            
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as NameStyle})}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="artistic">Artistic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre (Optional)
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  value={formData.genre || ''}
                  onChange={(e) => setFormData({
                    ...formData, 
                    genre: e.target.value as Genre || undefined,
                    includeGenre: !!e.target.value
                  })}
                >
                  <option value="">No Genre</option>
                  <option value="mystery">Mystery</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="romance">Romance</option>
                  <option value="scifi">Science Fiction</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useInitials"
                  checked={formData.useInitials}
                  onChange={(e) => setFormData({...formData, useInitials: e.target.checked})}
                  className="rounded text-purple-600 mr-2"
                />
                <label htmlFor="useInitials" className="text-sm text-gray-700">
                  Use Initials
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeLocation"
                  checked={formData.includeLocation}
                  onChange={(e) => setFormData({...formData, includeLocation: e.target.checked})}
                  className="rounded text-purple-600 mr-2"
                />
                <label htmlFor="includeLocation" className="text-sm text-gray-700">
                  Add Location
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Generate Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Pen Names
            </h2>
            <div className="grid gap-4">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-lg">
                        {result.name}
                      </span>
                      {result.genre && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({result.genre})
                        </span>
                      )}
                    </div>

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
                  
                  {result.alternates && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-medium mb-1">Alternate Versions:</p>
                      <ul className="space-y-1">
                        {result.alternates.map((alt, altIndex) => (
                          <li key={altIndex} className="text-gray-500">
                            • {alt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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