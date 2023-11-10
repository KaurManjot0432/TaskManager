import express, { type Application, type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './src/database/dataSource';
import { UserRouter } from './src/routes/user.router';
import { TaskRouter } from './src/routes/task.router';
let cors = require("cors");

dotenv.config();

class App {
  public app: Application
  public port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? 5000

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors());

    this.initializeDb()
    this.initializeRoutes()
    this.initializeMiddlewares()
  }

  private initializeRoutes(): void {
    this.app.use('/user', new UserRouter().initializeRoutes());
    this.app.use('/task', new TaskRouter().initializeRoutes())
  }

  private initializeDb(): void {
    AppDataSource.initialize().then(() => {
      console.log("Connection initialized with database...");
    })
      .catch((error) => console.log(error));
  }

  private initializeMiddlewares(): void {
    this.app.use((err: Error, req: Request, res: Response, next: any) => {
      console.error(err)

      res.status(500).send({
        reason: err.message ?? 'Internal Server Error'
      })
    })
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at port : ${this.port}`)
    })
  }
}

const app = new App()
app.listen()