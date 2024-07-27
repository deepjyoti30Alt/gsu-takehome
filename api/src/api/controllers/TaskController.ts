import {
    Authorized, Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Patch, Post, QueryParam, Req
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { TaskService } from '../../database/services/TaskService';
import { PaginatedTask, Task, TaskCreateDetails, TaskUpdateDetails, TaskWithoutContent } from '../../schema/Task';
import { Task as TaskModel } from '../../database/models/Task';
import { plainToClass } from 'class-transformer';
import { TaskNotFoundError } from '../errors/TaskNotFoundError';
import { Logger, LoggerInterface } from '../../decorators/Logger';


@Authorized()
@JsonController('/tasks')
export class UserController {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
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
        this.log.info("Creating new task");
        const newTask = plainToClass(TaskModel, body)
        newTask.user_id = req.user.id
        const createdTaskModel = await this.taskService.create(newTask);
        return plainToClass(Task, createdTaskModel);
    }

    @Patch("/:task_id")
    @HttpCode(204)
    @OnUndefined(204)
    public async updateTask(
        @Req() req: any,
        @Param('task_id') id: string,
        @Body() body: TaskUpdateDetails
    ): Promise<undefined> {
        this.log.info("Updating task for logged in user");
        return this.taskService.update(id, req.user.id, body);
    }

    @Get("/:task_id")
    @ResponseSchema(Task)
    @OnUndefined(TaskNotFoundError)
    public async getTask(
        @Req() req: any,
        @Param('task_id') id: string
    ): Promise<Task | undefined> {
        this.log.info("Getting task by id")
        const task = this.taskService.findById(id, req.user.id)
        if (!task) return task;

        return plainToClass(Task, task);
    }

    @Delete("/:task_id")
    @HttpCode(204)
    @OnUndefined(204)
    public async deleteTask(
        @Req() req: any,
        @Param('task_id') id: string
    ): Promise<undefined> {
        /**
         * Delete the task based on the passed ID for the logged in user.
         * 
         * A 404 will be thrown if task is not found.
         */
        this.log.info("Deleting task by id")
        return this.taskService.delete(id, req.user.id);
    }
}