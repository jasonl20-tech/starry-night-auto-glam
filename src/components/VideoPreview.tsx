
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VideoPreview = () => {
  return (
    <Card className="bg-gradient-to-r from-midnight-800/80 to-midnight-900/80 border-stellar-400/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-space-grotesk font-bold text-stellar-300 mb-4">
          🎬 SEHEN SIE UNSERE ARBEIT
        </CardTitle>
        <p className="text-lg text-gray-300">
          Erleben Sie die Magie unserer Sternenhimmel-Installationen in Aktion
        </p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-midnight-700 to-midnight-900 rounded-lg mb-6 flex items-center justify-center text-6xl border border-stellar-400/20">
          📹
        </div>
        <div className="text-center">
          <Button className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-semibold">
            Video abspielen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
