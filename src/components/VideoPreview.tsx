
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VideoPreview = () => {
  return (
    <Card className="bg-gradient-to-r from-gray-900/80 to-black/80 border-gold-400/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-space-grotesk font-bold text-gold-400 mb-4">
          🎬 SEHEN SIE UNSERE ARBEIT
        </CardTitle>
        <p className="text-lg text-gray-300">
          Erleben Sie die Magie unserer Sternenhimmel-Installationen in Aktion
        </p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-lg mb-6 flex items-center justify-center text-6xl border border-gold-400/20">
          📹
        </div>
        <div className="text-center">
          <Button className="bg-gold-400 hover:bg-gold-500 text-black font-poppins font-semibold">
            Video abspielen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
