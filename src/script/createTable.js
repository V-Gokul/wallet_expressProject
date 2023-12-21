import pool from "../config/db.config.js";

const createTable = `
CREATE TABLE IF NOT EXISTS wallets(
    id SERIAL PRIMARY KEY ,
    balance NUMERIC(10,2) NOT NULL DEFAULT 0,
    name VARCHAR(20),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INTEGER REFERENCES wallets(id),
    type VARCHAR(10) NOT NULL CHECK ( type IN ('CREDIT','DEBIT')),
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

`;

pool.query(createTable, (err, res) => {
  if (err) {
    console.log(`err on creating tables${err}`);
  } else {
    console.log(`Table created successfully `);
  }
});
