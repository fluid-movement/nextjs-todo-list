import { fetchListById, fetchTasks } from "@/lib/data";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import ListTasks from "@/app/lists/_components/list-tasks";

export default async function Page({ params }: { params: { id: string } }) {
  const tasks = await fetchTasks(params.id);

  return (
    <div className="mt-4 p-6">
      <ListTasks tasks={tasks} />
    </div>
  );
}
