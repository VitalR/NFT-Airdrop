require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

const {PRIVATE_KEY, INFURA_PROJECT, ETHERSCAN_API_KEY, PRIVATE_KEY_MAINNET} = process.env;

module.exports = {
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT}`,
      accounts: [PRIVATE_KEY]
    },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${INFURA_PROJECT}`,
    //   accounts: [PRIVATE_KEY_MAINNET]
    // },
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasPrice: "61000000000",
  gas: "auto",
  gasReporter: {
    gasPrice: 1,
    enabled: false,
    showTimeSpent: true
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
