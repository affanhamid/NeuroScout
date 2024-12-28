import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
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
  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
  
      <GameIntroduction gameInfo={gameInfo} />

      <button
        className="mb-5 rounded-full px-4 py-4 bg-green-700 hover:bg-green-600 active:bg-green-600 text-white"
        onClick={onStart}
      >
        Start Game
      </button>
      <Carousel instructions={gameInfo.instructions} />
      <button
        onClick={skipPractice}
        className="mt-10 text-3xl rounded-full bg-blue-500"
      >
        Skip Practice
      </button>
    </div>
  );
};

export default InstructionDialog;

