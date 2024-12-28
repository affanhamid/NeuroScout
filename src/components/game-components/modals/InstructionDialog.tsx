import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import Carousel from "./Carousel";
import GameIntroduction from "./GameIntroduction";
import { GameType } from "@/types";

const HomeButton = () => {
  return (
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
  );
};
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
      <HomeButton />
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

