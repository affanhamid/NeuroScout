import Carousel from "./Carousel";
import GameIntroduction from "./GameIntroduction";
import { GameType } from "@/types";

interface InstructionDialogProps {
  gameInfo: GameType;
  onStart: () => void;
  skipPractice: () => void;
}

const InstructionDialog = ({
  gameInfo,
  onStart,
  skipPractice
}: InstructionDialogProps) => {
  const instructions = gameInfo.instructions || [];

  return (
    <div className="bg-game-background absolute inset-0 flex flex-col items-center justify-center p-8">
      {/* Game Introduction Section */}
      <GameIntroduction gameInfo={gameInfo} />

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-4 mt-16">
        <button
          className="bg-primary hover:bg-primary/80 game-button"
          onClick={onStart}
          aria-label="Start Game Button"
        >
          Start Game
        </button>
        <div className="mt-3 flex gap-5">
          <Carousel instructions={instructions} />
          <button
            onClick={skipPractice}
            className="bg-slate-600 hover:bg-slate-700 game-button"
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