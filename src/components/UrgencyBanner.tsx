
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
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-r from-red-900/30 to-stellar-900/30 border-2 border-stellar-400 animate-pulse-subtle">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-stellar-300 mb-4">
              🔥 LIMITIERTES ANGEBOT
            </h2>
            <p className="text-xl text-white mb-6">
              Nur noch <span className="text-stellar-300 font-bold">3 Termine</span> diese Woche verfügbar!
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="bg-midnight-900/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-stellar-300">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Stunden</div>
              </div>
              <div className="bg-midnight-900/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-stellar-300">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Minuten</div>
              </div>
              <div className="bg-midnight-900/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-stellar-300">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Sekunden</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-lg text-gray-300 mb-2">
                <span className="line-through">499€</span> 
                <span className="text-stellar-300 font-bold text-2xl ml-2">399€</span>
              </div>
              <div className="text-sm text-gray-400">
                100€ Rabatt nur für die nächsten 24 Stunden!
              </div>
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 animate-bounce">
              🚨 JETZT ZUSCHLAGEN - NUR NOCH 24H!
            </Button>
            
            <p className="text-sm text-gray-400 mt-4">
              ⚠️ Dieses Angebot ist zeitlich begrenzt und kann nicht verlängert werden
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UrgencyBanner;
