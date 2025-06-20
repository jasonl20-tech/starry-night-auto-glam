
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Play } from 'lucide-react';

interface VideoConfig {
  youtube_url: string;
  title: string;
  description: string;
}

const VideoPreview = () => {
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: '🎬 SEHEN SIE UNSERE ARBEIT',
    description: 'Erleben Sie die Magie unserer Sternenhimmel-Installationen in Aktion'
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
      console.log('Fehler beim Laden der Video-Konfiguration:', error);
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handlePlayVideo = () => {
    if (videoConfig.youtube_url) {
      window.open(videoConfig.youtube_url, '_blank');
    }
  };

  const videoId = getYouTubeVideoId(videoConfig.youtube_url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <Card className="bg-gradient-to-r from-midnight-800/80 to-midnight-900/80 border-stellar-400/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-space-grotesk font-bold text-stellar-300 mb-4">
          {videoConfig.title}
        </CardTitle>
        <p className="text-lg text-gray-300">
          {videoConfig.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-midnight-700 to-midnight-900 rounded-lg mb-6 flex items-center justify-center text-6xl border border-stellar-400/20 relative overflow-hidden group cursor-pointer"
             onClick={handlePlayVideo}>
          {thumbnailUrl ? (
            <>
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-gray-400 hidden">
                <div className="text-6xl mb-4">📹</div>
                <div className="text-xl">Video Vorschau</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="text-center">
          <Button 
            onClick={handlePlayVideo}
            className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-semibold"
          >
            Video abspielen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
