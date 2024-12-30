"use client";

import { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
      {/* Read Instructions Button */}
      <button
        className="rounded-full px-6 py-3 bg-slate-700 text-white text-lg font-semibold hover:bg-slate-600 active:bg-slate-800 transition shadow-md"
        onClick={() => setShowInstructions(true)}
        aria-label="Read Instructions"
      >
        Read Instructions
      </button>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="absolute inset-0 bg-game-background flex items-center justify-center">
          <div className="relative w-[80%] max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 flex items-center justify-center bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              aria-label="Close Instructions"
            >
              <XMarkIcon className="text-white h-6 w-6" />
            </button>

            {/* Instruction Image */}
            {instructions.length > 0 && step < instructions.length && (
              <div className="flex flex-col items-center">
                <Image
                  src={instructions[step].image}
                  alt={`Step ${step + 1}`}
                  className="rounded-md shadow-md"
                  width={700}
                  height={400}
                  priority
                />
                <p className="mt-4 text-white text-lg font-medium">
                  Step {step + 1} of {instructions.length}
                </p>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="absolute left-4 right-4 bottom-4 flex justify-between items-center">
              {/* Previous Button */}
              <button
                onClick={() => handleClick(-1)}
                className="text-emerald-500 hover:text-emerald-400 active:text-emerald-600 transition"
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

              {/* Next Button */}
              <button
                onClick={() => handleClick(1)}
                className="text-emerald-500 hover:text-emerald-400 active:text-emerald-600 transition"
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
