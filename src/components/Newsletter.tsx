
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    <section className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6">
      <div className="container mx-auto max-w-4xl lg:max-w-6xl">
        <Card className="bg-gradient-to-r from-midnight-800/80 to-midnight-900/80 border-stellar-400/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-space-grotesk font-bold text-stellar-300 mb-3 sm:mb-4">
              📧 NEWSLETTER ABONNIEREN
            </CardTitle>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 px-2">
              Bleiben Sie informiert über neue Technologien<span className="hidden sm:inline">, Sonderangebote und exklusive Einblicke</span>
            </p>
          </CardHeader>
          <CardContent className="pt-0 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ihre E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-midnight-900/50 border-stellar-400/30 text-white placeholder:text-gray-400 focus:border-stellar-400 h-10 sm:h-11 text-sm sm:text-base"
                required
              />
              <Button 
                type="submit"
                className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-bold h-10 sm:h-11 text-sm sm:text-base"
              >
                Anmelden
              </Button>
            </form>
            
            <p className="text-xs text-gray-400 text-center mt-3 sm:mt-4 px-2">
              * Keine Spam-Mails. Abmeldung jederzeit möglich.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
