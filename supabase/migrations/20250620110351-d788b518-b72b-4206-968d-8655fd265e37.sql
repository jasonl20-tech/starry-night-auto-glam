
-- Video-Konfiguration für den "Sehen Sie unsere Arbeiten" Bereich
INSERT INTO app_config (key, value, description) VALUES 
('video_section', '{
  "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "title": "🎬 SEHEN SIE UNSERE ARBEIT",
  "description": "Erleben Sie die Magie unserer Sternenhimmel-Installationen in Aktion"
}', 'Video-Konfiguration für den Arbeiten-Bereich')
ON CONFLICT (key) DO NOTHING;

-- Tabelle für Kontaktnachrichten erstellen
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'unread'
);

-- RLS für Kontaktnachrichten (nur Admins können sie sehen)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Anyone can insert contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);
