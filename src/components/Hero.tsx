
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.querySelector('.hero-section') as HTMLElement;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section interactive-bg relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-100 leading-tight tracking-tight">
            STERNENHIMMELAUTO
          </h1>
          <div className="w-32 h-1 gold-accent mx-auto mb-8 animate-pulse-glow"></div>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-200 max-w-4xl mx-auto">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="geometric-shape subtle-gold-gradient hover:premium-gradient text-white font-semibold text-lg px-12 py-6 border border-gray-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            Kostenlose Beratung
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-600 bg-gray-800/50 text-gray-100 hover:subtle-gold-gradient hover:border-amber-500/50 font-semibold text-lg px-12 py-6 transition-all duration-300"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-gray-800/30 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50">
            <div className="w-16 h-16 subtle-gold-gradient mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl geometric-shape">2h</div>
            <div className="text-lg font-medium text-gray-100 mb-2">Schneller Einbau</div>
            <div className="text-gray-400">Professionelle Installation</div>
          </div>
          <div className="text-center p-8 bg-gray-800/30 border border-gray-700 geometric-shape transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50">
            <div className="w-16 h-16 subtle-gold-gradient mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">5J</div>
            <div className="text-lg font-medium text-gray-100 mb-2">Garantie</div>
            <div className="text-gray-400">Vollumfänglicher Schutz</div>
          </div>
          <div className="text-center p-8 bg-gray-800/30 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50">
            <div className="w-16 h-16 subtle-gold-gradient mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">4.9</div>
            <div className="text-lg font-medium text-gray-100 mb-2">Kundenbewertung</div>
            <div className="text-gray-400">Über 1000 Bewertungen</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
