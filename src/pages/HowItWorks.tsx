import { CheckCircle, UserPlus, Search, Briefcase, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const clientSteps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: 'Create Your Account',
      description: 'Sign up as a client in just a few clicks. No credit card required to get started.',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Post Your Job',
      description: 'Describe the work you need done, set your budget, location, and timeline.',
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Review Applications',
      description: 'Browse worker profiles, check ratings, and select the best fit for your job.',
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Get Work Done',
      description: 'Coordinate with your chosen worker, track progress, and pay upon completion.',
    },
  ];

  const workerSteps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: 'Sign Up as a Worker',
      description: 'Create your profile, showcase your skills, and set your availability.',
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Browse Available Jobs',
      description: 'Find jobs that match your skills in your area. Filter by category, pay, and urgency.',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Apply & Get Hired',
      description: 'Submit applications with your message. Get notified when clients accept your offer.',
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Complete & Get Paid',
      description: 'Do great work, earn money, and build your reputation with 5-star reviews.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How ByDay Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting skilled workers with clients who need their services. Simple, fast, and trusted.
          </p>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Clients</h2>
            <p className="text-lg text-muted-foreground">
              Find reliable workers for your daily tasks in 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="text-primary mb-4 mt-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < clientSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Post Your First Job
            </Button>
          </div>
        </div>
      </section>

      {/* For Workers Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Workers</h2>
            <p className="text-lg text-muted-foreground">
              Start earning with your skills in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workerSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="text-primary mb-4 mt-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < workerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Start Finding Work
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose ByDay Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ByDay?</h2>
            <p className="text-lg text-muted-foreground">
              Ghana's most trusted platform for daily work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Workers</h3>
              <p className="text-muted-foreground">
                All workers are verified with ratings and reviews from real clients
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Transparent rates with no hidden fees. Pay only for work completed
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Rating system ensures high-quality work and professional service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of clients and workers on ByDay today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
