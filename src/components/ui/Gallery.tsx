import Image from "next/image";
import Link from "next/link";
import { GameTypeWithId } from "@/types";

const Gallery = async ({ games }: { games: GameTypeWithId[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10 -mt-20">
      {games &&
        games[0] &&
        games.map((gameItem) => (
          <div key={gameItem.name} className="flex flex-col space-y-6">
            <Link
              href={`games/${gameItem._id}`}
              className="text-purple-500 hover:text-purple-600 text-xl"
            >
              <Image
                className="aspect-video w-[800px] rounded-xl"
                src={gameItem.image}
                width={800}
                height={450}
                alt={gameItem.name}
              />
            </Link>
            <div className="text-center">
              <h3 className="text-gray-600 text-2xl font-bold">
                {gameItem.name}
              </h3>
              <p className="text-gray-600 text-lg">{gameItem.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
