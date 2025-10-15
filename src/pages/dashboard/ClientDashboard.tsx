import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import JobCard from "@/components/JobCard";

const ClientDashboard = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

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
        setJobs(jobData ?? []);
        setLoading(false);
      }

      // Seed demo jobs if none
      if ((jobData?.length ?? 0) === 0) {
        const seed = [
          { title: "Painter Needed for 2-Bedroom Flat", description: "Repaint interior walls.", category: "Painting", location: "Osu, Accra", rate_per_day: 150, urgent: true },
          { title: "Plumber for Kitchen Sink Repair", description: "Fix leaking sink.", category: "Plumbing", location: "Tema, Greater Accra", rate_per_day: 100 },
        ];
        const rows = seed.map((s) => ({ ...s, client_id: profile.id, status: "open" }));
        const { error } = await supabase.from("jobs").insert(rows);
        if (!error) {
          const { data: seeded } = await supabase
            .from("jobs")
            .select("*")
            .eq("client_id", profile.id)
            .order("created_at", { ascending: false });
          setJobs(seeded ?? []);
        }
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
      location,
      rate_per_day: rate,
      status: "open",
    });

    if (error) toast({ title: "Failed to post job", description: error.message });
    else {
      toast({ title: "Job posted" });
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("client_id", profileId)
        .order("created_at", { ascending: false });
      setJobs(data ?? []);
      (e.target as HTMLFormElement).reset();
    }
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
            <div className="text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((j) => (
                <JobCard
                  key={j.id}
                  title={j.title}
                  description={j.description}
                  rate={`GHS ${Number(j.rate_per_day)}`}
                  location={j.location}
                  postedTime={new Date(j.created_at).toLocaleDateString()}
                  clientName="You"
                  clientRating={4.8}
                  category={j.category}
                  urgent={j.urgent}
                />
              ))}
            </div>
          )}
        </TabsContent>

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
