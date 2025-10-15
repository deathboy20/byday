-- =====================================================
-- ByDay Platform - Complete Schema Migration
-- =====================================================
-- This migration adds missing tables and fields to complete the schema
-- Run this after the initial seed.sql
-- =====================================================

-- Add missing fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_reviews integer DEFAULT 0;

-- Create messages table for real-time chat
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
    content text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages (receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_job_id ON messages (job_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages (read) WHERE read = false;

-- RLS for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON messages 
    FOR SELECT 
    USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can insert messages they send
CREATE POLICY "Users can send messages" ON messages 
    FOR INSERT 
    WITH CHECK (auth.uid() = sender_id);

-- Users can update messages they received (mark as read)
CREATE POLICY "Users can mark messages as read" ON messages 
    FOR UPDATE 
    USING (auth.uid() = receiver_id);

-- Trigger for messages updated_at
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create notifications table (optional for future use)
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    message text NOT NULL,
    type text CHECK (type IN ('job_application', 'job_accepted', 'job_completed', 'message', 'review', 'system')),
    read boolean DEFAULT false,
    link text,
    created_at timestamptz DEFAULT NOW()
);

-- Indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications (read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications (created_at DESC);

-- RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id uuid,
    p_title text,
    p_message text,
    p_type text,
    p_link text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
    notification_id uuid;
BEGIN
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (p_user_id, p_title, p_message, p_type, p_link)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create notification when job application is created
CREATE OR REPLACE FUNCTION notify_job_application()
RETURNS TRIGGER AS $$
DECLARE
    job_title text;
    client_id uuid;
BEGIN
    -- Get job details
    SELECT title, jobs.client_id INTO job_title, client_id
    FROM jobs
    WHERE id = NEW.job_id;
    
    -- Create notification for client
    PERFORM create_notification(
        client_id,
        'New Job Application',
        'Someone applied to your job: ' || job_title,
        'job_application',
        '/jobs/' || NEW.job_id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_job_application
    AFTER INSERT ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION notify_job_application();

-- Trigger to create notification when application is accepted
CREATE OR REPLACE FUNCTION notify_application_status()
RETURNS TRIGGER AS $$
DECLARE
    job_title text;
BEGIN
    IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
        -- Get job title
        SELECT title INTO job_title
        FROM jobs
        WHERE id = NEW.job_id;
        
        -- Create notification for worker
        PERFORM create_notification(
            NEW.worker_id,
            'Application Accepted',
            'Your application for "' || job_title || '" has been accepted!',
            'job_accepted',
            '/jobs/' || NEW.job_id
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_application_status
    AFTER UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION notify_application_status();

-- Trigger to create notification when job is completed
CREATE OR REPLACE FUNCTION notify_job_completed()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Notify worker
        IF NEW.worker_id IS NOT NULL THEN
            PERFORM create_notification(
                NEW.worker_id,
                'Job Completed',
                'The job "' || NEW.title || '" has been marked as completed',
                'job_completed',
                '/jobs/' || NEW.id
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_job_completed
    AFTER UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION notify_job_completed();

-- Update profiles table to add email column if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Complete schema migration applied successfully!';
    RAISE NOTICE '📋 Added: messages table, notifications table';
    RAISE NOTICE '📋 Added fields: phone, bio, location, verified, total_reviews to profiles';
    RAISE NOTICE '🔔 Added notification triggers for job applications and completions';
    RAISE NOTICE '🚀 Platform is now fully featured!';
END $$;
