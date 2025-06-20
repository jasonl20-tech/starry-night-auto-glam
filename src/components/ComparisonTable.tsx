
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ComparisonTable = () => {
  return (
    <section className="py-20 px-6 bg-midnight-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            🏆 WARUM WIR DIE BESTE WAHL SIND
          </h2>
          <p className="text-xl text-gray-300">
            Vergleichen Sie unsere Premium-Qualität mit der Konkurrenz
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-midnight-800/20 border-gray-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-400">Andere Anbieter</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="text-red-400 mr-2">❌</span> Billige LED-Strips</li>
                <li className="flex items-center"><span className="text-red-400 mr-2">❌</span> Kurze Garantie</li>
                <li className="flex items-center"><span className="text-red-400 mr-2">❌</span> Unprofessioneller Einbau</li>
                <li className="flex items-center"><span className="text-red-400 mr-2">❌</span> Keine Anpassung</li>
                <li className="flex items-center"><span className="text-red-400 mr-2">❌</span> Schlechter Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-stellar-500/20 to-stellar-600/20 border-stellar-400 transform scale-105 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-stellar-300">⭐ AUTO STERNENHIMMEL ⭐</CardTitle>
              <div className="text-stellar-400 font-bold">PREMIUM CHOICE</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-white">
                <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Hochwertige Glasfasern</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> 5 Jahre Garantie</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Certified Profis</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> Individuelle Gestaltung</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✅</span> 24/7 Support</li>
              </ul>
              <div className="mt-6 text-center">
                <Button className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-bold">
                  Jetzt wählen
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-800/20 border-gray-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-400">Werkstätten</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="text-yellow-400 mr-2">⚠️</span> Unterschiedliche Qualität</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">⚠️</span> Lange Wartezeiten</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">⚠️</span> Keine Spezialisierung</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">⚠️</span> Höhere Preise</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">⚠️</span> Keine Garantien</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
