import pool from "../config/db.config.js";

export class WalletModel {
  async creatWallet(name) {
    try {
      const query =
        "INSERT INTO wallets (name) VALUES ($1) RETURNING id,name,balance,updatedAt";
      const values = [name];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async getAllWallet() {
    try {
      const query = "SELECT id, name, balance, updatedAt FROM wallets";
      const data = await pool.query(query);
      console.log(data);
      return data.rows;
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async getWallet(id) {
    try {
      const query =
        "SELECT id, name, balance, updatedAt FROM wallets WHERE id = $1";
      const data = await pool.query(query, [id]);

      return data.rows[0];
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async update(id, data) {
    try {
      const query = `UPDATE wallets SET name = COALESCE($1, name), balance = COALESCE($2, balance),updatedAt = NOW() WHERE id = $3 RETURNING id, name, balance`;

      const values = [data.name, data.balance, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async delete(id) {
    try {
      const query = "DELETE FROM wallets WHERE id =$1";
      const data = await pool.query(query, [id]);

      return data.rows[0];
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }
}

/* COALESCE($1, name);  is used to handle nullable feild . if $1 is null then the 2nd argument name pass the existing data on it
 */
