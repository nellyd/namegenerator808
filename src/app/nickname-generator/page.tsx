'use client';
import { useState } from 'react';
import { Copy, CheckCheck, Wand2, ChevronDown, ChevronUp } from 'lucide-react';
import { GamepadIcon,  // For gaming context
  BriefcaseIcon,  // For professional context
  UsersIcon,  // For casual context
  HashIcon,  // For social media context
  RefreshCcw, // For refresh button
} from 'lucide-react';

type NicknameType = {
  nickname: string;
  type: 'basic' | 'gaming' | 'professional' | 'social' | 'adjective' | 'middle';
  color: string;
};

const exampleAdjectives = {
  personality: [
    'clever', 'brave', 'witty', 'gentle', 'wise', 'fierce', 'cheerful', 'calm'
  ],
  physical: [
    'swift', 'mighty', 'tall', 'quick', 'strong', 'agile', 'nimble', 'tough'
  ],
  descriptive: [
    'bright', 'smooth', 'cool', 'wild', 'sharp', 'jazzy', 'epic', 'bold'
  ],
  talent: [
    'crafty', 'skillful', 'artistic', 'musical', 'sporty', 'brainy', 'creative', 'gifted'
  ],
  interests: [
    'gamer', 'dancer', 'reader', 'writer', 'athlete', 'artist', 'coder', 'chef',
    'photographer', 'musician', 'traveler', 'collector', 'builder', 'designer'
  ]
};

const sampleData = {
  maleNames: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph'],
  femaleNames: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Margaret'],
  lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
};



