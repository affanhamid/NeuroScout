"use client";
import Navbar from "@/components/components/Navbar";
import MOTGameImage from "@/public/MOT.png";
import Image from "next/image";
import * as schema from "@/drizzle/schema";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome to NeuroScout</h1>
        <p className="text-lg mb-6 max-w-2xl text-center">
          The future of football talent discovery is here. We test and enhance
          cognitive abilities to unlock your football potential. Are you ready
          to level up?
        </p>
        <button
          className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold"
          onClick={async () => {
            try {
              const response = await fetch("/api/add-mot-data", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  timeOfData: new Date(),
                  params: { vts: 3 },
                  scores: [1, 2, 3],
                  age: 10,
                  highestLevel: "high",
                  timeToClicks: [1, 2, 3],
                  screenWidth: 100,
                  screenHeight: 100,
                  ballSize: 100,
                  duration: 10,
                  numPracticeRounds: 1,
                }),
              });

              const result = await response.json();
              if (result.success) {
                console.log("Data added successfully:", result.message);
              } else {
                console.error("Failed to add data:", result.message);
              }
            } catch (error) {
              console.error("Error submitting data:", error);
            }
          }}
        >
          Get Started
        </button>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why NeuroScout?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Cognitive Testing</h3>
              <p>
                Our state-of-the-art cognitive tests measure how players think
                and react under pressure, identifying the key mental attributes
                that top athletes possess.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Talent Discovery</h3>
              <p>
                We help uncover hidden potential in young footballers,
                connecting them with coaches and scouts looking for the next
                star.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Performance Analytics
              </h3>
              <p>
                Get actionable insights from our performance data that help
                players and teams improve their mental game and stay ahead of
                the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="flex-1 mb-10 md:mb-0">
              <Image
                src={MOTGameImage}
                alt="How NeuroScout Works"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <ul className="space-y-6 flex flex-col justify-center h-full text-2xl px-10 gap-10">
                <li>
                  <strong>Step 1:</strong> Players take our online cognitive
                  tests designed to measure decision-making, spatial awareness,
                  and reaction times.
                </li>
                <li>
                  <strong>Step 2:</strong> We analyze the results and provide a
                  detailed report on key mental traits that affect game
                  performance.
                </li>
                <li>
                  <strong>Step 3:</strong> Coaches and scouts access these
                  reports to discover new talent and optimize training.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Get Started with NeuroScout
          </h2>
          <p className="text-lg text-center mb-6">
            Ready to take your football career to the next level? Sign up now
            and start your journey.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold">
              Join Now
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-800 text-gray-300">
        <div className="container mx-auto px-8">
          <p className="text-center">© 2024 NeuroScout. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
