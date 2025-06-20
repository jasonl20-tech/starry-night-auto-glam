
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Galerie = () => {
  const galleryImages = [
    {
      id: 1,
      title: 'BMW 7er Sternenhimmel',
      description: 'Luxuriöser Sternenhimmel in BMW 7er Serie',
      image: '🌌'
    },
    {
      id: 2,
      title: 'Mercedes S-Klasse',
      description: 'Eleganter Sternenhimmel in Mercedes S-Klasse',
      image: '✨'
    },
    {
      id: 3,
      title: 'Audi A8 Premium',
      description: 'Exklusiver Sternenhimmel in Audi A8',
      image: '⭐'
    },
    {
      id: 4,
      title: 'Porsche Panamera',
      description: 'Sportlicher Sternenhimmel in Porsche Panamera',
      image: '🌟'
    },
    {
      id: 5,
      title: 'Rolls Royce Phantom',
      description: 'Ultimativer Luxus-Sternenhimmel',
      image: '💫'
    },
    {
      id: 6,
      title: 'Bentley Continental',
      description: 'Britischer Luxus mit Sternenhimmel',
      image: '🌠'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gold-400 mb-6">
                GALERIE
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entdecken Sie unsere beeindruckenden Sternenhimmel-Installationen 
                in verschiedenen Luxusfahrzeugen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((item) => (
                <Card key={item.id} className="bg-gray-900/50 border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                      {item.image}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-orbitron font-bold text-gold-400 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Galerie;
