
-- Erweitere die profiles Tabelle für zusätzliche Benutzerinformationen
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Trigger für neue Benutzer aktualisieren
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''));
  
  -- Assign role based on email
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id, 
    CASE 
      WHEN NEW.email = 'lohrejason5@gmail.com' THEN 'admin'
      ELSE 'user'
    END
  );
  
  RETURN NEW;
END;
$$;

-- Trigger erstellen falls er nicht existiert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Blog Posts Tabelle
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  author_id UUID REFERENCES auth.users(id)
);

-- FAQ Tabelle
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Preise Tabelle
CREATE TABLE IF NOT EXISTS public.pricing_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Website Konfiguration erweitern
INSERT INTO public.app_config (key, value, description) VALUES
('contact_info', '{"phone": "+49 123 456 789", "email": "info@sternenhimmelauto.de", "address": "Musterstraße 123, 12345 Musterstadt"}', 'Kontaktinformationen'),
('social_media', '{"facebook": "", "instagram": "", "twitter": "", "whatsapp": "+491234567890"}', 'Social Media Links'),
('hero_content', '{"title": "STERNENHIMMELAUTO", "subtitle": "Professioneller Einbau von Premium-Sternenhimmeln für Ihr Fahrzeug", "description": "Über 1000+ zufriedene Kunden vertrauen auf unsere Expertise. Verwandeln Sie Ihr Fahrzeug mit hochwertigen Glasfasern in einen luxuriösen Raum."}', 'Hero Bereich Inhalte')
ON CONFLICT (key) DO NOTHING;

-- Standard Preiskonfiguration
INSERT INTO public.pricing_config (key, value, description) VALUES
('base_price_per_100_stars', '{"value": 200}', 'Grundpreis pro 100 Sterne'),
('shooting_stars_price', '{"value": 25}', 'Preis pro Sternschnuppe'),
('sparkle_effect_price', '{"value": 50}', 'Preis für Funkel-Effekt')
ON CONFLICT (key) DO NOTHING;

-- RLS Policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;

-- Policies für Blog Posts
CREATE POLICY "Everyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin());

-- Policies für FAQs
CREATE POLICY "Everyone can view published FAQs" ON public.faqs
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage FAQs" ON public.faqs
  FOR ALL USING (public.is_admin());

-- Policies für Pricing
CREATE POLICY "Everyone can view pricing config" ON public.pricing_config
  FOR SELECT TO public;

CREATE POLICY "Admins can manage pricing config" ON public.pricing_config
  FOR ALL USING (public.is_admin());

-- Gallery Bilder Tabelle
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view published gallery images" ON public.gallery_images
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage gallery images" ON public.gallery_images
  FOR ALL USING (public.is_admin());
