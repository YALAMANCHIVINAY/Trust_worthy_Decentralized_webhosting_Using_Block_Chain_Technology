import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import FileUploader from '../components/FileUploader';
import StatusLoader from '../components/StatusLoader';
import { uploadToIPFSWithRetry } from '../utils/ipfs';
import { deployWebsite } from '../utils/blockchain';
import { STATUS_MESSAGES } from '../utils/constants';

const UploadWebsite = () => {
  const navigate = useNavigate();
  const { signer, isConnected } = useWallet();
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [contentHash, setContentHash] = useState('');
  const [deploymentId, setDeploymentId] = useState(null);
  const [error, setError] = useState('');

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    setError('');
  };

  const handleDeploy = async () => {
    // Validation
    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    if (!projectName.trim()) {
      setError('Please enter a project name');
      return;
    }

    if (!isConnected || !signer) {
      setError('Please connect your wallet');
      return;
    }

    setError('');
    setDeploymentStatus('uploading');
    setStatusMessage(STATUS_MESSAGES.UPLOADING);

    try {
      // Step 1: Upload to IPFS
      console.log('Uploading files to IPFS...');
      const cid = await uploadToIPFSWithRetry(
        selectedFiles,
        (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setUploadProgress(percent);
          setStatusMessage(`${STATUS_MESSAGES.UPLOADING} ${percent}%`);
        }
      );

      console.log('Files uploaded to IPFS:', cid);
      setContentHash(cid);
      setUploadProgress(100);

      // Step 2: Record on blockchain
      setDeploymentStatus('recording');
      setStatusMessage(STATUS_MESSAGES.RECORDING);

      console.log('Recording deployment on blockchain...');
      const result = await deployWebsite(
        signer,
        cid,
        projectName.trim(),
        description.trim() || 'No description provided'
      );

      console.log('Deployment recorded:', result);

      // Step 3: Success
      setDeploymentStatus('success');
      setStatusMessage(STATUS_MESSAGES.SUCCESS);
      setDeploymentId(result.deploymentId);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Deployment error:', err);
      setDeploymentStatus('error');
      setStatusMessage(STATUS_MESSAGES.ERROR);
      setError(err.message || 'An error occurred during deployment');
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setProjectName('');
    setDescription('');
    setDeploymentStatus('idle');
    setStatusMessage('');
    setUploadProgress(0);
    setContentHash('');
    setDeploymentId(null);
    setError('');
  };

  const isDeploying = deploymentStatus === 'uploading' || deploymentStatus === 'recording';
  const canDeploy = selectedFiles.length > 0 && projectName.trim() && !isDeploying;

  // Show status screen during deployment
  if (deploymentStatus === 'uploading' || deploymentStatus === 'recording') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <StatusLoader message={statusMessage} type="loading" />
          {deploymentStatus === 'uploading' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show success screen
  if (deploymentStatus === 'success') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <StatusLoader message={statusMessage} type="success" />
          <div className="mt-6 space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Content Hash (CID)</p>
              <p className="text-sm font-mono text-gray-900 break-all">{contentHash}</p>
            </div>
            {deploymentId && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Deployment ID</p>
                <p className="text-sm font-mono text-gray-900">{deploymentId}</p>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Show error screen
  if (deploymentStatus === 'error') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <StatusLoader message={statusMessage} type="error" />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={handleReset} className="btn-secondary">
              Try Again
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main upload form
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Deploy Website</h1>
        <p className="mt-2 text-gray-600">
          Upload your static website files to IPFS and record on blockchain
        </p>
      </div>

      <div className="card space-y-6">
        {/* Project Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="label">
                Project Name *
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My Awesome Website"
                className="input-field"
                maxLength={100}
                disabled={isDeploying}
              />
            </div>

            <div>
              <label htmlFor="description" className="label">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your website..."
                rows={3}
                className="input-field resize-none"
                maxLength={500}
                disabled={isDeploying}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/500 characters
              </p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Website Files</h2>
          <FileUploader
            onFilesSelected={handleFilesSelected}
            disabled={isDeploying}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
            disabled={isDeploying}
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={!canDeploy}
            className="btn-primary"
          >
            {isDeploying ? 'Deploying...' : 'Deploy Website'}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-800">Deployment Process</h3>
            <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Files are uploaded to IPFS (decentralized storage)</li>
              <li>Metadata is recorded on the blockchain (immutable)</li>
              <li>You'll need to confirm the transaction in MetaMask</li>
              <li>Gas fees apply for blockchain transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWebsite;
