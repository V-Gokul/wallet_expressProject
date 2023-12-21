import pool from "../config/db.config.js";

const alterTable = `
ALTER TABLE wallets ADD COLUMN name VARCHAR(20), ADD COLUMN updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
`;

pool.query(alterTable, (err, res) => {
  if (err) {
    console.error(`err altering table: ${err}`);
  } else {
    console.log(`Table altered successfully`);
  }
});
