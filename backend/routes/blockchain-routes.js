const express = require("express");
const router = express.Router();

const { blocks, addBlock } = require("../controllers/blockchain-controller");

router.route("/").get(blocks).post(addBlock);
// router.route("/").get(transactions).post(addBlock);

module.exports = router;
