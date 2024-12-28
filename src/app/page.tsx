import DataProvider from "@/components/ui/DataProvider";
import Footer from "../components/ui/Footer";
import Gallery from "../components/ui/Gallery";
import { GameTypeWithId } from "@/types";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-24 px-20">
      <section className="mb-16">
        <h1 className="text-center text-7xl mb-5 text-primary">NeuroScout</h1>
        <p className="text-3xl text-bold text-center">
          Optimising talent selection through cognitive insight
        </p>
      </section>
      <section className="flex flex-col mb-16 items-center justify-center">
        <div className="text-3xl mb-5">
          Test your skills now by playing our games
        </div>
        <Link
          href="https://neuroscout.co.uk/test/6765254294b4101df01adc7a"
          className="px-3 py-2 bg-primary text-white rounded-lg text-4xl"
        >
          Play Games
        </Link>
      </section>
      <section className="pt-24 px-20 flex justify-center h-[100vh]">
        <DataProvider<GameTypeWithId[]> endpoint="games">
          {(games) => <Gallery games={games} />}
        </DataProvider>
      </section>
      <Footer />
    </main>
  );
}
