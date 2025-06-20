
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GalleryPreview = () => {
  const previewImages = [
    {
      id: 1,
      title: 'BMW 7er Sternenhimmel',
      description: 'Luxuriöse Installation im BMW 7er'
    },
    {
      id: 2,
      title: 'Mercedes S-Klasse',
      description: 'Premium Sternenhimmel in der S-Klasse'
    },
    {
      id: 3,
      title: 'Audi A8 Premium',
      description: 'Elegante Glasfaser-Installation'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            UNSERE ARBEITEN
          </h2>
          <div className="w-24 h-1 gold-accent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entdecken Sie einige unserer beeindruckendsten Sternenhimmel-Installationen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {previewImages.map((item, index) => (
            <Card key={item.id} className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group ${
              index % 2 === 0 ? 'geometric-shape' : ''
            }`}>
              <CardContent className="p-0">
                <div className="aspect-video image-placeholder">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📸</div>
                    <div className="text-sm">Bild folgt</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/galerie">
            <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-8 py-3 border gold-border">
              Vollständige Galerie ansehen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
