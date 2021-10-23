const hardhat = require('hardhat');
require('dotenv').config()

const {OWNER_ADDRESS} = process.env;

async function main() {
  const ArtAirdrop = await hardhat.ethers.getContractFactory("ArtAirdrop");
  const artToken = await ArtAirdrop.deploy(OWNER_ADDRESS);
  await artToken.deployed();
  console.log("ArtAirdrop SC deployed to:", artToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });