# Smart Contracts

This directory contains the Solidity smart contracts for the Decentralized Web Hosting system.

## Contracts

### DecentralizedWebHost.sol

Main contract that manages website deployments:
- Stores website metadata (owner, content hash, timestamp, version)
- Provides deployment recording functionality
- Enables querying deployments by owner
- Emits events for frontend tracking

## Setup

```bash
npm install
```

## Compile Contracts

```bash
npm run compile
```

## Run Tests

```bash
npm test
```

## Deploy

### Local Network

```bash
# Start local node
npm run node

# Deploy (in another terminal)
npm run deploy:local
```

### Testnet (Sepolia)

```bash
npm run deploy:sepolia
```

## Contract Functions

### deployWebsite

```solidity
function deployWebsite(
    string memory _contentHash,
    string memory _projectName,
    string memory _description
) public returns (uint256)
```

Records a new website deployment.

### getDeploymentsByOwner

```solidity
function getDeploymentsByOwner(address _owner) 
    public view returns (uint256[] memory)
```

Returns all deployment IDs for a given owner.

### getDeployment

```solidity
function getDeployment(uint256 _deploymentId) 
    public view returns (WebsiteDeployment memory)
```

Returns full deployment details.

## Events

### WebsiteDeployed

```solidity
event WebsiteDeployed(
    uint256 indexed deploymentId,
    address indexed owner,
    string contentHash,
    uint256 timestamp
)
```

Emitted when a new website is deployed.
