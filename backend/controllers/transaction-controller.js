const Broker = require("../messageBroker/Broker");
const AppError = require("../utilities/AppError");
const Blockchain = require("../blockchain/Blockchain");
const catchErrorAsync = require("../utilities/catchErrorAsync");
const TransactionPool = require("../Wallet/TransactionPool");

// const response = {
//   status: "Not found",
//   statusCode: 404,
//   data: null,
//   error: null,
// };

// const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const messageBroker = new Broker(blockchain, transactionPool);

exports.transactions = catchErrorAsync(async (req, res) => {
  response.status = "Success";
  response.statusCode = 201;
  response.data = transactionPool.TransactionMap;

  res.status(200).json(transactionPool.TransactionMap);
});
