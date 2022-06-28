// Test ground where we test the functionality of the smart contract before deploying.
const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners(); //grabbing wallet address of contract owner and another random address.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); //Compile contract and generate necessary files in artifacts folder

    /*
    Create a local ethereum network but just for this contract.
    after script completes, destroy the network.
    Makes it easier to debug and test.
    Constructor runs when we deply the contract.
    */
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed(); // Wait till contract is deployed, constructor runs when we deploy.

    console.log("Contract Address: ", waveContract.address); //waveContract.address is the address of the deployed contract.
    //"Tester code" console.log("Contract Deployed by: ", owner.address); //returning address of the person who deploys the contract.

    /*
    * Get the Contract balance.
    */
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract Balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );

    /*
    when we deploy the contract, our functions become available to be called on the blockchain
    because we used the PUBLIC keyword for the fucntions
    */
   // let waveCount;
   // waveCount = await waveContract.getTotalWaves();
   // console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("A Message");
    await waveTxn.wait(); // wait for transaction to be mined.

    /**
     * Get Contract balance to see what happened.
     */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract Balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );

   // const [_, randomPerson] = await hre.ethers.getSigners();
   // waveTxn = await waveContract.connect(randomPerson).wave("Another Message!");
   // await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit NOde Process without error.
    } catch (error) {
        console.log(error);
        process.exit(1); //exit node process while indication 'Uncaught Fatal Exception' error.
    }
};

runMain();