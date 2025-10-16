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
import { Star } from 'lucide-react';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReviewData) => void;
  workerName?: string;
  jobTitle: string;
  loading?: boolean;
}

export interface ReviewData {
  rating: number;
  review: string;
}

export default function ReviewDialog({
  open,
  onOpenChange,
  onSubmit,
  workerName,
  jobTitle,
  loading = false,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, review });
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setReview('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Rate & Review Worker</DialogTitle>
          <DialogDescription className="text-base">
            Share your experience with <span className="font-semibold">{workerName || 'the worker'}</span> for{' '}
            <span className="font-semibold">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <Label className="text-base">Your Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-lg font-semibold">
                  {rating === 1 && '⭐ Poor'}
                  {rating === 2 && '⭐⭐ Fair'}
                  {rating === 3 && '⭐⭐⭐ Good'}
                  {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                  {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                </span>
              )}
            </div>
            {rating === 0 && (
              <p className="text-sm text-muted-foreground">
                Click on the stars to rate (1-5 stars)
              </p>
            )}
          </div>

          {/* Review Section */}
          <div className="space-y-3">
            <Label htmlFor="review" className="text-base">
              Your Review (Optional)
            </Label>
            <Textarea
              id="review"
              placeholder="Tell others about your experience with this worker. Was the work completed on time? Was the quality good? Would you hire them again?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Your review helps other clients make informed decisions
            </p>
          </div>

          {/* Rating Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Rating Guidelines
            </p>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• <strong>5 stars:</strong> Exceptional work, exceeded expectations</li>
              <li>• <strong>4 stars:</strong> Great work, met expectations</li>
              <li>• <strong>3 stars:</strong> Good work, minor issues</li>
              <li>• <strong>2 stars:</strong> Below expectations, several issues</li>
              <li>• <strong>1 star:</strong> Poor work, did not meet requirements</li>
            </ul>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || rating === 0}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
