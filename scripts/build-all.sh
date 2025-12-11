#!/bin/bash

echo "Building all components..."

# Build smart contracts
echo "Compiling smart contracts..."
cd smart-contracts
npm install
npm run compile
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Build complete!"
echo "Smart contract artifacts: smart-contracts/artifacts/"
echo "Frontend build: frontend/dist/"
