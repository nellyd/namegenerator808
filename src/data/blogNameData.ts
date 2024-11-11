// data/blogNameData.ts

export const blogNameData = {
    prefixes: {
      personal: [
        'Simply', 'Just', 'The', 'My', 'Daily', 'Life', 'Living',
        'Modern', 'Creative', 'Inspired', 'Mindful', 'Everyday',
        'Authentic', 'Sweet', 'Simple', 'Pure', 'Wild', 'Free'
      ],
      professional: [
        'Pro', 'Expert', 'Master', 'Elite', 'Premium', 'Prime',
        'Smart', 'Savvy', 'Strategic', 'Skilled', 'Advanced',
        'Professional', 'Leading', 'Ultimate', 'Essential'
      ],
      creative: [
        'Artful', 'Whimsical', 'Dreamy', 'Curious', 'Wandering',
        'Drifting', 'Dancing', 'Floating', 'Flowing', 'Soaring',
        'Wild', 'Free', 'Vibrant', 'Colorful', 'Playful'
      ]
    },
    
    niches: {
      lifestyle: {
        topics: [
          'Life', 'Living', 'Lifestyle', 'Home', 'Family', 'Joy',
          'Wellness', 'Balance', 'Mindfulness', 'Journey', 'Path',
          'Ways', 'Stories', 'Moments', 'Days', 'Adventures'
        ],
        modifiers: [
          'Simple', 'Modern', 'Mindful', 'Balanced', 'Wholesome',
          'Intentional', 'Authentic', 'Natural', 'Conscious'
        ]
      },
      food: {
        topics: [
          'Kitchen', 'Cooking', 'Foodie', 'Recipes', 'Meals',
          'Flavors', 'Tastes', 'Bites', 'Dishes', 'Eats',
          'Cuisine', 'Plate', 'Fork', 'Spoon', 'Table'
        ],
        modifiers: [
          'Tasty', 'Delicious', 'Savory', 'Sweet', 'Fresh',
          'Homemade', 'Gourmet', 'Wholesome', 'Healthy'
        ]
      },
      travel: {
        topics: [
          'Wanderlust', 'Travels', 'Journey', 'Adventures',
          'Exploration', 'Discovery', 'Destinations', 'Places',
          'Trails', 'Paths', 'Roads', 'Maps', 'Compass'
        ],
        modifiers: [
          'Wandering', 'Roaming', 'Exploring', 'Adventurous',
          'Nomadic', 'Global', 'World', 'Distant', 'Far'
        ]
      },
      tech: {
        topics: [
          'Tech', 'Digital', 'Code', 'Bytes', 'Apps', 'Gadgets',
          'Devices', 'Systems', 'Networks', 'Data', 'Innovation',
          'Solutions', 'Insights', 'Reviews', 'Guides'
        ],
        modifiers: [
          'Smart', 'Digital', 'Connected', 'Modern', 'Advanced',
          'Innovative', 'Future', 'Next', 'Latest'
        ]
      },
      fashion: {
        topics: [
          'Style', 'Fashion', 'Trends', 'Looks', 'Wardrobe',
          'Closet', 'Outfits', 'Pieces', 'Accessories', 'Design',
          'Collection', 'Runway', 'Street', 'Wear'
        ],
        modifiers: [
          'Chic', 'Stylish', 'Trendy', 'Modern', 'Classic',
          'Elegant', 'Luxe', 'Fashion', 'Couture'
        ]
      }
    },
  
    suffixes: {
      blog: [
        'Blog', 'Diary', 'Chronicles', 'Notes', 'Stories',
        'Journal', 'Guide', 'Life', 'Living', 'Ways'
      ],
      digital: [
        'Hub', 'Spot', 'Space', 'Zone', 'World', 'Sphere',
        'Central', 'Base', 'HQ', 'Corner', 'Place'
      ],
      personal: [
        'Edit', 'Life', 'Living', 'Diaries', 'Notes',
        'Pages', 'Stories', 'Tales', 'Moments', 'Days'
      ]
    },
  
    patterns: {
      personal: [
        '[Prefix] [Topic]',
        'The [Topic] [Suffix]',
        '[Topic] [Suffix]',
        '[Modifier] [Topic]'
      ],
      professional: [
        '[Topic] [Suffix]',
        'The [Topic] [Suffix]',
        '[Prefix] [Topic] [Suffix]',
        '[Topic] [Digital]'
      ],
      creative: [
        '[Prefix] [Topic]',
        '[Topic] and [Topic]',
        '[Modifier] [Topic] [Suffix]',
        'The [Modifier] [Topic]'
      ]
    },
  
    domains: [
      '.com', '.blog', '.net', '.co', '.io',
      '.me', '.life', '.world', '.zone', '.space'
    ]
  };
  
  export type BlogNiche = 'lifestyle' | 'food' | 'travel' | 'tech' | 'fashion';
  export type NameStyle = 'personal' | 'professional' | 'creative';
  export type SuffixStyle = 'blog' | 'digital' | 'personal';
  
  export interface GeneratedBlogName {
    name: string;
    domain?: string;
    niche: BlogNiche;
    style: NameStyle;
  }