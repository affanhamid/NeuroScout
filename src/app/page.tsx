"use client";
import Footer from "@/components/components/Footer";
import Navbar from "@/components/components/Navbar";

export const Card = ({ heading, text }: { heading: string; text: string }) => {
  return (
    <div className="bg-dark w-[320px] aspect-[0.9] rounded-lg text-white text-center py-10">
      <h3 className="">{heading}</h3>
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="bg-hero h-[75vh] mt-20 px-40">
        <div className="flex h-3/4 items-center justify-between">
          <div className="text-white flex flex-col gap-5 w-[45%]">
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
            <div className="bg-dark w-[700px] rounded-xl aspect-video"></div>
          </div>
        </div>
      </section>
      <section className="px-40 py-20">
        <h2 className="mb-20">
          What is <span className="text-primary">NeuroScout</span>
        </h2>
        <div className="flex justify-between">
          <Card heading="Perform cognitive Tests" text="" />
          <Card heading="Gain in-depth analysis" text="" />
          <Card heading="Pick out talent and train" text="" />
        </div>
      </section>
      <section></section>
      <section></section>
      <div className="mt-40"></div>
      <Footer />
    </main>
  );
}
