const { v4: uuidv4 } = require("uuid");

class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4();
    this.outputMap = this.createMap({ sender, recipient, amount });
  }

  createMap({ sender, recipient, amount }) {
    const map = {};
    map[recipient] = amount;
    map[sender.publicKey] = sender.balance - amount;
    return map;
  }
}

module.exports = Transaction;
