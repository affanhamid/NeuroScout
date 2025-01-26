import Carousel from "./Carousel";
import GameIntroduction from "./GameIntroduction";
import { GameType } from "@/types";

const InstructionDialog = ({
  gameInfo,
  onStart,
  skipPractice,
}: {
  gameInfo: GameType;
  onStart: () => void;
  skipPractice: () => void;
}) => {
  const instructions = gameInfo.instructions || []; // Fallback for instructions

  return (
    <div className="bg-game-background absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 py-6 space-y-8">
      {/* Game Introduction Section */}
      <GameIntroduction gameInfo={gameInfo} />

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-4 mt-8 md:mt-16 w-full max-w-md">
        <button
          className="bg-primary hover:bg-primary/80 game-button w-full md:w-auto text-center py-3 px-6 rounded-lg text-lg font-semibold"
          onClick={onStart}
          aria-label="Start Game Button"
        >
          Start Game
        </button>

        <div className="mt-3 flex flex-col md:flex-row items-center gap-4 md:gap-5 w-full">
          <Carousel instructions={instructions} />
          <button
            onClick={skipPractice}
            className="bg-slate-600 hover:bg-slate-700 game-button w-full md:w-auto text-center py-3 px-6 rounded-lg text-lg font-semibold"
            aria-label="Skip Practice Button"
          >
            Skip Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionDialog;
