import { useEffect, useState, FC } from "react";
import { Job as DatabaseJob } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

    if (!title || !description || !category || !location || !rate) {
      toast({ title: "Fill all fields" });
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      client_id: profileId,
      title,
      description,
      category,
      location: JSON.stringify({ address: location, coordinates: { lat: 0, lng: 0 } }),
      rate_per_day: rate,
      status: "open",
    });

    if (error) toast({ title: "Failed to post job", description: error.message });
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

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", deleteJobId);

    if (error) {
      toast({ title: "Failed to delete job", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Job deleted successfully!" });
      setJobs(jobs.filter(j => j.id !== deleteJobId));
      setDeleteJobId(null);
    }
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
                <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{getLocationString(job.location)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="font-semibold">GHS {job.rate_per_day}</span>
                      </div>
                      <Badge variant="outline">{job.category}</Badge>
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditJob(job)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => setDeleteJobId(job.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the job posting
                and all associated applications.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteJob} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TabsContent value="post" className="mt-6">
          <form onSubmit={createJob} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-4 rounded-xl border">
            <div>
              <Label>Title</Label>
              <Input name="title" placeholder="Need a painter" required />
            </div>
            <div>
              <Label>Category</Label>
              <Input name="category" placeholder="Painting" required />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" placeholder="Accra" required />
            </div>
            <div>
              <Label>Rate per day (GHS)</Label>
              <Input name="rate" type="number" min={1} required />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input name="description" placeholder="Short description" required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="bg-primary text-primary-foreground">Post Job</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
