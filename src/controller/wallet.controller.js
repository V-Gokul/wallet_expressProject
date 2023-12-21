import { WalletModel } from "../model/wallet.model.js";

const walletModel = new WalletModel();

export class WalletController {
  async createWallet(req, res) {
    try {
      const { name } = req.body;
      const data = await walletModel.creatWallet(name); // Corrected function name
      res
        .status(200)
        .json({ message: " Wallet Created successfully", wallet: data });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async getWallets(req, res) {
    try {
      const data = await walletModel.getAllWallet();
      res.status(200).json({ message: "jw", wallets: data });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async getWalletId(req, res) {
    try {
      const id = req.params.id;
      const data = await walletModel.getWallet(id);
      res.status(200).json({ message: "slgjl", wallet: data });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async updateWallet(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await walletModel.update(id, data);
      res.status(200).json({ message: "slgrggjl", wallet: result });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }

  async deleteWallet(req, res) {
    try {
      const id = req.params.id;
      const result = await walletModel.delete(id);
      res.status(200).json({ message: "slgrggjl", wallet: result });
    } catch (err) {
      console.log(`err ${err}`);
      throw err;
    }
  }
}
