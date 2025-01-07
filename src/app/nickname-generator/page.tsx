'use client';
import React, { useState } from 'react';
import { Wand2, Copy, CheckCheck } from 'lucide-react';
import { nicknameData, nameUtils } from '@/data/nicknameData';

type NicknameStyle = 'personality' | 'gaming' | 'fantasy' | 'professional' | 'alliteration' | 'rhyming';

export default function NicknameGenerator() {
  const [formData, setFormData] = useState({
    style: '',
    baseName: '',
    includeNumbers: false,
    useSuffix: false
  });
  
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateNicknames() {
    const nicknames: string[] = [];
    const { style, baseName, includeNumbers, useSuffix } = formData;
    
    for (let i = 0; i < 8; i++) {
      let nickname = '';
      
      switch (style as NicknameStyle) {
        case 'personality':
          nickname = `${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.personality))}${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.interests))}`;
          break;
        
        case 'gaming':
          nickname = `${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.vibes))}${nameUtils.getRandomItem(nicknameData.popCulture.gaming)}`;
          break;
        
        case 'fantasy':
          nickname = `${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.physical))}${nameUtils.getRandomItem(nicknameData.popCulture.fantasy)}`;
          break;
          
        case 'professional':
          nickname = `${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.personality))}${nameUtils.capitalize(baseName || nameUtils.getRandomItem(nicknameData.popCulture.mythology))}`;
          if (useSuffix) {
            nickname += nameUtils.getRandomItem(nicknameData.suffixes.professional);
          }
          break;

        case 'alliteration':
          if (baseName) {
            const allAdjectives = [
              ...nicknameData.adjectives.personality,
              ...nicknameData.adjectives.physical,
              ...nicknameData.adjectives.interests,
              ...nicknameData.adjectives.vibes
            ];
            nickname = nameUtils.createAlliteration(baseName, allAdjectives) || `${nameUtils.capitalize(baseName)}`;
          }
          break;

        case 'rhyming':
          const rhymePattern = nameUtils.getRandomItem(nicknameData.rhymePatterns);
          nickname = `${rhymePattern.prefix}${rhymePattern.suffix}`;
          break;

        default:
          nickname = `${nameUtils.capitalize(nameUtils.getRandomItem(nicknameData.adjectives.vibes))}${nameUtils.getRandomItem(nicknameData.popCulture.fantasy)}`;
      }

      if (includeNumbers) {
        nickname += Math.floor(Math.random() * 999);
      }

      if (useSuffix && style !== 'professional') {
        const suffixType = style === 'gaming' ? 'gaming' : 'casual';
        nickname += nameUtils.getRandomItem(nicknameData.suffixes[suffixType]);
      }

      nicknames.push(nickname);
    }

    setResults(Array.from(new Set(nicknames)));
  }

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
          Nickname Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>A nickname is more than just a shortened name - it's a mark of identity, affection, or reputation 
          that can stick with someone for life. Whether it's "The Rock" Johnson or "Magic" Johnson, 
          the right nickname can become more famous than the original name itself.
            Create unique and memorable nicknames based on different styles and themes.
            Perfect for gaming, social media, or any online presence!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); generateNicknames(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
                required
              >
                <option value="">Select style</option>
                <option value="personality">Personality Based</option>
                <option value="gaming">Gaming</option>
                <option value="fantasy">Fantasy</option>
                <option value="professional">Professional</option>
                <option value="alliteration">Alliteration</option>
                <option value="rhyming">Rhyming</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Name (Optional)
              </label>
              <input 
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.baseName}
                onChange={(e) => setFormData({...formData, baseName: e.target.value})}
                placeholder="Enter your name or preferred word"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeNumbers"
                  checked={formData.includeNumbers}
                  onChange={(e) => setFormData({...formData, includeNumbers: e.target.checked})}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="includeNumbers" className="text-sm text-gray-700">
                  Include Numbers
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useSuffix"
                  checked={formData.useSuffix}
                  onChange={(e) => setFormData({...formData, useSuffix: e.target.checked})}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="useSuffix" className="text-sm text-gray-700">
                  Add Suffix
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Nicknames
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
              Your Nicknames:
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

      <h2 className="text-3xl font-bold mb-6">Types of Nicknames: A Deeper Dive</h2>

<h3 className="text-2xl font-semibold mb-4">Shortened Names (Diminutives)</h3>

<p className="mb-6">Shortened names, also known as diminutives, are nicknames created by reducing or modifying someone's full name. These can be traditional shortenings like turning William into Bill or Will, Elizabeth into Beth or Lizzy, or Margaret into Peggy. Modern variations might include Christopher becoming Topher or Alexandra becoming Lexi. Some diminutives follow clear patterns (like adding -y or -ie to create Bobby from Robert), while others have evolved through historical use and might seem unrelated to the original name (like Jack from John). Diminutives often convey familiarity and affection in everyday use.</p>

<div className="mb-6">
 <h4 className="text-xl font-semibold mb-3">Classic Shortenings</h4>
 <ul className="list-disc pl-6 space-y-2">
   <li>Elizabeth becomes Beth, Liz, Lizzy, or Betty</li>
   <li>William transforms to Will, Bill, Billy, or Liam</li>
   <li>Margaret becomes Maggie, Peggy, or Marge</li>
   <li>Robert shortens to Rob, Bob, Bobby, or Robbie</li>
   <li>Katherine varies to Kate, Katie, Kathy, or Kit</li>
 </ul>
</div>

<div className="mb-6">
 <h4 className="text-xl font-semibold mb-3">Modern Takes</h4>
 <ul className="list-disc pl-6 space-y-2">
   <li>Christopher evolving to Topher or Chris</li>
   <li>Jennifer shortening to Jen, Jenny, or Jenna</li>
   <li>Alexander becoming Xander or Lex</li>
   <li>Isabella transforming to Bella or Izzy</li>
   <li>Matthew becoming Matt, Matty, or Theo</li>
 </ul>
</div>

<div className="mb-6">
 <h4 className="text-xl font-semibold mb-3">Initial-Based</h4>
 <ul className="list-disc pl-6 space-y-2">
   <li>AJ for Andrew James or Amanda Jane</li>
   <li>JD for John David or Jane Doe</li>
   <li>CJ for Christopher James or Casey Jones</li>
   <li>RJ for Robert Junior or Rachel Jane</li>
   <li>TJ for Thomas James or Tara Jean</li>
 </ul>
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