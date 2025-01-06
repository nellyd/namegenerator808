'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  superheroPrefixes: [
    'Captain', 'Mighty', 'Ultra', 'Dark', 'Power', 'Supreme', 'Iron', 'Shadow', 'Storm', 'Silver',
  ],
  superheroNames: [
    'Phoenix', 'Titan', 'Flash', 'Vortex', 'Falcon', 'Blaze', 'Guardian', 'Saber', 'Bolt', 'Nova',
    'Inferno', 'Mystic', 'Dragon', 'Specter', 'Wraith', 'Ranger', 'Sonic', 'Thunder', 'Blizzard', 'Hunter',
  ],
  superheroSuffixes: [
    'of Justice', 'the Brave', 'the Invincible', 'the Protector', 'Defender', 'Force', 'the Mighty', 
    'the Vigilant', 'Avenger', 'the Unstoppable', 'of the Skies', 'Guardian of Earth', 'of Light', 'the Fearless',
  ],
};

export default function SuperheroNameGenerator() {
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    prefix: 'Random',
    mainName: 'Random',
    suffix: 'Random',
    customName: ''
  });

  // Helper function to get a random item from an array
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // Generate Superhero names based on the user's selection or custom name
  function generateSuperheroNames() {
    const names: string[] = [];

    while (names.length < 10) {
      const prefix = formData.prefix === 'Random' ? getRandom(sampleData.superheroPrefixes) : formData.prefix;
      const mainName = formData.customName || (formData.mainName === 'Random' ? getRandom(sampleData.superheroNames) : formData.mainName);
      const suffix = formData.suffix === 'Random' ? getRandom(sampleData.superheroSuffixes) : formData.suffix;

      const superheroName = `${prefix} ${mainName} ${suffix}`;
      
      // Add the name if it's unique
      if (!names.includes(superheroName)) {
        names.push(superheroName);
      }
    }

    console.log("Generated Superhero Names:", names); // Debugging step to ensure names are being generated
    return names;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateSuperheroNames();
    setResults(generatedResults); // Set the generated names to results
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Superhero Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>Discover your ultimate hero identity with our Superhero Name Generator! 
          Whether you're creating a brave protector, a shadowy vigilante, or a formidable villain, 
          find the perfect name to reflect your character's powers and personality. 
          Choose from various themes and styles to craft a name that embodies strength, 
          courage, and uniqueness. Ideal for writers, comic enthusiasts, and anyone looking 
          to bring their superhero to life!"
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter a Custom Name (Optional)
              </label>
              <input 
                type="text"
                value={formData.customName}
                onChange={(e) => setFormData({...formData, customName: e.target.value})}
                placeholder="Type your own superhero name or leave blank for random"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Your Prefix
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.prefix}
                onChange={(e) => setFormData({...formData, prefix: e.target.value})}
              >
                <option value="Random">Random</option>
                {sampleData.superheroPrefixes.map((prefix) => (
                  <option key={prefix} value={prefix}>{prefix}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Your Main Name
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.mainName}
                onChange={(e) => setFormData({...formData, mainName: e.target.value})}
                disabled={!!formData.customName}  // Disable this if a custom name is entered
              >
                <option value="Random">Random</option>
                {sampleData.superheroNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Your Suffix
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.suffix}
                onChange={(e) => setFormData({...formData, suffix: e.target.value})}
              >
                <option value="Random">Random</option>
                {sampleData.superheroSuffixes.map((suffix) => (
                  <option key={suffix} value={suffix}>{suffix}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Superhero Names
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
              Your Superhero Names:
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
    </div>
  );
}
