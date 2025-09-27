import React from 'react';
import { FileX, Search, Inbox } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = FileX, 
  title = 'No data found', 
  description = 'There is no data to display at the moment.',
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="text-gray-400 dark:text-gray-600 mb-4">
        <Icon className="h-16 w-16" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;