const http = require("http");
const express = require("express");
const path = require("path");
const ethers = require("ethers");
const app = express();

const port = 3000;

async function createWallet(sellerTtId) {
  const TTWalletManager = await ethers.ContractFactory("TTWalletManager");
  const manager = TTWalletManager.attach(
    "0xE2C1985a6286be66c13128531993fDb8D212c9c0"
  );
  return manager.getBalance();

  // const manager = TTWalletManager.attach
  //   const MyContract = await ethers.getContractFactory("MyContract");
  // const contract = MyContract.attach(
  //   "0x..." // The deployed contract address
  // );

  // // Now you can call functions of the contract
  // await contract.doTheThing();
  // deploy wallet contract

  // register with manager
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/new-wallet/:ttId", (req, res) => {
  var ttId = req.params.ttId;
  var wallet = createWallet(ttId);
  res.send(wallet);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
