# Frontend Application

React-based frontend for the Decentralized Web Hosting platform.

## Features

- Wallet connection (MetaMask)
- File upload interface
- IPFS integration
- Blockchain interaction
- Dashboard for deployments
- Version management
- Responsive design

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Main application pages
├── utils/           # Helper functions
├── context/         # React context for state
├── contracts/       # Contract ABIs
└── styles/          # CSS styles
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_IPFS_API_URL=http://127.0.0.1:5001
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
VITE_NETWORK=localhost
VITE_CHAIN_ID=31337
```

## Key Components

### WalletContext
Manages wallet connection state across the application.

### Dashboard
Displays all user deployments with filtering and sorting.

### UploadWebsite
Handles file upload and deployment process.

### DeploymentDetails
Shows detailed information about a specific deployment.

## Technologies

- React 18
- Vite
- Tailwind CSS
- ethers.js
- IPFS HTTP Client
- React Router
