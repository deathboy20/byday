import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Privacy Policy
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
                  <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome to ByDay ("we," "our," or "us"). We are committed to protecting your 
                    personal information and your right to privacy. This Privacy Policy explains how 
                    we collect, use, disclose, and safeguard your information when you use our platform.
                  </p>
                  <p>
                    By using ByDay, you agree to the collection and use of information in accordance 
                    with this policy. If you do not agree with our policies and practices, please do 
                    not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                    <p>
                      We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Profile information (bio, skills, location, profile picture)</li>
                      <li>Job postings and applications</li>
                      <li>Messages and communications through our platform</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Reviews and ratings</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Automatically Collected Information</h4>
                    <p>
                      When you use our platform, we automatically collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage data (pages visited, time spent, features used)</li>
                      <li>Location data (with your permission)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Connect workers with clients and facilitate job transactions</li>
                    <li>Process payments and prevent fraud</li>
                    <li>Send you notifications about job opportunities, applications, and platform updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Analyze usage patterns to improve user experience</li>
                    <li>Comply with legal obligations and enforce our terms</li>
                    <li>Protect the safety and security of our users</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>We may share your information in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">With Other Users:</strong> Your profile information, 
                      ratings, and reviews are visible to other users to facilitate connections.
                    </li>
                    <li>
                      <strong className="text-foreground">Service Providers:</strong> We share information with 
                      third-party service providers who perform services on our behalf (payment processing, 
                      hosting, analytics).
                    </li>
                    <li>
                      <strong className="text-foreground">Legal Requirements:</strong> We may disclose information 
                      if required by law or in response to valid legal requests.
                    </li>
                    <li>
                      <strong className="text-foreground">Business Transfers:</strong> In the event of a merger, 
                      acquisition, or sale of assets, your information may be transferred.
                    </li>
                    <li>
                      <strong className="text-foreground">With Your Consent:</strong> We may share information 
                      for any other purpose with your explicit consent.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information. However, no method of transmission over the internet or electronic 
                    storage is 100% secure. While we strive to protect your information, we cannot guarantee 
                    its absolute security.
                  </p>
                  <p>
                    Our security measures include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Secure payment processing through certified providers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">Access and Update:</strong> You can access and update 
                      your profile information at any time through your account settings.
                    </li>
                    <li>
                      <strong className="text-foreground">Delete:</strong> You can request deletion of your 
                      account and personal information by contacting us.
                    </li>
                    <li>
                      <strong className="text-foreground">Opt-Out:</strong> You can opt out of marketing 
                      communications by following the unsubscribe instructions in emails.
                    </li>
                    <li>
                      <strong className="text-foreground">Data Portability:</strong> You can request a copy 
                      of your personal information in a portable format.
                    </li>
                    <li>
                      <strong className="text-foreground">Object to Processing:</strong> You can object to 
                      certain types of data processing.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We retain your personal information for as long as necessary to provide our services, 
                    comply with legal obligations, resolve disputes, and enforce our agreements. When you 
                    delete your account, we will delete or anonymize your personal information, except where 
                    we are required to retain it for legal or regulatory purposes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Our services are not intended for individuals under the age of 18. We do not knowingly 
                    collect personal information from children. If you believe we have collected information 
                    from a child, please contact us immediately.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="mt-4">
                    <p><strong className="text-foreground">Email:</strong> privacy@byday.gh</p>
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

export default Privacy;
