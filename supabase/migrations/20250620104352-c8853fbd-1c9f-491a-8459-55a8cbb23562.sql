
-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-uploads',
  'admin-uploads',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Create policy for public read access
CREATE POLICY "Public read access for admin uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads');

-- Create policy for authenticated upload access
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'admin-uploads' 
  AND auth.role() = 'authenticated'
);

-- Create policy for authenticated update access
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'admin-uploads' 
  AND auth.role() = 'authenticated'
);

-- Create policy for authenticated delete access
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'admin-uploads' 
  AND auth.role() = 'authenticated'
);

-- Create table for managing uploaded images and their placements
CREATE TABLE public.uploaded_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  placement_type TEXT NOT NULL DEFAULT 'none', -- 'hero', 'gallery', 'none'
  placement_position INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

-- Create policies for uploaded_images
CREATE POLICY "Anyone can view uploaded images"
ON public.uploaded_images FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage uploaded images"
ON public.uploaded_images FOR ALL
USING (auth.role() = 'authenticated');
