
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-900 border-t border-stellar-400/20 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-space-grotesk font-bold text-stellar-300 mb-4">
              ⭐ AUTO STERNENHIMMEL
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Ihr Spezialist für luxuriöse Fahrzeugveredelung. 
              Verwandeln Sie Ihr Auto in einen magischen Raum voller Sterne.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stellar-300 hover:text-stellar-200 transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-stellar-300 hover:text-stellar-200 transition-colors">
                📷 Instagram
              </a>
              <a href="#" className="text-stellar-300 hover:text-stellar-200 transition-colors">
                🐦 Twitter
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-space-grotesk font-bold text-stellar-300 mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-stellar-300 transition-colors">
                Home
              </Link>
              <Link to="/galerie" className="block text-gray-300 hover:text-stellar-300 transition-colors">
                Galerie
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-stellar-300 transition-colors">
                Blog
              </Link>
              <Link to="/kontakt" className="block text-gray-300 hover:text-stellar-300 transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-space-grotesk font-bold text-stellar-300 mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 Musterstraße 123</p>
              <p>📍 12345 Musterstadt</p>
              <p>📞 +49 123 456 789</p>
              <p>✉️ info@auto-sternenhimmel.de</p>
            </div>
          </div>
        </div>
        
        <hr className="border-stellar-400/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 Auto Sternenhimmel. Alle Rechte vorbehalten.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-stellar-300 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-stellar-300 transition-colors">Impressum</a>
            <a href="#" className="hover:text-stellar-300 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
