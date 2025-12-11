import { Contract } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import ContractABI from '../contracts/DecentralizedWebHost.json';

/**
 * Get contract instance
 * @param {Object} signerOrProvider - Ethers signer or provider
 * @returns {Contract} Contract instance
 */
export const getContract = (signerOrProvider) => {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Contract address not configured');
  }
  
  return new Contract(CONTRACT_ADDRESS, ContractABI.abi, signerOrProvider);
};

/**
 * Deploy website to blockchain
 * @param {Object} signer - Ethers signer
 * @param {string} contentHash - IPFS CID
 * @param {string} projectName - Project name
 * @param {string} description - Project description
 * @returns {Promise<Object>} Deployment result
 */
export const deployWebsite = async (signer, contentHash, projectName, description) => {
  try {
    const contract = getContract(signer);
    
    // Call contract function
    const tx = await contract.deployWebsite(contentHash, projectName, description);
    
    console.log('Transaction sent:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    console.log('Transaction confirmed:', receipt);
    
    // Extract deployment ID from event
    const event = receipt.logs.find(log => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed.name === 'WebsiteDeployed';
      } catch {
        return false;
      }
    });
    
    let deploymentId = null;
    if (event) {
      const parsedEvent = contract.interface.parseLog(event);
      deploymentId = parsedEvent.args.deploymentId;
    }
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      deploymentId: deploymentId ? deploymentId.toString() : null
    };
  } catch (error) {
    console.error('Blockchain deployment error:', error);
    throw new Error(`Failed to deploy to blockchain: ${error.message}`);
  }
};

/**
 * Get deployments by owner address
 * @param {Object} provider - Ethers provider
 * @param {string} ownerAddress - Owner wallet address
 * @returns {Promise<Array>} Array of deployment IDs
 */
export const getDeploymentsByOwner = async (provider, ownerAddress) => {
  try {
    const contract = getContract(provider);
    const deploymentIds = await contract.getDeploymentsByOwner(ownerAddress);
    return deploymentIds.map(id => id.toString());
  } catch (error) {
    console.error('Error fetching deployments:', error);
    throw new Error(`Failed to fetch deployments: ${error.message}`);
  }
};

/**
 * Get deployment details by ID
 * @param {Object} provider - Ethers provider
 * @param {string} deploymentId - Deployment ID
 * @returns {Promise<Object>} Deployment details
 */
export const getDeployment = async (provider, deploymentId) => {
  try {
    const contract = getContract(provider);
    const deployment = await contract.getDeployment(deploymentId);
    
    return {
      id: deploymentId,
      owner: deployment.owner,
      contentHash: deployment.contentHash,
      timestamp: Number(deployment.timestamp),
      version: Number(deployment.version),
      projectName: deployment.projectName,
      description: deployment.description
    };
  } catch (error) {
    console.error('Error fetching deployment:', error);
    throw new Error(`Failed to fetch deployment: ${error.message}`);
  }
};

/**
 * Get all deployments with details for an owner
 * @param {Object} provider - Ethers provider
 * @param {string} ownerAddress - Owner wallet address
 * @returns {Promise<Array>} Array of deployment objects
 */
export const getAllDeploymentsForOwner = async (provider, ownerAddress) => {
  try {
    const deploymentIds = await getDeploymentsByOwner(provider, ownerAddress);
    
    const deployments = await Promise.all(
      deploymentIds.map(id => getDeployment(provider, id))
    );
    
    return deployments;
  } catch (error) {
    console.error('Error fetching all deployments:', error);
    throw new Error(`Failed to fetch all deployments: ${error.message}`);
  }
};

/**
 * Get total deployment count
 * @param {Object} provider - Ethers provider
 * @returns {Promise<number>} Total deployments
 */
export const getTotalDeployments = async (provider) => {
  try {
    const contract = getContract(provider);
    const total = await contract.getTotalDeployments();
    return Number(total);
  } catch (error) {
    console.error('Error fetching total deployments:', error);
    return 0;
  }
};

/**
 * Get deployment count for owner
 * @param {Object} provider - Ethers provider
 * @param {string} ownerAddress - Owner wallet address
 * @returns {Promise<number>} Owner's deployment count
 */
export const getOwnerDeploymentCount = async (provider, ownerAddress) => {
  try {
    const contract = getContract(provider);
    const count = await contract.getOwnerDeploymentCount(ownerAddress);
    return Number(count);
  } catch (error) {
    console.error('Error fetching owner deployment count:', error);
    return 0;
  }
};

/**
 * Estimate gas for deployment
 * @param {Object} signer - Ethers signer
 * @param {string} contentHash - IPFS CID
 * @param {string} projectName - Project name
 * @param {string} description - Project description
 * @returns {Promise<Object>} Gas estimate
 */
export const estimateDeploymentGas = async (signer, contentHash, projectName, description) => {
  try {
    const contract = getContract(signer);
    const gasEstimate = await contract.deployWebsite.estimateGas(
      contentHash,
      projectName,
      description
    );
    
    return {
      gasLimit: gasEstimate.toString(),
      gasLimitNumber: Number(gasEstimate)
    };
  } catch (error) {
    console.error('Error estimating gas:', error);
    return null;
  }
};

/**
 * Listen for deployment events
 * @param {Object} provider - Ethers provider
 * @param {Function} callback - Event callback
 * @returns {Function} Cleanup function
 */
export const listenForDeployments = (provider, callback) => {
  const contract = getContract(provider);
  
  const filter = contract.filters.WebsiteDeployed();
  
  const listener = (deploymentId, owner, contentHash, timestamp, event) => {
    callback({
      deploymentId: deploymentId.toString(),
      owner,
      contentHash,
      timestamp: Number(timestamp),
      transactionHash: event.log.transactionHash,
      blockNumber: event.log.blockNumber
    });
  };
  
  contract.on(filter, listener);
  
  // Return cleanup function
  return () => {
    contract.off(filter, listener);
  };
};
