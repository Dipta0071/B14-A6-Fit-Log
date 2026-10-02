"use client";

import Link from "next/link";
import { Workout } from "@/types/workout";

interface PlanWorkoutCardProps {
  workout: Workout;
  type?: "plan" | "saved";
  onRemove: (id: number) => void;
  onDone?: (id: number) => void;
  onAddToPlan?: (workout: Workout) => void;
}

export default function PlanWorkoutCard({
  workout,
  type = "plan",
  onRemove,
  onDone,
  onAddToPlan,
}: PlanWorkoutCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-[#17181c]">

      <div className="flex flex-col sm:flex-row">

        {/* Image */}
        <div className="h-52 w-full shrink-0 sm:h-auto sm:w-56">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">

          {/* Muscle Groups */}
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold uppercase">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 text-sm text-zinc-500">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-300">

            {/* Duration */}
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 7V12L15 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C12 2 5 9 5 15C5 19.418 8.134 22 12 22C15.866 22 19 19.418 19 15C19 9 12 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 11C12 11 9 14 9 16.5C9 18.433 10.343 20 12 20C13.657 20 15 18.433 15 16.5C15 14 12 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <span>{workout.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>

              <span>{workout.rating}</span>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href={`/workouts/${workout.id}`}
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              View Details
            </Link>

            {type === "plan" && (
              <button
                type="button"
                onClick={() => onDone?.(workout.id)}
                className="flex items-center gap-2 rounded-lg bg-[#ccff00] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-white"
              >
                {/* Check Icon */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12L10 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Mark as Done
              </button>
            )}

            {type === "saved" && onAddToPlan && (
              <button
                type="button"
                onClick={() => onAddToPlan(workout)}
                className="rounded-lg bg-[#ccff00] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-white"
              >
                Add to Plan
              </button>
            )}

          </div>

        </div>

        {/* Remove X */}
        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-400 transition hover:border-red-500 hover:text-red-400"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

      </div>
    </article>
  );
}