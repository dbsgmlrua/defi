const Token = artifacts.require("Token");
const Swap = artifacts.require("Swap");

module.exports = async function (deployer) {
    // Deploy Token
    await deployer.deploy(Token, 1000000);
    const token = await Token.deployed()
  
    // Deploy EthSwap
    await deployer.deploy(Swap, token.address);
    const swap = await Swap.deployed()
};