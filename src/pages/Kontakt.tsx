
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet!",
      description: "Wir melden uns schnellstmöglich bei Ihnen.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gold-400 mb-6">
                KONTAKT
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
                Wir freuen uns auf Ihre Nachricht!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-gray-900/50 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron font-bold text-gold-400">
                    📧 Nachricht senden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        name="name"
                        placeholder="Ihr Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black/50 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Ihre E-Mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black/50 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        placeholder="Ihre Telefonnummer"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-black/50 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Ihre Nachricht"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="bg-black/50 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gold-400 hover:bg-gold-500 text-black font-rajdhani font-bold text-lg"
                    >
                      Nachricht senden
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="bg-gray-900/50 border-gold-400/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-orbitron font-bold text-gold-400">
                      📍 Kontaktdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gold-400">📍</span>
                      <div>
                        <p className="text-white font-medium">Adresse</p>
                        <p className="text-gray-300">Musterstraße 123, 12345 Musterstadt</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gold-400">📞</span>
                      <div>
                        <p className="text-white font-medium">Telefon</p>
                        <p className="text-gray-300">+49 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gold-400">✉️</span>
                      <div>
                        <p className="text-white font-medium">E-Mail</p>
                        <p className="text-gray-300">info@auto-sternenhimmel.de</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gold-400/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-orbitron font-bold text-gold-400">
                      🕒 Öffnungszeiten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Montag - Freitag:</span>
                      <span className="text-white">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Samstag:</span>
                      <span className="text-white">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sonntag:</span>
                      <span className="text-white">Geschlossen</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
