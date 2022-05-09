const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners(); //grabbing wallet address of contract owner and another random address.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); //Compile contract and generate necessary files in artifacts folder

    /*
    Create a local ethereum network but just for this contract.
    after script completes, destroy the network.
    Makes it easier to debug and test.
    Constructor runs when we deply the contract.
    */
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed(); // Wait till contract is deployed, constructor runs when we deploy.

    console.log("Contract Deployed to: ", waveContract.address); //waveContract.address is the address of the deployed contract.
    console.log("Contract Deployed by: ", owner.address); //returning address of the person who deploys the contract.

    /*
    when we deploy the contract, our functions become available to be called on the blockchain
    because we used the PUBLIC keyword for the fucntions
    */
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    /*
    Below here is the code which simulates other people using our functions.
    */

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

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