
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-background to-background/80" />
      
      {/* Animated shapes */}
      <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl animate-float animation-delay-200" />
      <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl animate-float animation-delay-500" />
      <div className="absolute top-[30%] right-[20%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl animate-float animation-delay-300" />
      
      {/* Grid pattern (subtle) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMSIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zNiAxOGgtMXYyNGgxYzEuMTA1IDAgMi0uODk1IDItMlYyMGMwLTEuMTA1LS44OTUtMi0yLTJ6TTIyIDE4aC0xdjI0aDFjMS4xMDUgMCAyLS44OTUgMi0yVjIwYzAtMS4xMDUtLjg5NS0yLTItMnpNMTggMzZ2MWgyNHYtMWMwLTEuMTA1LS44OTUtMi0yLTJIMjBjLTEuMTA1IDAtMiAuODk1LTIgMnpNMTggMjJ2MWgyNHYtMWMwLTEuMTA1LS44OTUtMi0yLTJIMjBjLTEuMTA1IDAtMiAuODk1LTIgMnoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiLz48L2c+PC9zdmc+')] opacity-10" />
    </div>
  );
};

export default AnimatedBackground;
