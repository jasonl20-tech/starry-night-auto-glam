
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 hover:text-amber-300 transition-colors duration-500 px-2">
                KONTAKT
              </h1>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-4 sm:mb-6 animate-pulse-glow"></div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto animate-slide-in-left delay-200 px-4">
                Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
                Wir freuen uns auf Ihre Nachricht!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-600/50 hover:bg-gray-800/80 hover:scale-105 transition-all duration-500 animate-slide-in-left delay-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center">
                    📧 Nachricht senden
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="hover:scale-105 transition-transform duration-300">
                      <Input
                        name="name"
                        placeholder="Ihr Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 h-10 sm:h-11 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Ihre E-Mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 h-10 sm:h-11 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <Input
                        name="phone"
                        placeholder="Ihre Telefonnummer"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <Textarea
                        name="message"
                        placeholder="Ihre Nachricht"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base resize-none"
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 h-11 sm:h-12"
                    >
                      Nachricht senden
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6 sm:space-y-8 animate-slide-in-right delay-400">
                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-600/50 hover:bg-gray-800/80 hover:scale-105 transition-all duration-500">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-amber-400">
                      📍 Kontaktdaten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 pt-0">
                    <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="text-amber-400 text-lg sm:text-xl mt-1 flex-shrink-0">📍</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base">Adresse</p>
                        <p className="text-gray-300 text-sm sm:text-base break-words">Louis-steitz-straße, 67292 Kirchheimbolanden</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="text-amber-400 text-lg sm:text-xl mt-1 flex-shrink-0">📞</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base">Telefon</p>
                        <p className="text-gray-300 text-sm sm:text-base">+49 151 47918371</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="text-amber-400 text-lg sm:text-xl mt-1 flex-shrink-0">✉️</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base">E-Mail</p>
                        <p className="text-gray-300 text-sm sm:text-base break-words">info@sternenhimmelauto.de</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-600/50 hover:bg-gray-800/80 hover:scale-105 transition-all duration-500">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-amber-400">
                      🕒 Öffnungszeiten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="flex justify-between items-center hover:bg-gray-700/30 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-300 text-sm sm:text-base">Montag - Freitag:</span>
                      <span className="text-white font-medium text-sm sm:text-base">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center hover:bg-gray-700/30 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-300 text-sm sm:text-base">Samstag:</span>
                      <span className="text-white font-medium text-sm sm:text-base">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center hover:bg-gray-700/30 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-300 text-sm sm:text-base">Sonntag:</span>
                      <span className="text-white font-medium text-sm sm:text-base">Geschlossen</span>
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
