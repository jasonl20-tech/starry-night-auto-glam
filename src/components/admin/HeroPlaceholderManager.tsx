
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Plus, Trash2, MoveUp, MoveDown, Image } from 'lucide-react';

interface HeroPlaceholder {
  id: string;
  text: string;
  position: number;
}

const HeroPlaceholderManager = () => {
  const [placeholders, setPlaceholders] = useState<HeroPlaceholder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaceholders();
  }, []);

  const fetchPlaceholders = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('*')
        .eq('key', 'hero_placeholders')
        .single();
      
      if (data && data.value) {
        setPlaceholders((data.value as unknown as HeroPlaceholder[]) || []);
      }
    } catch (error) {
      console.log('Keine Platzhalter konfiguriert');
    } finally {
      setLoading(false);
    }
  };

  const savePlaceholders = async () => {
    try {
      const { error } = await supabase
        .from('app_config')
        .upsert({
          key: 'hero_placeholders',
          value: placeholders as any,
          description: 'Platzhalter für Hero-Bereich',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Platzhalter gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Platzhalter');
    }
  };

  const addPlaceholder = () => {
    const newPlaceholder: HeroPlaceholder = {
      id: Date.now().toString(),
      text: `Neuer Platzhalter ${placeholders.length + 1}`,
      position: placeholders.length
    };
    setPlaceholders([...placeholders, newPlaceholder]);
  };

  const updatePlaceholder = (id: string, field: keyof HeroPlaceholder, value: string | number) => {
    setPlaceholders(placeholders.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const removePlaceholder = (id: string) => {
    setPlaceholders(placeholders.filter(p => p.id !== id));
  };

  const movePlaceholder = (id: string, direction: 'up' | 'down') => {
    const index = placeholders.findIndex(p => p.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === placeholders.length - 1)
    ) {
      return;
    }

    const newPlaceholders = [...placeholders];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newPlaceholders[index], newPlaceholders[targetIndex]] = [newPlaceholders[targetIndex], newPlaceholders[index]];
    
    newPlaceholders.forEach((p, idx) => {
      p.position = idx;
    });
    
    setPlaceholders(newPlaceholders);
  };

  if (loading) {
    return <div className="text-white text-center">Lade Platzhalter...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold text-white">Hero Platzhalter</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={addPlaceholder} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Platzhalter hinzufügen
          </Button>
          <Button onClick={savePlaceholders} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {placeholders.map((placeholder, index) => (
          <Card key={placeholder.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Platzhalter {index + 1}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => movePlaceholder(placeholder.id, 'up')}
                    disabled={index === 0}
                    className="border-gray-600"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => movePlaceholder(placeholder.id, 'down')}
                    disabled={index === placeholders.length - 1}
                    className="border-gray-600"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePlaceholder(placeholder.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label className="text-gray-300">Platzhalter Text</Label>
                <Input
                  value={placeholder.text}
                  onChange={(e) => updatePlaceholder(placeholder.id, 'text', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Text für den Platzhalter"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {placeholders.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Keine Platzhalter konfiguriert</p>
            <Button onClick={addPlaceholder} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ersten Platzhalter hinzufügen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HeroPlaceholderManager;
