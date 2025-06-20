
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PriceCalculator = () => {
  const [stars, setStars] = useState([500]);
  const [shootingStars, setShootingStars] = useState(0);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const basePrice = (stars[0] / 100) * 200;
  const shootingStarsPrice = shootingStars * 25;
  const sparklePrice = sparkleEffect ? 50 : 0;
  const totalAddOns = shootingStarsPrice + sparklePrice;
  const totalPrice = basePrice + totalAddOns;

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const addOnOptions = [
    {
      name: 'Sternschnuppen',
      price: 25,
      description: 'Magische Sternschnuppen-Effekte für extra Romantik',
      preview: '💫',
      details: 'Hochwertige LED-Sternschnuppen die sanft über Ihren Sternenhimmel gleiten und eine romantische Atmosphäre schaffen.'
    },
    {
      name: 'Funkel-Effekt',
      price: 50,
      description: 'Sanftes Funkeln der Sterne für lebendige Atmosphäre',
      preview: '✨',
      details: 'Ein spezieller Dimm-Controller sorgt für ein natürliches Funkeln der Sterne, wie am echten Nachthimmel.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 unified-section-bg transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            PREIS KALKULATOR
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 unified-gold-gradient mx-auto mb-4 sm:mb-6 lg:mb-8"></div>
          <p className="text-sm sm:text-base lg:text-xl text-gray-200 max-w-3xl mx-auto px-2">
            Berechnen Sie den Preis für Ihren individuellen Sternenhimmel
          </p>
        </div>

        <Card className={`unified-card-enhanced border-gray-600/50 backdrop-blur-sm transition-all duration-700 delay-400 hover:border-gray-500/70 hover:scale-[1.01] shadow-2xl ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center px-2">
              Wählen Sie die Anzahl der Sterne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <span className="text-lg sm:text-xl font-semibold text-gray-100">Anzahl Sterne:</span>
                <span className="text-2xl sm:text-3xl font-bold text-amber-300">
                  {stars[0]}
                </span>
              </div>
              
              <div className="px-2 sm:px-4">
                <Slider
                  value={stars}
                  onValueChange={setStars}
                  max={1200}
                  min={300}
                  step={100}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-between text-xs sm:text-sm text-gray-400 px-2 sm:px-4">
                <span>300 Sterne</span>
                <span>1200 Sterne</span>
              </div>
              
              <div className="text-center unified-price-card rounded-xl p-4 sm:p-6 border border-gray-600/50">
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  Grundpreis: €{basePrice.toFixed(0)}
                </span>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">100 Sterne = €200</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
                Zusatzoptionen
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {addOnOptions.map((option, index) => (
                  <Card 
                    key={option.name} 
                    className={`unified-addon-card border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isVisible ? `opacity-100 translate-y-0 delay-[${600 + index * 100}ms]` : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="text-2xl sm:text-4xl">{option.preview}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-base sm:text-lg">
                            {option.name}
                          </h4>
                          <p className="text-base sm:text-lg text-amber-300 font-bold">€{option.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        {option.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300 text-xs sm:text-sm">
                              Weitere Infos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="unified-dialog-bg border-gray-600 max-w-sm sm:max-w-md mx-4">
                            <DialogHeader>
                              <DialogTitle className="text-white font-bold text-lg sm:text-xl">
                                {option.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 sm:space-y-6">
                              <div className="text-center text-4xl sm:text-6xl">{option.preview}</div>
                              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{option.details}</p>
                              <div className="text-center">
                                <span className="text-2xl sm:text-3xl font-bold text-amber-300">
                                  €{option.price}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {option.name === 'Sternschnuppen' ? (
                          <div className="flex items-center justify-center sm:justify-end space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(Math.max(0, shootingStars - 1))}
                              className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300 w-8 h-8 p-0"
                            >
                              -
                            </Button>
                            <span className="text-white font-bold px-2 min-w-[2rem] text-center text-base sm:text-lg">{shootingStars}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(shootingStars + 1)}
                              className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300 w-8 h-8 p-0"
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant={sparkleEffect ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSparkleEffect(!sparkleEffect)}
                            className={sparkleEffect 
                              ? "unified-button-gradient text-white hover:unified-button-hover font-semibold text-xs sm:text-sm" 
                              : "border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300 text-xs sm:text-sm"
                            }
                          >
                            {sparkleEffect ? 'Ausgewählt' : 'Hinzufügen'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="unified-final-price-card rounded-xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 border border-gray-600/50 shadow-xl">
              {totalAddOns > 0 && (
                <div className="flex justify-between items-center text-blue-300">
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">Zusatzoptionen:</span>
                  <span className="text-lg sm:text-xl font-bold">€{totalAddOns.toFixed(0)}</span>
                </div>
              )}
              
              <hr className="border-gray-600/50" />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  Gesamtpreis:
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300">
                  €{totalPrice.toFixed(0)}
                </span>
              </div>
              
              <p className="text-gray-300 text-center text-xs sm:text-sm">
                * Preis inkl. professionellem Einbau und Materialien
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full unified-cta-button hover:unified-cta-hover text-white font-bold text-base sm:text-lg lg:text-xl py-4 sm:py-6 lg:py-8 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
            >
              Jetzt Termin vereinbaren - €{totalPrice.toFixed(0)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PriceCalculator;
