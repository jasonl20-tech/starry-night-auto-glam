
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
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kundenstimmen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Das sagen unsere Kunden über unsere Arbeit und unseren Service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-yellow-500 text-lg mb-4">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.text}"</p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonial.car}</div>
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
