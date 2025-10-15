import { FC } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
  className?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  retry,
  className,
}) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {retry && (
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="mt-4"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
