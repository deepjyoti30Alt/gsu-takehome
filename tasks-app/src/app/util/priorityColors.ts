import { Priority } from "../types/task";

export const PRIORITY_TO_COLOR_MAP: {[key in Priority]: string} = {
    [Priority.LOW]: 'border-green-300',
    [Priority.MEDIUM]: 'border-yellow-300',
    [Priority.HIGH]: 'border-red-500'
};

export const getColorForPriority = (priority: Priority | null = null): string => {
    if (!priority) return ''
    return PRIORITY_TO_COLOR_MAP[priority]
}