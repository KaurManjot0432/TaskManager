import { Task } from '../entities/Task';
import { AppDataSource } from '../database/dataSource';
import { Repository, DeleteResult } from 'typeorm'

export class TaskDAO {
    readonly taskRepository: Repository<Task>

    constructor() {
        this.taskRepository = AppDataSource.getRepository(Task)
    }

    public createTask(task: Task): Promise<Task> {
        return this.taskRepository.save(task);
    }

    public async findTaskByUserId(userId: string): Promise<Task[] | undefined> {
        return this.taskRepository
            .createQueryBuilder('task')
            .where('task.userId = :userId', { userId })
            .getMany();
    }

    public findTaskbyId(id: string): Promise<Task[] | undefined> {
        return this.taskRepository.findBy({ id });
    }

    public deleteTask(id: string): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}