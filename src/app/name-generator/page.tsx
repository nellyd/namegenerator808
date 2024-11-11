'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, User } from 'lucide-react';

type Gender = 'male' | 'female' | 'any';
type NameFormat = 'basic' | 'formal';

interface GeneratedName {
  firstName: string;
  lastName: string;
  title?: string;
  gender: string;
}

const nameData = {
  firstNames: {
    male: [
      'James', 'John', 'Robert', 'Michael', 'William',
      'David', 'Richard', 'Joseph', 'Thomas', 'Charles'
    ],
    female: [
      'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth',
      'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'
    ]
  },
  lastNames: [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
    'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'
  ],
  titles: {
    male: ['Mr.', 'Dr.', 'Prof.'],
    female: ['Ms.', 'Mrs.', 'Dr.', 'Prof.']
  }
};

export default function NameGenerator() {
  const [formData, setFormData] = useState({
    gender: 'any' as Gender,
    includeTitle: false,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Generate a single name
  const generateName = (): GeneratedName => {
    const selectedGender = formData.gender === 'any' 
      ? (Math.random() > 0.5 ? 'male' : 'female') 
      : formData.gender;
    
    const genderKey = selectedGender as 'male' | 'female';
    const firstName = getRandom(nameData.firstNames[genderKey]);
    const lastName = getRandom(nameData.lastNames);
    
    const name: GeneratedName = {
      firstName,
      lastName,
      gender: selectedGender
    };

    if (formData.includeTitle) {
      name.title = getRandom(nameData.titles[genderKey]);
    }

    return name;
  };

  const generateNames = (): GeneratedName[] => {
    const names: GeneratedName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateName());
    }
    return names;
  };

  const formatName = (name: GeneratedName): string => {
    return `${name.title ? name.title + ' ' : ''}${name.firstName} ${name.lastName}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (name: GeneratedName, index: number) => {
    try {
      await navigator.clipboard.writeText(formatName(name));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <User className="h-8 w-8 text-blue-600" />
          Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate random names with optional titles and formatting.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value as Gender})}
                >
                  <option value="any">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeTitle"
                checked={formData.includeTitle}
                onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                className="rounded text-blue-600 mr-2"
              />
              <label htmlFor="includeTitle" className="text-sm text-gray-700">
                Include Title
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Names
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
                        {formatName(name)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Gender: {name.gender}
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
    </div>
  );
}