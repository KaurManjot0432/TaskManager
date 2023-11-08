import dbConfig from "../config/db.config";
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool(dbConfig);

export default pool;
