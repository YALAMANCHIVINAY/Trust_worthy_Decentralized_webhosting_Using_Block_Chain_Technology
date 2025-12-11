# Quick Start Guide

Get your Decentralized Web Hosting platform running in 5 minutes!

## Fast Setup (Local Development)

### Step 1: Install Dependencies (2 minutes)
```bash
# Smart contracts
cd dwh-system/smart-contracts
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Start Local Blockchain (30 seconds)
```bash
# In terminal 1
cd smart-contracts
npx hardhat node
```
**Keep this terminal open!** Copy one of the private keys shown.

### Step 3: Deploy Smart Contract (30 seconds)
```bash
# In terminal 2
cd smart-contracts
npx hardhat run scripts/deploy.js --network localhost
```
**Copy the contract address** from the output.

### Step 4: Configure Environment (30 seconds)
```bash
# In project root
cp .env.example .env
```
Edit `.env` and add the contract address:
```
VITE_CONTRACT_ADDRESS=<your_contract_address>
```

### Step 5: Copy Contract ABI (15 seconds)
```bash
cp smart-contracts/artifacts/contracts/DecentralizedWebHost.sol/DecentralizedWebHost.json frontend/src/contracts/
```

### Step 6: Start Frontend (30 seconds)
```bash
# In terminal 3
cd frontend
npm run dev
```
Open http://localhost:3000

### Step 7: Configure MetaMask (1 minute)
1. Open MetaMask extension
2. Add network:
   - **Network Name**: Localhost 8545
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency**: ETH
3. Import Account:
   - Use private key from Step 2
4. Switch to Localhost 8545 network

### Step 8: Deploy Your First Website!
1. Click "Connect Wallet" in the app
2. Go to "Upload" page
3. Select your HTML, CSS, JS files
4. Enter project name
5. Click "Deploy Website"
6. Confirm in MetaMask
7. Done!

## One-Command Setup (Linux/Mac)

```bash
cd dwh-system
chmod +x scripts/deploy-and-setup.sh
./scripts/deploy-and-setup.sh
```

Follow the prompts!

## Windows Setup

```bash
cd dwh-system
scripts\deploy-and-setup.bat
```

## Verify Installation

### Check if everything works:
1. Hardhat node running (Terminal 1 shows blocks)
2. Contract deployed (you have the address)
3. Frontend running (http://localhost:3000 opens)
4. MetaMask connected (shows Localhost 8545)
5. Test ETH available (10000 ETH in account)

### Test Deployment:
1. Create a simple `index.html`:
```html
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body><h1>Hello Decentralized Web!</h1></body>
</html>
```
2. Upload it through the app
3. View it through IPFS gateway
4. Success!

## Common Issues

### "Cannot connect to MetaMask"
- Install MetaMask extension
- Unlock MetaMask
- Refresh page

### "Wrong network"
- Switch to Localhost 8545 in MetaMask
- Chain ID must be 31337

### "Transaction failed"
- Reset MetaMask account (Settings → Advanced → Reset)
- Restart Hardhat node
- Redeploy contract

### "Contract not found"
- Check contract address in `.env`
- Verify ABI file copied to frontend
- Redeploy if needed

### "IPFS upload failed"
- Check internet connection
- Try smaller files
- System will auto-retry

## Next Steps

1. **Read Documentation**:
   - `USER_GUIDE.md` - How to use the app
   - `API_DOCUMENTATION.md` - Technical details
   - `SETUP.md` - Detailed setup guide

2. **Explore Features**:
   - Deploy multiple websites
   - Try different file types
   - Check version management
   - View deployment details

3. **Customize**:
   - Modify UI styling
   - Add new features
   - Deploy to testnet

## Deploy to Testnet (Optional)

### Get Test ETH:
1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your MetaMask address
3. Request test ETH

### Deploy:
```bash
# Add to .env
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY

# Deploy
cd smart-contracts
npx hardhat run scripts/deploy.js --network sepolia
```

### Update Frontend:
Update `.env` with Sepolia contract address and switch MetaMask to Sepolia network.

## Tips

- **Save Contract Address**: You'll need it!
- **Keep Hardhat Running**: Don't close terminal 1
- **Use Test Account**: Never use real funds for testing
- **Check Console**: Browser console shows helpful errors
- **Read Errors**: Error messages are descriptive

## For Demonstration

### Prepare Demo:
1. Deploy 2-3 sample websites
2. Show different versions
3. Demonstrate IPFS gateways
4. Explain blockchain verification

### Demo Script:
1. Show home page features
2. Connect wallet (explain MetaMask)
3. Upload website (show file validation)
4. Wait for deployment (explain IPFS + blockchain)
5. View dashboard (show deployments)
6. Open website (demonstrate decentralization)
7. Show deployment details (explain metadata)

## Need Help?

- Check `docs/USER_GUIDE.md` for detailed help
- Review error messages carefully
- Inspect browser console (F12)
- Check MetaMask for transaction status
- Verify all steps completed correctly

## You're Ready!

Your decentralized web hosting platform is now running!

**What you can do:**
- Deploy static websites
- Manage multiple deployments
- Track versions
- Access through IPFS
- Verify on blockchain

**Happy hosting!**
