import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: October 15, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome to ByDay. By accessing or using our platform, you agree to be bound by these 
                    Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our 
                    services.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you and ByDay. We reserve 
                    the right to modify these Terms at any time, and your continued use of the platform 
                    after changes are posted constitutes acceptance of the modified Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    To use ByDay, you must:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Be at least 18 years of age</li>
                    <li>Have the legal capacity to enter into binding contracts</li>
                    <li>Not be prohibited from using our services under applicable laws</li>
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Account Registration</h4>
                    <p>
                      You must create an account to use certain features of ByDay. You agree to provide 
                      accurate, current, and complete information during registration and to update such 
                      information to keep it accurate, current, and complete.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Account Security</h4>
                    <p>
                      You are responsible for maintaining the confidentiality of your account credentials 
                      and for all activities that occur under your account. You agree to notify us immediately 
                      of any unauthorized use of your account.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Account Termination</h4>
                    <p>
                      We reserve the right to suspend or terminate your account at any time for violations 
                      of these Terms or for any other reason at our sole discretion.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. User Roles and Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Workers</h4>
                    <p>As a worker, you agree to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Provide accurate information about your skills and experience</li>
                      <li>Complete jobs professionally and to the best of your ability</li>
                      <li>Communicate clearly and promptly with clients</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Maintain appropriate licenses and certifications for your work</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Clients</h4>
                    <p>As a client, you agree to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Provide accurate job descriptions and requirements</li>
                      <li>Pay workers fairly and on time for completed work</li>
                      <li>Treat workers with respect and professionalism</li>
                      <li>Provide a safe working environment</li>
                      <li>Communicate clearly about job expectations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Job Postings and Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Clients may post jobs on the platform, and workers may apply to those jobs. ByDay 
                    serves as a marketplace to facilitate these connections but is not a party to any 
                    agreement between clients and workers.
                  </p>
                  <p>
                    Job postings must:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Be accurate and not misleading</li>
                    <li>Comply with all applicable employment laws</li>
                    <li>Not contain discriminatory content</li>
                    <li>Not violate any third-party rights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Payments and Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Payment terms are agreed upon directly between clients and workers. ByDay may facilitate 
                    payments through integrated payment providers. Any fees charged by ByDay will be clearly 
                    disclosed before transactions.
                  </p>
                  <p>
                    Workers are responsible for reporting and paying all applicable taxes on income earned 
                    through the platform. ByDay does not withhold taxes on behalf of workers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Reviews and Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Users may leave reviews and ratings for each other after job completion. Reviews must:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Be honest and based on actual experiences</li>
                    <li>Not contain offensive, defamatory, or discriminatory content</li>
                    <li>Not violate any person's privacy or rights</li>
                    <li>Not be used to manipulate ratings or rankings</li>
                  </ul>
                  <p className="mt-4">
                    We reserve the right to remove reviews that violate these guidelines.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Prohibited Conduct</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use the platform for any illegal purpose</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Post false, misleading, or fraudulent content</li>
                    <li>Attempt to circumvent platform fees or payments</li>
                    <li>Use automated systems to access the platform without permission</li>
                    <li>Interfere with the operation of the platform</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    All content on the ByDay platform, including text, graphics, logos, and software, is 
                    the property of ByDay or its licensors and is protected by copyright and other 
                    intellectual property laws.
                  </p>
                  <p>
                    You retain ownership of content you post on the platform but grant ByDay a license to 
                    use, display, and distribute such content as necessary to provide our services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Disclaimers and Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    ByDay provides the platform "as is" without warranties of any kind. We do not guarantee 
                    the quality, safety, or legality of jobs posted, the truth or accuracy of user content, 
                    or the ability of users to perform services.
                  </p>
                  <p>
                    To the fullest extent permitted by law, ByDay shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages arising from your use of the 
                    platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Indemnification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    You agree to indemnify and hold harmless ByDay and its officers, directors, employees, 
                    and agents from any claims, damages, losses, liabilities, and expenses arising from 
                    your use of the platform or violation of these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Any disputes arising from these Terms or your use of the platform shall be resolved 
                    through binding arbitration in accordance with the laws of Ghana. You waive any right 
                    to participate in class action lawsuits.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>13. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of Ghana, 
                    without regard to its conflict of law provisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>14. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <div className="mt-4">
                    <p><strong className="text-foreground">Email:</strong> legal@byday.gh</p>
                    <p><strong className="text-foreground">Phone:</strong> +233 123 456 789</p>
                    <p><strong className="text-foreground">Address:</strong> 123 Independence Avenue, Accra, Ghana</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
