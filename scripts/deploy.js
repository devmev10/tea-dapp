const { ethers } = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;

  for (const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalances(address));
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await ethers.getSigners();
  const contract = await ethers.deployContract("Chai");

  console.log("Address of contract: ", contract.address);

  const addresses = [owner.address, from1.address];

  console.log("before buying chai");
  await consoleBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
