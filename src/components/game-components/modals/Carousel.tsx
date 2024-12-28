"use client";

import { useState } from "react";
import Image from "next/image";

type Instruction = {
  step: number;
  image: string;
};

export type Instructions = Instruction[];

const Carousel = ({ instructions }: { instructions: Instructions }) => {
  const [step, setStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClick = (direction: 1 | -1) => {
    const newStep = step + direction;
    if (newStep >= 0) {
      setStep(newStep >= instructions.length ? 0 : newStep);
    }
  };

  return (
    <div>
      <button
        className="rounded-full px-4 py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white"
        onClick={() => setShowInstructions(true)}
      >
        Read Instructions
      </button>
      {showInstructions && (
        <div className="absolute top-0 left-0 right-0 bottom-0 px-60 flex justify-center items-center bg-game-background">
          <div className="relative px-60">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setShowInstructions(false)}
                className="flex items-center gap-2 text-green-500 bg-transparent hover:text-green-400 active:text-green-600 text-base"
                aria-label="Back to Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {instructions.length !== 0 && step < instructions.length && (
              <Image
                src={instructions[step].image}
                alt={`Step ${step}`}
                className="w-auto h-auto"
                width={700}
                height={400}
              />
            )}
            <div className="absolute left-0 right-0 top-[50%] transform -translate-y-[50%] flex justify-between">
              <button
                onClick={() => handleClick(-1)}
                className="text-green-500 bg-transparent cursor-pointer hover:text-green-400 active:text-green-600"
                aria-label="Previous Step"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleClick(1)}
                className="text-green-500 bg-transparent cursor-pointer hover:text-green-400 active:text-green-600"
                aria-label="Next Step"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
