
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Play } from 'lucide-react';

interface VideoConfig {
  youtube_url: string;
  title: string;
  description: string;
}

const VideoManager = () => {
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    youtube_url: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchVideoConfig();
  }, []);

  const fetchVideoConfig = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('value')
        .eq('key', 'video_section')
        .single();

      if (data && data.value) {
        setVideoConfig(data.value as VideoConfig);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Video-Konfiguration:', error);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('app_config')
        .upsert({
          key: 'video_section',
          value: videoConfig as any,
          description: 'Video-Konfiguration für den Arbeiten-Bereich',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Video-Konfiguration gespeichert');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error('Fehler beim Speichern der Video-Konfiguration');
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handlePreview = () => {
    if (videoConfig.youtube_url) {
      window.open(videoConfig.youtube_url, '_blank');
    }
  };

  const videoId = getYouTubeVideoId(videoConfig.youtube_url);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Video-Bereich Verwaltung</h2>
        <Button onClick={handlePreview} disabled={!videoConfig.youtube_url} className="bg-red-600 hover:bg-red-700">
          <Play className="w-4 h-4 mr-2" />
          Vorschau
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Video-Konfiguration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Titel</Label>
            <Input
              value={videoConfig.title}
              onChange={(e) => setVideoConfig({ ...videoConfig, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="🎬 SEHEN SIE UNSERE ARBEIT"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Beschreibung</Label>
            <Textarea
              value={videoConfig.description}
              onChange={(e) => setVideoConfig({ ...videoConfig, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Erleben Sie die Magie unserer Sternenhimmel-Installationen in Aktion"
              rows={3}
            />
          </div>
          
          <div>
            <Label className="text-gray-300">YouTube Video URL</Label>
            <Input
              value={videoConfig.youtube_url}
              onChange={(e) => setVideoConfig({ ...videoConfig, youtube_url: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-sm text-gray-400 mt-1">
              Unterstützte Formate: youtube.com/watch?v=... oder youtu.be/...
            </p>
          </div>

          {videoId && (
            <div>
              <Label className="text-gray-300">Video Vorschau</Label>
              <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Konfiguration speichern
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManager;
