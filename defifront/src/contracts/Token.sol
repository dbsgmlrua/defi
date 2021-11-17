pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Token is ERC20{
    address publisher;
    constructor(uint256 initialSupply) ERC20("LeeJaeMyeong","LJM"){
        publisher = msg.sender;
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
    function mint(address account, uint256 amount) public {
        require(msg.sender == publisher);
        _mint(account, amount * (10 ** decimals()));
    } 
}