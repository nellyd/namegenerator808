// src/components/GeneratorLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const generators = [
  { name: 'Name Generator', path: '/name-generator', description: 'Generate random full names' },
  { name: 'Last Name Generator', path: '/last-name-generator', description: 'Create unique last names' },
  { name: 'Nickname Generator', path: '/nickname-generator', description: 'Generate cool nicknames' },
  { name: 'Team Name Generator', path: '/team-name-generator', description: 'Create team names' },
  { name: 'Rap Name Generator', path: '/rap-name-generator', description: 'Generate hip hop names' },
  { name: 'City Name Generator', path: '/city-name-generator', description: 'Create city names' },
  { name: 'Country Name Generator', path: '/country-name-generator', description: 'Generate country names' },
  { name: 'Ship Name Generator', path: '/ship-name-generator', description: 'Create ship names' },
  { name: 'Girl Name Generator', path: '/girl-name-generator', description: 'Generate female names' },
  { name: 'Character Name Generator', path: '/character-name-generator', description: 'Create character names' },
  { name: 'Game Name Generator', path: '/game-name-generator', description: 'Generate game names' },
  { name: 'Band Name Generator', path: '/band-name-generator', description: 'Create band names' },
  { name: 'Superhero Name Generator', path: '/superhero-name-generator', description: 'Generate superhero names' },
  { name: 'Boy Name Generator', path: '/boy-name-generator', description: 'Generate male names' },
  { name: 'Villain Name Generator', path: '/villain-name-generator', description: 'Create villain names' },
  { name: 'Cat Name Generator', path: '/cat-name-generator', description: 'Generate cat names' },
  { name: 'Pen Name Generator', path: '/pen-name-generator', description: 'Create pen names' },
  { name: 'Middle Name Generator', path: '/middle-name-generator', description: 'Generate middle names' },
  { name: 'Quick Name Generator', path: '/quick-name-generator', description: 'Quick random names' },
  { name: 'Blog Name Generator', path: '/blog-name-generator', description: 'Create blog names' },
  { name: 'Street Name Generator', path: '/street-name-generator', description: 'Generate street names' },
  { name: 'Food Name Generator', path: '/food-name-generator', description: 'Create food names' },
  { name: 'Fantasy Name Generator', path: '/fantasy-name-generator', description: 'Generate fantasy names' },
  { name: 'House Name Generator', path: '/house-name-generator', description: 'Create house names' },
  { name: 'Pirate Name Generator', path: '/pirate-name-generator', description: 'Generate pirate names' },
  { name: 'Baby Name Generator', path: '/baby-name-generator', description: 'Find baby names' },
  { name: 'Username Generator', path: '/username-generator', description: 'Create usernames' },
  { name: 'Twin Name Generator', path: '/twin-name-generator', description: 'Generate twin names' },
  { name: 'Title Generator', path: '/title-generator', description: 'Create random titles' },
  { name: 'Business Name Generator', path: '/business-name-generator', description: 'Generate business names' },
  { name: 'Instagram Name Generator', path: '/instagram-name-generator', description: 'Create Instagram names' },
  { name: 'Identity Generator', path: '/identity-generator', description: 'Generate new identities' },
  { name: 'Dog Name Generator', path: '/dog-name-generator', description: 'Generate a cool name for your new dog' },
  { name: 'Non-Binary Name Generator', path: '/non-binary-name-generator', description: 'Find Your Identity with Names That Fit You' },
  { name: 'Warhammer Name Generator', path: '/warhammer-name-generator', description: 'Generate Cool Warhammer Names' },
  { name: 'Rohan Character Name Generator', path: '/rohan-name-generator', description: 'Generate Cool Rohan Character Names' },
  { name: 'Tau Empire Character Name Generator', path: '/tau-empire-character-name-generator', description: 'Generate Cool Tau Empire Names' },
  { name: 'Dragon Ball Name Generator', path: '/dragon-ball-name-generator', description: 'Generate Cool Dragon Ball Names' },
];

export default function GeneratorLinks() {
  const pathname = usePathname();

  // Split generators into three columns
  const chunkSize = Math.ceil(generators.length / 3);
  const columns = [
    generators.slice(0, chunkSize),
    generators.slice(chunkSize, chunkSize * 2),
    generators.slice(chunkSize * 2)
  ];

  return (
    <div className="bg-gray-100 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Explore Other Name Generators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((generator) => (
                <Link
                  key={generator.path}
                  href={generator.path}
                  className={`block p-4 rounded-lg transition-colors duration-200 ${
                    pathname === generator.path
                      ? 'bg-blue-100 hover:bg-blue-200'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium text-blue-600">{generator.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{generator.description}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}