"use server";

import { createClient } from "@/lib/supabase/server";
import {TaskLists, Tasks} from "./types";

export async function fetchLists() {
    const supabase = createClient();
    const { data: taskLists } = await supabase
        .from("task_lists")
        .select()
        .returns<TaskLists>()
        .order("date_created", { ascending: false });

    return taskLists ?? [];
}

export async function fetchListById(id: string) {
    const supabase = createClient();
    const { data: taskList } = await supabase
        .from("task_lists")
        .select()
        .eq("id", id)
        .returns<TaskLists>()
        .single();
    return taskList ?? null;
}

export async function fetchTasks(listId: string) {
    const supabase = createClient();
    const { data: tasks } = await supabase
        .from("tasks")
        .select()
        .eq("task_lists_id", listId)
        .returns<Tasks>()
        .order("date_created", { ascending: false });
    return tasks ?? [];
}
