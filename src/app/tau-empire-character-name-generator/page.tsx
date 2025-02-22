'use client';
import React, { useState } from 'react';
import { Wand2, Copy, CheckCheck } from 'lucide-react';
import { tauNameData } from '@/data/tauNameData';

interface FormData {
  caste: string;
  rank: string;
  specialization: string;
  battlesuit: string;
  vessel: string;
  includeTitle: boolean;
  includeTeamNumber: boolean;
  includeHonorific: boolean;
  includeCasteSpecific: boolean;
}

export default function TauNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    caste: '',
    rank: '',
    specialization: '',
    battlesuit: '',
    vessel: '',
    includeTitle: false,
    includeTeamNumber: false,
    includeHonorific: false,
    includeCasteSpecific: false
  });
  
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = () => {
    const names: string[] = [];
    const { caste, rank, specialization, battlesuit, vessel, includeTitle, includeTeamNumber, includeHonorific, includeCasteSpecific } = formData;

    for (let i = 0; i < 8; i++) {
      let nameParts: string[] = [];
      
      // Add caste prefix and rank
      if (caste && rank) {
        nameParts.push(`${tauNameData.castes[caste as keyof typeof tauNameData.castes]}${rank}`);
      }

      // Add team number if selected
      if (includeTeamNumber) {
        nameParts.push(tauNameData.teamNumbers[Math.floor(Math.random() * tauNameData.teamNumbers.length)]);
      }

      // Add sept name
      nameParts.push(tauNameData.septs[Math.floor(Math.random() * tauNameData.septs.length)]);

      // Add personal name
      nameParts.push(tauNameData.personalNames[Math.floor(Math.random() * tauNameData.personalNames.length)]);

      // Add specialization if selected
      if (specialization) {
        nameParts.push(`(${specialization})`);
      }

      // Add caste-specific details
      if (includeCasteSpecific) {
        if (caste === 'fire' && battlesuit) {
          nameParts.push(`[${battlesuit} Battlesuit]`);
        } else if (caste === 'air' && vessel) {
          nameParts.push(`[${vessel} Pilot]`);
        }
      }

      // Add honorific if selected
      if (includeHonorific && caste) {
        const honorifics = tauNameData.honorifics[caste as keyof typeof tauNameData.honorifics];
        nameParts.push(honorifics[Math.floor(Math.random() * honorifics.length)]);
      }

      // Add title if selected
      if (includeTitle) {
        nameParts.push(tauNameData.titles[Math.floor(Math.random() * tauNameData.titles.length)]);
      }

      names.push(nameParts.join(' '));
    }

    setResults(Array.from(new Set(names)));
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-orange-600" />
          T'au Empire Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate authentic T'au Empire character names following their caste system and naming conventions.
            For the Greater Good!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); generateNames(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste
              </label>
              <select 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={formData.caste}
                onChange={(e) => setFormData({...formData, caste: e.target.value, rank: '', specialization: ''})}
                required
              >
                <option value="">Select Caste</option>
                <option value="fire">Fire Caste (Shas)</option>
                <option value="earth">Earth Caste (Fio)</option>
                <option value="water">Water Caste (Por)</option>
                <option value="air">Air Caste (Kor)</option>
                <option value="ethereal">Ethereal Caste (Aun)</option>
              </select>
            </div>

            {formData.caste && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rank
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.rank}
                  onChange={(e) => setFormData({...formData, rank: e.target.value})}
                  required
                >
                  <option value="">Select Rank</option>
                  {tauNameData.ranks[formData.caste as keyof typeof tauNameData.ranks].map((rank) => (
                    <option key={rank} value={rank}>
                      {rank === 'la' ? 'Saal\'la (Trainee)' :
                       rank === 'ui' ? 'Saal\'ui (Veteran)' :
                       rank === 'vre' ? 'Saal\'vre (Hero)' :
                       rank === 'el' ? 'Saal\'el (Lord)' :
                       'Saal\'o (Commander)'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.caste && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                >
                  <option value="">Select Specialization</option>
                  {tauNameData.casteSpecific[formData.caste as keyof typeof tauNameData.casteSpecific].specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.caste === 'fire' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Battlesuit Type
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.battlesuit}
                  onChange={(e) => setFormData({...formData, battlesuit: e.target.value})}
                >
                  <option value="">Select Battlesuit</option>
                  {tauNameData.casteSpecific.fire.battlesuits.map((suit) => (
                    <option key={suit} value={suit}>{suit}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.caste === 'air' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vessel Class
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.vessel}
                  onChange={(e) => setFormData({...formData, vessel: e.target.value})}
                >
                  <option value="">Select Vessel</option>
                  {tauNameData.casteSpecific.air.vessels.map((vessel) => (
                    <option key={vessel} value={vessel}>{vessel}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTeamNumber"
                  checked={formData.includeTeamNumber}
                  onChange={(e) => setFormData({...formData, includeTeamNumber: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeTeamNumber" className="text-sm text-gray-700">
                  Include Team Number
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTitle"
                  checked={formData.includeTitle}
                  onChange={(e) => setFormData({...formData, includeTitle: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeTitle" className="text-sm text-gray-700">
                  Add Title
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeHonorific"
                  checked={formData.includeHonorific}
                  onChange={(e) => setFormData({...formData, includeHonorific: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeHonorific" className="text-sm text-gray-700">
                  Add Honorific
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeCasteSpecific"
                  checked={formData.includeCasteSpecific}
                  onChange={(e) => setFormData({...formData, includeCasteSpecific: e.target.checked})}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="includeCasteSpecific" className="text-sm text-gray-700">
                  Include Role Details
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Generate T'au Names
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
              Generated Names:
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
  <h2 className="text-3xl font-bold mb-6">T’au Empire Character Name Generator</h2>

  <p className="mb-6">
    The Greater Good calls, and it needs a name worthy of your service. Whether you’re a Fire Warrior holding the line against the enemies of the T’au, a cunning Ethereal guiding your people to unity, or a tech-savvy Earth Caste engineer revolutionizing the battlefield, your name should reflect your dedication to the T’au’va. Enter the <strong>T’au Empire Character Name Generator</strong>—your key to a name as precise and purposeful as a well-aimed pulse rifle shot.
  </p>

  <p className="mb-6">
    Drawing inspiration from the sleek, futuristic culture of the T’au Empire, this generator crafts names that embody harmony, innovation, and the unyielding spirit of progress. From the stoic “Kais’Vash” to the visionary “Aun’Doran,” each name is designed to fit seamlessly into the ranks of the T’au. Whether you’re leading a cadre, piloting a battlesuit, or negotiating alliances for the Greater Good, your name will resonate with the ideals of your people.
  </p>

  <p className="mb-6">
    So, ready your pulse carbine, calibrate your drone, and step into the light of the T’au’va. Will you be “Shas’O Kais’Mont’yr,” a commander whose strategies are as sharp as your blade? Or perhaps “Fio’El Vash’Tol,” an Earth Caste genius whose inventions turn the tide of war? The fate of the T’au Empire is in your hands—forge your name, and let it echo across the stars.
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