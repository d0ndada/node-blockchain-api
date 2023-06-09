const { v4: uuidv4 } = require("uuid");

class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4();
    this.outputMap = this.createMap({ sender, recipient, amount });
    this.input = this.createMapInput({ sender, outputMap: this.outputMap });
  }

  createMap({ sender, recipient, amount }) {
    const map = {};
    map[recipient] = amount;
    map[sender.publicKey] = sender.balance - amount;
    return map;
  }

  createMapInput({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }
}

module.exports = Transaction;
