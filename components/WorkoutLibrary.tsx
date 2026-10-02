import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  return (
    <section
      id="library"
      className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-black tracking-[0.16em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
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