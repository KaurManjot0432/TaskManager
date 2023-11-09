import { Router } from 'express';
import { TaskControler } from '../controllers/task.controller';
import { validateTask } from '../middlewares/validation.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

export class TaskRouter {
    readonly router: Router = Router()
    readonly taskController: TaskControler

    constructor() {
        this.taskController = new TaskControler()
    }

    public initializeRoutes(): Router {
        this.router
            .route('/')
            .post(validateTask, verifyToken, this.taskController.createTask)
            .get(verifyToken, this.taskController.getFeedTask)
        this.router
            .route('/deleteTask/:id')
            .delete(verifyToken, this.taskController.deleteTask);
        this.router
            .route('/')

        return this.router
    }
}