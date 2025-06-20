
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
}

const ContactManager = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    email: '',
    address: ''
  });
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    facebook: '',
    instagram: '',
    twitter: '',
    whatsapp: ''
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    const { data, error } = await supabase
      .from('app_config')
      .select('*')
      .in('key', ['contact_info', 'social_media']);

    if (error) {
      toast.error('Fehler beim Laden der Kontaktdaten');
    } else {
      data?.forEach((config) => {
        if (config.key === 'contact_info' && typeof config.value === 'object' && config.value !== null) {
          setContactInfo(config.value as ContactInfo);
        } else if (config.key === 'social_media' && typeof config.value === 'object' && config.value !== null) {
          setSocialMedia(config.value as SocialMedia);
        }
      });
    }
  };

  const handleSaveContact = async () => {
    const { error } = await supabase
      .from('app_config')
      .upsert({
        key: 'contact_info',
        value: contactInfo as any,
        description: 'Kontaktinformationen',
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast.error('Fehler beim Speichern der Kontaktdaten');
    } else {
      toast.success('Kontaktdaten gespeichert');
    }
  };

  const handleSaveSocial = async () => {
    const { error } = await supabase
      .from('app_config')
      .upsert({
        key: 'social_media',
        value: socialMedia as any,
        description: 'Social Media Links',
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast.error('Fehler beim Speichern der Social Media Links');
    } else {
      toast.success('Social Media Links gespeichert');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Kontakt & Social Media Verwaltung</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Kontaktinformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Telefonnummer</Label>
            <Input
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="+49 123 456 789"
            />
          </div>
          <div>
            <Label className="text-gray-300">E-Mail</Label>
            <Input
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="info@sternenhimmelauto.de"
            />
          </div>
          <div>
            <Label className="text-gray-300">Adresse</Label>
            <Input
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Musterstraße 123, 12345 Musterstadt"
            />
          </div>
          <Button onClick={handleSaveContact} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Kontaktdaten speichern
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Facebook</Label>
            <Input
              value={socialMedia.facebook}
              onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://facebook.com/ihr-profil"
            />
          </div>
          <div>
            <Label className="text-gray-300">Instagram</Label>
            <Input
              value={socialMedia.instagram}
              onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://instagram.com/ihr-profil"
            />
          </div>
          <div>
            <Label className="text-gray-300">Twitter</Label>
            <Input
              value={socialMedia.twitter}
              onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://twitter.com/ihr-profil"
            />
          </div>
          <div>
            <Label className="text-gray-300">WhatsApp</Label>
            <Input
              value={socialMedia.whatsapp}
              onChange={(e) => setSocialMedia({ ...socialMedia, whatsapp: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="+491234567890"
            />
          </div>
          <Button onClick={handleSaveSocial} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Social Media Links speichern
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;
