'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, Briefcase } from 'lucide-react';
import { businessNameData } from '@/data/businessNameData';
import type { BusinessIndustry, NameStyle, DomainStyle, GeneratedBusinessName, FormData } from '@/data/businessNameData';

export default function BusinessNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    industry: 'technology',
    style: 'standard',
    includeDomain: true,
    domainStyle: 'standard',
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedBusinessName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get industry specific word
  const getIndustryWord = (industry: BusinessIndustry): string => {
    return getRandom(businessNameData.industries[industry].words);
  };

  // Get industry specific suffix
  const getIndustrySuffix = (industry: BusinessIndustry): string => {
    return getRandom(businessNameData.industries[industry].suffixes);
  };

  // Get appropriate prefix
  const getPrefix = (industry: BusinessIndustry): string => {
    const prefixType = industry === 'technology' ? 'technical' :
                      industry === 'creative' ? 'creative' : 'professional';
    return getRandom(businessNameData.prefixes[prefixType]);
  };

  // Get modifier
  const getModifier = (): string => {
    const modifierTypes = Object.keys(businessNameData.modifiers);
    const randomType = getRandom(modifierTypes) as keyof typeof businessNameData.modifiers;
    return getRandom(businessNameData.modifiers[randomType]);
  };

  // Get domain extension
  const getDomain = (style: DomainStyle): string => {
    return getRandom(businessNameData.domains[style]);
  };

  // Generate a business name
  const generateBusinessName = (): GeneratedBusinessName => {
    const { industry, style, includeDomain, domainStyle } = formData;
    let name: string;

    switch (style) {
      case 'compound':
        name = `${getIndustryWord(industry)}${getIndustryWord(industry)}${getIndustrySuffix(industry)}`;
        break;
      case 'descriptive':
        name = `${getModifier()} ${getIndustryWord(industry)} ${getIndustrySuffix(industry)}`;
        break;
      case 'modern':
        name = `${getIndustryWord(industry)}${getIndustrySuffix(industry)}`;
        break;
      default:
        name = `${getPrefix(industry)} ${getIndustryWord(industry)} ${getIndustrySuffix(industry)}`;
    }

    const businessName: GeneratedBusinessName = {
      name: name.trim(),
      industry,
      style
    };

    if (includeDomain) {
      businessName.domain = getDomain(domainStyle);
    }

    return businessName;
  };

  const generateNames = (): GeneratedBusinessName[] => {
    const names: GeneratedBusinessName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateBusinessName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (business: GeneratedBusinessName, index: number) => {
    try {
      const text = business.domain ? 
        `${business.name}${business.domain}` : 
        business.name;
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Briefcase className="h-8 w-8 text-blue-600" />
          Business Name Generator
        </h1>

        <div className="space-y-3 text-center">
          <p>Create the perfect name for your company or startup with our Business Name Generator! 
          Made for entrepreneurs in any industry, our tool helps you generate professional, 
          memorable names that resonate with your brand. Choose from various industries and 
          styles to find a name that aligns with your business vision and sets you apart in the market. 
          Ideal for startups, small businesses, and creative ventures looking for a strong identity.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value as BusinessIndustry})}
                >
                  <option value="technology">Technology</option>
                  <option value="consulting">Consulting</option>
                  <option value="creative">Creative & Design</option>
                  <option value="retail">Retail & Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as NameStyle})}
                >
                  <option value="standard">Standard</option>
                  <option value="compound">Compound</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="modern">Modern</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.domainStyle}
                  onChange={(e) => setFormData({...formData, domainStyle: e.target.value as DomainStyle})}
                  disabled={!formData.includeDomain}
                >
                  <option value="standard">Standard (.com, .net)</option>
                  <option value="professional">Professional (.pro, .solutions)</option>
                  <option value="regional">Regional (.us, .global)</option>
                  <option value="industry">Industry-Specific (.tech, .design)</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDomain"
                  checked={formData.includeDomain}
                  onChange={(e) => setFormData({...formData, includeDomain: e.target.checked})}
                  className="rounded text-blue-600 mr-2"
                />
                <label htmlFor="includeDomain" className="text-sm text-gray-700">
                  Include Domain Extension
                </label>
              </div>
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
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Business Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Business Names
            </h2>
            <div className="grid gap-4">
              {results.map((business, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {business.name}
                        {business.domain && (
                          <span className="text-blue-600">
                            {business.domain}
                          </span>
                        )}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Industry: {business.industry}
                        </span>
                        <span className="inline-block">
                          Style: {business.style}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(business, index)}
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
 <h2 className="text-3xl font-bold mb-6">Crafting Your Business Identity: A Complete Naming Guide</h2>

 <p className="mb-6">
   A business name is more than just a label—it's the cornerstone of your brand identity, the first impression you make on potential customers, and the foundation of your business legacy. The right name can propel your success, while the wrong one might limit your growth.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Step-by-Step Business Naming Process</h3>

 <div className="mb-6">
   <h4 className="text-xl font-semibold mb-3">1. Foundation Building</h4>
   <ul className="list-disc pl-6 space-y-2 mb-4">
     <li>Define your brand values and mission</li>
     <li>List your key products or services</li>
     <li>Identify your target market</li>
     <li>Map out your 5-year business vision</li>
     <li>Write down your unique selling points</li>
   </ul>

   <h4 className="text-xl font-semibold mb-3">2. Market Research</h4>
   <ul className="list-disc pl-6 space-y-2 mb-4">
     <li>Analyze competitor names in your industry</li>
     <li>Study successful brands in other sectors</li>
     <li>Note naming trends to follow or avoid</li>
     <li>Identify gaps in the market</li>
     <li>Research your target audience preferences</li>
   </ul>

   <h4 className="text-xl font-semibold mb-3">3. Name Generation</h4>
   <ul className="list-disc pl-6 space-y-2 mb-4">
     <li>Brainstorm words related to your business</li>
     <li>Consider different naming styles</li>
     <li>Create combinations of key terms</li>
     <li>List potential alternatives</li>
     <li>Keep a running document of ideas</li>
   </ul>

   <h4 className="text-xl font-semibold mb-3">4. Practical Evaluation</h4>
   <ul className="list-disc pl-6 space-y-2 mb-4">
     <li>Check domain name availability</li>
     <li>Search trademark databases</li>
     <li>Look for social media handle availability</li>
     <li>Consider international implications</li>
     <li>Test for pronunciation and spelling ease</li>
   </ul>

   <h4 className="text-xl font-semibold mb-3">5. Testing and Feedback</h4>
   <ul className="list-disc pl-6 space-y-2 mb-4">
     <li>Share with potential customers</li>
     <li>Get feedback from industry peers</li>
     <li>Create sample logos and branding</li>
     <li>Test in different contexts</li>
     <li>Consider cultural implications</li>
   </ul>
 </div>

 <h3 className="text-2xl font-semibold mb-4">Naming Styles to Consider</h3>

 <h4 className="text-xl font-semibold mb-3">Descriptive Names: Direct Approach</h4>
 <p className="mb-6">
   Names that clearly state what you do. "Quick Print Solutions" or "Fresh Farm Delivery" tell customers exactly what to expect. These names are clear but might limit future expansion.
 </p>

 <h4 className="text-xl font-semibold mb-3">Invented Names: Creative Freedom</h4>
 <p className="mb-6">
   Created words like "Xerox" or "Kodak" offer uniqueness and trademark protection. They require more marketing but can become strong, distinctive brands.
 </p>

 <h4 className="text-xl font-semibold mb-3">Founder Names: Personal Touch</h4>
 <p className="mb-6">
   Using your name like "Ford" or "Disney" adds authenticity and personal connection. Consider if you plan to sell the business later.
 </p>

 <h4 className="text-xl font-semibold mb-3">Metaphorical Names: Emotional Appeal</h4>
 <p className="mb-6">
   Names like "Amazon" or "Apple" use familiar words in new contexts. They're memorable and allow for brand story development.
 </p>

 <h4 className="text-xl font-semibold mb-3">Acronyms: Professional Style</h4>
 <p className="mb-6">
   "IBM" or "BMW" evolved from longer names. Consider if the full name and shortened version both work.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Tips for Success</h3>
 <ul className="list-disc pl-6 space-y-2 mb-6">
   <li>Keep it simple and memorable</li>
   <li>Ensure easy pronunciation</li>
   <li>Consider international markets</li>
   <li>Test for negative associations</li>
   <li>Check all legal requirements</li>
   <li>Verify trademark availability</li>
   <li>Think about visual branding potential</li>
   <li>Plan for digital presence</li>
 </ul>

 <h3 className="text-2xl font-semibold mb-4">Key Requirements</h3>
 <ul className="list-disc pl-6 space-y-2 mb-6">
   <li>Reflect your brand values</li>
   <li>Appeal to your target market</li>
   <li>Be adaptable for growth</li>
   <li>Work across all platforms</li>
   <li>Stand out from competitors</li>
   <li>Be legally available</li>
   <li>Sound professional and credible</li>
 </ul>

 <p className="mb-6">
   The perfect business name balances creativity with practicality, setting the foundation for your brand's future success.
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