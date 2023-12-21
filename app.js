import express from "express";
import bodyParser from "body-parser";
import pool from "./src/config/db.config.js";
import walletRouter from "./src/routes/wallet.routes.js";
import transactionRouter from "./src/routes/transaction.routes.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/wallets", walletRouter);
app.use("/transaction", transactionRouter);
pool.connect((err) => {
  if (err) {
    console.log("Error occured on Pg:", err);
    process.exit(1);
  } else {
    console.log("Connected to PostgressSql");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
});
