import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline"; // Importing the home icon from Heroicons

type Instruction = {
  step: number;
  image: string;
};

export type Instructions = Instruction[];

const Carousel = ({
  instructions,
  step
}: {
  instructions: Instructions;
  step: number;
}) => {
  return (
    <div>
      {instructions.length !== 0 && (
        <div>
          <Image
            src={instructions[step].image}
            alt={`Step ${step}`}
            className="w-auto h-auto"
            width={700}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

const InstructionDialog = ({
  instructions,
  onStart
}: {
  instructions: Instructions;
  onStart: () => void;
}) => {
  const [step, setStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClick = (direction: 1 | -1) => {
    const newStep = step + direction;
    if (newStep >= 0 && newStep <= instructions.length) {
      setStep(newStep);
    }
  };

  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {/* Home Button with Tooltip */}
      <div className="absolute top-5 left-5 flex flex-col items-center group">
        <Link href="/" passHref>
          <button
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
            aria-label="Go to Home"
          >
            <HomeIcon className="text-green-600 h-7 w-7" />
          </button>
        </Link>
        {/* Tooltip */}
        <span className="mt-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
          Exit to Home
        </span>
      </div>

      {showInstructions ? (
        <div className="relative px-60">
          {/* Carousel */}
          <Carousel instructions={instructions} step={step} />

          {/* Navigation Buttons */}
          {step < instructions.length ? (
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
          ) : (
            <div className="text-white flex flex-col gap-5 items-center">
          <button
            className="rounded-full px-5 py-2 bg-green-700 hover:bg-green-600 active:bg-green-600 text-white"
            onClick={onStart}
          >
            Start Game
          </button>
          <button
            className="rounded-full px-5 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white"
            onClick={() => setStep(0)}
          >
            Show Instructions
          </button>
        </div>   
          )}
        </div>
      ) : (
        <div className="text-white flex flex-col gap-5 items-center">
          <button
            className="rounded-full px-5 py-2 bg-green-700 hover:bg-green-600 active:bg-green-600 text-white"
            onClick={onStart}
          >
            Start Game
          </button>
          <button
            className="rounded-full px-5 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white"
            onClick={() => setShowInstructions(true)}
          >
            Read Instructions
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructionDialog;
