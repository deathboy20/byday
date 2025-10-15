import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface JobCardProps {
  title: string;
  description: string;
  rate: string;
  location: string;
  postedTime: string;
  clientName: string;
  clientRating: number;
  category: string;
  urgent?: boolean;
}

const JobCard = ({
  title,
  description,
  rate,
  location,
  postedTime,
  clientName,
  clientRating,
  category,
  urgent = false,
}: JobCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleApplyClick = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Navigate to job details or apply directly
      navigate('/jobs');
    }
  };
  return (
    <div className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-border group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            {urgent && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">
                Urgent
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

      {/* Details Grid */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          Posted {postedTime}
        </div>
      </div>

      {/* Client Info */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{clientName}</div>
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-accent text-accent mr-1" />
              <span className="text-xs text-muted-foreground">{clientRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{rate}</div>
          <div className="text-xs text-muted-foreground">per day</div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        onClick={handleApplyClick}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {user ? 'Apply Now' : 'Sign In to Apply'}
      </Button>
    </div>
  );
};

export default JobCard;
