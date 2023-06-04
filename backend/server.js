const express = require("express");
const axios = require("axios");
const Blockchain = require("./blockchain/Blockchain");
const Blocks = require("./routes/blockchain-routes");
const cors = require("cors");

const app = express();

const blockchain = new Blockchain();

const DEFAULT_PORT = 5000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//SYNC data at startup
const syncData = async () => {
  try {
    const url = `${ROOT_ADDRESS}/api/1/blocks`;
    const { data } = await axios.get(url);
    blockchain.replaceChain(data);
  } catch (err) {
    console.log("Error", err);
  }
};

// MIDDLEWARE

app.use(express.json());

app.use(cors());

//ENDPOINTS

app.use("/api/1/blocks", Blocks);

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running and listening on port ${PORT}`);
  syncData();
});
