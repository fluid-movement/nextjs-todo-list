"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { TaskList, TaskLists } from "@/lib/types";

export default function ListLists({ taskLists }: { taskLists: TaskLists }) {
    const pathname: string = usePathname() ?? "";
    const searchParams = useSearchParams();

    const [currentListId, setCurrentListId] = useState("");
    useEffect(() => {
        setCurrentListId(pathname.split("/").pop() ?? "");
    }, [pathname, searchParams]);

    return (
        <nav className="grid gap-2">
            {taskLists.map((list: TaskList) => (
                <Link
                    className={clsx(
                        "px-2 py-1 rounded-md w-full hover:bg-accent",
                        currentListId === list.id.toString() ? "bg-accent" : "",
                    )}
                    href={`/lists/${list.id}`}
                    key={list.id}
                >
                    <span>{list.name}</span>
                </Link>
            ))}
        </nav>
    );
}
