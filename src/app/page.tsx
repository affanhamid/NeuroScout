import Footer from "@/components/components/Footer";
import Gallery from "@/components/components/Gallery";
import Navbar from "@/components/components/Navbar";

const Card = ({ heading, text }: { heading: string; text: string }) => {
  return (
    <div className="bg-dark w-[320px] aspect-[0.9] rounded-lg text-white text-center py-10">
      <h3 className="">{heading}</h3>
      <p>{text}</p>
    </div>
  );
};

const TimelineElement = ({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) => {
  return (
    <div className="bg-white/20 w-[500px] aspect-[3/2] rounded-lg text-white text-center py-10 relative">
      <h3 className="">{heading}</h3>
      <p>{text}</p>
      <div className="absolute w-10 h-10 bg-white/20 rounded-full top-full left-[50%] transform translate-x-[-50%] mt-5" />
    </div>
  );
};

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const result = await fetch(`${baseUrl}/api/data/get-data?dataTable=game`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const games = await result.json();

  return (
    <main>
      <Navbar />
      <section className="bg-hero h-[75vh] mt-20">
        <div className="flex h-3/4 items-center justify-between">
          <div className="text-white flex flex-col gap-5 w-[50%]">
            <h1>
              The future of <br /> football talent acquisition
            </h1>
            <p>
              We help academies pick out the best talent through a range of
              research-backed cognitive tests
            </p>
            <button className="bg-white text-primary">Get Started</button>
          </div>
          <div>
            <div className="bg-dark w-[550px] rounded-xl aspect-video"></div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <h2 className="mb-20">
          What is <span className="text-primary">NeuroScout</span>
        </h2>
        <div className="flex justify-between">
          <Card heading="Perform cognitive Tests" text="" />
          <Card heading="Gain in-depth analysis" text="" />
          <Card heading="Pick out talent and train" text="" />
        </div>

        <div className="py-10 flex rounded-lg justify-between px-10 bg-[#CDD4DD] mt-20">
          <div className="flex flex-col w-1/2">
            <h3 className="text-3xl mb-10">Follow our research</h3>
            <p>
              Understand our research and findings about cognitive assessments
              in football. Understand our research and findings about cognitive
              assessments in football. Understand our research and findings
              about cognitive assessments in football
            </p>
          </div>
          <div className="w-60 bg-white aspect-[3/4] rounded-lg"></div>
        </div>
      </section>
      <section className="bg-testing h-[85vh] py-20">
        <h2 className="text-white mb-20">How it works</h2>
        <div className="flex gap-10 relative">
          <TimelineElement heading="Take Assessment" text="" />
          <TimelineElement heading="Get Analysis" text="" />
          <TimelineElement heading="Learn about yourself" text="" />
          <div className="bg-white/20 absolute h-2 w-[69%] left-[50%] top-[116%] transform translate-y-[-50%] -translate-x-[50%]" />
        </div>
      </section>
      <section className="pb-20">
        <h2 className="mb-20">Visit Our Games</h2>
        <Gallery games={games} />
      </section>
      <Footer />
    </main>
  );
}
