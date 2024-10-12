import React, { useState, useEffect } from "react";

interface CountdownProps {
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3); // Start countdown from 3

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    } else {
      onComplete(); // Call onComplete when the countdown reaches 0
    }
  }, [count, onComplete]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <h1 className="text-white text-9xl font-bold">
        {count > 0 ? count : "Start!"}
      </h1>
    </div>
  );
};

export default Countdown;
