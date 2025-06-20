
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';

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
          // Dynamische Platzhalter
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
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
      
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          {/* Enhanced logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
              <Star className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight">
            STERNENHIMMELAUTO
          </h1>
          <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto mb-6 sm:mb-8 animate-pulse-glow rounded-full"></div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8 text-gray-100 max-w-5xl mx-auto px-4">
            Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. 
            Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum.
          </p>
        </div>
        
        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-left delay-200 px-4">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold text-lg px-12 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-amber-400/20"
          >
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-500 bg-gray-800/50 backdrop-blur-sm text-gray-100 hover:bg-gradient-to-r hover:from-amber-600/10 hover:to-amber-500/10 hover:border-amber-400/50 font-semibold text-lg px-12 py-6 rounded-xl transition-all duration-300 hover:shadow-xl"
          >
            Kontakt aufnehmen
          </Button>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-in-right delay-400 px-4">
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl rounded-full shadow-lg group-hover:shadow-blue-500/25">
              2h
            </div>
            <div className="text-xl font-semibold text-gray-100 mb-2">Schneller Einbau</div>
            <div className="text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Professionelle Installation
            </div>
          </div>
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl rounded-full shadow-lg group-hover:shadow-green-500/25">
              5J
            </div>
            <div className="text-xl font-semibold text-gray-100 mb-2">Garantie</div>
            <div className="text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Vollumfänglicher Schutz
            </div>
          </div>
          <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl rounded-full shadow-lg group-hover:shadow-amber-500/25">
              4.9
            </div>
            <div className="text-xl font-semibold text-gray-100 mb-2">Kundenbewertung</div>
            <div className="text-gray-300 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Über 1000 Bewertungen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
