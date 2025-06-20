
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  published: boolean;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Fehler beim Laden der FAQs:', error);
      } else {
        setFaqs(data || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der FAQs:', error);
    }
  };

  if (faqs.length === 0) {
    return null;
  }

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
                <AccordionItem key={faq.id} value={`item-${index}`} className="border-gray-600">
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
