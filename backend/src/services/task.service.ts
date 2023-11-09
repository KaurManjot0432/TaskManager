import { TaskDAO } from '../dao/task.dao';
import { Task } from "../entities/Task";

export class TaskService {
    readonly taskDAO: TaskDAO

    constructor() {
        this.taskDAO = new TaskDAO()
    }

    public async createTask(task: Task): Promise<Task> {
        return await this.taskDAO.createtask(task);
    }

    public async findTaskByUserId(userId: number): Promise<Task[] | undefined> {
        return await this.taskDAO.findTaskByUserId(userId);
    }

    public async findTaskById(id: number): Promise<Task[] | undefined> {
        return await this.taskDAO.findTaskbyId(id);
    }
}