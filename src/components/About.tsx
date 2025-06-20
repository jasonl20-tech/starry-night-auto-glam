
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
    <section className="py-20 px-6 bg-midnight-800/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            WARUM AUTO STERNENHIMMEL?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seit über 10 Jahren verwandeln wir Fahrzeuge in luxuriöse Erlebnisräume. 
            Vertrauen Sie auf unsere Expertise und Leidenschaft für Perfektion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-midnight-900/30 border-stellar-400/30 hover:border-stellar-400/60 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-stellar-300 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
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
