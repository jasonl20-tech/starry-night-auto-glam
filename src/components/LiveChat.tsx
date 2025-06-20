
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 unified-chat-button hover:unified-chat-hover text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-gray-600/50 animate-pulse-glow"
        size="lg"
      >
        <span className="text-2xl">{isOpen ? '✕' : '💬'}</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-28 right-6 z-50 w-80 unified-chat-card border-gray-600/50 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Haben Sie Fragen?
            </h3>
            <div className="w-12 h-1 unified-gold-gradient mb-4"></div>
            <p className="text-gray-200 mb-6">
              Kontaktieren Sie uns für eine kostenlose Beratung.
            </p>
            <div className="space-y-4">
              <Button 
                className="w-full geometric-shape unified-button-gradient hover:unified-button-hover text-white font-semibold py-3 transition-all duration-300"
                onClick={() => window.open('https://wa.me/491234567890', '_blank')}
              >
                WhatsApp Chat
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-500 bg-gray-800/50 text-white hover:unified-button-gradient hover:border-amber-400/50 font-semibold py-3 transition-all duration-300"
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
