"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import { useFitness } from "@/context/FitnessContext";

type ActiveTab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    markAsDone,
    removeSavedWorkout,
  } = useFitness();

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("plan");

  const [loading, setLoading] = useState(true);

  /*
   * The My Plan page waits for the workout API request
   * before rendering the workout list.
   */
  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        await fetch(
          "https://api.api-store.workers.dev/api/fitlog",
          {
            cache: "no-store",
          }
        );
      } catch (error) {
        console.error(
          "Failed to load workouts:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  /* Calculate live metrics */
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ====================================================
            HEADER
        ===================================================== */}
        <section>
          <p className="text-[10px] font-black tracking-[0.18em] text-[#ccff00]">
            MY PLAN
          </p>

          <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </section>

        {/* ====================================================
            METRICS
        ===================================================== */}
        <section className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          <MetricCard
            label="Exercises"
            value={plan.length}
          />

          <MetricCard
            label="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            label="Calories"
            value={totalCalories}
          />
        </section>

        {/* ====================================================
            TABS
        ===================================================== */}
        <section className="mt-10 border-b border-zinc-800">
          <div className="flex gap-6">

            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`relative pb-4 text-[10px] font-black uppercase tracking-wider transition ${
                activeTab === "plan"
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              Today&apos;s Plan

              {activeTab === "plan" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`relative pb-4 text-[10px] font-black uppercase tracking-wider transition ${
                activeTab === "saved"
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              Saved

              {activeTab === "saved" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
              )}
            </button>

          </div>
        </section>

        {/* ====================================================
            CONTENT
        ===================================================== */}
        <section className="mt-8">

          {loading ? (
            <LoadingState />
          ) : activeTab === "plan" ? (
            <TodayPlan
              plan={plan}
              onRemove={removeFromPlan}
              onDone={markAsDone}
            />
          ) : (
            <SavedPlan
              saved={saved}
              onRemove={removeSavedWorkout}
            />
          )}

        </section>
      </div>
    </main>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

interface MetricCardProps {
  label: string;
  value: number;
}

function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-[#151619] p-4 sm:p-5">
      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-zinc-600 sm:text-[9px]">
        {label}
      </p>

      <p className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   LOADING
============================================================ */

function LoadingState() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-[#111214] px-6 py-16 text-center">
      <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />

      <p className="mt-4 text-xs font-bold text-zinc-500">
        Loading workouts…
      </p>
    </div>
  );
}

/* ============================================================
   TODAY'S PLAN
============================================================ */

interface TodayPlanProps {
  plan: ReturnType<typeof useFitness>["plan"];
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
}

function TodayPlan({
  plan,
  onRemove,
  onDone,
}: TodayPlanProps) {
  if (plan.length === 0) {
    return <EmptyPlan />;
  }

  return (
    <div className="space-y-4">
      {plan.map((workout) => (
        <PlanWorkoutCard
          key={workout.id}
          workout={workout}
          type="plan"
          onRemove={onRemove}
          onDone={onDone}
        />
      ))}
    </div>
  );
}

/* ============================================================
   SAVED
============================================================ */

interface SavedPlanProps {
  saved: ReturnType<typeof useFitness>["saved"];
  onRemove: (id: number) => void;
}

function SavedPlan({
  saved,
  onRemove,
}: SavedPlanProps) {
  if (saved.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 bg-[#111214] px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-black uppercase text-white">
          NOTHING SAVED YET
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
          Save a workout from the library to
          find it here later.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {saved.map((workout) => (
        <PlanWorkoutCard
          key={workout.id}
          workout={workout}
          type="saved"
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

/* ============================================================
   EMPTY TODAY'S PLAN
============================================================ */

function EmptyPlan() {
  return (
    <div className="rounded-lg border border-dashed border-zinc-800 bg-[#111214] px-6 py-20 text-center">

      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-700">
        TODAY&apos;S PLAN
      </p>

      <h2 className="mt-3 font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl">
        NOTHING HERE YET
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-600">
        Browse the library and add a lift to get
        today moving.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
      >
        Go to workouts

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}