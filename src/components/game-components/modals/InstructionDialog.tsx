import { useState } from "react";
import Image from "next/image";

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
            alt={`${step}`}
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

  const handleClick = (direction: 1 | -1) => {
    const newStep = step + direction;
    if (newStep >= 0 && newStep <= instructions.length) {
      setStep(newStep);
    }
  };
  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {step < instructions.length ? (
        <div className="relative px-60">
          <Carousel instructions={instructions} step={step} />
          <div className="absolute left-0 right-0 top-[50%] transform -translate-y-[50%] flex justify-between">
            <button
              onClick={() => handleClick(-1)}
              className="text-green-500 bg-transparent cursor-pointer hover:text-green-400 active:text-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
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
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
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
      ) : (
        <div className="text-white flex flex-col gap-5 items-center">
          <button className="rounded-full" onClick={onStart}>
            Start Game
          </button>
          <button
            className="bg-gray-700 rounded-full"
            onClick={() => setStep(0)}
          >
            Read Instructions
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructionDialog;
