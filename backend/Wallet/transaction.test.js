const Transaction = require("./Transaction");
const Wallet = require("./Wallet");
const { verifySignature } = require("../utilities");

describe("Transaction", () => {
  beforeEach(() => {
    sender = new Wallet();
    recipient = "recipient-key";
    amount = 100;

    transaction = new Transaction({ sender, amount, recipient });
  });

  it("should have an id", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("outputMap", () => {
    it("should have an outputMap property", () => {
      expect(transaction).toHaveProperty("outputMap");
    });
    it("should display the amount to the recipient", () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });
    it("should display the balance to the sender", () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    });
  });
});
