"use client";
import React, { useState, useEffect } from "react";

// Game components
import {
  TNTGame,
  TNTStroboscopicGame,
  TNTFlashGame,
} from "@/components/components/TNT";
import {
  formFields,
  tnt_flash_instructions_tsx,
  tnt_instructions_tsx,
  tnt_strobe_instructions_tsx,
} from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";

const gamesOrder = ["TNT", "TNTStroboscopic", "TNTFlash"];

const GamePage = () => {
  const [gameCounts, setGameCounts] = useState({
    TNT: 0,
    TNTStroboscopic: 0,
    TNTFlash: 0,
  });
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [totalRounds, setTotalRounds] = useState(0);

  useEffect(() => {
    if (totalRounds < 10) {
      const gameIndex = totalRounds % gamesOrder.length;
      const game = gamesOrder[gameIndex];
      setCurrentGame(game);

      // Update counts for each game and the total rounds
      setGameCounts((prevCounts) => ({
        ...prevCounts,
        [game]: prevCounts[game as keyof typeof prevCounts] + 1,
      }));
      setTotalRounds((prevRounds) => prevRounds + 1);
    }
  }, [totalRounds]);

  const renderGame = () => {
    switch (currentGame) {
      case "TNT":
        return (
          <TNTGame
            instructions={tnt_instructions_tsx}
            formFields={formFields}
            calculateScores={TNTCalculateScore}
          />
        );
      case "TNTStroboscopic":
        return (
          <TNTStroboscopicGame
            instructions={tnt_strobe_instructions_tsx}
            formFields={formFields}
            calculateScores={TNTCalculateScore}
          />
        );
      case "TNTFlash":
        return (
          <TNTFlashGame
            instructions={tnt_flash_instructions_tsx}
            formFields={formFields}
            calculateScores={TNTCalculateScore}
          />
        );
      default:
        return <div>Loading game...</div>;
    }
  };

  return (
    <div>
      <h1>Game Sequence Page</h1>
      <p>Total Rounds Played: {totalRounds}</p>
      <p>Game Counts: {JSON.stringify(gameCounts)}</p>
      {totalRounds < 10 ? renderGame() : <div>Game sequence complete!</div>}
    </div>
  );
};

export default GamePage;
