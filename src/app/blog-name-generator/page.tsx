'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, PenTool } from 'lucide-react';
import { blogNameData } from '@/data/blogNameData';
import type { BlogNiche, NameStyle, SuffixStyle, GeneratedBlogName } from '@/data/blogNameData';

interface FormData {
  niche: BlogNiche;
  style: NameStyle;
  includeDomain: boolean;
  includeThe: boolean;
  count: number;
}

function BlogNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    niche: 'lifestyle',
    style: 'personal',
    includeDomain: true,
    includeThe: false,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedBlogName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Get random prefix based on style
  const getPrefix = (style: NameStyle): string => {
    return getRandom(blogNameData.prefixes[style]);
  };

  // Get topic and modifier based on niche
  const getNicheWords = (niche: BlogNiche) => {
    const topic = getRandom(blogNameData.niches[niche].topics);
    const modifier = getRandom(blogNameData.niches[niche].modifiers);
    return { topic, modifier };
  };

  // Get suffix based on style
  const getSuffix = (style: NameStyle): string => {
    const suffixStyle: SuffixStyle = style === 'professional' ? 'digital' : 
                                   style === 'personal' ? 'personal' : 'blog';
    return getRandom(blogNameData.suffixes[suffixStyle]);
  };

  // Generate a blog name based on pattern
  const generateBlogName = (): GeneratedBlogName => {
    const { niche, style, includeDomain } = formData;
    const pattern = getRandom(blogNameData.patterns[style]);
    const { topic, modifier } = getNicheWords(niche);
    const prefix = getPrefix(style);
    const suffix = getSuffix(style);
    
    let name = pattern
      .replace('[Prefix]', prefix)
      .replace('[Topic]', topic)
      .replace('[Modifier]', modifier)
      .replace('[Suffix]', suffix)
      .replace('[Digital]', getRandom(blogNameData.suffixes.digital));

    // Add 'The' if enabled
    if (formData.includeThe && !name.startsWith('The')) {
      name = `The ${name}`;
    }

    // Generate the result
    const result: GeneratedBlogName = {
      name: name.trim(),
      niche,
      style
    };

    // Add domain if enabled
    if (includeDomain) {
      result.domain = getRandom(blogNameData.domains);
    }

    return result;
  };

  const generateBlogNames = (): GeneratedBlogName[] => {
    const names: GeneratedBlogName[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateBlogName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateBlogNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (blog: GeneratedBlogName, index: number) => {
    try {
      const text = blog.domain ? `${blog.name}${blog.domain}` : blog.name;
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <PenTool className="h-8 w-8 text-purple-600" />
          Blog Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Create unique and catchy blog names for your niche.
            Generate professional, personal, or creative blog names with matching domains.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Niche
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value as BlogNiche})}
                >
                  <option value="lifestyle">Lifestyle</option>
                  <option value="food">Food & Cooking</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Technology</option>
                  <option value="fashion">Fashion & Style</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name Style
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value as NameStyle})}
                >
                  <option value="personal">Personal & Casual</option>
                  <option value="professional">Professional & Business</option>
                  <option value="creative">Creative & Artistic</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDomain"
                  checked={formData.includeDomain}
                  onChange={(e) => setFormData({...formData, includeDomain: e.target.checked})}
                  className="rounded text-purple-600 mr-2"
                />
                <label htmlFor="includeDomain" className="text-sm text-gray-700">
                  Include Domain Extension
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeThe"
                  checked={formData.includeThe}
                  onChange={(e) => setFormData({...formData, includeThe: e.target.checked})}
                  className="rounded text-purple-600 mr-2"
                />
                <label htmlFor="includeThe" className="text-sm text-gray-700">
                  Add "The" to Names
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
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Generate Blog Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Blog Names
            </h2>
            <div className="grid gap-4">
              {results.map((blog, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {blog.name}
                        {blog.domain && (
                          <span className="text-purple-600">
                            {blog.domain}
                          </span>)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-3">
                          Niche: {blog.niche}
                        </span>
                        <span className="inline-block">
                          Style: {blog.style}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(blog, index)}
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

export default BlogNameGenerator;