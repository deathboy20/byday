// Database types matching Supabase schema
export type UserType = 'worker' | 'client' | 'admin';
export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  user_type: UserType;
  verified: boolean;
  rating: number;
  total_reviews: number;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  client_id: string;
  worker_id?: string | null;
  title: string;
  description: string;
  category: string;
  location: string | LocationData; // Can be JSON string or object
  rate_per_day: number;
  status: JobStatus;
  urgent?: boolean | null;
  skills_required?: string[] | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface JobApplication {
  id: string;
  job_id: string;
  worker_id: string;
  status: ApplicationStatus;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  job_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface WorkerSkill {
  id: string;
  worker_id: string;
  skill_name: string;
  experience_years?: number;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  job_id?: string;
  content: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'job_application' | 'job_accepted' | 'job_completed' | 'message' | 'review' | 'system';
  read: boolean;
  link?: string;
  created_at: string;
}

// Extended types with relations
export interface JobWithRelations extends Job {
  profiles?: Profile; // Client profile
  worker?: Profile; // Worker profile
  job_applications?: JobApplication[];
  applicant_count?: number;
}

export interface JobApplicationWithRelations extends JobApplication {
  jobs?: Job;
  worker?: Profile;
}

export interface ProfileWithStats extends Profile {
  completed_jobs?: number;
  active_jobs?: number;
  worker_skills?: WorkerSkill[];
}
