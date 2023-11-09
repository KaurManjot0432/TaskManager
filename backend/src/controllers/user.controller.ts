import { UserService } from '../services/user.service';
import { type NextFunction, type Request, type Response } from 'express';
var jwt = require('jsonwebtoken');

export class UserControler {
  readonly userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.createUser(req.body);
      const auth_token = jwt.sign(response, process.env.JWT_SECRET,  { expiresIn: '1800s' });
      res.status(201).send({ success: true, auth_token });
    } catch (err) {
      // Check if the error is a QueryFailedError related to a duplicate email
      if (err.name === 'QueryFailedError' && err.message.includes("Duplicate entry")) {
        res.status(400).json({ success: false, error: 'Email already exists.' });
      } else {
        next(err);
      }
    }
  };
  
}