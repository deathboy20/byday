import { useQuery } from '@tanstack/react-query';
import { Job, JobStatus } from '@/types/job';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getJobs } from '@/services/jobService';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';

interface JobListProps {
  status?: JobStatus;
  showActions?: boolean;
  onJobSelect?: (job: Job) => void;
}

export function JobList({ status = 'open', showActions = true, onJobSelect }: JobListProps) {
  const { user } = useAuth();

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs', status, user?.id],
    queryFn: () => getJobs({ 
      status,
      clientId: status === 'my-jobs' ? user?.id : undefined,
      workerId: status === 'my-applications' ? user?.id : undefined,
    }),
  });

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div className="text-center py-8">No jobs found</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onJobSelect?.(job)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                {job.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm line-clamp-2">{job.description}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location.address}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>GH₵{job.rate.toLocaleString()}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{job.duration}</span>
              </div>
              {job.skillsRequired && job.skillsRequired.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          {showActions && (
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {status === 'open' && (
                <Button size="sm">Apply Now</Button>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
