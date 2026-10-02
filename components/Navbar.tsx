"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitness } from "@/context/FitnessContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = useFitness();

  const workoutsActive =
    pathname === "/" ||
    pathname === "/workouts" ||
    pathname.startsWith("/workouts/");

  const planActive = pathname === "/my-plan";

  return (
    <header className="border-b border-zinc-800 bg-[#0b0c0e]">
      <nav className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-black tracking-tight text-white sm:text-xl"
        >
          FITLOG
        </Link>

        {/* Main navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 ${
              workoutsActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 ${
              planActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black text-black transition hover:bg-[#d9ff4d]"
          >
            <span>Plan</span>
            <span>{plan.length}</span>
          </Link>

          <Link
            href="/plan"
            className="flex items-center gap-1.5 rounded-full border border-zinc-600 px-3 py-1.5 text-[10px] font-black text-white transition hover:border-zinc-400"
          >
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}