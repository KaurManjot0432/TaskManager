import { TaskDAO } from '../dao/task.dao';
import { Task } from "../entities/Task";
import { DeleteResult, UpdateResult } from 'typeorm';

export class TaskService {
    readonly taskDAO: TaskDAO

    constructor() {
        this.taskDAO = new TaskDAO()
    }

    public async createTask(task: Task): Promise<Task> {
        return await this.taskDAO.createTask(task);
    }

    public async findTaskByUserId(userId: string): Promise<Task[] | undefined> {
        return await this.taskDAO.findTaskByUserId(userId);
    }

    public async findTaskById(id: string): Promise<Task[] | undefined> {
        return await this.taskDAO.findTaskbyId(id);
    }

    public async deleteTaskById(id: string): Promise<DeleteResult> {
        return await this.taskDAO.deleteTask(id);
    }

    public async editTaskById(id: string, updatedTask: Task): Promise<UpdateResult> {
        return await this.taskDAO.editTask(id, updatedTask);
    }
}