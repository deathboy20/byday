import { useEffect, useState } from 'react';
import { Job, JobStatus, JobFilterOptions, JobApplication } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';

export const useJobUpdates = (filters: JobFilterOptions = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        // Apply filters
        if (filters.status) {
          if (Array.isArray(filters.status)) {
            query.in('status', filters.status);
          } else {
            query.eq('status', filters.status);
          }
        }

        if (filters.workerId) {
          query.eq('worker_id', filters.workerId);
        }

        const { data, error } = await query;

        if (error) throw error;

        setJobs(data.map((job: any) => {
          // Parse location if it's a string
          let location = job.location;
          if (typeof location === 'string') {
            try {
              location = JSON.parse(location);
            } catch {
              location = { address: location, coordinates: { lat: 0, lng: 0 } };
            }
          }
          
          return {
            id: job.id,
            title: job.title,
            description: job.description,
            clientId: job.client_id,
            workerId: job.worker_id,
            status: job.status,
            rate: job.rate_per_day || job.rate,
            duration: job.end_date ? `Until ${new Date(job.end_date).toLocaleDateString()}` : 'Flexible',
            location: location || { address: 'Location not specified', coordinates: { lat: 0, lng: 0 } },
            category: job.category,
            skillsRequired: job.skills_required || [],
            createdAt: job.created_at,
            updatedAt: job.updated_at,
            urgent: job.urgent || false,
            applicantCount: 0,
          } as Job;
        }));
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
        },
        (payload: any) => {
          setJobs(currentJobs => {
            const newJobs = [...currentJobs];
            
            if (payload.eventType === 'DELETE') {
              return newJobs.filter(j => j.id !== payload.old?.id);
            }
            
            const index = newJobs.findIndex(j => j.id === payload.new?.id);
            let location = payload.new.location;
            if (typeof location === 'string') {
              try {
                location = JSON.parse(location);
              } catch {
                location = { address: location, coordinates: { lat: 0, lng: 0 } };
              }
            }
            
            const updatedJob: Job = {
              id: payload.new.id,
              title: payload.new.title,
              description: payload.new.description,
              clientId: payload.new.client_id,
              workerId: payload.new.worker_id,
              status: payload.new.status,
              rate: payload.new.rate_per_day || payload.new.rate,
              duration: payload.new.end_date ? `Until ${new Date(payload.new.end_date).toLocaleDateString()}` : 'Flexible',
              location: location || { address: 'Location not specified', coordinates: { lat: 0, lng: 0 } },
              category: payload.new.category,
              skillsRequired: payload.new.skills_required || [],
              createdAt: payload.new.created_at,
              updatedAt: payload.new.updated_at,
              urgent: payload.new.urgent || false,
            };

            if (index >= 0) {
              newJobs[index] = updatedJob;
              return newJobs;
            } else {
              return [updatedJob, ...newJobs];
            }
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [filters]);

  return { jobs, loading, error };
};

export const useWorkerApplications = (workerId: string) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workerId) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('job_applications')
          .select('*, jobs(*)')
          .eq('worker_id', workerId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setApplications(data.map((app: any) => ({
          id: app.id,
          job_id: app.job_id,
          worker_id: app.worker_id,
          status: app.status as any,
          message: app.message,
          created_at: app.created_at,
          job: app.jobs ? {
            id: app.jobs.id,
            title: app.jobs.title,
            description: app.jobs.description,
            clientId: app.jobs.client_id,
            workerId: app.jobs.worker_id,
            status: app.jobs.status as JobStatus,
            rate: app.jobs.rate_per_day,
            duration: app.jobs.end_date || 'Not specified',
            location: typeof app.jobs.location === 'string' 
              ? JSON.parse(app.jobs.location) 
              : app.jobs.location || { address: '', coordinates: { lat: 0, lng: 0 } },
            category: app.jobs.category,
            skillsRequired: [],
            createdAt: app.jobs.created_at,
            updatedAt: app.jobs.updated_at,
            urgent: app.jobs.urgent,
          } : undefined,
        } as JobApplication)));
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();

    // Set up real-time subscription for applications
    const subscription = supabase
      .channel('worker_applications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_applications',
          filter: `worker_id=eq.${workerId}`,
        },
        async (payload: any) => {
          if (payload.eventType === 'DELETE') {
            setApplications(current => 
              current.filter(app => app.id !== payload.old?.id)
            );
          } else {
            // For INSERT or UPDATE, fetch the full application with job data
            const { data: application, error } = await supabase
              .from('job_applications')
              .select('*, jobs(*)')
              .eq('id', payload.new.id)
              .single();

            if (!error && application) {
              setApplications(current => {
                const updated = [...current];
                const index = updated.findIndex(a => a.id === application.id);
                
                const formattedApp: JobApplication = {
                  id: application.id,
                  job_id: application.job_id,
                  worker_id: application.worker_id,
                  status: application.status as any,
                  message: application.message,
                  created_at: application.created_at,
                  job: application.jobs ? {
                    id: application.jobs.id,
                    title: application.jobs.title,
                    description: application.jobs.description,
                    clientId: application.jobs.client_id,
                    workerId: application.jobs.worker_id,
                    status: application.jobs.status as JobStatus,
                    rate: application.jobs.rate_per_day,
                    duration: application.jobs.end_date || 'Not specified',
                    location: typeof application.jobs.location === 'string' 
                      ? JSON.parse(application.jobs.location) 
                      : application.jobs.location || { address: '', coordinates: { lat: 0, lng: 0 } },
                    category: application.jobs.category,
                    skillsRequired: [],
                    createdAt: application.jobs.created_at,
                    updatedAt: application.jobs.updated_at,
                    urgent: application.jobs.urgent,
                  } : undefined,
                };

                if (index >= 0) {
                  updated[index] = formattedApp;
                } else {
                  updated.unshift(formattedApp);
                }
                
                return updated;
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [workerId]);

  return { applications, loading, error };
};
