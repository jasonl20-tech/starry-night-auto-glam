
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Plus, Trash2, Image, MoveUp, MoveDown } from 'lucide-react';

interface HeroImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

const HeroImageManager = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('*')
        .eq('key', 'hero_images')
        .single();
      
      if (data && data.value) {
        setHeroImages((data.value as unknown as HeroImage[]) || []);
      }
    } catch (error) {
      console.log('No hero images configured yet');
    } finally {
      setLoading(false);
    }
  };

  const saveHeroImages = async () => {
    try {
      const { error } = await supabase
        .from('app_config')
        .upsert({
          key: 'hero_images',
          value: heroImages as any,
          description: 'Hero Hintergrundbilder',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Hero Bilder gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Hero Bilder');
    }
  };

  const addImage = () => {
    const newImage: HeroImage = {
      id: Date.now().toString(),
      url: '',
      alt: '',
      position: heroImages.length
    };
    setHeroImages([...heroImages, newImage]);
  };

  const updateImage = (id: string, field: keyof HeroImage, value: string | number) => {
    setHeroImages(heroImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const removeImage = (id: string) => {
    setHeroImages(heroImages.filter(img => img.id !== id));
  };

  const moveImage = (id: string, direction: 'up' | 'down') => {
    const index = heroImages.findIndex(img => img.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === heroImages.length - 1)
    ) {
      return;
    }

    const newImages = [...heroImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    // Update positions
    newImages.forEach((img, idx) => {
      img.position = idx;
    });
    
    setHeroImages(newImages);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Lade Hero Bilder...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold text-white">Hero Hintergrundbilder</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={addImage} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Bild hinzufügen
          </Button>
          <Button onClick={saveHeroImages} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {heroImages.map((image, index) => (
          <Card key={image.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Bild {index + 1}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveImage(image.id, 'up')}
                    disabled={index === 0}
                    className="border-gray-600"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveImage(image.id, 'down')}
                    disabled={index === heroImages.length - 1}
                    className="border-gray-600"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(image.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Bild URL</Label>
                <Input
                  value={image.url}
                  onChange={(e) => updateImage(image.id, 'url', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://beispiel.com/bild.jpg"
                />
              </div>
              <div>
                <Label className="text-gray-300">Alt Text (Beschreibung)</Label>
                <Input
                  value={image.alt}
                  onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Beschreibung des Bildes"
                />
              </div>
              {image.url && (
                <div className="mt-4">
                  <Label className="text-gray-300 block mb-2">Vorschau:</Label>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded border border-gray-600"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {heroImages.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Keine Hero Bilder konfiguriert</p>
            <Button onClick={addImage} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Erstes Bild hinzufügen
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <p className="text-gray-400 text-sm">
            <strong>Hinweis:</strong> Die Bilder werden als Hintergrund im Hero-Bereich angezeigt und wechseln automatisch alle 5 Sekunden. 
            Verwenden Sie hochauflösende Bilder (mindestens 1920x1080) für beste Qualität.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroImageManager;
