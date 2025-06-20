
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface HeroImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

const Hero = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const fetchHeroImages = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('*')
        .eq('key', 'hero_images')
        .single();
      
      if (data && data.value) {
        setHeroImages((data.value as any) || []);
      }
    } catch (error) {
      console.log('No hero images configured yet');
    }
  };

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
    <section className="hero-section interactive-bg animated-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.length > 0 ? (
          heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-70' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          // Fallback placeholders
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="image-placeholder rounded-lg opacity-20"
              >
                Bild {i} Platzhalter
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="hero-bg-layer absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight">
            STERNENHIMMELAUTO
          </h1>
          <div className="w-24 sm:w-32 h-1 unified-gold-gradient mx-auto mb-6 sm:mb-8 animate-pulse-glow"></div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-8 text-gray-100 max-w-4xl mx-auto px-4">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-base sm:text-xl text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-slide-in-left delay-200 px-4">
          <Button 
            size="lg" 
            className="geometric-shape unified-button-gradient hover:unified-button-hover text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 border border-gray-600/50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            Kostenlose Beratung
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-500 bg-gray-800/50 text-gray-100 hover:unified-button-gradient hover:border-amber-400/50 font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 transition-all duration-300"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto animate-slide-in-right delay-400 px-4">
          <div className="text-center p-4 sm:p-8 unified-card-bg border border-gray-600/50 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/60">
            <div className="w-12 h-12 sm:w-16 sm:h-16 unified-accent-gradient mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl geometric-shape">2h</div>
            <div className="text-base sm:text-lg font-medium text-gray-100 mb-2">Schneller Einbau</div>
            <div className="text-sm sm:text-base text-gray-300">Professionelle Installation</div>
          </div>
          <div className="text-center p-4 sm:p-8 unified-card-bg border border-gray-600/50 geometric-shape transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/60">
            <div className="w-12 h-12 sm:w-16 sm:h-16 unified-accent-gradient mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl">5J</div>
            <div className="text-base sm:text-lg font-medium text-gray-100 mb-2">Garantie</div>
            <div className="text-sm sm:text-base text-gray-300">Vollumfänglicher Schutz</div>
          </div>
          <div className="text-center p-4 sm:p-8 unified-card-bg border border-gray-600/50 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/60 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 unified-accent-gradient mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl">4.9</div>
            <div className="text-base sm:text-lg font-medium text-gray-100 mb-2">Kundenbewertung</div>
            <div className="text-sm sm:text-base text-gray-300">Über 1000 Bewertungen</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
