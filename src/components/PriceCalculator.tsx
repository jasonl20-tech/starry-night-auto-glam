
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
      className={`py-20 px-6 unified-section-bg transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className={`text-center mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            PREIS KALKULATOR
          </h2>
          <div className="w-24 h-1 unified-gold-gradient mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Berechnen Sie den Preis für Ihren individuellen Sternenhimmel
          </p>
        </div>

        <Card className={`unified-card-enhanced border-gray-600/50 backdrop-blur-sm transition-all duration-700 delay-400 hover:border-gray-500/70 hover:scale-[1.01] shadow-2xl ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold text-white text-center">
              Wählen Sie die Anzahl der Sterne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-100">Anzahl Sterne:</span>
                <span className="text-3xl font-bold text-amber-300">
                  {stars[0]}
                </span>
              </div>
              
              <div className="px-4">
                <Slider
                  value={stars}
                  onValueChange={setStars}
                  max={1200}
                  min={300}
                  step={100}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-400 px-4">
                <span>300 Sterne</span>
                <span>1200 Sterne</span>
              </div>
              
              <div className="text-center unified-price-card rounded-xl p-6 border border-gray-600/50">
                <span className="text-2xl font-bold text-white">Grundpreis: €{basePrice.toFixed(0)}</span>
                <p className="text-sm text-gray-300 mt-2">100 Sterne = €200</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center">
                Zusatzoptionen
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {addOnOptions.map((option, index) => (
                  <Card 
                    key={option.name} 
                    className={`unified-addon-card border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isVisible ? `opacity-100 translate-y-0 delay-[${600 + index * 100}ms]` : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-4xl">{option.preview}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg">
                            {option.name}
                          </h4>
                          <p className="text-lg text-amber-300 font-bold">€{option.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        {option.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300">
                              Weitere Infos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="unified-dialog-bg border-gray-600">
                            <DialogHeader>
                              <DialogTitle className="text-white font-bold text-xl">
                                {option.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="text-center text-6xl">{option.preview}</div>
                              <p className="text-gray-200 leading-relaxed">{option.details}</p>
                              <div className="text-center">
                                <span className="text-3xl font-bold text-amber-300">
                                  €{option.price}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {option.name === 'Sternschnuppen' ? (
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(Math.max(0, shootingStars - 1))}
                              className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300"
                            >
                              -
                            </Button>
                            <span className="text-white font-bold px-3 min-w-[3rem] text-center text-lg">{shootingStars}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(shootingStars + 1)}
                              className="border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300"
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
                              ? "unified-button-gradient text-white hover:unified-button-hover font-semibold" 
                              : "border-gray-500 text-gray-200 hover:unified-button-gradient hover:text-white hover:border-transparent transition-all duration-300"
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

            <div className="unified-final-price-card rounded-xl p-8 space-y-6 border border-gray-600/50 shadow-xl">
              {totalAddOns > 0 && (
                <div className="flex justify-between items-center text-blue-300">
                  <span className="font-semibold text-lg">Zusatzoptionen:</span>
                  <span className="text-xl font-bold">€{totalAddOns.toFixed(0)}</span>
                </div>
              )}
              
              <hr className="border-gray-600/50" />
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">
                  Gesamtpreis:
                </span>
                <span className="text-4xl font-black text-amber-300">
                  €{totalPrice.toFixed(0)}
                </span>
              </div>
              
              <p className="text-gray-300 text-center">
                * Preis inkl. professionellem Einbau und Materialien
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full unified-cta-button hover:unified-cta-hover text-white font-bold text-xl py-8 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
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
