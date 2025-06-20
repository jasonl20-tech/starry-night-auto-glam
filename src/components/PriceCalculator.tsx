
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PriceCalculator = () => {
  const [stars, setStars] = useState([500]);
  
  const basePrice = stars[0];
  const originalPrice = basePrice * 1.3; // 30% höherer "Original"preis für Rabatt-Effekt
  const discount = originalPrice - basePrice;
  const discountPercentage = Math.round((discount / originalPrice) * 100);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-gold-400 mb-4">
            PREIS KALKULATOR
          </h2>
          <p className="text-xl text-gray-300">
            Berechnen Sie den Preis für Ihren individuellen Sternenhimmel
          </p>
        </div>

        <Card className="bg-gray-900/50 border-gold-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-gold-400 text-center">
              Wählen Sie die Anzahl der Sterne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-rajdhani text-white">Anzahl Sterne:</span>
                <span className="text-2xl font-orbitron font-bold text-gold-400">
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
            </div>

            <div className="bg-black/30 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 line-through">Regulärer Preis:</span>
                <span className="text-gray-400 line-through text-xl">
                  €{originalPrice.toFixed(0)}
                </span>
              </div>
              
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
                <span className="text-2xl font-orbitron font-bold text-white">
                  Ihr Preis:
                </span>
                <span className="text-3xl font-orbitron font-black text-gold-400">
                  €{basePrice.toFixed(0)}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 text-center">
                * Preis inkl. professionellem Einbau und Materialien
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gold-400 hover:bg-gold-500 text-black font-rajdhani font-bold text-xl py-6"
            >
              Jetzt Termin vereinbaren - €{basePrice.toFixed(0)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PriceCalculator;
