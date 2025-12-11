# Setup Guide

Complete setup instructions for the Decentralized Web Hosting project.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** or **yarn**
   - Comes with Node.js
   - Verify: `npm --version`

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

4. **MetaMask Browser Extension**
   - Install from [metamask.io](https://metamask.io/)
   - Create a wallet if you don't have one

5. **IPFS** (Optional for local development)
   - Download from [ipfs.tech](https://docs.ipfs.tech/install/)
   - Verify: `ipfs --version`

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dwh-system
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
# For local development, you can use the default values
```

### 3. Install Smart Contract Dependencies

```bash
cd smart-contracts
npm install
cd ..
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 5. Start Local Blockchain

Open a new terminal and run:

```bash
cd smart-contracts
npx hardhat node
```

This will:
- Start a local Ethereum network on `http://127.0.0.1:8545`
- Display 20 test accounts with private keys
- Keep running in the background

**Important**: Keep this terminal open!

### 6. Deploy Smart Contract

Open another terminal and run:

```bash
cd smart-contracts
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Compile the smart contract
- Deploy it to the local network
- Display the contract address

**Copy the contract address** and update your `.env` file:
```
VITE_CONTRACT_ADDRESS=<deployed_contract_address>
```

### 7. Copy Contract ABI to Frontend

```bash
# From the project root
cp smart-contracts/artifacts/contracts/DecentralizedWebHost.sol/DecentralizedWebHost.json frontend/src/contracts/
```

### 8. Configure MetaMask

1. Open MetaMask extension
2. Click on the network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter the following details:
   - **Network Name**: Localhost 8545
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH
5. Click "Save"

### 9. Import Test Account to MetaMask

1. Copy a private key from the Hardhat node terminal (from step 5)
2. In MetaMask, click the account icon → "Import Account"
3. Paste the private key
4. Click "Import"

You should now see test ETH in your account!

### 10. Start IPFS Node (Optional)

If you want to run a local IPFS node:

```bash
# Make the script executable
chmod +x scripts/start-ipfs-node.sh

# Run the script
./scripts/start-ipfs-node.sh
```

Alternatively, you can use a public IPFS gateway (already configured in `.env.example`).

### 11. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will open at `http://localhost:3000`

## Verification

To verify everything is working:

1. **Blockchain**: Check that Hardhat node is running and showing blocks
2. **Contract**: Verify the contract address is in your `.env` file
3. **MetaMask**: Ensure you're connected to "Localhost 8545" network
4. **Frontend**: Open `http://localhost:3000` and see the application
5. **Wallet Connection**: Click "Connect Wallet" and approve in MetaMask

## Common Issues

### Issue: "Cannot connect to MetaMask"
**Solution**: Make sure MetaMask is installed and you're on the correct network (Localhost 8545)

### Issue: "Contract not deployed"
**Solution**: Run the deployment script again and update the contract address in `.env`

### Issue: "Transaction failed"
**Solution**: 
- Reset MetaMask account: Settings → Advanced → Reset Account
- Restart Hardhat node and redeploy contract

### Issue: "IPFS upload failed"
**Solution**: 
- Check if IPFS daemon is running
- Or use public IPFS gateway (update `VITE_IPFS_API_URL` in `.env`)

### Issue: "Port already in use"
**Solution**: 
- Kill the process using the port
- Or change the port in configuration files

## Testing

### Run Smart Contract Tests

```bash
cd smart-contracts
npm test
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Build Smart Contracts

```bash
cd smart-contracts
npm run compile
```

### Build Frontend

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

## Deploying to Testnet

### 1. Get Testnet ETH

- Visit [Sepolia Faucet](https://sepoliafaucet.com/)
- Enter your MetaMask address
- Request test ETH

### 2. Update Environment Variables

```bash
# Add your private key and RPC URL to .env
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### 3. Deploy to Sepolia

```bash
cd smart-contracts
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Update Frontend Configuration

Update `.env` with the Sepolia contract address and network settings.

## Next Steps

1. Read the [README.md](README.md) for project overview
2. Check [docs/](docs/) for detailed documentation
3. Review the [tasks.md](.kiro/specs/decentralized-web-hosting/tasks.md) for implementation tasks
4. Start implementing features!

## Support

If you encounter any issues:
1. Check the [Common Issues](#common-issues) section
2. Review the documentation in `docs/`
3. Check Hardhat and React error messages
4. Ensure all dependencies are installed correctly

Happy coding!
