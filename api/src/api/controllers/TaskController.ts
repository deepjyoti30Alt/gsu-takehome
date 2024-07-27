import {
    Authorized, Body, Get, JsonController, Post, QueryParam, Req
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { TaskService } from '../../database/services/TaskService';
import { PaginatedTask, Task, TaskCreateDetails } from '../../schema/Task';
import { Task as TaskModel } from '../../database/models/Task';
import { plainToClass } from 'class-transformer';


@Authorized()
@JsonController('/tasks')
export class UserController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get("/")
    @ResponseSchema(PaginatedTask)
    public async getTasksForUser(
        @Req() req: any,
        @QueryParam('page') page: number = 1,
        @QueryParam('size') size: number = 10
    ): Promise<PaginatedTask> {
        /**
         * Get all the tasks for the logged in user.
         */
        const userId = req.user.id
        const { tasks, total } = await this.taskService.findAllByUserId(userId, page, size);
        return new PaginatedTask(tasks, size, page, total)
    }

    @Post("/")
    @ResponseSchema(Task)
    public async createTask(
        @Req() req: any,
        @Body() body: TaskCreateDetails
    ): Promise<Task> {
        /**
         * Create the task based on the passed details.
         */
        const newTask = plainToClass(TaskModel, body)
        newTask.user_id = req.user.id
        const createdTaskModel = await this.taskService.create(newTask);
        return plainToClass(Task, createdTaskModel);
    }
}