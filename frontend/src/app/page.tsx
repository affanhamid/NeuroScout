import DataProvider from "@/components/ui/DataProvider";
import Footer from "../components/ui/Footer";
import Gallery from "../components/ui/Gallery";
import { GameTypeWithId } from "@/types";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const Home = () => {
  return (
    <main className="relative">
      <Navbar />

      <section className="mt-24 px-4 text-center md:mt-32">
        <h1 className="text-xl font-bold md:text-3xl">NeuroScout</h1>
        <h2 className="mt-2 text-base md:mt-4 md:text-xl">
          Optimising talent through cognitive insight
        </h2>
      </section>

      <section className="pt-8 md:pt-12">
        <DataProvider<GameTypeWithId[]> endpoint="games">
          {(games) => <Gallery games={games} />}
        </DataProvider>
      </section>

      <section className="my-8 px-4 text-center md:my-12">
        <h2 className="mb-4 text-sm font-medium leading-tight md:text-base lg:text-lg">
          Test your skills now <br /> by playing our games
        </h2>
        <Link
          href="/test/6765254294b4101df01adc7a"
          className="button-link inline-block rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 md:px-6 md:py-3 md:text-base"
        >
          Play Games
        </Link>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
