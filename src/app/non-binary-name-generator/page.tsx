'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  genderNeutralNames: [
    'Alex', 'Avery', 'Blair', 'Casey', 'Drew', 'Eden', 'Finn', 'Gray',
    'Harper', 'Jordan', 'Kennedy', 'London', 'Morgan', 'Parker', 'Quinn', 'Rain',
    'Robin', 'Sage', 'Sam', 'Taylor', 'Winter', 'River', 'Sky', 'Phoenix',
    'Riley', 'Rowan', 'Salem', 'Storm', 'Sunny', 'Val', 'Wren', 'Ash'
  ],
  natureInspired: [
    'Aspen', 'Brook', 'Dawn', 'Fern', 'Forest', 'Lake', 'Leaf', 'Moon',
    'Ocean', 'River', 'Shadow', 'Sky', 'Star', 'Storm', 'Sun', 'Willow',
    'Cedar', 'Ivy', 'Juniper', 'Maple', 'Pine', 'Sage', 'Rain', 'Wave'
  ],
  cosmicNames: [
    'Nova', 'Nebula', 'Orion', 'Phoenix', 'Solstice', 'Star', 'Venus', 'Vega',
    'Aurora', 'Celestial', 'Comet', 'Eclipse', 'Galaxy', 'Luna', 'Mars', 'Mercury'
  ],
  conceptNames: [
    'Justice', 'Liberty', 'Peace', 'Harmony', 'Joy', 'Love', 'Truth', 'Hope',
    'Honor', 'Faith', 'Grace', 'Destiny', 'Unity', 'Victory', 'Wisdom', 'Bliss'
  ],
  elementalNames: [
    'Aether', 'Air', 'Ember', 'Fire', 'Frost', 'Ice', 'Mist', 'Rain',
    'Storm', 'Thunder', 'Water', 'Wind', 'Blaze', 'Crystal', 'Stone', 'Wave'
  ],
  colors: [
    'Gray', 'Indigo', 'Jade', 'Onyx', 'Ruby', 'Silver', 'Teal', 'Azure',
    'Blue', 'Gold', 'Green', 'Red', 'Sage', 'Violet', 'Yellow', 'Amber'
  ],
  wordCombinations: {
    prefixes: [
      'Aero', 'Bio', 'Cryo', 'Eco', 'Geo', 'Neo', 'Pyro', 'Quantum',
      'Solar', 'Tech', 'Volt', 'Wave', 'Xeno', 'Zero', 'Zen'
    ],
    suffixes: [
      'core', 'flux', 'glow', 'light', 'path', 'pulse', 'shift', 'spark',
      'storm', 'wave', 'wind', 'zen', 'star', 'sphere', 'mind'
    ]
  },
  nameStyles: {
    modern: ['Aiden', 'Kai', 'Remy', 'Skylar', 'Zion', 'Atlas', 'Echo', 'Onyx'],
    classic: ['Addison', 'Blake', 'Charlie', 'Jamie', 'Leslie', 'Morgan', 'Pat', 'Sam'],
    unique: ['Ariel', 'Corin', 'Dex', 'Elm', 'Fox', 'Haven', 'Indigo', 'Juno']
  }
};

