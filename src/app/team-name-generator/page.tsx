'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Users, Shuffle } from 'lucide-react';
import { teamNameData } from '@/data/teamNameData';

interface GeneratedTeam {
  name: string;
  mascot?: string;
  colors: {
    primary: string;
    secondary: string;
  };
  motto?: string;
}

export default function TeamNameGenerator() {
  const [formData, setFormData] = useState({
    category: 'sports',
    pattern: 'standard',
    includeMascot: false,
    includeColors: true,
    includeMotto: false
  });
  
  const [results, setResults] = useState<GeneratedTeam[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to generate name based on pattern
  const generateNameByPattern = (category: string, pattern: string) => {
    const categoryData = teamNameData.categories[category as keyof typeof teamNameData.categories];
    
    switch (pattern) {
      case 'location':
        return `${getRandom(categoryData.locations || [])} ${getRandom(categoryData.baseNames)}`;
      
      case 'colored':
        return `${getRandom(teamNameData.colors.primary)} ${getRandom(categoryData.baseNames)}`;
      
      case 'modified':
        return `${getRandom(categoryData.prefixes)} ${getRandom(categoryData.baseNames)} ${getRandom(categoryData.suffixes)}`;
      
      case 'themed':
        return `${getRandom(categoryData.themes || categoryData.prefixes)} ${getRandom(categoryData.baseNames)}`;
      
      case 'composite':
        return `${getRandom(categoryData.prefixes)} ${getRandom(categoryData.locations || [])} ${getRandom(categoryData.baseNames)}`;
      
      case 'attribute':
        return `${getRandom(categoryData.attributes || categoryData.prefixes)} ${getRandom(categoryData.baseNames)} ${getRandom(categoryData.suffixes)}`;
      
      case 'industry':
        return `${getRandom(categoryData.industries || categoryData.prefixes)} ${getRandom(categoryData.baseNames)} ${getRandom(categoryData.suffixes)}`;
      
      case 'standard':
      default:
        return `${getRandom(categoryData.prefixes)} ${getRandom(categoryData.baseNames)}`;
    }
  };

  function generateTeams() {
    const teams: GeneratedTeam[] = [];
    const { category, pattern, includeMascot, includeColors, includeMotto } = formData;

    // Generate 5 teams
    for (let i = 0; i < 5; i++) {
      const team: GeneratedTeam = {
        name: generateNameByPattern(category, pattern),
        colors: {
          primary: getRandom(teamNameData.colors.primary),
          secondary: getRandom(teamNameData.colors.secondary)
        }
      };

      if (includeMascot) {
        const mascotTypes = Object.keys(teamNameData.mascots);
        const randomType = getRandom(mascotTypes);
        team.mascot = getRandom(teamNameData.mascots[randomType as keyof typeof teamNameData.mascots]);
      }

      if (includeMotto) {
        team.motto = getRandom(teamNameData.mottos[category as keyof typeof teamNameData.mottos]);
      }

      teams.push(team);
    }

    return teams;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTeams = generateTeams();
    setResults(generatedTeams);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (team: GeneratedTeam, index: number) => {
    try {
      let text = team.name;
      if (team.mascot) text += `\nMascot: ${team.mascot}`;
      text += `\nColors: ${team.colors.primary} & ${team.colors.secondary}`;
      if (team.motto) text += `\nMotto: "${team.motto}"`;

      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillRandomData = () => {
    setFormData({
      category: getRandom(Object.keys(teamNameData.categories)),
      pattern: getRandom(Object.keys(teamNameData.patterns)),
      includeMascot: Math.random() > 0.5,
      includeColors: true,
      includeMotto: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-indigo-600" />
          Team Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique and professional team names for sports, esports, or business.
            Generate names with custom patterns, mascots, colors, and mottos.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="sports">Sports Team</option>
                  <option value="esports">Esports Team</option>
                  <option value="business">Business Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Pattern
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.pattern}
                  onChange={(e) => setFormData({...formData, pattern: e.target.value})}
                >
                  <option value="standard">Standard (Prefix + Base)</option>
                  <option value="location">Location Based</option>
                  <option value="colored">Color Based</option>
                  <option value="modified">Modified (Prefix + Base + Suffix)</option>
                  <option value="themed">Themed</option>
                  <option value="composite">Composite</option>
                  <option value="attribute">Attribute Based</option>
                  <option value="industry">Industry Based</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeMascot"
                  checked={formData.includeMascot}
                  onChange={(e) => setFormData({...formData, includeMascot: e.target.checked})}
                  className="rounded text-indigo-600 mr-2"
                />
                <label htmlFor="includeMascot" className="text-sm text-gray-700">
                  Mascot
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeColors"
                  checked={formData.includeColors}
                  onChange={(e) => setFormData({...formData, includeColors: e.target.checked})}
                  className="rounded text-indigo-600 mr-2"
                />
                <label htmlFor="includeColors" className="text-sm text-gray-700">
                  Colors
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeMotto"
                  checked={formData.includeMotto}
                  onChange={(e) => setFormData({...formData, includeMotto: e.target.checked})}
                  className="rounded text-indigo-600 mr-2"
                />
                <label htmlFor="includeMotto" className="text-sm text-gray-700">
                  Motto
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Generate Teams
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Teams
            </h2>
            <div className="grid gap-4">
              {results.map((team, index) => (
                <div 
                  key={index}
                  className="group p-4 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <span className="font-medium text-lg block">{team.name}</span>
                      {team.mascot && (
                        <span className="text-sm text-gray-600 block mt-1">
                          Mascot: {team.mascot}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(team, index)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none ml-4"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <CheckCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span>Colors:</span>
                      <span className="font-medium">{team.colors.primary}</span>
                      <span>&</span>
                      <span className="font-medium">{team.colors.secondary}</span>
                    </p>
                    {team.motto && (
                      <p className="italic">"{team.motto}"</p>
                    )}
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