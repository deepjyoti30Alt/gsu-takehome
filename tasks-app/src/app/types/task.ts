export enum Priority {
    MEDIUM = "medium",
    LOW = "low",
    HIGH = "high"
}

export enum Status {
    NOT_STARTED = 'not-started',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    SKIPPED = 'skipped'
};

export interface BaseTask {
    title: string
    priority: Priority | null
    status: Status
    due_at: Date | null
}

export interface BaseTaskWithId extends BaseTask {
    task_id: string
}

export interface Task extends BaseTask {
    task_id: string
    createdAt: Date
    updatedAt: Date
    is_due: boolean
}

export interface TaskWithContent extends Task {
    content: string | null
}
