# ByDay Setup Guide

This guide will help you set up the ByDay job marketplace application.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Git (optional, for version control)

## Step 1: Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in your project details
   - Wait for the project to be created (takes ~2 minutes)

2. **Get Your API Keys**
   - In your Supabase project dashboard, go to Settings → API
   - Copy the following:
     - Project URL (looks like `https://xxxxx.supabase.co`)
     - `anon` public key (starts with `eyJ...`)

3. **Run the Database Setup Script**
   - In your Supabase dashboard, go to the SQL Editor
   - Click "New Query"
   - Copy the entire contents of `scripts/setup-database.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script
   - This will create all tables, indexes, RLS policies, and triggers

## Step 2: Environment Variables

1. **Create `.env.local` file**
   - In the root of your project, create a file named `.env.local`
   - Copy the contents from `.env.local.example`
   - Fill in your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 4: Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 5: Test the Application

### Demo Accounts

The app includes demo account functionality. On the login page, you can click:
- **Demo Worker** - Creates/logs in as a worker account
- **Demo Client** - Creates/logs in as a client account
- **Demo Admin** - Creates/logs in as an admin account

These demo accounts use the following credentials:
- Worker: `worker@demo.byday` / `byday123`
- Client: `client@demo.byday` / `byday123`
- Admin: `admin@demo.byday` / `byday123`

### Create Your Own Account

1. Click "Sign Up" tab
2. Enter your details
3. Choose whether you're a Worker or Client
4. Click "Create account"

## Features

### For Clients
- Post job listings
- View and manage your posted jobs
- Review applications from workers
- Rate workers after job completion

### For Workers
- Browse available jobs
- Apply to jobs with a message
- View your application status
- Build your profile with skills and experience

## Troubleshooting

### Database Connection Issues
- Verify your environment variables are correct
- Check that the Supabase project is active
- Ensure the database setup script ran successfully

### Authentication Issues
- Clear your browser cookies and try again
- Check that RLS policies are enabled in Supabase
- Verify the `handle_new_user` trigger is active

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Restart the development server

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

## Support

If you encounter any issues, please check:
- The Supabase dashboard for database errors
- Browser console for client-side errors
- Terminal output for server-side errors

## Next Steps

- Customize the styling in `app/globals.css`
- Add more job categories
- Implement real-time notifications
- Add payment integration
- Enhance the rating system
