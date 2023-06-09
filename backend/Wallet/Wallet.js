const { ec } = require("../utilities");
const { INITIAL_BALANCE } = require("../utilities/config");

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;

    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }
}

module.exports = Wallet;
