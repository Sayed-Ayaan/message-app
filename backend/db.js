import pg from 'pg'; 
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_LOCALHOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

pool.connect().then(()=> console.log('connected'));
export default pool;