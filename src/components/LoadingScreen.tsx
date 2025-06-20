
import React from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative">
        {/* Animiertes Auto */}
        <div className="text-6xl animate-drive">
          🚗
        </div>
        
        {/* Goldene Glitzer-Partikel */}
        <div className="absolute -top-4 -left-4">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-glitter"></div>
        </div>
        <div className="absolute -top-2 right-0">
          <div className="w-1 h-1 bg-gold-300 rounded-full animate-glitter" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute bottom-0 -left-2">
          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-glitter" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute -bottom-4 right-2">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-glitter" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
