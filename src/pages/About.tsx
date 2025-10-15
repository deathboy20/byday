import { Users, Target, Heart, Shield } from "lucide-react";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About ByDay
              </h1>
              <p className="text-xl text-muted-foreground">
                Digitizing Ghana's "by-day" economy with transparency, convenience, and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                ByDay is a Ghana-based digital platform that connects daily job seekers ("workers") 
                with individuals or small businesses ("clients") looking for short-term help. We're 
                building a trusted marketplace where skilled workers can find opportunities and clients 
                can access reliable help when they need it.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform brings transparency and convenience to the informal job market, making it 
                easier for both workers and clients to connect, communicate, and complete jobs safely 
                and efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-muted-foreground">
                  We prioritize the needs of Ghana's workforce and local businesses.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                <p className="text-muted-foreground">
                  Building a secure platform with verified profiles and transparent reviews.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  Clear pricing, honest reviews, and open communication for everyone.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Made in Ghana</h3>
                <p className="text-muted-foreground">
                  Built by Ghanaians, for Ghanaians, with love and dedication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  The "by-day" work culture is deeply rooted in Ghana's economy. Every day, thousands 
                  of skilled workers — painters, plumbers, electricians, cleaners, and more — seek 
                  opportunities to earn a living. Meanwhile, homeowners and businesses struggle to find 
                  reliable help when they need it.
                </p>
                <p>
                  ByDay was created to bridge this gap. We saw an opportunity to bring the informal 
                  job market online, making it easier for workers to showcase their skills and for 
                  clients to find trusted help. Our platform provides the tools needed for seamless 
                  job posting, application, communication, and payment.
                </p>
                <p>
                  Starting as a web application optimized for both mobile and desktop, we're committed 
                  to growing with our community and continuously improving the experience for everyone 
                  involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the ByDay Community</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking for work or need help, we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/how-it-works"
                className="bg-primary-foreground/10 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
