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

export interface Task {
    task_id: string
    title: string
    priority: Priority | null
    status: Status
    createdAt: Date
    updatedAt: Date
    due_at: Date | null
    is_due: boolean
}

export interface TaskWithContent extends Task {
    content: string | null
}
