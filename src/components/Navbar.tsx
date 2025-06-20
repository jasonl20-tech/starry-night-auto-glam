
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-40 border-b border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-2xl font-bold text-white hover:text-amber-300 transition-colors duration-300">
            STERNENHIMMELAUTO
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-300 hover:text-amber-300 transform hover:scale-105 ${
                  location.pathname === item.path 
                    ? 'text-amber-300' 
                    : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="border-amber-500 text-amber-300 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <span className="text-gray-300 text-sm">
                  {user.email}
                </span>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                  Abmelden
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="unified-button-gradient hover:unified-button-hover text-white border border-gray-600/50 hover:scale-105 transition-all duration-300"
                >
                  Anmelden
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-300 p-2 hover:scale-110 transition-transform duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700/50 animate-fade-in">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors duration-300 hover:text-amber-300 py-2 transform hover:translate-x-2 ${
                    location.pathname === item.path 
                      ? 'text-amber-300' 
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-700/50">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full border-amber-500 text-amber-300 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <div className="text-gray-300 text-sm">
                      {user.email}
                    </div>
                    <Button 
                      onClick={handleSignOut}
                      variant="outline" 
                      size="sm"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      Abmelden
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      size="sm"
                      className="w-full unified-button-gradient hover:unified-button-hover text-white border border-gray-600/50 hover:scale-105 transition-all duration-300"
                    >
                      Anmelden
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
