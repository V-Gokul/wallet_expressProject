import pkg from "pg";
const { Pool } = pkg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: "Wallet-Project",
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  user: "dev",
  host: "localhost",
  database: "Wallet-Project",
  password: "1234",
  port: "5432",
});

export default pool;
