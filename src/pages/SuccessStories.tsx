import { Star, Quote } from "lucide-react";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SuccessStories = () => {
  const stories = [
    {
      name: "Kwame Mensah",
      role: "Electrician",
      location: "Accra",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
      rating: 4.9,
      jobsCompleted: 127,
      story: "I've been working as an electrician for 10 years, but finding consistent work was always a challenge. Since joining ByDay 6 months ago, I've completed over 120 jobs and built a steady client base. The platform makes it easy to showcase my skills and connect with clients who need my services. I can now support my family better and even hired an apprentice!",
      highlight: "Increased monthly income by 60%"
    },
    {
      name: "Ama Boateng",
      role: "Client",
      location: "Kumasi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ama",
      rating: 5.0,
      jobsPosted: 15,
      story: "As a small business owner, I often need help with various tasks around my shop. ByDay has been a lifesaver! I've found reliable painters, cleaners, and handymen all through the platform. The rating system helps me choose quality workers, and the transparent pricing means no surprises. I've recommended ByDay to all my fellow business owners.",
      highlight: "Found reliable help within 24 hours"
    },
    {
      name: "Kofi Asante",
      role: "Plumber",
      location: "Tema",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
      rating: 4.8,
      jobsCompleted: 89,
      story: "Before ByDay, I spent hours every day looking for work. Now, jobs come to me! I can see all available plumbing jobs in my area, apply to the ones that fit my schedule, and get hired quickly. The platform has helped me build my reputation through honest reviews from satisfied clients. I'm earning more and working smarter.",
      highlight: "Reduced time spent looking for work by 80%"
    },
    {
      name: "Abena Osei",
      role: "Homeowner",
      location: "Accra",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abena",
      rating: 5.0,
      jobsPosted: 8,
      story: "When I needed to renovate my home, I was worried about finding trustworthy workers. ByDay made it so easy! I could see workers' profiles, read reviews from other clients, and communicate directly through the platform. I hired a painter, carpenter, and electrician - all were professional and did excellent work. The whole process was transparent and stress-free.",
      highlight: "Completed home renovation under budget"
    },
    {
      name: "Emmanuel Darko",
      role: "Carpenter",
      location: "Takoradi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
      rating: 4.9,
      jobsCompleted: 156,
      story: "ByDay has transformed my carpentry business. I used to rely on word-of-mouth, which was unpredictable. Now I have a professional profile showcasing my work, and clients can find me easily. The verified badge has helped build trust, and I get repeat clients regularly. I've been able to expand my workshop and take on bigger projects.",
      highlight: "Grew business by 3x in one year"
    },
    {
      name: "Grace Mensah",
      role: "Property Manager",
      location: "Accra",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      rating: 5.0,
      jobsPosted: 42,
      story: "Managing multiple properties means I constantly need reliable workers for maintenance and repairs. ByDay has become my go-to platform. I can quickly post jobs, review applications, and hire qualified workers. The platform keeps everything organized, and I can track all my jobs in one place. It's saved me countless hours and headaches.",
      highlight: "Manages 15 properties efficiently through ByDay"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Success Stories
              </h1>
              <p className="text-xl text-muted-foreground">
                Real stories from workers and clients who have found success on ByDay.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-muted-foreground">Active Workers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                <div className="text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {stories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar and Info */}
                      <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={story.avatar} alt={story.name} />
                          <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                          <h3 className="font-bold text-lg">{story.name}</h3>
                          <p className="text-sm text-muted-foreground">{story.role}</p>
                          <p className="text-sm text-muted-foreground">{story.location}</p>
                          <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{story.rating}</span>
                          </div>
                          {story.jobsCompleted && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {story.jobsCompleted} jobs completed
                            </p>
                          )}
                          {story.jobsPosted && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {story.jobsPosted} jobs posted
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Story Content */}
                      <div className="flex-1">
                        <Quote className="h-8 w-8 text-primary/20 mb-4" />
                        <p className="text-lg text-muted-foreground mb-4 italic">
                          "{story.story}"
                        </p>
                        <div className="bg-primary/10 rounded-lg p-4 inline-block">
                          <p className="font-semibold text-primary">
                            {story.highlight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join ByDay today and start connecting with opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors inline-block"
              >
                Sign Up as Worker
              </a>
              <a
                href="/auth"
                className="bg-primary-foreground/10 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 inline-block"
              >
                Post a Job
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStories;
