-- ========================================================
-- SUPABASE DATABASE & STORAGE SETUP FOR BAYU SETIAJI PORTFOLIO
-- Execute this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ========================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  client TEXT DEFAULT 'Mercure Karawang',
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  in_selected_works BOOLEAN DEFAULT false,
  aspect_ratio TEXT DEFAULT 'portrait',
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Read & Write
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Projects" ON public.projects;
CREATE POLICY "Public Insert Projects" ON public.projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Projects" ON public.projects;
CREATE POLICY "Public Update Projects" ON public.projects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Projects" ON public.projects;
CREATE POLICY "Public Delete Projects" ON public.projects FOR DELETE USING (true);

-- 2. Create Storage Bucket for Portfolio Media
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Public Bucket Access
DROP POLICY IF EXISTS "Public Read Portfolio Media" ON storage.objects;
CREATE POLICY "Public Read Portfolio Media" ON storage.objects 
FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public Upload Portfolio Media" ON storage.objects;
CREATE POLICY "Public Upload Portfolio Media" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public Delete Portfolio Media" ON storage.objects;
CREATE POLICY "Public Delete Portfolio Media" ON storage.objects 
FOR DELETE USING (bucket_id = 'portfolio-media');
