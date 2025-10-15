-- =====================================================
-- ByDay Platform - Schema Creation (Simplified, No Geo)
-- =====================================================
-- Run this FIRST in Supabase SQL Editor to create tables.
-- Assumes Supabase Auth is enabled.
-- 
-- This version skips PostGIS/geo features to avoid extension requirements.
-- If you need spatial queries later, enable PostGIS in Dashboard > Database > Extensions > postgis.
-- =====================================================

-- Enable UUID extension (if not already)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- Create Profiles Table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name text NOT NULL,
    user_type text NOT NULL CHECK (user_type IN ('worker', 'client', 'admin')),  -- Enforce valid types
    avatar_url text,
    rating numeric(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
    completed_jobs integer DEFAULT 0 CHECK (completed_jobs >= 0),
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles (user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_rating ON profiles (rating);

-- Row Level Security (RLS) - Enable and add basic policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);  -- Adjust for privacy
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Create Jobs Table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id uuid REFERENCES profiles(id) ON DELETE SET NULL,  -- Optional, can be NULL
    status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    rate_per_day numeric(10,2) NOT NULL CHECK (rate_per_day > 0),
    location jsonb,  -- e.g., {"address": "...", "coordinates": {"lat": 5.56, "lng": -0.18}}
    category text NOT NULL,
    start_date timestamptz,
    end_date timestamptz CHECK (end_date > start_date),
    urgent boolean DEFAULT false,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Indexes (JSONB GIN for location queries, e.g., searching by address or coords)
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs (client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_worker_id ON jobs (worker_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs (category);
CREATE INDEX IF NOT EXISTS idx_jobs_urgent ON jobs (urgent) WHERE urgent = true;
CREATE INDEX IF NOT EXISTS idx_jobs_location_gin ON jobs USING GIN (location);  -- For JSONB queries like location @> '{"address": "Osu"}'

-- RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view/insert own jobs" ON jobs FOR ALL USING (auth.uid() = client_id) WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Workers can view open jobs" ON jobs FOR SELECT USING (status = 'open' OR auth.uid() = worker_id);
CREATE POLICY "Workers can update assigned jobs" ON jobs FOR UPDATE USING (auth.uid() = worker_id AND status = 'in_progress');

-- Trigger for updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Create Job Applications Table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.job_applications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    worker_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    message text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON job_applications (job_id);
CREATE INDEX IF NOT EXISTS idx_applications_worker_id ON job_applications (worker_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications (status);

-- RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workers can insert/view own applications" ON job_applications FOR ALL USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);
CREATE POLICY "Clients can view applications for own jobs" ON job_applications FOR SELECT USING (job_id IN (SELECT id FROM jobs WHERE client_id = auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Optional: Recreate Reviews and Worker Skills (if needed from prior setup)
-- =====================================================
-- Reviews Table (inferred basic structure)
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    reviewer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,  -- Client reviewing worker
    reviewed_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,  -- Worker being reviewed
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamptz DEFAULT NOW()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can view reviews for own jobs" ON reviews FOR SELECT USING (job_id IN (SELECT id FROM jobs WHERE client_id = auth.uid() OR worker_id = auth.uid()));

-- Worker Skills Table (inferred basic structure)
CREATE TABLE IF NOT EXISTS public.worker_skills (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill text NOT NULL,
    proficiency_level text CHECK (proficiency_level IN ('beginner', 'intermediate', 'expert')),
    created_at timestamptz DEFAULT NOW()
);
ALTER TABLE worker_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workers can manage own skills" ON worker_skills FOR ALL USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_skills_worker_id ON worker_skills (worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_skills_skill ON worker_skills (skill);

-- =====================================================
-- Success message
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Schema created successfully (no geo features)!';
    RAISE NOTICE '📋 Tables: profiles, jobs, job_applications, reviews, worker_skills';
    RAISE NOTICE '🔒 RLS enabled with basic policies - Customize as needed';
    RAISE NOTICE '🔍 JSONB GIN index on jobs.location for queries like: SELECT * FROM jobs WHERE location @> ''{"address": "Osu"}'';';
    RAISE NOTICE '🗺️  For spatial (geo) queries, enable PostGIS extension and re-run with geo column.';
    RAISE NOTICE '🚀 Now run your seed script!';
END $$;