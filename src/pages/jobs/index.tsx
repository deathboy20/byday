import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, DollarSign, Clock } from 'lucide-react';
import { useJobUpdates } from '@/hooks/useJobUpdates';
import { formatDistanceToNow } from 'date-fns';

const JobsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all open jobs
  const { jobs, loading } = useJobUpdates({
    status: 'open',
  });

  // Filter jobs by search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Find day jobs that match your skills
          </p>
        </div>
        {user && (
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="mt-4 md:mt-0">
            Back to Dashboard
          </Button>
        )}
      </div>

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
              <Card 
                key={job.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
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

                  <Badge variant="outline" className="mb-4">
                    {job.category}
                  </Badge>

                  <Button className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/jobs/${job.id}`);
                  }}>
                    View Details
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
                  : 'There are currently no open jobs available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
