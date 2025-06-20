
import React, { useEffect, useState } from 'react';

const ScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Linke Seite - Schwebende Sterne */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
        <div className="flex flex-col space-y-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="text-2xl animate-pulse opacity-60"
              style={{
                transform: `translateY(${scrollY * 0.1 * (i + 1)}px)`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      </div>

      {/* Rechte Seite - Galaxie-Partikel */}
      <div className="fixed right-4 top-1/4 z-30 pointer-events-none">
        <div className="flex flex-col space-y-12">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="text-3xl animate-spin-slow opacity-40"
              style={{
                transform: `translateY(${-scrollY * 0.05 * (i + 1)}px) rotate(${scrollY * 0.1}deg)`,
                animationDuration: `${10 + i * 2}s`
              }}
            >
              {['🌌', '💫', '✨', '🌟'][i]}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="w-1 h-32 bg-midnight-700 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-stellar-500 to-stellar-300 transition-all duration-300"
            style={{ 
              height: `${Math.min(100, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
              transform: 'translateY(0)'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ScrollAnimations;
