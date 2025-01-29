import React, { useState, useEffect } from 'react';

const OrientationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setShowPrompt(window.innerHeight > window.innerWidth);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!showPrompt) return null;

  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="flex justify-center mb-8">
          <div className="animate-[spin_3s_ease-in-out_infinite] text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-24 h-24 rotate-90"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-white text-2xl font-bold mb-4">
          Please Rotate Your Device
        </h2>
        <p className="text-gray-300 text-lg">
          This game works best in landscape mode
        </p>
      </div>
    </div>
  );
};

export default OrientationPrompt;