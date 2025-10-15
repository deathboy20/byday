import { Check, Zap, Star, Crown } from "lucide-react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose the plan that works best for you. No hidden fees, no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">GHS 0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Post up to 3 jobs per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Apply to unlimited jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Basic profile features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Standard support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>5% platform fee on completed jobs</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative border-primary shadow-lg scale-105">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>For active users</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">GHS 49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Post unlimited jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Priority job listing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Enhanced profile with portfolio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>3% platform fee on completed jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Verified badge</span>
                    </li>
                  </ul>
                  <Button className="w-full">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>

              {/* Business Plan */}
              <Card className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Business</CardTitle>
                  <CardDescription>For companies & agencies</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">GHS 199</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Team accounts (up to 5 users)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Bulk job posting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>2% platform fee on completed jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Custom branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>API access</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Feature Comparison</h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Free</th>
                    <th className="text-center py-4 px-4">Pro</th>
                    <th className="text-center py-4 px-4">Business</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Job Postings</td>
                    <td className="text-center py-4 px-4">3/month</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Job Applications</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Platform Fee</td>
                    <td className="text-center py-4 px-4">5%</td>
                    <td className="text-center py-4 px-4">3%</td>
                    <td className="text-center py-4 px-4">2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Priority Listing</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Verified Badge</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Analytics</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4">Advanced</td>
                    <td className="text-center py-4 px-4">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Team Accounts</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">Up to 5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">API Access</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How does the platform fee work?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>
                      The platform fee is a small percentage charged on completed jobs to maintain and 
                      improve our services. It's automatically deducted from payments processed through 
                      the platform. The fee varies by plan: 5% for Free, 3% for Pro, and 2% for Business.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>
                      Yes! You can cancel your subscription at any time. Your plan will remain active 
                      until the end of your current billing period, and you won't be charged again.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>
                      We offer a 7-day money-back guarantee for Pro and Business plans. If you're not 
                      satisfied within the first 7 days, contact us for a full refund.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>
                      Absolutely! You can upgrade or downgrade your plan at any time from your account 
                      settings. Changes take effect immediately, and we'll prorate any charges.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>
                      We accept mobile money (MTN, Vodafone, AirtelTigo), credit/debit cards (Visa, 
                      Mastercard), and bank transfers through our secure payment partner, Paystack.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of workers and clients on ByDay today.
            </p>
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
