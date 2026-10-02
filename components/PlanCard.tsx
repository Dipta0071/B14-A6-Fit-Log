import Link from "next/link";
import { Workout } from "@/types/workout";

interface PlanCardProps {
  workout: Workout;
  onRemove: (id: number) => void;
}

export default function PlanCard({
  workout,
  onRemove,
}: PlanCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#151619] p-4 sm:flex-row sm:items-center">
      {/* Image */}
      <img
        src={workout.image}
        alt={workout.name}
        className="h-28 w-full rounded-lg object-cover sm:h-24 sm:w-32"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-black uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="mt-2 text-base font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          {workout.equipment}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-[10px] font-semibold text-zinc-400">
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:flex-col">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-md border border-zinc-700 px-3 py-2 text-center text-[9px] font-black uppercase text-white transition hover:border-zinc-500"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="rounded-md border border-red-900 px-3 py-2 text-[9px] font-black uppercase text-red-400 transition hover:border-red-700"
        >
          Remove
        </button>
      </div>
    </article>
  );
}