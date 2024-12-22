import games from "@/components/game-components";

async function page({ params }: { params: Promise<{ gameId: string }> }) {
  const resolvedParams = await params;
  const gameId = resolvedParams.gameId;

  const SelectedGame = games[gameId as keyof typeof games];
  return <SelectedGame gameId={gameId} />;
}

export default page;
