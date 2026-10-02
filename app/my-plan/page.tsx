"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import { useFitness } from "@/context/FitnessContext";

type TabType = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    markAsDone,
    removeSavedWorkout,
    addToPlan,
  } = useFitness();

  const [activeTab, setActiveTab] =
    useState<TabType>("plan");

  const [loading, setLoading] =
    useState(true);

  // --------------------------------
  // LOADING STATE
  // --------------------------------
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load workouts"
          );
        }

        await response.json();
      } catch (error) {
        console.error(
          "Failed to load workouts:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  // --------------------------------
  // PLAN METRICS
  // --------------------------------
  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ========================= */}
        {/* PAGE HEADER */}
        {/* ========================= */}

        <div className="mb-10">

          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            FITLOG
          </p>

          <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>

        </div>

        {/* ========================= */}
        {/* METRICS */}
        {/* ========================= */}

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Exercises */}
          <div className="rounded-xl border border-zinc-800 bg-[#17181c] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
              Exercises
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="rounded-xl border border-zinc-800 bg-[#17181c] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
              Minutes
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-[#ccff00]">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-xl border border-zinc-800 bg-[#17181c] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
              Calories
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-[#ccff00]">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* ========================= */}
        {/* TABS */}
        {/* ========================= */}

        <div className="mb-8 flex border-b border-zinc-800">

          {/* Today's Plan */}
          <button
            type="button"
            onClick={() =>
              setActiveTab("plan")
            }
            className={`border-b-2 px-5 py-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          {/* Saved */}
          <button
            type="button"
            onClick={() =>
              setActiveTab("saved")
            }
            className={`border-b-2 px-5 py-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm font-medium text-zinc-500">
              Loading workouts…
            </p>
          </div>
        ) : (
          <>
            {/* ========================= */}
            {/* TODAY'S PLAN */}
            {/* ========================= */}

            {activeTab === "plan" && (
              <>
                {plan.length === 0 ? (
                  <EmptyPlan />
                ) : (
                  <div className="space-y-5">

                    {plan.map((workout) => (
                      <PlanWorkoutCard
                        key={workout.id}
                        workout={workout}
                        type="plan"
                        onRemove={removeFromPlan}
                        onDone={markAsDone}
                      />
                    ))}

                  </div>
                )}
              </>
            )}

            {/* ========================= */}
            {/* SAVED WORKOUTS */}
            {/* ========================= */}

            {activeTab === "saved" && (
              <>
                {saved.length === 0 ? (
                  <EmptySaved />
                ) : (
                  <div className="space-y-5">

                    {saved.map((workout) => (
                      <PlanWorkoutCard
                        key={workout.id}
                        workout={workout}
                        type="saved"
                        onRemove={removeSavedWorkout}
                        onAddToPlan={addToPlan}
                      />
                    ))}

                  </div>
                )}
              </>
            )}
          </>
        )}

      </div>
    </main>
  );
}

/* ================================= */
/* EMPTY PLAN COMPONENT */
/* ================================= */

function EmptyPlan() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-[#111214] px-6 text-center">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-[#17181c]">

        <svg
          className="h-7 w-7 text-[#ccff00]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 6V18M6 12H18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

      </div>

      <h2 className="font-display text-2xl font-bold uppercase">
        NOTHING HERE YET
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Browse the library and add a lift to get
        today moving.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
      >
        Go to workouts
      </Link>

    </div>
  );
}

/* ================================= */
/* EMPTY SAVED COMPONENT */
/* ================================= */

function EmptySaved() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-[#111214] px-6 text-center">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-[#17181c]">

        <svg
          className="h-7 w-7 text-[#ccff00]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 4.5C6 3.672 6.672 3 7.5 3H16.5C17.328 3 18 3.672 18 4.5V21L12 17.5L6 21V4.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

      </div>

      <h2 className="font-display text-2xl font-bold uppercase">
        NOTHING SAVED YET
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Save workouts from the library and come
        back to them whenever you are ready.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
      >
        Go to workouts
      </Link>

    </div>
  );
}