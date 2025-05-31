import { LucideIcon } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
        <Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
