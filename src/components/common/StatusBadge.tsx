import { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { JobStatus, ApplicationStatus } from '@/types/database';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: JobStatus | ApplicationStatus;
  className?: string;
}

const jobStatusConfig: Record<JobStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
  open: {
    label: 'Open',
    variant: 'default',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  in_progress: {
    label: 'In Progress',
    variant: 'secondary',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  completed: {
    label: 'Completed',
    variant: 'outline',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

const applicationStatusConfig: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
  pending: {
    label: 'Pending',
    variant: 'secondary',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  },
  accepted: {
    label: 'Accepted',
    variant: 'default',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  rejected: {
    label: 'Rejected',
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status, className }) => {
  const config = {
    ...jobStatusConfig,
    ...applicationStatusConfig,
  }[status];

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {status}
      </Badge>
    );
  }

  return (
    <Badge
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
