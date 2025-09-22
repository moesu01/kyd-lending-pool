// components/TopBlurSection.tsx
import { useState, useEffect } from 'react';

export const TopBlurSection = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const targetNumber = 367;

  useEffect(() => {
    const duration = 2000; // 2 seconds total
    const steps = 50; // Number of steps
    const stepDuration = duration / steps;
    const increment = targetNumber / steps;

    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const newNumber = Math.min(Math.floor(increment * currentStep), targetNumber);
      setCurrentNumber(newNumber);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCurrentNumber(targetNumber); // Ensure we end exactly at target
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className="
        fixed 
        h-[100px]
        top-[-20px]
        left-0 
        right-0 
        z-[80] 
        before:content-[''] 
        before:absolute 
        before:top-0 
        before:-left-2 
        before:-right-2 
        before:rounded-full 
        before:-bottom-0 
                  standalone:before:-top-16 

    before:bg-gradient-to-b 
          before:from-black/100 
          before:via-background/90 
          before:to-transparent 
          before:blur-md 
          before:backdrop-blur-sm 
          before:saturate-125
          before:backdrop-contrast-120
          "
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-4 pt-10">
        <p className="font-geist-mono text-white text-sm font-light tracking-wide">
        <span className="inline-block font-bold">
            {currentNumber.toString().padStart(3, '0')} LIVE EVENTS
          </span> → $KYD → LENDING POOL
         
        </p>
      </div>
    </div>
  );
};
