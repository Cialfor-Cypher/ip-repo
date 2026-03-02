import mysql from 'mysql2/promise';

declare global {
  // Prevent multiple pools in dev (Next.js hot reload)
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== 'production') {
  global.mysqlPool = pool;
}

export default pool;
