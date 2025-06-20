
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-gray-700"
        size="lg"
      >
        <span className="text-2xl">{isOpen ? '✕' : '💬'}</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-28 right-6 z-50 w-80 bg-gray-900/95 border-gray-700 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Haben Sie Fragen?
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>
            <p className="text-gray-300 mb-6">
              Kontaktieren Sie uns für eine kostenlose Beratung.
            </p>
            <div className="space-y-4">
              <Button 
                className="w-full geometric-shape bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
                onClick={() => window.open('https://wa.me/491234567890', '_blank')}
              >
                WhatsApp Chat
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-600 bg-gray-800/50 text-white hover:bg-gray-700 font-semibold py-3"
                onClick={() => window.location.href = 'tel:+491234567890'}
              >
                Anrufen: 0123 456 7890
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LiveChat;
