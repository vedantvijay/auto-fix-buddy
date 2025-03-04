import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2 bg-background/80 backdrop-blur-md border-b" : "py-4",
        className
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-semibold">AutoPR</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#configuration" className="text-sm font-medium hover:text-primary transition-colors">
            Configuration
          </a>
          <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <Button size="sm" variant="outline" className="gap-2">
            <Github size={16} />
            <span>GitHub</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[57px] p-4 border-b backdrop-blur-md bg-background/80 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-4">
          <a 
            href="#features" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-md" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-md" 
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#configuration" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-md" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Configuration
          </a>
          <a 
            href="#dashboard" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-md" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </a>
          <Button size="sm" variant="outline" className="gap-2 justify-center">
            <Github size={16} />
            <span>GitHub</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
