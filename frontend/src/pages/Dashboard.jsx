import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import DeploymentCard from '../components/DeploymentCard';
import StatusLoader from '../components/StatusLoader';
import { getAllDeploymentsForOwner } from '../utils/blockchain';

const Dashboard = () => {
  const { walletAddress, provider, isConnected } = useWallet();
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, version

  useEffect(() => {
    if (isConnected && walletAddress && provider) {
      fetchDeployments();
    } else {
      setLoading(false);
    }
  }, [isConnected, walletAddress, provider]);

  const fetchDeployments = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Fetching deployments for:', walletAddress);
      const data = await getAllDeploymentsForOwner(provider, walletAddress);
      console.log('Fetched deployments:', data);
      setDeployments(data);
    } catch (err) {
      console.error('Error fetching deployments:', err);
      setError(err.message || 'Failed to fetch deployments');
    } finally {
      setLoading(false);
    }
  };

  const getSortedDeployments = () => {
    const sorted = [...deployments];
    
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => a.timestamp - b.timestamp);
      case 'version':
        return sorted.sort((a, b) => b.version - a.version);
      case 'newest':
      default:
        return sorted.sort((a, b) => b.timestamp - a.timestamp);
    }
  };

  // Not connected state
  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Connect Your Wallet</h2>
          <p className="mt-2 text-gray-600">
            Please connect your wallet to view your deployments
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <StatusLoader message="Loading your deployments..." type="loading" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="card">
          <StatusLoader message="Failed to load deployments" type="error" />
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={fetchDeployments} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sortedDeployments = getSortedDeployments();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Deployments</h1>
            <p className="mt-2 text-gray-600">
              {deployments.length} {deployments.length === 1 ? 'website' : 'websites'} deployed
            </p>
          </div>
          <Link to="/upload" className="btn-primary">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Deploy New Website
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {deployments.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No deployments yet</h2>
          <p className="mt-2 text-gray-600">
            Get started by deploying your first website
          </p>
          <Link to="/upload" className="mt-6 inline-block btn-primary">
            Deploy Your First Website
          </Link>
        </div>
      ) : (
        <>
          {/* Filters and Sort */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="version">Version</option>
              </select>
            </div>

            <button
              onClick={fetchDeployments}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Deployments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDeployments.map((deployment) => (
              <DeploymentCard key={deployment.id} deployment={deployment} />
            ))}
          </div>
        </>
      )}

      {/* Stats Section */}
      {deployments.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Deployments</p>
                <p className="text-2xl font-bold text-gray-900">{deployments.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Latest Version</p>
                <p className="text-2xl font-bold text-gray-900">
                  v{Math.max(...deployments.map(d => d.version))}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Last Deployed</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(Math.max(...deployments.map(d => d.timestamp)) * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
