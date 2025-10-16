import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Check if user is the job owner
        if (data.client_id !== user?.id) {
          toast({
            title: 'Access Denied',
            description: 'You can only edit your own jobs',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }

        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job details',
          variant: 'destructive',
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const location = formData.get('location') as string;
      const endDate = formData.get('end_date') as string;

      const { error } = await supabase
        .from('jobs')
        .update({
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          category: formData.get('category') as string,
          location: JSON.stringify({ 
            address: location, 
            coordinates: { lat: 0, lng: 0 } 
          }),
          rate_per_day: Number(formData.get('rate_per_day')),
          end_date: endDate || null,
          urgent: formData.get('urgent') === 'on',
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Job updated successfully',
      });

      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getLocationString = (location: any): string => {
    if (typeof location === 'string') {
      try {
        const parsed = JSON.parse(location);
        return parsed.address || location;
      } catch {
        return location;
      }
    }
    return location?.address || '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(`/jobs/${id}`)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Job Details
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={job.title}
                placeholder="e.g., Need a painter for 2 rooms"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={job.description}
                placeholder="Describe the job in detail..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={job.category}
                  placeholder="e.g., Painting, Plumbing"
                  required
                />
              </div>

              <div>
                <Label htmlFor="rate_per_day">Rate per Day (GHS) *</Label>
                <Input
                  id="rate_per_day"
                  name="rate_per_day"
                  type="number"
                  min="1"
                  defaultValue={job.rate_per_day}
                  placeholder="e.g., 150"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                defaultValue={getLocationString(job.location)}
                placeholder="e.g., Accra, Kumasi"
                required
              />
            </div>

            <div>
              <Label htmlFor="end_date">End Date (Optional)</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                defaultValue={job.end_date ? new Date(job.end_date).toISOString().split('T')[0] : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Leave empty if the job duration is flexible
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urgent"
                name="urgent"
                defaultChecked={job.urgent}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="urgent" className="cursor-pointer">
                Mark as urgent
              </Label>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/jobs/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? 'Updating...' : 'Update Job'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
