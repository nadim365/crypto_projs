//SPDX-License-Identifier: UNLICENSED
//SPDX = software package data exchange
pragma solidity ^0.8.4;

import "../node_modules/hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    //created a new event for storing the address of user who waved, timestamp of the message
    // and the message itself
    event NewWave(address indexed from, uint256 timestamp, string message);

    //creating a struct called Wave.
    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    /*
    * here we declare a varibale that lets us store an array of "Waves"
    * this lets us hold all the waves anyone ever sends.
    */

    Wave[] waves;

    constructor(){
        console.log("Hello World, This is my first smart contract");
    }

    /*
    * here we change the function signature of wave from:
    * wave() => wave(string memory _message)
    */
    function wave(string memory _message) public{
        totalWaves = totalWaves + 1;
        console.log("%s has Waved w/ message %s", msg.sender, _message);

        /*
        * here we store the wave data in the waves array
        */
        waves.push(Wave(msg.sender, _message, block.timestamp));

        /*
        * Using the event we crated before to let the frontend know
        * that something has happened on the blockchain.
        */
        emit NewWave(msg.sender, block.timestamp, _message);

        // initial prize amount where ether is the keyword for ethereum.
        uint256 prizeAmount = 0.0001 ether; 


        /*
        * here the require keyword is basically an if statement.
        * it checks to see that some condition is true.
        * if condition is false, it will quit the function and cancel the transaction.
        * address(this).balance is the balance of the contract itself. 
        * Because for us to send ETH to someone, our contract needs to have ETH on it to give out.
        */
        require(
            prizeAmount <= address(this).balance, 
             "Trying to withdraw more than the contract has"
        );

        // This is the line where we actually send money to the user.
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        // here we check if the transaction was successful.
        // if not, then it will throw an error and display the message "Failed to withdraw money form contract."
        require(success, "Failed to withdraw money form contract.");
    }

    /*
    * fucntion to retrieve all the waves from website
    */
    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

}