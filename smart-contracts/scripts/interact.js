const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Contract Interaction Script\n");
  
  // Read deployment info
  const deploymentFile = path.join(
    __dirname,
    "../deployments",
    `${hre.network.name}-deployment.json`
  );
  
  if (!fs.existsSync(deploymentFile)) {
    console.error("❌ Deployment file not found!");
    console.error("Please deploy the contract first.");
    process.exit(1);
  }
  
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  
  // Get contract instance
  const DecentralizedWebHost = await hre.ethers.getContractFactory("DecentralizedWebHost");
  const contract = DecentralizedWebHost.attach(contractAddress);
  
  const [signer] = await hre.ethers.getSigners();
  
  console.log("Connected to contract:", contractAddress);
  console.log("Using account:", signer.address);
  console.log();
  
  // Example: Deploy a test website
  console.log("📤 Deploying a test website...");
  
  const tx = await contract.deployWebsite(
    "QmTestHash123456789",
    "Test Website",
    "This is a test deployment"
  );
  
  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
  
  // Get deployment ID from event
  const event = receipt.logs.find(log => {
    try {
      return contract.interface.parseLog(log).name === "WebsiteDeployed";
    } catch {
      return false;
    }
  });
  
  if (event) {
    const parsedEvent = contract.interface.parseLog(event);
    const deploymentId = parsedEvent.args.deploymentId;
    console.log("Deployment ID:", deploymentId.toString());
  }
  
  console.log();
  
  // Get total deployments
  const totalDeployments = await contract.getTotalDeployments();
  console.log("📊 Total deployments:", totalDeployments.toString());
  
  // Get deployments by owner
  const ownerDeployments = await contract.getDeploymentsByOwner(signer.address);
  console.log("📋 Your deployments:", ownerDeployments.map(id => id.toString()).join(", "));
  
  // Get deployment details
  if (ownerDeployments.length > 0) {
    console.log("\n📄 Latest deployment details:");
    const latestId = ownerDeployments[ownerDeployments.length - 1];
    const deployment = await contract.getDeployment(latestId);
    
    console.log("  Owner:", deployment.owner);
    console.log("  Content Hash:", deployment.contentHash);
    console.log("  Project Name:", deployment.projectName);
    console.log("  Description:", deployment.description);
    console.log("  Version:", deployment.version.toString());
    console.log("  Timestamp:", new Date(Number(deployment.timestamp) * 1000).toLocaleString());
  }
  
  console.log("\n✨ Interaction complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
