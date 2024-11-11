// src/app/username-generator/page.tsx
'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, UserCircle2 } from 'lucide-react';
import { usernameData } from '@/data/usernameData';
import type { 
  UsernameTheme,
  PrefixStyle,
  NamePattern,
  GeneratedUsername,
  FormData
} from '@/data/usernameData';

function UsernameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    theme: 'gaming',
    prefixStyle: 'gaming',
    pattern: 'standard',
    includeNumbers: true,
    useLeetSpeak: false,
    minLength: 3,
    maxLength: 15,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedUsername[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Convert text to leet speak
  const toLeetSpeak = (text: string): string => {
    return text.toLowerCase().split('').map(char => {
      return (usernameData.decorators.leetSpeak as Record<string, string>)[char] || char;
    }).join('');
  };

  // Generate a random number within a range
  const getRandomNumber = (min: number, max: number): string => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };

  // Generate a single username
  const generateUsername = (): GeneratedUsername => {
    const { theme, prefixStyle, pattern, includeNumbers, useLeetSpeak } = formData;
    
    const prefix = getRandom(usernameData.prefixes[prefixStyle]);
    const symbol = getRandom(usernameData.decorators.symbols);
    const noun = getRandom(usernameData.themes[theme].nouns);
    const action = theme === 'gaming' ? getRandom(usernameData.themes.gaming.actions) : '';
    const adjective = (usernameData.themes[theme] as any).adjectives ? 
      getRandom((usernameData.themes[theme] as any).adjectives) : '';

    let name = '';

    switch (pattern) {
      case 'action':
        name = `${prefix}${action}`;
        if (includeNumbers) {
          name += getRandomNumber(10, 99);
        }
        break;

      case 'descriptive':
        name = `${adjective}${symbol}${noun}`;
        break;

      case 'leet':
        name = `${prefix}${toLeetSpeak(noun)}`;
        break;

      default:
        name = `${prefix}${symbol}${noun}`;
    }

    if (useLeetSpeak) {
      name = toLeetSpeak(name);
    }

    if (includeNumbers && !name.match(/\d/) && pattern !== 'action') {
      name += getRandomNumber(0, 99);
    }

    // Handle length requirements
    if (name.length < formData.minLength) {
      name += getRandomNumber(0, 9).repeat(formData.minLength - name.length);
    }
    if (name.length > formData.maxLength) {
      name = name.slice(0, formData.maxLength);
    }

    return {
      name,
      theme,
      style: pattern
    };
  };

  // Generate multiple usernames
  const generateUsernames = (): GeneratedUsername[] => {
    const names: GeneratedUsername[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateUsername());
    }
    return names;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateUsernames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  // Handle copy to clipboard
  const copyToClipboard = async (username: GeneratedUsername, index: number) => {
    try {
      await navigator.clipboard.writeText(username.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <UserCircle2 className="h-8 w-8 text-indigo-600" />
          Username Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate unique usernames for gaming, social media, or professional use.
            Customize style and format to create the perfect username.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value as UsernameTheme})}
                >
                  <option value="gaming">Gaming</option>
                  <option value="tech">Tech & Programming</option>
                  <option value="creative">Creative & Artistic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.prefixStyle}
                  onChange={(e) => setFormData({...formData, prefixStyle: e.target.value as PrefixStyle})}
                >
                  <option value="gaming">Gaming</option>
                  <option value="social">Social Media</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pattern
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.pattern}
                  onChange={(e) => setFormData({...formData, pattern: e.target.value as NamePattern})}
                >
                  <option value="standard">Standard</option>
                  <option value="action">Action-Based</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="leet">Leet Speak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 5})}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeNumbers"
                  checked={formData.includeNumbers}
                  onChange={(e) => setFormData({...formData, includeNumbers: e.target.checked})}
                  className="rounded text-indigo-600 mr-2"
                />
                <label htmlFor="includeNumbers" className="text-sm text-gray-700">
                  Include Numbers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useLeetSpeak"
                  checked={formData.useLeetSpeak}
                  onChange={(e) => setFormData({...formData, useLeetSpeak: e.target.checked})}
                  className="rounded text-indigo-600 mr-2"
                />
                <label htmlFor="useLeetSpeak" className="text-sm text-gray-700">
                  Use Leet Speak
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate Usernames
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Usernames
            </h2>
            <div className="grid gap-4">
              {results.map((username, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {username.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Theme: {username.theme}
                        </span>
                        <span className="inline-block">
                          Style: {username.style}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(username, index)}
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

export default UsernameGenerator;