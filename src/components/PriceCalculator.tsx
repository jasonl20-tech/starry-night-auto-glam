
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
  
  const originalPrice = totalPrice * 1.3;
  const discount = originalPrice - totalPrice;
  const discountPercentage = Math.round((discount / originalPrice) * 100);

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
      className={`py-20 px-6 bg-gray-900 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            PREIS KALKULATOR
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">
            Berechnen Sie den Preis für Ihren individuellen Sternenhimmel
          </p>
        </div>

        <Card className={`bg-gray-800/90 border-gray-700 backdrop-blur-sm transition-all duration-700 delay-400 hover:bg-gray-800 hover:scale-[1.01] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Wählen Sie die Anzahl der Sterne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-200">Anzahl Sterne:</span>
                <span className="text-2xl font-bold text-amber-400">
                  {stars[0]}
                </span>
              </div>
              
              <Slider
                value={stars}
                onValueChange={setStars}
                max={1200}
                min={300}
                step={100}
                className="w-full"
              />
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>300 Sterne</span>
                <span>1200 Sterne</span>
              </div>
              
              <div className="text-center text-gray-200 bg-gray-700/50 rounded-lg p-4">
                <span className="text-lg font-semibold">Grundpreis: €{basePrice.toFixed(0)}</span>
                <p className="text-sm text-gray-400 mt-1">100 Sterne = €200</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white text-center">
                Zusatzoptionen
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {addOnOptions.map((option, index) => (
                  <Card 
                    key={option.name} 
                    className={`bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 hover:border-gray-500 transition-all duration-300 hover:scale-105 ${
                      isVisible ? `opacity-100 translate-y-0 delay-[${600 + index * 100}ms]` : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-3xl">{option.preview}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white">
                            {option.name}
                          </h4>
                          <p className="text-sm text-amber-400 font-semibold">€{option.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-3">
                        {option.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors">
                              Weitere Infos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-white font-bold">
                                {option.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-center text-6xl">{option.preview}</div>
                              <p className="text-gray-300">{option.details}</p>
                              <div className="text-center">
                                <span className="text-2xl font-bold text-amber-400">
                                  €{option.price}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {option.name === 'Sternschnuppen' ? (
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(Math.max(0, shootingStars - 1))}
                              className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                            >
                              -
                            </Button>
                            <span className="text-white font-semibold px-2 min-w-[2rem] text-center">{shootingStars}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(shootingStars + 1)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
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
                              ? "bg-amber-500 text-black hover:bg-amber-600 font-semibold" 
                              : "border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
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

            <div className="bg-gray-700/50 rounded-lg p-6 space-y-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 line-through">Regulärer Preis:</span>
                <span className="text-gray-400 line-through text-xl">
                  €{originalPrice.toFixed(0)}
                </span>
              </div>
              
              {totalAddOns > 0 && (
                <div className="flex justify-between items-center text-blue-400">
                  <span className="font-semibold">Zusatzoptionen:</span>
                  <span className="text-lg font-bold">€{totalAddOns.toFixed(0)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-green-400">
                <span className="font-semibold">
                  🎉 Aktionsrabatt ({discountPercentage}%):
                </span>
                <span className="text-xl font-bold">
                  -€{discount.toFixed(0)}
                </span>
              </div>
              
              <hr className="border-gray-600" />
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">
                  Ihr Preis:
                </span>
                <span className="text-3xl font-black text-amber-400">
                  €{totalPrice.toFixed(0)}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 text-center">
                * Preis inkl. professionellem Einbau und Materialien
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold text-xl py-6 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
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
