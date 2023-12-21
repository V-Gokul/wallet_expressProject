import express from "express";
import { TransactionController } from "../controller/transaction.controller.js";
const transactionRouter = express.Router();

const transactionController = new TransactionController();

transactionRouter.post(
  "/wallet/:wallet_id",
  transactionController.createTransaction
);

transactionRouter.get(
  "/wallet/:wallet_id",
  transactionController.getWalletTranscation
);

transactionRouter.delete(
  "/:transaction_id/wallet/:wallet_id",
  transactionController.cancelTransaction
);
export default transactionRouter;
