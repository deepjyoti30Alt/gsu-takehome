import {
    Authorized, Body, Get, HttpCode, JsonController, OnUndefined, Param, Patch, Post, QueryParam, Req
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { TaskService } from '../../database/services/TaskService';
import { PaginatedTask, Task, TaskCreateDetails, TaskUpdateDetails, TaskWithoutContent } from '../../schema/Task';
import { Task as TaskModel } from '../../database/models/Task';
import { plainToClass } from 'class-transformer';
import { TaskNotFoundError } from '../errors/TaskNotFoundError';


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
        return new PaginatedTask(tasks.map((task) => {
            delete task.content
            return plainToClass(TaskWithoutContent, task);
        }), size, page, total)
    }

    @Post("/")
    @ResponseSchema(Task)
    @HttpCode(201)
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

    @Patch("/:task_id")
    @HttpCode(204)
    @OnUndefined(204)
    public async updateTask(@Param('task_id') id: string, @Body() body: TaskUpdateDetails): Promise<undefined> {
        return this.taskService.update(id, body);
    }

    @Get("/:task_id")
    @ResponseSchema(Task)
    @OnUndefined(TaskNotFoundError)
    public async getTask(@Param('task_id') id: string): Promise<Task | undefined> {
        const task = this.taskService.findById(id)
        if (!task) return task;

        return plainToClass(Task, task);
    }
}