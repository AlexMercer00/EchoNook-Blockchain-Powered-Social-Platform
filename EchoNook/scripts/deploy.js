const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "EchoNook"
  const SYMBOL = "DC"

  // Deploy contract
  const EchoNook = await ethers.getContractFactory("EchoNook")
  const EchoNook = await EchoNook.deploy(NAME, SYMBOL)
  await EchoNook.deployed()

  console.log(`Deployed EchoNook Contract at: ${EchoNook.address}\n`)

  // Create 3 Channels
  const CHANNEL_NAMES = ["general", "intro", "jobs"]
  const COSTS = [tokens(1), tokens(0), tokens(0.25)]

  for (var i = 0; i < 3; i++) {
    const transaction = await EchoNook.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i])
    await transaction.wait()

    console.log(`Created text channel #${CHANNEL_NAMES[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});