
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Weber",
      car: "BMW X7",
      rating: 5,
      text: "Absolut beeindruckend! Der Sternenhimmel in meinem BMW ist ein echter Hingucker. Die Qualität ist erstklassig und der Service war perfekt.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Klein", 
      car: "Mercedes S-Klasse",
      rating: 5,
      text: "Jeden Abend fühle ich mich wie in einem Luxus-Planetarium. Die Installation war professionell und das Ergebnis übertrifft alle Erwartungen.",
      image: "👩‍💼"
    },
    {
      name: "Thomas Müller",
      car: "Audi Q8",
      rating: 5,
      text: "Meine Kinder sind begeistert! Lange Autofahrten sind jetzt ein magisches Erlebnis. Kann ich jedem nur empfehlen.",
      image: "👨‍👨‍👧‍👦"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            💬 KUNDENSTIMMEN
          </h2>
          <p className="text-xl text-gray-300">
            Das sagen unsere zufriedenen Kunden über ihre Auto-Sternenhimmel
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-midnight-800/30 border-stellar-400/20 hover:border-stellar-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{testimonial.image}</div>
                  <div className="text-yellow-400 text-xl mb-2">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-center">
                  <div className="text-stellar-300 font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.car}</div>
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
