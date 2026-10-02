import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkoutById } from "@/lib/api";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkoutById(Number(id));

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}