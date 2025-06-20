
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Upload, Trash2, Eye } from 'lucide-react';

interface UploadedImage {
  id: string;
  filename: string;
  url: string;
  alt_text?: string;
  placement_position: number;
}

const AboutImageManager = () => {
  const [aboutImages, setAboutImages] = useState<UploadedImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAltText, setNewAltText] = useState('');

  useEffect(() => {
    fetchAboutImages();
  }, []);

  const fetchAboutImages = async () => {
    try {
      const { data, error } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('placement_type', 'about')
        .order('placement_position', { ascending: true });

      if (error) throw error;
      setAboutImages(data || []);
    } catch (error) {
      console.error('Fehler beim Laden der About-Bilder:', error);
      toast.error('Fehler beim Laden der About-Bilder');
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) {
      toast.error('Bild-URL ist erforderlich');
      return;
    }

    try {
      const { error } = await supabase
        .from('uploaded_images')
        .insert({
          filename: newAltText || 'About Bild',
          url: newImageUrl,
          alt_text: newAltText || 'About Bild',
          placement_type: 'about',
          placement_position: aboutImages.length
        });

      if (error) throw error;
      
      toast.success('Bild hinzugefügt');
      setNewImageUrl('');
      setNewAltText('');
      fetchAboutImages();
    } catch (error) {
      console.error('Fehler beim Hinzufügen:', error);
      toast.error('Fehler beim Hinzufügen des Bildes');
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Bild löschen möchten?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('uploaded_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Bild gelöscht');
      fetchAboutImages();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      toast.error('Fehler beim Löschen des Bildes');
    }
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">About-Bereich Bilder</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Neues About-Bild hinzufügen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Bild-URL</Label>
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Alt-Text / Beschreibung</Label>
            <Input
              value={newAltText}
              onChange={(e) => setNewAltText(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Beschreibung des Bildes"
            />
          </div>

          <Button onClick={handleAddImage} className="bg-green-600 hover:bg-green-700">
            <Upload className="w-4 h-4 mr-2" />
            Bild hinzufügen
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {aboutImages.map((image, index) => (
          <Card key={image.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img 
                    src={image.url} 
                    alt={image.alt_text || image.filename}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <CardTitle className="text-white">{image.filename}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{image.alt_text}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handlePreview(image.url)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Position: {index + 1}</span>
                <span className="text-gray-400 text-sm">Typ: About-Bereich</span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {aboutImages.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>Noch keine About-Bilder hochgeladen.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutImageManager;
