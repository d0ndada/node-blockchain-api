const Broker = require("../messageBroker/Broker");
const AppError = require("../utlilities/AppError");
const Blockchain = require("../blockchain/Blockchain");
const catchErrorAsync = require("../utlilities/catchErrorAsync");

const response = {
  status: "Not found",
  statusCode: 404,
  data: null,
  error: null,
};

const blockchain = new Blockchain();
const messageBroker = new Broker(blockchain);

exports.listBlockchain = catchErrorAsync(async (req, res) => {
  response.status = "Success";
  response.statusCode = 200;
  response.data = blockchain.chain;
  res.status(response.statusCode).json(response);
});

exports.addBlock = catchErrorAsync(async (req, res) => {
  if (!Object.keys(req.body).length) throw new AppError("No data sent!", 400);

  if (!req.body.data || !req.body.data.length > 0)
    throw new AppError("Data is missing!", 400);

  try {
    const { data } = req.body;
    const block = blockchain.addBlock({ data });
    messageBroker.broadcast(block);
    response.statusCode = 201;
    response.data = data;
    response.status = "Success";
    res
      .status(response.statusCode)
      .json({ message: "Added new block", response, block: block });
  } catch (error) {
    throw new AppError("Failed to add block!", 500);
  }
});
