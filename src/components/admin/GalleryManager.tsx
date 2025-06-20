
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  order_index: number;
  published: boolean;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState<Partial<GalleryImage>>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der Galerie-Bilder');
    } else {
      setImages(data || []);
    }
  };

  const handleSave = async () => {
    if (!currentImage.title || !currentImage.image_url) {
      toast.error('Titel und Bild-URL sind erforderlich');
      return;
    }

    const imageData = {
      title: currentImage.title,
      description: currentImage.description || null,
      image_url: currentImage.image_url,
      order_index: currentImage.order_index || 0,
      published: currentImage.published !== false,
    };

    let error;
    if (currentImage.id) {
      ({ error } = await supabase
        .from('gallery_images')
        .update(imageData)
        .eq('id', currentImage.id));
    } else {
      ({ error } = await supabase
        .from('gallery_images')
        .insert([imageData]));
    }

    if (error) {
      toast.error('Fehler beim Speichern');
    } else {
      toast.success('Bild gespeichert');
      setIsEditing(false);
      setCurrentImage({});
      fetchImages();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Bild löschen möchten?')) {
      return;
    }

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Löschen');
    } else {
      toast.success('Bild gelöscht');
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Galerie Verwaltung</h2>
        <Button
          onClick={() => {
            setCurrentImage({ order_index: images.length });
            setIsEditing(true);
          }}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neues Bild
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentImage.id ? 'Bild bearbeiten' : 'Neues Bild'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Titel</Label>
              <Input
                value={currentImage.title || ''}
                onChange={(e) => setCurrentImage({ ...currentImage, title: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Beschreibung</Label>
              <Textarea
                value={currentImage.description || ''}
                onChange={(e) => setCurrentImage({ ...currentImage, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Bild URL</Label>
              <Input
                value={currentImage.image_url || ''}
                onChange={(e) => setCurrentImage({ ...currentImage, image_url: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Reihenfolge</Label>
              <Input
                type="number"
                value={currentImage.order_index || 0}
                onChange={(e) => setCurrentImage({ ...currentImage, order_index: parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentImage.published !== false}
                onCheckedChange={(checked) => setCurrentImage({ ...currentImage, published: checked })}
              />
              <Label className="text-gray-300">Veröffentlicht</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Speichern
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentImage({});
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {images.map((image) => (
          <Card key={image.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img 
                    src={image.image_url} 
                    alt={image.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <CardTitle className="text-white">{image.title}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{image.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setCurrentImage(image);
                      setIsEditing(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Reihenfolge: {image.order_index}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  image.published 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {image.published ? 'Veröffentlicht' : 'Entwurf'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
