-- Create job listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT,
  requirements TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career applications table
CREATE TABLE public.career_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE SET NULL,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT,
  date_of_birth DATE,
  
  -- Experience
  current_position TEXT,
  years_experience INTEGER,
  previous_employer TEXT,
  linkedin_url TEXT,
  
  -- Documents
  cv_url TEXT,
  cover_letter_url TEXT,
  
  -- Additional
  available_start_date DATE,
  salary_expectation TEXT,
  additional_notes TEXT,
  
  -- Metadata
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- Job listings are public to read
CREATE POLICY "Anyone can view active job listings"
ON public.job_listings
FOR SELECT
USING (is_active = true);

-- Anyone can submit a career application (no auth required for job applications)
CREATE POLICY "Anyone can submit career applications"
ON public.career_applications
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for career documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'career-documents',
  'career-documents',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Storage policy: anyone can upload to career-documents bucket
CREATE POLICY "Anyone can upload career documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'career-documents');

-- Storage policy: allow reading uploaded documents (for confirmation)
CREATE POLICY "Anyone can view their uploaded career documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'career-documents');

-- Insert sample job listings
INSERT INTO public.job_listings (title, department, location, type, description, requirements) VALUES
('Guest Relations Manager', 'Front Office', 'Diamond - Marmaris', 'Full-time', 
 'Lead our guest relations team to deliver exceptional hospitality experiences.',
 ARRAY['5+ years hospitality experience', 'Fluent in English and Turkish', 'Leadership skills']),
('Executive Chef', 'Food & Beverage', 'Resort - Marmaris', 'Full-time',
 'Oversee all culinary operations and create memorable dining experiences.',
 ARRAY['10+ years culinary experience', 'International cuisine expertise', 'Team management']),
('Spa Therapist', 'Wellness', 'Sarıgerme', 'Full-time',
 'Provide world-class spa treatments and wellness services to our guests.',
 ARRAY['Certified massage therapist', 'Experience with Turkish hammam', 'Customer service skills']),
('Activities Coordinator', 'Entertainment', 'Resort - Marmaris', 'Seasonal',
 'Plan and execute engaging activities for guests of all ages.',
 ARRAY['Event planning experience', 'Multilingual preferred', 'Energetic personality']),
('Front Desk Agent', 'Front Office', 'Diamond - Marmaris', 'Full-time',
 'Be the first point of contact for our distinguished guests.',
 ARRAY['Customer service experience', 'Fluent in English', 'Computer proficiency']),
('Sous Chef', 'Food & Beverage', 'Sarıgerme', 'Full-time',
 'Support the executive chef in all kitchen operations.',
 ARRAY['5+ years kitchen experience', 'Knowledge of Mediterranean cuisine', 'Food safety certification']);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_job_listings_updated_at
  BEFORE UPDATE ON public.job_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_applications_updated_at
  BEFORE UPDATE ON public.career_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();