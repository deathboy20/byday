import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const WorkerDashboard = () => {
  const [openJobs, setOpenJobs] = useState<any[]>([]);
  const [myApps, setMyApps] = useState<any[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setProfileId(user.id);

      const { data: jobs } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });
      setOpenJobs(jobs ?? []);

      const { data: apps } = await supabase
        .from("job_applications")
        .select("id, job_id, status, jobs(title, location, rate_per_day)")
        .eq("worker_id", user.id)
        .order("created_at", { ascending: false });
      setMyApps(apps ?? []);
    };
    load();
  }, []);

  const apply = async (jobId: string) => {
    if (!profileId) return;
    const { error } = await supabase.from("job_applications").insert({ job_id: jobId, worker_id: profileId, message: "I'm available and ready." });
    if (error) toast({ title: "Could not apply", description: error.message });
    else toast({ title: "Applied!" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Worker Dashboard</h1>

      <h2 className="text-xl font-semibold mb-3">Open Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {openJobs.map((j) => (
          <div key={j.id}>
            <JobCard
              title={j.title}
              description={j.description}
              rate={`GHS ${Number(j.rate_per_day)}`}
              location={j.location}
              postedTime={new Date(j.created_at).toLocaleDateString()}
              clientName="Client"
              clientRating={4.7}
              category={j.category}
              urgent={j.urgent}
            />
            <Button onClick={() => apply(j.id)} className="w-full mt-2">Apply</Button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">My Applications</h2>
      <ul className="space-y-3">
        {myApps.map((a) => (
          <li key={a.id} className="bg-card border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.jobs?.title ?? "Job"}</div>
              <div className="text-sm text-muted-foreground">Status: {a.status}</div>
            </div>
            <div className="text-sm">GHS {Number(a.jobs?.rate_per_day ?? 0)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
