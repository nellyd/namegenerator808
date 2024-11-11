'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  girlNames: [
    'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia',
    'Harper', 'Evelyn', 'Abigail', 'Emily', 'Luna', 'Ella', 'Zoe', 'Victoria'
  ],
  boyNames: [
    'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Henry', 'Lucas',
    'Benjamin', 'Theodore', 'Jack', 'Alexander', 'Owen', 'Ethan', 'Leo', 'Aiden'
  ],
  namePairs: {
    classic: [
      ['Emma', 'Emily'], ['Jack', 'John'], ['Victoria', 'Elizabeth'],
      ['William', 'Henry'], ['Alexander', 'Andrew'], ['Catherine', 'Caroline']
    ],
    modern: [
      ['Luna', 'Nova'], ['Kai', 'Kian'], ['Zoe', 'Chloe'],
      ['Aiden', 'Jayden'], ['Mason', 'Logan'], ['Harper', 'Haven']
    ],
    nature: [
      ['River', 'Rain'], ['Sky', 'Storm'], ['Rose', 'Lily'],
      ['Ash', 'Oak'], ['Dawn', 'Dusk'], ['Flora', 'Fauna']
    ],
    mythological: [
      ['Apollo', 'Artemis'], ['Zeus', 'Hera'], ['Luna', 'Sol'],
      ['Atlas', 'Aurora'], ['Thor', 'Freya'], ['Castor', 'Pollux']
    ]
  },
  prefixes: [
    ['Al', 'El'], ['Ma', 'Mi'], ['Ka', 'Ki'],
    ['Ro', 'Ra'], ['Za', 'Zi'], ['Jo', 'Ja']
  ],
  rhymingEnds: [
    ['den', 'den'], ['ley', 'ley'], ['ton', 'ton'],
    ['belle', 'belle'], ['son', 'son'], ['lynn', 'lynn']
  ]
};

export default function TwinNameGenerator() {
  const [formData, setFormData] = useState({
    gender: 'boy-boy',
    style: 'classic',
    pattern: 'rhyming',
    theme: ''
  });
  const [results, setResults] = useState<Array<[string, string]>>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateTwinNames() {
    const { gender, style, pattern } = formData;
    const finalPairs: [string, string][] = [];

    // Helper function to get random item from array
    const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to capitalize
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Generate based on gender selection
    function getGenderSpecificNames(): [string, string] {
        switch (gender) {
            case 'boy-boy':
                return [getRandom(sampleData.boyNames), getRandom(sampleData.boyNames)];
            case 'girl-girl':
                return [getRandom(sampleData.girlNames), getRandom(sampleData.girlNames)];
            case 'boy-girl':
                return [getRandom(sampleData.boyNames), getRandom(sampleData.girlNames)];
            default:
                return [getRandom(sampleData.boyNames), getRandom(sampleData.boyNames)];
        }
    }

    // Add style-based pairs
    if (style && sampleData.namePairs[style as keyof typeof sampleData.namePairs]) {
        const stylePairs = sampleData.namePairs[style as keyof typeof sampleData.namePairs];
        for (let i = 0; i < 2; i++) {
            finalPairs.push(getRandom(stylePairs));
        }
    }

    // Add pattern-based names
    switch (pattern) {
        case 'rhyming':
            const ending = getRandom(sampleData.rhymingEnds);
            const prefix1 = getRandom(sampleData.prefixes)[0];
            const prefix2 = getRandom(sampleData.prefixes)[1];
            finalPairs.push([
                capitalize(prefix1 + ending[0]),
                capitalize(prefix2 + ending[1])
            ]);
            break;

        case 'alliteration':
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            const letter = getRandom(letters);
            const [name1, name2] = getGenderSpecificNames();
            finalPairs.push([
                letter + name1.slice(1),
                letter + name2.slice(1)
            ]);
            break;

        case 'matching-length':
            let [first, second] = getGenderSpecificNames();
            while (first.length !== second.length) {
                [first, second] = getGenderSpecificNames();
            }
            finalPairs.push([first, second]);
            break;
    }

    // Add some random pairs that match the criteria
    for (let i = 0; i < 3; i++) {
        finalPairs.push(getGenderSpecificNames());
    }

    // Remove duplicates and return up to 5 pairs
    return Array.from(new Set(finalPairs.map(pair => 
        pair.join('|')
    ))).map(pairString => 
        pairString.split('|') as [string, string]
    ).slice(0, 5);
}
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const generatedResults = generateTwinNames();
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
    gender: ['boy-boy', 'girl-girl', 'boy-girl'][Math.floor(Math.random() * 3)],
    style: ['classic', 'modern', 'nature', 'mythological'][Math.floor(Math.random() * 4)],
    pattern: ['rhyming', 'alliteration', 'matching-length'][Math.floor(Math.random() * 3)],
    theme: ''
  });
};

return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
        <Wand2 className="h-8 w-8 text-blue-600" />
        Twin Name Generator
      </h1>

      <div className="mb-8 text-center">
        <p className="text-gray-600 text-sm leading-relaxed">
          Finding the perfect names for twins? Our generator creates harmonious name 
          pairs that work beautifully together. Choose from matching patterns, 
          themes, and styles to find the ideal combination for your twins. Whether 
          you prefer classic pairs, modern duos, or nature-inspired combinations, 
          we'll help you find names that are uniquely perfect together.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twin Type
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="boy-boy">Twin Boys</option>
              <option value="girl-girl">Twin Girls</option>
              <option value="boy-girl">Boy and Girl</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Naming Style
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.style}
              onChange={(e) => setFormData({...formData, style: e.target.value})}
            >
              <option value="classic">Classic Names</option>
              <option value="modern">Modern Names</option>
              <option value="nature">Nature Inspired</option>
              <option value="mythological">Mythological Names</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name Pattern
            </label>
            <select 
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.pattern}
              onChange={(e) => setFormData({...formData, pattern: e.target.value})}
            >
              <option value="rhyming">Rhyming Names</option>
              <option value="alliteration">Same First Letter</option>
              <option value="matching-length">Same Length Names</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Twin Names
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
            Your Twin Names:
          </h2>
          <div className="grid gap-2">
            {results.map((pair, index) => (
              <div 
                key={index}
                className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                }}
              >
                <span className="font-medium">{pair[0]} & {pair[1]}</span>
                <button
                  onClick={() => copyToClipboard(`${pair[0]} & ${pair[1]}`, index)}
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