export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'male',
    adjectives: ['', '', '', '']
  });
  const [showAdjectives, setShowAdjectives] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [resultLimit, setResultLimit] = useState<number>(10);
  
  // New state variables for advanced options
  const [context, setContext] = useState<'casual' | 'gaming' | 'professional' | 'social'>('casual');
  const [interests, setInterests] = useState<string[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  function generateNicknames(firstName: string, middleName: string, lastName: string, gender: string, adjectives: string[]) {
    const nicknames = new Set<string>();

    // Helper functions
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
  // Expanded lists of cool elements
  const coolSuffixes = [
    'ator', 'meister', 'master', '-dawg', '-dog', 'man', 'star', 'thunder',
    'zilla', 'matic', 'tron', 'guru', 'ninja', 'beast', 'machine', 'wizard',
    'warrior', 'hunter', 'king', 'ace', 'prime', 'hero', 'legend'
  ];

  const coolPrefixes = [
    'Dr.', 'Captain', 'Chief', 'Big', 'DJ', 'MC', 'Sir', 'Lord', 'General',
    'Professor', 'Coach', 'Agent', 'Commander', 'Master', 'King', 'Boss'
  ];

  const epicTitles = [
    'the Great', 'the Mighty', 'the Conqueror', 'the Legend', 'the Boss', 
    'the Magnificent', 'the Unstoppable', 'the Incredible', 'the Legendary',
    'the Wise', 'the Brave', 'the Swift', 'the Fierce', 'the Brilliant',
    'the Mystic', 'the Champion', 'the Victorious', 'the Tremendous'
  ];

  const coolWords = [
    'Thunder', 'Lightning', 'Storm', 'Blitz', 'Flash', 'Ace', 'Rex', 'Max',
    'Titan', 'Phoenix', 'Dragon', 'Wolf', 'Tiger', 'Eagle', 'Hawk', 'Bear'
  ];

  const stylishElements = [
    'Gold', 'Silver', 'Diamond', 'Steel', 'Iron', 'Bronze', 'Platinum', 
    'Crystal', 'Shadow', 'Light', 'Dark', 'Frost', 'Flame', 'Blaze'
  ];

  // Basic name variations
  if (firstName.length > 2) {
    nicknames.add(`${firstName.slice(0, -1)}ie`);
    nicknames.add(`${firstName.slice(0, -1)}y`);
    nicknames.add(`${firstName}ster`);
    nicknames.add(`${firstName}-boy`);
    nicknames.add(`${firstName}-dude`);
  }

  // Stylish combinations
  stylishElements.forEach(element => {
    nicknames.add(`${element} ${firstName}`);
    nicknames.add(`${firstName} of ${element}`);
  });

  // Cool word combinations
  coolWords.forEach(word => {
    nicknames.add(`${firstName} ${word}`);
    nicknames.add(`${word} ${lastName}`);
    nicknames.add(`The ${word}`);
  });

  // Special patterns
  nicknames.add(`${firstName} the ${lastName}`);
  nicknames.add(`${firstName} aka ${lastName}`);
  nicknames.add(`The Real ${firstName}`);
  nicknames.add(`The One ${firstName}`);
  nicknames.add(`${firstName} Prime`);
  nicknames.add(`${firstName} Elite`);
  nicknames.add(`${lastName} Supreme`);
  nicknames.add(`${firstName} Ultra`);
  nicknames.add(`Mega ${firstName}`);
  nicknames.add(`Super ${firstName}`);
  nicknames.add(`${firstName} Force`);
  nicknames.add(`${firstName} Energy`);
  nicknames.add(`${firstName} Omega`);
  nicknames.add(`${firstName} Alpha`);
  nicknames.add(`${firstName} Delta`);
  nicknames.add(`${firstName} Prime`);
  nicknames.add(`${firstName} Classic`);
  nicknames.add(`${firstName} Legacy`);
  nicknames.add(`${firstName} Dynasty`);

  // Professional variations
  nicknames.add(`${firstName[0]}. ${lastName}`);
  nicknames.add(`${firstName} ${lastName[0]}.`);
  nicknames.add(`${firstName[0]}-${lastName}`);
  nicknames.add(`${firstName}.${lastName}`);

  // Cool modern combinations
  nicknames.add(`${firstName.toLowerCase()}_${lastName.toLowerCase()}`);
  nicknames.add(`the.${firstName.toLowerCase()}`);
  nicknames.add(`${firstName.toLowerCase()}.official`);
  nicknames.add(`real.${firstName.toLowerCase()}`);
  nicknames.add(`${firstName.toLowerCase()}_original`);
  nicknames.add(`${firstName.toLowerCase()}_prime`);
  nicknames.add(`${firstName.toLowerCase()}_elite`);
  nicknames.add(`the_real_${firstName.toLowerCase()}`);
  nicknames.add(`${firstName.toLowerCase()}_world`);
  nicknames.add(`${firstName.toLowerCase()}_nation`);
  nicknames.add(`team_${firstName.toLowerCase()}`);

  // Gaming-style names
  if (context === 'gaming') {
    const gamingTags = [
      `${firstName}Gaming`,
      `${firstName}Plays`,
      `Pro${firstName}`,
      `${firstName}TV`,
      `${firstName}Stream`,
      `${firstName}Live`,
      `${firstName}YT`,
      `${firstName}Twitch`,
      `${firstName}Pro`,
      `${firstName}Game`,
      `${firstName}Player`,
      `${firstName}Victory`,
      `${firstName}Win`,
      `${firstName}Champion`,
      `${firstName}Legend`,
      `${firstName}Boss`,
      `Game${firstName}`,
      `${firstName}Master`,
    ];
    gamingTags.forEach(tag => nicknames.add(tag));
  }



  // Title combinations
  epicTitles.forEach(title => {
    nicknames.add(`${firstName} ${title}`);
    nicknames.add(`${lastName} ${title}`);
  });


  // Last name magic
  if (lastName) {
    coolSuffixes.forEach(suffix => {
      nicknames.add(`${lastName}${suffix}`);
    });
    nicknames.add(`${lastName} Time`);
    nicknames.add(`The ${lastName} Effect`);
    nicknames.add(`${lastName} Power`);
    nicknames.add(`The ${lastName} Experience`);
  }

    // Basic patterns
    nicknames.add(firstName.substring(0, 3) + 'y');
    nicknames.add(firstName[0] + '.' + lastName[0] + '.');
    nicknames.add(firstName.substring(0, 3));
    nicknames.add(firstName.substring(0, 1) + lastName.substring(0, 3));
    
    // Context-specific patterns
    if (context === 'gaming') {
      nicknames.add(`${firstName}Gaming`);
      nicknames.add(`${firstName}Pro`);
      nicknames.add(`Pro${firstName}`);
      nicknames.add(`${firstName}Plays`);
    } else if (context === 'professional') {
      nicknames.add(`${firstName}.${lastName}`);
      nicknames.add(`${firstName[0]}${lastName}`);
      nicknames.add(`${firstName}.${lastName[0]}`);
    } else if (context === 'social') {
      nicknames.add(`${firstName.toLowerCase()}_${lastName.toLowerCase()}`);
      nicknames.add(`the.${firstName.toLowerCase()}`);
      nicknames.add(`${firstName.toLowerCase()}.official`);
    }

    // Gender-specific patterns
    if (gender === 'male') {
      nicknames.add('Big ' + firstName);
      nicknames.add('The ' + firstName + 'ster');
      nicknames.add(firstName.substring(0, 3) + 'er');
      nicknames.add('King ' + firstName);
      nicknames.add('Captain ' + firstName);
    } else {
      nicknames.add(firstName + 'ie');
      nicknames.add(firstName.substring(0, 3) + 'ette');
      nicknames.add('Miss ' + firstName.substring(0, 1));
      nicknames.add('Queen ' + firstName);
      nicknames.add('Lady ' + firstName);
    }

    // Middle name patterns
    if (middleName) {
      nicknames.add(`${firstName[0]}${middleName[0]}${lastName[0]}`);
      nicknames.add(`${firstName}${middleName[0]}.`);
      nicknames.add(`${firstName[0]}${middleName[0]}-${lastName}`);
      nicknames.add(`${firstName[0]}.${middleName[0]}.${lastName[0]}.`);
      if (firstName.length >= 2 && middleName.length >= 2) {
        nicknames.add(firstName.substring(0, 2) + middleName.substring(0, 2));
      }
    }

    // Interest-based patterns
    interests.forEach(interest => {
      nicknames.add(`${firstName}The${interest}`);
      nicknames.add(`${interest}${firstName}`);
      if (lastName) {
        nicknames.add(`${interest}${lastName}`);
      }
    });

     // Double-barrel combinations
  if (firstName.length > 2 && lastName.length > 2) {
    nicknames.add(`${firstName.slice(0, 3)}-${lastName.slice(0, 3)}`);
    nicknames.add(`${firstName.slice(0, 2)}${lastName.slice(0, 2)}`);
    nicknames.add(`${firstName[0]}${lastName[0]}-Force`);
    nicknames.add(`${firstName[0]}${lastName[0]}-Team`);
  }

  // Initials with style
  const initials = `${firstName[0]}${lastName[0]}`;
  nicknames.add(`${initials} Elite`);
  nicknames.add(`${initials} Prime`);
  nicknames.add(`${initials} Force`);
  nicknames.add(`Team ${initials}`);

  // Special character replacements
  const leetSpeak = firstName.toLowerCase()
    .replace('a', '@')
    .replace('e', '3')
    .replace('i', '1')
    .replace('o', '0');
  nicknames.add(leetSpeak);

     // Adjective-based combinations
  const validAdjectives = adjectives.filter(adj => adj.trim() !== '');
  if (validAdjectives.length > 0) {
    validAdjectives.forEach(adj => {
      nicknames.add(`${capitalize(adj)} ${firstName}`);
      nicknames.add(`The ${adj} ${firstName}`);
      nicknames.add(`${firstName} the ${capitalize(adj)}`);
      if (adj[0].toLowerCase() === firstName[0].toLowerCase()) {
        nicknames.add(`${adj}${firstName}`);
      }
    });
  }

  return Array.from(nicknames)
  .filter(Boolean)
  .filter(nickname => nickname.length >= 2 && nickname.length <= 30)
  .filter(nickname => /^[a-zA-Z0-9\s._@-]+$/.test(nickname)) // Only allow certain characters
  .sort((a, b) => a.length - b.length);
}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = generateNicknames(
      formData.firstName,
      formData.middleName,
      formData.lastName,
      formData.gender,
      formData.adjectives
    );
    setNicknames(results.slice(0, resultLimit));
    setCopiedIndex(null);
  };

  const copyToClipboard = async (nickname: string, index: number) => {
    try {
      await navigator.clipboard.writeText(nickname);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillRandomData = () => {
    const nameArray = formData.gender === 'male' ? sampleData.maleNames : sampleData.femaleNames;
    const randomFirst = nameArray[Math.floor(Math.random() * nameArray.length)];
    const randomMiddle = Math.random() > 0.5 ? nameArray[Math.floor(Math.random() * nameArray.length)] : '';
    const randomLast = sampleData.lastNames[Math.floor(Math.random() * sampleData.lastNames.length)];
    const randomAdjectives = Array(4).fill('').map(() => '');
    
    setFormData(prev => ({
      ...prev,
      firstName: randomFirst,
      middleName: randomMiddle,
      lastName: randomLast,
      adjectives: randomAdjectives
    }));
  };

  const handleAdjectiveChange = (index: number, value: string) => {
    const newAdjectives = [...formData.adjectives];
    newAdjectives[index] = value;
    setFormData(prev => ({
      ...prev,
      adjectives: newAdjectives
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-blue-600" />
          Nickname Generator
        </h1>

        {/* Introduction Text */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Generate Yourself A New Nickname
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Ready for a fresh start or just looking for something catchy? Finding the perfect 
            nickname isn't always easy, but we're here to help! Our nickname generator offers 
            a mix of options, from clever twists on your name to imaginative, one-of-a-kind 
            suggestions. Whether you're after something cool, quirky, or just plain fun, 
            explore a world of nicknames crafted to fit your style. Let's find the one 
            that's truly yours!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
                <span className="text-gray-400 text-xs ml-2">(optional)</span>
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.middleName}
                onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                placeholder="Enter middle name (if any)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Advanced Options Section */}
            {showAdvancedOptions && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Nickname Context
  </label>
  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() => setContext('casual')}
      className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
        context === 'casual' 
          ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <UsersIcon className="h-5 w-5" />
      <span>Casual/Friendly</span>
    </button>
    
    <button
      type="button"
      onClick={() => setContext('gaming')}
      className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
        context === 'gaming' 
          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <GamepadIcon className="h-5 w-5" />
      <span>Gaming</span>
    </button>
    
    <button
      type="button"
      onClick={() => setContext('professional')}
      className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
        context === 'professional' 
          ? 'bg-gray-200 text-gray-700 border-2 border-gray-500' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <BriefcaseIcon className="h-5 w-5" />
      <span>Professional</span>
    </button>
    
    <button
      type="button"
      onClick={() => setContext('social')}
      className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
        context === 'social' 
          ? 'bg-pink-100 text-pink-700 border-2 border-pink-500' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <HashIcon className="h-5 w-5" />
      <span>Social Media</span>
    </button>
  </div>
</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interests/Hobbies (Select up to 3)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {exampleAdjectives.interests.map((interest, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={interests.includes(interest)}
                          onChange={(e) => {
                            if (e.target.checked && interests.length < 3) {
                              setInterests([...interests, interest]);
                            } else if (!e.target.checked) {
                              setInterests(interests.filter(i => i !== interest));
                            }
                          }}
                          disabled={!interests.includes(interest) && interests.length >= 3}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-600">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
            >
              {showAdvancedOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
            </button>

            <div className="border-t pt-4">
              <button
                type="button"
                onClick={() => setShowAdjectives(!showAdjectives)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {showAdjectives ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Optional: Add Descriptive Adjectives
              </button>

              {showAdjectives && (
                <div className="mt-4 space-y-3">
                  <div className="text-sm text-gray-500 mb-2">
                    Add descriptive words to create more personalized nicknames
                  </div>
                  {formData.adjectives.map((adj, index) => {
                    const category = Object.keys(exampleAdjectives)[index % Object.keys(exampleAdjectives).length];
                    const examples = exampleAdjectives[category as keyof typeof exampleAdjectives];
                    const randomExample = examples[Math.floor(Math.random() * examples.length)];
                    
                    return (
                      <div key={index}>
                        <input
                          type="text"
                          value={adj}
                          onChange={(e) => handleAdjectiveChange(index, e.target.value)}
                          placeholder={`Example: ${randomExample}`}
                          className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <div className="text-xs text-gray-400 mt-1 ml-1">
                          {index === 0 && "Personality trait (e.g., clever, brave, gentle)"}
                          {index === 1 && "Physical trait (e.g., swift, mighty, tough)"}
                          {index === 2 && "Descriptive word (e.g., cool, wild, sharp)"}
                          {index === 3 && "Special talent (e.g., crafty, artistic, sporty)"}
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-xs text-gray-500 mt-2">
                    💡 Tip: Try using words that start with the same letter as the name for cool alliterative nicknames!
                  </div>
                </div>
              )}
            </div>

            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Number of Nicknames
  </label>
  <select 
    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    value={resultLimit}
    onChange={(e) => setResultLimit(Number(e.target.value))}
  >
    <option value={5}>5 nicknames</option>
    <option value={10}>10 nicknames</option>
    <option value={15}>15 nicknames</option>
    <option value={20}>20 nicknames</option>
    <option value={25}>25 nicknames</option>
  </select>
</div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Nickname
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

        <button
    type="button"
    onClick={() => {
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: 'male',
        adjectives: ['', '', '', '']
      });
      setNicknames([]);
      setContext('casual');
      setInterests([]);
      setShowAdvancedOptions(false);
      setShowAdjectives(false);
    }}
    className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    title="Clear form"
  >
    <RefreshCcw className="h-5 w-5" />
  </button>

  

  {nicknames.length > 0 && (
  <div 
    className="bg-white rounded-lg shadow-lg p-6 animate-[fadeIn_0.5s_ease-in]"
  >
    <h2 className="text-2xl font-bold mb-4 text-gray-800">
      Your Nicknames:
    </h2>
    <div className="grid gap-2">
      {nicknames.map((nickname, index) => {
        // Determine nickname type and color
        let bgColor = 'bg-gray-50 hover:bg-gray-100';
        let textColor = 'text-gray-700';
        
        if (nickname.includes('Gaming') || nickname.includes('Pro')) {
          bgColor = 'bg-purple-50 hover:bg-purple-100';
          textColor = 'text-purple-700';
        } else if (nickname.includes('.') && !nickname.includes('@')) {
          bgColor = 'bg-gray-100 hover:bg-gray-200';
          textColor = 'text-gray-900';
        } else if (nickname.includes('@') || nickname.includes('_')) {
          bgColor = 'bg-pink-50 hover:bg-pink-100';
          textColor = 'text-pink-700';
        } else if (nickname.includes('The') || nickname.includes('mighty')) {
          bgColor = 'bg-blue-50 hover:bg-blue-100';
          textColor = 'text-blue-700';
        }

        return (
          <div 
            key={index}
            className={`group p-3 rounded-md transition-all duration-300 flex justify-between items-center animate-[slideIn_0.3s_ease-out] ${bgColor} ${textColor}`}
            style={{
              animation: `slideIn 0.3s ease-out ${index * 0.1}s`,
              transform: 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
          >
            <span className="font-medium">{nickname}</span>
            <button
              onClick={() => copyToClipboard(nickname, index)}
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
        );
      })}
    </div>
  </div>
)}
      </div>

      <style jsx global>{`
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`}</style>
    </div>
  );
}