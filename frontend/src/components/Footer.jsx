import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About DWH</h3>
            <p className="text-gray-300 text-sm">
              Decentralized Web Hosting combines blockchain technology with IPFS 
              to provide trustworthy, censorship-resistant hosting for static websites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://docs.ipfs.tech/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  IPFS Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://ethereum.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ethereum
                </a>
              </li>
              <li>
                <a 
                  href="https://metamask.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  MetaMask
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Built With</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>⛓️ Ethereum Blockchain</li>
              <li>📦 IPFS Storage</li>
              <li>⚛️ React.js</li>
              <li>🔐 Solidity Smart Contracts</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Decentralized Web Hosting. B.Tech Project.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built for educational purposes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
