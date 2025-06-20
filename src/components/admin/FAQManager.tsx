
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  published: boolean;
}

const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({});

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der FAQs');
    } else {
      setFaqs(data || []);
    }
  };

  const handleSave = async () => {
    if (!currentFaq.question || !currentFaq.answer) {
      toast.error('Frage und Antwort sind erforderlich');
      return;
    }

    const faqData = {
      question: currentFaq.question,
      answer: currentFaq.answer,
      order_index: currentFaq.order_index || 0,
      published: currentFaq.published !== false,
    };

    let error;
    if (currentFaq.id) {
      ({ error } = await supabase
        .from('faqs')
        .update(faqData)
        .eq('id', currentFaq.id));
    } else {
      ({ error } = await supabase
        .from('faqs')
        .insert([faqData]));
    }

    if (error) {
      toast.error('Fehler beim Speichern');
    } else {
      toast.success('FAQ gespeichert');
      setIsEditing(false);
      setCurrentFaq({});
      fetchFaqs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diese FAQ löschen möchten?')) {
      return;
    }

    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Löschen');
    } else {
      toast.success('FAQ gelöscht');
      fetchFaqs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">FAQ Verwaltung</h2>
        <Button
          onClick={() => {
            setCurrentFaq({ order_index: faqs.length });
            setIsEditing(true);
          }}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue FAQ
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentFaq.id ? 'FAQ bearbeiten' : 'Neue FAQ'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Frage</Label>
              <Input
                value={currentFaq.question || ''}
                onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Antwort</Label>
              <Textarea
                value={currentFaq.answer || ''}
                onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              />
            </div>
            <div>
              <Label className="text-gray-300">Reihenfolge</Label>
              <Input
                type="number"
                value={currentFaq.order_index || 0}
                onChange={(e) => setCurrentFaq({ ...currentFaq, order_index: parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentFaq.published !== false}
                onCheckedChange={(checked) => setCurrentFaq({ ...currentFaq, published: checked })}
              />
              <Label className="text-gray-300">Veröffentlicht</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Speichern
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentFaq({});
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                  <p className="text-gray-300 mt-2">{faq.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => {
                      setCurrentFaq(faq);
                      setIsEditing(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Reihenfolge: {faq.order_index}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  faq.published 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {faq.published ? 'Veröffentlicht' : 'Entwurf'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQManager;
