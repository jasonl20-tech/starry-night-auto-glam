
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BeforeAfter = () => {
  const [showAfter, setShowAfter] = useState({});

  const beforeAfterData = [
    {
      id: 1,
      title: 'BMW X7 Transformation',
      before: '🚗',
      after: '🌌',
      description: 'Von standard zu spektakulär'
    },
    {
      id: 2,
      title: 'Mercedes S-Klasse',
      before: '🚙',
      after: '✨',
      description: 'Luxus auf das nächste Level'
    },
    {
      id: 3,
      title: 'Audi Q8 Makeover',
      before: '🚐',
      after: '⭐',
      description: 'Traumhaft schöne Verwandlung'
    }
  ];

  const toggleView = (id) => {
    setShowAfter(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-20 px-6 bg-midnight-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            🔄 VORHER & NACHHER
          </h2>
          <p className="text-xl text-gray-300">
            Sehen Sie die unglaubliche Verwandlung Ihrer Fahrzeuge
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {beforeAfterData.map((item) => (
            <Card key={item.id} className="bg-midnight-800/30 border-stellar-400/20 overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-midnight-700/50 to-midnight-900/50 flex items-center justify-center">
                  <div className="text-8xl transition-all duration-500 transform group-hover:scale-110">
                    {showAfter[item.id] ? item.after : item.before}
                  </div>
                  <div className="absolute top-4 left-4 bg-stellar-500 text-midnight-900 px-3 py-1 rounded-full text-sm font-bold">
                    {showAfter[item.id] ? 'NACHHER' : 'VORHER'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-space-grotesk font-semibold text-stellar-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {item.description}
                  </p>
                  <Button
                    onClick={() => toggleView(item.id)}
                    className="w-full bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-bold"
                  >
                    {showAfter[item.id] ? '← Vorher anzeigen' : 'Nachher anzeigen →'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
