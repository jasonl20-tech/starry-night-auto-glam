
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

interface HeroPlaceholder {
  id: string;
  text: string;
  position: number;
}

const Hero = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroPlaceholders, setHeroPlaceholders] = useState<HeroPlaceholder[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const fetchHeroContent = async () => {
    try {
      // Lade Hero-Bilder aus hero_images Konfiguration
      const { data: heroData } = await supabase
        .from('app_config')
        .select('*')
        .eq('key', 'hero_images')
        .single();
      
      let configuredHeroImages: HeroImage[] = [];
      if (heroData && heroData.value) {
        configuredHeroImages = (heroData.value as any) || [];
      }

      // Lade auch hochgeladene Bilder mit hero placement
      const { data: uploadedHeroData } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('placement_type', 'hero')
        .order('placement_position', { ascending: true });

      const combinedHeroImages: HeroImage[] = [...configuredHeroImages];

      // Füge hochgeladene Bilder hinzu
      if (uploadedHeroData) {
        uploadedHeroData.forEach(img => {
          combinedHeroImages.push({
            id: img.id,
            url: img.url,
            alt: img.alt_text || img.filename,
            position: img.placement_position
          });
        });
      }

      // Sortiere nach Position
      combinedHeroImages.sort((a, b) => a.position - b.position);
      setHeroImages(combinedHeroImages);

      // Lade Platzhalter-Konfiguration nur wenn keine Bilder vorhanden
      if (combinedHeroImages.length === 0) {
        const { data: placeholderData } = await supabase
          .from('app_config')
          .select('*')
          .eq('key', 'hero_placeholders')
          .single();
        
        if (placeholderData && placeholderData.value) {
          setHeroPlaceholders((placeholderData.value as any) || []);
        }
      }
    } catch (error) {
      console.log('Fehler beim Laden der Hero-Inhalte:', error);
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
      {/* Background Images with enhanced overlay */}
      <div className="absolute inset-0">
        {heroImages.length > 0 ? (
          heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-40' : 'opacity-0'
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
          // Verstecke Platzhalter auf Mobile für bessere Performance
          <div className="absolute inset-0 hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {heroPlaceholders.map((placeholder) => (
              <div
                key={placeholder.id}
                className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-lg opacity-20 flex items-center justify-center text-gray-500 text-sm font-medium"
              >
                {placeholder.text}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="hero-bg-layer absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/70 to-gray-900/90"></div>
      
      {/* Animated stars - versteckt auf sehr kleinen Bildschirmen */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="relative z-10 text-center px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up">
          <h1 className="animated-title text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-3 sm:mb-4 lg:mb-6 text-white leading-tight tracking-tight">
            STERNENHIMMELAUTO
          </h1>
          <div className="w-16 sm:w-24 lg:w-40 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-pulse-glow rounded-full"></div>
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl font-medium mb-4 sm:mb-6 lg:mb-8 text-gray-100 max-w-5xl mx-auto px-2 sm:px-4">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-200 mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            <span className="hidden sm:inline">Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.</span>
          </p>
        </div>
        
        {/* Enhanced CTA buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 justify-center mb-8 sm:mb-12 lg:mb-16 animate-slide-in-left delay-200 px-2 sm:px-4">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-amber-400/20"
          >
            Kostenlose Beratung
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-500 bg-gray-800/50 backdrop-blur-sm text-gray-100 hover:bg-gradient-to-r hover:from-amber-600/10 hover:to-amber-500/10 hover:border-amber-400/50 font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl transition-all duration-300 hover:shadow-xl"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        {/* Enhanced feature cards - angepasst für Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto animate-slide-in-right delay-400 px-2 sm:px-4">
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl rounded-full shadow-lg group-hover:shadow-blue-500/25">
              2h
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-100 mb-1 sm:mb-2">Schneller Einbau</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
              <span className="hidden xs:inline">Professionelle </span>Installation
            </div>
          </div>
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl rounded-full shadow-lg group-hover:shadow-green-500/25">
              5J
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-100 mb-1 sm:mb-2">Garantie</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
              <span className="hidden xs:inline">Vollumfänglicher </span>Schutz
            </div>
          </div>
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl rounded-full shadow-lg group-hover:shadow-amber-500/25">
              4.9
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-100 mb-1 sm:mb-2">Kundenbewertung</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
              <span className="hidden xs:inline">Über 1000 </span>Bewertungen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
