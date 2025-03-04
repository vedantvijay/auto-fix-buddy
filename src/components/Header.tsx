
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { configService } from '@/services/config';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    setIsConfigured(configService.isConfigured());
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L17 7V17L12 22L7 17V7L12 2Z" className="fill-primary" />
            <path d="M12 6L15 9V15L12 18L9 15V9L12 6Z" className="fill-background" />
          </svg>
          <span>AutoPR</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/settings" className="text-foreground/70 hover:text-foreground transition-colors">
              Settings
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild>
              <Link to={isConfigured ? "/dashboard" : "/settings"}>
                {isConfigured ? "Dashboard" : "Configure"}
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b z-50 animate-in fade-in slide-in-from-top-5">
          <div className="container py-4">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-accent rounded-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 hover:bg-accent rounded-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/settings" 
                className="px-4 py-2 hover:bg-accent rounded-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <Button 
                className="mt-2" 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = isConfigured ? "/dashboard" : "/settings";
                }}
              >
                {isConfigured ? "Dashboard" : "Configure"}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
