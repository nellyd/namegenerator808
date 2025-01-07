'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const sampleData = {
  prefixes: [
    'HMS', 'SS', 'MV', 'RMS', 'USS', 'The', 'Lady'
  ],
  adjectives: [
    'Flying', 'Royal', 'Swift', 'Brave', 'Mighty', 'Silent',
    'Golden', 'Iron', 'Silver', 'Black', 'Crimson', 'Dark',
    'Stormy', 'Raging', 'Dashing', 'Steady', 'Northern', 'Southern'
  ],
  nouns: [
    'Dragon', 'Pearl', 'Phoenix', 'Star', 'Wave', 'Wind', 'Storm',
    'Serpent', 'Whale', 'Revenge', 'Victory', 'Fortune', 'Destiny',
    'Spirit', 'Queen', 'Lady', 'Eagle', 'Falcon', 'Shadow'
  ],
  maritimeTerms: [
    'Voyager', 'Explorer', 'Mariner', 'Sailor', 'Captain', 'Admiral',
    'Navigator', 'Adventurer', 'Seafarer', 'Wanderer', 'Discoverer'
  ],
  oceanWords: [
    'Sea', 'Ocean', 'Tide', 'Harbor', 'Bay', 'Reef', 'Coast',
    'Atlantic', 'Pacific', 'Caribbean', 'Mediterranean'
  ],
  vesselTypes: [
    'Merchant', 'Military', 'Pirate', 'Exploration', 'Luxury',
    'Fishing', 'Research', 'Cruise', 'Private'
  ]
};

