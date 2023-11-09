import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: []
});