export default function NonBinaryNameGenerator() {
  const [formData, setFormData] = useState({
    style: 'modern',
    theme: '',
    length: 'any',
    includeMiddleName: false,
    useWordCombinations: false
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateNonBinaryName() {
    const names = new Set<string>();
    const { style, theme, length, includeMiddleName, useWordCombinations } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to capitalize first letter
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Add style-based names
    function addStyleNames() {
      const styleNames = sampleData.nameStyles[style as keyof typeof sampleData.nameStyles];
      for (let i = 0; i < 2; i++) {
        names.add(getRandom(styleNames));
      }
    }

    // Add theme-based names
    function addThemeNames() {
      let themeNames: string[] = [];
      switch (theme) {
        case 'nature':
          themeNames = sampleData.natureInspired;
          break;
        case 'cosmic':
          themeNames = sampleData.cosmicNames;
          break;
        case 'concept':
          themeNames = sampleData.conceptNames;
          break;
        case 'elemental':
          themeNames = sampleData.elementalNames;
          break;
        default:
          themeNames = sampleData.genderNeutralNames;
      }
      for (let i = 0; i < 3; i++) {
        names.add(getRandom(themeNames));
      }
    }

    // Add word combinations
    function addWordCombinations() {
      if (useWordCombinations) {
        for (let i = 0; i < 3; i++) {
          const prefix = getRandom(sampleData.wordCombinations.prefixes);
          const suffix = getRandom(sampleData.wordCombinations.suffixes);
          names.add(capitalize(prefix + suffix));
        }
      }
    }

    // Add length-specific names
    function addLengthSpecificNames() {
      const allNames = [...sampleData.genderNeutralNames, ...sampleData.natureInspired, ...sampleData.cosmicNames];
      const filteredNames = allNames.filter(name => {
        switch (length) {
          case 'short':
            return name.length <= 4;
          case 'medium':
            return name.length > 4 && name.length <= 6;
          case 'long':
            return name.length > 6;
          default:
            return true;
        }
      });
      for (let i = 0; i < 3; i++) {
        if (filteredNames.length > 0) {
          names.add(getRandom(filteredNames));
        }
      }
    }

    // Generate middle names if requested
    function addWithMiddleNames() {
      if (includeMiddleName) {
        const existingNames = Array.from(names);
        const middleNames = [...sampleData.genderNeutralNames, ...sampleData.conceptNames];
        existingNames.forEach(firstName => {
          const middleName = getRandom(middleNames);
          names.add(`${firstName} ${middleName}`);
        });
      }
    }

    // Generate all types of names
    addStyleNames();
    addThemeNames();
    addWordCombinations();
    addLengthSpecificNames();
    addWithMiddleNames();

    // Add some random combinations
    const elements = [...sampleData.colors, ...sampleData.elementalNames];
    for (let i = 0; i < 2; i++) {
      names.add(`${getRandom(elements)}${getRandom(sampleData.wordCombinations.suffixes)}`);
    }

    return Array.from(names).slice(0, 10);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateNonBinaryName();
    setResults(generatedResults);
    setCopiedIndex(null);
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

  const fillRandomData = () => {
    setFormData({
      style: ['modern', 'classic', 'unique'][Math.floor(Math.random() * 3)],
      theme: ['nature', 'cosmic', 'concept', 'elemental'][Math.floor(Math.random() * 4)],
      length: ['short', 'medium', 'long', 'any'][Math.floor(Math.random() * 4)],
      includeMiddleName: Math.random() > 0.5,
      useWordCombinations: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Non-Binary Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Find your perfect gender-neutral name! Whether you're looking for something 
            nature-inspired, cosmic, conceptual, or completely unique, our generator 
            will help you discover names that resonate with your identity. Choose from 
            different styles and themes to find the name that feels right for you.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="unique">Unique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
              >
                <option value="">Any Theme</option>
                <option value="nature">Nature-Inspired</option>
                <option value="cosmic">Cosmic/Celestial</option>
                <option value="concept">Abstract Concepts</option>
                <option value="elemental">Elements & Colors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name Length
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.length}
                onChange={(e) => setFormData({...formData, length: e.target.value})}
              >
                <option value="any">Any Length</option>
                <option value="short">Short (≤4 letters)</option>
                <option value="medium">Medium (5-6 letters)</option>
                <option value="long">Long (7+ letters)</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeMiddleName"
                  checked={formData.includeMiddleName}
                  onChange={(e) => setFormData({...formData, includeMiddleName: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeMiddleName" className="text-sm text-gray-700">
                  Generate with Middle Names
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useWordCombinations"
                  checked={formData.useWordCombinations}
                  onChange={(e) => setFormData({...formData, useWordCombinations: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="useWordCombinations" className="text-sm text-gray-700">
                  Include Unique Word Combinations
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

        <div className="mb-8 text-center">
          <h2>Understanding Non-Binary Identity</h2>
    <p>The way we think about gender is evolving, and non-binary is an important part of that journey. Non-binary refers to people who don’t see themselves fitting into the traditional categories of male or female. It’s about breaking away from the binary and embracing a spectrum of gender identities that are unique and personal.</p>
    <p>The <strong>Non-Binary Name Generator</strong> celebrates this diversity by offering a space to explore names that feel authentic and empowering. It’s more than just a tool—it’s a way to celebrate individuality and inclusivity.</p>
<br></br>
    <h2>Why Inclusive Names Matter</h2>
    <p>A name is so much more than just a word—it’s a reflection of identity, culture, and self-expression. For those who are non-binary, finding a name that resonates with their identity can be an important step in affirming who they are.</p>
    <p>Our generator is designed to go beyond traditional naming conventions, offering names that transcend gendered norms and open the door to limitless possibilities.</p>
    <br></br>
    <h2>Gender Neutral vs. Non-Binary Names</h2>
    <p>While both gender-neutral and non-binary names are not tied to a specific gender, there’s a subtle difference. Gender-neutral names are traditionally seen as suitable for any gender, like Taylor or Alex. Non-binary names, however, often carry a deeper sense of individuality and may challenge the expectations of traditional naming altogether.</p>
    <p>Our <strong>Non-Binary Name Generator</strong> bridges these ideas, giving you the freedom to find a name that feels exactly right for your journey.</p>

        </div>

        {results.length > 0 && (
          <div 
            className="bg-white rounded-lg shadow-lg p-6"
            style={{
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Your Names:
            </h2>
            <div className="grid gap-2">
              {results.map((name, index) => (
                <div 
                  key={index}
                  className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <span className="font-medium">{name}</span>
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