
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <section className="py-20 px-6 bg-midnight-900/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-stellar-300 mb-6">
            ❓ HÄUFIG GESTELLTE FRAGEN
          </h2>
          <p className="text-xl text-gray-300">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Auto-Sternenhimmel
          </p>
        </div>

        <Card className="bg-midnight-800/50 border-stellar-400/30 mb-8">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-stellar-400/20">
                  <AccordionTrigger className="text-left text-lg font-poppins font-semibold text-stellar-300 hover:text-stellar-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-bold text-lg px-8 py-4">
            📞 Weitere Informationen anfordern
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
