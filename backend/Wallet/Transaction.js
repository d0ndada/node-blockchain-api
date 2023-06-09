const { v4: uuidv4 } = require("uuid");

class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4();
  }
}

module.exports = Transaction;
