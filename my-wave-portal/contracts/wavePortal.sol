//SPDX-License-Identifier: UNLICENSED
//SPDX = software package data exchange
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    constructor(){
        console.log("Hello World, This is my first smart contract");
    }

    function wave() public{
        totalWaves = totalWaves + 1;
        console.log("%s has Waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

}