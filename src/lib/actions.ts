"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { Task } from "./types";
import { usePathname } from "next/navigation";

export async function createNewTask(formData: FormData) {
    const description = formData.get("description") as string;
    const list = formData.get("list") as string;

    const supabase = createClient();
    const { error } = await supabase.from("tasks").insert([
        {
            id: createUUID(),
            description: description,
            task_lists_id: list,
        },
    ]);

    console.log("Error", error);
    revalidatePath("/tasks/" + list);
    return error;
}

export async function deleteTask(formData: FormData) {
    const id = formData.get("id") as string;
    const list = formData.get("list") as string;
    
    const supabase = createClient();
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    console.log("Error", error);
    revalidatePath("/tasks/" + list);
    return error;
}

export async function updateTask(formData: FormData) {
    const id = formData.get("id") as string;
    const description = formData.get("description") as string;
    const list = formData.get("list") as string;

    const supabase = createClient();
    const { error } = await supabase.from("tasks").update({ description }).eq("id", id);

    console.log("Error", error);
    revalidatePath("/tasks/" + list);
    return error;
}

export async function updateDoneStatus(formData: FormData) {
    const id = formData.get("id") as string;
    const done_status = formData.get("done") === "true";
    const list = formData.get("list") as string;

    const supabase = createClient();
    const { error } = await supabase.from("tasks").update({ done_status }).eq("id", id);

    console.log("Error", error);
    revalidatePath("/tasks/" + list);
    return error;
}

function createUUID() {
    return crypto.randomUUID();
}
