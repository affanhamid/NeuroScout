import games from "@/components/game-components";
import DataProvider from "@/components/ui/DataProvider";
import { GameType } from "@/types";

async function page({ params }: { params: Promise<{ gameId: string }> }) {
  const resolvedParams = await params;
  const gameId = resolvedParams.gameId;

  const SelectedGame = games[gameId as keyof typeof games];
  return (
    <DataProvider<GameType> endpoint={`games/${gameId}`}>
      {(game) => {
        game.instructions = game.instructions.sort((a, b) => a.step - b.step);
        return <SelectedGame gameId={gameId} gameInfo={game} />;
      }}
    </DataProvider>
  );
}

export default page;
