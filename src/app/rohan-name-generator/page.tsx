'use client';
import React, { useState } from 'react';
import { Wand2, Copy, CheckCheck } from 'lucide-react';

import { rohanNameData } from '@/data/rohanNameData';

export default function RohanNameGenerator() {
  const [formData, setFormData] = useState({
    gender: '',
    includeRank: false,
    includeBackground: false,
    includeTitle: false,
    includeWeapon: false
  });
  
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateName = () => {
    const names: string[] = [];
    const { gender, includeRank, includeBackground, includeTitle, includeWeapon } = formData;

    // Generate 8 unique names
    while (names.length < 8) {
      let nameParts: string[] = [];
      
      // Generate base name
      const prefixes = gender === 'male' ? rohanNameData.maleNameComponents.prefixes : rohanNameData.femaleNameComponents.prefixes;
      const suffixes = gender === 'male' ? rohanNameData.maleNameComponents.suffixes : rohanNameData.femaleNameComponents.suffixes;
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const baseName = prefix + suffix;

      nameParts.push(baseName);

      // Optional additions
      if (includeRank) {
        nameParts.push(rohanNameData.ranks[Math.floor(Math.random() * rohanNameData.ranks.length)]);
      }

      if (includeBackground) {
        nameParts.push(rohanNameData.backgrounds[Math.floor(Math.random() * rohanNameData.backgrounds.length)]);
      }

      if (includeTitle) {
        nameParts.push(rohanNameData.titles[Math.floor(Math.random() * rohanNameData.titles.length)]);
      }

      if (includeWeapon) {
        const weapon = rohanNameData.weapons[Math.floor(Math.random() * rohanNameData.weapons.length)];
        nameParts.push(`of the ${weapon}`);
      }

      const generatedName = nameParts.join(' ');
      
      // Ensure uniqueness
      if (!names.includes(generatedName)) {
        names.push(generatedName);
      }
    }

    setResults(names);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-amber-600" />
          Rohan Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate authentic names for the Horse-lords of Rohan. For the Riddermark!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); generateName(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeRank"
                  checked={formData.includeRank}
                  onChange={(e) => setFormData({...formData, includeRank: e.target.checked})}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="includeRank" className="text-sm text-gray-700">
                  Include Rank
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeBackground"
                  checked={formData.includeBackground}
                  onChange={(e) => setFormData({...formData, includeBackground: e.target.checked})}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="includeBackground" className="text-sm text-gray-700">
                  Add Origin
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTitle"
                  checked={formData.includeTitle}
                  onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="includeTitle" className="text-sm text-gray-700">
                  Add Title
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeWeapon"
                  checked={formData.includeWeapon}
                  onChange={(e) => setFormData({...formData, includeWeapon: e.target.checked})}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="includeWeapon" className="text-sm text-gray-700">
                  Include Weapon Descriptor
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Generate Rohan Names
            </button>
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
              Generated Names:
            </h2>
            <div className="grid gap-2">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <span className="font-medium">{result}</span>
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