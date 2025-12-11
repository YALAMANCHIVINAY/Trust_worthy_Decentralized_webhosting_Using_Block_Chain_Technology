import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { NETWORKS } from '../utils/constants';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask to use this application');
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get provider and signer
      const ethersProvider = new BrowserProvider(window.ethereum);
      const ethersSigner = await ethersProvider.getSigner();
      const network = await ethersProvider.getNetwork();

      setWalletAddress(accounts[0]);
      setChainId(Number(network.chainId));
      setProvider(ethersProvider);
      setSigner(ethersSigner);

      // Store in localStorage
      localStorage.setItem('walletConnected', 'true');

      setIsConnecting(false);
      return true;
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setIsConnecting(false);
      return false;
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
    setError(null);
    localStorage.removeItem('walletConnected');
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== walletAddress) {
      setWalletAddress(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainIdHex) => {
    const newChainId = parseInt(chainIdHex, 16);
    setChainId(newChainId);
    // Reload to reset state
    window.location.reload();
  };

  // Switch network
  const switchNetwork = async (networkName) => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed');
      return false;
    }

    const network = NETWORKS[networkName];
    if (!network) {
      setError('Network not found');
      return false;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
          });
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          setError('Failed to add network');
          return false;
        }
      }
      console.error('Error switching network:', switchError);
      setError('Failed to switch network');
      return false;
    }
  };

  // Setup event listeners
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Auto-connect if previously connected
      const wasConnected = localStorage.getItem('walletConnected');
      if (wasConnected === 'true') {
        connectWallet();
      }
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const value = {
    walletAddress,
    chainId,
    provider,
    signer,
    isConnecting,
    error,
    isConnected: !!walletAddress,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connectWallet,
    disconnectWallet,
    switchNetwork
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
