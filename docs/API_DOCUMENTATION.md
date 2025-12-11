# API Documentation

## Smart Contract API

### Contract Address
- **Local:** Set in `.env` file after deployment
- **Sepolia:** Set in `.env` file after deployment

### Contract ABI
Located at: `frontend/src/contracts/DecentralizedWebHost.json`

## Smart Contract Functions

### deployWebsite
Deploy a new website to the blockchain.

```solidity
function deployWebsite(
    string memory _contentHash,
    string memory _projectName,
    string memory _description
) public returns (uint256)
```

**Parameters:**
- `_contentHash` (string): IPFS CID of the website files
- `_projectName` (string): Name of the project (max 100 characters)
- `_description` (string): Project description (max 500 characters)

**Returns:**
- `uint256`: Deployment ID

**Events Emitted:**
```solidity
event WebsiteDeployed(
    uint256 indexed deploymentId,
    address indexed owner,
    string contentHash,
    uint256 timestamp,
    uint256 version
)
```

**Example (JavaScript):**
```javascript
const tx = await contract.deployWebsite(
    "QmHash123...",
    "My Website",
    "A cool website"
);
const receipt = await tx.wait();
```

---

### getDeploymentsByOwner
Get all deployment IDs for a specific owner.

```solidity
function getDeploymentsByOwner(address _owner) 
    public view returns (uint256[] memory)
```

**Parameters:**
- `_owner` (address): Wallet address of the owner

**Returns:**
- `uint256[]`: Array of deployment IDs

**Example:**
```javascript
const deploymentIds = await contract.getDeploymentsByOwner(
    "0x1234..."
);
```

---

### getDeployment
Get deployment details by ID.

```solidity
function getDeployment(uint256 _deploymentId) 
    public view returns (WebsiteDeployment memory)
```

**Parameters:**
- `_deploymentId` (uint256): Deployment ID

**Returns:**
- `WebsiteDeployment`: Struct containing:
  - `owner` (address): Owner's wallet address
  - `contentHash` (string): IPFS CID
  - `timestamp` (uint256): Unix timestamp
  - `version` (uint256): Version number
  - `projectName` (string): Project name
  - `description` (string): Description

**Example:**
```javascript
const deployment = await contract.getDeployment(1);
console.log(deployment.projectName);
```

---

### getTotalDeployments
Get total number of deployments across all users.

```solidity
function getTotalDeployments() public view returns (uint256)
```

**Returns:**
- `uint256`: Total deployment count

---

### getOwnerDeploymentCount
Get deployment count for a specific owner.

```solidity
function getOwnerDeploymentCount(address _owner) 
    public view returns (uint256)
```

**Parameters:**
- `_owner` (address): Owner's wallet address

**Returns:**
- `uint256`: Number of deployments

---

### getOwnerLatestVersion
Get the latest version number for an owner.

```solidity
function getOwnerLatestVersion(address _owner) 
    public view returns (uint256)
```

**Parameters:**
- `_owner` (address): Owner's wallet address

**Returns:**
- `uint256`: Latest version number

---

## Frontend Utility Functions

### Blockchain Utils (`utils/blockchain.js`)

#### getContract
```javascript
getContract(signerOrProvider)
```
Get contract instance.

#### deployWebsite
```javascript
await deployWebsite(signer, contentHash, projectName, description)
```
Deploy website to blockchain.

**Returns:**
```javascript
{
    success: boolean,
    transactionHash: string,
    blockNumber: number,
    deploymentId: string
}
```

#### getAllDeploymentsForOwner
```javascript
await getAllDeploymentsForOwner(provider, ownerAddress)
```
Get all deployments with full details for an owner.

**Returns:** Array of deployment objects

---

### IPFS Utils (`utils/ipfs.js`)

#### uploadToIPFS
```javascript
await uploadToIPFS(files, onProgress)
```
Upload files to IPFS.

**Parameters:**
- `files` (File[]): Array of File objects
- `onProgress` (Function): Progress callback

**Returns:** IPFS CID (string)

#### uploadToIPFSWithRetry
```javascript
await uploadToIPFSWithRetry(files, onProgress, maxRetries)
```
Upload with automatic retry on failure.

