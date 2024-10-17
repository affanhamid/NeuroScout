import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <h1 className="text-6xl font-bold mb-4">
        NeuroScout still in development
      </h1>
      <p className="text-lg mb-6 max-w-2xl text-center">
        Stay tuned for updates and new features!
      </p>
      <Link
        className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold"
        href="/"
      >
        Go back
      </Link>
    </section>
  );
}
