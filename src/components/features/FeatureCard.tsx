
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  iconClassName,
}) => {
  return (
    <div className={cn(
      "group relative p-6 rounded-xl border overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-soft",
      className
    )}>
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className={cn(
        "h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary/20",
        iconClassName
      )}>
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-medium mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-muted-foreground relative z-10">{description}</p>
    </div>
  );
};

export default FeatureCard;
