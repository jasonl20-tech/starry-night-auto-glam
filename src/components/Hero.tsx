
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
            AUTO STERNENHIMMEL
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-300 max-w-4xl mx-auto">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="geometric-shape bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Kostenlose Beratung
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-600 bg-gray-800/50 text-white hover:bg-gray-700 font-semibold text-lg px-12 py-6 backdrop-blur-sm"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">2h</div>
            <div className="text-lg font-medium text-white mb-2">Schneller Einbau</div>
            <div className="text-gray-400">Professionelle Installation</div>
          </div>
          <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 geometric-shape transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">5J</div>
            <div className="text-lg font-medium text-white mb-2">Garantie</div>
            <div className="text-gray-400">Vollumfänglicher Schutz</div>
          </div>
          <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">4.9</div>
            <div className="text-lg font-medium text-white mb-2">Kundenbewertung</div>
            <div className="text-gray-400">Über 1000 Bewertungen</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
