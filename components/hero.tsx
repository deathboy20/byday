"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Users, MapPin } from "lucide-react"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>Connecting Ghana, One Job at a Time</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Find Daily Work.
              <br />
              <span className="text-primary">Get Paid.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Ghana's trusted platform for connecting skilled workers with clients who need them. Post a job or find
              work in minutes.
            </p>

            {/* Search Bar */}
            <div className="bg-card rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 border border-border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="What service do you need?"
                  className="pl-12 border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location (e.g., Accra)"
                  className="pl-12 border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Search Jobs</Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">12,000+</div>
                  <div className="text-sm text-muted-foreground">Active Workers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">5,000+</div>
                  <div className="text-sm text-muted-foreground">Jobs Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-workers.jpg"
                alt="Ghanaian workers smiling"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Job Completed!</div>
                  <div className="text-sm text-muted-foreground">GHS 120 earned today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
