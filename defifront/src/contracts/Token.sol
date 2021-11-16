pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Token is ERC20{
    constructor(uint256 initialSupply) ERC20("LeeJaeMyeong","LJM"){
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}