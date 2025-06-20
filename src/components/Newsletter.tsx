
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import VideoPreview from './VideoPreview';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Erfolgreich angemeldet!",
        description: "Sie erhalten unseren Newsletter ab sofort.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-gray-900/80 to-black/80 border-gold-400/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-space-grotesk font-bold text-gold-400 mb-4">
                📧 NEWSLETTER ABONNIEREN
              </CardTitle>
              <p className="text-lg text-gray-300">
                Bleiben Sie informiert über neue Technologien, Sonderangebote und exklusive Einblicke
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gold-400 hover:bg-gold-500 text-black font-poppins font-bold whitespace-nowrap"
                >
                  Anmelden
                </Button>
              </form>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                * Keine Spam-Mails. Abmeldung jederzeit möglich.
              </p>
            </CardContent>
          </Card>

          <VideoPreview />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
