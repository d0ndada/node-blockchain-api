class TransactionPool {
  constructor() {
    this.TransactionMap = {};
  }
  addTransaction(transaction) {
    this.TransactionMap[transaction.id] = transaction;
  }
  transactionExist({ address }) {
    const transaction = Object.values(this.TransactionMap);
    return transaction.find(
      (transaction) => transaction.input,
      address === address
    );
  }
}

module.exports = TransactionPool;
