const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting contract verification...");
  
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
  
  console.log("Contract Address:", contractAddress);
  console.log("Network:", hre.network.name);
  
  try {
    // Verify the contract on Etherscan
    console.log("\nVerifying contract on Etherscan...");
    
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    
    console.log("✅ Contract verified successfully!");
    
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️  Contract is already verified!");
    } else {
      console.error("❌ Verification failed:");
      console.error(error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
