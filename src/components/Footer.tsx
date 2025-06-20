
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
}

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+49 151 47918371',
    email: 'info@sternenhimmelauto.de',
    address: 'Louis-steitz-straße, 67292 Kirchheimbolanden'
  });
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    facebook: '#',
    instagram: '#',
    twitter: '#',
    whatsapp: '#'
  });

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('*')
        .in('key', ['contact_info', 'social_media']);

      data?.forEach((config) => {
        if (config.key === 'contact_info' && typeof config.value === 'object' && config.value !== null) {
          setContactInfo(config.value as unknown as ContactInfo);
        } else if (config.key === 'social_media' && typeof config.value === 'object' && config.value !== null) {
          setSocialMedia(config.value as unknown as SocialMedia);
        }
      });
    } catch (error) {
      console.log('Fehler beim Laden der Footer-Daten:', error);
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-700/50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
              STERNENHIMMELAUTO
            </h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base lg:max-w-md">
              Ihr Spezialist für luxuriöse Fahrzeugveredelung. 
              Verwandeln Sie Ihr Auto in einen magischen Raum voller Sterne.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={socialMedia.facebook} className="text-amber-300 hover:text-amber-200 transition-colors text-sm sm:text-base">
                📘 Facebook
              </a>
              <a href={socialMedia.instagram} className="text-amber-300 hover:text-amber-200 transition-colors text-sm sm:text-base">
                📷 Instagram
              </a>
              <a href={socialMedia.twitter} className="text-amber-300 hover:text-amber-200 transition-colors text-sm sm:text-base">
                🐦 Twitter
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-amber-300 transition-colors text-sm sm:text-base">
                Home
              </Link>
              <Link to="/galerie" className="block text-gray-300 hover:text-amber-300 transition-colors text-sm sm:text-base">
                Galerie
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-amber-300 transition-colors text-sm sm:text-base">
                Blog
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-amber-300 transition-colors text-sm sm:text-base">
                FAQ
              </Link>
              <Link to="/kontakt" className="block text-gray-300 hover:text-amber-300 transition-colors text-sm sm:text-base">
                Kontakt
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <p className="break-words">📍 {contactInfo.address}</p>
              <p>📞 {contactInfo.phone}</p>
              <p className="break-words">✉️ {contactInfo.email}</p>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700/50 my-6 sm:my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm gap-4">
          <p>&copy; 2024 Sternenhimmelauto. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <a href="#" className="hover:text-amber-300 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Impressum</a>
            <a href="#" className="hover:text-amber-300 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
