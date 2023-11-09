import { UserService } from '../services/user.service';
import { type NextFunction, type Request, type Response } from 'express';
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

export class UserControler {
  readonly userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //validate Request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
      }
      const response = await this.userService.createUser(req.body);
      const authToken = jwt.sign(response, process.env.JWT_SECRET, { expiresIn: '1800s' });
      res.status(201).send({ success: true, authToken });
    } catch (err) {
      // Check if the error is a QueryFailedError related to a duplicate email
      if (err.name === 'QueryFailedError' && err.message.includes("Duplicate entry")) {
        res.status(400).json({ success: false, error: 'Email already exists.' });
      } else {
        next(err);
      }
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //validate Request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      //find user by email
      const user = await this.userService.findUserByEmail(req.body.email);
      if (user.length == 0) {
        res.status(400).send({
          success: false,
          error: "Enter valid credentials!"
        });
      }

      //compare password
      const currUser = user[0];
      const checkPassword = await bcrypt.compare(req.body.password, currUser.password);

      if (!checkPassword) {
        res.status(400).json({
          success: false,
          error: "Enter valid credentials!"
        });
      }
      // return jwt as response
      const payload = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        password: currUser.password,
        id: currUser.id
      }
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1800s' });
      res.status(201).send({ success: true, authToken });
    } catch (err) {
      next(err);
    }
  }

}