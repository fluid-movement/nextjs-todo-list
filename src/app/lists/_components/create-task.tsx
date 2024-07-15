"use client";

import {useForm} from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {TaskLists} from "@/lib/types";
import {createNewTask} from "@/lib/actions";

const formSchema = z.object({
    description: z.string().min(3).max(255),
    list: z.string(),
});

export default function CreateTask({taskLists}: { taskLists: TaskLists }) {
    const pathname: string = usePathname() ?? "";

    let listId = pathname.split("/").pop() ?? "";
    if (listId === "lists") {
        listId = "";
    }

    let listTitle = '';
    if (listId) {
        const list = taskLists.find((list) => list.id === listId);
        listTitle = list?.name ?? '';
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            list: listId,
        },
    });

    useEffect(() => {
        // Update the form's default values when the route changes
        form.reset({
            ...form.getValues(), // This maintains the current form state (optional)
            list: listId, // Update the default value for the list field
        });
    }, [form, listId]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create a new task {listTitle && "in " + listTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        action={createNewTask}
                        className="flex gap-4 justify-between"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="grow">
                                    <FormControl>
                                        <Input
                                            placeholder="Get it out of your system"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <ListDropDown
                            currentListId={listId}
                            form={form}
                            taskLists={taskLists}
                        />
                        <Button type="submit">Create Task</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

function ListDropDown({
                          currentListId,
                          form,
                          taskLists,
                      }: {
    currentListId: string;
    form: any;
    taskLists: TaskLists;
}) {
    if (currentListId) {
        return (
            <FormField
                control={form.control}
                name="list"
                render={({field}) => (
                    <Input
                        {...field}
                        value={currentListId}
                        readOnly={true}
                        type="hidden"
                        hidden={true}
                    />
                )}
            />
        );
    } else {
        return (
            <FormField
                control={form.control}
                name="list"
                render={({field}) => (
                    <FormItem>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {taskLists.map((list) => (
                                    <SelectItem
                                        key={list.id}
                                        value={list.id.toString()}
                                    >
                                        {list.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        );
    }
}
