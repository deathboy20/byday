import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";

interface JobCardData {
  title: string;
  description: string;
  rate: string;
  location: string;
  postedTime: string;
  clientName: string;
  clientRating: number;
  category: string;
  urgent: boolean;
}

const JobFeed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            profiles:client_id (full_name)
          `)
          .eq('status', 'open')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;

        const formattedJobs: JobCardData[] = (data || []).map((job: any) => {
          let location = job.location;
          if (typeof location === 'string') {
            try {
              location = JSON.parse(location);
            } catch {
              location = { address: location };
            }
          }

          const timeAgo = getTimeAgo(new Date(job.created_at));

          return {
            title: job.title,
            description: job.description,
            rate: `GHS ${job.rate_per_day}`,
            location: location?.address || 'Location not specified',
            postedTime: timeAgo,
            clientName: job.profiles?.full_name || 'Anonymous',
            clientRating: 4.5, // Default rating, can be fetched from reviews
            category: job.category,
            urgent: job.urgent || false,
          };
        });

        setJobs(formattedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  const handleLoadMore = () => {
    if (!user) {
      navigate('/auth');
    } else {
      setDisplayCount(prev => prev + 6);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Available Jobs
            </h2>
            <p className="text-muted-foreground">
              {jobs.length} opportunities waiting for you
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="high-pay">High Pay</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.slice(0, displayCount).map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="urgent" className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.filter(job => job.urgent).slice(0, displayCount).map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="nearby" className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.slice(0, Math.min(displayCount, 6)).map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="high-pay" className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs
                  .filter(job => parseInt(job.rate.replace('GHS ', '')) >= 150)
                  .slice(0, displayCount)
                  .map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Load More */}
        {!loading && jobs.length > displayCount && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[200px]"
              onClick={handleLoadMore}
            >
              {user ? 'Load More Jobs' : 'Sign In to Load More'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobFeed;
