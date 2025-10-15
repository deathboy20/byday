import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, DollarSign, Clock, User } from 'lucide-react';
import { useJobUpdates, useWorkerApplications } from '@/hooks/useJobUpdates';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch jobs and applications with real-time updates
  const { jobs: openJobs, loading: jobsLoading } = useJobUpdates({
    status: 'open',
  });

  const { applications: myApplications, loading: appsLoading } = useWorkerApplications(user?.id || '');

  // Filter jobs by search query
  const filteredJobs = openJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading only on initial auth check
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleApply = async (jobId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([
          { 
            job_id: jobId, 
            worker_id: user.id, 
            status: 'pending',
            message: 'I am interested in this job and available to start immediately.'
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Application submitted!',
        description: 'Your application has been sent to the client.',
      });
    } catch (error: any) {
      console.error('Error applying for job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
      completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800' },
    };
    
    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge className={`${statusInfo.className} capitalize`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Worker Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Find jobs that match your skills and availability
          </p>
        </div>
        <Button onClick={() => navigate('/jobs')} className="mt-4 md:mt-0">
          Browse All Jobs
        </Button>
      </div>

      <Tabs defaultValue="find-jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="find-jobs">Find Jobs</TabsTrigger>
          <TabsTrigger value="my-applications">
            My Applications {myApplications.length > 0 && `(${myApplications.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find-jobs" className="mt-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, description, or category..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        {job.urgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location?.address || 'Location not specified'}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                          <span className="font-semibold">GHS {job.rate.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-600" />
                          <span>{job.duration}</span>
                        </div>
                      </div>

                      {job.skillsRequired && job.skillsRequired.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skillsRequired.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                          {job.skillsRequired.length > 3 && (
                            <Badge variant="outline">
                              +{job.skillsRequired.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                        disabled={myApplications.some(app => app.job_id === job.id)}
                      >
                        {myApplications.some(app => app.job_id === job.id) ? 'Applied' : 'Apply Now'}
                      </Button>
                    </CardContent>
                    <div className="px-6 py-3 bg-muted/50 text-xs text-muted-foreground">
                      Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery 
                      ? 'Try adjusting your search or filters' 
                      : 'There are currently no open jobs matching your criteria.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-applications" className="mt-6">
          {myApplications.length > 0 ? (
            <div className="space-y-4">
              {myApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => app.job && navigate(`/jobs/${app.job.id}`)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{app.job?.title || 'Job'}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{app.job?.location?.address || 'Location not specified'}</span>
                        </div>
                        <div className="mt-2">
                          {app.job?.client && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">
                                {app.job.client.name || 'Client'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Applied {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xl font-bold text-green-600">
                          GHS {app.job?.rate?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(app.status)}
                          {app.status === 'accepted' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                app.job && navigate(`/jobs/${app.job.id}`);
                              }}
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p className="text-muted-foreground mt-2">
                Apply to jobs to see them listed here
              </p>
              <Button className="mt-4" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerDashboard;
