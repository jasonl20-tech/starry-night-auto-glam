
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "Wie lange dauert der Einbau eines Sternenhimmels?",
      answer: "Der professionelle Einbau dauert in der Regel 2-4 Stunden, je nach Fahrzeugmodell und gewünschter Konfiguration. Wir arbeiten präzise und sorgfältig, um ein perfektes Ergebnis zu garantieren."
    },
    {
      question: "Beeinträchtigt der Sternenhimmel die Garantie meines Fahrzeugs?",
      answer: "Nein, unsere professionelle Installation beeinträchtigt nicht die Herstellergarantie Ihres Fahrzeugs. Wir verwenden nur hochwertige Materialien und bewährte Einbautechniken, die reversibel sind."
    },
    {
      question: "Wie pflege ich meinen Auto-Sternenhimmel richtig?",
      answer: "Die Pflege ist sehr einfach: Verwenden Sie nur ein trockenes, weiches Mikrofasertuch zur Reinigung. Vermeiden Sie Feuchtigkeit und chemische Reinigungsmittel. Bei normaler Nutzung ist kaum Wartung erforderlich."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Häufig gestellte Fragen
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Auto-Sternenhimmel
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-10">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-gray-600">
                  <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-gray-300 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pt-4 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="geometric-shape bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
            Weitere Informationen anfordern
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
