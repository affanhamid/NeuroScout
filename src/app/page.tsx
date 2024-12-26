import DataProvider from "@/components/ui/DataProvider";
import Footer from "../components/ui/Footer";
import Gallery from "../components/ui/Gallery";
import { GameTypeWithId } from "@/types";

export default function Home() {
  return (
    <main>
      <section className="pt-24 px-20 flex justify-center h-[100vh]">
        <div>
          <h1 className="text-center text-7xl mb-5 text-primary">NeuroScout</h1>
          <p className="text-3xl text-bold mb-36 text-center">
            Optimising talent selection through cognitive insight.
          </p>
          <DataProvider<GameTypeWithId[]> endpoint="games">
            {(games) => <Gallery games={games} />}
          </DataProvider>
        </div>
      </section>
      <Footer />
    </main>
  );
}
