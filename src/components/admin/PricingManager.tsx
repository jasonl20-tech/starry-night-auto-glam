
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Pencil, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PricingConfigRow = Database['public']['Tables']['pricing_config']['Row'];

interface PricingConfig {
  id: string;
  key: string;
  value: {
    value: number;
    currency?: string;
  };
  description: string | null;
  updated_at: string | null;
}

const PricingManager = () => {
  const [pricingConfig, setPricingConfig] = useState<PricingConfig[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const loadPricingConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_config')
        .select('*')
        .order('key');

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData: PricingConfig[] = (data || []).map((item: PricingConfigRow) => ({
        id: item.id,
        key: item.key,
        description: item.description,
        updated_at: item.updated_at,
        value: typeof item.value === 'object' && item.value !== null && 'value' in item.value
          ? item.value as { value: number; currency?: string }
          : { value: 0, currency: 'EUR' }
      }));

      setPricingConfig(transformedData);
    } catch (error) {
      console.error('Error loading pricing config:', error);
      toast.error('Fehler beim Laden der Preiskonfiguration');
    }
  };

  useEffect(() => {
    loadPricingConfig();
  }, []);

  const handleEdit = (item: PricingConfig) => {
    setEditingId(item.id);
    setEditValues({
      [item.id]: {
        value: item.value.value,
        currency: item.value.currency || 'EUR'
      }
    });
  };

  const handleSave = async (item: PricingConfig) => {
    setLoading(true);
    try {
      const newValue = {
        value: parseFloat(editValues[item.id]?.value || '0'),
        currency: editValues[item.id]?.currency || 'EUR'
      };

      const { error } = await supabase
        .from('pricing_config')
        .update({ 
          value: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.id);

      if (error) throw error;

      await loadPricingConfig();
      setEditingId(null);
      setEditValues({});
      toast.success('Preis erfolgreich aktualisiert');
    } catch (error) {
      console.error('Error saving pricing:', error);
      toast.error('Fehler beim Speichern des Preises');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-amber-300">Preisverwaltung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pricingConfig.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex-1">
              <Label className="text-gray-300 block mb-2">
                {item.description || item.key}
              </Label>
              {editingId === item.id ? (
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    step="0.01"
                    value={editValues[item.id]?.value || ''}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      [item.id]: {
                        ...editValues[item.id],
                        value: e.target.value
                      }
                    })}
                    className="bg-gray-600 border-gray-500 text-white w-24"
                  />
                  <Input
                    type="text"
                    value={editValues[item.id]?.currency || 'EUR'}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      [item.id]: {
                        ...editValues[item.id],
                        currency: e.target.value
                      }
                    })}
                    className="bg-gray-600 border-gray-500 text-white w-16"
                    maxLength={3}
                  />
                </div>
              ) : (
                <div className="text-white text-lg font-semibold">
                  {item.value.value} {item.value.currency || 'EUR'}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {editingId === item.id ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleSave(item)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                    className="border-gray-500 text-gray-300 hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                  className="border-gray-500 text-gray-300 hover:bg-gray-600"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {pricingConfig.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            Keine Preiskonfiguration gefunden. 
            <br />
            Erstellen Sie zuerst Einträge in der pricing_config Tabelle.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingManager;