export default function ShipNameGenerator() {
  const [formData, setFormData] = useState({
    vesselType: '',
    theme: '',
    keywords: '',
    style: 'modern'
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateShipNames() {
    const names = new Set<string>();
    const { vesselType, theme, keywords, style } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Generate prefix-based names
    if (style === 'modern') {
      names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.nouns)}`);
      names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.adjectives)} ${getRandom(sampleData.nouns)}`);
    }

    // Generate classic ship names
    names.add(`The ${getRandom(sampleData.adjectives)} ${getRandom(sampleData.nouns)}`);
    names.add(`${getRandom(sampleData.nouns)} of the ${getRandom(sampleData.oceanWords)}`);
    names.add(`${getRandom(sampleData.adjectives)} ${getRandom(sampleData.maritimeTerms)}`);

    // Vessel type specific names
    if (vesselType) {
      switch (vesselType.toLowerCase()) {
        case 'military':
          names.add(`HMS ${getRandom(sampleData.adjectives)} ${getRandom(sampleData.nouns)}`);
          names.add(`USS ${getRandom(sampleData.nouns)}`);
          break;
        case 'pirate':
          names.add(`The ${getRandom(sampleData.adjectives)} Revenge`);
          names.add(`${getRandom(sampleData.adjectives)} Fortune`);
          break;
        case 'luxury':
          names.add(`Royal ${getRandom(sampleData.oceanWords)} ${getRandom(sampleData.nouns)}`);
          names.add(`Lady of the ${getRandom(sampleData.oceanWords)}`);
          break;
        default:
          names.add(`${capitalize(vesselType)} ${getRandom(sampleData.nouns)}`);
      }
    }

    // Theme-based names
    if (theme) {
      names.add(`${capitalize(theme)} ${getRandom(sampleData.maritimeTerms)}`);
      names.add(`The ${capitalize(theme)} ${getRandom(sampleData.nouns)}`);
    }

    // Keyword-based names
    if (keywords) {
      const keywordArr = keywords.split(' ');
      keywordArr.forEach(keyword => {
        names.add(`${capitalize(keyword)} ${getRandom(sampleData.nouns)}`);
        names.add(`The ${capitalize(keyword)} ${getRandom(sampleData.maritimeTerms)}`);
      });
    }

    // Add some poetic combinations
    names.add(`${getRandom(sampleData.adjectives)} ${getRandom(sampleData.oceanWords)} ${getRandom(sampleData.nouns)}`);
    names.add(`${getRandom(sampleData.adjectives)} ${getRandom(sampleData.maritimeTerms)}`);
    names.add(`${getRandom(sampleData.nouns)}'s ${getRandom(sampleData.nouns)}`);

    return Array.from(names)
      .filter(Boolean)
      .slice(0, 10); // Limit to 10 results
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateShipNames();
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
      vesselType: getRandom(sampleData.vesselTypes),
      theme: getRandom(sampleData.oceanWords),
      keywords: getRandom(sampleData.nouns).toLowerCase(),
      style: Math.random() > 0.5 ? 'modern' : 'classic'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Ship Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>Set sail with the perfect vessel name! Whether you're naming a mighty 
            warship, a swift merchant vessel, or a mysterious pirate ship, our 
            generator will help you find a name worthy of the seven seas. Combine 
            maritime tradition with your personal touch to create something truly unique.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vessel Type
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.vesselType}
                onChange={(e) => setFormData({...formData, vesselType: e.target.value})}
              >
                <option value="">Select vessel type</option>
                {sampleData.vesselTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
                placeholder="e.g., Ocean, Storm, Victory"
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
                placeholder="Enter inspiring words"
              />
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
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="naval">Naval</option>
                <option value="pirate">Pirate</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Ship Names
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
              Your Ship Names:
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

      <div className="max-w-3xl mx-auto">
 <h2 className="text-3xl font-bold mb-6">The Art of Vessel Naming: A Guide to Christening Ships and Boats</h2>

 <h3 className="text-2xl font-semibold mb-4">Maritime Traditions: Classical Names</h3>
 <p className="mb-6">
   Seafaring traditions run deep in vessel naming. "Lady Luck," "Sea Spirit," or "Fortune's Wind" follow time-honored patterns. Many sailors still believe a ship's name carries deep significance for her journeys, making this choice particularly meaningful.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Natural Elements: Environmental Names</h3>
 <p className="mb-6">
   The sea itself inspires many names. "Wave Dancer," "Storm Seeker," or "Tide Runner" connect vessels to their environment. These names often reflect the relationship between ship and sea, suggesting how they move through water.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Wildlife Connection: Creature Names</h3>
 <p className="mb-6">
   Marine life offers rich naming possibilities. "Blue Dolphin," "Sea Eagle," or "Grey Whale" celebrate ocean inhabitants. Land animals can work too—"Swift Fox" or "Desert Lion" can suggest speed or power.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Personal Connection: Family Names</h3>
 <p className="mb-6">
   Many boats carry names of loved ones. "Sarah Jane," "Sweet Caroline," or "Emma Rose" keep family close at heart. Some combine family names with maritime terms: "Jennifer's Wake" or "Katie's Harbor."
 </p>

 <h3 className="text-2xl font-semibold mb-4">Professional Identity: Working Names</h3>
 <p className="mb-6">
   Commercial vessels often reflect their purpose. "Net Profit," "Lucky Catch," or "Line Master" suit fishing boats, while "Island Express" works for passenger craft. These names balance practicality with personality.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Mythical Reference: Legendary Names</h3>
 <p className="mb-6">
   Mythology provides timeless inspiration. "Poseidon's Pride," "Calypso," or "Neptune's Charm" connect vessels to maritime legends. These names carry historical weight while adding mystery.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Humor and Wordplay: Clever Names</h3>
 <p className="mb-6">
   Wit has its place in boat naming. "Unsinkable II," "Knot Working," or "Sea's The Day" show personality. Just ensure the humor stays seaworthy—some jokes age better than others.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Speed and Power: Performance Names</h3>
 <p className="mb-6">
   Names can suggest vessel capabilities. "Lightning Strike," "Wind Runner," or "Swift Current" imply speed, while "Power Play" or "Force Ten" suggest strength.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Emotional Connection: Aspirational Names</h3>
 <p className="mb-6">
   Some names reflect owners' dreams or feelings. "Freedom," "Serenity Now," or "Wanderlust" speak to why people take to the water. These names often capture the escape that boating provides.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Heritage and History: Cultural Names</h3>
 <p className="mb-6">
   Cultural background influences naming. "Celtic Star," "Nordic Prince," or "Dragon's Wake" might reflect owner heritage. Historical events can also inspire: "Victory," "Pioneer," or "Heritage."
 </p>

 <h3 className="text-2xl font-semibold mb-4">Essential Considerations</h3>
 <ul className="list-disc pl-6 space-y-2 mb-6">
   <li>Be easily understood over radio</li>
   <li>Avoid tempting fate (some sailors avoid boastful names)</li>
   <li>Feel right both in port and at sea</li>
   <li>Reflect the vessel's character</li>
   <li>Consider maritime traditions</li>
   <li>Stay memorable and distinct</li>
 </ul>

 <h3 className="text-2xl font-semibold mb-4">Practical Tips</h3>
 <ul className="list-disc pl-6 space-y-2 mb-6">
   <li>Check name availability in your registry</li>
   <li>Consider how it sounds in emergency calls</li>
   <li>Test how it looks written on the bow</li>
   <li>Think about the story you'll tell when asked about the name</li>
   <li>Remember it might be passed down to future owners</li>
 </ul>

 <p className="mb-6">
   Your vessel's name is its first introduction to other seafarers—choose one that proudly announces its presence on the water.
 </p>
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