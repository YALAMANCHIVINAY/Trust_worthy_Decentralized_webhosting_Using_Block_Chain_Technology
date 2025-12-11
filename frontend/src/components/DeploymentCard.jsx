import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatHash, copyToClipboard } from '../utils/formatters';
import { getIPFSUrl, getAllIPFSUrls } from '../utils/ipfs';

const DeploymentCard = ({ deployment }) => {
  const [copied, setCopied] = useState(false);
  const [showGateways, setShowGateways] = useState(false);

  const ipfsUrl = getIPFSUrl(deployment.contentHash);
  const allGateways = getAllIPFSUrls(deployment.contentHash);

  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewWebsite = () => {
    window.open(ipfsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {deployment.projectName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Version {deployment.version} • {formatDate(deployment.timestamp)}
          </p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          Active
        </span>
      </div>

      {/* Description */}
      {deployment.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {deployment.description}
        </p>
      )}

      {/* Content Hash */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">Content Hash (CID)</p>
            <p className="text-sm font-mono text-gray-900 truncate">
              {deployment.contentHash}
            </p>
          </div>
          <button
            onClick={() => handleCopy(deployment.contentHash)}
            className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Copy CID"
          >
            {copied ? (
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

      {/* Deployment Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Deployment ID</p>
          <p className="font-medium text-gray-900">#{deployment.id}</p>
        </div>
        <div>
          <p className="text-gray-500">Owner</p>
          <p className="font-medium text-gray-900">{formatHash(deployment.owner)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
        <button
          onClick={handleViewWebsite}
          className="flex-1 btn-primary text-sm py-2"
        >
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Website
        </button>
        
        <button
          onClick={() => setShowGateways(!showGateways)}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Show alternative gateways"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <Link
          to={`/deployment/${deployment.id}`}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="View details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Alternative Gateways */}
      {showGateways && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">Alternative IPFS Gateways:</p>
          <div className="space-y-1">
            {allGateways.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-primary-600 hover:text-primary-700 truncate"
              >
                {url}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentCard;
