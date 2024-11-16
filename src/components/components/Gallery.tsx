import Image from "next/image";
import Link from "next/link";

const Gallery = async ({ games }: { games: any[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {games.map(
        (game: {
          title: string;
          link: string;
          description: string;
          imageLink: string;
        }) => (
          <div key={game.title}>
            <Link
              href={game.link}
              className="text-purple-500 hover:text-purple-600 text-xl"
            >
              <Image
                className="aspect-video w-[500px] rounded-xl"
                src={game.imageLink}
                width={800}
                height={450}
                alt=""
              />
            </Link>
            <div className="text-center">
              <h3 className="text-gray-600 text-xl pt-3">{game.title}</h3>
              <p className="text-gray-600 text-lg">{game.description}</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Gallery;
