# Smart Contract Deployment Guide

## Prerequisites

- Node.js and npm installed
- Dependencies installed (`npm install`)
- MetaMask configured (for testnet deployments)

## Local Deployment

### Step 1: Start Local Blockchain

Open a terminal and run:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum network on `http://127.0.0.1:8545`
- Create 20 test accounts with 10,000 ETH each
- Display private keys for testing

**Keep this terminal running!**

### Step 2: Deploy Contract

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Expected output:
```
✅ DecentralizedWebHost deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 3: Save Contract Address

Copy the contract address and update your `.env` file:

```bash
VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 4: Copy ABI to Frontend

```bash
cp artifacts/contracts/DecentralizedWebHost.sol/DecentralizedWebHost.json ../frontend/src/contracts/
```

### Step 5: Test the Contract

```bash
npx hardhat run scripts/interact.js --network localhost
```

This will deploy a test website and display the results.

## Testnet Deployment (Sepolia)

### Step 1: Get Testnet ETH

Visit [Sepolia Faucet](https://sepoliafaucet.com/) and request test ETH.

### Step 2: Configure Environment

Update `.env` file:

```bash
PRIVATE_KEY=your_metamask_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

**⚠️ Never commit your private key to Git!**

### Step 3: Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 4: Verify Contract (Optional)

Get an Etherscan API key from [etherscan.io](https://etherscan.io/apis)

Add to `.env`:
```bash
ETHERSCAN_API_KEY=your_api_key_here
```

Then run:
```bash
npx hardhat run scripts/verify.js --network sepolia
```

## Deployment Information

After deployment, information is saved to:
```
deployments/{network}-deployment.json
```

This file contains:
- Contract address
- Network name
- Deployer address
- Block number
- Timestamp

## Troubleshooting

### Error: "Cannot find module"
**Solution**: Run `npm install` in the smart-contracts directory

### Error: "Network not found"
**Solution**: Check `hardhat.config.js` has the correct network configuration

### Error: "Insufficient funds"
**Solution**: 
- For localhost: Restart Hardhat node
- For testnet: Get more test ETH from faucet

### Error: "Nonce too high"
**Solution**: Reset MetaMask account (Settings → Advanced → Reset Account)

## Contract Functions

### deployWebsite
```solidity
function deployWebsite(
    string memory _contentHash,
    string memory _projectName,
    string memory _description
) public returns (uint256)
```

### getDeploymentsByOwner
```solidity
function getDeploymentsByOwner(address _owner) 
    public view returns (uint256[] memory)
```

### getDeployment
```solidity
function getDeployment(uint256 _deploymentId) 
    public view returns (WebsiteDeployment memory)
```

## Gas Estimates

Approximate gas costs on Ethereum mainnet:

| Function | Gas Cost | ETH (at 30 gwei) |
|----------|----------|------------------|
| deployWebsite | ~150,000 | ~0.0045 ETH |
| getDeploymentsByOwner | ~30,000 | ~0.0009 ETH |
| getDeployment | ~25,000 | ~0.00075 ETH |

**Note**: Testnet gas is free!

## Security Considerations

1. **Private Keys**: Never share or commit private keys
2. **Input Validation**: Contract validates all inputs
3. **Access Control**: Only owners can deploy websites
4. **Gas Limits**: String lengths are limited to prevent excessive gas costs

## Next Steps

After deployment:
1. Update frontend configuration with contract address
2. Copy ABI to frontend
3. Test contract interaction from frontend
4. Deploy test websites

## Support

For issues:
- Check Hardhat documentation: https://hardhat.org/docs
- Review error messages carefully
- Ensure correct network configuration
- Verify sufficient funds for gas
