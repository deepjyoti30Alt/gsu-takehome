import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from '../api/enums/Priority';
import { Status } from '../api/enums/Status';

export class BaseTask {
    @IsNotEmpty()
    public title: string

    @IsOptional()
    public content: string | null

    @IsOptional()
    public priority: Priority | null
}

export class TaskCreateDetails extends BaseTask {
    public status: Status | null
}

export class Task extends BaseTask {
    @IsUUID()
    public task_id: string

    @IsNotEmpty()
    public status: Status

    @IsNotEmpty()
    public createdAt: Date

    @IsNotEmpty()
    public updatedAt: Date
}

export class PaginatedTask {
    public tasks: Task[]

    @IsNotEmpty()
    public size: number

    @IsNotEmpty()
    public page: number

    @IsNotEmpty()
    public totalCount: number

    constructor(tasks: Task[], size: number, page: number, totalCount: number) {
        this.tasks = tasks;
        this.size = size;
        this.page = page;
        this.totalCount = totalCount;
    }
}
