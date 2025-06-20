
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Weber",
      car: "BMW X7",
      rating: 5,
      text: "Ausgezeichnete Arbeit! Der Sternenhimmel wurde professionell eingebaut und die Qualität ist hervorragend. Sehr empfehlenswert.",
      company: "Geschäftsführer"
    },
    {
      name: "Sarah Klein", 
      car: "Mercedes S-Klasse",
      rating: 5,
      text: "Perfekte Beratung und Umsetzung. Das Team war pünktlich und hat sauber gearbeitet. Das Ergebnis übertrifft meine Erwartungen.",
      company: "Anwältin"
    },
    {
      name: "Thomas Müller",
      car: "Audi Q8",
      rating: 5,
      text: "Von der Terminvereinbarung bis zum Einbau alles professionell abgewickelt. Faire Preise und exzellenter Service.",
      company: "Unternehmer"
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
            Kundenstimmen
          </h2>
          <div className="w-12 sm:w-16 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 sm:mb-4 lg:mb-6"></div>
          <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-3xl mx-auto px-2">
            Das sagen unsere Kunden über <span className="hidden sm:inline">unsere Arbeit und </span>unseren Service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`bg-gray-900/50 border-gray-600 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group ${
              index === 1 ? 'geometric-shape' : ''
            }`}>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-base sm:text-lg lg:text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 italic text-sm sm:text-base">"{testimonial.text}"</p>
                </div>
                <div className="border-t border-gray-600 pt-4 sm:pt-6">
                  <div className="font-bold text-white text-base sm:text-lg">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{testimonial.company}</div>
                  <div className="text-blue-400 font-medium mt-1 sm:mt-2 text-xs sm:text-sm">{testimonial.car}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
