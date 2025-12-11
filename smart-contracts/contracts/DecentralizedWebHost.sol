// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DecentralizedWebHost
 * @dev Smart contract for managing decentralized web hosting deployments
 * @notice This contract stores metadata for websites hosted on IPFS
 */
contract DecentralizedWebHost {
    
    // Struct to store website deployment information
    struct WebsiteDeployment {
        address owner;              // Address of the deployer
        string contentHash;         // IPFS CID of the website
        uint256 timestamp;          // Deployment timestamp
        uint256 version;            // Version number for this owner
        string projectName;         // Name of the project
        string description;         // Project description
    }
    
    // State variables
    uint256 public deploymentCounter;
    
    // Mappings
    mapping(uint256 => WebsiteDeployment) public deployments;
    mapping(address => uint256[]) public ownerToDeployments;
    mapping(address => uint256) public ownerVersionCounter;
    
    // Events
    event WebsiteDeployed(
        uint256 indexed deploymentId,
        address indexed owner,
        string contentHash,
        uint256 timestamp,
        uint256 version
    );
    
    /**
     * @dev Deploy a new website
     * @param _contentHash IPFS CID of the website files
     * @param _projectName Name of the project
     * @param _description Description of the project
     * @return deploymentId The ID of the newly created deployment
     */
    function deployWebsite(
        string memory _contentHash,
        string memory _projectName,
        string memory _description
    ) public returns (uint256) {
        // Input validation
        require(bytes(_contentHash).length > 0, "Content hash cannot be empty");
        require(bytes(_projectName).length > 0, "Project name cannot be empty");
        require(bytes(_contentHash).length <= 100, "Content hash too long");
        require(bytes(_projectName).length <= 100, "Project name too long");
        require(bytes(_description).length <= 500, "Description too long");
        
        // Increment counters
        deploymentCounter++;
        ownerVersionCounter[msg.sender]++;
        
        uint256 newDeploymentId = deploymentCounter;
        uint256 version = ownerVersionCounter[msg.sender];
        
        // Create deployment
        deployments[newDeploymentId] = WebsiteDeployment({
            owner: msg.sender,
            contentHash: _contentHash,
            timestamp: block.timestamp,
            version: version,
            projectName: _projectName,
            description: _description
        });
        
        // Add to owner's deployments
        ownerToDeployments[msg.sender].push(newDeploymentId);
        
        // Emit event
        emit WebsiteDeployed(
            newDeploymentId,
            msg.sender,
            _contentHash,
            block.timestamp,
            version
        );
        
        return newDeploymentId;
    }
    
    /**
     * @dev Get all deployment IDs for a specific owner
     * @param _owner Address of the owner
     * @return Array of deployment IDs
     */
    function getDeploymentsByOwner(address _owner) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return ownerToDeployments[_owner];
    }
    
    /**
     * @dev Get deployment details by ID
     * @param _deploymentId ID of the deployment
     * @return WebsiteDeployment struct with all details
     */
    function getDeployment(uint256 _deploymentId) 
        public 
        view 
        returns (WebsiteDeployment memory) 
    {
        require(_deploymentId > 0 && _deploymentId <= deploymentCounter, "Invalid deployment ID");
        return deployments[_deploymentId];
    }
    
    /**
     * @dev Get total number of deployments
     * @return Total deployment count
     */
    function getTotalDeployments() public view returns (uint256) {
        return deploymentCounter;
    }
    
    /**
     * @dev Get deployment count for a specific owner
     * @param _owner Address of the owner
     * @return Number of deployments by this owner
     */
    function getOwnerDeploymentCount(address _owner) 
        public 
        view 
        returns (uint256) 
    {
        return ownerToDeployments[_owner].length;
    }
    
    /**
     * @dev Get the latest version number for an owner
     * @param _owner Address of the owner
     * @return Latest version number
     */
    function getOwnerLatestVersion(address _owner) 
        public 
        view 
        returns (uint256) 
    {
        return ownerVersionCounter[_owner];
    }
}
