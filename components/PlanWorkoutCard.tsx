"use client";

import Link from "next/link";
import { Workout } from "@/types/workout";

interface PlanWorkoutCardProps {
  workout: Workout;
  type: "plan" | "saved";
  onRemove: (id: number) => void;
  onDone?: (id: number) => void;
}

export default function PlanWorkoutCard({
  workout,
  type,
  onRemove,
  onDone,
}: PlanWorkoutCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-[#151619] transition hover:border-zinc-700">
      <div className="flex flex-col sm:flex-row">

        {/* Thumbnail */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#111214] sm:h-auto sm:w-44 lg:w-52">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-5">

          <div>
            {/* Muscle groups */}
            <div className="flex flex-wrap gap-1.5">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-black uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="mt-3 font-display text-2xl font-black uppercase leading-none text-white">
              {workout.name}
            </h3>

            {/* Equipment */}
            <p className="mt-2 text-xs text-zinc-500">
              {workout.equipment}
            </p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-zinc-400">

              {/* Duration */}
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon />
                {workout.duration} min
              </span>

              {/* Calories */}
              <span className="inline-flex items-center gap-1.5">
                <FireIcon />
                {workout.caloriesBurned} kcal
              </span>

              {/* Rating */}
              <span className="inline-flex items-center gap-1.5">
                <StarIcon />
                {workout.rating}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">

            {/* View Details */}
            <Link
              href={`/workouts/${workout.id}`}
              className="rounded-md border border-zinc-700 px-4 py-2 text-[9px] font-black uppercase tracking-wide text-white transition hover:border-zinc-500"
            >
              View Details
            </Link>

            {type === "plan" && onDone && (
              <button
                type="button"
                onClick={() => onDone(workout.id)}
                className="rounded-md bg-[#ccff00] px-4 py-2 text-[9px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
              >
                Mark as Done
              </button>
            )}

            {type === "saved" && (
              <Link
                href={`/workouts/${workout.id}`}
                className="rounded-md bg-[#ccff00] px-4 py-2 text-[9px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
              >
                Add to Plan
              </Link>
            )}

            {/* Remove */}
            <button
              type="button"
              onClick={() => onRemove(workout.id)}
              aria-label={`Remove ${workout.name}`}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 transition hover:border-red-900 hover:text-red-400"
            >
              <XIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   ICONS
============================================================ */

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21C16.5 21 19 18.2 19 14.7C19 11.3 16.7 8.8 14 6.5C14.1 9.2 12.9 10.6 11.7 11.3C11.8 8.4 10.2 5.9 7.7 4C7.7 7.6 5 10 5 14.2C5 18.2 7.8 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4L14.5 9L20 9.8L16 13.7L17 19.2L12 16.5L7 19.2L8 13.7L4 9.8L9.5 9L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}