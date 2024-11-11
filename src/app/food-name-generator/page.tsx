'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, Utensils } from 'lucide-react';

// Data moved inline for simplicity
const foodNameData = {
  prefixes: {
    cooking_method: [
      'Grilled', 'Roasted', 'Sautéed', 'Fried', 'Baked',
      'Braised', 'Steamed', 'Pan-Seared', 'Smoked', 'Poached'
    ],
    texture: [
      'Crispy', 'Creamy', 'Crunchy', 'Tender', 'Smooth',
      'Silky', 'Melted', 'Whipped', 'Crusty', 'Fluffy'
    ]
  },
  proteins: {
    meat: [
      'Chicken', 'Beef', 'Pork', 'Lamb', 'Duck',
      'Turkey', 'Veal', 'Steak', 'Ribs', 'Brisket'
    ],
    seafood: [
      'Salmon', 'Tuna', 'Shrimp', 'Cod', 'Halibut',
      'Scallops', 'Crab', 'Lobster', 'Mussels', 'Fish'
    ],
    vegetarian: [
      'Tofu', 'Tempeh', 'Seitan', 'Lentils', 'Chickpeas',
      'Quinoa', 'Beans', 'Mushrooms', 'Eggplant', 'Cauliflower'
    ]
  },
  cuisines: {
    italian: {
      dishes: [
        'Pasta', 'Risotto', 'Pizza', 'Gnocchi', 'Ravioli',
        'Lasagna', 'Linguine', 'Fettuccine', 'Penne', 'Ziti'
      ]
    },
    asian: {
      dishes: [
        'Stir-Fry', 'Noodles', 'Rice Bowl', 'Curry', 'Sushi',
        'Ramen', 'Dumplings', 'Tempura', 'Udon', 'Pho'
      ]
    },
    mediterranean: {
      dishes: [
        'Bowl', 'Salad', 'Wrap', 'Mezze', 'Kebab',
        'Falafel', 'Pita', 'Shawarma', 'Tagine', 'Couscous'
      ]
    }
  },
  garnishes: [
    'with Fresh Herbs', 'with Microgreens', 'with Toasted Seeds',
    'with Crispy Shallots', 'with Edible Flowers', 'with Fresh Citrus',
    'with Crumbled Cheese', 'with Roasted Nuts', 'with Sprouts'
  ]
};

interface GeneratedFood {
  name: string;
  cuisine?: string;
  style: string;
  type: string;
}

interface FormData {
  cuisine: 'italian' | 'asian' | 'mediterranean' | 'any';
  style: 'simple' | 'composed' | 'special';
  protein: 'meat' | 'seafood' | 'vegetarian' | 'any';
  isVegetarian: boolean;
  includeGarnish: boolean;
  count: number;
}

export default function FoodNameGenerator() {
  const [formData, setFormData] = useState<FormData>({
    cuisine: 'any',
    style: 'simple',
    protein: 'any',
    isVegetarian: false,
    includeGarnish: true,
    count: 5
  });
  
  const [results, setResults] = useState<GeneratedFood[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper function to get random item from array
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Generate a food name
  const generateFoodName = (): GeneratedFood => {
    const { cuisine, style, protein, isVegetarian, includeGarnish } = formData;
    
    // Get cooking method
    const cookingMethod = getRandom(foodNameData.prefixes.cooking_method);
    
    // Get protein
    let mainProtein;
    if (isVegetarian) {
      mainProtein = getRandom(foodNameData.proteins.vegetarian);
    } else if (protein === 'any') {
      const allProteins = [...foodNameData.proteins.meat, ...foodNameData.proteins.seafood, ...foodNameData.proteins.vegetarian];
      mainProtein = getRandom(allProteins);
    } else {
      mainProtein = getRandom(foodNameData.proteins[protein]);
    }
    
    // Get cuisine-specific dish
    let dish = '';
    if (cuisine !== 'any') {
      dish = getRandom(foodNameData.cuisines[cuisine].dishes);
    }
    
    // Build the name
    let name = `${cookingMethod} ${mainProtein}`;
    if (dish) {
      name += ` ${dish}`;
    }
    if (includeGarnish) {
      name += ` ${getRandom(foodNameData.garnishes)}`;
    }

    return {
      name,
      cuisine: cuisine === 'any' ? undefined : cuisine,
      style,
      type: isVegetarian ? 'Vegetarian' : protein
    };
  };

  const generateNames = (): GeneratedFood[] => {
    const names: GeneratedFood[] = [];
    for (let i = 0; i < formData.count; i++) {
      names.push(generateFoodName());
    }
    return names;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedNames = generateNames();
    setResults(generatedNames);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (food: GeneratedFood, index: number) => {
    try {
      await navigator.clipboard.writeText(food.name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <Utensils className="h-8 w-8 text-orange-600" />
          Food Name Generator
        </h1>

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Generate unique and appetizing dish names for your menu.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({...formData, cuisine: e.target.value as FormData['cuisine']})}
                >
                  <option value="any">Any Cuisine</option>
                  <option value="italian">Italian</option>
                  <option value="asian">Asian</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Protein
                </label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  value={formData.protein}
                  onChange={(e) => setFormData({...formData, protein: e.target.value as FormData['protein']})}
                  disabled={formData.isVegetarian}
                >
                  <option value="any">Any Protein</option>
                  <option value="meat">Meat</option>
                  <option value="seafood">Seafood</option>
                  <option value="vegetarian">Plant-Based</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={(e) => setFormData({...formData, isVegetarian: e.target.checked, protein: e.target.checked ? 'vegetarian' : 'any'})}
                  className="rounded text-orange-600 mr-2"
                />
                <label htmlFor="isVegetarian" className="text-sm text-gray-700">
                  Vegetarian Only
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeGarnish"
                  checked={formData.includeGarnish}
                  onChange={(e) => setFormData({...formData, includeGarnish: e.target.checked})}
                  className="rounded text-orange-600 mr-2"
                />
                <label htmlFor="includeGarnish" className="text-sm text-gray-700">
                  Include Garnish
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
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Generate Dish Names
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Generated Dish Names
            </h2>
            <div className="grid gap-4">
              {results.map((food, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-lg">
                        {food.name}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        {food.cuisine && (
                          <span className="inline-block mr-3">
                            Cuisine: {food.cuisine}
                          </span>
                        )}
                        <span className="inline-block">
                          Type: {food.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(food, index)}
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
    </div>
  );
}