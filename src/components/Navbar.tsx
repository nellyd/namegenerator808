import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-100">
          NameGeno
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-blue-100">Name Generators</Link>
          <Link href="/about" className="hover:text-blue-100">About</Link>
        
        </div>
      </div>
    </nav>
  );
}