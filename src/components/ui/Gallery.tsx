import Image from "next/image";
import Link from "next/link";
import { GameTypeWithId } from "@/types";

const Gallery = async ({ games }: { games: GameTypeWithId[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {games &&
        games[0] &&
        games.map((gameItem) => (
          <div key={gameItem.name}>
            <Link
              href={`games/${gameItem._id}`}
              className="text-purple-500 hover:text-purple-600 text-xl"
            >
              <Image
                className="aspect-video w-[800px] rounded-xl"
                src={gameItem.image}
                width={800}
                height={450}
                alt=""
              />
            </Link>
            <div className="text-center">
              <h3 className="text-gray-600 text-3xl pt-3 pb-1 font-bold">
                {gameItem.name}
              </h3>
              <p className="text-gray-600 text-xl">{gameItem.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
