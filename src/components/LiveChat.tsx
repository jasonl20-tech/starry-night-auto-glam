
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 rounded-full w-16 h-16 shadow-2xl animate-pulse-subtle"
        >
          💬
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="bg-midnight-800 border-stellar-400 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-stellar-300 flex items-center justify-between">
                <span>🌟 Live Beratung</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-stellar-500/20 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    Hallo! 👋 Haben Sie Fragen zu unserem Auto-Sternenhimmel?
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="text-xs border-stellar-400/50 text-stellar-300">
                    💰 Preis anfragen
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs border-stellar-400/50 text-stellar-300">
                    📱 WhatsApp Chat
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs border-stellar-400/50 text-stellar-300">
                    📞 Rückruf anfordern
                  </Button>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Normalerweise antworten wir innerhalb von 2 Minuten
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChat;
