const express = require("express");
const router = express.Router();

const {
  listBlockchain,
  addBlock,
} = require("../controllers/blockchain-controller");

router.route("/").get(listBlockchain).post(addBlock);

module.exports = router;
