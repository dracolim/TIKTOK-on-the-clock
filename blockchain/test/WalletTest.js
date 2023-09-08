const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");

describe("TTWallet", function () {
  beforeEach(async function () {
    ttid = "abc";

    [owner] = await ethers.getSigners();
    TTWallet = await ethers.getContractFactory("TTWallet");
    testWallet = await TTWallet.deploy(ttid);
    testWalletAddress = await testWallet.getAddress();
    provider = await ethers.getDefaultProvider();
  });

  // ttid, pin
  describe("Receive", function () {
    it("Test Wallet balance should be 0", async function () {
      const walletBalance = await testWallet.getBalance();
      expect(walletBalance).to.equal(0);
    });
    it("Test Wallet balance should increase by 1 eth", async function () {
      const tx = {
        to: testWalletAddress,
        value: ethers.parseEther("1"),
      };

      const transaction = await owner.sendTransaction(tx);
      walletBalance = await testWallet.getBalance();
      expect(ethers.parseEther("1")).to.equal(walletBalance);
    });
  });
});

describe("TTWalletManager", function () {
  beforeEach(async function () {
    sellerTtid = "abc";

    buyerTtid = "def";

    [add1, seller, buyer] = await ethers.getSigners();
    TTWallet = await ethers.getContractFactory("TTWallet");
    TTWalletManager = await ethers.getContractFactory("TTWalletManager");

    sellerWallet = await TTWallet.deploy(sellerTtid);
    // buyerWallet = await TTWallet.deploy(buyerTtid, buyerPin);
    sellerAddress = await sellerWallet.getAddress();
    // buyerAddress = await buyerWallet.getAddress();
    walletManager = await TTWalletManager.deploy();
    provider = await ethers.getDefaultProvider();
  });

  it("Contract balances should be 0", async function () {
    const sellerBalance = await sellerWallet.getBalance();
    expect(sellerBalance).to.equal(0);
    const managerBalance = await walletManager.getBalance();
    expect(managerBalance).to.equal(0);
  });
  describe("Register", function () {
    it("Seller Registered", async function () {
      const register = await walletManager.register(sellerTtid);
      expect(register)
        .to.emit(walletManager, "SellerRegistered")
        .withArgs(sellerTtid);
    });
  });
  describe("Deposit", function () {
    it("Buyer Deposited", async function () {
      const deposit = await walletManager.buyerDeposit(sellerTtid, buyerTtid, {
        value: ethers.parseEther("1"),
      });
      expect(deposit)
        .to.emit(walletManager, "BuyerDeposited")
        .withArgs(sellerTtid, buyerTtid);
      sellerBalance = await walletManager.getSellerBalance(sellerTtid);

      expect(sellerBalance).to.equal(ethers.parseEther("1"));
    });
  });
});
