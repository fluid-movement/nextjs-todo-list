import { Tables } from "@/types/supabase";

export type Task = Tables<"tasks">;
export type Tasks = Task[];

export type TaskList = Tables<"task_lists">;
export type TaskLists = TaskList[];