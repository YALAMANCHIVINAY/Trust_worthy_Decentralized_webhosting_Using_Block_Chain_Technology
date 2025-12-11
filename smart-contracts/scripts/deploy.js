const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting deployment...");
  
  // Get the contract factory
  const DecentralizedWebHost = await hre.ethers.getContractFactory("DecentralizedWebHost");
  
  // Deploy the contract
  console.log("Deploying DecentralizedWebHost contract...");
  const contract = await DecentralizedWebHost.deploy();
  
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  
  console.log("✅ DecentralizedWebHost deployed to:", contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    deployer: (await hre.ethers.getSigners())[0].address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber()
  };
  
  // Save to file
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(
    deploymentsDir, 
    `${hre.network.name}-deployment.json`
  );
  
  fs.writeFileSync(
    deploymentFile,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n📄 Deployment info saved to:", deploymentFile);
  
  // Display important information
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("Contract Address:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Block Number:", deploymentInfo.blockNumber);
  console.log("=".repeat(60));
  
  console.log("\n📋 Next Steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Update your .env file:");
  console.log(`   VITE_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("3. Copy the contract ABI to frontend:");
  console.log("   cp artifacts/contracts/DecentralizedWebHost.sol/DecentralizedWebHost.json ../frontend/src/contracts/");
  
  // If on testnet, provide explorer link
  if (hre.network.name === "sepolia") {
    console.log("\n🔍 View on Etherscan:");
    console.log(`   https://sepolia.etherscan.io/address/${contractAddress}`);
  } else if (hre.network.name === "goerli") {
    console.log("\n🔍 View on Etherscan:");
    console.log(`   https://goerli.etherscan.io/address/${contractAddress}`);
  }
  
  console.log("\n✨ Deployment complete!\n");
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
