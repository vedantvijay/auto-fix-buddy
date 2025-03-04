
import React from 'react';
import { useScrollReveal } from '@/lib/animations';
import { cn } from "@/lib/utils";
import { CheckCircle2, GitBranch, GitPullRequest, Search, Code, PlayCircle } from "lucide-react";

interface ProcessStepsProps {
  className?: string;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ className }) => {
  const revealed = useScrollReveal();
  
  const steps = [
    {
      title: "Fetch Issues",
      description: "Using Octokit, AutoPR connects to GitHub and fetches open issues from your repository.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Generate Solution",
      description: "OpenAI API analyzes the issue and generates an optimized code solution.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Automated Testing",
      description: "The solution is tested in a secure sandbox environment to verify it works correctly.",
      icon: <PlayCircle className="h-6 w-6" />,
    },
    {
      title: "Create Branch",
      description: "A new Git branch is created to isolate the changes for review.",
      icon: <GitBranch className="h-6 w-6" />,
    },
    {
      title: "Submit PR",
      description: "If tests pass, AutoPR submits a pull request with detailed changes and comments.",
      icon: <GitPullRequest className="h-6 w-6" />,
    },
    {
      title: "Complete",
      description: "Your issue is resolved with minimum effort, ready for final review and approval.",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  return (
    <div className={cn("reveal-on-scroll", className)}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={cn(
              "flex flex-col items-start p-6 rounded-xl border bg-card transition-all duration-300",
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
