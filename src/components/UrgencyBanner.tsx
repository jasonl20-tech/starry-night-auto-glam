
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
    <section className="py-16 px-6 bg-red-50">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white border-2 border-red-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Begrenztes Angebot
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Nur noch <span className="text-red-600 font-bold">3 Termine</span> diese Woche verfügbar
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Stunden</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Minuten</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Sekunden</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-lg text-gray-600 mb-2">
                <span className="line-through">499€</span> 
                <span className="text-red-600 font-bold text-2xl ml-2">399€</span>
              </div>
              <div className="text-sm text-gray-500">
                100€ Ersparnis nur für die nächsten 24 Stunden
              </div>
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4">
              Jetzt Termin sichern
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Limitiertes Angebot - Nur solange der Vorrat reicht
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UrgencyBanner;
