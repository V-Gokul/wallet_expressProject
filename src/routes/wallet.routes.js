import express from "express";
import { WalletController } from "../controller/wallet.controller.js";
const walletRouter = express.Router();

const walletController = new WalletController();

walletRouter.post("/", walletController.createWallet);
walletRouter.get("/", walletController.getWallets);
walletRouter.get("/:id", walletController.getWalletId);
walletRouter.put("/:id", walletController.updateWallet);
walletRouter.delete("/:id", walletController.deleteWallet);

export default walletRouter;
