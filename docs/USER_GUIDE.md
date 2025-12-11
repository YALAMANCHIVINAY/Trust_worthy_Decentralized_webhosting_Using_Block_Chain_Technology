# User Guide - Decentralized Web Hosting

## Table of Contents
1. [Getting Started](#getting-started)
2. [Connecting Your Wallet](#connecting-your-wallet)
3. [Deploying a Website](#deploying-a-website)
4. [Managing Deployments](#managing-deployments)
5. [Accessing Your Website](#accessing-your-website)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- MetaMask browser extension installed
- Test ETH in your wallet (for testnet) or real ETH (for mainnet)
- Static website files (HTML, CSS, JavaScript)

### First Time Setup
1. Open the application in your browser
2. Click "Connect Wallet" button
3. Approve the connection in MetaMask
4. You're ready to deploy!

## Connecting Your Wallet

### Step 1: Install MetaMask
If you haven't already:
1. Visit [metamask.io](https://metamask.io/)
2. Install the browser extension
3. Create a new wallet or import existing one
4. Save your seed phrase securely

### Step 2: Connect to the Application
1. Click "Connect Wallet" in the navigation bar
2. MetaMask will pop up asking for permission
3. Click "Connect" to approve
4. Your wallet address will appear in the top right

### Step 3: Switch Network (if needed)
For local development:
- Network Name: Localhost 8545
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency: ETH

## Deploying a Website

### Preparing Your Files
Your website should include:
- At least one HTML file (required)
- CSS files for styling (optional)
- JavaScript files for interactivity (optional)
- Images, fonts, and other assets (optional)

**Supported File Types:**
- HTML: .html, .htm
- Styles: .css
- Scripts: .js
- Images: .png, .jpg, .jpeg, .gif, .svg, .ico
- Fonts: .woff, .woff2, .ttf
- Archives: .zip

**File Size Limit:** 50MB total

### Deployment Process

#### Step 1: Navigate to Upload Page
- Click "Upload" in the navigation menu
- Or click "Deploy Website" from the dashboard

#### Step 2: Enter Project Information
- **Project Name** (required): Give your website a name
- **Description** (optional): Brief description of your website

#### Step 3: Select Files
You can either:
- **Drag and drop** files into the upload area
- **Click to browse** and select files from your computer

The system will validate your files and show:
- File list organized by type
- Total file size
- Any validation errors

#### Step 4: Deploy
1. Click "Deploy Website" button
2. Wait for files to upload to IPFS (progress bar shown)
3. Confirm the transaction in MetaMask
4. Wait for blockchain confirmation
5. Success! You'll be redirected to the dashboard

**Note:** You'll need to pay gas fees for the blockchain transaction.

## Managing Deployments

### Dashboard Overview
The dashboard shows all your deployed websites with:
- Project name and description
- Version number
- Deployment date and time
- Content hash (CID)
- Quick actions

### Viewing Deployments
- **Sort by:** Newest, Oldest, or Version
- **Refresh:** Click refresh icon to update the list
- **Stats:** View total deployments, latest version, and last deployed date

### Deployment Actions
Each deployment card has these actions:
- **View Website:** Opens your site in a new tab through IPFS gateway
- **Alternative Gateways:** Shows other IPFS gateways for redundancy
- **View Details:** See complete deployment information

### Version Management
- Each new deployment increments your version number
- Previous versions remain accessible
- All versions are stored permanently on IPFS and blockchain

## Accessing Your Website

### Primary Access
Click "View Website" on any deployment card to open your site through the default IPFS gateway.

### Alternative Gateways
If the primary gateway is slow or unavailable:
1. Click the info icon on the deployment card
2. Select an alternative IPFS gateway
3. Your site will open through that gateway

### Available Gateways
- ipfs.io
- gateway.pinata.cloud
- cloudflare-ipfs.com
- dweb.link

### Sharing Your Website
To share your website:
1. Go to deployment details
2. Copy the IPFS gateway URL
3. Share the URL with anyone

**Note:** Anyone with the URL can access your website - it's public!

### Custom Domains (Future Feature)
In the future, you'll be able to:
- Map custom domains to your IPFS content
- Use ENS (Ethereum Name Service) for human-readable addresses

## Troubleshooting

### Wallet Connection Issues

**Problem:** MetaMask doesn't pop up
- **Solution:** Click the MetaMask extension icon manually
- Check if MetaMask is unlocked
- Refresh the page and try again

**Problem:** Wrong network
- **Solution:** Switch to the correct network in MetaMask
- For local development: Localhost 8545 (Chain ID: 31337)
- For testnet: Sepolia or Goerli

**Problem:** Transaction failed
- **Solution:** 
  - Check if you have enough ETH for gas fees
  - Try increasing gas price in MetaMask
  - Reset your MetaMask account (Settings → Advanced → Reset Account)

### File Upload Issues

**Problem:** "Invalid file type" error
- **Solution:** Only upload supported file types
- Check the list of supported extensions
- Remove unsupported files

**Problem:** "File too large" error
- **Solution:** 
  - Compress images before uploading
  - Remove unnecessary files
  - Total size must be under 50MB

**Problem:** "No HTML file" error
- **Solution:** Include at least one .html or .htm file
- This is required for the website to work

### Deployment Issues

**Problem:** IPFS upload fails
- **Solution:**
  - Check your internet connection
  - The system will automatically retry 3 times
  - Try again with fewer/smaller files

**Problem:** Blockchain transaction fails
- **Solution:**
  - Ensure you have enough ETH for gas
  - Don't reject the MetaMask transaction
  - Check network status

**Problem:** Website not loading
- **Solution:**
  - Try an alternative IPFS gateway
  - Wait a few minutes for IPFS propagation
  - Check if your HTML file is named correctly

### Dashboard Issues

**Problem:** Deployments not showing
- **Solution:**
  - Click the refresh button
  - Check if you're connected to the correct wallet
  - Verify you're on the correct network

**Problem:** Old deployment missing
- **Solution:**
  - All deployments are permanent on blockchain
  - Check if you're using the same wallet address
  - Try refreshing the page

## Best Practices

### File Organization
- Use relative paths in your HTML
- Keep file structure simple
- Test locally before deploying

### Optimization
- Compress images
- Minify CSS and JavaScript
- Remove unused files

### Security
- Never share your private keys
- Double-check transaction details
- Keep MetaMask updated

### Cost Management
- Deploy during low gas price periods
- Batch multiple changes into one deployment
- Consider using Layer 2 solutions (future)

## Getting Help

### Resources
- Project Documentation: `/docs` folder
- Smart Contract Code: `/smart-contracts` folder
- IPFS Documentation: [docs.ipfs.tech](https://docs.ipfs.tech/)
- Ethereum Documentation: [ethereum.org](https://ethereum.org/)

### Common Questions

**Q: Is my website really decentralized?**
A: Yes! Files are on IPFS (distributed storage) and metadata is on blockchain (immutable ledger).

**Q: Can I delete a deployment?**
A: No, blockchain records are permanent. However, you can deploy new versions.

**Q: How long does deployment take?**
A: Usually 1-3 minutes: IPFS upload + blockchain confirmation.

**Q: Do I need to pay for hosting?**
A: Only gas fees for blockchain transactions. No monthly hosting fees!

**Q: Can I update my website?**
A: Yes, deploy a new version. Old versions remain accessible.

**Q: Is my content private?**
A: No, all content on IPFS is public. Don't upload sensitive information.

## Next Steps

Now that you know the basics:
1. Deploy your first website
2. Share it with friends
3. Explore the dashboard features
4. Try deploying updates
5. Experiment with different file types

Happy deploying! 🚀
