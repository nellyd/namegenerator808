'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Users } from 'lucide-react';
import { lastNameData } from '@/data/lastNameData';
import type { 
  LastNameOrigin, 
  LastNameStyle, 
  LastNameModifier,
  GeneratedLastName 
} from '@/data/lastNameData';

interface FormData {
  origin: LastNameOrigin;
  style: LastNameStyle;
  modifier: LastNameModifier;
  count: number;
}

export default function LastNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    origin: 'any',
    style: 'any',
    modifier: 'none',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedLastName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random origin
  const getRandomOrigin = (): LastNameOrigin => {
    const origins = Object.keys(lastNameData.origins);
    return getRandom(origins) as LastNameOrigin;
  };

  // Generate compound name
  const generateCompoundName = (): string => {
    const { prefixes, suffixes } = lastNameData.styles.compound;
    return `${getRandom(prefixes)}${getRandom(suffixes)}`;
  };

  // Generate noble name
  const generateNobleName = (): string => {
    const { prefixes, names } = lastNameData.styles.noble;
    return `${getRandom(prefixes)} ${getRandom(names)}`;
  };

  // Generate elemental name
  const generateElementalName = (): string => {
    const type = getRandom(['materials', 'nature']) as 'materials' | 'nature';
    return getRandom(lastNameData.styles.elements[type]);
  };

  // Add modifier to name
  const addModifier = (name: string, modifier: LastNameModifier): string => {
    if (modifier === 'none') return name;
    
    const { prefixes, suffixes } = lastNameData.modifiers;
    if (modifier === 'prefix') return `${getRandom(prefixes)} ${name}`;
    if (modifier === 'suffix') return `${name}${getRandom(suffixes)}`;
    // both
    return `${getRandom(prefixes)} ${name}${getRandom(suffixes)}`;
  };

  // Generate a name based on criteria
  const generateName = (): GeneratedLastName => {
    const { origin, style, modifier } = formData;
    let baseName: string;
    const selectedOrigin = origin === 'any' ? getRandomOrigin() : origin;

    if (style === 'compound') {
      baseName = generateCompoundName();
    } else if (style === 'noble') {
      baseName = generateNobleName();
    } else if (style === 'elemental') {
      baseName = generateElementalName();
    } else if (selectedOrigin === 'english' && style !== 'any') {
      baseName = getRandom(lastNameData.origins.english[style as keyof typeof lastNameData.origins.english]);
    } else if (selectedOrigin === 'any') {
      const randomOrigin = getRandomOrigin();
      if (randomOrigin === 'english') {
        baseName = getRandom(lastNameData.origins.english.traditional);
      } else {
        const originData = lastNameData.origins[randomOrigin as keyof typeof lastNameData.origins];
        if (typeof originData === 'object' && 'traditional' in originData) {
          baseName = getRandom(originData.traditional);
        } else {
          baseName = getRandom(originData as string[]);
        }
      }
    } else {
      if (selectedOrigin === 'english') {
        baseName = getRandom(lastNameData.origins.english.traditional);
      } else {
        baseName = getRandom(lastNameData.origins[selectedOrigin]);
      }
    }

    // Add modifier if requested
    const finalName = addModifier(baseName, modifier);

    return {
      name: finalName,
      origin: selectedOrigin,
      style: style === 'any' ? undefined : style
    };
  };

  const generateNames = (): GeneratedLastName[] => {
    const names: GeneratedLastName[] = [];
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

  const copyToClipboard = async (name: GeneratedLastName, index: number) => {
    try {
      await navigator.clipboard.writeText(name.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-amber-600" />
          Last Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p>Generate authentic last names from various cultures and origins.
            Create unique family names with different styles and modifiers.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value as LastNameOrigin})}
                >
                  <option value="any">Any Origin</option>
                  <option value="english">English</option>
                  <option value="irish">Irish</option>
                  <option value="scottish">Scottish</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="french">French</option>
                  <option value="spanish">Spanish</option>
                  <option value="nordic">Nordic</option>
                  <option value="polish">Polish</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as LastNameStyle})}
                >
                  <option value="any">Any Style</option>
                  <option value="traditional">Traditional</option>
                  <option value="occupational">Occupational</option>
                  <option value="geographical">Geographical</option>
                  <option value="compound">Compound</option>
                  <option value="noble">Noble</option>
                  <option value="elemental">Elemental</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modifier
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  value={formData.modifier}onChange={(e) => setFormData({...formData, modifier: e.target.value as LastNameModifier})}
                  >
                    <option value="none">No Modifier</option>
                    <option value="prefix">Add Prefix (von, van, de)</option>
                    <option value="suffix">Add Suffix (son, ez, ski)</option>
                    <option value="both">Add Both</option>
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
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
  
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Generate Last Names
              </button>
            </form>
          </div>
  
          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Generated Last Names
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
                          {name.name}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="inline-block mr-3">
                            Origin: {name.origin}
                          </span>
                          {name.style && (
                            <span className="inline-block mr-3">
                              Style: {name.style}
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

        <div className="max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold mb-6">The "Escape-Your-Future-In-Laws' Last Name" Generator</h2>

  <p className="mb-6">
    So, your partner’s last name is… <em>questionable</em>. Maybe it’s “Butts,” or “Snodgrass,” or something that sounds like a rejected Harry Potter spell. Or maybe your soon-to-be spouse wants to hyphenate, and now you’re staring down the barrel of becoming “Smith-Wigglesworth” for the rest of your life. Fear not, brave soul! Tradition is overrated anyway.
  </p>

  <p className="mb-6">
    Introducing the <strong>Random Last Name Generator</strong>—your ticket to a surname that won’t make you cringe every time you introduce yourself at parties.  
  </p>

  <p className="mb-6">
    Here’s the deal: your brain is a traitor. It’s impossible to think of a truly random last name. You’ll either default to your cousin’s ex’s dog’s name or something you heard on a true crime podcast. Let us save you from yourself.
  </p>

  <p className="mb-6">
    With the click of a button, you could be:  
    <ul className="list-disc pl-8 mb-6">
      <li><strong>A majestic “Thunderhoof”</strong> (perfect for equestrians or people who just really love goats).</li>
      <li><strong>A mysterious “Nightshade”</strong> (ideal for aspiring vampires or gardeners with a dark side).</li>
      <li><strong>A sophisticated “Bumblefluff”</strong> (because why not?).</li>
    </ul>
  </p>

  <p className="mb-6">
    Say goodbye to awkward family reunions and hello to a last name that’s 100% <em>you</em>. Or at least 100% random.  
  </p>

  <p className="mb-6">
    <strong>Disclaimer:</strong> We are not responsible for any accidental naming of yourself after a medieval cheese or a Pokémon. But hey, that’s part of the fun, right?  
  </p>

  <p className="mb-6">
    Ready to roll the dice on your destiny? Let’s find out if you’re a “McPickle” or a “Frostbloom”! 🎲✨
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