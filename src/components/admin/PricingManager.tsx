
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Edit, Save, DollarSign, Plus } from 'lucide-react';

interface PricingConfig {
  id: string;
  key: string;
  value: {
    value: number;
    currency?: string;
  };
  description: string | null;
}

const PricingManager = () => {
  const [pricingConfigs, setPricingConfigs] = useState<PricingConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const defaultPricingItems = [
    { key: 'sternenhimmel_basic', description: 'Basis Sternenhimmel', defaultValue: 299 },
    { key: 'sternenhimmel_premium', description: 'Premium Sternenhimmel', defaultValue: 499 },
    { key: 'sternenhimmel_luxury', description: 'Luxury Sternenhimmel', defaultValue: 799 },
    { key: 'installation_fee', description: 'Einbaugebühr', defaultValue: 150 },
    { key: 'material_cost', description: 'Materialkosten', defaultValue: 100 }
  ];

  useEffect(() => {
    fetchPricingConfigs();
  }, []);

  const fetchPricingConfigs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pricing_config')
        .select('*')
        .order('key');

      if (error) throw error;

      // If no pricing configs exist, create default ones
      if (!data || data.length === 0) {
        await createDefaultPricingConfigs();
        return;
      }

      setPricingConfigs(data || []);
    } catch (error) {
      console.error('Error fetching pricing configs:', error);
      toast.error('Fehler beim Laden der Preiskonfiguration');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultPricingConfigs = async () => {
    try {
      const insertData = defaultPricingItems.map(item => ({
        key: item.key,
        description: item.description,
        value: { value: item.defaultValue, currency: 'EUR' }
      }));

      const { error } = await supabase
        .from('pricing_config')
        .insert(insertData);

      if (error) throw error;

      toast.success('Standard-Preiskonfiguration erstellt');
      fetchPricingConfigs();
    } catch (error) {
      console.error('Error creating default pricing configs:', error);
      toast.error('Fehler beim Erstellen der Standard-Preise');
    }
  };

  const handleEdit = (config: PricingConfig) => {
    setEditingId(config.id);
    setEditValue(config.value?.value || 0);
  };

  const handleSave = async (configId: string) => {
    try {
      const { error } = await supabase
        .from('pricing_config')
        .update({ 
          value: { value: editValue, currency: 'EUR' },
          updated_at: new Date().toISOString()
        })
        .eq('id', configId);

      if (error) throw error;

      toast.success('Preis aktualisiert');
      setEditingId(null);
      fetchPricingConfigs();
    } catch (error) {
      console.error('Error updating price:', error);
      toast.error('Fehler beim Speichern');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(0);
  };

  const addNewPricingItem = async () => {
    const key = prompt('Schlüssel für neuen Preiseintrag (z.B. "neue_option"):');
    const description = prompt('Beschreibung:');
    const priceStr = prompt('Preis (nur Zahl):');
    
    if (!key || !description || !priceStr) return;
    
    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      toast.error('Ungültiger Preis eingegeben');
      return;
    }

    try {
      const { error } = await supabase
        .from('pricing_config')
        .insert({
          key: key.toLowerCase().replace(/\s+/g, '_'),
          description,
          value: { value: price, currency: 'EUR' }
        });

      if (error) throw error;

      toast.success('Neuer Preiseintrag hinzugefügt');
      fetchPricingConfigs();
    } catch (error) {
      console.error('Error adding pricing item:', error);
      toast.error('Fehler beim Hinzufügen');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Lade Preiskonfiguration...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold text-white">Preis Verwaltung</h2>
        </div>
        <Button onClick={addNewPricingItem} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Neuer Preis
        </Button>
      </div>

      <div className="grid gap-4">
        {pricingConfigs.map((config) => (
          <Card key={config.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{config.description}</CardTitle>
              <p className="text-gray-400 text-sm">Schlüssel: {config.key}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Label className="text-gray-300">Preis (€):</Label>
                  {editingId === config.id ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white w-32"
                      placeholder="0.00"
                    />
                  ) : (
                    <span className="text-amber-300 font-bold text-lg">
                      €{config.value?.value?.toFixed(2) || '0.00'}
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

      {pricingConfigs.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Keine Preiskonfiguration gefunden</p>
            <Button onClick={createDefaultPricingConfigs} className="bg-blue-600 hover:bg-blue-700">
              Standard-Preise erstellen
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <p className="text-gray-400 text-sm">
            <strong>Hinweis:</strong> Diese Preise werden in der Preiskalkulation auf der Website verwendet. 
            Änderungen werden sofort auf der Website sichtbar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingManager;
