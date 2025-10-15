# ByDay - Daily Work Platform for Ghana

A Next.js application connecting skilled workers with clients in Ghana. Find daily work opportunities or post jobs in minutes.

## Features

- **Job Marketplace**: Browse and apply for daily work opportunities
- **Client Dashboard**: Post jobs and manage applications
- **Worker Dashboard**: Find work and track applications
- **Authentication**: Secure login with Supabase Auth
- **Real-time Updates**: Live job postings and applications

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone the repository

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. **Set up Supabase Database**:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Open the file `scripts/setup-database.sql` from this project
   - Copy and paste the entire SQL script into the Supabase SQL Editor
   - Click "Run" to execute the script
   - This creates all tables, indexes, RLS policies, and triggers

4. **Configure Environment Variables**:
   - In the Vercel v0 interface, go to the **Vars** section in the in-chat sidebar
   - Add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (from Settings → API)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (from Settings → API)
   
   Alternatively, create a `.env.local` file:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   Then add your Supabase credentials to `.env.local`

5. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── dashboard/         # Client and Worker dashboards
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components (navbar, hero, job-card, etc.)
├── contexts/             # React contexts (Auth)
├── lib/                  # Utility functions and Supabase clients
│   └── supabase/         # Supabase client, server, and middleware
├── scripts/              # Database setup scripts
└── public/               # Static assets
\`\`\`

## Environment Variables

Required environment variables (add these in the **Vars** section of v0 or in `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Schema

The app uses the following main tables:

- `profiles`: User profiles (workers and clients)
- `jobs`: Job postings
- `job_applications`: Worker applications to jobs
- `reviews`: User reviews
- `worker_skills`: Worker skills and experience

All tables include Row Level Security (RLS) policies for data protection.

## Demo Accounts

The app includes demo accounts for testing (created automatically on first login):

- Worker: `worker@demo.byday` / `byday123`
- Client: `client@demo.byday` / `byday123`
- Admin: `admin@demo.byday` / `byday123`

Click the demo buttons on the login page to quickly test the application.

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The app is optimized for Vercel deployment with proper middleware and Supabase SSR integration.

## Troubleshooting

### Missing Environment Variables
If you see errors about missing Supabase credentials:
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the **Vars** section of the v0 sidebar
- Or create a `.env.local` file with these variables

### Database Connection Issues
- Ensure you've run the `scripts/setup-database.sql` script in your Supabase SQL Editor
- Verify your Supabase project is active and the credentials are correct

### Authentication Issues
- Check that the `handle_new_user` trigger is active in Supabase
- Verify RLS policies are enabled on all tables

## Documentation

- See `SETUP.md` for detailed setup instructions
- Database schema is in `scripts/setup-database.sql`

## License

MIT
