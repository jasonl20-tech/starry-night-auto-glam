
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
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vertrauen Sie unserer Expertise
          </h2>
          <p className="text-xl text-gray-600">
            Über 1000 zufriedene Kunden und höchste Qualitätsstandards
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border text-center shadow-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gray-50 border">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Qualität & Sicherheit
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="text-green-600 mr-3">✓</span>
                  {cert}
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
