import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { game } from "@/drizzle/schema";

const Gallery = async ({
  games,
}: {
  games: InferSelectModel<typeof game>[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {games &&
        games[0] &&
        games.map((gameItem) => (
          <div key={gameItem.title}>
            <Link
              href={`games/${gameItem.id}`}
              className="text-purple-500 hover:text-purple-600 text-xl"
            >
              <Image
                className="aspect-video w-[500px] rounded-xl"
                src={gameItem.imageLink}
                width={800}
                height={450}
                alt=""
              />
            </Link>
            <div className="text-center">
              <h3 className="text-gray-600 text-xl pt-3">{gameItem.title}</h3>
              <p className="text-gray-600 text-lg">{gameItem.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
