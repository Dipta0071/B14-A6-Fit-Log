"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = useMemo(() => {
    const copiedWorkouts = [...workouts];

    if (sortBy === "duration") {
      copiedWorkouts.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      copiedWorkouts.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    if (sortBy === "rating") {
      copiedWorkouts.sort((a, b) => b.rating - a.rating);
    }

    return copiedWorkouts;
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
              THE LIBRARY
            </p>

            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Twelve lifts covering every major muscle group.
            </h2>
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <label
              htmlFor="sort-workouts"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500"
            >
              Sort By
            </label>

            <div className="relative">
              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-lg border border-zinc-700 bg-[#17181c] px-4 py-3 pr-11 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              {/* Chevron */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </div>
    </section>
  );
}