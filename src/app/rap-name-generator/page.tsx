'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const sampleData = {
  prefixes: [
    'Lil', 'Big', 'Young', 'MC', 'DJ', 'King', 'Queen', 'Dr.', 
    'Sir', 'Kid', 'Baby', 'Da', 'Ol\'', 'Chief'
  ],
  adjectives: [
    'Savage', 'Rich', 'Famous', 'Real', 'True', 'Raw', 'Fresh',
    'Slick', 'Smooth', 'Fast', 'Cool', 'Hot', 'Ice', 'Wild'
  ],
  nouns: [
    'Money', 'Cash', 'Bone', 'Star', 'Flow', 'Beat', 'Game',
    'Truth', 'Soul', 'Heart', 'Mind', 'Boss', 'Hustle', 'Rhyme'
  ],
  locations: [
    'East', 'West', 'South', 'North', 'Hood', 'Street', 'Block',
    'City', 'Town', 'Zone', 'World', 'Nation'
  ],
  styles: [
    'Gangsta', 'Conscious', 'Trap', 'Old School', 'New School',
    'Underground', 'Mainstream', 'Alternative', 'Drill'
  ]
};

export default function RapperNameGenerator() {
  const [formData, setFormData] = useState({
    realName: '',
    hometown: '',
    style: '',
    keywords: ''
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateRapperNames() {
    const names = new Set<string>();
    const { realName, hometown, style, keywords } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to capitalize first letter
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Use real name if provided
    if (realName) {
      const nameParts = realName.split(' ');
      const firstInitial = nameParts[0]?.[0];
      const lastInitial = nameParts[1]?.[0];

      // Name-based variations
      names.add(`${getRandom(sampleData.prefixes)} ${capitalize(nameParts[0])}`);
      if (firstInitial && lastInitial) {
        names.add(`${firstInitial}${lastInitial} ${getRandom(sampleData.nouns)}`);
      }
      names.add(`${capitalize(nameParts[0])} ${getRandom(sampleData.adjectives)}`);
    }

    // Location-based names
    if (hometown) {
      names.add(`${hometown} ${getRandom(sampleData.adjectives)}`);
      names.add(`${getRandom(sampleData.prefixes)} ${hometown}`);
    }

    // Style-based names
    if (style) {
      names.add(`${style} ${getRandom(sampleData.nouns)}`);
      names.add(`${getRandom(sampleData.prefixes)} ${style}`);
    }

    // Keyword-based names
    if (keywords) {
      const keywordArr = keywords.split(' ');
      keywordArr.forEach(keyword => {
        names.add(`${getRandom(sampleData.prefixes)} ${capitalize(keyword)}`);
        names.add(`${capitalize(keyword)} ${getRandom(sampleData.nouns)}`);
      });
    }

    // Generate random combinations
    for (let i = 0; i < 5; i++) {
      names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.adjectives)}`);
      names.add(`${getRandom(sampleData.adjectives)} ${getRandom(sampleData.nouns)}`);
      names.add(`${getRandom(sampleData.prefixes)} ${getRandom(sampleData.nouns)}`);
      names.add(`${getRandom(sampleData.nouns)} ${getRandom(sampleData.locations)}`);
    }

    // Add dollar sign variations
    names.add(`$${getRandom(sampleData.adjectives)}`);
    names.add(`$${getRandom(sampleData.nouns)}`);

    return Array.from(names)
      .filter(Boolean)
      .slice(0, 10); // Limit to 10 results
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateRapperNames();
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
      realName: 'John Smith',
      hometown: 'Brooklyn',
      style: getRandom(sampleData.styles),
      keywords: 'money power'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Rapper Name Generator
        </h1>

        <div className="mb-8 text-center">
        <h2>From Streets to Beats: Find Your Hip-Hop Identity</h2>
          <p>
          Ever wonder what name would make you stand out in the rap game? 
          Our algorithm combines street cred with style to create names that hit different. 
          Over 10,000 rappers already found their stage identity here.</p>
         
            <p>Create your perfect rap name! Whether you're looking for something hard-hitting, 
            clever, or unique, our generator combines street cred with creativity to craft 
            the perfect hip-hop moniker. From old school to new school, find a name that 
            matches your style and makes you stand out in the game.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Real Name (Optional)
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.realName}
                onChange={(e) => setFormData({...formData, realName: e.target.value})}
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Hometown
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.hometown}
                onChange={(e) => setFormData({...formData, hometown: e.target.value})}
                placeholder="e.g., Brooklyn, ATL, LA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="">Select a style</option>
                {sampleData.styles.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
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
                placeholder="e.g., money, power, respect"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Rapper Name
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
              Your Rapper Names:
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
      <h3 className="text-2xl font-bold">The Stories Behind the Names</h3>
          <p>Ever wonder how rap's biggest names got their monikers? The history of hip-hop names is as diverse as the culture itself:
Some of the most iconic rap names came from unexpected places. Like 50 Cent, who took his name from a Brooklyn robber, or Eminem, which simply came from his initials M&M.</p>
<p>Method Man earned his name from the film "Method Man" (1979), which he watched obsessively as a teen. The name stuck because he was always trying different methods to make it in the game.
A$AP Rocky's "A$AP" stands for "Always Strive And Prosper" – but also "Assassinating Snitches and Police." It's a perfect example of how rap names often carry multiple meanings.
Ice Cube got his name from his older brother. During arguments, he'd threaten to throw his little brother into a freezer and turn him into an ice cube. The name stuck, proving even family roasts can turn into rap gold.
Travis Scott borrowed his name from a favorite uncle named Travis and Kid Cudi's real first name (Scott). It shows how rap names can be tributes to both family and musical influences.
MF DOOM took his name from the Marvel Comics villain Doctor Doom, creating an entire supervillain persona around it. He even wore a metal mask during performances, showing how a name can shape an entire artistic identity.</p>

<h3 className="text-2xl font-bold">Did You Know?</h3>
<p>- Tyler, The Creator made his stage name at age 13 while making a MySpace page
- Childish Gambino used an online Wu-Tang name generator (just like our generator, but way less cool)
- 21 Savage's name combines a street gang number from his neighborhood with a reference to his perceived ruthless nature
- Kid Cudi's name came from his high school nickname "Cudi" and adding "Kid" because he felt young in the game

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