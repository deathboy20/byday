import { supabase } from '@/integrations/supabase/client';
import { Job, JobCreateInput, JobUpdateInput } from '@/types/job';

export const createJob = async (jobData: JobCreateInput, userId: string) => {
  // Transform frontend data to database schema
  const dbData = {
    title: jobData.title,
    description: jobData.description,
    client_id: userId,
    status: 'open',
    rate_per_day: jobData.rate,
    location: typeof jobData.location === 'string' ? jobData.location : JSON.stringify(jobData.location),
    category: jobData.category,
    urgent: jobData.urgent || false,
    start_date: new Date().toISOString(),
    end_date: jobData.duration || '',
  };

  const { data, error } = await supabase
    .from('jobs')
    .insert([dbData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getJob = async (jobId: string): Promise<Job> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (error) throw error;
  
  // Transform database data to frontend Job type
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    clientId: data.client_id,
    workerId: data.worker_id,
    status: data.status as any,
    rate: data.rate_per_day,
    duration: data.end_date || 'Not specified',
    location: typeof data.location === 'string' ? JSON.parse(data.location) : data.location,
    category: data.category,
    skillsRequired: [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    urgent: data.urgent,
  };
};

export const getJobs = async (filters: {
  status?: string;
  clientId?: string;
  workerId?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number; // in kilometers
  };
}): Promise<Job[]> => {
  let query = supabase.from('jobs').select('*');

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.clientId) {
    query = query.eq('client_id', filters.clientId);
  }

  if (filters.workerId) {
    query = query.eq('worker_id', filters.workerId);
  }

  const { data, error } = await query;

  if (error) throw error;
  
  // Transform database data to frontend Job type
  return data.map((job: any) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    clientId: job.client_id,
    workerId: job.worker_id,
    status: job.status,
    rate: job.rate_per_day,
    duration: job.end_date || 'Not specified',
    location: typeof job.location === 'string' ? JSON.parse(job.location) : job.location,
    category: job.category,
    skillsRequired: [],
    createdAt: job.created_at,
    updatedAt: job.updated_at,
    urgent: job.urgent,
  }));
};

export const updateJob = async (jobData: JobUpdateInput): Promise<Job> => {
  const { id, ...updates } = jobData;
  
  // Transform frontend updates to database schema
  const dbUpdates: any = {};
  if (updates.status) dbUpdates.status = updates.status;
  if (updates.title) dbUpdates.title = updates.title;
  if (updates.description) dbUpdates.description = updates.description;
  if (updates.rate) dbUpdates.rate_per_day = updates.rate;
  if (updates.duration) dbUpdates.end_date = updates.duration;
  if (updates.location) dbUpdates.location = typeof updates.location === 'string' ? updates.location : JSON.stringify(updates.location);
  if (updates.category) dbUpdates.category = updates.category;
  if (updates.urgent !== undefined) dbUpdates.urgent = updates.urgent;
  if (updates.workerId) dbUpdates.worker_id = updates.workerId;
  
  const { data, error } = await supabase
    .from('jobs')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  
  // Transform database data to frontend Job type
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    clientId: data.client_id,
    workerId: data.worker_id,
    status: data.status as any,
    rate: data.rate_per_day,
    duration: data.end_date || 'Not specified',
    location: typeof data.location === 'string' ? JSON.parse(data.location) : data.location,
    category: data.category,
    skillsRequired: [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    urgent: data.urgent,
  };
};

export const deleteJob = async (jobId: string): Promise<void> => {
  const { error } = await supabase.from('jobs').delete().eq('id', jobId);
  if (error) throw error;
};

// Job Application Functions
export const applyForJob = async (jobId: string, workerId: string, message?: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert([
      {
        job_id: jobId,
        worker_id: workerId,
        status: 'pending',
        message: message || 'I am interested in this job.',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getJobApplications = async (jobId: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*, profiles(*)')
    .eq('job_id', jobId);

  if (error) throw error;
  return data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: 'pending' | 'accepted' | 'rejected'
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .update({ status })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
