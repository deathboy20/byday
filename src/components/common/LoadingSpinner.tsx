import { FC } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-t-2 border-b-2',
  xl: 'h-16 w-16 border-t-2 border-b-2',
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  fullScreen = false,
}) => {
  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-primary',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
