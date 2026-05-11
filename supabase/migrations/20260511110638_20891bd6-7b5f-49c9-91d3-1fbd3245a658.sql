
-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Gallery images are viewable by everyone"
ON public.gallery_images FOR SELECT
USING (true);

-- Public insert/delete (protected client-side by static password since no auth)
CREATE POLICY "Anyone can insert gallery images"
ON public.gallery_images FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete gallery images"
ON public.gallery_images FOR DELETE
USING (true);

-- Public storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Gallery files are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload to gallery bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can delete from gallery bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery');
