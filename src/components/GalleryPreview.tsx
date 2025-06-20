
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GalleryPreview = () => {
  const previewImages = [
    {
      id: 1,
      title: 'BMW 7er Sternenhimmel',
      image: '🌌'
    },
    {
      id: 2,
      title: 'Mercedes S-Klasse',
      image: '✨'
    },
    {
      id: 3,
      title: 'Audi A8 Premium',
      image: '⭐'
    }
  ];

  return (
    <section className="py-16 px-6 floating-particles">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-gold-400 mb-4">
            UNSERE ARBEITEN
          </h2>
          <p className="text-lg text-gray-300">
            Entdecken Sie einige unserer beeindruckendsten Sternenhimmel-Installationen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {previewImages.map((item) => (
            <Card key={item.id} className="bg-gray-900/30 border-gold-400/20 hover:border-gold-400/40 transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-black/50 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                  {item.image}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-space-grotesk font-semibold text-gold-400 text-center">
                    {item.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/galerie">
            <Button className="bg-gold-400 hover:bg-gold-500 text-black font-poppins font-semibold">
              Vollständige Galerie ansehen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
