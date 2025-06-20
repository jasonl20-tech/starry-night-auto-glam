
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CarSelector = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const carBrands = {
    'BMW': ['X1', 'X3', 'X5', 'X7', '3er', '5er', '7er'],
    'Mercedes': ['A-Klasse', 'C-Klasse', 'E-Klasse', 'S-Klasse', 'GLA', 'GLC', 'GLE'],
    'Audi': ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
    'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera'],
    'VW': ['Golf', 'Passat', 'Tiguan', 'Touareg']
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            🚗 IHR FAHRZEUG AUSWÄHLEN
          </h2>
          <p className="text-xl text-gray-300">
            Finden Sie die perfekte Sternenhimmel-Lösung für Ihr Fahrzeug
          </p>
        </div>

        <Card className="bg-midnight-800/30 border-stellar-400/30">
          <CardHeader>
            <CardTitle className="text-2xl text-stellar-300 text-center">
              Fahrzeug konfigurieren
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-stellar-300 mb-4">Marke wählen:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(carBrands).map((brand) => (
                    <Button
                      key={brand}
                      variant={selectedBrand === brand ? "default" : "outline"}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setSelectedModel('');
                      }}
                      className={selectedBrand === brand ? 
                        "bg-stellar-500 text-midnight-900" : 
                        "border-stellar-400/50 text-stellar-300"
                      }
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedBrand && (
                <div>
                  <h3 className="text-lg font-semibold text-stellar-300 mb-4">Modell wählen:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {carBrands[selectedBrand].map((model) => (
                      <Button
                        key={model}
                        variant={selectedModel === model ? "default" : "outline"}
                        onClick={() => setSelectedModel(model)}
                        className={selectedModel === model ? 
                          "bg-stellar-500 text-midnight-900" : 
                          "border-stellar-400/50 text-stellar-300"
                        }
                      >
                        {model}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedBrand && selectedModel && (
              <div className="mt-8 p-6 bg-stellar-500/10 rounded-lg border border-stellar-400/30">
                <h4 className="text-xl font-bold text-stellar-300 mb-4">
                  🌟 {selectedBrand} {selectedModel} - Sternenhimmel Konfiguration
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-stellar-300">Empfohlene Sterne:</strong> 150-200
                  </div>
                  <div>
                    <strong className="text-stellar-300">Einbauzeit:</strong> 2-3 Stunden
                  </div>
                  <div>
                    <strong className="text-stellar-300">Geschätzter Preis:</strong> ab 350€
                  </div>
                  <div>
                    <strong className="text-stellar-300">Besonderheiten:</strong> Premium Glasfaser
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-bold">
                    Kostenvoranschlag anfordern
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CarSelector;
