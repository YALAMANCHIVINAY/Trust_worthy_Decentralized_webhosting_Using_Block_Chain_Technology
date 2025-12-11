import { create } from 'ipfs-http-client';
import { IPFS_API_URL, IPFS_GATEWAY, IPFS_GATEWAYS } from './constants';

// Create IPFS client
let ipfsClient = null;

/**
 * Initialize IPFS client
 * @returns {Object} IPFS client instance
 */
export const getIPFSClient = () => {
  if (!ipfsClient) {
    try {
      ipfsClient = create({ url: IPFS_API_URL });
    } catch (error) {
      console.error('Failed to create IPFS client:', error);
      throw new Error('Could not connect to IPFS');
    }
  }
  return ipfsClient;
};

/**
 * Upload files to IPFS
 * @param {File[]} files - Array of files to upload
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string>} IPFS CID
 */
export const uploadToIPFS = async (files, onProgress) => {
  try {
    const client = getIPFSClient();
    
    // Convert files to format IPFS expects
    const fileObjects = await Promise.all(
      files.map(async (file) => ({
        path: file.name,
        content: await file.arrayBuffer()
      }))
    );

    // Upload files
    const results = [];
    let uploadedCount = 0;

    for await (const result of client.addAll(fileObjects, {
      wrapWithDirectory: true,
      progress: (bytes) => {
        if (onProgress) {
          onProgress({
            loaded: bytes,
            total: files.reduce((sum, f) => sum + f.size, 0),
            file: files[uploadedCount]?.name
          });
        }
      }
    })) {
      results.push(result);
      uploadedCount++;
    }

    // The last result is the directory CID
    const directoryCID = results[results.length - 1].cid.toString();
    
    return directoryCID;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error(`Failed to upload to IPFS: ${error.message}`);
  }
};

/**
 * Upload files with retry logic
 * @param {File[]} files - Array of files
 * @param {Function} onProgress - Progress callback
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<string>} IPFS CID
 */
export const uploadToIPFSWithRetry = async (files, onProgress, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Upload attempt ${attempt}/${maxRetries}`);
      const cid = await uploadToIPFS(files, onProgress);
      return cid;
    } catch (error) {
      lastError = error;
      console.error(`Upload attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

/**
 * Get IPFS gateway URL for a CID
 * @param {string} cid - IPFS CID
 * @param {number} gatewayIndex - Gateway index (for fallback)
 * @returns {string} Full IPFS URL
 */
export const getIPFSUrl = (cid, gatewayIndex = 0) => {
  const gateway = IPFS_GATEWAYS[gatewayIndex] || IPFS_GATEWAY;
  return `${gateway}${cid}`;
};

/**
 * Get all gateway URLs for a CID
 * @param {string} cid - IPFS CID
 * @returns {string[]} Array of gateway URLs
 */
export const getAllIPFSUrls = (cid) => {
  return IPFS_GATEWAYS.map(gateway => `${gateway}${cid}`);
};

/**
 * Check if IPFS content is accessible
 * @param {string} cid - IPFS CID
 * @returns {Promise<boolean>} True if accessible
 */
export const checkIPFSAvailability = async (cid) => {
  try {
    const url = getIPFSUrl(cid);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('IPFS availability check failed:', error);
    return false;
  }
};

/**
 * Retrieve file from IPFS
 * @param {string} cid - IPFS CID
 * @returns {Promise<Uint8Array>} File content
 */
export const retrieveFromIPFS = async (cid) => {
  try {
    const client = getIPFSClient();
    const chunks = [];
    
    for await (const chunk of client.cat(cid)) {
      chunks.push(chunk);
    }
    
    // Concatenate chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    
    return result;
  } catch (error) {
    console.error('IPFS retrieval error:', error);
    throw new Error(`Failed to retrieve from IPFS: ${error.message}`);
  }
};

/**
 * Pin content to IPFS (keep it available)
 * @param {string} cid - IPFS CID
 * @returns {Promise<void>}
 */
export const pinToIPFS = async (cid) => {
  try {
    const client = getIPFSClient();
    await client.pin.add(cid);
    console.log(`Pinned ${cid} to IPFS`);
  } catch (error) {
    console.error('IPFS pinning error:', error);
    // Don't throw - pinning failure shouldn't break the flow
  }
};

/**
 * Get IPFS node info
 * @returns {Promise<Object>} Node information
 */
export const getIPFSNodeInfo = async () => {
  try {
    const client = getIPFSClient();
    const id = await client.id();
    return {
      id: id.id,
      agentVersion: id.agentVersion,
      protocolVersion: id.protocolVersion
    };
  } catch (error) {
    console.error('Failed to get IPFS node info:', error);
    return null;
  }
};
