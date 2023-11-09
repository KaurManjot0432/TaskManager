// import { type RequestHandler, type NextFunction, type Request, type Response } from 'express'
// import { AuthMiddleware } from '../middlewares/auth.middleware'

// export class AuthControler {
//   readonly auth: AuthMiddleware

//   constructor () {
//     this.auth = new AuthMiddleware()
//     this.generateToken = this.generateToken.bind(this)
//   }

//   public generateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
//     res.status(200)
//       .send(this.auth.generateToken())
//   }
// }