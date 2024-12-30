import React from "react";
import { GameType } from "@/types";

const GameIntroduction = ({ gameInfo }: { gameInfo: GameType }) => {
  const {
    name = "Game Name",
    description = "Game description goes here.",
    parameters = []
  } = gameInfo;

  // Extract trial data with safe fallback
  const { practiceTrials = 0, trials = 0 } = parameters[0]?.data || {};

  return (
    <div className="text-white flex flex-col gap-8 items-center">
      <h1 className="text-6xl font-bold mb-10" aria-label={`${name} Title`}>
        {name}
      </h1>

      <h2 className="text-2xl max-w-3xl text-center">{description}</h2>

      <h2 className="text-2xl max-w-3xl text-center mb-16">
        First, you will complete {practiceTrials} practice trials (not scored),
        followed by {trials} main trials.
      </h2>
    </div>
  );
};

export default GameIntroduction;
