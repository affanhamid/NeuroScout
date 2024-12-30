import DataProvider from "@/components/ui/DataProvider";
import Footer from "../components/ui/Footer";
import Gallery from "../components/ui/Gallery";
import { GameTypeWithId } from "@/types";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <section>
        <h1>NeuroScout</h1>
        <h2>Optimising talent selection through cognitive insight</h2>
      </section>
      <section className="py-0">
        <DataProvider<GameTypeWithId[]> endpoint="games">
          {(games) => <Gallery games={games} />}
        </DataProvider>
      </section>
      <section>
        <h2>Test your skills now by playing our games</h2>
        <Link
          href="https://neuroscout.co.uk/test/6765254294b4101df01adc7a"
          className="button-link"
        >
          Play Games
        </Link>
      </section>
      <Footer />
    </main>
  );
}
