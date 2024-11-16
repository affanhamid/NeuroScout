"use client";
import Footer from "@/components/components/Footer";
import Navbar from "@/components/components/Navbar";

export const Card = ({ heading, text }: { heading: string; text: string }) => {
  return (
    <div className="bg-dark w-[320px] aspect-[0.9] rounded-lg text-white text-center py-10">
      <h3 className="">{heading}</h3>
      <p>{text}</p>
    </div>
  );
};

export default function Home() {
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
      <section></section>
      <section></section>
      <div className="mt-40"></div>
      <Footer />
    </main>
  );
}
