const createHash = require("./hash");

const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;
const INITIAL_BALANCE = 500;

const GENESIS_DATA = {
  timestamp: 1,
  data: "dummy data",
  hash: createHash(),
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: "######",
};

module.exports = { GENESIS_DATA, MINE_RATE, INITIAL_BALANCE };
