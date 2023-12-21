import pool from "../config/db.config.js";

export class TransactionsModel {
  async create(wallet_id, data) {
    try {
      const transaction =
        "INSERT INTO transactions(wallet_id,type,amount) VALUES($1,$2,$3) RETURNING  id,wallet_id,type,amount,createdAt";
      const value = await pool.query(transaction, [
        wallet_id,
        data.type,
        data.amount,
      ]);

      const updateWalet =
        data.type === "CREDIT"
          ? "UPDATE wallets SET balance = balance + $1 WHERE id =$2"
          : "UPDATE wallets SET balance = balance - $1 WHERE id =$2";

      await pool.query(updateWalet, [data.amount, wallet_id]);
      return value.rows[0].id;
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async getAll(wallet_id) {
    try {
      const query = "SELECT * FROM transactions WHERE wallet_id= $1 ";
      const result = await pool.query(query, [wallet_id]);
      return result.rows;
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async getBalance(wallet_id) {
    try {
      const query = "SELECT * FROM wallets where id= $1";
      const data = await pool.query(query, [wallet_id]);
      return data.rows[0].balance;
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async cancel(wallet_id, transaction_id) {
    console.log("............", transaction_id);
    try {
      const transactionData =
        "SELECT * FROM transactions WHERE id =$1 AND wallet_id=$2";
      const trans = await pool.query(transactionData, [
        transaction_id,
        wallet_id,
      ]);
      if (trans.rows.length === 0) {
        throw new Error("Transaction not found");
      }
      const updateTransactionStatus =
        "UPDATE transactions SET status = 'CANCELLED'  WHERE id =$1  RETURNING status";
      const status = await pool.query(updateTransactionStatus, [
        transaction_id,
      ]);

      const { type, amount } = trans.rows[0];
      const updateWallet =
        type === "CREDIT"
          ? "UPDATE wallets SET balance = balance -$1 WHERE id = $2"
          : "UPDATE wallets SET balance = balance +$1 WHERE id = $2";
      await pool.query(updateWallet, [amount, wallet_id]);
      console.log(status.rows[0].status, "kkkkkkkkkkk");
      return {
        transaction_id: transaction_id,
        status: status.rows[0].status,
      };
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }
}
