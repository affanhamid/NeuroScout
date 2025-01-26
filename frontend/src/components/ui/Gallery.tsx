import Image from "next/image";
import Link from "next/link";
import { GameTypeWithId } from "@/types";

const Gallery = async ({ games }: { games: GameTypeWithId[] }) => {
  return (
    // Make the gallery responsive for mobile by using one column on small screens
    <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:gap-10 md:px-0">
      {games?.map((gameItem) => (
        <div
          key={gameItem.name}
          className="flex flex-col items-center space-y-4"
        >
          <Link href={`games/${gameItem._id}`}>
            {/* Restrict width and use aspect ratio for better mobile scaling */}
            <Image
              className="w-full max-w-sm rounded-xl object-cover"
              src={gameItem.image}
              width={800}
              height={450}
              alt={gameItem.name}
            />
          </Link>
          <div className="text-center px-2">
            <h3 className="text-base font-semibold md:text-lg">
              {gameItem.name}
            </h3>
            {/* Make text size smaller for mobile; adjust on larger screens */}
            <p className="mt-1 text-sm md:text-base">{gameItem.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
