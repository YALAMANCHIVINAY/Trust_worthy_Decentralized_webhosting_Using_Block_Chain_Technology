@echo off
echo ==========================================
echo DWH System - Deploy and Setup Script
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "smart-contracts" (
    echo Error: Please run this script from the dwh-system root directory
    exit /b 1
)
if not exist "frontend" (
    echo Error: Please run this script from the dwh-system root directory
    exit /b 1
)

REM Step 1: Install dependencies
echo Step 1: Installing dependencies...
echo.

echo Installing smart contract dependencies...
cd smart-contracts
call npm install
if errorlevel 1 (
    echo Failed to install smart contract dependencies
    exit /b 1
)
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Failed to install frontend dependencies
    exit /b 1
)
cd ..

echo Dependencies installed successfully
echo.

REM Step 2: Compile contracts
echo Step 2: Compiling smart contracts...
cd smart-contracts
call npx hardhat compile
if errorlevel 1 (
    echo Failed to compile contracts
    exit /b 1
)
cd ..

echo Contracts compiled successfully
echo.

REM Step 3: Check for local blockchain
echo Step 3: Checking for local blockchain...
echo Please ensure Hardhat node is running in another terminal:
echo   cd smart-contracts ^&^& npx hardhat node
echo.
pause

REM Step 4: Deploy contract
echo Step 4: Deploying smart contract...
cd smart-contracts
call npx hardhat run scripts/deploy.js --network localhost
if errorlevel 1 (
    echo Failed to deploy contract
    exit /b 1
)
cd ..

echo Contract deployed successfully
echo.

REM Step 5: Copy ABI to frontend
echo Step 5: Copying contract ABI to frontend...
if not exist "frontend\src\contracts" mkdir frontend\src\contracts
copy smart-contracts\artifacts\contracts\DecentralizedWebHost.sol\DecentralizedWebHost.json frontend\src\contracts\

if exist "frontend\src\contracts\DecentralizedWebHost.json" (
    echo ABI copied to frontend successfully
) else (
    echo Failed to copy ABI
    exit /b 1
)
echo.

REM Step 6: Update .env file
echo Step 6: Updating environment configuration...

if not exist ".env" (
    copy .env.example .env
)

echo Environment configuration updated
echo Please manually update .env with the contract address from the deployment output
echo.

REM Summary
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Configure MetaMask:
echo    - Network: Localhost 8545
echo    - RPC URL: http://127.0.0.1:8545
echo    - Chain ID: 31337
echo.
echo 2. Import a test account to MetaMask
echo    (Copy private key from Hardhat node terminal)
echo.
echo 3. Start the frontend:
echo    cd frontend ^&^& npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo ==========================================
pause
