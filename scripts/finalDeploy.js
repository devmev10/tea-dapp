const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.deployContract("Chai");
  await contract.waitForDeployment();

  console.log("Address of contract: ", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
