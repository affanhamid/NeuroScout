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
      <h1 aria-label={`${name} Title`}>{name}</h1>
      <h2 className="text-center max-w-3xl flex flex-col gap-10">
        <span>{description}</span>
        <span>
          You will first complete {practiceTrials} practice trials (not scored),
          followed by {trials} main trials.
        </span>
      </h2>
    </div>
  );
};

export default GameIntroduction;
