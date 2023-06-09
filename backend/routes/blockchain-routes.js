const express = require("express");
const router = express.Router();

// const {
//   blocks,
//   addBlock,
//   transactions,
// } = require("../controllers/blockchain-controller");

const {
  blocks,
  addBlock,
  transactions,
} = require("../controllers/blockchain-controller");
router.route("/blocks").get(blocks).post(addBlock);
router.route("/transaction").get(transactions);

module.exports = router;
