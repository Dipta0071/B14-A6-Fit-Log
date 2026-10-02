import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-zinc-800 bg-[#151619] transition duration-300 hover:-translate-y-1 hover:border-zinc-600"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Difficulty */}
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {workout.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Muscle group tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout name */}
        <h3 className="text-lg font-black uppercase leading-tight tracking-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-xs text-zinc-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
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

            <span className="text-[11px] font-semibold">
              {workout.duration} min
            </span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3C12 3 7 7.2 7 13C7 16.3 9.2 19 12 19C14.8 19 17 16.7 17 13C17 9.5 14.5 7.2 12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M10 15C10 13.5 11 12.5 12 11.2C13 12.3 14 13.4 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>

            <span className="text-[11px] font-semibold">
              {workout.caloriesBurned} kcal
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="text-[#ccff00]"
            >
              <path d="M12 3.5L14.7 9L20.8 9.9L16.4 14.2L17.4 20.3L12 17.4L6.6 20.3L7.6 14.2L3.2 9.9L9.3 9L12 3.5Z" />
            </svg>

            <span className="text-[11px] font-semibold">
              {workout.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}