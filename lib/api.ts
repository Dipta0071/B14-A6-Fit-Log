import { Workout } from "@/types/workout";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Workout[] = await response.json();

  return workouts;
}