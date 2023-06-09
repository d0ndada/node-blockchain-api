const cors = require("cors");
const express = require("express");
const axios = require("axios");
const Blockchain = require("./blockchain/Blockchain");
const Blocks = require("./routes/blockchain-routes");
const Transactions = require("./routes/transaction-routes");
const TransactionPool = require("./Wallet/TransactionPool");
const Wallet = require("./Wallet/Wallet");
const Broker = require("./messageBroker/Broker");

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const messageBroker = new Broker(blockchain, transactionPool);

const DEFAULT_PORT = 5000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//SYNC data at startup
const syncData = async () => {
  try {
    const blockchainUrl = `${ROOT_ADDRESS}/api/1/blocks`;
    const transactionMapUrl = `${ROOT_ADDRESS}/api/1/Transaction`;
    let result = await axios.get(blockchainUrl);

    blockchain.replaceChain(result.data);
    console.log("Synchronizing at startup");

    result = await axios.get(transactionMapUrl);
    const transactions = result.data;
    console.log("Synchronizing at startup");
    transactionPool.replacePool(transactions);
  } catch (err) {
    console.log("Error", err);
  }
};

// MIDDLEWARE
app.use(express.json());
app.use(cors());

//ENDPOINTS
app.use("/api/1/blocks", Blocks);

app.post("/api/1/transaction", (req, res) => {
  try {
    const { recipient, amount } = req.body;
    let transaction = transactionPool.transactionExist({
      address: wallet.publicKey,
    });
    if (transaction) {
      transaction.update({ sender: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({ amount, recipient });
    }

    transactionPool.addTransaction(transaction);
    messageBroker.broadcastTransaction(transaction);
    res.status(201).json({ status: "Success", data: transactionPool });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

app.get("/api/1/transaction", (req, res) => {
  res.status(200).json(transactionPool.transactionMap);
});

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running and listening on port ${PORT}`);
  syncData();
});
