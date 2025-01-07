'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';

const sampleData = {
  races: {
    elf: {
      prefixes: ['Ae', 'Gala', 'Cele', 'Fae', 'Thala', 'Ama', 'Ara', 'Eo', 'Nar', 'Syl'],
      suffixes: ['driel', 'rion', 'thien', 'wen', 'dor', 'rian', 'thir', 'lis', 'dan', 'wyn'],
      titles: ['Starweaver', 'Moonwhisper', 'Lightbringer', 'Dawnwalker', 'Nightsinger']
    },
    dwarf: {
      prefixes: ['Thor', 'Dur', 'Brom', 'Gim', 'Bar', 'Dwal', 'Bur', 'Gor', 'Thur', 'Kar'],
      suffixes: ['in', 'dim', 'dur', 'mir', 'grim', 'gar', 'din', 'li', 'dor', 'thur'],
      titles: ['Ironbeard', 'Stonefist', 'Hammerlord', 'Forgemaster', 'Mountainheart']
    },
    orc: {
      prefixes: ['Grul', 'Mog', 'Gar', 'Urg', 'Zog', 'Krag', 'Gor', 'Durg', 'Skar', 'Rok'],
      suffixes: ['ash', 'ul', 'og', 'nak', 'mar', 'thor', 'gul', 'rok', 'thar', 'gash'],
      titles: ['the Destroyer', 'Skullcrusher', 'Bloodfist', 'Bonecrusher', 'Ironhide']
    },
    dragon: {
      prefixes: ['Dra', 'Kae', 'Vor', 'Zir', 'Rha', 'Bal', 'Nyx', 'Tia', 'Syl', 'Vae'],
      suffixes: ['xis', 'thor', 'gon', 'thas', 'mor', 'rion', 'zar', 'rix', 'ros', 'kris'],
      titles: ['the Ancient', 'Flamebringer', 'Stormbringer', 'Skywarden', 'Doomharbinger']
    },
    human: {
      prefixes: ['Al', 'Ric', 'Ed', 'Gar', 'Wil', 'Rod', 'Theo', 'Mal', 'Ber', 'Ral'],
      suffixes: ['ard', 'win', 'mund', 'fred', 'bert', 'rick', 'wick', 'ton', 'ward', 'mer'],
      titles: ['the Brave', 'the Wise', 'the Noble', 'the Just', 'the Valiant']
    },
    fae: {
      prefixes: ['Thi', 'Pix', 'Lum', 'Glo', 'Twi', 'Shi', 'Spar', 'Glit', 'Shim', 'Star'],
      suffixes: ['light', 'wing', 'spark', 'bell', 'shine', 'whisp', 'dust', 'beam', 'glow', 'mist'],
      titles: ['Dreamweaver', 'Stardancer', 'Moonblessed', 'Lightbringer', 'Twilightwalker']
    }
  },
  elements: {
    fire: ['Flame', 'Blaze', 'Inferno', 'Ember', 'Ash', 'Phoenix', 'Scorch', 'Burn'],
    water: ['Wave', 'Tide', 'Ocean', 'Stream', 'River', 'Rain', 'Mist', 'Frost'],
    earth: ['Stone', 'Rock', 'Mountain', 'Crystal', 'Gem', 'Terra', 'Quartz', 'Onyx'],
    air: ['Wind', 'Storm', 'Breeze', 'Gale', 'Cloud', 'Sky', 'Thunder', 'Whisper'],
    light: ['Sun', 'Star', 'Dawn', 'Day', 'Radiant', 'Shine', 'Glow', 'Bright'],
    shadow: ['Night', 'Dusk', 'Shade', 'Dark', 'Shadow', 'Twilight', 'Void', 'Eclipse']
  },
  virtues: ['Brave', 'Wise', 'Swift', 'True', 'Bold', 'Fair', 'Noble', 'Pure'],
  realms: ['Mysthaven', 'Eldoria', 'Sylvanor', 'Drakenheim', 'Stormfall', 'Irondeep'],
  magicTypes: ['Arcane', 'Divine', 'Natural', 'Elemental', 'Mystical', 'Primal'],
  nameStyles: {
    noble: ['of the', 'from', 'von', 'of House', 'of Clan', 'of the Realm'],
    magical: ['the Enchanted', 'the Mystic', 'the Spellbound', 'the Arcane'],
    warrior: ['the Brave', 'the Mighty', 'the Valiant', 'the Fierce'],
    nature: ['of the Forest', 'of the Mountains', 'of the Rivers', 'of the Stars']
  }
};

