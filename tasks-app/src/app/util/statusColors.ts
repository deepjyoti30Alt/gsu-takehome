import { Status } from "../types/task";

export const STATUS_TO_COLOR_MAP: {[key in Status]: string} = {
    [Status.COMPLETED]: 'bg-green-300',
    [Status.SKIPPED]: 'bg-yellow-300',
    [Status.IN_PROGRESS]: '',
    [Status.NOT_STARTED]: ''
};

export const getColorForStatus = (status: Status | null = null): string => {
    if (!status) return ''
    return STATUS_TO_COLOR_MAP[status]
}
