# Blockchain for Trustworthy Decentralized Web Hosting

A decentralized web hosting platform that combines blockchain technology with IPFS distributed storage to provide trustworthy, censorship-resistant hosting for static websites.

## Features

- Wallet-based authentication (MetaMask)
- Upload static websites to IPFS
- Immutable metadata storage on blockchain
- Dashboard for managing deployments
- Version control for website updates
- Content integrity verification
- Access websites through IPFS gateways

## Project Structure

```
dwh-system/
├── frontend/              # React frontend application
├── smart-contracts/       # Solidity smart contracts
├── backend-api/          # Optional Node.js API layer
├── ipfs/                 # IPFS configuration
├── docs/                 # Project documentation
└── scripts/              # Helper scripts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Git

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd dwh-system
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Install dependencies

```bash
# Install smart contract dependencies
cd smart-contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Start local blockchain

```bash
cd smart-contracts
npx hardhat node
```

### 5. Deploy smart contract

```bash
# In a new terminal
cd smart-contracts
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Start frontend

```bash
cd frontend
npm start
```

### 7. Configure MetaMask

- Add local network (RPC: http://127.0.0.1:8545, Chain ID: 31337)
- Import test account from Hardhat

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Upload Website**: Select your HTML, CSS, and JS files
3. **Deploy**: Click deploy to upload to IPFS and record on blockchain
4. **View Dashboard**: See all your deployed websites
5. **Access Website**: Click "View Website" to open through IPFS gateway

## Technology Stack

- **Frontend**: React.js, ethers.js, Tailwind CSS
- **Smart Contracts**: Solidity, Hardhat
- **Storage**: IPFS
- **Blockchain**: Ethereum (local/testnet)
- **Testing**: Jest, fast-check, Hardhat

## Development

### Running Tests

```bash
# Smart contract tests
cd smart-contracts
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Deploy to testnet
cd smart-contracts
npx hardhat run scripts/deploy.js --network sepolia
```

## Documentation

See the `docs/` folder for detailed documentation:
- Requirements specification
- Architecture design
- User guides
- API documentation

## License

MIT

## Contributors

[Your Name]

## Acknowledgments

- Ethereum Foundation
- IPFS Project
- OpenZeppelin
"# Trust_worthy_Decentralized_webhosting_Using_Block_Chain_Technology" 
"# Trust_worthy_Decentralized_webhosting_Using_Block_Chain_Technology" 
"# Trust_worthy_Decentralized_webhosting_Using_Block_Chain_Technology" 
