import pool from './db';

export async function testDbConnection() {
  const [rows] = await pool.query('SELECT 1 AS ok');
  return rows;
}
