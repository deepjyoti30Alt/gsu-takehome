import { IsUUID, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Priority } from '../api/enums/Priority';
import { Status } from '../api/enums/Status';
import { Expose, Transform } from 'class-transformer';

export class BaseTaskWithoutContent {
    @IsNotEmpty()
    public title: string

    @IsOptional()
    public priority: Priority | null
}

export class BaseTask extends BaseTaskWithoutContent {
    @IsOptional()
    public content: string | null
}

export class TaskCreateDetails extends BaseTask {
    @IsOptional()
    public status: Status | null

    @IsOptional()
    public due_at: Date | null
}

export class TaskWithoutContent extends BaseTaskWithoutContent {
    @IsUUID()
    public task_id: string

    @IsNotEmpty()
    public status: Status

    public due_at: Date | null

    @Expose()
    @Transform(({ obj }) => {
        if (!obj.due_at) return false;
        return ![Status.SKIPPED, Status.COMPLETED].includes(obj.status) && obj.due_at < new Date();
    })
    public is_due: boolean

    @IsNotEmpty()
    public createdAt: Date

    @IsNotEmpty()
    public updatedAt: Date
}

export class Task extends TaskWithoutContent {
    @IsOptional()
    public content: string | null
}

export class PaginatedTask {
    public tasks: TaskWithoutContent[]

    @IsNotEmpty()
    public size: number

    @IsNotEmpty()
    public page: number

    @IsNotEmpty()
    public totalCount: number

    constructor(tasks: TaskWithoutContent[], size: number, page: number, totalCount: number) {
        this.tasks = tasks;
        this.size = size;
        this.page = page;
        this.totalCount = totalCount;
    }
}


export class TaskUpdateDetails {
    @IsOptional()
    @IsString()
    public title?: string;

    @IsOptional()
    @IsString()
    public content?: string;

    @IsOptional()
    @IsEnum(Priority)
    public priority?: Priority;

    @IsOptional()
    @IsEnum(Status)
    public status?: Status;
}
