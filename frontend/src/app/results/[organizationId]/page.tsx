import DataProvider from "@/components/ui/DataProvider";
import { GameObservationType, OrganizationType, PlayerType } from "@/types";
import React from "react";

type ScoreEntry = {
  accuracy: boolean;
  reactionTime: number;
};

type ArrowData = {
  scores: ScoreEntry[];
};

const arrowAnalysis = (data: ArrowData): number => {
  const { scores } = data;
  if (!scores || scores.length === 0) return 0;

  const total = scores.length;
  const correctCount = scores.filter((s) => s.accuracy).length;
  const avgReactionTime =
    scores.reduce((sum, s) => sum + s.reactionTime, 0) / total;

  const accuracyRatio = correctCount / total;
  const score = accuracyRatio * (1000 / avgReactionTime);

  return parseFloat(score.toFixed(3));
};

type GridGameTrial = {
  polygons: Record<string, any>;
  duplicatePolygons: Record<string, any>;
  yellowPoints: any[];
};

const gridAnalysis = (data: GridGameTrial[]): number => {
  if (!Array.isArray(data) || data.length === 0) return 0;

  let totalCorrect = 0;
  let totalDuplicates = 0;
  let totalExpected = 0;

  for (const trial of data) {
    totalCorrect += Object.keys(trial.polygons || {}).length;
    totalDuplicates += Object.keys(trial.duplicatePolygons || {}).length;
    totalExpected += trial.yellowPoints?.length || 0;
  }

  if (totalExpected === 0) return 0;

  const rawScore = (totalCorrect - totalDuplicates) / totalExpected;
  return parseFloat(rawScore.toFixed(3));
};

type GlowData = {
  scores: number[];
  reactionTimes: { clickTimes: number[] }[];
  reactionTimesGlow: number[][];
};

const glowAnalysis = (data: GlowData): number => {
  const { scores, reactionTimes, reactionTimesGlow } = data;

  if (
    !Array.isArray(scores) ||
    !Array.isArray(reactionTimes) ||
    !Array.isArray(reactionTimesGlow) ||
    scores.length === 0
  )
    return 0;

  const maxScore = 4;
  const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  const accuracyFactor = avgScore / maxScore;

  const allGlowRTs = reactionTimesGlow.flat();
  const avgGlowRT =
    allGlowRTs.reduce((sum, rt) => sum + rt, 0) / allGlowRTs.length;

  const reactionSpeedFactor = 1 / (1 + avgGlowRT / 1000);
  const rawScore = accuracyFactor * reactionSpeedFactor;

  return parseFloat(Math.max(0, Math.min(1, rawScore)).toFixed(3));
};

const gameAnalysis = (gameId: String, data: Object): number => {
  switch (gameId) {
    case "67543176ab5e87f35d194611":
      return arrowAnalysis(data as ArrowData);
    case "6754316bab5e87f35d194610":
      return gridAnalysis(data as GridGameTrial[]);
    case "67543160ab5e87f35d19460f":
      return glowAnalysis(data as GlowData);
    default:
      return 0;
  }
};

async function page({
  params
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <DataProvider<OrganizationType>
      endpoint={`organizations/${resolvedParams.organizationId}`}
    >
      {(organization) => (
        <div className="px-10">
          <h1 className="py-10">{organization.name}</h1>
          <DataProvider<PlayerType[]>
            endpoint={`players/organization/${resolvedParams.organizationId}`}
          >
            {(players) => {
              // Fetch and process each player's game observations
              const playerPromises = players.map(async (player) => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/players/game-observations-by-player-id/${player._id}`,
                  { cache: "no-store" }
                );
                const {
                  data: gameObservations
                }: { data: GameObservationType[] } = await res.json();

                if (gameObservations.length !== 3) return null;

                const scores = gameObservations.map((obs) =>
                  gameAnalysis(obs.gameId, obs.data)
                );
                const total = scores.reduce((sum, s) => sum + s, 0);

                return { player, scores, total };
              });

              return Promise.all(playerPromises).then((results) => {
                const validResults = results.filter((r) => r !== null) as {
                  player: PlayerType;
                  scores: number[];
                  total: number;
                }[];

                const ranked = validResults.sort((a, b) => b.total - a.total);

                return (
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 text-left text-black">
                        <th className="border px-4 py-2">Rank</th>
                        <th className="border px-4 py-2">Player</th>
                        <th className="border px-4 py-2">Glow Game</th>
                        <th className="border px-4 py-2">Grid Game</th>
                        <th className="border px-4 py-2">Arrow Game</th>
                        <th className="border px-4 py-2 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ranked.map(({ player, scores, total }, index) => (
                        <tr key={player._id.toString()}>
                          <td className="border px-4 py-2 font-semibold">
                            #{index + 1}
                          </td>
                          <td className="border px-4 py-2">
                            {player.firstName}
                          </td>
                          {scores.map((score, i) => (
                            <td key={i} className="border px-4 py-2">
                              {score.toFixed(3)}
                            </td>
                          ))}
                          <td className="border px-4 py-2 font-bold">
                            {total.toFixed(3)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              });
            }}
          </DataProvider>
        </div>
      )}
    </DataProvider>
  );
}

export default page;
