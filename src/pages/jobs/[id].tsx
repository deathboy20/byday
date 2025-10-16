import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJob, updateJob, applyForJob } from '@/services/jobService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Calendar, User, Check, X, MessageSquare, ArrowLeft, Briefcase, Phone, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import JobMap from '@/components/JobMap';
import ApplicationDialog, { ApplicationData } from '@/components/ApplicationDialog';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  // Fetch job details
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id!),
    enabled: !!id,
  });

  // Apply for job mutation
  const { mutate: applyForJobMutation, isPending: isApplying } = useMutation({
    mutationFn: (applicationData: ApplicationData) => {
      // In a real app, you'd send this data to the backend
      return applyForJob(id!, user!.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      setApplicationDialogOpen(false);
      toast({
        title: 'Application submitted!',
        description: 'Your application has been sent to the client. They will contact you soon.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to apply for job',
        variant: 'destructive',
      });
    },
  });

  const handleApplicationSubmit = (data: ApplicationData) => {
    applyForJobMutation(data);
  };

  // Update job status mutation
  const { mutate: updateJobStatus } = useMutation({
    mutationFn: (status: 'open' | 'in_progress' | 'completed' | 'cancelled') => 
      updateJob({ id: id!, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job updated',
        description: `Job status has been updated.`,
      });
    },
  });

  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Error loading job: {error.message}</div>;
  if (!job) return <div>Job not found</div>;

  const isClient = user?.id === job.clientId;
  const isWorker = !isClient && user?.role === 'worker';
  const hasApplied = job.applicants?.some(applicant => applicant.id === user?.id);
  const isAssigned = job.workerId === user?.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                {job.status.replace('_', ' ')}
              </Badge>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location.address}</span>
              <span className="mx-2">•</span>
              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Job details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{job.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Category</h3>
                  <p className="text-muted-foreground">{job.category}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-muted-foreground">{job.duration}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Rate</h3>
                  <p className="text-muted-foreground">GH₵{job.rate.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired?.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mt-6">
                <h3 className="font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Job Location
                </h3>
                <JobMap location={job.location} jobTitle={job.title} />
              </div>
            </CardContent>
          </Card>

          {/* Client/Worker actions */}
          {isClient ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Manage Job</h2>
              <div className="flex gap-4">
                {job.status === 'open' && (
                  <Button variant="outline" onClick={() => navigate(`/jobs/${id}/edit`)}>
                    Edit Job
                  </Button>
                )}
                {job.status === 'in_progress' && (
                  <Button onClick={() => updateJobStatus('completed')}>
                    Mark as Completed
                  </Button>
                )}
                {job.status !== 'cancelled' && job.status !== 'completed' && (
                  <Button 
                    variant="destructive" 
                    onClick={() => updateJobStatus('cancelled')}
                  >
                    Cancel Job
                  </Button>
                )}
              </div>
            </div>
          ) : isWorker && job.status === 'open' && !hasApplied && !isAssigned ? (
            <div className="space-y-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setApplicationDialogOpen(true)}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Apply for this Job
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          ) : isWorker && hasApplied ? (
            <div className="space-y-3">
              <Button variant="outline" className="w-full" disabled>
                <Check className="h-4 w-4 mr-2" />
                Application Submitted
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                The client will review your application and contact you soon.
              </p>
            </div>
          ) : isWorker && isAssigned ? (
            <div className="space-y-4">
              <Button className="w-full" onClick={() => updateJobStatus('in_progress')}>
                Start Job
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {
                // Navigate to chat with client
              }}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Client
              </Button>
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client info */}
          <Card>
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={job.client?.avatar} />
                  <AvatarFallback>
                    {job.client?.name?.charAt(0) || 'C'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{job.client?.name || 'Anonymous'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.client?.completedJobs || 0} jobs posted
                  </p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= (job.client?.rating || 0) ? 'text-yellow-400' : 'text-muted-foreground/30'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({job.client?.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job summary */}
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">GH₵{job.rate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{job.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium text-right">{job.location.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Dialog */}
      <ApplicationDialog
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
        onSubmit={handleApplicationSubmit}
        jobTitle={job.title}
        clientName={job.client?.name}
        loading={isApplying}
      />
    </div>
  );
}

// Simple star component for ratings
function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
