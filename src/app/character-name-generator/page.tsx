'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
import { characterData } from '@/data/characterData';

interface GeneratedName {
  name: string;
  title?: string;
  archetype?: string;
  personality?: string;
  background?: string;
  quirk?: string;
}

export default function CharacterNameGenerator() {
  const [formData, setFormData] = useState({
    genre: 'fantasy',
    archetype: '',
    namePattern: 'standard',
    includeTitle: false,
    includePersonality: false,
    includeBackground: false,
    includeQuirk: false
  });
  
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to generate name based on pattern
  const generateNameByPattern = (genreData: any, pattern: string) => {
    switch (pattern) {
      case 'compound':
        return `${getRandom(genreData.nameModifiers)}${getRandom(genreData.nameElements)}`;
      
      case 'elemental':
        return `${getRandom(genreData.elements)}${getRandom(genreData.elementalSuffixes)}`;
      
      case 'epithet':
        return `${getRandom(genreData.firstNames)} the ${getRandom(genreData.epithets)}`;
      
      case 'place':
        return `${getRandom(genreData.firstNames)} of ${getRandom(genreData.places)}`;
      
      case 'standard':
      default:
        return `${getRandom(genreData.firstNames)} ${getRandom(genreData.lastNames)}`;
    }
  };

  function generateCharacterNames() {
    const names: GeneratedName[] = [];
    const { genre, archetype, namePattern, includeTitle, includePersonality, includeBackground, includeQuirk } = formData;
    const genreData = characterData.genres[genre as keyof typeof characterData.genres];

    // Generate 5 names
    for (let i = 0; i < 5; i++) {
      const generatedName: GeneratedName = {
        name: generateNameByPattern(genreData, namePattern)
      };

      if (includeTitle) {
        const titles = characterData.titles[genre as keyof typeof characterData.titles];
        generatedName.title = getRandom(titles);
      }

      if (archetype && characterData.archetypes[archetype as keyof typeof characterData.archetypes]) {
        generatedName.archetype = getRandom(characterData.archetypes[archetype as keyof typeof characterData.archetypes]);
      }

      if (includePersonality) {
        const traits = characterData.personalities.traits;
        generatedName.personality = `${getRandom(traits)} and ${getRandom(traits)}`;
      }

      if (includeBackground) {
        const backgrounds = characterData.backgrounds[genre as keyof typeof characterData.backgrounds];
        generatedName.background = getRandom(backgrounds);
      }

      if (includeQuirk) {
        generatedName.quirk = getRandom(characterData.quirks);
      }

      names.push(generatedName);
    }

    return names;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateCharacterNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (characterInfo: GeneratedName, index: number) => {
    try {
      let text = characterInfo.name;
      if (characterInfo.title) text += `, ${characterInfo.title}`;
      if (characterInfo.archetype) text += `\nArchetype: ${characterInfo.archetype}`;
      if (characterInfo.personality) text += `\nPersonality: ${characterInfo.personality}`;
      if (characterInfo.background) text += `\nBackground: ${characterInfo.background}`;
      if (characterInfo.quirk) text += `\nQuirk: ${characterInfo.quirk}`;

      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillRandomData = () => {
    setFormData({
      genre: getRandom(Object.keys(characterData.genres)),
      archetype: getRandom(['', ...Object.keys(characterData.archetypes)]),
      namePattern: getRandom(['standard', 'compound', 'elemental', 'epithet', 'place']),
      includeTitle: Math.random() > 0.5,
      includePersonality: Math.random() > 0.5,
      includeBackground: Math.random() > 0.5,
      includeQuirk: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Character Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique character names for your stories, games, or roleplaying adventures.
            Choose your preferred genre and customize your character with various naming patterns and traits.
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value})}
                >
                  <option value="fantasy">Fantasy</option>
                  <option value="scifi">Science Fiction</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="historical">Historical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Pattern
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.namePattern}
                  onChange={(e) => setFormData({...formData, namePattern: e.target.value})}
                >
                  <option value="standard">Standard (First Last)</option>
                  <option value="compound">Compound (Stormheart)</option>
                  <option value="elemental">Elemental (Frostweaver)</option>
                  <option value="epithet">Epithet (X the Brave)</option>
                  <option value="place">Place (X of Y)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Character Archetype
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.archetype}
                  onChange={(e) => setFormData({...formData, archetype: e.target.value})}
                >
                  <option value="">No Archetype</option>
                  <option value="hero">Hero</option>
                  <option value="antihero">Anti-Hero</option>
                  <option value="villain">Villain</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeTitle"
                  checked={formData.includeTitle}
                  onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeTitle" className="text-sm text-gray-700">
                  Title
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includePersonality"
                  checked={formData.includePersonality}
                  onChange={(e) => setFormData({...formData, includePersonality: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includePersonality" className="text-sm text-gray-700">
                  Personality
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeBackground"
                  checked={formData.includeBackground}
                  onChange={(e) => setFormData({...formData, includeBackground: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeBackground" className="text-sm text-gray-700">
                  Background
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeQuirk"
                  checked={formData.includeQuirk}
                  onChange={(e) => setFormData({...formData, includeQuirk: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeQuirk" className="text-sm text-gray-700">
                  Quirk
                </label>
              </div>
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
              Generated Characters
            </h2>
            <div className="grid gap-4">
              {results.map((character, index) => (
                <div 
                  key={index}
                  className="group p-4 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-lg">
                        {character.name}
                        {character.title && <span className="text-gray-600 ml-2">{character.title}</span>}
                      </span>
                      {character.archetype && (
                        <p className="text-sm text-gray-500 mt-1">
                          {character.archetype}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(character, index)}
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
                  {(character.personality || character.background || character.quirk) && (
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      {character.personality && (
                        <p>Personality: {character.personality}</p>
                      )}
                      {character.background && (
                        <p>Background: {character.background}</p>
                      )}
                      {character.quirk && (
                        <p>Quirk: {character.quirk}</p>
                      )}
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