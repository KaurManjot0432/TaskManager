import { TaskService } from '../services/task.service';
import { type NextFunction, type Request, type Response } from 'express';
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

}