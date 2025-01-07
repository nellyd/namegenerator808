'use client';
import React, { useState } from 'react';
import { Wand2, Copy, CheckCheck } from 'lucide-react';
import { tauNameData } from '@/data/tauNameData';

interface FormData {
  caste: string;
  rank: string;
  includeTitle: boolean;
  includeTeamNumber: boolean;
}

export default function TauNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    caste: '',
    rank: '',
    includeTitle: false,
    includeTeamNumber: false
  });
  
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = () => {
    const names: string[] = [];
    const { caste, rank, includeTitle, includeTeamNumber } = formData;

    for (let i = 0; i < 8; i++) {
      let name = '';
      
      // Add caste prefix
      if (caste) {
        name += tauNameData.castes[caste as keyof typeof tauNameData.castes];
      }

      // Add rank
      if (rank) {
        name += rank;
      }

      // Add team number (optional)
      if (includeTeamNumber) {
        name += getRandomItem(tauNameData.teamNumbers);
      }

      // Add sept name
      name += ' ' + getRandomItem(tauNameData.septs);

      // Add personal name
      name += ' ' + getRandomItem(tauNameData.personalNames);

      // Add title (optional)
      if (includeTitle) {
        name += ' ' + getRandomItem(tauNameData.titles);
      }

      names.push(name);
    }

    setResults(Array.from(new Set(names)));
  };

  const getRandomItem = <T extends any>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-orange-600" />
          T'au Empire Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate authentic T'au Empire character names following their caste system and naming conventions.
            For the Greater Good!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); generateNames(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={formData.caste}
                onChange={(e) => setFormData({...formData, caste: e.target.value})}
                required
              >
                <option value="">Select Caste</option>
                <option value="fire">Fire Caste (Shas)</option>
                <option value="earth">Earth Caste (Fio)</option>
                <option value="water">Water Caste (Por)</option>
                <option value="air">Air Caste (Kor)</option>
                <option value="ethereal">Ethereal Caste (Aun)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rank
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
                required
              >
                <option value="">Select Rank</option>
                <option value="la">Saal'la (Trainee/Cadet)</option>
                <option value="ui">Saal'ui (Warrior/Veteran)</option>
                <option value="vre">Saal'vre (Hero/Champion)</option>
                <option value="el">Saal'el (Knight/Lord)</option>
                <option value="o">Saal'o (Commander)</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTeamNumber"
                  checked={formData.includeTeamNumber}
                  onChange={(e) => setFormData({...formData, includeTeamNumber: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeTeamNumber" className="text-sm text-gray-700">
                  Include Team Number
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTitle"
                  checked={formData.includeTitle}
                  onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeTitle" className="text-sm text-gray-700">
                  Add Title
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Generate T'au Names
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