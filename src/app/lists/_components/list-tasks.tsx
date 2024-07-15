"use client";

import {Separator} from "@/components/ui/separator";
import React, {useState} from "react";
import {Task, Tasks} from "@/lib/types";
import {CheckCheckIcon, PenIcon, TrashIcon} from "lucide-react";
import {deleteTask, toggleDone, updateDoneStatus, updateTask} from "@/lib/actions";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Toggle} from "@/components/ui/toggle";

export default function ListTasks({tasks}: { tasks: Tasks }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <React.Fragment key={index}>
                    <ListItem task={task}/>
                    {index < tasks.length - 1 && <Separator className="my-4"/>}
                </React.Fragment>
            ))}
        </ul>
    );
}

function ListItem({task}: { task: Task }) {
    const [editing, setEditing] = useState(false)
    const [done, setDone] = useState(task.done_status)

    function toggleEditing() {
        setEditing(!editing);
    }

    const toggleDone = async () => {
        setDone(!done);
        const formData = new FormData();
        formData.append("id", task.id);
        formData.append("done", (!done).toString());
        formData.append("list", task.task_lists_id);
        await updateDoneStatus(formData).then();
    }

    return (
        <li key={task.id} className="flex justify-between items-center">
            <ItemDescription task={task} editing={editing} toggleEditing={toggleEditing}/>
            <div className="flex items-center">
                <Toggle pressed={done} onPressedChange={toggleDone}>
                    <CheckCheckIcon/>
                </Toggle>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger><PenIcon onClick={toggleEditing}/></TooltipTrigger>
                        <TooltipContent>
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <form action={deleteTask}>
                    <input type="hidden" name="id" value={task.id}/>
                    <input type="hidden" name="list" value={task.task_lists_id}/>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger><TrashIcon type="submit" className="ml-2"/></TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>
            </div>
        </li>
    );
}

function ItemDescription(
    {task, editing, toggleEditing}:
        {
            task: Task,
            editing: boolean,
            toggleEditing: () => void
        }) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget instanceof HTMLFormElement
            ? event.currentTarget
            : event.target.form;

        if (!formElement) return;

        const formData = new FormData(formElement);
        await updateTask(formData);
        toggleEditing();
    };

    if (editing) {
        return (
            <form onSubmit={(e) => handleSubmit(e.currentTarget)} className="grow flex gap-4 mr-4">
                <input type="hidden" name="id" value={task.id}/>
                <input type="hidden" name="list" value={task.task_lists_id}/>
                <input className="grow px-4"
                       type="text"
                       name="description"
                       onBlur={(e) => {
                           handleSubmit(e).then();
                       }}
                       defaultValue={task.description}/>
                <button type="submit" className="border border-accent px-1 rounded-md">Save</button>
            </form>
        );
    } else {
        return (
            <span className="cursor-pointer px-4" onClick={toggleEditing}>{task.description}</span>
        );
    }
}