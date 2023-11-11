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

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
    try {
      // Validate Request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({
          success: false,
          error: "Invalid Email"
        });
      }

      const user = await this.userService.createUser(req.body);
      const authToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
      res.status(201).send({ success: true, authToken, user });
    } catch (err) {
      console.log(err);
      // Check if the error is a QueryFailedError related to a duplicate email
      if (err.name === 'QueryFailedError' && err.message.includes("Duplicate entry")) {
        res.status(400).json({ success: false, error: 'Email already exists.' });
      } else {
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate Request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        res.status(400).json({
          success: false,
          error: "Invalid Email"
        });
        return;
      }

      // Find user by email
      const savedUser = await this.userService.findUserByEmail(req.body.email);

      if (savedUser.length === 0) {
        res.status(400).json({
          success: false,
          error: "Enter valid credentials!"
        });
        return;
      }

      // Compare password
      const currUser = savedUser[0];
      const checkPassword = await bcrypt.compare(req.body.password, currUser.password);

      if (!checkPassword) {
        res.status(400).json({
          success: false,
          error: "Enter valid credentials!"
        });
        return;
      }

      // Return jwt as response
      const user = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        password: currUser.password,
        id: currUser.id
      };

      const authToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
      res.status(201).send({ success: true, authToken, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internnal Server Error" });
    }
  };


}