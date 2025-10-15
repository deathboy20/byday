-- =====================================================
-- ByDay Platform - Complete Database Reset & Seed WITH AUTH
-- =====================================================
-- This script creates users in auth.users and profiles
-- Run this with SUPERUSER privileges or through Supabase SQL Editor
-- =====================================================

-- STEP 1: Clear all existing data
-- =====================================================
TRUNCATE TABLE job_applications CASCADE;
TRUNCATE TABLE jobs CASCADE;
TRUNCATE TABLE profiles CASCADE;

-- Clear auth users (be careful with this in production!)
-- DELETE FROM auth.users WHERE email IN ('fixconnect22@gmail.com', 'nakaata247@gmail.com', 'obengebenezer01@gmail.com');

-- =====================================================
-- STEP 2: Create Auth Users
-- =====================================================
-- Note: Password is 'byday123' for all demo users
-- Users can change this after first login

-- Create Worker User (fixconnect22@gmail.com)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'fixconnect22@gmail.com',
  crypt('byday123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Emmanuel Fixconnect","user_type":"worker"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create Client User (nakaata247@gmail.com)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '22222222-2222-2222-2222-222222222222',
  'authenticated',
  'authenticated',
  'nakaata247@gmail.com',
  crypt('byday123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Nakaata Johnson","user_type":"client"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create Admin User (obengebenezer01@gmail.com)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  'authenticated',
  'authenticated',
  'obengebenezer01@gmail.com',
  crypt('byday123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Ebenezer Obeng","user_type":"client"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create identities for email auth
INSERT INTO auth.identities (
  id, 
  user_id, 
  identity_data, 
  provider, 
  provider_id, 
  last_sign_in_at, 
  created_at, 
  updated_at
)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111', 
    '11111111-1111-1111-1111-111111111111', 
    '{"sub":"11111111-1111-1111-1111-111111111111","email":"fixconnect22@gmail.com"}', 
    'email', 
    '11111111-1111-1111-1111-111111111111',  -- provider_id = user_id for email
    NOW(), 
    NOW(), 
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222', 
    '22222222-2222-2222-2222-222222222222', 
    '{"sub":"22222222-2222-2222-2222-222222222222","email":"nakaata247@gmail.com"}', 
    'email', 
    '22222222-2222-2222-2222-222222222222',  -- provider_id = user_id for email
    NOW(), 
    NOW(), 
    NOW()
  ),
  (
    '33333333-3333-3333-3333-333333333333', 
    '33333333-3333-3333-3333-333333333333', 
    '{"sub":"33333333-3333-3333-3333-333333333333","email":"obengebenezer01@gmail.com"}', 
    'email', 
    '33333333-3333-3333-3333-333333333333',  -- provider_id = user_id for email
    NOW(), 
    NOW(), 
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STEP 3: Create User Profiles
-- =====================================================

-- Worker Profile
INSERT INTO profiles (id, full_name, user_type, avatar_url, rating, completed_jobs, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Emmanuel Fixconnect', 'worker', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel', 4.8, 15, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  user_type = EXCLUDED.user_type,
  avatar_url = EXCLUDED.avatar_url,
  rating = EXCLUDED.rating,
  completed_jobs = EXCLUDED.completed_jobs;

-- Client Profile
INSERT INTO profiles (id, full_name, user_type, avatar_url, rating, completed_jobs, created_at, updated_at)
VALUES 
  ('22222222-2222-2222-2222-222222222222', 'Nakaata Johnson', 'client', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nakaata', 4.9, 8, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  user_type = EXCLUDED.user_type,
  avatar_url = EXCLUDED.avatar_url,
  rating = EXCLUDED.rating,
  completed_jobs = EXCLUDED.completed_jobs;

-- Admin Profile
INSERT INTO profiles (id, full_name, user_type, avatar_url, rating, completed_jobs, created_at, updated_at)
VALUES 
  ('33333333-3333-3333-3333-333333333333', 'Ebenezer Obeng', 'client', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ebenezer', 5.0, 25, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  user_type = EXCLUDED.user_type,
  avatar_url = EXCLUDED.avatar_url,
  rating = EXCLUDED.rating,
  completed_jobs = EXCLUDED.completed_jobs;

-- =====================================================
-- STEP 4: Insert 10 Demo Jobs
-- =====================================================

-- Job 1: Painting Job (Open - Posted by Client)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'Painter Needed for 3-Bedroom Apartment',
  'Looking for an experienced painter to repaint the interior of a 3-bedroom apartment in Osu. The job includes painting all walls, ceilings, and door frames. Paint materials will be provided. Expected to take 3-4 days.',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'open',
  200.00,
  '{"address": "Osu, Accra", "coordinates": {"lat": 5.5600, "lng": -0.1800}}',
  'Painting',
  NOW(),
  NOW() + INTERVAL '4 days',
  true,
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '2 hours'
);

-- Job 2: Plumbing Job (Open - Posted by Admin)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  'Plumber for Kitchen Sink Repair',
  'Need a skilled plumber to fix a leaking kitchen sink and replace old pipes. The job is urgent as water is leaking into the cabinet below. Should take about 1 day.',
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'open',
  150.00,
  '{"address": "Tema, Greater Accra", "coordinates": {"lat": 5.6698, "lng": -0.0166}}',
  'Plumbing',
  NOW(),
  NOW() + INTERVAL '1 day',
  true,
  NOW() - INTERVAL '5 hours',
  NOW() - INTERVAL '5 hours'
);

-- Job 3: Cleaning Job (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  'Deep Cleaning for Office Space',
  'Require professional cleaning service for a 500 sqm office space. This includes floor cleaning, window washing, bathroom sanitization, and furniture dusting. Cleaning supplies will be provided.',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'open',
  180.00,
  '{"address": "Airport Residential, Accra", "coordinates": {"lat": 5.6037, "lng": -0.1870}}',
  'Cleaning',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '2 days',
  false,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
);

-- Job 4: Carpentry Job (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000004',
  'Carpenter for Custom Wardrobe Installation',
  'Need an experienced carpenter to build and install a custom wardrobe in the master bedroom. Measurements and design specifications will be provided. Materials included.',
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'open',
  250.00,
  '{"address": "East Legon, Accra", "coordinates": {"lat": 5.6415, "lng": -0.1550}}',
  'Carpentry',
  NOW() + INTERVAL '3 days',
  NOW() + INTERVAL '6 days',
  false,
  NOW() - INTERVAL '3 hours',
  NOW() - INTERVAL '3 hours'
);

-- Job 5: Electrical Work (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000005',
  'Electrician for Wiring and Socket Installation',
  'Looking for a licensed electrician to install new electrical sockets and rewire the living room. Safety certification required. Job includes installing 8 new sockets and 4 light fixtures.',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'open',
  220.00,
  '{"address": "Dansoman, Accra", "coordinates": {"lat": 5.5447, "lng": -0.2610}}',
  'Electrical',
  NOW() + INTERVAL '2 days',
  NOW() + INTERVAL '3 days',
  true,
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '6 hours'
);

-- Job 6: Gardening Job (In Progress - Assigned to Worker)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000006',
  'Gardener for Lawn Maintenance',
  'Need a gardener for regular lawn maintenance including grass cutting, hedge trimming, and flower bed weeding. This is a recurring job that will take place every week.',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'in_progress',
  120.00,
  '{"address": "Cantonments, Accra", "coordinates": {"lat": 5.5718, "lng": -0.1769}}',
  'Gardening',
  NOW() - INTERVAL '1 day',
  NOW() + INTERVAL '6 days',
  false,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '1 day'
);

-- Job 7: Masonry Job (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  'Mason for Boundary Wall Construction',
  'Require an experienced mason to construct a boundary wall (20 meters long, 2 meters high). Cement, blocks, and other materials will be provided. Expected duration is 5-7 days.',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'open',
  300.00,
  '{"address": "Spintex, Accra", "coordinates": {"lat": 5.6509, "lng": -0.1046}}',
  'Masonry',
  NOW() + INTERVAL '5 days',
  NOW() + INTERVAL '12 days',
  false,
  NOW() - INTERVAL '8 hours',
  NOW() - INTERVAL '8 hours'
);

-- Job 8: Moving/Delivery Job (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  'Movers Needed for House Relocation',
  'Need 2-3 strong movers to help relocate household items from Madina to Adenta. Items include furniture, boxes, and appliances. Truck will be provided.',
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'open',
  180.00,
  '{"address": "Madina, Accra", "coordinates": {"lat": 5.6804, "lng": -0.1673}}',
  'Moving',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '2 days',  -- Fixed: end_date > start_date
  true,
  NOW() - INTERVAL '4 hours',
  NOW() - INTERVAL '4 hours'
);

-- Job 9: Roofing Job (Open)
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000009',
  'Roofer for Leak Repair',
  'Looking for an experienced roofer to fix multiple leaks in the roof. The job includes identifying leak sources, replacing damaged tiles, and waterproofing. Materials provided.',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'open',
  280.00,
  '{"address": "Achimota, Accra", "coordinates": {"lat": 5.6108, "lng": -0.2293}}',
  'Roofing',
  NOW() + INTERVAL '4 days',
  NOW() + INTERVAL '6 days',
  false,
  NOW() - INTERVAL '10 hours',
  NOW() - INTERVAL '10 hours'
);

-- Job 10: Completed Job
INSERT INTO jobs (id, title, description, client_id, worker_id, status, rate_per_day, location, category, start_date, end_date, urgent, created_at, updated_at)
VALUES (
  '10000000-0000-0000-0000-000000000010',
  'Tiling for Bathroom Floor',
  'Completed job: Tiled bathroom floor with ceramic tiles. Job included removing old tiles, leveling the floor, and installing new tiles with proper grouting.',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'completed',
  200.00,
  '{"address": "Labone, Accra", "coordinates": {"lat": 5.5631, "lng": -0.1684}}',
  'Tiling',
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '8 days',
  false,
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '8 days'
);

-- =====================================================
-- STEP 5: Insert Job Applications
-- =====================================================

-- Application 1: Worker applied to Painting Job
INSERT INTO job_applications (id, job_id, worker_id, status, message, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'pending',
  'I have over 5 years of experience in painting residential properties. I can start immediately and complete the job within 3 days. I have my own tools and will ensure a professional finish.',
  NOW() - INTERVAL '1 hour'
);

-- Application 2: Worker applied to Plumbing Job
INSERT INTO job_applications (id, job_id, worker_id, status, message, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000002',
  '11111111-1111-1111-1111-111111111111',
  'pending',
  'I am a certified plumber with experience in kitchen sink repairs. I can fix the leak and replace the pipes today. I have all necessary tools and spare parts.',
  NOW() - INTERVAL '3 hours'
);

-- Application 3: Worker applied to Electrical Work (Accepted)
INSERT INTO job_applications (id, job_id, worker_id, status, message, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000005',
  '11111111-1111-1111-1111-111111111111',
  'accepted',
  'I am a licensed electrician with 8 years of experience. I have completed similar wiring projects and can provide references. I am available to start on the specified date.',
  NOW() - INTERVAL '5 hours'
);

-- Application 4: Worker applied to Moving Job
INSERT INTO job_applications (id, job_id, worker_id, status, message, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000008',
  '11111111-1111-1111-1111-111111111111',
  'pending',
  'I have a team of 3 experienced movers ready to help with your relocation. We handle items with care and can complete the move efficiently in one day.',
  NOW() - INTERVAL '2 hours'
);

-- =====================================================
-- Success message
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database seeded successfully with authentication!';
  RAISE NOTICE '📊 Created 3 users with auth credentials';
  RAISE NOTICE '💼 Created 10 demo jobs';
  RAISE NOTICE '📝 Created 4 job applications';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 LOGIN CREDENTIALS:';
  RAISE NOTICE '   Worker: fixconnect22@gmail.com / byday123';
  RAISE NOTICE '   Client: nakaata247@gmail.com / byday123';
  RAISE NOTICE '   Admin:  obengebenezer01@gmail.com / byday123';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  Users can change their password after logging in';
END $$;