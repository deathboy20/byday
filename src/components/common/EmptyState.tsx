import { FC, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  children,
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
};

export default EmptyState;
