
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-red-900/20 to-orange-900/20">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gray-900/80 border-red-600/50 backdrop-blur-sm">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-2 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Begrenztes Angebot
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Nur noch <span className="text-red-400 font-bold text-2xl">3 Termine</span> diese Woche verfügbar
            </p>
            
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
              <div className="bg-gray-800/50 p-6 border border-gray-600 geometric-shape backdrop-blur-sm">
                <div className="text-3xl font-bold text-red-400">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 font-medium">Stunden</div>
              </div>
              <div className="bg-gray-800/50 p-6 border border-gray-600 backdrop-blur-sm">
                <div className="text-3xl font-bold text-red-400">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 font-medium">Minuten</div>
              </div>
              <div className="bg-gray-800/50 p-6 border border-gray-600 geometric-shape backdrop-blur-sm">
                <div className="text-3xl font-bold text-red-400">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 font-medium">Sekunden</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-2xl text-gray-400 mb-2">
                <span className="line-through">499€</span> 
                <span className="text-red-400 font-bold text-4xl ml-4">399€</span>
              </div>
              <div className="text-gray-500 font-medium">
                100€ Ersparnis nur für die nächsten 24 Stunden
              </div>
            </div>

            <Button className="arrow-shape bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-12 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
              Jetzt Termin sichern
            </Button>
            
            <p className="text-sm text-gray-500 mt-6 font-medium">
              Limitiertes Angebot - Nur solange der Vorrat reicht
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UrgencyBanner;
