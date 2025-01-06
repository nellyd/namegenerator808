'use client';
import React, { useState } from 'react';
import { Wand2, Copy, CheckCheck } from 'lucide-react';
import { nameData, origins, syllables, meaningsList } from '@/data/babynameData';

interface FormData {
  gender: string;
  style: string;
  meaning: string;
  origin: string;
  syllableLength: string;
}

export default function BabyNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    style: '',
    meaning: '',
    origin: '',
    syllableLength: ''
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateNames() {
    const names: string[] = [];
    const { gender, style, meaning } = formData;

    // Add names based on style
    if (style && gender) {
      const styleNames = nameData[style as keyof typeof nameData][gender as 'male' | 'female'];
      names.push(...styleNames.slice(0, 3));
    }

    // Add names based on meaning
    if (meaning) {
      const meaningNames = nameData.meanings[meaning as keyof typeof nameData.meanings];
      names.push(...meaningNames.slice(0, 3));
    }

    // Add some random combinations if we don't have enough names
    while (names.length < 6) {
      const randomStyle = ['traditional', 'modern', 'unique'][Math.floor(Math.random() * 3)];
      const randomName = nameData[randomStyle as keyof typeof nameData][gender as 'male' | 'female'][
        Math.floor(Math.random() * 10)
      ];
      if (!names.includes(randomName)) {
        names.push(randomName);
      }
    }

    return Array.from(new Set(names));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateNames();
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
      gender: Math.random() > 0.5 ? 'male' : 'female',
      style: ['traditional', 'modern', 'unique'][Math.floor(Math.random() * 3)],
      meaning: Object.keys(nameData.meanings)[Math.floor(Math.random() * Object.keys(nameData.meanings).length)],
      origin: origins[Math.floor(Math.random() * origins.length)],
      syllableLength: syllables[Math.floor(Math.random() * syllables.length)]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-pink-600" />
          Baby Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p>
            Find the perfect name for your little one! Our baby name generator helps you
            discover beautiful, meaningful names that match your preferences and style. 
            Whether you're after something classic, unique, or culturally meaningful, 
            we've got thousands of options ready to inspire you. 
            Fill out the fields below, hit generate to start exploring.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="">Select style</option>
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="unique">Unique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meaning
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                value={formData.meaning}
                onChange={(e) => setFormData({...formData, meaning: e.target.value})}
              >
                <option value="">Select meaning</option>
                {Object.keys(nameData.meanings).map((meaning) => (
                  <option key={meaning} value={meaning}>{meaning}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
              >
                <option value="">Select origin</option>
                {origins.map((origin) => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
              Suggested Names:
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