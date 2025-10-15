By-Day is a Ghana-based digital platform that connects daily job seekers (“workers”) with individuals or small businesses (“clients”) looking for short-term help.
The goal is to digitize the “by-day” economy with transparency, convenience, and trust — starting as a web app optimized for mobile and desktop.

🧱 2. Tech Stack (Production-Ready)
Layer	Tech	Purpose
Frontend	React (TypeScript, Vite, Tailwind, shadcn/ui)	Responsive UI, reusable components
State Management	React Query + Zustand	Async data + local UI state
Backend	Supabase (PostgreSQL + Auth + Storage + Edge Functions)	User data, jobs, messaging, verification
Maps / Location	Google Maps JS API or Leaflet + OpenStreetMap	Geolocation for job & worker mapping
Notifications	OneSignal or Supabase Realtime	Job updates and chat notifications
Payments	Paystack API (planned phase 2)	Mobile money / card transactions
Deployment	Vercel (frontend) + Supabase hosting	CI/CD, scalable, fast
🧭 3. Application Flow
User Roles

Worker: Seeks jobs, sets rate & location.

Client: Posts jobs, reviews workers.

Admin: Manages users, jobs, and reported issues.

End-to-End Flow
A. Onboarding

Visit web app → choose Worker or Client role.

Sign up via Supabase Auth (email/password, Google, or phone).

Complete Profile Setup:

Worker: skills, rate/day, bio, location.

Client: name, contact, location, type of jobs usually posted.

Redirect to dashboard.

B. Job Lifecycle
Step	Actor	Description
1️⃣ Post Job	Client	Fills form → title, category, description, pay, location, duration
2️⃣ Discover	Worker	Jobs displayed in feed, filtered by proximity & skill
3️⃣ Apply	Worker	Sends request → stored in Supabase table job_applications
4️⃣ Confirm	Client	Accepts one or more workers
5️⃣ Track	Both	Job moves to “In Progress” state
6️⃣ Complete	Client	Marks job done, leaves rating
7️⃣ Review	Worker	Can also rate client
8️⃣ Archive	System	Moves completed jobs to history for analytics
C. Dashboards Overview
🧰 1. Worker Dashboard

Active Jobs: Accepted and ongoing tasks

Job Feed: Paginated list from Supabase query

Earnings Summary: Sum of completed jobs

Ratings Section: Average rating, feedback

Profile Editor: Update skills, rate, and visibility

🏡 2. Client Dashboard

My Posts: All active, pending, and completed jobs

Create Job: Simple multi-step form

Applicants: List of workers who applied

Messaging: Real-time chat per job

Reviews Given: Track feedback provided

🛠️ 3. Admin Dashboard

User Management: CRUD for users (verify, ban, flag)

Job Management: View all jobs, flagged content

Analytics View:

Active users / week

Job posts / day

Completion & rating averages

Reports Center: Handle user complaints and safety checks

🧩 4. Authentication & Access Control
Auth Setup (Supabase)

supabase.auth.signUp() and supabase.auth.signInWithOtp()

RLS (Row Level Security):

Worker can only view/edit their profile.

Client can only edit their own job posts.

Admin role bypasses RLS policies.

Role Assignment

Stored in profiles table:

CREATE TABLE profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  phone text,
  role text check (role IN ('worker', 'client', 'admin')),
  location text,
  bio text,
  rate numeric,
  skills text[],
  avatar_url text,
  created_at timestamp default now(),
  primary key (id)
);

Protected Routes

/dashboard/worker → Worker only

/dashboard/client → Client only

/admin → Admin only

Handled via React Router guards + Supabase session check.

📊 5. Database Schema (Core Tables)
jobs
Field	Type	Description
id	uuid	Primary key
client_id	uuid	FK to profiles
title	text	Job title
description	text	Job details
category	text	E.g. Cleaning, Masonry, Errands
rate	numeric	Pay per day/hour
location	geography(Point)	Geolocation data
status	text	open / in_progress / completed / cancelled
created_at	timestamp	Creation date
job_applications
Field	Type	Description
id	uuid	Primary key
job_id	uuid	FK to jobs
worker_id	uuid	FK to profiles
status	text	pending / accepted / declined
applied_at	timestamp	Date applied
reviews
Field	Type	Description
id	uuid	Primary key
reviewer_id	uuid	FK to profiles
reviewed_id	uuid	FK to profiles
rating	integer	1–5
comment	text	Optional feedback
job_id	uuid	FK to jobs
created_at	timestamp	Review date
messages
Field	Type	Description
id	uuid	Primary key
sender_id	uuid	FK to profiles
receiver_id	uuid	FK to profiles
job_id	uuid	FK to jobs
content	text	Message text
created_at	timestamp	Timestamp
read	boolean	Default false

Supabase Realtime can stream messages for live chat updates.

🧠 6. Supabase Edge Functions (Server Logic)

Use Supabase Functions for backend operations:

Payment Processing (future) – Secure call to Paystack API.

Notifications – Trigger OneSignal push when job status changes.

Verification Flow – On signup, send verification email/SMS.

Rating Sync – Update average ratings after each review.

🧰 7. Frontend Structure (React + TypeScript)
src/
 ├── components/
 │   ├── ui/           # Buttons, Modals, Inputs, etc. (shadcn/ui)
 │   ├── cards/        # JobCard, WorkerCard, ReviewCard
 │   ├── forms/        # JobForm, ProfileForm
 │   └── layouts/      # DashboardLayout, AuthLayout
 │
 ├── pages/
 │   ├── auth/         # Login, Signup, Onboarding
 │   ├── dashboard/    # Worker, Client, Admin dashboards
 │   ├── jobs/         # JobFeed, JobDetails
 │   └── chat/         # Messaging interface
 │
 ├── hooks/            # useAuth, useJobs, useRealtimeChat
 ├── lib/              # supabaseClient.ts, constants, helpers
 ├── store/            # Zustand store for user/session
 ├── routes.tsx        # Protected route setup
 └── App.tsx