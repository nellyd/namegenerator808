// src/app/middle-name-generator/page.tsx
'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, User } from 'lucide-react';

const middleNameData = {
  traditional: {
    male: [
      'Alexander', 'Benjamin', 'Charles', 'Daniel', 'Edward',
      'Francis', 'George', 'Henry', 'Isaac', 'James'
    ],
    female: [
      'Anne', 'Elizabeth', 'Grace', 'Jane', 'Louise',
      'Marie', 'Rose', 'Catherine', 'Frances', 'Margaret'
    ]
  },
  modern: {
    male: [
      'Ace', 'Blaze', 'Chase', 'Drake', 'Finn',
      'Gray', 'Hayes', 'Jett', 'Kane', 'Lane'
    ],
    female: [
      'Aria', 'Blue', 'Dawn', 'Eden', 'Faye',
      'Haven', 'Iris', 'Jade', 'Kate', 'Luna'
    ]
  },
  nature: {
    male: [
      'Ash', 'Bear', 'Brook', 'Cliff', 'Dale',
      'Forest', 'Glen', 'Hawk', 'Lake', 'Mountain'
    ],
    female: [
      'Autumn', 'Dawn', 'Fern', 'Flora', 'Hazel',
      'Iris', 'Ivy', 'Lily', 'Maple', 'Meadow'
    ]
  },
  virtues: [
    'Grace', 'Faith', 'Hope', 'Joy', 'Love',
    'Peace', 'Truth', 'Honor', 'Justice', 'Liberty'
  ],
  cultural: {
    irish: [
      'Aidan', 'Brendan', 'Connor', 'Declan', 'Finn',
      'Liam', 'Owen', 'Patrick', 'Quinn', 'Ryan'
    ],
    italian: [
      'Angelo', 'Bruno', 'Carlo', 'Dante', 'Enzo',
      'Franco', 'Giovanni', 'Lorenzo', 'Marco', 'Paolo'
    ],
    french: [
      'Antoine', 'Bernard', 'Claude', 'Denis', 'Étienne',
      'François', 'Henri', 'Jean', 'Louis', 'Pierre'
    ]
  }
};

interface GeneratedMiddleName {
  name: string;
  style: string;
  gender: string;
  meaning?: string;
}

interface FormData {
  firstName: string;
  gender: 'male' | 'female';
  style: 'traditional' | 'modern' | 'nature' | 'virtue' | 'cultural';
  cultural: 'any' | 'irish' | 'italian' | 'french';
  count: number;
}

function MiddleNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    gender: 'male',
    style: 'traditional',
    cultural: 'any',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedMiddleName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateName = (): GeneratedMiddleName => {
    const { style, gender, cultural } = formData;
    let name: string;

    if (style === 'virtue') {
      name = getRandom(middleNameData.virtues);
    } else if (style === 'cultural') {
      const cultureName = cultural === 'any' ? 
        getRandom(['irish', 'italian', 'french'] as const) : 
        cultural;
      name = getRandom(middleNameData.cultural[cultureName as keyof typeof middleNameData.cultural]);
    } else {
      name = getRandom(middleNameData[style][gender]);
    }

    return {
      name,
      style,
      gender,
      meaning: style === 'virtue' ? 'Represents personal virtue and character' : undefined
    };
  };

  const generateNames = (): GeneratedMiddleName[] => {
    const names: GeneratedMiddleName[] = [];
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

  const copyToClipboard = async (name: GeneratedMiddleName, index: number) => {
    try {
      let text = name.name;
      if (formData.firstName) {
        text = `${formData.firstName} ${text}`;
      }
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <User className="h-8 w-8 text-teal-600" />
          Middle Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>
            Find the perfect middle name that complements your first name.
            Choose from traditional, modern, nature-inspired, and more.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Enter first name"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female'})}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as FormData['style']})}
                >
                  <option value="traditional">Traditional</option>
                  <option value="modern">Modern</option>
                  <option value="nature">Nature</option>
                  <option value="virtue">Virtue</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cultural Background
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={formData.cultural}
                  onChange={(e) => setFormData({...formData, cultural: e.target.value as FormData['cultural']})}
                  disabled={formData.style !== 'cultural'}
                >
                  <option value="any">Any Culture</option>
                  <option value="irish">Irish</option>
                  <option value="italian">Italian</option>
                  <option value="french">French</option>
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Generate Middle Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Middle Names
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
                        {formData.firstName && `${formData.firstName} `}{name.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Style: {name.style}
                        </span>
                        {name.meaning && (
                          <span className="inline-block">
                            Meanings: {name.meaning}
                          </span>
                        )}
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

export default MiddleNameGenerator;