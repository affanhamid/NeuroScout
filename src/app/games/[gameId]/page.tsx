import games from "../../../components/game-components";

async function page({ params }: { params: Promise<{ gameId: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.gameId;

  const SelectedGame = games[id];
  return <SelectedGame gameId={id} />;
}

export default page;