#### getIPFSUrl
```javascript
getIPFSUrl(cid, gatewayIndex)
```
Get IPFS gateway URL for a CID.

**Returns:** Full URL (string)

#### getAllIPFSUrls
```javascript
getAllIPFSUrls(cid)
```
Get all available gateway URLs.

**Returns:** Array of URLs

---

### File Validation (`utils/fileValidation.js`)

#### validateFiles
```javascript
validateFiles(files)
```
Validate array of files.

**Returns:**
```javascript
{
    isValid: boolean,
    errors: string[],
    totalSize: number
}
```

#### categorizeFiles
```javascript
categorizeFiles(files)
```
Categorize files by type.

**Returns:**
```javascript
{
    html: File[],
    styles: File[],
    scripts: File[],
    images: File[],
    fonts: File[],
    archives: File[],
    other: File[]
}
```

---

### Formatters (`utils/formatters.js`)

#### formatAddress
```javascript
formatAddress(address)
```
Format wallet address to shortened version.
Example: `0x1234...5678`

#### formatDate
```javascript
formatDate(timestamp)
```
Format Unix timestamp to readable date.

#### formatFileSize
```javascript
formatFileSize(bytes)
```
Format bytes to human-readable size.
Example: `1.5 MB`

#### formatHash
```javascript
formatHash(hash)
```
Format long hash to shortened version.

#### copyToClipboard
```javascript
await copyToClipboard(text)
```
Copy text to clipboard.

**Returns:** boolean (success status)

---

## React Hooks

### useWallet
Access wallet context.

```javascript
const {
    walletAddress,
    chainId,
    provider,
    signer,
    isConnecting,
    error,
    isConnected,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    switchNetwork
} = useWallet();
```

**Properties:**
- `walletAddress` (string | null): Connected wallet address
- `chainId` (number | null): Current chain ID
- `provider` (BrowserProvider | null): Ethers provider
- `signer` (Signer | null): Ethers signer
- `isConnecting` (boolean): Connection in progress
- `error` (string | null): Error message
- `isConnected` (boolean): Wallet connected status
- `isMetaMaskInstalled` (boolean): MetaMask availability

**Methods:**
- `connectWallet()`: Connect to MetaMask
- `disconnectWallet()`: Disconnect wallet
- `switchNetwork(networkName)`: Switch to different network

---

## Error Handling

### Common Error Codes

**Wallet Errors:**
- `4001`: User rejected the request
- `4100`: Unauthorized
- `4200`: Unsupported method
- `4900`: Disconnected
- `4902`: Chain not added to MetaMask

**Contract Errors:**
- `"Content hash cannot be empty"`: Empty CID provided
- `"Project name cannot be empty"`: Empty project name
- `"Invalid deployment ID"`: Deployment doesn't exist

**IPFS Errors:**
- Network timeout
- Connection refused
- Invalid CID format

### Error Handling Example

```javascript
try {
    const cid = await uploadToIPFS(files);
    const result = await deployWebsite(signer, cid, name, desc);
} catch (error) {
    if (error.code === 4001) {
        console.log('User rejected transaction');
    } else if (error.message.includes('gas')) {
        console.log('Insufficient gas');
    } else {
        console.error('Deployment failed:', error);
    }
}
```

---

## Rate Limits

### IPFS
- No hard limits on public gateways
- Recommended: Use your own IPFS node for production

### Blockchain
- Limited by network capacity
- Gas price affects transaction speed
- No API rate limits (direct contract calls)

---

## Best Practices

### Gas Optimization
- Batch operations when possible
- Deploy during low gas periods
- Set appropriate gas limits

### IPFS
- Pin important content
- Use multiple gateways for redundancy
- Consider using a pinning service

### Security
- Validate all inputs
- Never expose private keys
- Use environment variables for sensitive data
- Implement proper error handling

---

## Testing

### Local Testing
```bash
# Start local blockchain
cd smart-contracts
npx hardhat node

# Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Run tests
npx hardhat test
```

### Frontend Testing
```bash
cd frontend
npm test
```

---

## Support

For issues or questions:
- Check error messages carefully
- Review this documentation
- Inspect browser console for details
- Check MetaMask for transaction status
