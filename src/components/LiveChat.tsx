
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        size="lg"
      >
        {isOpen ? '✕' : '💬'}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Haben Sie Fragen?
            </h3>
            <p className="text-gray-600 mb-4">
              Kontaktieren Sie uns für eine kostenlose Beratung.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://wa.me/491234567890', '_blank')}
              >
                WhatsApp Chat
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
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
