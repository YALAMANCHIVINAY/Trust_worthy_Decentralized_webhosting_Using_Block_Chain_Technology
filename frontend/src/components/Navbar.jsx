import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { formatAddress } from '../utils/formatters';
import { NETWORK_NAMES } from '../utils/constants';

const Navbar = () => {
  const { 
    walletAddress, 
    chainId, 
    isConnected, 
    connectWallet, 
    disconnectWallet,
    isConnecting 
  } = useWallet();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Decentralized Web Hosting
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            {isConnected && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/upload" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Upload
                </Link>
              </>
            )}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                {/* Network Badge */}
                <div className="hidden sm:flex items-center px-3 py-1 bg-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">
                    {NETWORK_NAMES[chainId] || `Chain ${chainId}`}
                  </span>
                </div>

                {/* Address Display */}
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-primary-50 rounded-lg">
                    <span className="text-sm font-medium text-primary-700">
                      {formatAddress(walletAddress)}
                    </span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
