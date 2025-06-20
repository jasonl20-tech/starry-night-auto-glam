
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Edit, Save } from 'lucide-react';

interface PricingConfig {
  id: string;
  key: string;
  value: any;
  description: string | null;
}

const PricingManager = () => {
  const [pricingConfigs, setPricingConfigs] = useState<PricingConfig[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  useEffect(() => {
    fetchPricingConfigs();
  }, []);

  const fetchPricingConfigs = async () => {
    const { data, error } = await supabase
      .from('pricing_config')
      .select('*')
      .order('key');

    if (error) {
      toast.error('Fehler beim Laden der Preiskonfiguration');
    } else {
      setPricingConfigs(data || []);
    }
  };

  const handleEdit = (config: PricingConfig) => {
    setEditingId(config.id);
    setEditValue(config.value.value || 0);
  };

  const handleSave = async (configId: string) => {
    const { error } = await supabase
      .from('pricing_config')
      .update({ 
        value: { value: editValue },
        updated_at: new Date().toISOString()
      })
      .eq('id', configId);

    if (error) {
      toast.error('Fehler beim Speichern');
    } else {
      toast.success('Preis aktualisiert');
      setEditingId(null);
      fetchPricingConfigs();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Preis Verwaltung</h2>
      </div>

      <div className="grid gap-4">
        {pricingConfigs.map((config) => (
          <Card key={config.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{config.description}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Label className="text-gray-300">Preis (€):</Label>
                  {editingId === config.id ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white w-32"
                    />
                  ) : (
                    <span className="text-amber-300 font-bold">
                      €{config.value.value}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {editingId === config.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(config.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleCancel}
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        Abbrechen
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleEdit(config)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;
