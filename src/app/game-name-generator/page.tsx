'use client';
import React, { useState } from 'react';
import { Copy, CheckCheck, Gamepad2 } from 'lucide-react';
import { gameNameData } from '@/data/gameNameData';
import type { 
  GameGenre, 
  GameStyle, 
  GameTheme,
  GameSubstyle,
  GeneratedGameName 
} from '@/data/gameNameData';

interface FormData {
  genre: GameGenre;
  style: GameStyle;
  theme: GameTheme;
  substyle: GameSubstyle;
  count: number;
}

export default function GameNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    genre: 'any',
    style: 'standard',
    theme: 'any',
    substyle: 'none',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedGameName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random genre
  const getRandomGenre = (): GameGenre => {
    const genres = ['action', 'fantasy', 'scifi', 'strategy'];
    return getRandom(genres) as GameGenre;
  };

  // Generate standard name
  const generateStandardName = (genre: GameGenre): string => {
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    return `${prefix} ${noun}`;
  };

  // Generate extended name
  const generateExtendedName = (genre: GameGenre): string => {
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]); 
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${prefix} ${noun} ${suffix}`;
  };

  // Generate compound name
  const generateCompoundName = (genre: GameGenre): string => {
    const noun1 = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const noun2 = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    return `${noun1} of ${noun2}`;
  };

  // Generate subtitle name
  const generateSubtitleName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${noun}: ${suffix}`;
  };

  // Generate series name
  const generateSeriesName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const number = Math.floor(Math.random() * 5) + 1;
    return `${noun} ${number}`;
  };

  // Generate spin name
  const generateSpinName = (genre: GameGenre): string => {
    const noun = getRandom(gameNameData.nouns[genre as keyof typeof gameNameData.nouns]);
    const prefix = getRandom(gameNameData.prefixes[genre as keyof typeof gameNameData.prefixes]);
    const suffix = getRandom(gameNameData.suffixes[genre as keyof typeof gameNameData.suffixes]);
    return `${noun}: ${prefix} ${suffix}`;
  };

  // Add theme elements
  const addThemeElements = (name: string, theme: GameTheme): string => {
    if (theme === 'any') return name;
    const themeWord = getRandom(gameNameData.themes[theme]);
    return Math.random() > 0.5 ? `${themeWord} ${name}` : `${name} of ${themeWord}`;
  };

  // Add substyle elements
  const addSubstyleElements = (name: string, substyle: GameSubstyle): string => {
    if (substyle === 'none') return name;
    const substyleWord = getRandom(gameNameData.substyles[substyle]);
    return `${substyleWord} ${name}`;
  };

  // Generate a name based on criteria
  const generateName = (): GeneratedGameName => {
    const { genre, style, theme, substyle } = formData;
    const selectedGenre = genre === 'any' ? getRandomGenre() : genre;
    
    let baseName: string;
    switch (style) {
      case 'extended':
        baseName = generateExtendedName(selectedGenre);
        break;
      case 'compound':
        baseName = generateCompoundName(selectedGenre);
        break;
      case 'subtitle':
        baseName = generateSubtitleName(selectedGenre);
        break;
      case 'series':
        baseName = generateSeriesName(selectedGenre);
        break;
      case 'spin':
        baseName = generateSpinName(selectedGenre);
        break;
      default:
        baseName = generateStandardName(selectedGenre);
    }

    // Add theme and substyle elements
    let finalName = baseName;
    if (theme !== 'any') {
      finalName = addThemeElements(finalName, theme);
    }
    if (substyle !== 'none') {
      finalName = addSubstyleElements(finalName, substyle);
    }

    return {
      name: finalName,
      genre: selectedGenre,
      theme: theme === 'any' ? undefined : theme,
      style
    };
  };

  const generateNames = (): GeneratedGameName[] => {
    const names: GeneratedGameName[] = [];
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

  const copyToClipboard = async (name: GeneratedGameName, index: number) => {
    try {
      await navigator.clipboard.writeText(name.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Gamepad2 className="h-8 w-8 text-violet-600" />
          Game Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate creative and unique game names for different genres and styles.
            Perfect for game developers, designers, and enthusiasts.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value as GameGenre})}
                >
                  <option value="any">Any Genre</option>
                  <option value="action">Action</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="strategy">Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as GameStyle})}
                >
                  <option value="standard">Standard</option>
                  <option value="extended">Extended</option>
                  <option value="compound">Compound</option>
                  <option value="subtitle">Subtitle</option>
                  <option value="series">Series</option>
                  <option value="spin">Spin-off</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme</label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value as GameTheme})}
                >
                  <option value="any">Any Theme</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  value={formData.substyle}
                  onChange={(e) => setFormData({...formData, substyle: e.target.value as GameSubstyle})}
                >
                  <option value="none">None</option>
                  <option value="retro">Retro</option>
                  <option value="indie">Indie</option>
                  <option value="epic">Epic</option>
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Generate Game Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Game Names
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
                          Genre: {name.genre}
                        </span>
                        {name.theme && (
                          <span className="inline-block mr-3">
                            Theme: {name.theme}
                          </span>
                        )}
                        <span className="inline-block">
                          Style: {name.style}
                        </span>
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
 <h2 className="text-3xl font-bold mb-6">Naming Your Game: From Concept to Classic</h2>

 <p className="mb-6">
   A great game name can be the difference between a scroll-past and a must-play. Think about it: would "Among Us" have been as catchy if it was called "Space Detective"? Or would "Elden Ring" have carried the same mystique if it was simply "Dark Fantasy RPG"? The right name captures imagination, hints at gameplay, and sticks in players' minds.
 </p>

 <h3 className="text-2xl font-semibold mb-4">What Makes a Game Name Work?</h3>

 <p className="mb-6">
   The best game names do three things at once: they intrigue potential players, reflect the game's content, and stand out in a crowded marketplace. "Minecraft" brilliantly describes its core mechanics while being uniquely memorable. "Red Dead Redemption" evokes both its Western setting and emotional themes. "Portal" manages to be both literally descriptive and mysteriously compelling.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Genre Conventions and Breaking Them</h3>

 <p className="mb-6">
   Each gaming genre has its own naming patterns. RPGs often use epic fantasy words ("Final Fantasy," "Dragon Quest"). FPS games frequently opt for punchy, action-oriented titles ("Doom," "Halo"). Indie games tend toward the quirky and distinctive ("Untitled Goose Game," "Stardew Valley"). Understanding these conventions lets you either follow them for instant recognition or subvert them for attention.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Modern Naming Trends</h3>

 <p className="mb-6">
   Recent trends show a move toward simpler, bolder names. Single words with deep meaning ("Cyberpunk," "Valorant"), compound words that create new concepts ("Fortnite," "Minecraft"), or abstract terms that become uniquely associated with the game ("Apex Legends," "Overwatch"). Mobile games often use action words with fun modifiers ("Candy Crush," "Angry Birds") to stand out in app stores.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Practical Tips</h3>

 <p className="mb-6">
   Before finalizing your game's name, check its availability - not just as a domain name, but across all major gaming platforms and social media. Consider how it sounds when spoken, how it looks in a logo, and whether it's easily searchable. Avoid names too similar to existing games, and test how it translates into other languages if you're planning an international release.
 </p>

 <p className="mb-6">
   Remember that some of gaming's biggest hits had working titles that were completely different. "Doom" was originally "It's Green and Pissed," and "Rocket League" started as "Supersonic Acrobatic Rocket-Powered Battle-Cars" (yes, really). Don't be afraid to iterate on your name as your game evolves.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Testing Your Name</h3>

 <p className="mb-6">
   Once you have a shortlist, try saying each name out loud. Imagine a friend asking "What are you playing?" Your answer should feel natural. Test the name with your target audience - does it create the right expectations? Does it make them want to know more? A good game name should spark curiosity and conversation.
 </p>

 <p className="mb-6">
   Ready to find the perfect name for your game? Our generator combines genre awareness with creative wordplay to help you discover names that could become the next gaming sensation. Whether you're crafting an indie darling or dreaming up an AAA blockbuster, let's find a name that matches your vision.
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