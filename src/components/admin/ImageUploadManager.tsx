
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, Trash2, Image, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UploadedImage {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  placement_type: string;
  placement_position: number;
  created_at: string;
}

const ImageUploadManager = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    alt_text: string;
    placement_type: string;
    placement_position: number;
  }>({ alt_text: '', placement_type: 'none', placement_position: 0 });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('uploaded_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Fehler beim Laden der Bilder');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Nur JPEG, PNG, WebP und GIF Dateien sind erlaubt');
      return;
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Datei ist zu groß. Maximum 50MB erlaubt.');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('admin-uploads')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('uploaded_images')
        .insert({
          filename: fileName,
          url: urlData.publicUrl,
          alt_text: file.name.split('.')[0],
          placement_type: 'none',
          placement_position: 0,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      toast.success('Bild erfolgreich hochgeladen');
      fetchImages();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Fehler beim Hochladen');
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleEdit = (image: UploadedImage) => {
    setEditingId(image.id);
    setEditData({
      alt_text: image.alt_text || '',
      placement_type: image.placement_type,
      placement_position: image.placement_position
    });
  };

  const handleSave = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('uploaded_images')
        .update({
          alt_text: editData.alt_text,
          placement_type: editData.placement_type,
          placement_position: editData.placement_position,
          updated_at: new Date().toISOString()
        })
        .eq('id', imageId);

      if (error) throw error;

      toast.success('Bild aktualisiert');
      setEditingId(null);
      fetchImages();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Fehler beim Speichern');
    }
  };

  const handleDelete = async (image: UploadedImage) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Bild löschen möchten?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('admin-uploads')
        .remove([image.filename]);

      if (storageError) console.warn('Storage delete error:', storageError);

      // Delete from database
      const { error: dbError } = await supabase
        .from('uploaded_images')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      toast.success('Bild gelöscht');
      fetchImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Lade Bilder...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Upload className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold text-white">Bild Upload & Verwaltung</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <Button 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Wird hochgeladen...' : 'Bild hochladen'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {images.map((image) => (
          <Card key={image.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image Preview */}
                <div className="w-full md:w-48 h-32 flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.alt_text || image.filename}
                    className="w-full h-full object-cover rounded border border-gray-600"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>

                {/* Image Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium truncate">{image.filename}</h3>
                    <div className="flex gap-2">
                      {editingId === image.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSave(image.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="border-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleEdit(image)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingId === image.id ? (
                    <div className="grid gap-3">
                      <div>
                        <Label className="text-gray-300">Alt Text</Label>
                        <Input
                          value={editData.alt_text}
                          onChange={(e) => setEditData({...editData, alt_text: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Beschreibung des Bildes"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300">Platzierung</Label>
                          <Select
                            value={editData.placement_type}
                            onValueChange={(value) => setEditData({...editData, placement_type: value})}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Keine Platzierung</SelectItem>
                              <SelectItem value="hero">Hero Bereich</SelectItem>
                              <SelectItem value="gallery">Galerie</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Position</Label>
                          <Input
                            type="number"
                            value={editData.placement_position}
                            onChange={(e) => setEditData({...editData, placement_position: parseInt(e.target.value) || 0})}
                            className="bg-gray-700 border-gray-600 text-white"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 space-y-1">
                      <p><strong>Alt Text:</strong> {image.alt_text || 'Nicht gesetzt'}</p>
                      <p><strong>Platzierung:</strong> {
                        image.placement_type === 'hero' ? 'Hero Bereich' :
                        image.placement_type === 'gallery' ? 'Galerie' : 'Keine'
                      } {image.placement_type !== 'none' && `(Position: ${image.placement_position})`}</p>
                      <p><strong>Hochgeladen:</strong> {new Date(image.created_at).toLocaleDateString('de-DE')}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Keine Bilder hochgeladen</p>
            <Button 
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Erstes Bild hochladen
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <p className="text-gray-400 text-sm">
            <strong>Hinweis:</strong> Unterstützte Dateiformate: JPEG, PNG, WebP, GIF. Maximale Dateigröße: 50MB.
            Wählen Sie die Platzierung aus, um Bilder automatisch in der Hero-Sektion oder Galerie anzuzeigen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploadManager;
