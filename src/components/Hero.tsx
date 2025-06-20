
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden floating-particles">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-stellar-300 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-space-grotesk font-black mb-6 text-stellar-300">
          AUTO STERNENHIMMEL
        </h1>
        <h2 className="text-2xl md:text-3xl font-poppins font-medium mb-8 text-white">
          Verwandeln Sie Ihr Fahrzeug in einen luxuriösen Raum voller Sterne
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Professioneller Einbau von Sternenhimmeln direkt in Ihr Auto. 
          Erleben Sie jeden Fahrt wie eine Reise durch das Universum.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-bold text-lg px-8 py-4"
          >
            Jetzt Preis berechnen
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-stellar-400 text-stellar-300 hover:bg-stellar-400 hover:text-midnight-900 font-poppins font-bold text-lg px-8 py-4"
          >
            Galerie ansehen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
