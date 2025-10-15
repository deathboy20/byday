import { supabase } from '@/integrations/supabase/client';
import { Job, JobCreateInput, JobUpdateInput } from '@/types/job';

export const createJob = async (jobData: JobCreateInput, userId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([
      {
        ...jobData,
        client_id: userId,
        status: 'open',
      },
    ])
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
  return data as Job;
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
  return data as Job[];
};

export const updateJob = async (jobData: JobUpdateInput): Promise<Job> => {
  const { id, ...updates } = jobData;
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Job;
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
