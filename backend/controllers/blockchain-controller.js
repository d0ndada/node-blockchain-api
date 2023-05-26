const Broker = require("../messageBroker/Broker");
// const axios = require("axios");
const Blockchain = require("../blockchain/Blockchain");

const blockchain = new Blockchain();
const messageBroker = new Broker(blockchain);

exports.listBlockchain = async (req, res) => {
  res.status(200).json(blockchain.chain);
};

exports.addBlock = async (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock({ data });
  messageBroker.broadcast(block);
  res.status(201).json({ message: "Added new block", block: block });
};
