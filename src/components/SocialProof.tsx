
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SocialProof = () => {
  const stats = [
    {
      number: '1000+',
      label: 'Zufriedene Kunden',
      icon: '😊'
    },
    {
      number: '50+',
      label: 'Fahrzeugmodelle',
      icon: '🚗'
    },
    {
      number: '5★',
      label: 'Durchschnittsbewertung',
      icon: '⭐'
    },
    {
      number: '2h',
      label: 'Durchschnittliche Einbauzeit',
      icon: '⚡'
    }
  ];

  const socialFeatures = [
    '📱 Über 500 Instagram Posts von Kunden',
    '🎥 YouTube Kanal mit 10k+ Abonnenten', 
    '👥 Facebook Community mit 2k+ Mitgliedern',
    '📰 Erwähnt in AutoBild & Motor1',
    '🏆 Testsieger bei Vergleich.org',
    '💎 Premium Partner von Mercedes & BMW'
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            📊 VERTRAUEN SIE DEN ZAHLEN
          </h2>
          <p className="text-xl text-gray-300">
            Tausende zufriedene Kunden können nicht irren
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-midnight-800/30 border-stellar-400/20 text-center transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-stellar-300 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Features */}
        <Card className="bg-midnight-800/30 border-stellar-400/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-space-grotesk font-bold text-stellar-300 mb-6 text-center">
              🌟 Auszeichnungen & Anerkennung
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {socialFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <span className="text-stellar-400 mr-3">✓</span>
                  {feature}
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
