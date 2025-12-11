#!/bin/bash

echo "Starting local IPFS node..."

# Check if IPFS is installed
if ! command -v ipfs &> /dev/null; then
    echo "IPFS is not installed. Please install IPFS first."
    echo "Visit: https://docs.ipfs.tech/install/"
    exit 1
fi

# Initialize IPFS if not already initialized
if [ ! -d ~/.ipfs ]; then
    echo "Initializing IPFS..."
    ipfs init
fi

# Configure IPFS for local development
echo "Configuring IPFS..."
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://127.0.0.1:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

# Start IPFS daemon
echo "Starting IPFS daemon..."
ipfs daemon
