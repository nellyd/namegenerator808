// data/businessNameData.ts

export const businessNameData = {
    prefixes: {
      professional: [
        'Pro', 'Elite', 'Prime', 'Core', 'Peak', 'Key',
        'Smart', 'Expert', 'Master', 'Top', 'Premium', 'Next'
      ],
      technical: [
        'Tech', 'Digital', 'Cyber', 'Net', 'Web', 'Cloud',
        'Data', 'Quantum', 'Logic', 'Micro', 'Macro', 'Beta'
      ],
      creative: [
        'Art', 'Design', 'Studio', 'Craft', 'Vision', 'Nova',
        'Dream', 'Spark', 'Bright', 'Unique', 'Fresh', 'Crisp'
      ]
    },
  
    industries: {
      technology: {
        words: [
          'Tech', 'Digital', 'Cyber', 'Software', 'Systems', 'Apps',
          'Solutions', 'Data', 'Cloud', 'Net', 'Web', 'Code'
        ],
        suffixes: [
          'Labs', 'Technologies', 'Systems', 'Solutions', 'Works',
          'Applications', 'Networks', 'Platforms', 'Hub', 'Core'
        ]
      },
      consulting: {
        words: [
          'Strategy', 'Consult', 'Advisory', 'Insight', 'Vision',
          'Partners', 'Alliance', 'Guidance', 'Wisdom', 'Mind'
        ],
        suffixes: [
          'Consulting', 'Advisors', 'Associates', 'Partners', 'Group',
          'Solutions', 'Strategies', 'Experts', 'International'
        ]
      },
      creative: {
        words: [
          'Design', 'Creative', 'Studio', 'Art', 'Media', 'Brand',
          'Visual', 'Image', 'Style', 'Color', 'Form', 'Idea'
        ],
        suffixes: [
          'Studios', 'Design', 'Creative', 'Media', 'Arts',
          'Productions', 'Works', 'Agency', 'Group', 'Lab'
        ]
      },
      retail: {
        words: [
          'Market', 'Shop', 'Store', 'Retail', 'Mart', 'Trade',
          'Goods', 'Boutique', 'Outlet', 'Exchange', 'Commerce'
        ],
        suffixes: [
          'Store', 'Market', 'Trading', 'Retail', 'Shop',
          'Goods', 'Outlet', 'Emporium', 'Marketplace'
        ]
      }
    },
  
    modifiers: {
      descriptive: [
        'Global', 'Advanced', 'Modern', 'Future', 'Dynamic',
        'Innovative', 'Strategic', 'Leading', 'Premier', 'Smart'
      ],
      quality: [
        'Elite', 'Premium', 'Select', 'Choice', 'Prime',
        'Superior', 'Ultimate', 'Perfect', 'Optimal', 'Best'
      ],
      status: [
        'Certified', 'Trusted', 'Verified', 'Approved', 'Preferred',
        'Registered', 'Licensed', 'Official', 'Authorized'
      ]
    },
  
    patterns: {
      standard: '[Prefix] [Industry] [Suffix]',
      compound: '[Industry] [Industry] [Suffix]',
      descriptive: '[Modifier] [Industry] [Suffix]',
      modern: '[Industry][Suffix]'
    },
  
    domains: {
      standard: ['.com', '.net', '.co', '.io', '.biz'],
      professional: ['.pro', '.solutions', '.services', '.consulting'],
      regional: ['.us', '.global', '.world', '.international'],
      industry: ['.tech', '.design', '.store', '.shop', '.agency']
    }
  };
  
  export type BusinessIndustry = 'technology' | 'consulting' | 'creative' | 'retail';
  export type NameStyle = 'standard' | 'compound' | 'descriptive' | 'modern';
  export type DomainStyle = 'standard' | 'professional' | 'regional' | 'industry';
  
  export interface GeneratedBusinessName {
    name: string;
    domain?: string;
    industry: BusinessIndustry;
    style: NameStyle;
  }
  
  export interface FormData {
    industry: BusinessIndustry;
    style: NameStyle;
    includeDomain: boolean;
    domainStyle: DomainStyle;
    count: number;
  }