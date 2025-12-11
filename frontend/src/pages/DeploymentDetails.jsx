import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import StatusLoader from '../components/StatusLoader';
import { getDeployment } from '../utils/blockchain';
import { getIPFSUrl, getAllIPFSUrls } from '../utils/ipfs';
import { formatDate, formatAddress, copyToClipboard } from '../utils/formatters';

const DeploymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { provider, isConnected } = useWallet();
  
  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (isConnected && provider && id) {
      fetchDeployment();
    } else {
      setLoading(false);
    }
  }, [isConnected, provider, id]);

  const fetchDeployment = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getDeployment(provider, id);
      setDeployment(data);
    } catch (err) {
      console.error('Error fetching deployment:', err);
      setError(err.message || 'Failed to fetch deployment details');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, field) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(field);
      setTimeout(() => setCopied(''), 2000);
    }
  };

  const handleViewWebsite = () => {
    const url = getIPFSUrl(deployment.contentHash);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Connect Your Wallet</h2>
          <p className="mt-2 text-gray-600">Please connect your wallet to view deployment details</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <StatusLoader message="Loading deployment details..." type="loading" />
      </div>
    );
  }

  if (error || !deployment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="card">
          <StatusLoader message="Failed to load deployment" type="error" />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              Back to Dashboard
            </button>
            <button onClick={fetchDeployment} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allGateways = getAllIPFSUrls(deployment.contentHash);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 flex items-center text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{deployment.projectName}</h1>
        <p className="mt-2 text-gray-600">Deployment #{deployment.id}</p>
      </div>

      {/* Main Info Card */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Active
            </span>
          </div>
          <button
            onClick={handleViewWebsite}
            className="btn-primary"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Website
          </button>
        </div>

        {/* Description */}
        {deployment.description && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Description</h2>
            <p className="text-gray-900">{deployment.description}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Version</h3>
            <p className="text-lg font-semibold text-gray-900">v{deployment.version}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Deployed</h3>
            <p className="text-lg font-semibold text-gray-900">{formatDate(deployment.timestamp)}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Owner Address</h3>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <p className="font-mono text-sm text-gray-900">{deployment.owner}</p>
              <button
                onClick={() => handleCopy(deployment.owner, 'owner')}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              >
                {copied === 'owner' ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Hash Card */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Hash (CID)</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-gray-900 break-all flex-1">
              {deployment.contentHash}
            </p>
            <button
              onClick={() => handleCopy(deployment.contentHash, 'cid')}
              className="ml-4 p-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
            >
              {copied === 'cid' ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* IPFS Gateways Card */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">IPFS Gateway URLs</h2>
        <p className="text-sm text-gray-600 mb-4">
          Access your website through any of these IPFS gateways:
        </p>
        <div className="space-y-2">
          {allGateways.map((url, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 truncate flex-1"
              >
                {url}
              </a>
              <button
                onClick={() => handleCopy(url, `url-${index}`)}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                {copied === `url-${index}` ? (
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeploymentDetails;
