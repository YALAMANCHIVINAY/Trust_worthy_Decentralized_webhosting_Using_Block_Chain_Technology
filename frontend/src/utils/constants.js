// Network configurations
export const NETWORKS = {
  localhost: {
    chainId: '0x7a69', // 31337 in hex
    chainName: 'Localhost 8545',
    rpcUrls: ['http://127.0.0.1:8545'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  },
  sepolia: {
    chainId: '0xaa36a7', // 11155111 in hex
    chainName: 'Sepolia Testnet',
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  }
};

// Contract configuration
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '';

// IPFS configuration
export const IPFS_API_URL = import.meta.env.VITE_IPFS_API_URL || 'http://127.0.0.1:5001';
export const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';

// Alternative IPFS gateways
export const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/'
];

// Supported file types
export const SUPPORTED_FILE_TYPES = [
  '.html',
  '.htm',
  '.css',
  '.js',
  '.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.zip'
];

// File type categories
export const FILE_CATEGORIES = {
  html: ['.html', '.htm'],
  styles: ['.css'],
  scripts: ['.js'],
  images: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'],
  fonts: ['.woff', '.woff2', '.ttf'],
  archives: ['.zip']
};

// Maximum file size (50MB)
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Status messages
export const STATUS_MESSAGES = {
  IDLE: 'Ready to deploy',
  UPLOADING: 'Uploading files to IPFS...',
  RECORDING: 'Recording deployment on blockchain...',
  SUCCESS: 'Deployment successful!',
  ERROR: 'Deployment failed'
};

// Error messages
export const ERROR_MESSAGES = {
  NO_WALLET: 'Please install MetaMask to use this application',
  WALLET_REJECTED: 'Wallet connection was rejected',
  WRONG_NETWORK: 'Please switch to the correct network',
  INVALID_FILES: 'Please select valid website files',
  FILE_TOO_LARGE: 'File size exceeds maximum limit (50MB)',
  NO_HTML: 'At least one HTML file is required',
  IPFS_UPLOAD_FAILED: 'Failed to upload files to IPFS',
  TRANSACTION_FAILED: 'Blockchain transaction failed',
  FETCH_FAILED: 'Failed to fetch deployments'
};

// Network names
export const NETWORK_NAMES = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  31337: 'Localhost'
};
