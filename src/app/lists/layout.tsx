import CreateTask from "@/app/lists/_components/create-task";
import {fetchLists} from "@/lib/data";
import {notFound} from "next/navigation";
import {Card} from "@/components/ui/card";
import ListLists from "@/app/lists/_components/list-lists";

export default async function TaskListsLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const taskLists = await fetchLists();

    if (!taskLists) {
        return notFound();
    }

    return (
        <div className="grow flex my-4 gap-4">
            <Card className="w-1/4 p-4">
                <ListLists taskLists={taskLists}/>
            </Card>
            <section className="w-full">
                <CreateTask taskLists={taskLists}/>
                {children}
            </section>
        </div>
    );
}