import { useState, useEffect } from 'react';

export const useReadingProgress = (): number => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const { scrollY } = window;
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollPercent = (scrollY / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, Math.round(scrollPercent))));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};
