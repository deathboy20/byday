import { Shield, Clock, MapPin, Star, Bell, CreditCard, Users, TrendingUp, MessageSquare, CheckCircle, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: 'Verified Profiles',
      description: 'All workers undergo verification to ensure safety and reliability. Check ratings, reviews, and work history before hiring.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: 'Real-Time Updates',
      description: 'Get instant notifications when workers apply, accept jobs, or complete tasks. Stay informed every step of the way.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      title: 'Location-Based Matching',
      description: 'Find workers near you or browse jobs in your area. Filter by distance to save time and transportation costs.',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: <Star className="h-10 w-10" />,
      title: 'Rating System',
      description: 'Build your reputation with 5-star reviews. Clients and workers can rate each other to maintain quality standards.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: 'Smart Notifications',
      description: 'Never miss an opportunity. Get alerts for new jobs, applications, messages, and payment confirmations.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: 'Secure Payments',
      description: 'Transparent pricing with secure payment processing. Pay only when work is completed to your satisfaction.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: 'Multiple Categories',
      description: 'From painting to plumbing, carpentry to cleaning. Find workers for any task across 20+ service categories.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: 'Performance Analytics',
      description: 'Track your job history, earnings, and ratings. Workers can showcase their growth and expertise over time.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: 'In-App Messaging',
      description: 'Communicate directly with clients or workers. Discuss job details, negotiate terms, and coordinate schedules.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: 'Job Management',
      description: 'Easily manage multiple jobs at once. Track applications, monitor progress, and update job statuses in real-time.',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: 'Urgent Job Alerts',
      description: 'Mark jobs as urgent to get faster responses. Workers receive priority notifications for time-sensitive tasks.',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'Achievement Badges',
      description: 'Earn badges for completing milestones. Top-rated workers get featured placement and increased visibility.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Everyone</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ByDay is packed with features designed to make finding work or hiring workers seamless, secure, and efficient.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className={`${feature.bgColor} ${feature.color} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Ghana, Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ByDay is designed specifically for the Ghanaian market, understanding local needs and work culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Active Workers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Service Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">For Clients</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Post Jobs in Minutes</h3>
                    <p className="text-muted-foreground">Quick and easy job posting with detailed descriptions and requirements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Choose the Best Worker</h3>
                    <p className="text-muted-foreground">Review multiple applications and select based on ratings, experience, and price.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Track Progress</h3>
                    <p className="text-muted-foreground">Monitor job status from application to completion with real-time updates.</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-8" onClick={() => navigate('/auth')}>
                Start Hiring
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 lg:p-12">
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Client Dashboard</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    View all posted jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Manage applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Track active jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Rate completed work
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Workers Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 lg:p-12">
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Worker Dashboard</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Browse available jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Submit applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Track earnings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Build your reputation
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">For Workers</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Find Jobs Near You</h3>
                    <p className="text-muted-foreground">Filter jobs by location, category, and pay rate to find the perfect match.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Build Your Profile</h3>
                    <p className="text-muted-foreground">Showcase your skills, experience, and earn ratings to attract more clients.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Paid Fairly</h3>
                    <p className="text-muted-foreground">Set your rates and get paid promptly for completed work.</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-8" onClick={() => navigate('/auth')}>
                Start Working
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Future of Daily Work</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join ByDay today and discover why we're Ghana's #1 platform for connecting clients and workers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => navigate('/how-it-works')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
