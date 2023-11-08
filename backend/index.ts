import express from 'express';
import pool from "./src/db/index";

const app = express();
const port = 3001;

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM test');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
