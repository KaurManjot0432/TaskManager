import { TaskService } from '../services/task.service';
import { NextFunction, Request, Response } from 'express';
const { validationResult } = require('express-validator');

export class TaskControler {
    readonly taskService: TaskService

    constructor() {
        this.taskService = new TaskService()
    }

    public createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            //validate Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            }
            //create Task
            const response = await this.taskService.createTask(req.body);
            res.status(201).send({ success: true, response });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    };

    public deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleteResult = await this.taskService.deleteTaskById(id);
            res.status(201).send({ success: true, deleteResult });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    };

    public getFeedTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await this.taskService.findTaskByUserId(req.body.userId);
            res.status(201).send({ success: true, response });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    }

    public editTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const response = await this.taskService.editTaskById(id, req.body);
            res.status(201).send({ success: true, response });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    }
}