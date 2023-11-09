import { Router } from 'express';
import { UserControler } from '../controllers/user.controller';

export class UserRouter {
  readonly router: Router = Router()
  readonly userController: UserControler

  constructor () {
    this.userController = new UserControler()
  }

  public initializeRoutes (): Router {
    this.router
      .route('/')
      .post(this.userController.createUser)

    return this.router
  }
}