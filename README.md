# Project setup


## Setup and tests

- Clone the project:
```
git clone https://github.com/VitalR/NFT-Airdrop.git
```
- Install the dependencies:
```
npm i
```
- Run the tests:
```
npm run test:
```
- Compile the contracts:
```
npm run compile
```

## Pre-deployment

- Add appropriate values for keys in .env file:
```
PRIVATE_KEY=''
OWNER_ADDRESS=''
ETHERSCAN_API_KEY=''
INFURA_PROJECT=''
PRIVATE_KEY_MAINNET=''
```
- Uncomment appropriate network in hardhat.config.js file and comment another one:
```
//  mainnet: {
       url: `https://mainnet.infura.io/v3/${INFURA_PROJECT}`,
       accounts: [PRIVATE_KEY_MAINNET]
    },
```

## Deployment

- Rinkeby:
```
npm run deploy:rinkeby
```
or
```
npx hardhat run scripts/deploy.js --network rinkeby
```
- Mainnet:
```
npm run deploy:mainnet
```
or
```
npx hardhat run scripts/deploy.js --network mainnet
```


## Verify and Publishing

- Rinkeby:
```
npx hardhat verify --network rinkeby <DEPLOYED_SC_ADDRESS> "OWNER_ADDRESS"
```

- Mainnet:
```
npx hardhat verify --network mainnet <DEPLOYED_SC_ADDRESS> "OWNER_ADDRESS"
```