
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Verbesserte animierte Sterne */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-stellar-300 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Schwebende Galaxie-Elemente */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            {['🌌', '✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-space-grotesk font-black mb-6 text-stellar-300 animate-pulse-glow">
            AUTO STERNENHIMMEL
          </h1>
          <h2 className="text-3xl md:text-4xl font-poppins font-medium mb-8 text-white animate-slide-in-right">
            Verwandeln Sie Ihr Fahrzeug in einen luxuriösen Raum voller Sterne
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in">
            ⭐ Über 1000+ zufriedene Kunden ⭐<br/>
            Professioneller Einbau von Sternenhimmeln direkt in Ihr Auto. 
            Erleben Sie jeden Fahrt wie eine Reise durch das Universum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-bounce-in">
          <Button 
            size="lg" 
            className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-bold text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-subtle"
          >
            🚗 JETZT KOSTENLOS BERATEN LASSEN
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-stellar-400 text-stellar-300 hover:bg-stellar-400 hover:text-midnight-900 font-poppins font-bold text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
          >
            📱 WhatsApp Kontakt
          </Button>
        </div>

        {/* Vertrauen schaffende Elemente */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center animate-fade-in">
          <div className="text-stellar-300">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-2xl font-bold">2 Stunden</div>
            <div className="text-lg">Schneller Einbau</div>
          </div>
          <div className="text-stellar-300">
            <div className="text-4xl mb-2">🛡️</div>
            <div className="text-2xl font-bold">5 Jahre</div>
            <div className="text-lg">Garantie</div>
          </div>
          <div className="text-stellar-300">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold">4.9/5</div>
            <div className="text-lg">Kundenbewertung</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
