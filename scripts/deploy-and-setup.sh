#!/bin/bash

echo "=========================================="
echo "DWH System - Deploy and Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "smart-contracts" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the dwh-system root directory${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
echo ""

echo "Installing smart contract dependencies..."
cd smart-contracts
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install smart contract dependencies${NC}"
    exit 1
fi
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Compile contracts
echo -e "${YELLOW}Step 2: Compiling smart contracts...${NC}"
cd smart-contracts
npx hardhat compile
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to compile contracts${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}✓ Contracts compiled${NC}"
echo ""

# Step 3: Check if Hardhat node is running
echo -e "${YELLOW}Step 3: Checking for local blockchain...${NC}"
if ! nc -z localhost 8545 2>/dev/null; then
    echo -e "${YELLOW}Local blockchain not running.${NC}"
    echo "Please start Hardhat node in another terminal:"
    echo "  cd smart-contracts && npx hardhat node"
    echo ""
    read -p "Press Enter once Hardhat node is running..."
fi

# Verify connection
if nc -z localhost 8545 2>/dev/null; then
    echo -e "${GREEN}✓ Connected to local blockchain${NC}"
else
    echo -e "${RED}Cannot connect to local blockchain${NC}"
    exit 1
fi
echo ""

# Step 4: Deploy contract
echo -e "${YELLOW}Step 4: Deploying smart contract...${NC}"
cd smart-contracts
npx hardhat run scripts/deploy.js --network localhost
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy contract${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}✓ Contract deployed${NC}"
echo ""

# Step 5: Copy ABI to frontend
echo -e "${YELLOW}Step 5: Copying contract ABI to frontend...${NC}"
mkdir -p frontend/src/contracts
cp smart-contracts/artifacts/contracts/DecentralizedWebHost.sol/DecentralizedWebHost.json frontend/src/contracts/

if [ -f "frontend/src/contracts/DecentralizedWebHost.json" ]; then
    echo -e "${GREEN}✓ ABI copied to frontend${NC}"
else
    echo -e "${RED}Failed to copy ABI${NC}"
    exit 1
fi
echo ""

# Step 6: Update .env file
echo -e "${YELLOW}Step 6: Updating environment configuration...${NC}"

# Read contract address from deployment file
if [ -f "smart-contracts/deployments/localhost-deployment.json" ]; then
    CONTRACT_ADDRESS=$(grep -o '"contractAddress": "[^"]*' smart-contracts/deployments/localhost-deployment.json | sed 's/"contractAddress": "//')
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
    fi
    
    # Update or add contract address
    if grep -q "VITE_CONTRACT_ADDRESS=" .env; then
        sed -i.bak "s|VITE_CONTRACT_ADDRESS=.*|VITE_CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" .env
    else
        echo "VITE_CONTRACT_ADDRESS=$CONTRACT_ADDRESS" >> .env
    fi
    
    echo -e "${GREEN}✓ Environment configured${NC}"
    echo "Contract Address: $CONTRACT_ADDRESS"
else
    echo -e "${YELLOW}⚠ Could not find deployment file${NC}"
    echo "Please manually update .env with contract address"
fi
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure MetaMask:"
echo "   - Network: Localhost 8545"
echo "   - RPC URL: http://127.0.0.1:8545"
echo "   - Chain ID: 31337"
echo ""
echo "2. Import a test account to MetaMask"
echo "   (Copy private key from Hardhat node terminal)"
echo ""
echo "3. Start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "=========================================="
