// data/foodNameData.ts

export const foodNameData = {
    prefixes: {
      cooking_method: [
        'Grilled', 'Roasted', 'Sautéed', 'Fried', 'Baked',
        'Braised', 'Steamed', 'Pan-Seared', 'Smoked', 'Poached',
        'Broiled', 'Slow-Cooked', 'Fire-Roasted', 'Charred', 'Glazed'
      ],
      texture: [
        'Crispy', 'Creamy', 'Crunchy', 'Tender', 'Smooth',
        'Silky', 'Melted', 'Whipped', 'Crusty', 'Fluffy',
        'Velvety', 'Juicy', 'Soft', 'Rich', 'Light'
      ],
      taste: [
        'Sweet', 'Savory', 'Spicy', 'Tangy', 'Zesty',
        'Herb-Infused', 'Garlic', 'Honey', 'Citrus', 'Smoky',
        'Maple', 'Caramelized', 'Peppered', 'Seasoned', 'Wild'
      ]
    },
    
    ingredients: {
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
      vegetables: [
        'Spinach', 'Kale', 'Asparagus', 'Brussels Sprouts',
        'Broccoli', 'Carrots', 'Peppers', 'Zucchini', 'Tomatoes',
        'Potatoes', 'Sweet Potatoes', 'Squash', 'Artichokes'
      ],
      grains: [
        'Rice', 'Pasta', 'Quinoa', 'Couscous', 'Barley',
        'Farro', 'Noodles', 'Risotto', 'Polenta', 'Orzo'
      ]
    },
  
    cuisines: {
      italian: {
        ingredients: [
          'Mozzarella', 'Parmesan', 'Basil', 'Tomato', 'Garlic',
          'Olive', 'Prosciutto', 'Ricotta', 'Oregano', 'Pancetta'
        ],
        dishes: [
          'Pasta', 'Risotto', 'Pizza', 'Gnocchi', 'Ravioli',
          'Lasagna', 'Linguine', 'Fettuccine', 'Penne', 'Ziti'
        ]
      },
      asian: {
        ingredients: [
          'Soy', 'Ginger', 'Sesame', 'Wasabi', 'Miso',
          'Lemongrass', 'Coconut', 'Curry', 'Teriyaki', 'Ponzu'
        ],
        dishes: [
          'Stir-Fry', 'Noodles', 'Rice Bowl', 'Curry', 'Sushi',
          'Ramen', 'Dumplings', 'Tempura', 'Udon', 'Pho'
        ]
      },
      mediterranean: {
        ingredients: [
          'Feta', 'Olive Oil', 'Hummus', 'Tahini', 'Za\'atar',
          'Mint', 'Lemon', 'Yogurt', 'Chickpea', 'Sumac'
        ],
        dishes: [
          'Bowl', 'Salad', 'Wrap', 'Mezze', 'Kebab',
          'Falafel', 'Pita', 'Shawarma', 'Tagine', 'Couscous'
        ]
      }
    },
  
    descriptors: {
      presentation: [
        'Deconstructed', 'Rustic', 'Elegant', 'Classic', 'Modern',
        'Artisanal', 'Signature', 'House-Made', 'Garden-Fresh', 'Farm-to-Table'
      ],
      flavor: [
        'Aromatic', 'Fragrant', 'Infused', 'Seasoned', 'Marinated',
        'Glazed', 'Dressed', 'Drizzled', 'Topped', 'Stuffed'
      ],
      special: [
        'Secret Recipe', 'Chef\'s Special', 'House Specialty',
        'Traditional', 'Family Recipe', 'Seasonal', 'Local',
        'Artisanal', 'Signature', 'Gourmet'
      ]
    },
  
    sauces: [
      'Sauce', 'Reduction', 'Glaze', 'Aioli', 'Drizzle',
      'Vinaigrette', 'Dressing', 'Coulis', 'Pesto', 'Marinade'
    ],
  
    garnishes: [
      'with Fresh Herbs', 'with Microgreens', 'with Toasted Seeds',
      'with Crispy Shallots', 'with Edible Flowers', 'with Fresh Citrus',
      'with Crumbled Cheese', 'with Roasted Nuts', 'with Sprouts'
    ],
  
    patterns: {
      simple: '[Prefix] [Ingredient]',
      composed: '[Prefix] [Ingredient] with [Ingredient]',
      special: '[Descriptor] [Ingredient] [Sauce]',
      fusion: '[Cuisine] Style [Ingredient] [Dish]',
      signature: '[Special] [Ingredient] [Garnish]'
    }
  };
  
  export type CuisineType = 'italian' | 'asian' | 'mediterranean' | 'fusion';
  export type DishStyle = 'simple' | 'composed' | 'special' | 'fusion' | 'signature';
  export type ProteinType = 'meat' | 'seafood' | 'vegetarian';
  
  export interface GeneratedFoodName {
    name: string;
    cuisine?: string;
    style: string;
    type: string;
  }