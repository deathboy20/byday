import { useEffect, useState, FC } from "react";
import { Job as DatabaseJob } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobManagementCard from "@/components/JobManagementCard";
import ReviewDialog, { ReviewData } from "@/components/ReviewDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Edit, Trash2, MapPin, DollarSign, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobData extends DatabaseJob {
  // Add any additional fields if needed
}

const ClientDashboard: FC = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<JobData | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [reviewingJob, setReviewingJob] = useState<JobData | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("id", user.id)
        .maybeSingle();
      if (!profile) return;
      setProfileId(profile.id);

      // Fetch client's jobs
      const { data: jobData } = await supabase
        .from("jobs")
        .select("*")
        .eq("client_id", profile.id)
        .order("created_at", { ascending: false });

      if (!ignore) {
        setJobs((jobData ?? []) as JobData[]);
        setLoading(false);
      }
    };

    load();
    return () => { ignore = true; };
  }, []);

  const createJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title"));
    const description = String(fd.get("description"));
    const category = String(fd.get("category"));
    const location = String(fd.get("location"));
    const rate = Number(fd.get("rate"));
    const endDate = String(fd.get("end_date") || "");
    const urgent = fd.get("urgent") === "on";

    if (!title || !description || !category || !location || !rate) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      client_id: profileId,
      title,
      description,
      category,
      location: JSON.stringify({ address: location, coordinates: { lat: 0, lng: 0 } }),
      rate_per_day: rate,
      end_date: endDate || null,
      urgent,
      status: "open",
    });

    if (error) toast({ title: "Failed to post job", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Job posted successfully!" });
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("client_id", profileId)
        .order("created_at", { ascending: false });
      setJobs((data ?? []) as JobData[]);
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleEditJob = (job: JobData): void => {
    setEditingJob(job);
    setEditDialogOpen(true);
  };

  const updateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingJob) return;
    
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title"));
    const description = String(fd.get("description"));
    const category = String(fd.get("category"));
    const location = String(fd.get("location"));
    const rate = Number(fd.get("rate"));

    const { error } = await supabase
      .from("jobs")
      .update({
        title,
        description,
        category,
        location: JSON.stringify({ address: location, coordinates: { lat: 0, lng: 0 } }),
        rate_per_day: rate,
      })
      .eq("id", editingJob.id);

    if (error) {
      toast({ title: "Failed to update job", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Job updated successfully!" });
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("client_id", profileId)
        .order("created_at", { ascending: false });
      setJobs((data ?? []) as JobData[]);
      setEditDialogOpen(false);
      setEditingJob(null);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      toast({ title: "Failed to delete job", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Job deleted successfully!" });
      setJobs(jobs.filter(j => j.id !== jobId));
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: newStatus })
        .eq("id", jobId);

      if (error) throw error;

      toast({ 
        title: "Status Updated", 
        description: `Job status changed to ${newStatus.replace('_', ' ')}` 
      });

      // Update local state
      setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus as any } : j));
    } catch (error) {
      console.error("Error updating status:", error);
      toast({ 
        title: "Error", 
        description: "Failed to update job status", 
        variant: "destructive" 
      });
    }
  };

  const handleReviewSubmit = async (reviewData: ReviewData) => {
    if (!reviewingJob) return;

    try {
      // In a real app, you'd submit this to a reviews table
      // For now, we'll just show a success message
      toast({ 
        title: "Review Submitted", 
        description: "Thank you for your feedback!" 
      });

      setReviewDialogOpen(false);
      setReviewingJob(null);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({ 
        title: "Error", 
        description: "Failed to submit review", 
        variant: "destructive" 
      });
    }
  };

  const handleReview = (job: JobData) => {
    setReviewingJob(job);
    setReviewDialogOpen(true);
  };

  const getLocationString = (location: string | { address?: string } | null | undefined): string => {
    if (typeof location === 'string') {
      try {
        const parsed = JSON.parse(location);
        return parsed.address || location;
      } catch {
        return location;
      }
    }
    return location?.address || 'Location not specified';
  };

  const getStatusBadge = (status: string): JSX.Element => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
      open: { label: 'Open', variant: 'default' },
      in_progress: { label: 'In Progress', variant: 'secondary' },
      completed: { label: 'Completed', variant: 'outline' },
      cancelled: { label: 'Cancelled', variant: 'destructive' },
    };
    const info = statusMap[status] || { label: status, variant: 'outline' };
    return <Badge variant={info.variant}>{info.label}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

      <Tabs defaultValue="my-jobs">
        <TabsList>
          <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
        </TabsList>

        <TabsContent value="my-jobs" className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium">No jobs posted yet</h3>
              <p className="text-muted-foreground mt-2">
                Post your first job to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobManagementCard
                  key={job.id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onStatusChange={handleStatusChange}
                  onReview={handleReview}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Edit Job Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
              <DialogDescription>
                Update the details of your job posting
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={updateJob} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  name="title"
                  defaultValue={editingJob?.title}
                  placeholder="Need a painter"
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  name="category"
                  defaultValue={editingJob?.category}
                  placeholder="Painting"
                  required
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  name="location"
                  defaultValue={getLocationString(editingJob?.location)}
                  placeholder="Accra"
                  required
                />
              </div>
              <div>
                <Label>Rate per day (GHS)</Label>
                <Input
                  name="rate"
                  type="number"
                  min={1}
                  defaultValue={editingJob?.rate_per_day}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  defaultValue={editingJob?.description}
                  placeholder="Short description"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <TabsContent value="post" className="mt-6">
          <form onSubmit={createJob} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-6 rounded-xl border">
            <div>
              <Label>Title *</Label>
              <Input name="title" placeholder="Need a painter" required />
            </div>
            <div>
              <Label>Category *</Label>
              <Input name="category" placeholder="Painting" required />
            </div>
            <div>
              <Label>Location *</Label>
              <Input name="location" placeholder="Accra" required />
            </div>
            <div>
              <Label>Rate per day (GHS) *</Label>
              <Input name="rate" type="number" min={1} required />
            </div>
            <div>
              <Label>End Date (Optional)</Label>
              <Input 
                name="end_date" 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty if flexible</p>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="urgent"
                name="urgent"
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="urgent" className="cursor-pointer">
                Mark as urgent
              </Label>
            </div>
            <div className="md:col-span-2">
              <Label>Description *</Label>
              <Textarea name="description" placeholder="Describe the job in detail..." rows={4} required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="bg-primary text-primary-foreground w-full md:w-auto">Post Job</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <ReviewDialog
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        onSubmit={handleReviewSubmit}
        jobTitle={reviewingJob?.title || ''}
        workerName="Worker" // In real app, fetch from worker profile
        loading={false}
      />
    </div>
  );
};

export default ClientDashboard;
