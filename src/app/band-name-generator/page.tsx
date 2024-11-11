'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const sampleData = {
  genres: [
    'Rock', 'Metal', 'Pop', 'Hip Hop', 'Jazz', 'Blues', 
    'Electronic', 'Folk', 'Punk', 'Classical', 'Indie'
  ],
  adjectives: [
    'Black', 'Electric', 'Mystic', 'Cosmic', 'Wild', 'Silent',
    'Crimson', 'Golden', 'Savage', 'Neon', 'Eternal', 'Dark'
  ],
  nouns: [
    'Dragons', 'Kings', 'Ravens', 'Wolves', 'Riders', 'Knights',
    'Prophets', 'Saints', 'Sinners', 'Angels', 'Demons', 'Pirates'
  ]
};

export default function BandNameGenerator() {
  const [formData, setFormData] = useState({
    genre: '',
    vibe: '',
    keywords: '',
    style: 'modern'
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateBandNames() {
    const names = [];
    const { genre, vibe, keywords, style } = formData;

    // Generate different types of band names
    // Random combinations
    const adj = sampleData.adjectives[Math.floor(Math.random() * sampleData.adjectives.length)];
    const noun = sampleData.nouns[Math.floor(Math.random() * sampleData.nouns.length)];
    
    // Use input keywords if provided
    const keywordArray = keywords.split(' ').filter(Boolean);
    
    // Generate names based on style and inputs
    if (style === 'modern') {
      names.push(`The ${adj} ${noun}`);
      names.push(`${adj} ${noun} Society`);
      if (keywords) names.push(`The ${keywordArray[0]} Experience`);
    }

    if (genre) {
      names.push(`${genre} ${noun}`);
      names.push(`The ${genre} ${adj}s`);
    }

    if (vibe) {
      names.push(`${vibe} ${noun}`);
      names.push(`The ${vibe} Collective`);
    }

    // Add more creative combinations
    names.push(`${adj} ${noun} Project`);
    names.push(`The ${noun} Theory`);
    names.push(`${adj} ${noun} Syndrome`);
    names.push(`The ${adj} Hour`);
    names.push(`${noun} Republic`);
    
    // Remove duplicates and empty names
    return Array.from(new Set(names)).filter(Boolean);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateBandNames();
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
    const randomGenre = sampleData.genres[Math.floor(Math.random() * sampleData.genres.length)];
    const randomVibe = sampleData.adjectives[Math.floor(Math.random() * sampleData.adjectives.length)];
    
    setFormData({
      genre: randomGenre,
      vibe: randomVibe,
      keywords: '',
      style: Math.random() > 0.5 ? 'modern' : 'classic'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Band Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create the Perfect Band Name in Seconds! What's in a band name? Everything! 
            It's the first impression of your sound, style, and vibe. Our band name 
            generator crafts unique, powerful names that capture your musical identity.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Music Genre
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                required
              >
                <option value="">Select a genre</option>
                {sampleData.genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Band Vibe
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.vibe}
                onChange={(e) => setFormData({...formData, vibe: e.target.value})}
                placeholder="e.g., Mysterious, Energetic, Dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords (Optional)
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                placeholder="Enter words that inspire you"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="abstract">Abstract</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Band Names
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
              Your Band Names:
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