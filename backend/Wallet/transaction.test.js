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

  describe("input", () => {
    it("should have an input property", () => {
      expect(transaction).toHaveProperty("input");
    });
    it("should have an timestamp property", () => {
      expect(transaction.input).toHaveProperty("timestamp");
    });
    it("should set the amount to the sender balance", () => {
      expect(transaction.input.amount).toEqual(sender.balance);
    });
    it("should set the addesses to the senders publicKey", () => {
      expect(transaction.input.address).toEqual(sender.publicKey);
    });
    it("should sign the input", () => {
      expect(
        verifySignature({
          publicKey: sender.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        })
      ).toBe(true);
    });
  });
});
