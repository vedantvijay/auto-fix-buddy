
import React from 'react';
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Clock, GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IssueCardProps {
  title: string;
  number: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  repository: string;
  date: string;
  className?: string;
}

const IssueCard: React.FC<IssueCardProps> = ({
  title,
  number,
  status,
  repository,
  date,
  className,
}) => {
  const statusConfig = {
    pending: {
      icon: <Clock className="h-4 w-4" />,
      text: "Pending",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
    processing: {
      icon: <Clock className="h-4 w-4 animate-pulse" />,
      text: "Processing",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    completed: {
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Completed",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    failed: {
      icon: <AlertCircle className="h-4 w-4" />,
      text: "Failed",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    },
  };

  return (
    <div className={cn(
      "group flex flex-col p-5 rounded-xl border bg-card transition-all duration-300 hover:shadow-soft",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground mr-2">{repository} #{number}</span>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-medium flex items-center gap-1 py-0.5 border-0",
                statusConfig[status].color
              )}
            >
              {statusConfig[status].icon}
              {statusConfig[status].text}
            </Badge>
          </div>
          <h3 className="font-medium line-clamp-2">{title}</h3>
        </div>
      </div>
      
      <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{date}</span>
        {status === 'completed' && (
          <div className="flex items-center gap-1 text-primary hover:underline cursor-pointer">
            <GitPullRequest className="h-3.5 w-3.5" />
            <span>View PR</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
