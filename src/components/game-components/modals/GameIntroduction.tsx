import React from "react";
import { GameType } from "@/types";

const GameIntroduction = ({ gameInfo }: { gameInfo: GameType }) => {
  return (
    <div className="text-white flex flex-col gap-8 items-center">
      <h1 className="text-6xl font-bold text-white mb-10">{gameInfo.name}</h1>
      <h2 className="text-2xl max-w-3xl text-center text-white">
        {gameInfo.description}
      </h2>
      <h2 className="text-2xl max-w-3xl text-center text-white mb-16">
        First, you will complete {gameInfo.parameters[0].data.practiceTrials}{" "}
        practice trials (not scored), followed by{" "}
        {gameInfo.parameters[0].data.trials} main trials.
      </h2>
    </div>
  );
};

export default GameIntroduction;
