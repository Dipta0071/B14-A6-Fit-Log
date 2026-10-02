"use client";

import Link from "next/link";
import { Workout } from "@/types/workout";
import { useFitness } from "@/context/FitnessContext";

interface WorkoutDetailsProps {
  workout: Workout;
}

export default function WorkoutDetails({
  workout,
}: WorkoutDetailsProps) {
  const { addToPlan, saveWorkout } = useFitness();

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to workouts */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500 transition hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 12H5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M11 18L5 12L11 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Back to workouts
        </Link>

        {/* Main Details Card */}
        <div className="grid overflow-hidden rounded-xl border border-zinc-800 bg-[#151619] lg:grid-cols-2">

          {/* =====================================================
              LEFT SIDE — WORKOUT IMAGE
          ====================================================== */}
          <div className="relative min-h-[320px] bg-[#111214] sm:min-h-[450px] lg:min-h-[680px]">

            <img
              src={workout.image}
              alt={workout.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Workout number */}
            <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
              Workout #{workout.id}
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — WORKOUT INFORMATION
          ====================================================== */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">

            {/* Workout title */}
            <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400">
              {workout.description}
            </p>

            {/* Muscle group tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* =================================================
                KEY SPECS
            ================================================== */}
            <div className="mt-8">

              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#ccff00]">
                KEY SPECS
              </div>

              <div className="overflow-hidden rounded-lg border border-zinc-800">

                <SpecRow
                  label="Equipment"
                  value={workout.equipment}
                />

                <SpecRow
                  label="Difficulty"
                  value={workout.difficulty}
                />

                <SpecRow
                  label="Sets"
                  value={String(workout.sets)}
                />

                <SpecRow
                  label="Reps"
                  value={workout.reps}
                />

                <SpecRow
                  label="Duration"
                  value={`${workout.duration} min`}
                />

                <SpecRow
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <SpecRow
                  label="Rating"
                  value={String(workout.rating)}
                  last
                />

              </div>
            </div>

            {/* =================================================
                INSTRUCTIONS
            ================================================== */}
            <div className="mt-8">

              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={instruction}
                      className="flex gap-4"
                    >
                      {/* Number */}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-black text-[#ccff00]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Instruction text */}
                      <p className="pt-1 text-sm leading-5 text-zinc-400">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* ADD TO TODAY'S PLAN */}
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d] active:scale-[0.98]"
              >
                {/* Plus icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5V19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                Add to today&apos;s plan
              </button>

              {/* SAVE FOR LATER */}
              <button
                type="button"
                onClick={() => saveWorkout(workout)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-700 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white transition hover:border-zinc-500 active:scale-[0.98]"
              >
                {/* Bookmark icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 4.5C6 3.67 6.67 3 7.5 3H16.5C17.33 3 18 3.67 18 4.5V21L12 17.5L6 21V4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>

                Save for later
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


/* ============================================================
   SPECIFICATION ROW
============================================================ */

interface SpecRowProps {
  label: string;
  value: string;
  last?: boolean;
}

function SpecRow({
  label,
  value,
  last = false,
}: SpecRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 ${
        !last ? "border-b border-zinc-800" : ""
      }`}
    >
      {/* Label */}
      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
        {label}
      </span>

      {/* Value */}
      <span className="text-right text-xs font-bold text-white">
        {value}
      </span>
    </div>
  );
}