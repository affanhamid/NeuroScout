"use client";
import Footer from "@/components/components/Footer";
import Navbar from "@/components/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="bg-hero h-[75vh] mt-20 px-32">
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
      <section></section>
      <section></section>
      <section></section>
      <div className="mt-40"></div>
      <Footer />
    </main>
  );
}
