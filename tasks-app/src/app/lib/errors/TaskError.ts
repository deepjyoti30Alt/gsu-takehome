/**
 * Define all errors related to tasks.
 */

export class TasksFailedToFetchError extends Error {
    constructor() {
        super('Failed to fetch tasks');
    }
}
