'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Wand2 } from 'lucide-react';

// Define the generators data
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
  { name: 'Dragon Ball Name Generator', path: '/dragon-ball-name-generator', description: 'Generate Cool Dragon Ball Names' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Wand2 className="h-10 w-10 text-blue-600" />
            About NameGeno
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to NameGeno, your ultimate resource for generating unique, memorable names for every need. Whether you're a writer crafting characters, an entrepreneur building a brand, or just looking for fun ideas for pets, usernames, and more, we’ve got you covered!
<br></br><br></br> 
          At NameGeno, we believe that a name is more than just a label; it’s an identity. That’s why we’ve created a versatile tool that lets you explore endless possibilities across genres, themes, and styles. With our powerful generator, you can find the ideal name to bring any idea to life—from mystical lands and powerful superheroes to modern usernames and city names.
            We offer customization options to help you refine your choices and ensure every name captures the essence of your vision.
           <br></br> <br></br> 
Our mission is to empower creators, whether they’re writers, gamers, business owners, or world-builders, with names that stand out. NameGeno was built with simplicity and creativity in mind, so you can quickly generate, browse, and select the names that resonate with you most.
<br></br><br></br> 
Thank you for choosing NameGeno to be part of your creative journey. We’re excited to help you find the perfect name, every time!
          </p>
        </div>

        

        {/* New styled content section */}
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Find the Perfect Name, Every Time
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to NameGeno.com, your ultimate name generator for any occasion! Whether you're naming a character, choosing a baby name, or just searching for creative inspiration, we've got you covered. With our smart tools, you can let us surprise you with random names or take the wheel and customize your search. Explore names from different cultures, eras, and styles. Filter by popularity, gender, and even unique word associations. Our generators even create completely original names to help you stand out.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12">
            <section className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Names Matter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A name is more than just a label; it's a first impression, a hint at a personality, and sometimes even a story in itself. Imagine if your favorite character went by a different name—would it feel the same? Names hold power, shaping perceptions and sparking connections.
              </p>
            </section>

            <section className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                For Real People, Characters, and More
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choosing a name for a child, a new pet, or a business? A great name can influence how people perceive you or your brand. Use our generator to find meaningful, popular, or timeless names that fit your personality or the image you want to create.
              </p>
            </section>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <section className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Built for Developers and Designers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tired of "Lorem Ipsum"? Use realistic names to bring life to your mockups, websites, and templates. Randomly generated names provide a natural feel, making it easy to test form fields, user profiles, or app features with content that feels real.
              </p>
            </section>

            <section className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Protect Your Privacy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                In a world where online privacy is essential, our generator offers names for situations where you'd rather stay anonymous. Create names for accounts, public profiles, and anywhere you'd prefer to keep your real identity private.
              </p>
            </section>
          </div>

          <section className="text-center bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Get Creative with Pets, Places, and More
            </h3>
            <p className="text-blue-700 leading-relaxed">
              Need a name for a new pet, a fantasy world, or your dream business? Our generator opens up endless possibilities. Start with a theme or let us inspire you with random suggestions. Sometimes, the perfect name is one you never expected!
            </p>
          </section>

          <section className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Start Generating Today!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Whatever your naming needs, NameGeneratorHub is here to make the process fun, easy, and inspiring. Dive in, explore, and find the perfect name with just a few clicks.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 NameGeno.com All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}