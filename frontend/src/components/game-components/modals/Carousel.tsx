"use client";

import { useState } from "react";
import InstructionsModal from "./InstructionsModal";

export type Instruction = {
  step: number;
  image: string;
};

export type Instructions = Instruction[];

const Carousel = ({ instructions }: { instructions: Instructions }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div>
      {/* Read Instructions Button */}
      <button
        className="bg-slate-600 hover:bg-slate-700 game-button"
        onClick={() => setShowInstructions(true)}
        aria-label="Read Instructions"
      >
        Instructions
      </button>

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal
          instructions={instructions}
          onClose={() => setShowInstructions(false)}
        />
      )}
    </div>
  );
};

export default Carousel;