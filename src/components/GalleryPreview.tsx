
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Edit, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface GalleryImage {
  id: string;
  title?: string;
  description?: string;
  image_url?: string;
  url?: string;
  alt_text?: string;
  source?: 'gallery' | 'uploaded';
}

const GalleryPreview = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      // Lade zuerst Bilder aus gallery_images Tabelle
      const { data: galleryData } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true })
        .limit(3);

      // Lade auch hochgeladene Bilder mit gallery placement
      const { data: uploadedData } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('placement_type', 'gallery')
        .order('placement_position', { ascending: true })
        .limit(3);

      const combinedImages: GalleryImage[] = [];

      // Füge Galerie-Bilder hinzu
      if (galleryData) {
        combinedImages.push(...galleryData.map(img => ({
          id: img.id,
          title: img.title,
          description: img.description,
          image_url: img.image_url,
          source: 'gallery' as const
        })));
      }

      // Füge hochgeladene Bilder hinzu
      if (uploadedData) {
        combinedImages.push(...uploadedData.map(img => ({
          id: img.id,
          title: img.alt_text || img.filename,
          description: `Hochgeladenes Bild: ${img.filename}`,
          image_url: img.url,
          source: 'uploaded' as const
        })));
      }

      // Fallback zu Standard-Platzhaltern wenn keine Bilder vorhanden
      if (combinedImages.length === 0) {
        setGalleryImages([
          {
            id: '1',
            title: 'BMW 7er Sternenhimmel',
            description: 'Luxuriöse Installation im BMW 7er',
            source: 'gallery'
          },
          {
            id: '2',
            title: 'Mercedes S-Klasse',
            description: 'Premium Sternenhimmel in der S-Klasse',
            source: 'gallery'
          },
          {
            id: '3',
            title: 'Audi A8 Premium',
            description: 'Elegante Glasfaser-Installation',
            source: 'gallery'
          }
        ]);
      } else {
        setGalleryImages(combinedImages.slice(0, 3));
      }
    } catch (error) {
      console.error('Fehler beim Laden der Galerie-Bilder:', error);
      // Fallback zu Standard-Platzhaltern
      setGalleryImages([
        {
          id: '1',
          title: 'BMW 7er Sternenhimmel',
          description: 'Luxuriöse Installation im BMW 7er',
          source: 'gallery'
        },
        {
          id: '2',
          title: 'Mercedes S-Klasse',
          description: 'Premium Sternenhimmel in der S-Klasse',
          source: 'gallery'
        },
        {
          id: '3',
          title: 'Audi A8 Premium',
          description: 'Elegante Glasfaser-Installation',
          source: 'gallery'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTitle = async () => {
    if (!editingImage || !editTitle.trim()) return;

    try {
      if (editingImage.source === 'gallery') {
        const { error } = await supabase
          .from('gallery_images')
          .update({ title: editTitle })
          .eq('id', editingImage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('uploaded_images')
          .update({ alt_text: editTitle })
          .eq('id', editingImage.id);

        if (error) throw error;
      }

      toast.success('Titel aktualisiert');
      setEditingImage(null);
      setEditTitle('');
      fetchGalleryImages();
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error);
      toast.error('Fehler beim Aktualisieren des Titels');
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-white">Lade Galerie...</div>
          </div>
        </div>
      </section>
    );
  }

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
          {galleryImages.map((item, index) => (
            <Card key={item.id} className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group cursor-pointer ${
              index % 2 === 0 ? 'geometric-shape' : ''
            }`}>
              <CardContent className="p-0">
                <div 
                  className="aspect-video relative"
                  onClick={() => setSelectedImage(item)}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title || 'Galerie Bild'}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`image-placeholder ${item.image_url ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="text-sm">Bild folgt</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                      Zum Vergrößern klicken
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-100 mb-2 flex-1">
                      {item.title}
                    </h3>
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingImage(item);
                          setEditTitle(item.title || '');
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
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

      {/* Bild-Vergrößerung Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            {selectedImage?.image_url ? (
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title || 'Galerie Bild'}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-lg">Bild folgt</div>
                </div>
              </div>
            )}
          </div>
          {selectedImage?.description && (
            <p className="text-gray-300 mt-4">{selectedImage.description}</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Titel bearbeiten Dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Titel bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Neuer Titel"
              className="bg-gray-700 border-gray-600 text-white"
            />
            <div className="flex gap-2">
              <Button onClick={handleUpdateTitle} className="bg-green-600 hover:bg-green-700">
                Speichern
              </Button>
              <Button variant="outline" onClick={() => setEditingImage(null)} className="border-gray-600 text-gray-300">
                Abbrechen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GalleryPreview;
