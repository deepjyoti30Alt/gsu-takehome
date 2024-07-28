/**
 * Define all errors related to tasks.
 */

export class TasksFailedToFetchError extends Error {
    constructor() {
        super('Failed to fetch tasks');
    }
}

export class TaskCreateError extends Error {
    constructor() {
        super('Failed to create task');
    }
}

export class TaskUpdateError extends Error {
    constructor() {
        super('Failed to update task');
    }
}
