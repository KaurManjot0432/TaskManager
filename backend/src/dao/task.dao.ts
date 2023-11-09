import { Task } from '../entities/Task';
import { AppDataSource } from '../database/dataSource';
import { Repository } from 'typeorm'

export class TaskDAO {
    readonly taskRepository: Repository<Task>

    constructor() {
        this.taskRepository = AppDataSource.getRepository(Task)
    }

    public createtask(task: Task): Promise<Task> {
        return this.taskRepository.save(task);
    }

    public findTaskByUserId(userId: number): Promise<Task[] | undefined> {
        return this.taskRepository.findBy({ userId });
    }

    public findTaskbyId(id: number): Promise<Task[] | undefined> {
        return this.taskRepository.findBy({ id });
    }
}