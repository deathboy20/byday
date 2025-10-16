import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Calendar,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  Star,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface JobManagementCardProps {
  job: any;
  onEdit: (job: any) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, status: string) => void;
  onReview: (job: any) => void;
}

export default function JobManagementCard({
  job,
  onEdit,
  onDelete,
  onStatusChange,
  onReview,
}: JobManagementCardProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const getLocationString = (location: any): string => {
    if (typeof location === 'string') {
      try {
        const parsed = JSON.parse(location);
        return parsed.address || location;
      } catch {
        return location;
      }
    }
    return location?.address || 'Location not specified';
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; icon: any }> = {
      open: { label: 'Open', variant: 'default', icon: Clock },
      in_progress: { label: 'In Progress', variant: 'secondary', icon: Play },
      completed: { label: 'Completed', variant: 'outline', icon: CheckCircle },
      cancelled: { label: 'Cancelled', variant: 'destructive', icon: XCircle },
    };
    const info = statusMap[status] || { label: status, variant: 'outline', icon: Clock };
    const Icon = info.icon;
    
    return (
      <Badge variant={info.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {info.label}
      </Badge>
    );
  };

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = () => {
    onStatusChange(job.id, newStatus);
    setShowStatusDialog(false);
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2 mb-2">{job.title}</CardTitle>
              {getStatusBadge(job.status)}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => navigate(`/jobs/${job.id}`)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                
                {job.status === 'open' && (
                  <DropdownMenuItem onClick={() => onEdit(job)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Job
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                
                {job.status === 'open' && (
                  <DropdownMenuItem onClick={() => handleStatusChange('in_progress')}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Job
                  </DropdownMenuItem>
                )}
                
                {(job.status === 'open' || job.status === 'in_progress') && (
                  <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Completed
                  </DropdownMenuItem>
                )}
                
                {job.status === 'completed' && (
                  <DropdownMenuItem onClick={() => onReview(job)}>
                    <Star className="h-4 w-4 mr-2" />
                    Leave Review
                  </DropdownMenuItem>
                )}
                
                {job.status !== 'cancelled' && job.status !== 'completed' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange('cancelled')}
                      className="text-destructive focus:text-destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Job
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{getLocationString(job.location)}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-green-600" />
              <span className="font-semibold">GHS {job.rate_per_day}</span>
            </div>
            <Badge variant="outline">{job.category}</Badge>
          </div>

          {job.end_date && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              End: {new Date(job.end_date).toLocaleDateString()}
            </div>
          )}

          <div className="flex items-center text-xs text-muted-foreground pt-2 border-t">
            <Clock className="h-3 w-3 mr-1" />
            Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            {job.status === 'open' && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => handleStatusChange('in_progress')}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            
            {(job.status === 'open' || job.status === 'in_progress') && (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => handleStatusChange('completed')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
            
            {job.status === 'completed' && (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onReview(job)}
              >
                <Star className="h-4 w-4 mr-1" />
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{job.title}"? This action cannot be undone and will permanently delete the job posting and all associated applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete(job.id);
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Job Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status of "{job.title}" to{' '}
              <strong>{getStatusLabel(newStatus)}</strong>?
              {newStatus === 'completed' && (
                <span className="block mt-2 text-sm">
                  After marking as completed, you'll be able to leave a review for the worker.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
