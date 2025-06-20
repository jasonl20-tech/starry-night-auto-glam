
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Blog', path: '/blog' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-midnight-900/90 backdrop-blur-sm z-40 border-b border-stellar-400/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-space-grotesk font-bold text-stellar-300">
            ⭐ AUTO STERNENHIMMEL
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-poppins font-medium transition-colors hover:text-stellar-300 ${
                  location.pathname === item.path 
                    ? 'text-stellar-300' 
                    : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden">
            <button className="text-stellar-300">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
