const { ethers } = require("hardhat");
async function main() {
  const TTWallet = await ethers.getContractFactory("TTWallet");
  const wallet = await TTWallet.deploy("main");
  console.log(await wallet.getAddress());
//   // const TTManager = await ethers.getContractFactory("TTWalletManager");
//   // const manager = await TTManager.deploy();
//   // console.log("manager address:", await manager.getAddress());
// }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// 0xA7C8b1736AC452C2640BEC001CdF2E2fF2909F86
// new manager
// 0xE2C1985a6286be66c13128531993fDb8D212c9c0
// new wallet
// 0xbc09A3353Abe350270DB5a36A01834e2c505Cbca
