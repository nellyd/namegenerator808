'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Gamepad2 } from 'lucide-react';
import { gameNameData } from '@/data/gameNameData';
import type { 
  GameGenre, 
  GameStyle, 
  GameTheme,
  GameSubstyle,
  GeneratedGameName 
} from '@/data/gameNameData';

interface FormData {
  genre: GameGenre;
  style: GameStyle;
  theme: GameTheme;
  substyle: GameSubstyle;
  count: number;
}

export default function GameNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    genre: 'any',
    style: 'standard',
    theme: 'any',
    substyle: 'none',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedGameName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random genre
  const getRandomGenre = (): GameGenre => {
    const genres = ['action', 'fantasy', 'scifi', 'strategy'];
    return getRandom(genres) as GameGenre;
  };

  // Generate standard name
  const generateStandardName = (genre: GameGenre): string => {
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    return `${prefix} ${noun}`;
  };

  // Generate extended name
  const generateExtendedName = (genre: GameGenre): string => {
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]); 
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${prefix} ${noun} ${suffix}`;
  };

  // Generate compound name
  const generateCompoundName = (genre: GameGenre): string => {
    const noun1 = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const noun2 = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    return `${noun1} of ${noun2}`;
  };

  // Generate subtitle name
  const generateSubtitleName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${noun}: ${suffix}`;
  };

  // Generate series name
  const generateSeriesName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const number = Math.floor(Math.random() * 5) + 1;
    return `${noun} ${number}`;
  };

  // Generate spin name
  const generateSpinName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${noun}: ${prefix} ${suffix}`;
  };

  // Add theme elements
  const addThemeElements = (name: string, theme: GameTheme): string => {
    if (theme === 'any') return name;
    const themeWord = getRandom(gameNameData.themes[theme]);
    return Math.random() > 0.5 ? `${themeWord} ${name}` : `${name} of ${themeWord}`;
  };

  // Add substyle elements
  const addSubstyleElements = (name: string, substyle: GameSubstyle): string => {
    if (substyle === 'none') return name;
    const substyleWord = getRandom(gameNameData.substyles[substyle]);
    return `${substyleWord} ${name}`;
  };

  // Generate a name based on criteria
  const generateName = (): GeneratedGameName => {
    const { genre, style, theme, substyle } = formData;
    const selectedGenre = genre === 'any' ? getRandomGenre() : genre;
    
    let baseName: string;
    switch (style) {
      case 'extended':
        baseName = generateExtendedName(selectedGenre);
        break;
      case 'compound':
        baseName = generateCompoundName(selectedGenre);
        break;
      case 'subtitle':
        baseName = generateSubtitleName(selectedGenre);
        break;
      case 'series':
        baseName = generateSeriesName(selectedGenre);
        break;
      case 'spin':
        baseName = generateSpinName(selectedGenre);
        break;
      default:
        baseName = generateStandardName(selectedGenre);
    }

    // Add theme and substyle elements
    let finalName = baseName;
    if (theme !== 'any') {
      finalName = addThemeElements(finalName, theme);
    }
    if (substyle !== 'none') {
      finalName = addSubstyleElements(finalName, substyle);
    }

    return {
      name: finalName,
      genre: selectedGenre,
      theme: theme === 'any' ? undefined : theme,
      style
    };
  };

  const generateNames = (): GeneratedGameName[] => {
    const names: GeneratedGameName[] = [];
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

  const copyToClipboard = async (name: GeneratedGameName, index: number) => {
    try {
      await navigator.clipboard.writeText(name.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Gamepad2 className="h-8 w-8 text-violet-600" />
          Game Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate creative and unique game names for different genres and styles.
            Perfect for game developers, designers, and enthusiasts.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value as GameGenre})}
                >
                  <option value="any">Any Genre</option>
                  <option value="action">Action</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="strategy">Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as GameStyle})}
                >
                  <option value="standard">Standard</option>
                  <option value="extended">Extended</option>
                  <option value="compound">Compound</option>
                  <option value="subtitle">Subtitle</option>
                  <option value="series">Series</option>
                  <option value="spin">Spin-off</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme</label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value as GameTheme})}
                >
                  <option value="any">Any Theme</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.substyle}
                  onChange={(e) => setFormData({...formData, substyle: e.target.value as GameSubstyle})}
                >
                  <option value="none">None</option>
                  <option value="retro">Retro</option>
                  <option value="indie">Indie</option>
                  <option value="epic">Epic</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Names
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 5})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Generate Game Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Game Names
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
                        {name.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Genre: {name.genre}
                        </span>
                        {name.theme && (
                          <span className="inline-block mr-3">
                            Theme: {name.theme}
                          </span>
                        )}
                        <span className="inline-block">
                          Style: {name.style}
                        </span>
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