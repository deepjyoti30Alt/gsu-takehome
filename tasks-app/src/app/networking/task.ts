/**
 * Store networking functions related to tasks.
 */

import { TasksFailedToFetchError } from "../lib/errors/TaskError";
import { Task } from "../types/task";

export const getTasks = async (auth: string): Promise<Task[]> => {
    /**
     * Fetch the tasks for the logged in user.
     */
    const res = await fetch("/api/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
        },
    });

    if (!res.ok) throw new TasksFailedToFetchError;

    const { tasks } = await res.json()
    return tasks;
}
