
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Star, Award, Users } from 'lucide-react';

const About = () => {
  const [aboutImage, setAboutImage] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutImage();
  }, []);

  const fetchAboutImage = async () => {
    try {
      // Lade Bild mit about placement
      const { data: uploadedData } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('placement_type', 'about')
        .order('placement_position', { ascending: true })
        .limit(1);

      if (uploadedData && uploadedData.length > 0) {
        setAboutImage(uploadedData[0].url);
      }
    } catch (error) {
      console.error('Fehler beim Laden des About-Bildes:', error);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800/50 hidden md:block">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              WARUM AUTO-STERNENHIMMEL?
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 gold-accent mb-4 sm:mb-6"></div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Verwandeln Sie Ihr Fahrzeug in einen magischen Raum voller Sterne. 
              Unsere hochwertigen Glasfaser-Installationen schaffen eine einzigartige 
              Atmosphäre für jeden Anlass.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Premium Qualität</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Hochwertige Glasfasern für langanhaltende Schönheit</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Professioneller Einbau</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Erfahrene Techniker für perfekte Resultate</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">5 Jahre Garantie</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Vollumfänglicher Schutz Ihrer Investition</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">1000+ Kunden</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Zufriedene Kunden deutschlandweit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video">
                  {aboutImage ? (
                    <img
                      src={aboutImage}
                      alt="Auto-Sternenhimmel Installation"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center text-6xl ${aboutImage ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌟</div>
                      <div className="text-sm text-gray-400">About Bild</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
