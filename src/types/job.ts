// Re-export database types for consistency
export type { JobStatus, ApplicationStatus, Profile, LocationData } from './database';
export type {
  Job as DatabaseJob,
  JobApplication as DatabaseJobApplication,
  JobWithRelations,
  JobApplicationWithRelations
} from './database';

// Frontend-specific types (camelCase for React components)
export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  reviewCount?: number;
  completedJobs?: number;
}

export interface JobApplication {
  id: string;
  job_id: string;
  worker_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  worker?: User;
  job?: Job;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  client?: User;
  workerId?: string;
  worker?: User;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  rate: number;
  duration: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  skillsRequired: string[];
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  images?: string[];
  applicants?: JobApplication[];
  applicantCount?: number;
  urgent?: boolean;
}

export interface JobCreateInput {
  title: string;
  description: string;
  rate: number;
  duration: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  skillsRequired: string[];
  images?: File[];
  urgent?: boolean;
}

export interface JobUpdateInput {
  id: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
  workerId?: string;
  title?: string;
  description?: string;
  rate?: number;
  duration?: string;
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category?: string;
  skillsRequired?: string[];
  urgent?: boolean;
}

export interface JobFilterOptions {
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled' | Array<'open' | 'in_progress' | 'completed' | 'cancelled'>;
  clientId?: string;
  workerId?: string;
  category?: string;
  minRate?: number;
  maxRate?: number;
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  skills?: string[];
  urgentOnly?: boolean;
  searchQuery?: string;
}
