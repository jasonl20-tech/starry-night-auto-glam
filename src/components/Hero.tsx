
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            AUTO STERNENHIMMEL
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-700 max-w-4xl mx-auto">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-lg shadow-lg"
          >
            Kostenlose Beratung
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg px-12 py-4 rounded-lg"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-blue-600 mb-2">2 Stunden</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Schneller Einbau</div>
            <div className="text-gray-600">Professionelle Installation</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-blue-600 mb-2">5 Jahre</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Garantie</div>
            <div className="text-gray-600">Vollumfänglicher Schutz</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Kundenbewertung</div>
            <div className="text-gray-600">Über 1000 Bewertungen</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
