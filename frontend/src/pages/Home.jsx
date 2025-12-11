import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Home = () => {
  const { isConnected, connectWallet, isConnecting } = useWallet();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Decentralized Web Hosting
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Host your static websites on IPFS with blockchain-verified ownership.
              Censorship-resistant, trustworthy, and truly decentralized.
            </p>
            
            {isConnected ? (
              <div className="flex justify-center space-x-4">
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                </Link>
                <Link to="/upload" className="btn-secondary text-lg px-8 py-3">
                  Deploy Website
                </Link>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary text-lg px-8 py-3"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet to Get Started'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Decentralized Hosting?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Censorship Resistant
              </h3>
              <p className="text-gray-600">
                No single entity can take down your website. Content is distributed across the IPFS network.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Ownership
              </h3>
              <p className="text-gray-600">
                Blockchain records prove ownership and ensure content integrity through cryptographic hashes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Always Available
              </h3>
              <p className="text-gray-600">
                Distributed storage means no single point of failure. Your site stays online even if nodes go down.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Connect Wallet
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect your MetaMask wallet to authenticate
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-6 left-full w-full">
                <svg className="w-full h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 12h90m0 0l-8-8m8 8l-8 8" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Files
                </h3>
                <p className="text-gray-600 text-sm">
                  Select your HTML, CSS, and JS files
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-6 left-full w-full">
                <svg className="w-full h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 12h90m0 0l-8-8m8 8l-8 8" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deploy to IPFS
                </h3>
                <p className="text-gray-600 text-sm">
                  Files are uploaded to the IPFS network
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-6 left-full w-full">
                <svg className="w-full h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 12h90m0 0l-8-8m8 8l-8 8" />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Record on Blockchain
              </h3>
              <p className="text-gray-600 text-sm">
                Metadata is stored immutably on Ethereum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built With Modern Technology
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">⛓️</div>
              <h3 className="font-semibold text-gray-900">Ethereum</h3>
              <p className="text-sm text-gray-600">Blockchain</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-semibold text-gray-900">IPFS</h3>
              <p className="text-sm text-gray-600">Storage</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <h3 className="font-semibold text-gray-900">React</h3>
              <p className="text-sm text-gray-600">Frontend</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔐</div>
              <h3 className="font-semibold text-gray-900">Solidity</h3>
              <p className="text-sm text-gray-600">Smart Contracts</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Deploy Your Website?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join the decentralized web revolution today
          </p>
          
          {isConnected ? (
            <Link to="/upload" className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Deploy Now
            </Link>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Get Started'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
