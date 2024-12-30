import Carousel from "./Carousel";
import GameIntroduction from "./GameIntroduction";
import { GameType } from "@/types";

const InstructionDialog = ({
  gameInfo,
  onStart,
  skipPractice
}: {
  gameInfo: GameType;
  onStart: () => void;
  skipPractice: () => void;
}) => {
  const instructions = gameInfo.instructions || []; // Fallback for instructions

  return (
    <div className="bg-game-background absolute inset-0 flex flex-col items-center justify-center p-8">
      {/* Game Introduction Section */}
      <GameIntroduction gameInfo={gameInfo} />

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-4 mt-8">
        {/* Start Game Button */}
        <button
          className="rounded-full px-6 py-4 bg-[#A259FF] text-white text-xl font-semibold hover:bg-[#8F4BD4] active:bg-[#703DB0] transition shadow-md"
          onClick={onStart}
          aria-label="Start Game Button"
        >
          Start Game
        </button>

        {/* Show Instructions Button */}
        <Carousel instructions={instructions} />

        {/* Skip Practice Button */}
        <button
          onClick={skipPractice}
          className="rounded-full px-6 py-4 bg-[#6B6B6B] text-white text-xl font-semibold hover:bg-[#5A5A5A] active:bg-[#4A4A4A] transition shadow-md"
          aria-label="Skip Practice Button"
        >
          Skip Practice
        </button>
      </div>
    </div>
  );
};

export default InstructionDialog;
