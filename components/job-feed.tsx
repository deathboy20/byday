"use client"

import JobCard from "./job-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

const JobFeed = () => {
  const jobs = [
    {
      title: "Painter Needed for 2-Bedroom Flat",
      description:
        "Looking for an experienced painter to repaint interior walls. Must bring own tools and paint. Work starts Monday.",
      rate: "GHS 150",
      location: "Osu, Accra",
      postedTime: "2 hours ago",
      clientName: "Kwame A.",
      clientRating: 4.8,
      category: "Painting",
      urgent: true,
    },
    {
      title: "Plumber for Kitchen Sink Repair",
      description:
        "Kitchen sink has a leak that needs urgent repair. Looking for reliable plumber available today or tomorrow.",
      rate: "GHS 100",
      location: "Tema, Greater Accra",
      postedTime: "5 hours ago",
      clientName: "Ama K.",
      clientRating: 4.9,
      category: "Plumbing",
      urgent: false,
    },
    {
      title: "Cleaner for Office Space",
      description:
        "Need a cleaner for a small office every weekday morning from 6am-8am. Long term position available.",
      rate: "GHS 80",
      location: "Labone, Accra",
      postedTime: "1 day ago",
      clientName: "John M.",
      clientRating: 4.7,
      category: "Cleaning",
      urgent: false,
    },
    {
      title: "Carpenter for Custom Furniture",
      description:
        "Looking for skilled carpenter to build custom wardrobe and shelving. Must have portfolio of previous work.",
      rate: "GHS 200",
      location: "East Legon, Accra",
      postedTime: "3 hours ago",
      clientName: "Abena S.",
      clientRating: 5.0,
      category: "Carpentry",
      urgent: false,
    },
    {
      title: "Electrician for House Rewiring",
      description:
        "Complete house rewiring project. Must be certified and experienced with residential electrical work.",
      rate: "GHS 300",
      location: "Kumasi",
      postedTime: "6 hours ago",
      clientName: "Kofi B.",
      clientRating: 4.6,
      category: "Electrical",
      urgent: true,
    },
    {
      title: "Gardener for Weekly Maintenance",
      description:
        "Need gardener for weekly lawn mowing and garden maintenance. Reliable person for long-term engagement.",
      rate: "GHS 60",
      location: "Cantonments, Accra",
      postedTime: "4 hours ago",
      clientName: "Grace O.",
      clientRating: 4.8,
      category: "Gardening",
      urgent: false,
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Available Jobs</h2>
            <p className="text-muted-foreground">{jobs.length} opportunities waiting for you</p>
          </div>
          <Button variant="outline" className="hidden sm:flex bg-transparent">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs
                .filter((job) => job.urgent)
                .map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 3).map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="high-pay" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs
                .filter((job) => Number.parseInt(job.rate.replace("GHS ", "")) >= 150)
                .map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}

export default JobFeed
