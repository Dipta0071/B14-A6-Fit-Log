"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { Workout } from "@/types/workout";

interface FitnessContextType {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeSavedWorkout: (id: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(
  undefined
);

interface FitnessProviderProps {
  children: ReactNode;
}

export function FitnessProvider({
  children,
}: FitnessProviderProps) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // --------------------------------
  // ADD WORKOUT TO TODAY'S PLAN
  // --------------------------------
  const addToPlan = (workout: Workout) => {
    // Prevent duplicate workout
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.info("This workout is already in your plan.");
      return;
    }

    // Maximum 5 workouts
    if (plan.length >= 5) {
      toast.warning(
        "Your plan is full. You can add a maximum of 5 workouts."
      );
      return;
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      workout,
    ]);

    toast.success(`${workout.name} added to today's plan.`);
  };

  // --------------------------------
  // REMOVE WORKOUT FROM PLAN
  // --------------------------------
  const removeFromPlan = (id: number) => {
    const workout = plan.find(
      (item) => item.id === id
    );

    setPlan((currentPlan) =>
      currentPlan.filter(
        (item) => item.id !== id
      )
    );

    if (workout) {
      toast.info(
        `${workout.name} removed from your plan.`
      );
    } else {
      toast.info("Workout removed from your plan.");
    }
  };

  // --------------------------------
  // MARK WORKOUT AS DONE
  // --------------------------------
  const markAsDone = (id: number) => {
    const workout = plan.find(
      (item) => item.id === id
    );

    setPlan((currentPlan) =>
      currentPlan.filter(
        (item) => item.id !== id
      )
    );

    if (workout) {
      toast.success(
        `${workout.name} marked as done!`
      );
    } else {
      toast.success("Workout marked as done!");
    }
  };

  // --------------------------------
  // SAVE WORKOUT
  // --------------------------------
  const saveWorkout = (workout: Workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.info("This workout is already saved.");
      return;
    }

    setSaved((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

    toast.success(
      `${workout.name} saved for later.`
    );
  };

  // --------------------------------
  // REMOVE SAVED WORKOUT
  // --------------------------------
  const removeSavedWorkout = (id: number) => {
    const workout = saved.find(
      (item) => item.id === id
    );

    setSaved((currentSaved) =>
      currentSaved.filter(
        (item) => item.id !== id
      )
    );

    if (workout) {
      toast.info(
        `${workout.name} removed from saved workouts.`
      );
    } else {
      toast.info("Workout removed from saved.");
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        markAsDone,
        saveWorkout,
        removeSavedWorkout,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

// --------------------------------
// CUSTOM HOOK
// --------------------------------
export function useFitness() {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error(
      "useFitness must be used inside FitnessProvider"
    );
  }

  return context;
}