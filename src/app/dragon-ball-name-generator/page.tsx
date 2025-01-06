'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Swords } from 'lucide-react';
import { dragonBallData } from '@/data/dragonBallData';

interface GeneratedCharacter {
  name: string;
  title?: string;
  powerLevel: string;
  techniques: string[];
  transformation?: string;
  personality: string;
  background: string;
}

export default function DragonBallGenerator() {
  const [formData, setFormData] = useState({
    race: 'saiyan',
    includeTitle: false,
    includeTransformation: false
  });
  
  const [results, setResults] = useState<GeneratedCharacter[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Helper function to get random items from array
  const getRandomItems = (arr: string[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  function generateName(race: string) {
    const raceData = dragonBallData.races[race as keyof typeof dragonBallData.races];
    return `${getRandom(raceData.nameElements)}${getRandom(raceData.nameSuffixes)}`;
  }

  function generateCharacters() {
    const characters: GeneratedCharacter[] = [];
    const { race, includeTitle, includeTransformation } = formData;
    const raceData = dragonBallData.races[race as keyof typeof dragonBallData.races];

    // Generate 5 characters
    for (let i = 0; i < 5; i++) {
      const character: GeneratedCharacter = {
        name: generateName(race),
        powerLevel: getRandom(dragonBallData.powerLevels),
        techniques: [
          ...getRandomItems(dragonBallData.techniques.ki, 2),
          ...getRandomItems(dragonBallData.techniques.physical, 1)
        ],
        personality: getRandom(dragonBallData.personalities),
        background: getRandom(dragonBallData.backgrounds)
      };

      if (includeTitle) {
        character.title = getRandom(raceData.titles);
      }

      if (includeTransformation && dragonBallData.transformations[race as keyof typeof dragonBallData.transformations]) {
        character.transformation = getRandom(dragonBallData.transformations[race as keyof typeof dragonBallData.transformations]);
      }

      characters.push(character);
    }

    return characters;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCharacters = generateCharacters();
    setResults(generatedCharacters);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (character: GeneratedCharacter, index: number) => {
    try {
      let text = character.name;
      if (character.title) text += `, ${character.title}`;
      text += `\nPower Level: ${character.powerLevel}`;
      text += `\nTechniques: ${character.techniques.join(', ')}`;
      if (character.transformation) text += `\nTransformation: ${character.transformation}`;
      text += `\nPersonality: ${character.personality}`;
      text += `\nBackground: ${character.background}`;

      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillRandomData = () => {
    setFormData({
      race: getRandom(Object.keys(dragonBallData.races)),
      includeTitle: Math.random() > 0.5,
      includeTransformation: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Swords className="h-8 w-8 text-orange-600" />
          Dragon Ball Character Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique Dragon Ball characters with race-appropriate names,
            power levels, techniques, and backstories.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Race
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={formData.race}
                onChange={(e) => setFormData({...formData, race: e.target.value})}
              >
                <option value="saiyan">Saiyan</option>
                <option value="earthling">Earthling</option>
                <option value="namekian">Namekian</option>
                <option value="frieza">Frieza Race</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeTitle"
                  checked={formData.includeTitle}
                  onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                  className="rounded text-orange-600 mr-2"
                />
                <label htmlFor="includeTitle" className="text-sm text-gray-700">
                  Include Title
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeTransformation"
                  checked={formData.includeTransformation}
                  onChange={(e) => setFormData({...formData, includeTransformation: e.target.checked})}
                  className="rounded text-orange-600 mr-2"
                />
                <label htmlFor="includeTransformation" className="text-sm text-gray-700">
                  Include Transformation
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Generate Characters
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
                        {character.title && (
                          <span className="text-gray-600 ml-2">
                            {character.title}
                          </span>
                        )}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Power Level: {character.powerLevel}
                      </p>
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
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-medium text-gray-700">Techniques:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {character.techniques.map((technique, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {character.transformation && (
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="font-medium text-purple-700">Transformation:</p>
                        <p className="mt-1 text-purple-600">{character.transformation}</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-medium text-gray-700">Personality:</p>
                      <p className="mt-1">{character.personality}</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-medium text-gray-700">Background:</p>
                      <p className="mt-1">{character.background}</p>
                    </div>
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