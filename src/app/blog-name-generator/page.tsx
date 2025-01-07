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
          <p>Find the perfect name for your blog with our Blog Name Generator! 
          Whether you're starting a professional, personal, or creative blog, our tool helps you generate 
          unique and catchy names tailored to your niche. Explore options that capture your brand’s 
          personality, and find names with matching domains to help you stand out online. Ideal for bloggers 
          in every niche looking to make a memorable first impression.</p>
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

      <div className="max-w-3xl mx-auto">
 <h2 className="text-3xl font-bold mb-6">Finding Your Perfect Blog Name With Our Blog Name Generator</h2>

 <p className="mb-6">
   Coming up with the right name for your blog isn't just challenging - it's a decision that could shape your entire online presence. Your blog name needs to be memorable, available as a domain, and something you'll still love years from now. Plus, it needs to stand out in an internet already packed with millions of blogs.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Proven Naming Approaches</h3>

 <div className="mb-6">
   <p className="mb-4">
     Use your niche keywords. Blogs like Food52, Travel Insider, and DIY Crafts include their topic right in the name. This helps readers immediately understand what your blog is about and can help with search visibility.
   </p>

   <p className="mb-4">
     Include your own name. Many successful bloggers like Tim Ferriss, Marie Forleo, and Neil Patel built their brands around their names. This approach gives you flexibility to change topics over time, though it might limit your options if you ever want to sell.
   </p>

   <p className="mb-4">
     Create something unique. Think of memorable names like "The Pioneer Woman" or "Nerd Fitness" - they're catchy, unique, and instantly tell readers what to expect. This approach takes more creativity but can really help you stand out.
   </p>
 </div>

 <p className="mb-6">
   Even with these strategies in mind, finding the perfect blog name can feel overwhelming. Maybe you've brainstormed dozens of ideas only to find the domains are taken. That's exactly why we built this blog name generator.
 </p>

 <h2 className="text-3xl font-bold mb-6">How to Use Our Blog Name Generator to Find Your Perfect Name</h2>

 <p className="mb-6">
   Ready to discover your blog's new name? Here's how to make the most of our generator:
 </p>

 <h3 className="text-2xl font-semibold mb-4">Step 1. Enter Your Blog's Main Topic or Theme</h3>
 <p className="mb-6">
   Start by entering what your blog will be about. Whether it's cooking, personal finance, parenting, or technology, our generator needs to know your niche to create relevant suggestions. If you're not sure about your niche yet, check out our guide on choosing a blog topic.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Step 2. Generate a List of Creative Blog Names</h3>
 <p className="mb-6">
   Our generator will create a variety of name options using AI-powered creativity. You'll see names with alliteration, clever word combinations, and industry-relevant terminology. Keep generating until something catches your eye.
 </p>

 <h3 className="text-2xl font-semibold mb-4">Step 3. Pick Your Favorites</h3>
 <p className="mb-4">
   From your generated list, select 2-3 names you really like. Don't just pick one - domains can be surprisingly scarce, so having backups is smart. Look for names that:
 </p>

 <ul className="list-disc pl-6 space-y-2 mb-6">
   <li>Are easy to spell and remember</li>
   <li>Reflect your blog's personality</li>
   <li>Wouldn't be confusing when spoken aloud</li>
   <li>Could grow with your blog over time</li>
 </ul>

 <h3 className="text-2xl font-semibold mb-4">Step 4. Check Domain Availability</h3>
 <p className="mb-6">
   I use Domain.com to check domain availability. Use coupon code SITEHUB to get 25% off domain names and hosting.
   They are by far the cheapest around and by using the coupon I mentioned, you can save even more.
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

export default BlogNameGenerator;