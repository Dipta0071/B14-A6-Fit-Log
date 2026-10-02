"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({
  planCount = 0,
  savedCount = 0,
}: NavbarProps) {
  const pathname = usePathname();

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

        {/* Navigation */}
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

        {/* Status Badges */}
        <div className="flex items-center gap-2">

          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black text-black transition hover:bg-[#d8ff3f]"
          >
            <span>Plan</span>
            <span>{planCount}</span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-zinc-600 px-3 py-1.5 text-[10px] font-black text-white transition hover:border-zinc-400"
          >
            <span>Saved</span>
            <span>{savedCount}</span>
          </Link>

        </div>
      </nav>
    </header>
  );
}