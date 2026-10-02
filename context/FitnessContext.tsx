"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { ToastContainer, toast } from "react-toastify";
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

const FitnessContext = createContext<
  FitnessContextType | undefined
>(undefined);

interface FitnessProviderProps {
  children: ReactNode;
}

export function FitnessProvider({
  children,
}: FitnessProviderProps) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // Add workout to today's plan
  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      const alreadyAdded = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyAdded) {
        toast.info("This workout is already in today's plan.");
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        toast.warning(
          "Today's plan can contain only 5 workouts."
        );
        return currentPlan;
      }

      toast.success("Added to today's plan.");

      return [...currentPlan, workout];
    });
  };

  // Remove workout
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    toast.success("Workout removed from today's plan.");
  };

  // Mark workout as done
  const markAsDone = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    toast.success("Workout marked as done.");
  };

  // Save workout
  const saveWorkout = (workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        toast.info("This workout is already saved.");
        return currentSaved;
      }

      toast.success("Workout saved for later.");

      return [...currentSaved, workout];
    });
  };

  // Remove saved workout
  const removeSavedWorkout = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );

    toast.success("Workout removed from saved.");
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

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="dark"
      />
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error(
      "useFitness must be used inside FitnessProvider"
    );
  }

  return context;
}