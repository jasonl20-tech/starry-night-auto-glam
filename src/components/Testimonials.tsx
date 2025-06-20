
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
    <section className="py-20 px-6 bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kundenstimmen
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Das sagen unsere Kunden über unsere Arbeit und unseren Service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`bg-gray-900/50 border-gray-600 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group ${
              index === 1 ? 'geometric-shape' : ''
            }`}>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                </div>
                <div className="border-t border-gray-600 pt-6">
                  <div className="font-bold text-white text-lg">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.company}</div>
                  <div className="text-blue-400 font-medium mt-2">{testimonial.car}</div>
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
