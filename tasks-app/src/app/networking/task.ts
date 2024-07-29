/**
 * Store networking functions related to tasks.
 */

import { TasksFailedToFetchError } from "../lib/errors/TaskError";
import { BaseTask, Task } from "../types/task";

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

export const createTask = async (task: BaseTask, authToken: string): Promise<Task> => {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Basic ${authToken}`
        },
        body: JSON.stringify(task),
    })
    if (!response.ok) {
        throw new Error('Failed to add task')
    }
    const data = await response.json()
    return data
}

export const updateTask = async (task: BaseTask, authToken: string, task_id: string): Promise<void> => {
    const response = await fetch(`/api/tasks/${task_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${authToken}`
        },
        body: JSON.stringify(task)
    });
    if (!response.ok) {
        throw new Error('Failed to update task')
    }
    return
}

export const getTask = async (authToken: string, task_id: string): Promise<Task> => {
    /**
     * Fetch the entire task from upstream and return it based on the passed task_id.
     */
    const response = await fetch(`/api/tasks/${task_id}`, {
        headers: {
            'Authorization': `Basic ${authToken}`
        }
    });
    if (!response.ok) throw new Error('Failed to get task');

    return await response.json();
}
