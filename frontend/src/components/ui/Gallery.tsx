import Image from "../../../frontend/node_modules/next/image";
import Link from "../../../frontend/node_modules/next/link";
import { GameTypeWithId } from "@/types";

const Gallery = async ({ games }: { games: GameTypeWithId[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {games?.map((gameItem) => (
        <div key={gameItem.name} className="flex flex-col space-y-6">
          <Link href={`games/${gameItem._id}`}>
            <Image
              className="aspect-video w-[800px] rounded-xl"
              src={gameItem.image}
              width={800}
              height={450}
              alt={gameItem.name}
            />
          </Link>
          <div className="text-center">
            <h3>{gameItem.name}</h3>
            <p>{gameItem.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
