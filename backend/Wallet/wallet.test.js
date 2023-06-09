const { verifySignature } = require("../utilities");
const Wallet = require("./Wallet");

describe("Wallet", () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it("should have a balance", () => {
    expect(wallet).toHaveProperty("balance");
  });
  it("should have a publickey", () => {
    expect(wallet).toHaveProperty("publicKey");
  });

  describe("signing data", () => {
    const data = "Avengers";

    it("should verify a valid signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });
  });
});
