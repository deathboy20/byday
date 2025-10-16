import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ApplicationData) => void;
  jobTitle: string;
  clientName?: string;
  loading?: boolean;
}

export interface ApplicationData {
  message: string;
  phoneNumber: string;
  email: string;
  availableDate: string;
}

export default function ApplicationDialog({
  open,
  onOpenChange,
  onSubmit,
  jobTitle,
  clientName,
  loading = false,
}: ApplicationDialogProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    message: '',
    phoneNumber: '',
    email: '',
    availableDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Job</DialogTitle>
          <DialogDescription className="text-base">
            Send your application to <span className="font-semibold">{clientName || 'the client'}</span> for{' '}
            <span className="font-semibold">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Phone className="h-4 w-4" />
              Contact Information
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Client will contact you on this number
                </p>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For application confirmation
                </p>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div>
            <Label htmlFor="availableDate">Available Start Date *</Label>
            <Input
              id="availableDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.availableDate}
              onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              When can you start this job?
            </p>
          </div>

          {/* Application Message Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="message">Your Message *</Label>
            </div>
            <Textarea
              id="message"
              placeholder="Tell the client why you're the best fit for this job. Include your relevant experience, skills, and any questions you might have..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              required
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 50 characters. Be professional and specific.
            </p>
          </div>

          {/* Information Notice */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  What happens next?
                </p>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                  <li>Your application will be sent to the client</li>
                  <li>You'll receive a confirmation email</li>
                  <li>The client will review and contact you directly</li>
                  <li>You can track your application in your dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || formData.message.length < 50}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
