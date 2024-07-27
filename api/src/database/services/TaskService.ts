import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { v4 as uuidv4 } from 'uuid';

import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../models/Task';
import { TaskNotFoundError } from '../../api/errors/TaskNotFoundError';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}

@Service()
export class TaskService {

    constructor(
        @OrmRepository() private taskRepository: TaskRepository,
    ) { }

    public findById(id: string, userId: string): Promise<Task | undefined> {
        return this.taskRepository.findOne({
            where: {
                task_id: id,
                user_id: userId
            }
        });
    }

    public async create(task: Task): Promise<Task> {
        /**
         * Create the task based on the passed details
         */
        task.task_id = uuidv4();
        const newUser = await this.taskRepository.save(task);
        return newUser;
    }

    public async update(id: string, userId: string, updateData: Partial<Task>): Promise<undefined> {
        /**
         * Update the task based on the passed details.
         * 
         * This will support partial updates (ie: PATCH)
         */
        const task = await this.findById(id, userId);
        if (!task) {
            throw new TaskNotFoundError;
        }

        Object.assign(task, updateData);
        await this.taskRepository.save(task);
    }

    public async delete(id: string, userId: string): Promise<undefined> {
        const result = await this.taskRepository.delete({ task_id: id, user_id: userId });
        if (result.affected === 0) {
            throw new TaskNotFoundError;
        }
    }

    public async findAllByUserId(userId: string, page: number, size: number): Promise<{ tasks: Task[], total: number }> {
        /**
         * Find all the tasks for the passed user ID with the page and size limit.
         */
        const [tasks, total] = await this.taskRepository.findAndCount({
            where: { user_id: userId },
            skip: (page - 1) * size,
            take: size
        });
        return { tasks, total };
    }
}
