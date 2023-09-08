require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  // defaultNetwork: "sepolia",
  // networks: {
  //   hardhat: {},
  //   sepolia: {
  //     url: API_URL,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //     gasPrice: 27000000000,
  //   },
  // },
};
