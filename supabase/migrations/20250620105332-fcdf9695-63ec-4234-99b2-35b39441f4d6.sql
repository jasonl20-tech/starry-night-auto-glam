
-- Erweitere die pricing_config Tabelle um die fehlenden Preise
INSERT INTO pricing_config (key, value, description) VALUES 
('shooting_stars_price', '{"value": 25, "currency": "EUR"}', 'Preis pro Sternschnuppe'),
('sparkle_effect_price', '{"value": 50, "currency": "EUR"}', 'Preis für Funkel-Effekt'),
('star_base_price', '{"value": 2, "currency": "EUR"}', 'Grundpreis pro Stern (wird mit Anzahl multipliziert)')
ON CONFLICT (key) DO NOTHING;

-- Erstelle Hero-Platzhalter Konfiguration (falls noch nicht vorhanden)
INSERT INTO app_config (key, value, description) VALUES 
('hero_placeholders', '[
  {"id": "1", "text": "Bild 1 Platzhalter", "position": 1},
  {"id": "2", "text": "Bild 2 Platzhalter", "position": 2},
  {"id": "3", "text": "Bild 3 Platzhalter", "position": 3}
]', 'Platzhalter für Hero-Bereich wenn keine Bilder konfiguriert sind')
ON CONFLICT (key) DO NOTHING;

-- Stelle sicher, dass Kontaktdaten und Social Media in app_config sind
INSERT INTO app_config (key, value, description) VALUES 
('contact_info', '{
  "phone": "+49 123 456 789",
  "email": "info@sternenhimmelauto.de", 
  "address": "Musterstraße 123, 12345 Musterstadt"
}', 'Kontaktinformationen für Footer und Kontaktseite'),
('social_media', '{
  "facebook": "https://facebook.com/sternenhimmelauto",
  "instagram": "https://instagram.com/sternenhimmelauto", 
  "twitter": "https://twitter.com/sternenhimmelauto",
  "whatsapp": "+491234567890"
}', 'Social Media Links für Footer')
ON CONFLICT (key) DO NOTHING;

-- Blog Posts sind bereits vorhanden, aber stelle sicher dass sie über Admin Panel verwaltbar sind
-- (Die blog_posts Tabelle existiert bereits)
