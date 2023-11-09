import { Router } from 'express';
import { UserControler } from '../controllers/user.controller';
import { validateUser, validateSignin } from '../middlewares/validations';

export class UserRouter {
  readonly router: Router = Router()
  readonly userController: UserControler

  constructor () {
    this.userController = new UserControler()
  }

  public initializeRoutes (): Router {
    this.router
      .route('/')
      .post(validateUser, this.userController.createUser)
    this.router
      .route('/signin')
      .post(validateSignin, this.userController.signin);

    return this.router
  }
}