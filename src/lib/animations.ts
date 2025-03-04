
import { useEffect, useState } from 'react';

// Custom hook for revealing elements on scroll
export function useScrollReveal() {
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = document.querySelectorAll('.reveal-on-scroll');
    currentRef.forEach(el => observer.observe(el));
    
    return () => {
      currentRef.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return revealed;
}

// Custom hook to prevent initial animations on page load
export function usePreventAnimationOnLoad() {
  useEffect(() => {
    // Remove the no-animation class after a short delay
    const timer = setTimeout(() => {
      document.body.classList.remove('no-animation');
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
}

// Staggered animation timing based on index
export function getAnimationDelay(index: number): string {
  const delay = index * 100;
  return `${delay}ms`;
}

// Hook to make a smooth transition between pages
export function usePageTransition() {
  const [isExiting, setIsExiting] = useState(false);
  
  const exit = () => {
    setIsExiting(true);
    return new Promise(resolve => setTimeout(resolve, 500));
  };
  
  return { isExiting, exit };
}
