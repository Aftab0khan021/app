import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const ErrorMessage = ({ error, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 ${className}`}>
      <div className="text-red-500 mb-4">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
        {error || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;