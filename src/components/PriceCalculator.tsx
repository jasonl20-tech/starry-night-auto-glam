
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PriceCalculator = () => {
  const [stars, setStars] = useState([500]);
  const [shootingStars, setShootingStars] = useState(0);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  
  const basePrice = (stars[0] / 100) * 200; // 100 Sterne = 200 Euro
  const shootingStarsPrice = shootingStars * 25;
  const sparklePrice = sparkleEffect ? 50 : 0;
  const totalAddOns = shootingStarsPrice + sparklePrice;
  const totalPrice = basePrice + totalAddOns;
  
  const originalPrice = totalPrice * 1.3; // 30% höherer "Original"preis für Rabatt-Effekt
  const discount = originalPrice - totalPrice;
  const discountPercentage = Math.round((discount / originalPrice) * 100);

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
    <section className="py-20 px-6 floating-particles">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gold-400 mb-4">
            PREIS KALKULATOR
          </h2>
          <p className="text-xl text-gray-300">
            Berechnen Sie den Preis für Ihren individuellen Sternenhimmel
          </p>
        </div>

        <Card className="bg-gray-900/50 border-gold-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-space-grotesk text-gold-400 text-center">
              Wählen Sie die Anzahl der Sterne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-poppins text-white">Anzahl Sterne:</span>
                <span className="text-2xl font-space-grotesk font-bold text-gold-400">
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
              
              <div className="text-center text-gray-300">
                <span className="text-lg">Grundpreis: €{basePrice.toFixed(0)}</span>
                <p className="text-sm text-gray-400">100 Sterne = €200</p>
              </div>
            </div>

            {/* Zusatzoptionen */}
            <div className="space-y-4">
              <h3 className="text-xl font-space-grotesk font-semibold text-gold-400 text-center">
                Zusatzoptionen
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {addOnOptions.map((option) => (
                  <Card key={option.name} className="bg-black/30 border-gold-400/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-3xl">{option.preview}</div>
                        <div className="flex-1">
                          <h4 className="font-space-grotesk font-semibold text-gold-400">
                            {option.name}
                          </h4>
                          <p className="text-sm text-gray-300">€{option.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-3">
                        {option.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gold-400/50 text-gold-400 hover:bg-gold-400/10">
                              Weitere Infos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gold-400/30">
                            <DialogHeader>
                              <DialogTitle className="text-gold-400 font-space-grotesk">
                                {option.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-center text-6xl">{option.preview}</div>
                              <p className="text-gray-300">{option.details}</p>
                              <div className="text-center">
                                <span className="text-2xl font-space-grotesk font-bold text-gold-400">
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
                              className="border-gold-400/50 text-gold-400 hover:bg-gold-400/10"
                            >
                              -
                            </Button>
                            <span className="text-gold-400 font-semibold px-2">{shootingStars}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShootingStars(shootingStars + 1)}
                              className="border-gold-400/50 text-gold-400 hover:bg-gold-400/10"
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
                              ? "bg-gold-400 text-black hover:bg-gold-500" 
                              : "border-gold-400/50 text-gold-400 hover:bg-gold-400/10"
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

            <div className="bg-black/30 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 line-through">Regulärer Preis:</span>
                <span className="text-gray-400 line-through text-xl">
                  €{originalPrice.toFixed(0)}
                </span>
              </div>
              
              {totalAddOns > 0 && (
                <div className="flex justify-between items-center text-blue-400">
                  <span className="font-medium">Zusatzoptionen:</span>
                  <span className="text-lg font-semibold">€{totalAddOns.toFixed(0)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-green-400">
                <span className="font-medium">
                  🎉 Aktionsrabatt ({discountPercentage}%):
                </span>
                <span className="text-xl font-bold">
                  -€{discount.toFixed(0)}
                </span>
              </div>
              
              <hr className="border-gold-400/20" />
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-space-grotesk font-bold text-white">
                  Ihr Preis:
                </span>
                <span className="text-3xl font-space-grotesk font-black text-gold-400">
                  €{totalPrice.toFixed(0)}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 text-center">
                * Preis inkl. professionellem Einbau und Materialien
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gold-400 hover:bg-gold-500 text-black font-poppins font-bold text-xl py-6"
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
