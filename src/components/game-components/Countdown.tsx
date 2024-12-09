import React, { useState, useEffect } from "react";

const Countdown = ({ onCountdownEnd }: { onCountdownEnd: () => void }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onCountdownEnd(), 900);
      return () => clearTimeout(timer);
    }
  }, [count, onCountdownEnd]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center h-screen w-screen bg-game-background">
      <h1 className="text-white text-9xl font-bold">
        {count > 0 ? count : "Start!"}
      </h1>
    </div>
  );
};

export default Countdown;
