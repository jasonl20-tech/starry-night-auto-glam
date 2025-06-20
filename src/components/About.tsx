
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: '⭐',
      title: 'Premium Qualität',
      description: 'Hochwertige LED-Fasern für einen perfekten Sternenhimmel-Effekt'
    },
    {
      icon: '🔧',
      title: 'Professioneller Einbau',
      description: 'Fachgerechte Installation durch erfahrene Spezialisten'
    },
    {
      icon: '💎',
      title: 'Individuelle Gestaltung',
      description: 'Anpassung an Ihre Wünsche und Ihr Fahrzeugmodell'
    },
    {
      icon: '🛡️',
      title: 'Garantie',
      description: '2 Jahre Garantie auf alle Arbeiten und Materialien'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            WARUM AUTO STERNENHIMMEL?
          </h2>
          <div className="w-24 h-1 gold-accent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seit über 10 Jahren verwandeln wir Fahrzeuge in luxuriöse Erlebnisräume. 
            Vertrauen Sie auf unsere Expertise und Leidenschaft für Perfektion.
          </p>
        </div>

        {/* Image placeholder section */}
        <div className="mb-16">
          <div className="aspect-video image-placeholder max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗✨</div>
              <div className="text-lg font-medium">Sternenhimmel Installation</div>
              <div className="text-sm text-gray-400 mt-2">Professionelle Bilder folgen</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group ${
              index % 2 === 0 ? 'geometric-shape' : ''
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 bg-gray-700 flex items-center justify-center text-2xl ${
                  index % 3 === 0 ? 'diamond-shape' : index % 3 === 1 ? 'hexagon-shape' : ''
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
