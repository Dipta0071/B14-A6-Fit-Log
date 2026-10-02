import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c0e]">

      <Hero />

      {/* Temporary library target */}
      <section
        id="library"
        className="mx-auto mt-10 max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <p className="text-xs font-black tracking-widest text-[#ccff00]">
          WORKOUT LIBRARY
        </p>

        <h2 className="mt-2 text-4xl font-black text-white">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </section>

    </main>
  );
}