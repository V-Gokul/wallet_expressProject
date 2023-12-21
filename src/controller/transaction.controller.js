import { TransactionsModel } from "../model/transaction.model.js";

const transactionsModel = new TransactionsModel();

export class TransactionController {
  async createTransaction(req, res) {
    try {
      const data = req.body;
      const wallet_id = req.params.wallet_id;
      if (data.type === "DEBIT" && data.amount > 0) {
        const current = await transactionsModel.getBalance(wallet_id);
        if (current < data.amount) {
          throw new Error(` insufficient balance`);
        }
      }
      const result = await transactionsModel.create(wallet_id, data);
      res.status(200).json({
        message: " transaction Created successfully",
        transactionId: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async getWalletTranscation(req, res) {
    try {
      const wallet_id = req.params.wallet_id;
      const result = await transactionsModel.getAll(wallet_id);
      res.status(200).json({
        message: "Transactions fetched Duccessfully",
        transactions: [result],
      });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async cancelTransaction(req, res) {
    try {
      const wallet_id = req.params.wallet_id;
      const transaction_id = req.params.transaction_id;
      console.log(".....1", wallet_id, ".....2", transaction_id);
      const result = await transactionsModel.cancel(wallet_id, transaction_id);
      res.status(200).json({
        message: "Ok",
        transactions: result,
      });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }
}
