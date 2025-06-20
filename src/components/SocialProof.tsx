
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SocialProof = () => {
  const stats = [
    {
      number: '1000+',
      label: 'Zufriedene Kunden',
    },
    {
      number: '50+',
      label: 'Fahrzeugmodelle',
    },
    {
      number: '4.9★',
      label: 'Durchschnittsbewertung',
    },
    {
      number: '2h',
      label: 'Durchschnittliche Einbauzeit',
    }
  ];

  const certifications = [
    'TÜV-geprüfte Qualität',
    'Zertifizierte Fachbetrieb', 
    'Handwerkskammer-Mitglied',
    'Versicherungsschutz',
    '5 Jahre Garantie',
    'Kostenlose Beratung'
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vertrauen Sie unserer Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400">
            Über 1000 zufriedene Kunden und höchste Qualitätsstandards
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 text-center shadow-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-10">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Qualität & Sicherheit
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center text-gray-300 p-4 bg-gray-700/30 border border-gray-600">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 mr-4 flex items-center justify-center text-white font-bold">✓</div>
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialProof;