export default function FantasyNameGenerator() {
  const [formData, setFormData] = useState({
    race: '',
    element: '',
    style: 'noble',
    isHeroic: false,
    isMagical: false
  });
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateFantasyName() {
    const names = new Set<string>();
    const { race, element, style, isHeroic, isMagical } = formData;

    // Helper function to get random item from array
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Basic name generation based on race
    function generateBaseName(): string {
      if (race && sampleData.races[race as keyof typeof sampleData.races]) {
        const raceData = sampleData.races[race as keyof typeof sampleData.races];
        return getRandom(raceData.prefixes) + getRandom(raceData.suffixes);
      }
      // Default human name if no race selected
      const humanData = sampleData.races.human;
      return getRandom(humanData.prefixes) + getRandom(humanData.suffixes);
    }

    // Generate multiple name variations
    for (let i = 0; i < 3; i++) {
      // Basic name
      const baseName = generateBaseName();
      names.add(baseName);

      // Add titles and styles
      if (style && sampleData.nameStyles[style as keyof typeof sampleData.nameStyles]) {
        const styleElements = sampleData.nameStyles[style as keyof typeof sampleData.nameStyles];
        names.add(`${baseName} ${getRandom(styleElements)}`);
      }

      // Add heroic elements
      if (isHeroic) {
        names.add(`${baseName} the ${getRandom(sampleData.virtues)}`);
        if (race) {
          const raceData = sampleData.races[race as keyof typeof sampleData.races];
          names.add(`${baseName} ${getRandom(raceData.titles)}`);
        }
      }

      // Add magical elements
      if (isMagical) {
        names.add(`${baseName} the ${getRandom(sampleData.magicTypes)}`);
        if (element && sampleData.elements[element as keyof typeof sampleData.elements]) {
          const elementWords = sampleData.elements[element as keyof typeof sampleData.elements];
          names.add(`${baseName} ${getRandom(elementWords)}weaver`);
        }
      }

      // Add realm-based names
      names.add(`${baseName} of ${getRandom(sampleData.realms)}`);

      // Add element-based names if element selected
      if (element && sampleData.elements[element as keyof typeof sampleData.elements]) {
        const elementWords = sampleData.elements[element as keyof typeof sampleData.elements];
        names.add(`${baseName} ${getRandom(elementWords)}born`);
      }
    }

    return Array.from(names).slice(0, 10);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedResults = generateFantasyName();
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
      race: Object.keys(sampleData.races)[Math.floor(Math.random() * Object.keys(sampleData.races).length)],
      element: Object.keys(sampleData.elements)[Math.floor(Math.random() * Object.keys(sampleData.elements).length)],
      style: Object.keys(sampleData.nameStyles)[Math.floor(Math.random() * Object.keys(sampleData.nameStyles).length)],
      isHeroic: Math.random() > 0.5,
      isMagical: Math.random() > 0.5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Fantasy Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create magical and mystical names for your fantasy characters! Whether you're 
            naming an elegant elf, a sturdy dwarf, or a mysterious wizard, our generator 
            will craft the perfect name. Choose your character's race, elements, and style 
            to generate names that resonate with the magic of fantasy realms.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Race
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.race}
                onChange={(e) => setFormData({...formData, race: e.target.value})}
              >
                <option value="">Choose a Race</option>
                <option value="elf">Elf</option>
                <option value="dwarf">Dwarf</option>
                <option value="orc">Orc</option>
                <option value="dragon">Dragon</option>
                <option value="human">Human</option>
                <option value="fae">Fae</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Element Affinity
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.element}
                onChange={(e) => setFormData({...formData, element: e.target.value})}
              >
                <option value="">Choose an Element</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="air">Air</option>
                <option value="light">Light</option>
                <option value="shadow">Shadow</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="noble">Noble</option>
                <option value="magical">Magical</option>
                <option value="warrior">Warrior</option>
                <option value="nature">Nature</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isHeroic"
                  checked={formData.isHeroic}
                  onChange={(e) => setFormData({...formData, isHeroic: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="isHeroic" className="text-sm text-gray-700">
                  Add Heroic Titles
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isMagical"
                  checked={formData.isMagical}
                  onChange={(e) => setFormData({...formData, isMagical: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="isMagical" className="text-sm text-gray-700">
                  Add Magical Elements
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Names
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
              Your Fantasy Names:
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

      <div className="max-w-3xl mx-auto">
 <h2 className="text-3xl font-bold mb-6">The Art of Fantasy Names: A Creator's Guide</h2>

 <h3 className="text-2xl font-semibold mb-4">Structure and Pattern: Building Strong Names</h3>
 <p className="mb-6">
   Fantasy names need a consistent internal logic. Whether crafting names like "Aerindel" or "Thormak," establish clear patterns in how syllables connect and flow. This helps create names that feel like they belong to the same world or culture, while remaining pronounceable and memorable.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Cultural Markers: Language Families</h3>
 <p className="mb-6">
   Different cultures within your world should have distinct naming conventions. Nordic-inspired cultures might favor names like "Bjornhild" or "Sigrid," while elven societies might use flowing names like "Caelindril" or "Faerondal." These patterns help readers instantly recognize cultural origins.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Social Status: Class and Rank</h3>
 <p className="mb-6">
   Names often reflect social standing. Noble houses might use grand, multi-syllabic names like "Ravencrest" or "Moonweaver," while common folk might have simpler names like "Tam" or "Bree." Consider how class structures influence naming conventions in your world.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Magic and Power: Mystical Names</h3>
 <p className="mb-6">
   Names tied to magic often carry distinct patterns. "Zeth'kur" or "Mael'thoras" might mark spellcasters, while sacred titles like "Lightbringer" or "Stormblade" could denote magical lineage. These names often use apostrophes, unusual letter combinations, or specific suffixes to convey supernatural elements.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Nature Connection: Environmental Names</h3>
 <p className="mb-6">
   Natural elements often inspire fantasy names. "Ashfall," "Wintermist," or "Dawnfire" connect characters to their environment or special abilities. These names can be especially effective for druids, rangers, or nature-linked cultures.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Ancient Legacy: Historical Names</h3>
 <p className="mb-6">
   Old bloodlines and legendary figures often have distinct naming patterns. Consider how names might evolve over generations, like "Kor'thad" becoming "Korthan" in modern usage. This adds depth to your world's linguistic history.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Professional Identity: Occupational Names</h3>
 <p className="mb-6">
   Trades and skills can influence names. "Fletcherson," "Ironweaver," or "Spellsmith" might indicate family traditions or personal abilities. These names help ground characters in their world's economic and social systems.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Prophecy and Destiny: Fated Names</h3>
 <p className="mb-6">
   Some characters might carry names of prophecy or destiny. "Shadowbane," "Truthseeker," or "Stormborn" can mark characters for greater purpose. Use these sparingly to maintain their impact.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Species and Race: Biological Names</h3>
 <p className="mb-6">
   Different species might have distinct naming conventions. Dwarven names might be robust and consonant-heavy like "Grimkhor," while fairy names might be light and musical like "Thistle." These patterns help readers quickly identify and remember character origins.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Title Evolution: Earned Names</h3>
 <p className="mb-6">
   Characters might gain new names through deeds or transformation. "Oakenhart" might become "Oakenblade" after proving martial prowess, or "Greenleaf" might change to "Goldleaf" upon mastering nature magic. These changes mark character growth and achievement.
 </p>

 <p className="mb-6">
   Remember: effective fantasy names balance uniqueness with accessibility. They should intrigue readers while remaining memorable and pronounceable. The best names feel both exotic and natural, as if they've existed in your world for generations.
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