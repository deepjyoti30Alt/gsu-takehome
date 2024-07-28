import { Priority, Status } from "../types/task";

export const PRIORITY_TO_COLOR_MAP: {[key in Priority]: string} = {
    [Priority.LOW]: 'border-green-300',
    [Priority.MEDIUM]: 'border-yellow-300',
    [Priority.HIGH]: 'border-red-500'
};

export const PRIORITY_TO_BG_COLOR_MAP: {[key in Priority]: string} = {
    [Priority.LOW]: 'bg-green-300',
    [Priority.MEDIUM]: 'bg-yellow-300',
    [Priority.HIGH]: 'bg-red-500'
};

export const getColorForPriority = (priority: Priority | null = null, status: Status | null = null): string => {
    if (!priority) return ''
    const priorityColor = PRIORITY_TO_COLOR_MAP[priority]

    if (!status || ![Status.COMPLETED, Status.SKIPPED].includes(status)) return priorityColor;

    const statusColor = PRIORITY_TO_BG_COLOR_MAP[priority];
    return `${priorityColor} ${statusColor}`
}
