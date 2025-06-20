
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  url?: string;
  alt_text?: string;
}

const Galerie = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      // Lade Bilder aus gallery_images Tabelle
      const { data: galleryData } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true });

      // Lade auch hochgeladene Bilder mit gallery placement
      const { data: uploadedData } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('placement_type', 'gallery')
        .order('placement_position', { ascending: true });

      const combinedImages: GalleryImage[] = [];

      // Füge Galerie-Bilder hinzu
      if (galleryData) {
        combinedImages.push(...galleryData.map(img => ({
          id: img.id,
          title: img.title,
          description: img.description || undefined,
          image_url: img.image_url
        })));
      }

      // Füge hochgeladene Bilder hinzu
      if (uploadedData) {
        combinedImages.push(...uploadedData.map(img => ({
          id: img.id,
          title: img.alt_text || img.filename,
          description: `Hochgeladenes Bild: ${img.filename}`,
          image_url: img.url
        })));
      }

      // Fallback zu Standard-Platzhaltern wenn keine Bilder vorhanden
      if (combinedImages.length === 0) {
        setGalleryImages([
          {
            id: '1',
            title: 'BMW 7er Sternenhimmel',
            description: 'Luxuriöser Sternenhimmel in BMW 7er Serie'
          },
          {
            id: '2',
            title: 'Mercedes S-Klasse',
            description: 'Eleganter Sternenhimmel in Mercedes S-Klasse'
          },
          {
            id: '3',
            title: 'Audi A8 Premium',
            description: 'Exklusiver Sternenhimmel in Audi A8'
          },
          {
            id: '4',
            title: 'Porsche Panamera',
            description: 'Sportlicher Sternenhimmel in Porsche Panamera'
          },
          {
            id: '5',
            title: 'Rolls Royce Phantom',
            description: 'Ultimativer Luxus-Sternenhimmel'
          },
          {
            id: '6',
            title: 'Bentley Continental',
            description: 'Britischer Luxus mit Sternenhimmel'
          }
        ]);
      } else {
        setGalleryImages(combinedImages);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Galerie-Bilder:', error);
      // Fallback zu Standard-Platzhaltern
      setGalleryImages([
        {
          id: '1',
          title: 'BMW 7er Sternenhimmel',
          description: 'Luxuriöser Sternenhimmel in BMW 7er Serie'
        },
        {
          id: '2',
          title: 'Mercedes S-Klasse',
          description: 'Eleganter Sternenhimmel in Mercedes S-Klasse'
        },
        {
          id: '3',
          title: 'Audi A8 Premium',
          description: 'Exklusiver Sternenhimmel in Audi A8'
        },
        {
          id: '4',
          title: 'Porsche Panamera',
          description: 'Sportlicher Sternenhimmel in Porsche Panamera'
        },
        {
          id: '5',
          title: 'Rolls Royce Phantom',
          description: 'Ultimativer Luxus-Sternenhimmel'
        },
        {
          id: '6',
          title: 'Bentley Continental',
          description: 'Britischer Luxus mit Sternenhimmel'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-900 text-white">
        <Navbar />
        <main className="pt-20">
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center">
                <div className="text-white">Lade Galerie...</div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold text-stellar-300 mb-6">
                GALERIE
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entdecken Sie unsere beeindruckenden Sternenhimmel-Installationen 
                in verschiedenen Luxusfahrzeugen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((item) => (
                <Card key={item.id} className="bg-midnight-800/50 border-stellar-400/30 hover:border-stellar-400/60 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`bg-gradient-to-br from-midnight-700 to-midnight-900 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 ${item.image_url ? 'hidden' : ''}`}>
                        🌌
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-space-grotesk font-bold text-stellar-300 mb-2">
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
