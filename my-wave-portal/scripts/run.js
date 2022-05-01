const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); //Compile contract and generate necessary files in artifacts folder
    const waveContract = await waveContractFactory.deploy(); // Create a local ethereum network but just for this contract.
                                                            //after script completes, destroy the network.
                                                           //Makes it easier to debug and test.
    await waveContract.deployed(); // Wait till contract is deployed, constructor runs when we deploy.
    console.log("Contract Deployed to: ", waveContract.address); //waveContract.address is the address of the deployed contract.
};

const runMain = async () => {
    try{
        await main();
        process.exit(0); // exit NOde Process without error.
    } catch(error){
        console.log(error);
        process.exit(1); //exit node process while indication 'Uncaught Fatal Exception' error.
    }
};

runMain();