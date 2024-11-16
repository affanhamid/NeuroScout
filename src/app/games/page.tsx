import Gallery from "@/components/components/Gallery";
import Navbar from "@/components/components/Navbar";
import React from "react";

const page = () => {
  return (
    <main>
      <Navbar />
      <section className="py-32">
        <h1 className="text-center mb-5">Games</h1>
        <p className="text-center mb-20">
          Here is the selection of games we offer
        </p>
        <Gallery />
      </section>
    </main>
  );
};

export default page;
