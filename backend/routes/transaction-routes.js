const express = require("express");
const router = express.Router();

const { transactions } = require("../controllers/blockchain-controller");

router.route("/").get(transactions);

module.exports = router;
